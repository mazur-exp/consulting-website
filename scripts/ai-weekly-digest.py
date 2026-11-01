#!/usr/bin/env python3
"""
Еженедельная сводка «ИИ и сайт» в Telegram (OPS-группа, тема «Сводки»).

Зачем: текст разговора пользователя с ChatGPT нам не передаётся ни при чтении
страницы, ни при клике. Единственное, что видно, это КАКУЮ страницу прочитал
ассистент и КТО потом пришёл. Сводка собирает это в одно сообщение раз в неделю,
чтобы тренд был виден без ручных запросов (решение Алекса 01.11.2026).

Источники:
  1. logs/traffic-YYYY-MM-DD.jsonl (серверный лог): чтения страниц ассистентами
     во время разговора (ChatGPT-User, Perplexity-User, Claude-User) и обходы
     краулеров. ChatGPT и Perplexity проверяются по официальным IP-диапазонам,
     подделанные User-Agent отбрасываются (в октябре их было столько же, сколько
     настоящих). У Anthropic опубликованного списка нет, Claude-User считается
     как есть, с пометкой.
  2. Umami (контейнер umami-db): сессии людей из ИИ (referrer или utm_source),
     страны, страницы входа, клики по кнопкам с меткой ai/*, события диагностики.
  3. Склейка: человек из chatgpt.com, пришедший через <= 10 минут после чтения
     той же страницы ChatGPT-User, считается «из того же разговора».

Запуск: python3 scripts/ai-weekly-digest.py [--days 7] [--dry-run] [--no-send]
Cron на сервере: понедельник 01:00 UTC (09:00 Бали), см. ANALYTICS.md.
Токен и чат: /root/.ops-telegram.env (TELEGRAM_BOT_TOKEN, OPS_GROUP_CHAT_ID),
тема «Сводки» = message_thread_id 6 (TelegramOpsNotifier::THREADS в delivery-monitor).
"""
import argparse, datetime as dt, ipaddress, json, os, re, subprocess, sys, urllib.parse, urllib.request
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGS = os.path.join(ROOT, "logs")
IP_LISTS = {
    "ChatGPT-User": ["https://openai.com/chatgpt-user.json"],
    "OAI-SearchBot": ["https://openai.com/searchbot.json"],
    "GPTBot": ["https://openai.com/gptbot.json"],
    "Perplexity-User": ["https://www.perplexity.com/perplexity-user.json"],
    "PerplexityBot": ["https://www.perplexity.com/perplexitybot.json"],
}
AI_REF = re.compile(r"chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google|claude\.ai|copilot\.microsoft|you\.com|poe\.com|meta\.ai|grok|deepseek", re.I)
AI_UTM = re.compile(r"utm_source=(chatgpt|openai|perplexity|gemini|claude|copilot)", re.I)
THREAD_DIGESTS = 6


def load_nets():
    nets = {}
    for bot, urls in IP_LISTS.items():
        acc = []
        for u in urls:
            try:
                with urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "booster-digest"}), timeout=20) as r:
                    data = json.load(r)
                acc += [ipaddress.ip_network(p[k]) for p in data.get("prefixes", []) for k in ("ipv4Prefix", "ipv6Prefix") if k in p]
            except Exception as e:  # список недоступен: не падаем, считаем бота непроверенным
                print(f"warn: {u}: {e}", file=sys.stderr)
        nets[bot] = acc
    return nets


def genuine(ip, bot, nets):
    """True = IP в официальном списке; None = списка нет (Claude и прочие); False = подделка."""
    if bot not in nets or not nets[bot]:
        return None
    try:
        a = ipaddress.ip_address(ip.replace("::ffff:", ""))
    except ValueError:
        return False
    return any(a in n for n in nets[bot])


def read_log(start, end):
    rows = []
    d = start
    while d <= end:
        f = os.path.join(LOGS, f"traffic-{d:%Y-%m-%d}.jsonl")
        if os.path.exists(f):
            for line in open(f, encoding="utf-8", errors="ignore"):
                try:
                    rows.append(json.loads(line))
                except Exception:
                    pass
        d += dt.timedelta(days=1)
    return rows


def umami(sql):
    cmd = ["docker", "exec", "-i", "umami-db", "sh", "-c",
           'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -At -F "~~" -v ON_ERROR_STOP=1']
    out = subprocess.run(cmd, input=sql, capture_output=True, text=True, timeout=120)
    if out.returncode != 0:
        print("umami error:", out.stderr[:500], file=sys.stderr)
        return []
    return [l.split("~~") for l in out.stdout.strip().split("\n") if l.strip()]


def period_stats(start, end, nets):
    """Все цифры за [start, end] включительно (даты UTC)."""
    s = {}
    rows = read_log(start, end)
    reads = Counter(); reads_pages = defaultdict(Counter); fake = Counter(); crawl = Counter()
    read_events = []  # (ts, bot, path) подлинные чтения для склейки
    for r in rows:
        k = r.get("kind"); bot = r.get("bot") or ""; path = r.get("path") or "/"
        if k == "ai-user":
            if path in ("/robots.txt", "/sitemap.xml", "/llms.txt", "/favicon.ico"):
                continue  # служебные файлы, не чтение контента
            g = genuine(r.get("ip", ""), bot, nets)
            if g is False:
                fake[bot] += 1; continue
            reads[bot] += 1; reads_pages[bot][path] += 1
            read_events.append((r["ts"], bot, path))
        elif k == "ai-crawler":
            g = genuine(r.get("ip", ""), bot, nets)
            if g is not False:
                crawl[bot] += 1
    s["reads"] = reads; s["reads_pages"] = reads_pages; s["fake"] = fake; s["crawl"] = crawl

    a, b = f"{start:%Y-%m-%d}", f"{end + dt.timedelta(days=1):%Y-%m-%d}"
    sql = f"""
WITH pv AS (
  SELECT e.session_id, e.created_at, e.url_path, e.url_query, coalesce(e.referrer_domain,'') ref, e.hostname
  FROM website_event e WHERE e.event_type=1 AND e.created_at >= '{a}' AND e.created_at < '{b}'
    AND e.hostname IN ('booster.delivery','www.booster.delivery')),
sess AS (
  SELECT session_id, min(created_at) t0, count(*) views,
    bool_or(ref ~* 'chatgpt|openai|perplexity|gemini|claude|copilot|you\\.com|poe\\.com|meta\\.ai|grok|deepseek' OR url_query ~* 'utm_source=(chatgpt|openai|perplexity|gemini|claude|copilot)') ai,
    bool_or(ref ~* 'google\\.|bing\\.|yandex|duckduckgo|yahoo') srch,
    (array_agg(url_path ORDER BY created_at))[1] landing,
    (array_agg(coalesce(nullif(ref,''), substring(url_query from 'utm_source=([^&]+)')) ORDER BY created_at))[1] src
  FROM pv GROUP BY 1)
SELECT 'S', CASE WHEN ai THEN 'ai' WHEN srch THEN 'search' ELSE 'other' END, count(*), round(avg(views),1) FROM sess GROUP BY 2
UNION ALL
SELECT 'A', to_char(s.t0,'YYYY-MM-DD HH24:MI') || '|' || coalesce(ss.country,'?') || '|' || s.landing || '|' || coalesce(s.src,'?'), s.views, 0
  FROM sess s JOIN session ss ON ss.session_id=s.session_id WHERE s.ai
UNION ALL
SELECT 'C', d.string_value, count(*), 0 FROM website_event e JOIN event_data d ON d.website_event_id=e.event_id
  WHERE e.event_name='cta-click' AND d.data_key='origin' AND e.created_at >= '{a}' AND e.created_at < '{b}' GROUP BY 2
UNION ALL
SELECT 'D', e.event_name || '|' || coalesce(d.string_value,''), count(*), 0 FROM website_event e JOIN event_data d ON d.website_event_id=e.event_id
  WHERE e.event_name IN ('diagnostic-landing','diagnostic-contact') AND d.data_key='origin' AND e.created_at >= '{a}' AND e.created_at < '{b}' GROUP BY 2;
"""
    sessions = {}; ai_sessions = []; cta = Counter(); diag = Counter()
    for parts in umami(sql):
        tag = parts[0]
        if tag == "S": sessions[parts[1]] = (int(parts[2]), parts[3])
        elif tag == "A": ai_sessions.append(parts[1].split("|") + [parts[2]])
        elif tag == "C": cta[parts[1]] = int(parts[2])
        elif tag == "D": diag[parts[1]] = int(parts[2])
    s["sessions"] = sessions; s["ai_sessions"] = ai_sessions; s["cta"] = cta; s["diag"] = diag

    # склейка чтение → клик (<= 10 мин, та же страница или главная)
    linked = 0
    reads_sorted = sorted((dt.datetime.fromisoformat(ts.replace("Z", "+00:00")), bot, path) for ts, bot, path in read_events if bot == "ChatGPT-User")
    for row in ai_sessions:
        t0 = dt.datetime.strptime(row[0], "%Y-%m-%d %H:%M").replace(tzinfo=dt.timezone.utc)
        landing = row[2]
        if any(t0 - dt.timedelta(minutes=10) <= t <= t0 + dt.timedelta(minutes=1) and (p == landing or p == "/") for t, _, p in reads_sorted):
            linked += 1
    s["linked"] = linked
    return s


PAGE_NAMES = {
    "/": "главная", "/about": "о нас", "/id": "Индонезия", "/th": "Таиланд", "/sg": "Сингапур",
    "/vn": "Вьетнам", "/benchmark": "бенчмарк", "/method": "метод", "/answers": "ответы",
    "/answers/grabfood-phuket-thailand": "Пхукет", "/answers/grabfood-gofood-fees-indonesia": "комиссии ID",
    "/answers/grabfood-gofood-rating-after-bad-reviews": "рейтинг после отзывов",
    "/answers/few-orders-grabfood-gofood": "мало заказов", "/answers/grabfood-ads-not-working": "реклама не работает",
    "/answers/grabfood-gofood-account-management": "ведение аккаунта", "/answers/in-house-manager-vs-agency": "свой человек или агентство",
    "/answers/delivery-agency-vs-klikit-deliverect": "софт или агентство", "/answers/managing-grabfood-yourself": "вести самому",
    "/answers/ai-assistant-grabfood-check": "проверка через ИИ", "/cases/love-u-pizza": "кейс Love U Pizza",
    "/cases/meat-point-phuket": "кейс Meat Point", "/cases/zaytun-ubud": "кейс Zaytun", "/cases/enjoy-healthy-food": "кейс Enjoy",
}


def page(p):
    p = (p or "/").split("?")[0].rstrip("/") or "/"
    return PAGE_NAMES.get(p, p.replace("/answers/", "").replace("/cases/", "кейс "))


def esc(t):
    return str(t).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def trend(n, p):
    if p is None: return ""
    return " ↑" if n > p else (" ↓" if n < p else " =")


def fmt(cur, prev, start, end):
    MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
    period = f"{start.day}-{end.day} {MONTHS[end.month - 1]}" if start.month == end.month else f"{start.day} {MONTHS[start.month - 1]} - {end.day} {MONTHS[end.month - 1]}"
    L = [f"🤖 <b>ИИ и сайт · {period}</b>", ""]

    L.append("📖 <b>Что читали ассистенты</b> (во время разговоров с людьми)")
    for bot, label in (("ChatGPT-User", "ChatGPT"), ("Claude-User", "Claude"), ("Perplexity-User", "Perplexity")):
        n = cur["reads"].get(bot, 0); p = prev["reads"].get(bot, 0)
        if n:
            pages = ", ".join(f"{page(k)} {v}" for k, v in cur["reads_pages"][bot].most_common(4))
            L.append(f"{label} <b>{n}</b>{trend(n, p)} → {esc(pages)}")
        else:
            L.append(f"{label} 0{trend(n, p)}")
    L.append("")

    sc, sp = cur["sessions"], prev["sessions"]
    g = lambda d, k: d.get(k, (0, "0"))[0]
    total = sum(v[0] for v in sc.values())
    L.append(f"👥 <b>Люди на сайте: {total} сессий</b>")
    L.append(f"из ИИ <b>{g(sc,'ai')}</b>{trend(g(sc,'ai'), g(sp,'ai'))} · Google {g(sc,'search')}{trend(g(sc,'search'), g(sp,'search'))} · остальные {g(sc,'other')}")
    if cur["ai_sessions"]:
        L.append("")
        L.append("🧑 <b>Визиты из ИИ</b>")
        for row in cur["ai_sessions"][:12]:
            t, country, landing, src = row[0], row[1], row[2], row[3]
            d = t[5:10].split("-"); day = f"{int(d[1])}.{d[0]}"
            src_s = src.replace("utm_source=", "").replace("chatgpt.com", "ChatGPT").replace("perplexity.ai", "Perplexity")
            L.append(f"{day} · {country} · {esc(page(landing))} · {esc(src_s)}")
        L.append(f"{cur['linked']} из {len(cur['ai_sessions'])} пришли сразу после чтения ChatGPT (тот же разговор)")
    L.append("")

    ai_cta = sum(v for k, v in cur["cta"].items() if k.startswith("ai/")); all_cta = sum(cur["cta"].values())
    dl = cur["diag"]
    land_ai = sum(v for k, v in dl.items() if k.startswith("diagnostic-landing|ai/")); land_all = sum(v for k, v in dl.items() if k.startswith("diagnostic-landing|"))
    cont_ai = sum(v for k, v in dl.items() if k.startswith("diagnostic-contact|ai/")); cont_all = sum(v for k, v in dl.items() if k.startswith("diagnostic-contact|"))
    L.append("🎯 <b>Действия</b>")
    L.append(f"клики по кнопкам {all_cta}, из них из ИИ <b>{ai_cta}</b>")
    L.append(f"диагностика: переходов {land_all} (из ИИ {land_ai}), контактов {cont_all} (из ИИ {cont_ai})")
    L.append("")

    cr = cur["crawl"]
    L.append("🕷 Краулеры: " + " · ".join(f"{b} {n}" for b, n in cr.most_common(4)))
    fake = sum(cur["fake"].values())
    if fake:
        L.append(f"🚫 Подделок под ChatGPT/Perplexity отброшено: {fake}")
    return "\n".join(L)


def send(text):
    env = {}
    for line in open("/root/.ops-telegram.env"):
        if "=" in line and not line.strip().startswith("#"):
            k, v = line.strip().split("=", 1); env[k] = v.strip().strip('"')
    data = urllib.parse.urlencode({"chat_id": env["OPS_GROUP_CHAT_ID"], "message_thread_id": THREAD_DIGESTS, "text": text, "parse_mode": "HTML", "disable_web_page_preview": "true"}).encode()
    req = urllib.request.Request(f"https://api.telegram.org/bot{env['TELEGRAM_BOT_TOKEN']}/sendMessage", data=data)
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status


if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--days", type=int, default=7); ap.add_argument("--no-send", action="store_true"); ap.add_argument("--end", help="YYYY-MM-DD, последний день периода (по умолчанию вчера UTC)")
    a = ap.parse_args()
    end = dt.date.fromisoformat(a.end) if a.end else dt.datetime.now(dt.timezone.utc).date() - dt.timedelta(days=1)
    start = end - dt.timedelta(days=a.days - 1)
    nets = load_nets()
    cur = period_stats(start, end, nets)
    prev = period_stats(start - dt.timedelta(days=a.days), start - dt.timedelta(days=1), nets)
    text = fmt(cur, prev, start, end)
    print(text)
    os.makedirs(LOGS, exist_ok=True)
    with open(os.path.join(LOGS, "ai-digest.log"), "a", encoding="utf-8") as f:
        f.write(f"\n=== {dt.datetime.now(dt.timezone.utc):%Y-%m-%d %H:%M} UTC\n{text}\n")
    if not a.no_send:
        print("telegram:", send(text))
