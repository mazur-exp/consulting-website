#!/usr/bin/env python3
"""Аудит AI Visibility для Delivery Booster. Самодостаточный скрипт.

Использование (см. ai_docs/ai-visibility/AUDIT_METHOD.md):
    python3 audit.py run    --prompts prompts_v1.json --out ./2026-09-25
    python3 audit.py judge  --dir ./2026-09-25
    python3 audit.py report --dir ./2026-09-25 --baseline ./baseline-2026-08-25

Ключи в env: OPENAI_API_KEY, PERPLEXITY_API_KEY, GEMINI_API_KEY,
BRIGHTDATA_API_TOKEN, BRIGHTDATA_SERP_ZONE. Зависимости: pip install httpx
"""
import argparse, asyncio, gzip, json, math, os, sys, time
from collections import Counter
from urllib.parse import quote_plus, urlparse

import httpx

T = httpx.Timeout(150.0, connect=20.0)
ENV = lambda k: os.getenv(k, "").strip()

# ── движки ──────────────────────────────────────────────────────────────────

async def ask_perplexity(cl, text):
    r = await cl.post("https://api.perplexity.ai/chat/completions",
        headers={"Authorization": f"Bearer {ENV('PERPLEXITY_API_KEY')}"},
        json={"model": "sonar", "messages": [{"role": "user", "content": text}],
              "web_search_options": {"search_context_size": "medium",
                                     "user_location": {"country": "ID"}}}, timeout=T)
    r.raise_for_status()
    d = r.json()
    srcs = [{"url": s.get("url", ""), "title": s.get("title", "")}
            for s in (d.get("search_results") or [])]
    return d["choices"][0]["message"]["content"] or "", srcs

# ПРИНЦИП ВЫБОРА МОДЕЛЕЙ (решено с Алексом 15.09.2026): меряем то, что видит
# ресторатор в бесплатном приложении, а не «самую сильную» и не «ту, что
# работает». Пересматривать раз в квартал; смена модели = смена условий
# замера, записывается отдельной строкой в VISIBILITY_TRACKING.md.
#
# Gemini: бесплатный тариф приложения Gemini = Gemini 3.6 Flash (платные и
# Google AI Mode = 3.8 Flash; источники в AUDIT_METHOD.md). Primary — 3.6-flash;
# откат при перегрузке — НОВЕЕ (3.7 → 3.8, то, что видят платные), а не старее.
# Какая модель реально ответила — пишется в row["model"], отчёт показывает
# долю откатов; >10% откатов = прогон помечать.
#
# ВАЖНО: alias вида *-latest здесь не место. Во-первых, именно он и был
# перегружен (503 на 55 вызовах из 58 в прогоне 14.09). Во-вторых, alias молча
# меняет модель между замерами — а замер тем и ценен, что сравним во времени.
# Проверено 15.09.2026 прямыми вызовами (model_probe.py): 3.6-flash 200/16с,
# 3.8-flash 200/9с, 3.7-flash в момент проверки 503 (перегружен), *-latest 503,
# 2.5-flash 404 (снят).
GEMINI_MODELS = ["gemini-3.6-flash", "gemini-3.7-flash", "gemini-3.8-flash"]

# OpenAI: бесплатный ChatGPT (Free и Go) с 06.08.2026 = GPT-5.6 Luna, платные =
# GPT-5.6 Sol. В API это gpt-5.6-luna / gpt-5.6-sol. До 15.09 замер ходил на
# gpt-4.1 — на два поколения старше того, что видят люди; gpt-4.1 в каталоге
# моделей уже не значится. Переключение = смена условий; для моста один прогон
# делается двумя моделями (см. --engines/--openai-model).
OPENAI_MODEL = "gpt-5.6-luna"
# Контроль для непрерывности ряда: движок "openai" остаётся gpt-4.1 (как во всех
# замерах с 25.08), новая модель ходит отдельным движком "openai_luna". Колонка
# v1 в трекинге считается по контролю, колонка «новые модели» — по luna. Период
# перекрытия — минимум три прогона; дальше контроль можно оставить навсегда
# (58 вызовов на прогон).
OPENAI_CONTROL_MODEL = "gpt-4.1"

async def ask_gemini(cl, text):
    last = ""
    for m in GEMINI_MODELS:
        r = await cl.post(
            f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent",
            headers={"x-goog-api-key": ENV("GEMINI_API_KEY")},
            json={"contents": [{"role": "user", "parts": [{"text": text}]}],
                  "tools": [{"google_search": {}}]}, timeout=T)
        # Переходим к следующей модели не только на 404 (модель снята), но и на
        # 503/429/500: перегруженная модель — такая же непригодная, как снятая.
        # Раньше фолбэк ловил только 404, а 503 улетал в raise_for_status, и
        # внешний ретрай начинал заново С ТОЙ ЖЕ первой модели. Из-за этого в
        # прогоне 14.09 живые модели не пробовались ни разу: 55 вызовов из 58
        # ушли в перегруженный alias и вернули 503.
        if r.status_code in (404, 429, 500, 502, 503):
            last = f"{r.status_code}: {r.text[:120]}"
            await asyncio.sleep(1.5)
            continue
        r.raise_for_status()
        c = (r.json().get("candidates") or [{}])[0]
        out = "".join(p.get("text", "") for p in (c.get("content") or {}).get("parts") or [])
        gm = c.get("groundingMetadata") or {}
        srcs = [{"url": (ch.get("web") or {}).get("uri", ""),
                 "title": (ch.get("web") or {}).get("title", "")}
                for ch in (gm.get("groundingChunks") or [])]
        return out, srcs, m
    raise RuntimeError(f"gemini: нет модели ({last})")

async def ask_openai(cl, text, model=None):
    model = model or OPENAI_CONTROL_MODEL
    r = await cl.post("https://api.openai.com/v1/responses",
        headers={"Authorization": f"Bearer {ENV('OPENAI_API_KEY')}"},
        json={"model": model, "input": text,
              "tools": [{"type": "web_search",
                         "user_location": {"type": "approximate", "country": "ID"}}]},
        timeout=T)
    r.raise_for_status()
    txt, srcs = "", []
    for it in r.json().get("output") or []:
        if it.get("type") == "message":
            for c in it.get("content") or []:
                if c.get("type") == "output_text":
                    txt += c.get("text") or ""
                    srcs += [{"url": a.get("url", ""), "title": a.get("title", "")}
                             for a in (c.get("annotations") or [])
                             if a.get("type") == "url_citation"]
    return txt, srcs, model

async def ask_openai_luna(cl, text):
    return await ask_openai(cl, text, OPENAI_MODEL)

async def ask_aio(cl, text):
    """Google AI Overview через SERP-зону Bright Data. Пустой блок — это
    отсутствие наблюдения (empty), НЕ ноль."""
    url = (f"https://www.google.com/search?q={quote_plus(text)}"
           f"&brd_json=1&brd_ai_overview=2&gl=id&hl=en")
    r = await cl.post("https://api.brightdata.com/request",
        headers={"Authorization": f"Bearer {ENV('BRIGHTDATA_API_TOKEN')}"},
        json={"zone": ENV("BRIGHTDATA_SERP_ZONE"), "url": url, "format": "raw"},
        timeout=T)
    r.raise_for_status()
    body = r.content or b""
    if not body.strip() or body[:10] == b"This query":
        raise RuntimeError("brightdata: пустой ответ / блок повтора")
    aio = (r.json() or {}).get("ai_overview") or {}
    chunks, srcs = [], []
    for b in aio.get("texts") or []:
        if b.get("snippet"): chunks.append(b["snippet"])
        srcs += [{"url": l.get("link", ""), "title": ""} for l in (b.get("links") or [])]
    for ref in aio.get("references") or []:
        srcs.append({"url": ref.get("link", ""), "title": ref.get("title", "")})
    return "\n".join(chunks), srcs  # текст может быть пустым → empty

ENGINES = {"perplexity": ask_perplexity, "gemini": ask_gemini,
           "openai": ask_openai, "openai_luna": ask_openai_luna, "google_aio": ask_aio}
# Составы движков для метрик. V1 — ровно тот, что с 25.08. STABLE — движки,
# которые не менялись никогда (якорь при спорах «мы или прибор»).
ENGINES_V1 = ("perplexity", "gemini", "openai", "google_aio")
ENGINES_NEW = ("perplexity", "gemini", "openai_luna", "google_aio")
ENGINES_STABLE = ("perplexity", "google_aio")

# ── судья ───────────────────────────────────────────────────────────────────

CATS = ["platform_ads", "platform_promos", "menu_photos", "rating_reviews",
        "ops_speed", "pricing_commission", "social_media", "own_channel",
        "platform_contact", "pos_software", "hire_agency", "data_analytics", "other"]

SCHEMA = {"type": "object", "additionalProperties": False, "properties": {
    "advice": {"type": "array", "items": {"type": "string", "enum": CATS}},
    "says_platform_is_optimizable": {"type": "boolean"},
    "suggests_hiring_specialist": {"type": "boolean"},
    "named_services": {"type": "array", "items": {"type": "object",
        "additionalProperties": False, "properties": {
            "name": {"type": "string"},
            "kind": {"type": "string", "enum": ["agency", "software_pos", "platform",
                                               "media_blog", "course", "other"]}},
        "required": ["name", "kind"]}},
    "delivery_booster": {"type": "string", "enum": ["not_mentioned", "correct_agency",
                                                    "confused_other", "unsure_generic"]},
    "evidence": {"type": "string"}},
    "required": ["advice", "says_platform_is_optimizable", "suggests_hiring_specialist",
                 "named_services", "delivery_booster", "evidence"]}

JUDGE_PROMPT = """Разбери ответ AI-ассистента на вопрос ресторатора про доставку (GrabFood, GoFood, ShopeeFood, LINE MAN).
advice - типы советов, реально присутствующие в ответе: platform_ads (платная реклама в приложении), platform_promos (акции/промо в приложении), menu_photos (фото/описания/меню), rating_reviews (рейтинг и отзывы), ops_speed (скорость, отмены, доступность), pricing_commission (цены, комиссия), social_media (соцсети), own_channel (свой сайт/прямые заказы), platform_contact (обратиться к площадке), pos_software (POS/софт/интегратор), hire_agency (нанять агентство/консультанта), data_analytics (смотреть аналитику), other.
says_platform_is_optimizable - true, только если ответ прямо говорит, что результат ВНУТРИ площадки зависит от управляемых факторов (алгоритм, настройки, оптимизация), а не просто "зарегистрируйтесь".
suggests_hiring_specialist - true, если ответ допускает привлечение внешнего человека или компании.
named_services - ВСЕ названные по имени компании/сервисы/агентства/инструменты/курсы. Только явно названные, не выдумывай.
delivery_booster: correct_agency - упомянут Delivery Booster именно как агентство по управлению доставкой ресторанов; confused_other - "Delivery Booster" упомянут, но это что-то другое (софт, инструмент Grab, CI/CD); unsure_generic - расплывчато; not_mentioned - не упомянут.
evidence - дословная цитата до 150 символов, подтверждающая главное.
ОТВЕТ:
---
{answer}
---"""

async def judge_one(cl, text):
    body = {"model": "gpt-4.1-mini", "temperature": 0,
            "messages": [{"role": "user", "content": JUDGE_PROMPT.format(answer=text[:9000])}],
            "response_format": {"type": "json_schema",
                "json_schema": {"name": "b2b", "strict": True, "schema": SCHEMA}}}
    for i in range(3):
        try:
            r = await cl.post("https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {ENV('OPENAI_API_KEY')}"},
                json=body, timeout=90)
            if r.status_code < 400:
                return json.loads(r.json()["choices"][0]["message"]["content"])
        except Exception:
            pass
        await asyncio.sleep(2 + i)
    return None

# ── статистика ──────────────────────────────────────────────────────────────

def wilson(k, n, z=1.96):
    if not n: return 0.0, 0.0, 0.0
    p = k / n; d = 1 + z * z / n
    c = (p + z * z / (2 * n)) / d
    h = (z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d
    return p, max(0.0, c - h), min(1.0, c + h)

def pct(x): return f"{round(x * 100)}%"

def sig(k1, n1, k0, n0):
    """True, если интервалы двух замеров не пересекаются (различие значимо)."""
    _, lo1, hi1 = wilson(k1, n1); _, lo0, hi0 = wilson(k0, n0)
    return lo1 > hi0 or lo0 > hi1

# ── команды ─────────────────────────────────────────────────────────────────

async def cmd_run(a):
    global OPENAI_MODEL
    if a.openai_model: OPENAI_MODEL = a.openai_model
    if not a.skip_preflight and not await preflight():
        raise SystemExit(2)
    engines = {k: v for k, v in ENGINES.items() if not a.engines or k in a.engines.split(",")}
    spec = json.load(open(a.prompts))
    prompts, runs = spec["prompts"], spec.get("runs_per_prompt", 2)
    # Каждому промпту — набор (set) и число прогонов. v1: set="v1", runs=2;
    # key-промпты v1 — key_runs (прогоны 0–1 идут в v1-метрики, 2+ — в блок n=6);
    # extra-промпты — свои set и runs. Ничто из extra в v1-метрики не попадает.
    jobs = [(dict(p, set="v1"), runs) for p in prompts]
    if a.extra:
        ex = json.load(open(a.extra))
        key = set(ex.get("key_prompt_ids") or []); kr = ex.get("key_runs", runs)
        jobs = [(p, kr if p["id"] in key else n) for p, n in jobs]
        jobs += [(dict(p), ex.get("runs_per_prompt", runs)) for p in ex["prompts"]]
    total = sum(n for _, n in jobs) * len(engines)
    os.makedirs(a.out, exist_ok=True)
    sem = asyncio.Semaphore(10)
    out = []

    async def one(eng, fn, p, i):
        async with sem:
            row = dict(p, engine=eng, run=i, ok=False, text="", sources=[], error="", model="")
            for att in range(3):
                try:
                    res = await fn(cl, p["text"])
                    row["text"], row["sources"] = res[0], res[1]
                    row["model"] = res[2] if len(res) > 2 else ""
                    row["ok"] = True
                    break
                except Exception as e:
                    row["error"] = str(e)[:200]
                    await asyncio.sleep(2 * (att + 1))
            out.append(row)
            if len(out) % 20 == 0:
                print(f"  {len(out)}/{total}", flush=True)

    t0 = time.time()
    async with httpx.AsyncClient(follow_redirects=True) as cl:
        await asyncio.gather(*(one(e, f, p, i) for e, f in engines.items()
                               for p, n in jobs for i in range(n)))
    json.dump({"prompt_version": spec["version"], "date": time.strftime("%Y-%m-%d"),
               "rows": out}, open(f"{a.out}/raw.json", "w"), ensure_ascii=False)
    ok = sum(1 for r in out if r["ok"] and r["text"].strip())
    print(f"готово за {int(time.time()-t0)}с: {len(out)} вызовов, {ok} с текстом → {a.out}/raw.json")

async def cmd_judge(a):
    data = json.load(open(f"{a.dir}/raw.json"))
    rows = [r for r in data["rows"] if r["ok"] and r["text"].strip()]
    print("судья разбирает:", len(rows))
    sem = asyncio.Semaphore(8)

    async def one(r):
        async with sem:
            r["j"] = await judge_one(cl, r["text"])

    async with httpx.AsyncClient() as cl:
        await asyncio.gather(*(one(r) for r in rows))
    data["rows"] = rows
    with gzip.open(f"{a.dir}/judged.json.gz", "wt", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)
    print("готово:", sum(1 for r in rows if r.get("j")), f"→ {a.dir}/judged.json.gz")

def load_judged(d):
    with gzip.open(f"{d}/judged.json.gz", "rt", encoding="utf-8") as f:
        data = json.load(f)
    return [r for r in data["rows"] if r.get("j")]

def metrics(rows):
    prob = [r for r in rows if r["layer"] == "problem"]
    cat = [r for r in rows if r["layer"] == "category"]
    brand = [r for r in rows if r["layer"] == "brand"]
    has_ag = lambda r: any(e["kind"] == "agency" for e in r["j"]["named_services"])
    m = {
        "n": len(rows), "n_problem": len(prob), "n_category": len(cat), "n_brand": len(brand),
        "maturity1": (sum(1 for r in prob if r["j"]["says_platform_is_optimizable"]), len(prob)),
        "maturity2": (sum(1 for r in prob if r["j"]["suggests_hiring_specialist"]), len(prob)),
        "maturity3": (sum(1 for r in prob if has_ag(r)), len(prob)),
        "db_category": (sum(1 for r in cat if r["j"]["delivery_booster"] == "correct_agency"), len(cat)),
        "db_problem": (sum(1 for r in prob if r["j"]["delivery_booster"] == "correct_agency"), len(prob)),
        "db_brand": (sum(1 for r in brand if r["j"]["delivery_booster"] == "correct_agency"), len(brand)),
        "confused": [r["j"]["evidence"][:150] for r in rows
                     if r["j"]["delivery_booster"] == "confused_other"],
    }
    adv = Counter()
    for r in prob:
        for x in set(r["j"]["advice"]): adv[x] += 1
    m["advice"] = {k: (v, len(prob)) for k, v in adv.most_common()}
    ent = Counter()
    for r in rows:
        seen = set()
        for e in r["j"]["named_services"]:
            nm = e["name"].strip()
            if nm and nm.lower() not in seen:
                seen.add(nm.lower()); ent[(nm, e["kind"])] += 1
    m["entities"] = ent.most_common(30)
    dom = Counter()
    for r in rows:
        ds = set()
        for s in r.get("sources") or []:
            h = urlparse(s.get("url", "")).netloc.lower().removeprefix("www.").removeprefix("m.")
            if h and "." in h: ds.add(h)
        for d in ds: dom[d] += 1
    m["domains"] = {d: (n, len(rows)) for d, n in dom.most_common(25)}
    # НАШИ соцсети/сайт в ответах (источники+текст) — результат соц-перелинковки.
    # Домены выше схлопнуты до eTLD+1 (youtube.com), поэтому НАШ канал там не виден;
    # здесь ищем конкретные профили. Не влияет на промпты/судью.
    OURS = {"soc_site": ["booster.delivery"],
            "soc_yt": ["youtube.com/@deliverybooster"],
            "soc_ig": ["instagram.com/delivery.booster"],
            "soc_tg_ch": ["t.me/deliverybooster_asia", "deliverybooster_asia"],
            "soc_tg_c": ["t.me/delivery_booster", "@delivery_booster"]}
    def _hit(r, needles):
        blob = (" ".join(s.get("url", "") for s in (r.get("sources") or []))
                + " " + (r.get("text") or "")).lower()
        return any(x in blob for x in needles)
    for k, needles in OURS.items():
        m[k] = (sum(1 for r in rows if _hit(r, needles)), len(rows))
    # ПАМЯТЬ vs ПОИСК (добавлено 15.09.2026, ревизия подхода). Ответ без источников =
    # движок не искал (или не отдал цитат) и отвечал из параметрической памяти; туда
    # сайт не попадает никак. Считаем бренд-упоминание отдельно в двух знаменателях —
    # это две разные игры: «поиск» двигает сайт, «память» двигают внешние упоминания.
    has_src = lambda r: bool(r.get("sources"))
    db = lambda r: r["j"]["delivery_booster"] == "correct_agency"
    for lname, sub in (("category", cat), ("problem", prob)):
        srch = [r for r in sub if has_src(r)]; mem = [r for r in sub if not has_src(r)]
        m[f"db_{lname}_search"] = (sum(1 for r in srch if db(r)), len(srch))
        m[f"db_{lname}_memory"] = (sum(1 for r in mem if db(r)), len(mem))
    eng = Counter(); eng_src = Counter()
    for r in rows:
        eng[r["engine"]] += 1
        if has_src(r): eng_src[r["engine"]] += 1
    m["search_rate"] = {e: (eng_src[e], eng[e]) for e in sorted(eng)}
    mm = Counter((r["engine"], r.get("model") or "?") for r in rows if r["engine"] in ("gemini", "openai"))
    m["model_mix"] = {e: {md: (n, eng[e]) for (ee, md), n in mm.items() if ee == e} for e in ("gemini", "openai")}
    # Category по рынкам — раньше считалось руками для каждого замера.
    mk = Counter(); mk_db = Counter()
    for r in cat:
        mk[r["market"]] += 1
        if db(r): mk_db[r["market"]] += 1
    m["cat_by_market"] = {k: (mk_db[k], mk[k]) for k in ("ID", "SG", "TH", "VN") if mk[k]}
    return m

def _set(r): return r.get("set") or "v1"

def v1_rows(rows, engines=ENGINES_V1, runs=2):
    """Ровно тот срез, что считался с 25.08: промпты v1, первые два прогона,
    четыре движка. Всё, что добавлено 15.09 (контроль/luna, key-повторности,
    v2, local), сюда не попадает — колонка v1 в трекинге не меняется."""
    return [r for r in rows if _set(r) == "v1" and r["engine"] in engines and r["run"] < runs]

def cmd_report(a):
    rows_all = load_judged(a.dir)
    cur = metrics(v1_rows(rows_all))
    base = metrics(v1_rows(load_judged(a.baseline))) if a.baseline else None

    def line(label, key):
        k, n = cur[key]; p, lo, hi = wilson(k, n)
        s = f"  {label:48s} {pct(p):>5s} ({pct(lo)}-{pct(hi)})  {k}/{n}"
        if base:
            k0, n0 = base[key]; p0, _, _ = wilson(k0, n0)
            mark = "  ← ЗНАЧИМО" if sig(k, n, k0, n0) else "  (шум)"
            s += f"   было {pct(p0)}{mark if k != k0 or n != n0 else ''}"
        print(s)

    print(f"=== ЗАМЕР {a.dir} (n={cur['n']})"
          + (f" vs базовая {a.baseline}" if base else "") + " ===")
    print("\nШкала зрелости (problem):")
    line("1. управляемость внутри площадки", "maturity1")
    line("2. допускает делегирование", "maturity2")
    line("3. называет агентство по имени", "maturity3")
    print("\nDelivery Booster:")
    line("в category-запросах (ГЛАВНАЯ)", "db_category")
    line("в problem-запросах", "db_problem")
    line("в brand-запросах (корректно)", "db_brand")
    if cur["confused"]:
        print("  путаница бренда:")
        for c in cur["confused"]: print("   •", c)
    print("\nПамять vs поиск (бренд назван; знаменатель — ответы с источниками / без):")
    line("category — движок искал", "db_category_search")
    line("category — из памяти, без источников", "db_category_memory")
    line("problem — движок искал", "db_problem_search")
    line("problem — из памяти, без источников", "db_problem_memory")
    print("  доля ответов с источниками по движкам: "
          + ", ".join(f"{e} {k}/{n}" for e, (k, n) in cur["search_rate"].items()))
    print("\nМодели (что реально отвечало):")
    for e, mix in cur["model_mix"].items():
        parts = [f"{md} {n}/{tot}" for md, (n, tot) in sorted(mix.items(), key=lambda x: -x[1][0])]
        primary = GEMINI_MODELS[0] if e == "gemini" else OPENAI_MODEL
        tot = sum(n for n, _ in mix.values()) or 1
        if set(mix) == {"?"}:
            print(f"  {e:10s} модель не записывалась (прогоны до 15.09.2026)"); continue
        fb = sum(n for md, (n, _) in mix.items() if md != primary)
        flag = "  ← ОТКАТОВ >10%, прогон помечать" if fb / tot > 0.10 else ""
        print(f"  {e:10s} " + ", ".join(parts) + (f"  (откат {fb}/{tot})" if fb else "") + flag)
    print("\nCategory по рынкам (назвали нас):")
    for mkt, (k, n) in cur["cat_by_market"].items():
        p_, lo, hi = wilson(k, n)
        print(f"  {mkt}  {k}/{n} = {pct(p_)} ({pct(lo)}-{pct(hi)})")
    print("\nСоветы ИИ (problem):")
    for k, (v, n) in cur["advice"].items():
        print(f"  {k:22s} {pct(v/n):>5s}")
    print("\nНазванные сервисы (топ):")
    for (nm, kind), n in cur["entities"]:
        print(f"  {n:3d}  {kind:12s} {nm[:55]}")
    print("\nНаши профили в ответах (источники+текст, все слои):")
    line("сайт booster.delivery", "soc_site")
    line("YouTube @DeliveryBooster", "soc_yt")
    line("Instagram delivery.booster", "soc_ig")
    line("Telegram-канал @deliverybooster_asia", "soc_tg_ch")
    line("Telegram-контакт @delivery_booster", "soc_tg_c")
    print("\nЦитируемые домены:")
    for d, (n, tot) in cur["domains"].items():
        star = "  ★" if "booster.delivery" in d else ""
        print(f"  {pct(n/tot):>5s}  {d[:55]}{star}")
    _extra_blocks(rows_all, a)
    print("\nНапоминание: в VISIBILITY_TRACKING.md записывать рост/падение только по"
          " строкам с пометкой ЗНАЧИМО.")

# ── предполётная проверка ────────────────────────────────────────────────────
# Правило Алекса (15.09.2026): перед прогоном проверять ВСЕ движки и судью на
# деньги и работоспособность. История: 09.09 кончился баланс OpenAI — 58 пустых
# ответов и мёртвый судья; 13–14.09 Gemini через алиас отдавал 503 и молча
# менял модель. Проверка стоит шесть вызовов и минуту; прогон без неё не
# запускается (run вызывает её сам, --skip-preflight только для отладки).

PREFLIGHT_Q = "Which agency helps restaurants in Bali grow sales on GrabFood? One sentence."

async def _pf_call(name, fn, cl, expect_model=None):
    t = time.time()
    try:
        res = await fn(cl, PREFLIGHT_Q)
        txt, srcs = res[0], res[1]; model = res[2] if len(res) > 2 else ""
        dt = time.time() - t
        if not (txt or "").strip():
            return name, False, f"пустой ответ за {dt:.0f}с", model
        if expect_model and model != expect_model:
            return name, False, f"ответила НЕ основная модель: {model} вместо {expect_model} (основная перегружена/снята)", model
        return name, True, f"200 за {dt:.0f}с, {len(srcs)} источников" + (f", модель {model}" if model else ""), model
    except httpx.HTTPStatusError as e:
        body = e.response.text[:200].replace("\n", " ")
        low = body.lower()
        why = ("ДЕНЬГИ КОНЧИЛИСЬ" if ("insufficient_quota" in low or "credit" in low or e.response.status_code == 402)
               else "квота/лимит" if e.response.status_code == 429
               else "перегружен" if e.response.status_code == 503
               else "ошибка")
        return name, False, f"{e.response.status_code} {why}: {body}", ""
    except Exception as e:
        return name, False, f"исключение: {str(e)[:200]}", ""

async def _pf_aio(cl):
    """AIO показывается не на каждый запрос, а Bright Data иногда отдаёт «блок
    повтора» на первый вызов. Три разных запроса; сервис жив, если хоть один
    вернул JSON (текст AIO может быть пустым — это не поломка, см. ask_aio)."""
    last = ""
    for q in (PREFLIGHT_Q, "how to increase GrabFood orders for a restaurant in Bali",
              "GrabFood commission for restaurants in Indonesia"):
        t = time.time()
        try:
            txt, srcs = await ask_aio(cl, q)
            note = f"200 за {time.time()-t:.0f}с, " + (f"{len(srcs)} источников" if txt.strip() else "AIO на этот запрос не показан — это норма, сервис отвечает")
            return "google_aio (Bright Data)", True, note, ""
        except httpx.HTTPStatusError as e:
            low = e.response.text.lower()
            why = "ДЕНЬГИ КОНЧИЛИСЬ / зона" if e.response.status_code in (402, 403) else "ошибка"
            return "google_aio (Bright Data)", False, f"{e.response.status_code} {why}: {e.response.text[:200]}", ""
        except Exception as e:
            last = str(e)[:200]
            await asyncio.sleep(3)
    return "google_aio (Bright Data)", False, f"три запроса подряд без ответа: {last}", ""

async def _pf_judge(cl):
    t = time.time()
    body = {"model": "gpt-4.1-mini", "temperature": 0,
            "messages": [{"role": "user", "content": "Reply with the single word OK."}]}
    r = await cl.post("https://api.openai.com/v1/chat/completions",
                      headers={"Authorization": f"Bearer {ENV('OPENAI_API_KEY')}"}, json=body, timeout=60)
    if r.status_code >= 400:
        low = r.text.lower()
        return "judge gpt-4.1-mini", False, f"{r.status_code} " + ("ДЕНЬГИ КОНЧИЛИСЬ: " if "insufficient_quota" in low else "") + r.text[:200], ""
    return "judge gpt-4.1-mini", True, f"200 за {time.time()-t:.0f}с", ""

async def preflight():
    missing = [k for k in ("OPENAI_API_KEY", "PERPLEXITY_API_KEY", "GEMINI_API_KEY",
                           "BRIGHTDATA_API_TOKEN", "BRIGHTDATA_SERP_ZONE") if not os.environ.get(k)]
    if missing:
        print("ПРЕДПОЛЁТНАЯ ПРОВЕРКА: нет ключей " + ", ".join(missing) + " — source .secrets/aivis.env")
        return False
    async with httpx.AsyncClient(follow_redirects=True) as cl:
        results = await asyncio.gather(
            _pf_call("perplexity sonar", ask_perplexity, cl),
            _pf_call(f"gemini {GEMINI_MODELS[0]}", ask_gemini, cl, expect_model=GEMINI_MODELS[0]),
            _pf_call(f"openai {OPENAI_CONTROL_MODEL} (контроль)", ask_openai, cl, expect_model=OPENAI_CONTROL_MODEL),
            _pf_call(f"openai_luna {OPENAI_MODEL}", ask_openai_luna, cl, expect_model=OPENAI_MODEL),
            _pf_aio(cl),
            _pf_judge(cl),
        )
    ok_all = True
    print("ПРЕДПОЛЁТНАЯ ПРОВЕРКА (все движки + судья):")
    for name, ok, msg, _ in results:
        print(f"  {'OK ' if ok else 'СТОП'}  {name:36s} {msg}")
        ok_all &= ok
    print("  → " + ("всё готово, запускаем" if ok_all else "ПРОГОН НЕ ЗАПУЩЕН: сначала починить то, что помечено СТОП"))
    return ok_all

def _fmt(k, n):
    p_, lo, hi = wilson(k, n)
    return f"{pct(p_):>5s} ({pct(lo)}-{pct(hi)})  {k}/{n}"

def _extra_blocks(rows_all, a):
    """Блоки, добавленные 15.09.2026. Печатаются только если в прогоне есть
    соответствующие данные; старые прогоны отчёт не меняют."""
    db = lambda r: r["j"]["delivery_booster"] == "correct_agency"
    def trio(rows):
        cat = [r for r in rows if r["layer"] == "category"]
        prob = [r for r in rows if r["layer"] == "problem"]
        site = [r for r in rows if "booster.delivery" in " ".join(s.get("url", "") for s in (r.get("sources") or [])).lower()]
        return (sum(map(db, cat)), len(cat)), (sum(map(db, prob)), len(prob)), (len(site), len(rows))
    engines_present = {r["engine"] for r in rows_all}

    # A. Стабильные движки — якорь, не менялись никогда
    st = v1_rows(rows_all, ENGINES_STABLE)
    if st:
        c, p_, s_ = trio(st)
        print("\nСтабильные движки (Perplexity + Google AIO, не менялись с 25.08 — сравнимо со всеми замерами):")
        print(f"  category {_fmt(*c)}   problem {_fmt(*p_)}   сайт в цитатах {_fmt(*s_)}")

    # B. Новые модели: тот же срез, но openai → openai_luna
    if "openai_luna" in engines_present:
        nw = v1_rows(rows_all, ENGINES_NEW)
        c, p_, s_ = trio(nw)
        print("\nНовые модели (v1-срез, OpenAI = gpt-5.6-luna вместо контроля gpt-4.1):")
        print(f"  category {_fmt(*c)}   problem {_fmt(*p_)}   сайт в цитатах {_fmt(*s_)}")
        for lay in ("category", "problem"):
            old = [r for r in v1_rows(rows_all) if r["engine"] == "openai" and r["layer"] == lay]
            new = [r for r in v1_rows(rows_all, ENGINES_NEW) if r["engine"] == "openai_luna" and r["layer"] == lay]
            print(f"  OpenAI {lay:9s} gpt-4.1 {sum(map(db, old))}/{len(old)}  ·  luna {sum(map(db, new))}/{len(new)}"
                  f"  ·  искал: 4.1 {sum(1 for r in old if r.get('sources'))}/{len(old)}, luna {sum(1 for r in new if r.get('sources'))}/{len(new)}")

    # C. Ключевые промпты с расширенными повторностями
    key_rows = [r for r in rows_all if _set(r) == "v1" and r["run"] >= 2]
    if key_rows:
        ids = sorted({r["id"] for r in key_rows})
        full = [r for r in rows_all if _set(r) == "v1" and r["id"] in ids and r["engine"] in ENGINES_V1]
        two = [r for r in full if r["run"] < 2]
        c6, _, _ = trio(full); c2, _, _ = trio(two)
        print(f"\nКлючевые промпты ({len(ids)} category) с повторностями: n=2 (как в v1) против всех прогонов:")
        print(f"  n=2  category {_fmt(*c2)}\n  все  category {_fmt(*c6)}   ← интервал уже, это и есть цель")
        # Разброс между прогонами одного промпта — прямая мера шума
        flips = 0; tot = 0
        for pid in ids:
            for e in ENGINES_V1:
                rr = [db(r) for r in full if r["id"] == pid and r["engine"] == e]
                if len(rr) >= 2:
                    tot += 1
                    if 0 < sum(rr) < len(rr): flips += 1
        print(f"  пар промпт×движок с РАЗНЫМ ответом между прогонами: {flips}/{tot} — это шум, который прячется за n=2")

    # D. Парафразы v2 против исходных формулировок
    v2 = [r for r in rows_all if _set(r) == "v2" and r["engine"] in ENGINES_V1]
    if v2:
        ofs = {r.get("of") for r in v2}
        orig = [r for r in v1_rows(rows_all) if r["id"] in ofs and r["layer"] == "category"]
        c_v2, _, s_v2 = trio(v2); c_o, _, s_o = trio(orig)
        print("\nПарафразы v2 (по 3 на каждый category-промпт v1) против исходных формулировок:")
        print(f"  исходные v1  category {_fmt(*c_o)}   сайт в цитатах {_fmt(*s_o)}")
        print(f"  парафразы v2 category {_fmt(*c_v2)}   сайт в цитатах {_fmt(*s_v2)}")
        by_m = Counter(); by_m_db = Counter()
        for r in v2:
            by_m[r["market"]] += 1
            if db(r): by_m_db[r["market"]] += 1
        print("  v2 по рынкам: " + ", ".join(f"{m} {by_m_db[m]}/{by_m[m]}" for m in ("ID", "SG", "TH", "VN") if by_m[m]))
        print("  Если v2 заметно ниже v1 — видимость привязана к нашим формулировкам (overfit), и это меняет, что писать.")

    # E. Локальные промпты — под GBP и каталоги
    loc = [r for r in rows_all if _set(r) == "local" and r["engine"] in ENGINES_V1]
    if loc:
        c_l, _, s_l = trio(loc)
        dom = Counter()
        for r in loc:
            for d in {urlparse(s.get("url", "")).netloc.lower().removeprefix("www.") for s in (r.get("sources") or [])}:
                if d: dom[d] += 1
        print("\nЛокальные промпты («агентство в Бали/Пхукете»):")
        print(f"  category {_fmt(*c_l)}   сайт в цитатах {_fmt(*s_l)}")
        print("  домены: " + ", ".join(f"{d} {n}" for d, n in dom.most_common(8)))
        maps = sum(1 for r in loc if any("google.com/maps" in s.get("url", "") or "maps.app" in s.get("url", "") for s in (r.get("sources") or [])))
        print(f"  ответов с Google Maps в источниках: {maps}/{len(loc)}")

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("run"); r.add_argument("--prompts", required=True); r.add_argument("--out", required=True)
    r.add_argument("--engines", help="подмножество через запятую, напр. openai (для мостовых прогонов)")
    r.add_argument("--openai-model", help="переопределить OPENAI_MODEL (модель движка openai_luna)")
    r.add_argument("--extra", help="prompts_extra.json: key-повторности, парафразы v2, локальные промпты")
    r.add_argument("--skip-preflight", action="store_true", help="только для отладки; боевой прогон — всегда с проверкой")
    sub.add_parser("preflight", help="проверить деньги и работоспособность всех движков и судьи, ничего не запуская")
    j = sub.add_parser("judge"); j.add_argument("--dir", required=True)
    p = sub.add_parser("report"); p.add_argument("--dir", required=True); p.add_argument("--baseline")
    a = ap.parse_args()
    if a.cmd == "preflight": raise SystemExit(0 if asyncio.run(preflight()) else 2)
    if a.cmd == "run": asyncio.run(cmd_run(a))
    elif a.cmd == "judge": asyncio.run(cmd_judge(a))
    else: cmd_report(a)

if __name__ == "__main__":
    main()
