"""
Generates preview screenshots and aesthetic SVG buttons/banners for README.md.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "preview")
os.makedirs(OUT, exist_ok=True)


def load_font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def make_svgs():
    banner = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 280" width="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0b0b"/>
      <stop offset="55%" stop-color="#150708"/>
      <stop offset="100%" stop-color="#2a0508"/>
    </linearGradient>
    <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e50914"/>
      <stop offset="100%" stop-color="#ff3b47"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="280" rx="18" fill="url(#bg)" stroke="#262626" stroke-width="2"/>
  <circle cx="1060" cy="140" r="220" fill="#e50914" opacity="0.08"/>
  <circle cx="980" cy="60" r="120" fill="#e50914" opacity="0.06"/>

  <!-- N Icon -->
  <g transform="translate(64, 62)">
    <rect width="76" height="76" rx="16" fill="#e50914"/>
    <path d="M23 16h10.2l8.8 25V16H52v44h-9.9L33.1 35v25H23z" fill="#ffffff"/>
  </g>

  <!-- Title & Subtitle -->
  <text x="160" y="114" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" letter-spacing="2">NIKFLIX</text>
  <rect x="382" y="84" width="142" height="28" rx="6" fill="#1f090b" stroke="#e50914" stroke-width="1.2"/>
  <text x="453" y="103" text-anchor="middle" fill="#ff4d57" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1.2">STREAMING APP</text>

  <text x="64" y="172" fill="#d4d4d4" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="400">
    Watch and explore Movies, TV Series, and Anime with a custom Theater Video Player, Live Search, and Category Browsing.
  </text>

  <!-- Pill Badges -->
  <g transform="translate(64, 202)" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="600" fill="#cfcfcf">
    <rect x="0" y="0" width="128" height="32" rx="8" fill="#171717" stroke="#2f2f2f"/>
    <text x="64" y="21" text-anchor="middle">106+ Titles Ready</text>

    <rect x="140" y="0" width="164" height="32" rx="8" fill="#171717" stroke="#2f2f2f"/>
    <text x="222" y="21" text-anchor="middle">HTML5 Theater Player</text>

    <rect x="316" y="0" width="162" height="32" rx="8" fill="#171717" stroke="#2f2f2f"/>
    <text x="397" y="21" text-anchor="middle">Redirect Shield ON</text>

    <rect x="490" y="0" width="154" height="32" rx="8" fill="#171717" stroke="#2f2f2f"/>
    <text x="567" y="21" text-anchor="middle">12 Genre Categories</text>

    <rect x="656" y="0" width="150" height="32" rx="8" fill="#171717" stroke="#2f2f2f"/>
    <text x="731" y="21" text-anchor="middle">Mobile &amp; PWA Ready</text>
  </g>
</svg>"""

    btn_live = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 52" width="250" height="50">
  <defs>
    <linearGradient id="r" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e50914"/>
      <stop offset="100%" stop-color="#b80710"/>
    </linearGradient>
  </defs>
  <rect x="1" y="1" width="258" height="50" rx="10" fill="url(#r)" stroke="#ff4b55" stroke-width="1.2"/>
  <polygon points="32,18 32,34 46,26" fill="#ffffff"/>
  <text x="140" y="31" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="14.5" font-weight="800" letter-spacing="0.8">LAUNCH LIVE WEBSITE</text>
</svg>"""

    btn_player = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 52" width="230" height="50">
  <rect x="1" y="1" width="238" height="50" rx="10" fill="#161616" stroke="#383838" stroke-width="1.5"/>
  <circle cx="34" cy="26" r="5" fill="#e50914"/>
  <text x="130" y="31" text-anchor="middle" fill="#f5f5f5" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="0.6">OPEN THEATER PLAYER</text>
</svg>"""

    btn_repo = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 52" width="210" height="50">
  <rect x="1" y="1" width="218" height="50" rx="10" fill="#161616" stroke="#383838" stroke-width="1.5"/>
  <rect x="25" y="19" width="6" height="6" rx="1" fill="#e50914"/>
  <rect x="33" y="19" width="6" height="6" rx="1" fill="#ffffff"/>
  <rect x="25" y="27" width="6" height="6" rx="1" fill="#ffffff"/>
  <rect x="33" y="27" width="6" height="6" rx="1" fill="#e50914"/>
  <text x="124" y="31" text-anchor="middle" fill="#f5f5f5" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="0.6">BROWSE CATEGORIES</text>
</svg>"""

    open(os.path.join(OUT, "banner.svg"), "w", encoding="utf-8").write(banner)
    open(os.path.join(OUT, "btn-live.svg"), "w", encoding="utf-8").write(btn_live)
    open(os.path.join(OUT, "btn-player.svg"), "w", encoding="utf-8").write(btn_player)
    open(os.path.join(OUT, "btn-categories.svg"), "w", encoding="utf-8").write(btn_repo)


def make_home_preview():
    w, h = 1280, 760
    canvas = Image.new("RGB", (w, h), (11, 11, 11))

    # Hero backdrop
    bg_path = os.path.join(ROOT, "assets", "backdrops", "s-stranger-things.webp")
    if os.path.exists(bg_path):
        bg = Image.open(bg_path).convert("RGB").resize((w, 450), Image.LANCZOS)
        # Apply dark gradient overlay
        grad = Image.new("RGBA", (w, 450), (0, 0, 0, 0))
        gd = ImageDraw.Draw(grad)
        for y in range(450):
            alpha = int(min(255, max(85, (y / 450) ** 1.6 * 255)))
            gd.line([(0, y), (w, y)], fill=(11, 11, 11, alpha))
        for x in range(680):
            alpha = int((1 - x / 680) * 180)
            gd.line([(x, 0), (x, 450)], fill=(0, 0, 0, alpha))
        bg_rgba = bg.convert("RGBA")
        bg_rgba.alpha_composite(grad)
        canvas.paste(bg_rgba.convert("RGB"), (0, 0))

    d = ImageDraw.Draw(canvas)
    f_logo = load_font(24, True)
    f_nav = load_font(15, False)
    f_nav_b = load_font(15, True)
    f_h1 = load_font(46, True)
    f_meta = load_font(15, True)
    f_desc = load_font(15, False)
    f_row = load_font(20, True)

    # Top Header
    d.rectangle([0, 0, w, 58], fill=(10, 10, 10))
    d.rounded_rectangle([42, 15, 70, 43], radius=6, fill="#e50914")
    d.text((50, 16), "N", fill="#ffffff", font=load_font(20, True))
    d.text((78, 16), "NIKFLIX", fill="#e50914", font=f_logo)

    nav_items = ["Home", "Movies", "Series", "Categories", "My List"]
    nx = 210
    for idx, label in enumerate(nav_items):
        d.text((nx, 20), label, fill="#ffffff" if idx == 0 else "#b5b5b5", font=f_nav_b if idx == 0 else f_nav)
        nx += len(label) * 9 + 28

    # Search input box in header
    d.rounded_rectangle([940, 14, 1180, 44], radius=5, fill=(22, 22, 22), outline=(80, 80, 80))
    d.text((956, 20), "Titles, genres, years", fill="#8e8e8e", font=load_font(13))
    d.rounded_rectangle([1198, 14, 1230, 44], radius=6, fill="#e50914")
    d.text((1209, 19), "N", fill="#ffffff", font=f_nav_b)

    # Hero Content
    d.text((42, 112), "N   S E R I E S", fill="#e50914", font=load_font(14, True))
    d.text((42, 136), "Stranger Things", fill="#ffffff", font=f_h1)
    d.text((42, 198), "9.0/10   2016   Sci-Fi · Horror · Drama", fill="#46d369", font=f_meta)
    d.text((42, 226), "When a young boy vanishes, a small town uncovers a mystery involving", fill="#e0e0e0", font=f_desc)
    d.text((42, 248), "secret experiments, terrifying supernatural forces and one strange little girl.", fill="#e0e0e0", font=f_desc)

    # Hero Buttons
    d.rounded_rectangle([42, 286, 178, 326], radius=5, fill="#ffffff")
    d.text((70, 297), "Watch Now", fill="#000000", font=f_nav_b)
    d.rounded_rectangle([190, 286, 316, 326], radius=5, fill=(90, 90, 94))
    d.text((218, 297), "More Info", fill="#ffffff", font=f_nav_b)
    d.rounded_rectangle([328, 286, 436, 326], radius=5, fill=(90, 90, 94))
    d.text((352, 297), "+ My List", fill="#ffffff", font=f_nav_b)

    # Row 1: Full-Length Direct Streams & Trending
    d.text((42, 368), "Trending Movies, Series & Anime", fill="#ffffff", font=f_row)
    posters = [
        ("s-cyberpunk-edgerunners.webp", "Series"),
        ("m-inception.webp", "Movie"),
        ("s-attack-on-titan.webp", "Series"),
        ("m-night-of-the-living-dead.webp", "Movie"),
        ("s-breaking-bad.webp", "Series"),
        ("m-your-name.webp", "Movie"),
        ("s-wednesday.webp", "Series"),
    ]
    px = 42
    for fname, badge in posters:
        p_path = os.path.join(ROOT, "assets", "posters", fname)
        if os.path.exists(p_path):
            im = Image.open(p_path).convert("RGB").resize((162, 242), Image.LANCZOS)
            canvas.paste(im, (px, 402))
            d.rounded_rectangle([px + 6, 408, px + 54, 426], radius=3, fill="#e50914" if badge == "Movie" else (20, 20, 20))
            d.text((px + 12, 410), badge.upper(), fill="#ffffff", font=load_font(10, True))
        px += 174

    # Bottom Navigation Bar
    d.rectangle([0, h - 60, w, h], fill=(14, 14, 14))
    d.line([(0, h - 60), (w, h - 60)], fill=(42, 42, 42))
    tabs = ["Home", "Search", "Categories", "Profile"]
    for i, t in enumerate(tabs):
        tx = 420 + i * 130
        d.text((tx, h - 38), t, fill="#e50914" if i == 0 else "#9a9a9a", font=f_nav_b if i == 0 else f_nav)

    canvas.save(os.path.join(OUT, "home-preview.png"), optimize=True)


def make_mobile_preview():
    w, h = 420, 820
    canvas = Image.new("RGB", (w, h), (11, 11, 11))
    bg_path = os.path.join(ROOT, "assets", "backdrops", "s-cyberpunk-edgerunners.webp")
    if os.path.exists(bg_path):
        bg = Image.open(bg_path).convert("RGB").resize((w, 360), Image.LANCZOS)
        grad = Image.new("RGBA", (w, 360), (0, 0, 0, 0))
        gd = ImageDraw.Draw(grad)
        for y in range(360):
            alpha = int(min(255, max(70, (y / 360) ** 1.4 * 255)))
            gd.line([(0, y), (w, y)], fill=(11, 11, 11, alpha))
        bg_rgba = bg.convert("RGBA")
        bg_rgba.alpha_composite(grad)
        canvas.paste(bg_rgba.convert("RGB"), (0, 0))

    d = ImageDraw.Draw(canvas)
    d.rectangle([0, 0, w, 54], fill=(12, 12, 12))
    d.rounded_rectangle([16, 14, 42, 40], radius=5, fill="#e50914")
    d.text((23, 15), "N", fill="#ffffff", font=load_font(18, True))
    d.text((50, 15), "NIKFLIX", fill="#e50914", font=load_font(20, True))

    d.text((18, 175), "N   S E R I E S", fill="#e50914", font=load_font(12, True))
    d.text((18, 195), "Cyberpunk: Edgerunners", fill="#ffffff", font=load_font(26, True))
    d.text((18, 232), "8.3/10  ·  2022  ·  Anime · Sci-Fi", fill="#46d369", font=load_font(13, True))
    d.rounded_rectangle([18, 264, 148, 302], radius=5, fill="#ffffff")
    d.text((40, 274), "Watch Now", fill="#000000", font=load_font(14, True))
    d.rounded_rectangle([158, 264, 272, 302], radius=5, fill=(90, 90, 94))
    d.text((182, 274), "More Info", fill="#ffffff", font=load_font(14, True))

    d.text((18, 332), "Anime & Popular Series", fill="#ffffff", font=load_font(17, True))
    posters = ["s-naruto.webp", "s-one-piece.webp", "s-demon-slayer.webp"]
    px = 18
    for fname in posters:
        p_path = os.path.join(ROOT, "assets", "posters", fname)
        if os.path.exists(p_path):
            im = Image.open(p_path).convert("RGB").resize((120, 180), Image.LANCZOS)
            canvas.paste(im, (px, 362))
        px += 132

    d.text((18, 558), "Browse Categories", fill="#ffffff", font=load_font(17, True))
    cats = [("Anime", "#c9184a"), ("Horror", "#7b0000"), ("Romance", "#b5179e"), ("Tragedy", "#3d405b")]
    for idx, (cname, col) in enumerate(cats):
        cx = 18 + (idx % 2) * 196
        cy = 588 + (idx // 2) * 76
        d.rounded_rectangle([cx, cy, cx + 186, cy + 64], radius=8, fill=col)
        d.text((cx + 14, cy + 34), cname, fill="#ffffff", font=load_font(16, True))

    # Bottom Bar
    d.rectangle([0, h - 58, w, h], fill=(16, 16, 16))
    d.line([(0, h - 58), (w, h - 58)], fill=(45, 45, 45))
    for i, t in enumerate(["Home", "Search", "Categories", "Profile"]):
        d.text((28 + i * 98, h - 36), t, fill="#e50914" if i == 0 else "#9e9e9e", font=load_font(13, i == 0))

    canvas.save(os.path.join(OUT, "mobile-preview.png"), optimize=True)


def make_player_preview():
    src = r"C:\Users\nikhi\.gemini\antigravity\brain\535b1d07-ce29-49ec-962a-73a42cb444eb\.user_uploaded\media_1794508495886_309f197e.jpg"
    if os.path.exists(src):
        im = Image.open(src).convert("RGB")
        im.save(os.path.join(OUT, "player-preview.png"), optimize=True)


if __name__ == "__main__":
    make_svgs()
    make_home_preview()
    make_mobile_preview()
    make_player_preview()
    print("Preview assets generated in assets/preview/")
