#!/usr/bin/env python3
"""Ретро-разбор ОСНОВНЫХ прогонов: всплывают ли НАШИ соцсети в источниках/тексте.
Не трогает prompts_v1 и судью — читает уже сохранённые judged.json.gz.
Запуск: python3 analyze_main_socials.py <dir1> [dir2 ...]"""
import gzip, json, sys
from urllib.parse import urlparse

PROFILES = {
    "site booster.delivery":       ["booster.delivery"],
    "YouTube @DeliveryBooster":    ["youtube.com/@deliverybooster"],
    "Instagram delivery.booster":  ["instagram.com/delivery.booster"],
    "Telegram канал _asia":        ["t.me/deliverybooster_asia", "deliverybooster_asia"],
    "Telegram контакт delivery_booster": ["t.me/delivery_booster", "@delivery_booster"],
}

def load(d):
    with gzip.open(f"{d}/judged.json.gz", "rt", encoding="utf-8") as f:
        return json.load(f)["rows"]

def scan(rows):
    n = len(rows)
    res = {}
    for label, needles in PROFILES.items():
        in_src = in_txt = in_any = 0
        for r in rows:
            src = " ".join((s.get("url","")) for s in (r.get("sources") or [])).lower()
            txt = (r.get("text") or "").lower()
            hs = any(x in src for x in needles)
            ht = any(x in txt for x in needles)
            in_src += hs; in_txt += ht; in_any += (hs or ht)
        res[label] = (in_src, in_txt, in_any, n)
    return res

for d in sys.argv[1:]:
    rows = [r for r in load(d) if r.get("ok") and (r.get("text") or "").strip()]
    print(f"\n=== {d}  (n={len(rows)} ответов с текстом) ===")
    print(f"{'профиль':38s} {'в источниках':>13s} {'в тексте':>10s} {'где-либо':>10s}")
    for label,(s,t,a,n) in scan(rows).items():
        print(f"{label:38s} {s:>6d}/{n:<6d} {t:>4d}/{n:<5d} {a:>4d}/{n}")
