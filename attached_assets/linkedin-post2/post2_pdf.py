# -*- coding: utf-8 -*-
"""LinkedIn document for founder post 2: "GrabFood and GoFood are not ad networks".
8 pages 1080x1350 (4:5), vector text (Poppins, as benchmark-2026.pdf), footer with
logo, clickable booster.delivery/method and page number on every page.
No em-dashes anywhere.
"""
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.utils import ImageReader
from PIL import Image, ImageDraw
import os

W, H = 1080, 1350
FD = "/usr/share/fonts/truetype/google-fonts"
for n, f in [("P", "Poppins-Regular"), ("PM", "Poppins-Medium"), ("PS", "Poppins-Medium"), ("PB", "Poppins-Bold")]:
    pdfmetrics.registerFont(TTFont(n, f"{FD}/{f}.ttf"))

BG = HexColor("#0b140d")
BG2 = HexColor("#10251a")
CARD = HexColor("#132a1c")
BORDER = HexColor("#1f3d2a")
WHITE = HexColor("#ffffff")
MUTED = HexColor("#a9c4b0")
MUTED2 = HexColor("#7f9a86")
GREEN = HexColor("#2fd36f")
GREEN_D = HexColor("#1f8f4c")
AMBER = HexColor("#e5b84a")
RED = HexColor("#d96f45")
LINK = "https://booster.delivery/method"
FOOT = "booster.delivery/method"
LOGO = "/root/.claude/uploads/c42c15b0-0cbe-5463-9eec-c901e5e05cf6/c055ff64-image.png"
OUT = "/mnt/user-data/outputs/post2-ads-not-ad-networks.pdf"
TOTAL = 8

# round logo
_lg = Image.open(LOGO).convert("RGBA").resize((120, 120), Image.LANCZOS)
_m = Image.new("L", (120, 120), 0); ImageDraw.Draw(_m).ellipse([0, 0, 119, 119], fill=255)
_lg.putalpha(_m); _lg.save("/tmp/logo_round.png")


def bg(c):
    c.setFillColor(BG); c.rect(0, 0, W, H, fill=1, stroke=0)
    # soft radial glow top-left, drawn as concentric transparent circles
    for i in range(18, 0, -1):
        c.setFillColor(Color(0.12, 0.45, 0.22, alpha=0.018))
        c.circle(150, H - 120, i * 34, fill=1, stroke=0)
    for i in range(14, 0, -1):
        c.setFillColor(Color(0.12, 0.45, 0.22, alpha=0.012))
        c.circle(W - 120, H - 400, i * 30, fill=1, stroke=0)


def footer(c, n):
    c.setStrokeColor(BORDER); c.setLineWidth(1); c.line(72, 96, W - 72, 96)
    c.drawImage("/tmp/logo_round.png", 72, 44, 40, 40, mask="auto")
    c.setFont("PM", 18); c.setFillColor(GREEN)
    c.drawString(126, 57, FOOT)
    tw = pdfmetrics.stringWidth(FOOT, "PM", 18)
    c.linkURL(LINK, (126, 50, 126 + tw, 80), relative=0)
    c.setFont("P", 16); c.setFillColor(MUTED2)
    c.drawRightString(W - 72, 57, f"{n} / {TOTAL}")


def wrap(text, font, size, maxw):
    words = text.split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if pdfmetrics.stringWidth(t, font, size) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines


def para(c, x, y, text, font="P", size=26, color=MUTED, maxw=W - 144, lead=None):
    lead = lead or size * 1.42
    c.setFont(font, size); c.setFillColor(color)
    for ln in wrap(text, font, size, maxw):
        c.drawString(x, y, ln); y -= lead
    return y


def h1(c, y, lines, size=64, accent_from=None):
    for i, ln in enumerate(lines):
        c.setFont("PB", size); c.setFillColor(GREEN if (accent_from is not None and i >= accent_from) else WHITE)
        c.drawString(72, y, ln); y -= size * 1.18
    return y


def rule(c, y):
    c.setStrokeColor(GREEN_D); c.setLineWidth(3); c.line(72, y, 72 + 120, y)


def card(c, x, y, w, h, fill=CARD):
    c.setFillColor(fill); c.setStrokeColor(BORDER); c.setLineWidth(1.5)
    c.roundRect(x, y, w, h, 24, fill=1, stroke=1)


def page1(c):
    bg(c)
    y = h1(c, 1010, ["GrabFood and GoFood", "are not ad networks."], 66)
    y -= 6
    y = h1(c, y, ["Your bid amplifies", "a position.", "It does not create one."], 58, accent_from=0)
    rule(c, y - 6)
    y -= 50
    y = para(c, 72, y, "What the customer funnel of 90 restaurants in Bali says about ad budgets. Reach, menu visits and orders, June to September 2026, plus payback by ad share from the 2026 benchmark.", size=26)
    c.setFont("P", 20); c.setFillColor(MUTED2)
    c.drawString(72, y - 10, "Aleksei Mazur, founder of Delivery Booster. Keep swiping.")
    footer(c, 1)


def page2(c):
    bg(c)
    y = h1(c, 1060, ["Two business models.", "Only one of them", "sells positions."], 56)
    rule(c, y - 4); y -= 60
    # two cards
    cw = (W - 144 - 28) / 2
    card(c, 72, y - 470, cw, 470); card(c, 72 + cw + 28, y - 470, cw, 470, fill=BG2)
    c.setFont("PS", 26); c.setFillColor(WHITE)
    c.drawString(72 + 32, y - 60, "An ad network")
    c.drawString(72 + cw + 60, y - 60, "GrabFood / GoFood")
    yy = para(c, 72 + 32, y - 110, "Earns on impressions.", "P", 23, MUTED, cw - 64)
    yy = para(c, 72 + 32, yy - 8, "Auctions you a position.", "P", 23, MUTED, cw - 64)
    yy = para(c, 72 + 32, yy - 8, "Pay more, rank higher.", "P", 23, MUTED, cw - 64)
    yy = para(c, 72 + 32, yy - 30, "This is the model most owners run their delivery ads on.", "P", 21, MUTED2, cw - 64)
    x2 = 72 + cw + 60
    yy = para(c, x2, y - 110, "Earns a commission on orders.", "P", 23, MUTED, cw - 64)
    yy = para(c, x2, yy - 8, "Its core asset is its own audience.", "P", 23, MUTED, cw - 64)
    yy = para(c, x2, yy - 8, "Ranks by one question: how well does this listing monetise the customers we send it?", "P", 23, MUTED, cw - 64)
    yy = para(c, x2, yy - 30, "A listing that converts is promoted for free. The platform earns more from doing so.", "PM", 21, GREEN, cw - 64)
    y -= 530
    y = para(c, 72, y, "Which is why raising the budget on a listing that does not convert buys you the same failure, faster.", "PS", 30, WHITE)
    footer(c, 2)


def funnel_page(c):
    bg(c)
    y = h1(c, 1090, ["What normal looks like", "on GrabFood in Bali"], 52)
    rule(c, y - 2); y -= 40
    c.setFont("P", 21); c.setFillColor(MUTED2)
    c.drawString(72, y, "90 restaurants · 26 June to 23 September 2026 · 5.8 million people reached")
    c.drawString(72, y - 30, "Medians per restaurant, GrabMerchant dashboards")
    y -= 100
    stages = [("100", "people see the restaurant in the app", 1.0, GREEN_D),
              ("7.4", "open the menu", 0.62, GREEN_D),
              ("0.8", "place an order", 0.30, GREEN)]
    steps = ["7.4% open the menu", "11.5% of menu visitors order"]
    x0 = 72; full = W - 144
    for i, (num, lab, frac, col) in enumerate(stages):
        w = full * frac; x = x0 + (full - w) / 2
        c.setFillColor(col); c.roundRect(x, y - 105, w, 105, 20, fill=1, stroke=0)
        c.setFont("PB", 50); c.setFillColor(WHITE); c.drawCentredString(W / 2, y - 58, num)
        c.setFont("P", 20); c.drawCentredString(W / 2, y - 88, lab)
        y -= 105
        if i < 2:
            c.setFont("PM", 21); c.setFillColor(MUTED); c.drawCentredString(W / 2, y - 32, steps[i])
            y -= 48
    y -= 24
    card(c, 72, y - 250, W - 144, 250)
    c.setFont("PB", 54); c.setFillColor(GREEN); c.drawString(104, y - 70, "0.82%")
    c.setFont("P", 22); c.setFillColor(WHITE); c.drawString(104, y - 104, "typical end-to-end conversion, reach to order")
    yy = para(c, 104, y - 142, "Best restaurant in the sample: 1.85%, more than twice the median, on the same kind of traffic.", "P", 20, MUTED2, W - 144 - 64, lead=28)
    para(c, 104, yy - 4, "Phuket, 13 restaurants: 8.5% open the menu, 11.7% of them order, 0.98% end to end, best 2.8%.", "P", 20, MUTED2, W - 144 - 64, lead=28)
    footer(c, 3)


def page4(c):
    bg(c)
    y = h1(c, 1070, ["Ads move the first", "number. They do", "nothing to the other two."], 54)
    rule(c, y - 2); y -= 60
    y = para(c, 72, y, "Reach is what the budget buys. Whether people open the menu and whether they order is decided by the listing, and the ad pays for every visitor who leaves.", "P", 26, MUTED)
    y -= 30
    cw = (W - 144 - 28) / 2
    card(c, 72, y - 420, cw, 420); card(c, 72 + cw + 28, y - 420, cw, 420)
    for k, (x, big, sub, items) in enumerate([
        (72, "under 7%", "open the menu", ["The problem is in the feed:", "cover photo", "name of the restaurant", "rating", "delivery time shown"]),
        (72 + cw + 28, "under 11%", "of menu visitors order", ["The problem is inside the menu:", "switched-off items", "photos on best sellers", "prices against the area", "promos and bundles"])]):
        c.setFont("PB", 54); c.setFillColor(AMBER if k == 0 else RED); c.drawString(x + 32, y - 78, big)
        c.setFont("P", 22); c.setFillColor(WHITE); c.drawString(x + 32, y - 112, sub)
        yy = y - 170
        for j, it in enumerate(items):
            c.setFont("PM" if j == 0 else "P", 22); c.setFillColor(MUTED if j == 0 else MUTED2)
            c.drawString(x + 32, yy, it if j == 0 else "·  " + it); yy -= 40
    y -= 470
    para(c, 72, y, "Every point below those medians is a share of the ad budget paid for nothing.", "PS", 28, GREEN)
    footer(c, 4)


def page5(c):
    bg(c)
    y = h1(c, 1090, ["Where the money", "actually goes"], 56)
    rule(c, y - 2); y -= 50
    c.setFont("P", 21); c.setFillColor(MUTED2)
    c.drawString(72, y, "Bali & Phuket Delivery Benchmark 2026 · 96 restaurants · 270,568 orders · January to August")
    y -= 70
    card(c, 72, y - 250, W - 144, 250)
    c.setFont("PB", 84); c.setFillColor(GREEN); c.drawString(104, y - 100, "25%")
    c.setFont("P", 24); c.setFillColor(WHITE)
    yy = para(c, 104 + 260, y - 60, "of delivery revenue is lost before it is earned.", "PS", 26, WHITE, W - 144 - 300)
    yy = para(c, 104 + 260, yy - 4, "95% of that is menu items switched off \"for now\" and never switched back on. Ads send people to a menu with holes in it.", "P", 22, MUTED, W - 144 - 300)
    y -= 300
    card(c, 72, y - 250, W - 144, 250)
    c.setFont("PB", 64); c.setFillColor(GREEN); c.drawString(104, y - 90, "10.4x")
    c.setFont("P", 20); c.setFillColor(MUTED2); c.drawString(104, y - 122, "median ads payback, Bali")
    c.setFont("PB", 64); c.setFillColor(GREEN); c.drawString(104, y - 200, "22.8x")
    c.setFont("P", 20); c.setFillColor(MUTED2); c.drawString(104, y - 232, "median ads payback, Phuket")
    yy = para(c, 104 + 330, y - 70, "Only 6% of restaurants run below 5x.", "PS", 25, WHITE, W - 144 - 370)
    yy = para(c, 104 + 330, yy - 4, "Almost none of them has an ads problem. They have a listing problem that the ads are paying to expose.", "P", 22, MUTED, W - 144 - 370)
    footer(c, 5)


def page6(c):
    bg(c)
    y = h1(c, 1090, ["The ceiling is 6%", "of revenue on ads"], 56)
    rule(c, y - 2); y -= 50
    c.setFont("P", 21); c.setFillColor(MUTED2)
    c.drawString(72, y, "Median ROAS by share of revenue spent on ads · 96 restaurants, January to August 2026")
    y -= 60
    data = [("0-2%", 12.1, GREEN_D), ("2-4%", 12.8, GREEN_D), ("4-6%", 11.8, GREEN_D), ("6-8%", 9.6, AMBER), ("over 8%", 6.9, RED)]
    x0, x1 = 100, W - 72; ytop, ybot = y, y - 420; ymax = 14.0
    c.setStrokeColor(BORDER); c.setLineWidth(1)
    for v in (0, 4, 8, 12):
        yy = ybot + (ytop - ybot) * v / ymax
        c.line(x0, yy, x1, yy)
        c.setFont("P", 16); c.setFillColor(MUTED2); c.drawRightString(x0 - 10, yy - 5, f"{v}x")
    slot = (x1 - x0) / len(data); bw = 120
    for i, (lab, val, col) in enumerate(data):
        cx = x0 + slot * (i + 0.5); hh = (ytop - ybot) * val / ymax
        c.setFillColor(col); c.roundRect(cx - bw / 2, ybot, bw, hh, 8, fill=1, stroke=0)
        c.setFont("PB", 26); c.setFillColor(WHITE); c.drawCentredString(cx, ybot + hh + 12, f"{val}x")
        c.setFont("P", 20); c.setFillColor(MUTED); c.drawCentredString(cx, ybot - 30, lab)
    # divider at 6%
    bx = x0 + slot * 3
    c.setStrokeColor(WHITE); c.setDash(6, 8); c.line(bx, ybot - 8, bx, ytop + 10); c.setDash()
    y = ybot - 90
    y = para(c, 72, y, "Below the 6% line the median payback is 12.1x. Above it, 8.6x. 42% of the restaurants in the sample are already past the line.", "PS", 26, WHITE)
    y = para(c, 72, y - 10, "Past 6%, every new rupiah buys impressions on customers who were already going to see you. Budget should follow conversion, not lead it.", "P", 23, MUTED)
    footer(c, 6)


def page7(c):
    bg(c)
    y = h1(c, 1090, ["Check this week,", "in this order, before", "touching the budget"], 52)
    rule(c, y - 2); y -= 56
    steps = [
        ("Insights in GrabMerchant and GoBiz", "Reach, menu visits, orders for the last 30 days. Compare with 7.4% and 11.5%. Reach up and orders flat is a conversion problem, not a reach problem."),
        ("The switched-off items report", "Every dish that is off is a hole in the menu you are paying to advertise."),
        ("Photos and names on your best sellers", "That is where the ad lands. Missing photo on a top seller is the cheapest fix with the biggest effect."),
        ("Rating trend and acceptance time, 30 days", "Both feed the ranking directly. One-star reviews cost more than any bid buys back."),
        ("Only then raise the budget", "And stop at 6% of revenue. Below that line the median payback is 12.1x, above it 8.6x."),
    ]
    for i, (t, d) in enumerate(steps, 1):
        c.setFillColor(GREEN_D); c.circle(96, y - 12, 22, fill=1, stroke=0)
        c.setFont("PB", 22); c.setFillColor(WHITE); c.drawCentredString(96, y - 20, str(i))
        c.setFont("PS", 25); c.setFillColor(WHITE); c.drawString(140, y - 20, t)
        yy = para(c, 140, y - 56, d, "P", 21, MUTED, W - 144 - 68, lead=30)
        y = yy - 30
    footer(c, 7)


def page8(c):
    bg(c)
    y = h1(c, 1060, ["The caveat", "we put on the page"], 56)
    rule(c, y - 2); y -= 60
    y = para(c, 72, y, "This is a sample of agency-managed restaurants, not a random sample of the market. It is biased toward venues that are being watched every day.", "P", 26, MUTED)
    y = para(c, 72, y - 10, "Market-wide losses to switched-off items and wasted ad budget are almost certainly worse than the numbers here.", "PM", 26, GREEN)
    y = para(c, 72, y - 10, "Two periods, two sources, both ours: the funnel is June to September 2026 from GrabMerchant dashboards; payback and losses are January to August 2026 from the published benchmark.", "P", 22, MUTED2)
    y -= 60
    card(c, 72, y - 300, W - 144, 300, fill=BG2)
    c.setFont("PS", 30); c.setFillColor(WHITE); c.drawCentredString(W / 2, y - 80, "The five stages we run on every account")
    c.setFont("PB", 40); c.setFillColor(GREEN); c.drawCentredString(W / 2, y - 140, "booster.delivery/method")
    tw = pdfmetrics.stringWidth("booster.delivery/method", "PB", 40)
    c.linkURL(LINK, (W / 2 - tw / 2, y - 150, W / 2 + tw / 2, y - 100), relative=0)
    c.setStrokeColor(GREEN); c.setLineWidth(2); c.line(W / 2 - tw / 2, y - 150, W / 2 + tw / 2, y - 150)
    c.setFont("P", 22); c.setFillColor(MUTED2); c.drawCentredString(W / 2, y - 200, "Published in full, with the numbers behind each stage.")
    c.drawCentredString(W / 2, y - 236, "Benchmark: booster.delivery/benchmark, updated every quarter.")
    footer(c, 8)


c = canvas.Canvas(OUT, pagesize=(W, H))
c.setTitle("GrabFood & GoFood Ads: Fix Conversion First. Bali & Phuket Funnel Data 2026")
c.setAuthor("Aleksei Mazur, Delivery Booster")
c.setSubject("Customer funnel of 90 GrabFood restaurants in Bali and ads payback by ad share, 2026")
for fn in (page1, page2, funnel_page, page4, page5, page6, page7, page8):
    fn(c); c.showPage()
c.save()
print("saved", OUT, os.path.getsize(OUT))
