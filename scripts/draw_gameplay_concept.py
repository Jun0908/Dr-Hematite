"""Draw the project concept illustration as a reproducible PNG.

This is a designed concept image, not a screenshot of an implemented game.
All numbers and map marks in the drawing are illustrative game values.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import random


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "concepts" / "dr-hematite-gameplay-concept.png"
OUT.parent.mkdir(parents=True, exist_ok=True)

W, H = 1800, 1100
random.seed(25)
im = Image.new("RGB", (W, H), (16, 27, 43))
d = ImageDraw.Draw(im)

FONT = "C:/Windows/Fonts/BIZ-UDGothicR.ttc"
BOLD = "C:/Windows/Fonts/BIZ-UDGothicB.ttc"


def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else FONT, size)


def label(x, y, s, size=26, fill="#EAF5F4", bold=False, anchor=None):
    d.text((x, y), s, font=font(size, bold), fill=fill, anchor=anchor,
           stroke_width=0)


def rr(box, fill, radius=20, outline=None, width=2):
    d.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def line(points, fill, width=5, joint="curve"):
    d.line(points, fill=fill, width=width, joint=joint)


def arrow(x0, y0, x1, y1, color="#FFD986", width=6, head=15):
    line([(x0, y0), (x1, y1)], color, width)
    a = math.atan2(y1 - y0, x1 - x0)
    p1 = (x1 - head * math.cos(a - .55), y1 - head * math.sin(a - .55))
    p2 = (x1 - head * math.cos(a + .55), y1 - head * math.sin(a + .55))
    d.polygon([(x1, y1), p1, p2], fill=color)


# Background: cool night above, rust-colored Martian ground below.
for y in range(H):
    t = y / H
    if y < 650:
        c = (int(13 + 34*t), int(29 + 30*t), int(49 + 31*t))
    else:
        z = (y - 650) / 450
        c = (int(90 + 38*z), int(51 + 16*z), int(50 + 7*z))
    d.line([(0, y), (W, y)], fill=c)

for _ in range(110):
    x, y = random.randrange(W), random.randrange(70, 580)
    r = random.choice([1, 1, 1, 2])
    d.ellipse((x-r, y-r, x+r, y+r), fill=(154, 190, 203))

d.ellipse((1390, 72, 1735, 417), fill="#B95342")
d.ellipse((1417, 93, 1707, 384), fill="#CB6951")
for box in [(1470, 148, 1530, 180), (1600, 218, 1660, 244), (1508, 294, 1570, 320)]:
    d.ellipse(box, fill="#AD5248")

d.polygon([(0, 600), (180, 518), (365, 580), (585, 487), (830, 569),
           (1060, 505), (1280, 568), (1550, 500), (1800, 570), (1800, 830), (0, 830)],
          fill="#6A4548")
d.polygon([(0, 690), (270, 632), (545, 686), (760, 620), (1060, 680),
           (1330, 636), (1580, 690), (1800, 625), (1800, 860), (0, 860)],
          fill="#A05A49")
for _ in range(340):
    x, y = random.randrange(W), random.randrange(680, 860)
    r = random.randrange(1, 5)
    d.ellipse((x-r, y-r//2, x+r, y+r//2), fill=random.choice(["#BA7055", "#D3885C", "#784544"]))

# Panel and document frame.
rr((22, 19, 1778, 150), "#102438", 25, "#80C4C3", 3)
label(57, 43, "DR. HEMATITE", 49, "#F9E7BD", True)
label(60, 105, "火星で見つけ、作り、生きのびる", 25, "#BFE5E2", True)
rr((1320, 49, 1738, 125), "#392F39", 20, "#F4B766", 3)
label(1350, 67, "砂嵐まで  あと 3 sol", 29, "#FFE5AB", True)

# HUD.
rr((530, 35, 1295, 135), "#183145", 22, "#45677A", 2)
stats = [(555, "酸素", .62, "#72D6CB"), (800, "水", .46, "#70BAEF"), (1045, "電力", .73, "#F2C66C")]
for sx, title, v, color in stats:
    label(sx, 50, title, 22, "#C8DBE4", True)
    rr((sx, 88, sx+195, 105), "#334554", 8)
    rr((sx, 88, sx+int(195*v), 105), color, 8)
    label(sx+198, 96, f"{int(v*100)}%", 18, "#E7F0F0", True, "lm")

# Observation map panel left.
rr((32, 190, 475, 723), "#152D40", 27, "#76B8C4", 3)
rr((52, 209, 139, 249), "#376073", 11)
label(72, 216, "①", 25, "#F8E6BA", True)
label(151, 211, "地図を読む", 30, "#F9E7BD", True)
label(58, 265, "NASAの観測から氷の候補地へ", 21, "#D1E8E6")
rr((57, 303, 452, 556), "#233D51", 18, "#537D90", 2)
d.ellipse((103, 325, 405, 540), fill="#855B59", outline="#D09A74", width=3)
for lat in (368, 414, 463, 505):
    d.arc((103, lat-26, 405, lat+25), 0, 180, fill="#B27E74", width=2)
for cx in (180, 255, 330):
    d.arc((cx-50, 325, cx+50, 540), 80, 280, fill="#B27E74", width=2)
d.polygon([(150, 360), (250, 337), (340, 365), (387, 397), (320, 408), (239, 391)], fill="#87AFC0")
d.polygon([(172, 359), (249, 350), (315, 370), (292, 387), (210, 380)], fill="#B8D3D9")
for xx, yy in [(172, 366), (258, 376), (339, 389)]:
    d.ellipse((xx-6, yy-6, xx+6, yy+6), fill="#E6FCFF")
line([(143, 484), (185, 475), (217, 458), (246, 425), (277, 404)], "#F8D38A", 5)
for xx, yy in [(143, 484), (277, 404)]:
    d.ellipse((xx-10, yy-10, xx+10, yy+10), fill="#FFCF78", outline="#172D3E", width=3)
label(82, 565, "近い地点：情報が少ない", 21, "#F8DFB2")
label(82, 594, "遠い地点：氷の根拠が強い", 21, "#B9E6EB")
rr((63, 639, 437, 691), "#29485A", 11, "#B6D8D4", 1)
label(80, 653, "調査・試掘して確かめる", 23, "#EAF6EA", True)

# Central habitat world.
rr((508, 190, 1273, 723), "#1C3541", 27, "#DBB37B", 3)
label(540, 213, "② 今日の仕事を決める", 30, "#F9E7BD", True)
label(541, 252, "探査  ／  工作  ／  電力をためる", 22, "#BFD5D7")
# horizon inside panel
d.polygon([(513, 590), (665, 556), (853, 593), (1030, 553), (1267, 582),
           (1267, 715), (513, 715)], fill="#9D5A4B")
d.ellipse((777, 332, 1165, 704), fill="#31555B", outline="#C6DBD1", width=5)
d.pieslice((797, 355, 1145, 687), 180, 360, fill="#79ACAC", outline="#D8E4D8", width=4)
d.pieslice((824, 382, 1118, 675), 180, 360, fill="#A8CDD0", outline="#EBF0E2", width=2)
d.rectangle((790, 518, 1154, 689), fill="#3D6668")
d.rectangle((821, 533, 1125, 680), fill="#508188")
d.rectangle((821, 592, 1125, 680), fill="#486F6C")
for x in [877, 963, 1049]:
    d.rectangle((x, 575, x+7, 682), fill="#D5E9DE")
d.ellipse((915, 435, 1035, 555), fill="#ECF8E7", outline="#7AB8AE", width=7)
label(975, 484, "O2", 36, "#2B766F", True, "mm")
# air pipe & tank
line([(1150, 563), (1214, 563), (1214, 640)], "#D3DBCB", 13)
rr((1187, 622, 1246, 690), "#64A7A0", 14, "#E2E6D4", 4)
# solar panels left
for x0 in (550, 656):
    d.polygon([(x0, 465), (x0+92, 455), (x0+105, 507), (x0+10, 521)], fill="#2E7189", outline="#BBD6C6")
    for dx in (28, 56, 82):
        line([(x0+dx, 463), (x0+dx+10, 514)], "#9CC3BF", 2)
    line([(x0+4, 487), (x0+100, 480)], "#9CC3BF", 2)
    line([(x0+55, 514), (x0+55, 591)], "#D4D4BE", 5)
# astronaut & rover
d.ellipse((585, 572, 645, 632), fill="#F1E8D1", outline="#483D3C", width=3)
d.ellipse((598, 583, 636, 610), fill="#568A9B")
rr((585, 628, 646, 688), "#E6D9C3", 10, "#4E4A4B", 2)
line([(590, 645), (563, 669)], "#E6D9C3", 13)
line([(640, 647), (662, 665)], "#E6D9C3", 13)
line([(600, 688), (592, 707)], "#E6D9C3", 13)
line([(631, 688), (638, 707)], "#E6D9C3", 13)
rr((705, 628, 805, 670), "#D2A66E", 8, "#392E33", 3)
d.polygon([(717, 625), (743, 594), (790, 594), (806, 627)], fill="#E4C48D", outline="#3F3838")
for x in (729, 782):
    d.ellipse((x-16, 660, x+16, 693), fill="#283A43", outline="#C9B692", width=5)
line([(761, 595), (772, 571)], "#DCC9A5", 4)
d.ellipse((767, 562, 779, 574), fill="#F1D59D")
# incoming storm drawn to right edge
for bx in [(1104, 290, 1212, 341), (1158, 283, 1254, 339), (1187, 311, 1270, 353)]:
    d.ellipse(bx, fill="#B78265")
for i in range(13):
    x=1135+i*11
    y=365+i%3*13
    line([(x, y), (x+40, y+5)], "#D39B70", 3)
rr((544, 315, 812, 383), "#273E4C", 14, "#82BFC0", 2)
label(563, 332, "作業員 2人 / 1日", 25, "#DDEBE3", True)
label(550, 696, "作った装置が動き、明日の仕事が空く", 22, "#F4DEAF", True)

# Notebook right.
rr((1305, 190, 1769, 723), "#F1E8CF", 28, "#E2B969", 4)
for yy in range(215, 705, 26):
    d.ellipse((1321, yy, 1334, yy+11), fill="#8A6B5D")
line([(1350, 205), (1350, 708)], "#D0BCAA", 3)
rr((1370, 212, 1740, 259), "#D6B77D", 10)
label(1390, 219, "③ 発明ノート", 29, "#3F3940", True)
label(1382, 280, "酸素がほしい", 27, "#2B4951", True)
label(1383, 324, "見つけた材料をつなぐ", 21, "#685A54")
recipe = [
    (1405, 376, "氷", "#B9D9E2"),
    (1532, 376, "水", "#86C8E3"),
    (1662, 376, "電気", "#F0C76B"),
]
for xx, yy, title, col in recipe:
    rr((xx-38, yy-23, xx+40, yy+55), col, 14, "#71909B", 2)
    label(xx+1, yy+4, title, 24, "#2B4351", True, "mm")
arrow(1450, 412, 1486, 412, "#BC8B68", 4, 10)
label(1463, 369, "融解", 16, "#735D4B", True)
label(1592, 404, "+", 27, "#8D715B", True)
rr((1403, 491, 1715, 577), "#EBD5A8", 17, "#B59773", 2)
label(1424, 506, "電気分解の装置", 26, "#403D3B", True)
label(1425, 541, "水 → 酸素 ＋ 水素", 24, "#2F696C", True)
arrow(1532, 450, 1500, 487, "#AA8064", 5, 12)
arrow(1662, 450, 1645, 487, "#AA8064", 5, 12)
arrow(1560, 580, 1560, 610, "#AA8064", 5, 12)
rr((1385, 613, 1730, 685), "#3B7871", 16)
label(1410, 630, "酸素を基地へ届ける", 24, "#F8F2DF", True)
label(1410, 662, "水素は次の発明にも", 17, "#E1EFCF")

# Bottom progress strip.
rr((30, 759, 1770, 1068), "#12283B", 29, "#D9AD72", 3)
label(67, 785, "作るほど、できることが増える", 37, "#FCE8B7", True)
label(68, 838, "今日の選択", 24, "#9CC6D2", True)
for x, t, sub, col in [
    (66, "探査へ行く", "氷を確かめる", "#276479"),
    (385, "装置を作る", "酸素を増やす", "#936348"),
    (704, "電力を守る", "嵐に備える", "#8B734A"),
]:
    rr((x, 880, x+289, 986), col, 18, "#D8C7A3", 2)
    label(x+22, 894, t, 27, "#FFF2DB", True)
    label(x+22, 938, sub, 21, "#E8E9D5")
arrow(1010, 933, 1130, 933, "#F8D386", 7, 18)
rr((1160, 849, 1718, 1008), "#235A58", 23, "#8DD4BC", 3)
label(1190, 870, "生存の余裕が生まれる", 30, "#EDF3DC", True)
label(1190, 920, "→ もっと遠くへ探査", 23, "#D9F2E5")
label(1190, 958, "→ 新しい道具を発明", 23, "#D9F2E5")
label(57, 1032, "図はゲーム構想。地図の点・ゲージ・残り日数はゲーム上の例示値。NASA観測と現地で確かめた資源は区別する。", 18, "#AFBDC4")

# Subtle film grain to unify the hand-drawn shapes.
grain = Image.new("RGBA", (W, H), (0, 0, 0, 0))
g = ImageDraw.Draw(grain)
for _ in range(22000):
    x = random.randrange(W)
    y = random.randrange(H)
    v = random.choice([220, 245, 255])
    g.point((x, y), fill=(v, v, v, random.randrange(3, 13)))
im = Image.alpha_composite(im.convert("RGBA"), grain).convert("RGB")
im.save(OUT, "PNG", optimize=True)
print(OUT)
