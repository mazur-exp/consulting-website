# -*- coding: utf-8 -*-
"""RU images for the post 2 package (Telegram + short RU variant).
Brand style as press_ru_images.py: green gradient #125528 -> #0c4320, strip #0a3418,
accent #7ec93a, Inter, round logo. No em-dashes.
Renders: funnel-ru.png (1600x900), short-post-2-ru.png (1600x900).
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

FONT_DIR = "/tmp/inter/extras/otf"
LOGO = "/root/.claude/uploads/c42c15b0-0cbe-5463-9eec-c901e5e05cf6/c055ff64-image.png"
OUT = "/mnt/user-data/outputs/post2-ru"
os.makedirs(OUT, exist_ok=True)
W, H = 1600, 900
TOP = (0x12, 0x55, 0x28); BOT = (0x0c, 0x43, 0x20); STRIP = (0x0a, 0x34, 0x18)
ACCENT = (0x7e, 0xc9, 0x3a); WHITE = (255, 255, 255); MUTED = (0xc9, 0xdc, 0xc9)
BAR_MAIN = (0x8c, 0xd4, 0x3f); BAR_2 = (0x3f, 0x95, 0x54); BAR_3 = (0x2f, 0x7a, 0x45)
DARK_TXT = (0x0a, 0x2e, 0x14)


def font(weight, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, f"Inter-{weight}.otf"), size)


def canvas():
    im = Image.new("RGB", (W, H), TOP); px = im.load()
    for y in range(H):
        t = y / (H - 1); c = tuple(int(TOP[i] + (BOT[i] - TOP[i]) * t) for i in range(3))
        for x in range(W): px[x, y] = c
    d = ImageDraw.Draw(im); d.rectangle([0, H - 78, W, H], fill=STRIP)
    return im, d


def logo(im, cx=1466, cy=120, r=72):
    lg = Image.open(LOGO).convert("RGB").resize((r * 2, r * 2), Image.LANCZOS)
    mask = Image.new("L", (r * 2, r * 2), 0); ImageDraw.Draw(mask).ellipse([0, 0, r * 2 - 1, r * 2 - 1], fill=255)
    sh = Image.new("RGBA", (r * 2 + 40, r * 2 + 40), (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse([20, 24, r * 2 + 20, r * 2 + 24], fill=(0, 0, 0, 110)); sh = sh.filter(ImageFilter.GaussianBlur(10))
    im.paste(sh, (cx - r - 20, cy - r - 20), sh); im.paste(lg, (cx - r, cy - r), mask)


def header(d, title, subtitle):
    d.text((80, 80), title, font=font("Bold", 46), fill=WHITE)
    d.rectangle([80, 136, 268, 141], fill=ACCENT)
    d.text((80, 156), subtitle, font=font("Regular", 22), fill=MUTED)


def footer(d, source):
    d.text((80, H - 51), "booster.delivery", font=font("SemiBold", 22), fill=WHITE)
    f = font("Regular", 19); w = d.textlength(source, font=f); d.text((W - 80 - w, H - 49), source, font=f, fill=MUTED)


def funnel():
    im, d = canvas()
    header(d, "Реклама двигает только первую цифру",
           "Воронка медианного ресторана GrabFood на Бали: 90 ресторанов, 26 июня - 23 сентября 2026, 5,8 млн охвата")
    logo(im)
    stages = [("100", "увидели ресторан в приложении", 1.0, BAR_3),
              ("7,4", "открыли меню", 0.62, BAR_2),
              ("0,8", "сделали заказ", 0.32, BAR_MAIN)]
    steps = ["7,4% открыли меню", "11,5% открывших заказали"]
    x0, full = 80, 900; y = 235; bh = 118
    for i, (num, lab, frac, col) in enumerate(stages):
        w = full * frac; x = x0 + (full - w) / 2
        d.rounded_rectangle([x, y, x + w, y + bh], radius=22, fill=col)
        txt_col = DARK_TXT if col == BAR_MAIN else WHITE
        f = font("Bold", 54); tw = d.textlength(num, font=f); d.text((x0 + full / 2 - tw / 2, y + 12), num, font=f, fill=txt_col)
        f2 = font("Regular", 21); tw = d.textlength(lab, font=f2); d.text((x0 + full / 2 - tw / 2, y + 80), lab, font=f2, fill=txt_col)
        y += bh
        if i < 2:
            f3 = font("SemiBold", 21); tw = d.textlength(steps[i], font=f3)
            d.text((x0 + full / 2 - tw / 2, y + 14), steps[i], font=f3, fill=MUTED); y += 58
    # right column
    rx = 1060
    d.text((rx, 250), "0,82%", font=font("Bold", 84), fill=ACCENT)
    d.text((rx, 352), "сквозная конверсия", font=font("SemiBold", 24), fill=WHITE)
    d.text((rx, 384), "охват - заказ, медиана", font=font("Regular", 22), fill=MUTED)
    d.text((rx, 450), "1,85%", font=font("Bold", 56), fill=WHITE)
    d.text((rx, 520), "лучший ресторан выборки,", font=font("Regular", 22), fill=MUTED)
    d.text((rx, 550), "больше чем вдвое на том же трафике", font=font("Regular", 22), fill=MUTED)
    d.text((rx, 620), "Пхукет, 13 ресторанов:", font=font("SemiBold", 22), fill=WHITE)
    d.text((rx, 652), "8,5% открыли, 11,7% заказали,", font=font("Regular", 22), fill=MUTED)
    d.text((rx, 682), "сквозная 0,98%, лучший 2,8%", font=font("Regular", 22), fill=MUTED)
    d.text((80, 785), "Меню открывают меньше 7%: проблема в ленте (обложка, название, рейтинг, время). Заказывают меньше 11% открывших: проблема внутри меню.",
           font=font("Regular", 19), fill=MUTED)
    footer(d, "Источник: кабинеты GrabMerchant ресторанов под управлением Delivery Booster · медианы по заведениям")
    im.save(f"{OUT}/funnel-ru.png")


def short_post():
    im, d = canvas(); logo(im)
    d.text((80, 84), "GRAB И GOJEK НЕ РЕКЛАМНЫЕ ПЛОЩАДКИ", font=font("SemiBold", 20), fill=ACCENT)
    y = 130
    for line, col in [("Ставка усиливает позицию.", WHITE), ("Она её не создаёт.", ACCENT)]:
        d.text((80, y), line, font=font("Bold", 64), fill=col); y += 76
    d.rectangle([80, y + 14, 268, y + 19], fill=ACCENT)
    tiles = [("0,8", "из 100 увидевших", "делают заказ (медиана GrabFood Бали)"),
             ("7,4%", "открывают меню,", "11,5% открывших заказывают"),
             ("6%", "выручки на рекламу:", "выше окупаемость падает с 12,1x до 8,6x")]
    tx, ty, tw, th, gap = 80, 350, 440, 250, 40
    for i, (big, l1, l2) in enumerate(tiles):
        x = tx + i * (tw + gap)
        d.rounded_rectangle([x, ty, x + tw, ty + th], radius=18, fill=(0x0e, 0x4a, 0x22), outline=(0x1f, 0x6a, 0x33), width=2)
        d.text((x + 28, ty + 26), big, font=font("Bold", 84), fill=ACCENT)
        d.text((x + 28, ty + 140), l1, font=font("SemiBold", 24), fill=WHITE)
        d.text((x + 28, ty + 176), l2, font=font("Regular", 21), fill=MUTED)
    d.text((80, 650), "Сначала конверсия, потом бюджет. Никогда наоборот.", font=font("Bold", 34), fill=WHITE)
    d.text((80, 730), "90 ресторанов GrabFood на Бали, 26 июня - 23 сентября 2026 · 110+ ресторанов на сопровождении сегодня, 200+ с 2023 года",
           font=font("Regular", 20), fill=MUTED)
    footer(d, "booster.delivery/answers/grabfood-ads-not-working")
    im.save(f"{OUT}/short-post-2-ru.png")


if __name__ == "__main__":
    funnel(); short_post(); print("done", os.listdir(OUT))
