#!/usr/bin/env python3
"""
Отчёт-страница по прогону замера AI Visibility (HTML с таблицами сравнения).

Собирает из judged.json.gz всех прогонов ряд v1 (29 промптов × первые 2 прогона ×
perplexity/gemini/openai/google_aio) и из целевого прогона — дополнительные слои
(контроль gpt-4.1 против luna, ключевые промпты n=6, парафразы v2, локальные).
Пишет <dir>/report.html и <dir>/_report_data.json. Ключи API не нужны.

Запуск (из ai_docs/ai-visibility/audit):
    python3 report_page.py --dir run-2026-09-15b
Опции: --runs через запятую (по умолчанию — все каталоги baseline-*/run-* по алфавиту,
кроме run-2026-09-02 и run-2026-09-14, которые исключены как неполные).

Добавлено 15.09.2026 по требованию Алекса «нормальный отчёт с таблицами сравнения».
Страница затем публикуется артефактом (Cowork) или отдаётся файлом.
"""
import argparse, gzip, html, json, math, os, glob
from collections import Counter
from urllib.parse import urlparse

V1 = ("perplexity", "gemini", "openai", "google_aio")
EXCLUDE = {"run-2026-09-02", "run-2026-09-14"}   # неполные, в ряд не входят
KEY = ["p008", "p009", "p010", "p011", "p012", "p018", "p020", "p024", "p026", "p028"]
ENG = {"perplexity": "Perplexity", "gemini": "Gemini", "openai": "OpenAI (gpt-4.1)", "google_aio": "Google AI Overview"}
MK = {"ID": "Индонезия", "SG": "Сингапур", "TH": "Таиланд", "VN": "Вьетнам"}
LN = {"en": "Английский", "ru": "Русский", "id": "Индонезийский", "th": "Тайский", "vi": "Вьетнамский"}


def load(d):
    with gzip.open(f"{d}/judged.json.gz", "rt", encoding="utf-8") as f:
        return [r for r in json.load(f)["rows"] if r.get("j")]

def sset(r): return r.get("set") or "v1"
def v1(rows): return [r for r in rows if sset(r) == "v1" and r["run"] < 2 and r["engine"] in V1]
def db(r): return r["j"]["delivery_booster"] == "correct_agency"
def cited(r): return "booster.delivery" in " ".join(s.get("url", "") for s in (r.get("sources") or [])).lower()
def searched(r): return bool(r.get("sources"))

def wilson(k, n, z=1.96):
    if not n: return 0, 0, 0
    p = k / n; d = 1 + z * z / n; c = (p + z * z / (2 * n)) / d
    h = (z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d
    return p, max(0, c - h), min(1, c + h)

def label(d):
    base = d.replace("baseline-", "").replace("run-", "")
    y, m, rest = base.split("-", 2)
    day = rest[:2]; suf = rest[2:]
    return f"{day}.{m}{'б' if suf == 'b' else suf}"

def collect(runs, target):
    R = {}
    for d in runs:
        rows = v1(load(d))
        cat = [r for r in rows if r["layer"] == "category"]; prob = [r for r in rows if r["layer"] == "problem"]
        br = [r for r in rows if r["layer"] == "brand"]
        eng = {}
        for e in V1:
            ce = [r for r in cat if r["engine"] == e]; pe = [r for r in prob if r["engine"] == e]
            eng[e] = {"cat": (sum(map(db, ce)), len(ce)), "prob": (sum(map(db, pe)), len(pe)),
                      "prob_search": (sum(map(searched, pe)), len(pe))}
        dom = Counter()
        for r in rows:
            for h in {urlparse(s.get("url", "")).netloc.lower().removeprefix("www.") for s in r.get("sources") or []}:
                if h: dom[h] += 1
        R[d] = {"n": len(rows), "cat": (sum(map(db, cat)), len(cat)), "prob": (sum(map(db, prob)), len(prob)),
                "brand": (sum(map(db, br)), len(br)), "site": (sum(map(cited, rows)), len(rows)),
                "mat2": (sum(1 for r in prob if r["j"]["suggests_hiring_specialist"]), len(prob)),
                "mem": {lay: ((sum(1 for r in rows if r["layer"] == lay and searched(r) and db(r)), sum(1 for r in rows if r["layer"] == lay and searched(r))),
                              (sum(1 for r in rows if r["layer"] == lay and not searched(r) and db(r)), sum(1 for r in rows if r["layer"] == lay and not searched(r))))
                        for lay in ("category", "problem")},
                "eng": eng,
                "mk": {m: (sum(1 for r in cat if r["market"] == m and db(r)), sum(1 for r in cat if r["market"] == m)) for m in MK},
                "lang": {l: (sum(1 for r in cat if r["lang"] == l and db(r)), sum(1 for r in cat if r["lang"] == l)) for l in LN},
                "dom": dom.most_common(14), "gemini_n": sum(1 for r in rows if r["engine"] == "gemini")}
    rows = load(target)
    pv1 = {p["id"]: p["text"] for p in json.load(open("prompts_v1.json"))["prompts"]}
    pex = {p["id"]: p for p in json.load(open("prompts_extra.json"))["prompts"]} if os.path.exists("prompts_extra.json") else {}
    X = {"key": {}, "v2": {}, "local": {}, "models": {}, "named": []}
    for k in KEY:
        rr = [r for r in rows if sset(r) == "v1" and r["id"] == k and r["engine"] in V1]
        if not rr: continue
        X["key"][k] = {"text": pv1[k], "all": (sum(map(db, rr)), len(rr)),
                       "n2": (sum(1 for r in rr if r["run"] < 2 and db(r)), sum(1 for r in rr if r["run"] < 2)),
                       "eng": {e: (sum(1 for r in rr if r["engine"] == e and db(r)), sum(1 for r in rr if r["engine"] == e)) for e in V1}}
    for r in rows:
        if sset(r) == "v2" and r["engine"] in V1:
            v = X["v2"].setdefault(r["id"], {"of": r.get("of"), "text": pex[r["id"]]["text"], "market": r["market"], "hit": 0, "n": 0})
            v["n"] += 1; v["hit"] += db(r)
        if sset(r) == "local" and r["engine"] in V1:
            v = X["local"].setdefault(r["id"], {"text": pex[r["id"]]["text"], "hit": 0, "n": 0, "cited": 0})
            v["n"] += 1; v["hit"] += db(r); v["cited"] += cited(r)
    for e in ("openai", "openai_luna"):
        rr = [r for r in rows if sset(r) == "v1" and r["run"] < 2 and r["engine"] == e]
        if rr:
            X["models"][e] = {lay: {"db": (sum(1 for r in rr if r["layer"] == lay and db(r)), sum(1 for r in rr if r["layer"] == lay)),
                                    "search": (sum(1 for r in rr if r["layer"] == lay and searched(r)), sum(1 for r in rr if r["layer"] == lay)),
                                    "cited": (sum(1 for r in rr if r["layer"] == lay and cited(r)), sum(1 for r in rr if r["layer"] == lay))}
                              for lay in ("category", "problem", "brand")}
    ag = Counter()
    for r in v1(rows):
        for s_ in r["j"]["named_services"]:
            if s_["kind"] in ("agency", "software_pos"): ag[(s_["name"].strip(), s_["kind"])] += 1
    X["named"] = [[list(k), n] for k, n in ag.most_common(15)]
    X["flips"] = None
    if X["key"]:
        flips = tot = 0
        for k in X["key"]:
            for e in V1:
                rr = [db(r) for r in rows if sset(r) == "v1" and r["id"] == k and r["engine"] == e]
                if len(rr) >= 2:
                    tot += 1; flips += 0 < sum(rr) < len(rr)
        X["flips"] = (flips, tot)
    return R, X


def render(R, X, runs, target):
    E = html.escape
    def pc(k, n): return f"{round(100 * k / n)}%" if n else "—"
    def cell(k, n, ci=False, cls=""):
        if not n: return '<td class="num">—</td>'
        p, lo, hi = wilson(k, n)
        s = f'<b>{round(p * 100)}%</b> <span class="frac">{k}/{n}</span>'
        if ci: s += f'<span class="ci">{round(lo * 100)}–{round(hi * 100)}</span>'
        return f'<td class="num {cls}">{s}</td>'
    lab = {d: label(d) + ("*" if R[d]["gemini_n"] < 50 else "") for d in runs}
    th = "".join(f"<th>{lab[r]}</th>" for r in runs)
    last = runs[-1]
    def row(name, key, ci=False):
        return f'<tr><th scope="row">{name}</th>' + "".join(cell(*R[r][key], ci=ci, cls=("last" if r == last else "")) for r in runs) + "</tr>"
    t_main = f'<table><thead><tr><th>Метрика (срез v1)</th>{th}</tr></thead><tbody>' + \
        row("Бренд назван, category — главная", "cat", True) + row("Бренд назван, problem", "prob") + \
        row("Бренд корректно описан, brand", "brand") + row("Сайт в источниках ответа", "site") + \
        row("Зрелость-2: допускает делегирование", "mat2") + "</tbody></table>"
    sub = runs[-3:]
    rows = ""
    for e in V1:
        rows += f'<tr><th scope="row">{ENG[e]}</th>' + "".join(cell(*R[r]["eng"][e]["cat"], cls=("last" if r == last else "")) for r in sub) \
            + "".join(cell(*R[r]["eng"][e]["prob"], cls=("last" if r == last else "")) for r in sub) \
            + "".join(cell(*R[r]["eng"][e]["prob_search"]) for r in sub) + "</tr>"
    sh = "".join(f"<th>{lab[r]}</th>" for r in sub)
    t_eng = f'<table><thead><tr><th>Движок</th><th colspan="3">Category — назвали нас</th><th colspan="3">Problem — назвали нас</th><th colspan="3">Problem — движок искал</th></tr><tr><th></th>{sh}{sh}{sh}</tr></thead><tbody>{rows}</tbody></table>'
    t_mk = f'<table><thead><tr><th>Рынок (category)</th>{th}</tr></thead><tbody>' + "".join(
        f'<tr><th scope="row">{MK[m]}</th>' + "".join(cell(*R[r]["mk"][m], cls=("last" if r == last else "")) for r in runs) + "</tr>" for m in MK) + "</tbody></table>"
    t_lang = f'<table><thead><tr><th>Язык промпта (category)</th>{th}</tr></thead><tbody>' + "".join(
        f'<tr><th scope="row">{LN[l]}</th>' + "".join(cell(*R[r]["lang"][l], cls=("last" if r == last else "")) for r in runs) + "</tr>" for l in LN) + "</tbody></table>"
    t_mem = '<table><thead><tr><th>Замер</th><th>Category, движок искал</th><th>Category, из памяти</th><th>Problem, движок искал</th><th>Problem, из памяти</th></tr></thead><tbody>' + "".join(
        f'<tr><th scope="row">{lab[r]}</th>{cell(*R[r]["mem"]["category"][0])}{cell(*R[r]["mem"]["category"][1])}{cell(*R[r]["mem"]["problem"][0])}{cell(*R[r]["mem"]["problem"][1])}</tr>' for r in runs) + "</tbody></table>"
    mem_cat = sum(R[r]["mem"]["category"][1][0] for r in runs), sum(R[r]["mem"]["category"][1][1] for r in runs)
    mem_prob = sum(R[r]["mem"]["problem"][1][0] for r in runs), sum(R[r]["mem"]["problem"][1][1] for r in runs)

    sec_models = ""
    if "openai_luna" in X["models"]:
        o, l = X["models"]["openai"], X["models"]["openai_luna"]
        def two(a, b): return f'<td class="num"><b>{a[0]}/{a[1]}</b></td><td class="num"><b>{b[0]}/{b[1]}</b></td>'
        t = '<table><thead><tr><th>Слой</th><th>gpt-4.1 назвал</th><th>luna назвала</th><th>gpt-4.1 процитировал сайт</th><th>luna процитировала</th><th>gpt-4.1 искал</th><th>luna искала</th></tr></thead><tbody>'
        for lay, nm in [("category", "Category"), ("problem", "Problem"), ("brand", "Brand")]:
            t += f'<tr><th scope="row">{nm}</th>{two(o[lay]["db"], l[lay]["db"])}{two(o[lay]["cited"], l[lay]["cited"])}{two(o[lay]["search"], l[lay]["search"])}</tr>'
        t += "</tbody></table>"
        sec_models = f'<h2>Перекрытие моделей: gpt-4.1 против gpt-5.6-luna</h2><p>OpenAI ходит двумя движками: gpt-4.1 — контроль для ряда v1, luna — модель бесплатного ChatGPT. Одни и те же промпты, два прогона.</p><div class="tw">{t}</div>'

    sec_key = ""
    if X["key"]:
        rows = ""
        for k, v in X["key"].items():
            rows += f'<tr><th scope="row"><span class="pid">{k}</span> {E(v["text"])}</th>{cell(*v["n2"])}{cell(*v["all"], ci=True)}' + "".join(f'<td class="num">{v["eng"][e][0]}/{v["eng"][e][1]}</td>' for e in V1) + "</tr>"
        allk = (sum(v["all"][0] for v in X["key"].values()), sum(v["all"][1] for v in X["key"].values()))
        n2k = (sum(v["n2"][0] for v in X["key"].values()), sum(v["n2"][1] for v in X["key"].values()))
        p, lo, hi = wilson(*allk); p2, lo2, hi2 = wilson(*n2k)
        fl = X["flips"]
        sec_key = f'<h2>Ключевые промпты с шестью повторностями</h2><p>Десять category-промптов v1 прогнаны шесть раз вместо двух (в колонку v1 идут только первые два). Итог на всех прогонах: {round(p*100)}% (интервал {round(lo*100)}–{round(hi*100)}) против {round(p2*100)}% ({round(lo2*100)}–{round(hi2*100)}) на n=2. Пар «промпт × движок» с разным ответом между прогонами: {fl[0]} из {fl[1]}.</p><div class="tw"><table><thead><tr><th>Промпт</th><th>n=2 (как в v1)</th><th>все прогоны</th><th>Perplexity</th><th>Gemini</th><th>OpenAI</th><th>AIO</th></tr></thead><tbody>{rows}</tbody></table></div>'

    sec_v2 = ""
    if X["v2"]:
        rows = ""; tot = (sum(v["hit"] for v in X["v2"].values()), sum(v["n"] for v in X["v2"].values()))
        for m in MK:
            for of in KEY:
                items = sorted((k, v) for k, v in X["v2"].items() if v["of"] == of and v["market"] == m)
                if not items or of not in X["key"]: continue
                ov = X["key"][of]
                rows += f'<tr class="orig"><th scope="row"><span class="pid">{of}</span> {E(ov["text"])}</th>{cell(*ov["n2"])}<td>{MK[m]} · исходный v1</td></tr>'
                for k, v in items:
                    rows += f'<tr><th scope="row" class="sub"><span class="pid">{k}</span> {E(v["text"])}</th>{cell(v["hit"], v["n"])}<td></td></tr>'
        bym = {m: (sum(v["hit"] for v in X["v2"].values() if v["market"] == m), sum(v["n"] for v in X["v2"].values() if v["market"] == m)) for m in MK}
        sec_v2 = f'<h2>Перефразировки v2 против исходных формулировок</h2><p>По три перефразировки к каждому category-промпту. Итог: {pc(*tot)} ({tot[0]}/{tot[1]}) против {pc(*R[last]["cat"])} на исходных. По рынкам: ' + ", ".join(f"{MK[m]} {pc(*bym[m])} ({bym[m][0]}/{bym[m][1]})" for m in MK) + f'.</p><div class="tw"><table><thead><tr><th>Формулировка</th><th>Назвали нас</th><th></th></tr></thead><tbody>{rows}</tbody></table></div>'

    sec_loc = ""
    if X["local"]:
        rows = "".join(f'<tr><th scope="row"><span class="pid">{k}</span> {E(v["text"])}</th>{cell(v["hit"], v["n"])}{cell(v["cited"], v["n"])}</tr>' for k, v in sorted(X["local"].items()))
        sec_loc = f'<h2>Локальные запросы</h2><div class="tw"><table><thead><tr><th>Локальный запрос</th><th>Назвали нас</th><th>Сайт в источниках</th></tr></thead><tbody>{rows}</tbody></table></div>'

    prev = runs[-2] if len(runs) > 1 else None
    da = dict(R[prev]["dom"]) if prev else {}; dbm = dict(R[last]["dom"])
    rows = "".join(f'<tr><th scope="row">{E(k)}{" ★" if k == "booster.delivery" else ""}</th><td class="num">{pc(da.get(k, 0), R[prev]["n"]) if prev else "—"}</td><td class="num last"><b>{pc(dbm[k], R[last]["n"])}</b></td></tr>' for k, _ in R[last]["dom"])
    t_dom = f'<table><thead><tr><th>Домен в источниках</th><th>{lab[prev] if prev else ""}</th><th>{lab[last]}</th></tr></thead><tbody>{rows}</tbody></table>'
    rows = "".join(f'<tr><th scope="row">{E(n)}</th><td>{"агентство" if kind == "agency" else "софт / POS"}</td><td class="num"><b>{c}</b></td></tr>' for (n, kind), c in X["named"])
    t_named = f'<table><thead><tr><th>Кого называют рядом с площадками</th><th>Тип</th><th>Упоминаний</th></tr></thead><tbody>{rows}</tbody></table>'

    kf = f'''<div class="kf">
<div><b>{pc(*R[last]["cat"])}</b><span>бренд назван в category ({R[last]["cat"][0]}/{R[last]["cat"][1]})</span></div>
<div><b>{pc(*R[last]["site"])}</b><span>ответов ссылаются на booster.delivery</span></div>
<div><b>{mem_cat[0] + mem_prob[0]} / {mem_cat[1] + mem_prob[1]}</b><span>упоминаний из памяти движков за все замеры ряда</span></div>
<div><b>{pc(*R[last]["mat2"])}</b><span>problem-ответов допускают делегирование</span></div>
</div>'''
    css = '''<style>
:root{--paper:#f6f8f6;--ink:#1b2320;--muted:#5d6a64;--rule:#d5ddd8;--soft:#e9eeeb;--accent:#1e7a4c;--warn:#b0531b;--hi:#e6f3ea}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--paper:#131917;--ink:#e6ece8;--muted:#9aa8a1;--rule:#2b3531;--soft:#1c2522;--accent:#5fc78f;--warn:#e69a5c;--hi:#1d3327}}
:root[data-theme="dark"]{--paper:#131917;--ink:#e6ece8;--muted:#9aa8a1;--rule:#2b3531;--soft:#1c2522;--accent:#5fc78f;--warn:#e69a5c;--hi:#1d3327}
body{background:var(--paper);color:var(--ink);font-family:"Source Sans 3",system-ui,sans-serif;font-size:17px;line-height:1.55;margin:0;padding-block:32px 80px;padding-inline:20px}
.wrap{max-width:960px;margin:0 auto}
h1,h2,h3{font-family:Manrope,system-ui,sans-serif;text-wrap:balance;line-height:1.15}
h1{font-size:2.1rem;font-weight:800;margin:0 0 .4rem}
h2{font-size:1.35rem;font-weight:700;margin:2.6rem 0 .6rem;padding-top:1.2rem;border-top:1px solid var(--rule)}
h3{font-size:1.05rem;font-weight:700;margin:1.6rem 0 .4rem}
.eyebrow{font-family:"JetBrains Mono",monospace;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
p{max-width:72ch;margin:.5rem 0}
.kf{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;margin:1.4rem 0}
.kf div{background:var(--soft);padding:14px 16px;border-left:3px solid var(--accent)}
.kf b{font-family:Manrope,sans-serif;font-size:1.6rem;display:block;font-variant-numeric:tabular-nums}
.kf span{color:var(--muted);font-size:.92rem}
.tw{overflow-x:auto;margin:.8rem 0 1.2rem}
table{border-collapse:collapse;width:100%;font-size:.93rem;min-width:560px}
th,td{padding:7px 10px;border-bottom:1px solid var(--rule);text-align:left;vertical-align:top}
thead th{font-family:"JetBrains Mono",monospace;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);font-weight:600;border-bottom:2px solid var(--rule)}
tbody th{font-weight:600;max-width:420px} tbody th.sub{font-weight:400;padding-left:24px}
tr.orig th,tr.orig td{background:var(--soft)}
td.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap} td.last{background:var(--hi)}
.frac{color:var(--muted);font-size:.85em} .ci{display:block;color:var(--muted);font-size:.72em;font-family:"JetBrains Mono",monospace}
.pid{font-family:"JetBrains Mono",monospace;font-size:.75em;color:var(--muted);margin-right:6px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:24px} @media (max-width:720px){.two{grid-template-columns:1fr}}
</style>'''
    return f'''<title>Замер {label(target)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap">
{css}
<div class="wrap">
<div class="eyebrow">AI Visibility · Delivery Booster · прогон {E(target)}</div>
<h1>Замер {label(target)}</h1>
<p>Срез v1 (29 промптов × 2 прогона × 4 движка) сравним со всеми колонками; звёздочка — неполный прогон (Gemini &lt; 50 ответов). «Значимо» — только непересекающиеся интервалы Уилсона. Выводы словами — в VISIBILITY_TRACKING.md, эта страница — цифры.</p>
{kf}
<h2>Главные метрики по всем замерам</h2><div class="tw">{t_main}</div>
<h2>По движкам</h2><div class="tw">{t_eng}</div>
<h2>Рынки и языки</h2><div class="two"><div><h3>По рынку промпта</h3><div class="tw">{t_mk}</div></div><div><h3>По языку промпта</h3><div class="tw">{t_lang}</div></div></div>
<h2>Память против поиска</h2><p>Ответ без источников — движок не открывал веб. Из памяти за весь ряд: category {mem_cat[0]}/{mem_cat[1]}, problem {mem_prob[0]}/{mem_prob[1]}.</p><div class="tw">{t_mem}</div>
{sec_models}{sec_key}{sec_v2}{sec_loc}
<h2>Источники и соседи по ответу</h2><div class="two"><div><h3>Домены в источниках (v1-срез)</h3><div class="tw">{t_dom}</div></div><div><h3>Кого называют (v1-срез)</h3><div class="tw">{t_named}</div></div></div>
<p class="eyebrow" style="margin-top:2.5rem">Сырые данные: audit/{E(target)} · методика: AUDIT_METHOD.md · ряд: VISIBILITY_TRACKING.md</p>
</div>
'''


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", required=True)
    ap.add_argument("--runs", help="каталоги через запятую; по умолчанию все baseline-*/run-* кроме исключённых")
    a = ap.parse_args()
    target = a.dir.rstrip("/")
    runs = a.runs.split(",") if a.runs else sorted(d for d in glob.glob("baseline-*") + glob.glob("run-*")
                                                   if os.path.isdir(d) and d not in EXCLUDE and os.path.exists(f"{d}/judged.json.gz"))
    if target not in runs: runs.append(target)
    R, X = collect(runs, target)
    json.dump({"runs": R, "extra": X}, open(f"{target}/_report_data.json", "w"), ensure_ascii=False)
    open(f"{target}/report.html", "w", encoding="utf-8").write(render(R, X, runs, target))
    print(f"→ {target}/report.html ({len(runs)} замеров в ряду)")

if __name__ == "__main__":
    main()
