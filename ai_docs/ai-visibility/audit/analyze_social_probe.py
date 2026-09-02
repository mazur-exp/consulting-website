#!/usr/bin/env python3
"""Детерминированный разбор соц-спот-чека: находит ли ИИ реальные соцсети DB.
Не трогает основной судья/метрики. Печатает срез по движкам/языкам + все
соц-ссылки, что назвал ИИ (чтобы отличить правильные от выдуманных)."""
import json, re, sys
from collections import Counter, defaultdict

RAW = sys.argv[1] if len(sys.argv) > 1 else "./social-probe-2026-09-02/raw.json"
data = json.load(open(RAW))
rows = [r for r in data["rows"] if r["ok"] and r["text"].strip()]

def blob(r):
    t = r["text"] + " " + " ".join((s.get("url","")+" "+s.get("title","")) for s in (r.get("sources") or []))
    return t.lower()

def has_correct(b):
    yt = ("youtube.com/@deliverybooster" in b) or ("youtube" in b and "@deliverybooster" in b)
    ig = ("instagram.com/delivery.booster" in b) or ("@delivery.booster" in b) or ("delivery.booster" in b and "instagram" in b)
    tgc = ("t.me/deliverybooster_asia" in b) or ("deliverybooster_asia" in b)
    tgk = ("t.me/delivery_booster" in b) or ("@delivery_booster" in b)
    return yt, ig, tgc, tgk

SOCIAL_WORDS = ("youtube", "instagram", "telegram", "facebook", "tiktok", "linkedin", "t.me")
url_re = re.compile(r"(?:https?://)?(?:www\.)?(?:youtube\.com|youtu\.be|instagram\.com|t\.me|facebook\.com|tiktok\.com|linkedin\.com)/[^\s)\]\"'<>,]+", re.I)

n = len(rows)
by_eng = defaultdict(lambda: [0,0])   # eng -> [any_correct, total]
by_lang = defaultdict(lambda: [0,0])
addressed = 0
any_correct_total = 0
found_urls = Counter()
kinds = Counter()

for r in rows:
    b = blob(r)
    yt, ig, tgc, tgk = has_correct(b)
    anyc = yt or ig or tgc or tgk
    if yt: kinds["YouTube @DeliveryBooster"] += 1
    if ig: kinds["Instagram delivery.booster"] += 1
    if tgc: kinds["Telegram канал deliverybooster_asia"] += 1
    if tgk: kinds["Telegram контакт delivery_booster"] += 1
    by_eng[r["engine"]][1] += 1
    by_lang[r["lang"]][1] += 1
    if anyc:
        any_correct_total += 1
        by_eng[r["engine"]][0] += 1
        by_lang[r["lang"]][0] += 1
    if any(w in b for w in SOCIAL_WORDS):
        addressed += 1
    for m in url_re.findall(r["text"]):
        found_urls[m.rstrip('.').lower()] += 1

print(f"=== СОЦ-СПОТ-ЧЕК {data.get('date')} · срез 'ДО' · n={n} ответов (движки live-fetch) ===\n")
print(f"Ответов, где ИИ вообще заговорил о соцсетях/каналах: {addressed}/{n}")
print(f"Ответов, где назван ХОТЯ БЫ ОДИН наш реальный профиль: {any_correct_total}/{n}\n")
print("Наши профили — сколько ответов их назвали правильно:")
for k in ["YouTube @DeliveryBooster","Instagram delivery.booster","Telegram канал deliverybooster_asia","Telegram контакт delivery_booster"]:
    print(f"  {k:42s} {kinds.get(k,0)}/{n}")
print("\nПо движкам (наш профиль назван / всего):")
for e,(k,t) in sorted(by_eng.items()):
    print(f"  {e:12s} {k}/{t}")
print("\nПо языкам:")
for l,(k,t) in sorted(by_lang.items()):
    print(f"  {l:4s} {k}/{t}")
print("\nВСЕ соц-ссылки, которые ИИ назвал в тексте (distinct, с частотой) —")
print("правильные = youtube.com/@DeliveryBooster, instagram.com/delivery.booster, t.me/deliverybooster_asia, t.me/delivery_booster:")
if found_urls:
    for u,c in found_urls.most_common():
        print(f"  {c}×  {u}")
else:
    print("  (ИИ не привёл ни одной соц-ссылки)")
