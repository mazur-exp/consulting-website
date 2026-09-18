# -*- coding: utf-8 -*-
"""Delivery Booster brand-style images (RU) for the Phuket News column package.
Renders: chart1-ru, chart2-ru (1600x900) and short-post-ru (1600x900).
Brand: deep green gradient #125528 -> #0c4320, strip #0a3418, white text, accent #7ec93a, Inter.
No em-dashes anywhere in text.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

FONT_DIR = "/tmp/inter/extras/otf"
LOGO = "/root/.claude/uploads/c42c15b0-0cbe-5463-9eec-c901e5e05cf6/c055ff64-image.png"
OUT = "/mnt/user-data/outputs/charts-ru"
os.makedirs(OUT, exist_ok=True)

W, H = 1600, 900
TOP = (0x12, 0x55, 0x28)
BOT = (0x0c, 0x43, 0x20)
STRIP = (0x0a, 0x34, 0x18)
ACCENT = (0x7e, 0xc9, 0x3a)
WHITE = (255, 255, 255)
MUTED = (0xc9, 0xdc, 0xc9)
GRID = (0x2a, 0x6b, 0x3c)
BAR_MAIN = (0x8c, 0xd4, 0x3f)
BAR_2 = (0x3f, 0x95, 0x54)
BAR_3 = (0x2f, 0x7a, 0x45)
BAR_WARN = (0xe5, 0xb8, 0x4a)
BAR_BAD = (0xd9, 0x6f, 0x45)
DARK_TXT = (0x0a, 0x2e, 0x14)


def font(weight, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, f"Inter-{weight}.otf"), size)


def canvas():
    im = Image.new("RGB", (W, H), TOP)
    px = im.load()
    for y in range(H):
        t = y / (H - 1)
        c = tuple(int(TOP[i] + (BOT[i] - TOP[i]) * t) for i in range(3))
        for x in range(W):
            px[x, y] = c
    d = ImageDraw.Draw(im)
    d.rectangle([0, H - 78, W, H], fill=STRIP)
    return im, d


def logo(im, cx=1466, cy=120, r=72):
    lg = Image.open(LOGO).convert("RGB").resize((r * 2, r * 2), Image.LANCZOS)
    mask = Image.new("L", (r * 2, r * 2), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, r * 2 - 1, r * 2 - 1], fill=255)
    # soft shadow
    sh = Image.new("RGBA", (r * 2 + 40, r * 2 + 40), (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse([20, 24, r * 2 + 20, r * 2 + 24], fill=(0, 0, 0, 110))
    sh = sh.filter(ImageFilter.GaussianBlur(10))
    im.paste(sh, (cx - r - 20, cy - r - 20), sh)
    im.paste(lg, (cx - r, cy - r), mask)


def header(d, title, subtitle):
    d.text((80, 80), title, font=font("Bold", 46), fill=WHITE)
    d.rectangle([80, 136, 268, 141], fill=ACCENT)
    d.text((80, 156), subtitle, font=font("Regular", 22), fill=MUTED)


def footer(d, source):
    d.text((80, H - 51), "booster.delivery", font=font("SemiBold", 22), fill=WHITE)
    f = font("Regular", 19)
    w = d.textlength(source, font=f)
    d.text((W - 80 - w, H - 49), source, font=f, fill=MUTED)


def center_text(d, box, lines, f, fill):
    x0, y0, x1, y1 = box
    hs = [d.textbbox((0, 0), l, font=f)[3] for l in lines]
    total = sum(hs) + 4 * (len(lines) - 1)
    y = (y0 + y1) / 2 - total / 2
    for l, h in zip(lines, hs):
        w = d.textlength(l, font=f)
        d.text(((x0 + x1) / 2 - w / 2, y), l, font=f, fill=fill)
        y += h + 4


SOURCE = "Источник: бенчмарк Delivery Booster 2026 · 96 ресторанов · 270 568 заказов · январь-август 2026"


def chart1():
    im, d = canvas()
    header(d, "Где теряется выручка доставки",
           "Доля выручки, потерянной до того, как она заработана, и её причины: Бали против Пхукета")
    logo(im)
    x0, x1 = 80, 1520
    y_axis_top, y_axis_bot = 225, 700
    # grid
    for i in range(7):
        x = x0 + (x1 - x0) * i / 6
        d.line([x, y_axis_top, x, y_axis_bot], fill=GRID, width=1)
        lab = f"{i*5}%"
        f = font("Regular", 18)
        w = d.textlength(lab, font=f)
        d.text((x - w / 2 if 0 < i < 6 else (x if i == 0 else x - w), 705), lab, font=f, fill=MUTED)
    d.text((1320, 234), "доля выручки доставки", font=font("Regular", 18), fill=MUTED)
    scale = (x1 - x0) / 30.0

    def bar(y, total, parts, label, big, sublines):
        d.text((60, y - 45), label, font=font("SemiBold", 24), fill=WHITE)
        x = x0
        cols = [BAR_MAIN, BAR_2, BAR_3]
        for i, p in enumerate(parts):
            w = p * scale
            d.rectangle([x, y, x + w, y + 95], fill=cols[i], outline=(0x0c, 0x43, 0x20), width=2)
            x += w
        center_text(d, (x0, y, x0 + parts[0] * scale, y + 95), sublines, font("SemiBold", 20 if len(sublines) < 3 else 18), DARK_TXT)
        d.text((x + 24, y + 8), big, font=font("Bold", 34), fill=WHITE)
        d.text((x + 24, y + 48), "выручки", font=font("Bold", 30), fill=WHITE)

    bar(315, 25, [25 * 0.95, 25 * 0.03, 25 * 0.02], "Бали · 84 ресторана", "25%",
        ["Выключенные позиции меню", "95% потерь"])
    bar(540, 6, [6 * 0.93, 6 * 0.07], "Пхукет · 12 ресторанов", "6%",
        ["Выключенные", "позиции меню", "93% потерь"])
    d.text((80, 780), "Пхукет: закрытия и отмены = 7% от потерь в 6% · Бали: блюда, найденные выключенными более 2 000 часов (84 дня)",
           font=font("Regular", 20), fill=MUTED)
    footer(d, SOURCE)
    im.save(f"{OUT}/chart1-lost-revenue-ru.png")


def chart2():
    im, d = canvas()
    header(d, "Окупаемость рекламы падает после 6% выручки",
           "Медианный возврат на рекламу Grab/GoFood по доле выручки, которую ресторан тратит на рекламу (Бали и Пхукет)")
    logo(im)
    x0, x1 = 120, 1520
    y_top, y_bot = 240, 683
    ymax = 16.0
    for v in [0, 4, 8, 12, 16]:
        y = y_bot - (y_bot - y_top) * v / ymax
        d.line([x0, y, x1, y], fill=GRID, width=1)
        f = font("Regular", 18)
        lab = f"{v}x"
        w = d.textlength(lab, font=f)
        d.text((x0 - 14 - w, y - 11), lab, font=f, fill=MUTED)
    data = [("0-2%", 12.1, 7, BAR_MAIN), ("2-4%", 12.8, 16, BAR_MAIN), ("4-6%", 11.8, 26, BAR_MAIN),
            ("6-8%", 9.6, 19, BAR_WARN), ("более 8%", 6.9, 16, BAR_BAD)]
    n = len(data)
    slot = (x1 - x0) / n
    bw = 160
    for i, (lab, val, share, col) in enumerate(data):
        cx = x0 + slot * (i + 0.5)
        y = y_bot - (y_bot - y_top) * val / ymax
        d.rectangle([cx - bw / 2, y, cx + bw / 2, y_bot], fill=col)
        f = font("Bold", 30)
        t = f"{val}x".replace(".", ",")
        w = d.textlength(t, font=f)
        d.text((cx - w / 2, y - 44), t, font=f, fill=WHITE)
        center_text(d, (cx - bw / 2, y_bot - 70, cx + bw / 2, y_bot - 10), [f"{share}%", "ресторанов"], font("SemiBold", 18), DARK_TXT)
        f2 = font("Regular", 22)
        w = d.textlength(lab, font=f2)
        d.text((cx - w / 2, y_bot + 12), lab, font=f2, fill=WHITE)
    # break line between bar 3 and 4
    bx = x0 + slot * 3
    for yy in range(y_top - 10, y_bot + 2, 14):
        d.line([bx, yy, bx, yy + 7], fill=WHITE, width=2)
    d.text((bx + 14, y_top + 2), "6% выручки: точка перелома", font=font("SemiBold", 22), fill=WHITE)
    d.text((bx + 14, y_top + 32), "выше неё новый бюджет покупает", font=font("Regular", 18), fill=MUTED)
    d.text((bx + 14, y_top + 56), "всё более дорогие заказы", font=font("Regular", 18), fill=MUTED)
    f3 = font("Regular", 18)
    t = "доля выручки на рекламу  →"
    w = d.textlength(t, font=f3)
    d.text((x1 - w, y_bot + 40), t, font=f3, fill=MUTED)
    d.text((80, 780), "Рестораны Пхукета тратят на рекламу меньше 3% выручки при окупаемости 23,6x: признак ненасыщенного рынка, а не повод тратить больше",
           font=font("Regular", 19), fill=MUTED)
    footer(d, SOURCE)
    im.save(f"{OUT}/chart2-ad-payback-ru.png")


def short_post():
    im, d = canvas()
    logo(im, cx=1466, cy=120, r=72)
    d.text((80, 84), "КОЛОНКА В THE PHUKET NEWS · 17.09.2026", font=font("SemiBold", 20), fill=ACCENT)
    y = 130
    for line in ["Рестораны Пхукета", "теряют деньги на Grab.", "Не на комиссии."]:
        d.text((80, y), line, font=font("Bold", 64), fill=WHITE if "Не на" not in line else ACCENT)
        y += 76
    d.rectangle([80, y + 14, 268, y + 19], fill=ACCENT)
    # three stat tiles
    tiles = [("95%", "потерь на Бали:", "выключенные позиции меню"),
             ("93%", "потерь на Пхукете:", "та же причина"),
             ("23x", "окупаемость рекламы,", "но не больше 6% выручки")]
    tx, ty, tw, th, gap = 80, 430, 440, 250, 40
    for i, (big, l1, l2) in enumerate(tiles):
        x = tx + i * (tw + gap)
        d.rounded_rectangle([x, ty, x + tw, ty + th], radius=18, fill=(0x0e, 0x4a, 0x22), outline=(0x1f, 0x6a, 0x33), width=2)
        d.text((x + 28, ty + 26), big, font=font("Bold", 84), fill=ACCENT)
        d.text((x + 28, ty + 140), l1, font=font("SemiBold", 24), fill=WHITE)
        d.text((x + 28, ty + 176), l2, font=font("Regular", 22), fill=MUTED)
    d.text((80, 730), "Данные 200+ ресторанов, прошедших через Delivery Booster с 2023 года · 110+ на сопровождении сегодня",
           font=font("Regular", 20), fill=MUTED)
    footer(d, "booster.delivery/answers/grabfood-phuket-thailand")
    im.save(f"{OUT}/short-post-ru.png")


if __name__ == "__main__":
    chart1()
    chart2()
    short_post()
    print("done", os.listdir(OUT))
