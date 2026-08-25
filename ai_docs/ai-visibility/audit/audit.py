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

GEMINI_MODELS = ["gemini-flash-latest", "gemini-3.6-flash", "gemini-2.0-flash"]

async def ask_gemini(cl, text):
    last = ""
    for m in GEMINI_MODELS:
        r = await cl.post(
            f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent",
            headers={"x-goog-api-key": ENV("GEMINI_API_KEY")},
            json={"contents": [{"role": "user", "parts": [{"text": text}]}],
                  "tools": [{"google_search": {}}]}, timeout=T)
        if r.status_code == 404:
            last = r.text[:120]; continue
        r.raise_for_status()
        c = (r.json().get("candidates") or [{}])[0]
        out = "".join(p.get("text", "") for p in (c.get("content") or {}).get("parts") or [])
        gm = c.get("groundingMetadata") or {}
        srcs = [{"url": (ch.get("web") or {}).get("uri", ""),
                 "title": (ch.get("web") or {}).get("title", "")}
                for ch in (gm.get("groundingChunks") or [])]
        return out, srcs
    raise RuntimeError(f"gemini: нет модели ({last})")

async def ask_openai(cl, text):
    r = await cl.post("https://api.openai.com/v1/responses",
        headers={"Authorization": f"Bearer {ENV('OPENAI_API_KEY')}"},
        json={"model": "gpt-4.1", "input": text,
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
    return txt, srcs

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
           "openai": ask_openai, "google_aio": ask_aio}

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
    spec = json.load(open(a.prompts))
    prompts, runs = spec["prompts"], spec.get("runs_per_prompt", 2)
    os.makedirs(a.out, exist_ok=True)
    sem = asyncio.Semaphore(10)
    out = []

    async def one(eng, fn, p, i):
        async with sem:
            row = dict(p, engine=eng, run=i, ok=False, text="", sources=[], error="")
            for att in range(3):
                try:
                    row["text"], row["sources"] = await fn(cl, p["text"])
                    row["ok"] = True
                    break
                except Exception as e:
                    row["error"] = str(e)[:200]
                    await asyncio.sleep(2 * (att + 1))
            out.append(row)
            if len(out) % 20 == 0:
                print(f"  {len(out)}/{len(prompts)*runs*len(ENGINES)}", flush=True)

    t0 = time.time()
    async with httpx.AsyncClient(follow_redirects=True) as cl:
        await asyncio.gather(*(one(e, f, p, i) for e, f in ENGINES.items()
                               for p in prompts for i in range(runs)))
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
    return m

def cmd_report(a):
    cur = metrics(load_judged(a.dir))
    base = metrics(load_judged(a.baseline)) if a.baseline else None

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
    print("\nСоветы ИИ (problem):")
    for k, (v, n) in cur["advice"].items():
        print(f"  {k:22s} {pct(v/n):>5s}")
    print("\nНазванные сервисы (топ):")
    for (nm, kind), n in cur["entities"]:
        print(f"  {n:3d}  {kind:12s} {nm[:55]}")
    print("\nЦитируемые домены:")
    for d, (n, tot) in cur["domains"].items():
        star = "  ★" if "booster.delivery" in d else ""
        print(f"  {pct(n/tot):>5s}  {d[:55]}{star}")
    print("\nНапоминание: в VISIBILITY_TRACKING.md записывать рост/падение только по"
          " строкам с пометкой ЗНАЧИМО.")

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("run"); r.add_argument("--prompts", required=True); r.add_argument("--out", required=True)
    j = sub.add_parser("judge"); j.add_argument("--dir", required=True)
    p = sub.add_parser("report"); p.add_argument("--dir", required=True); p.add_argument("--baseline")
    a = ap.parse_args()
    if a.cmd == "run": asyncio.run(cmd_run(a))
    elif a.cmd == "judge": asyncio.run(cmd_judge(a))
    else: cmd_report(a)

if __name__ == "__main__":
    main()
