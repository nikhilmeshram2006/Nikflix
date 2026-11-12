"""Render favicon.ico, apple-touch-icon.png and icon-512.png (same design as favicon.svg)."""
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def icon(size):
    s = size / 32
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=7 * s, fill="#e50914")
    pts = [(10, 7), (14.2, 7), (17.8, 17.4), (17.8, 7), (22, 7), (22, 25), (17.9, 25), (14.2, 14.6), (14.2, 25), (10, 25)]
    d.polygon([(x * s, y * s) for x, y in pts], fill="#ffffff")
    return img


big = icon(512)
big.save(os.path.join(ROOT, "icon-512.png"), optimize=True)
icon(180).save(os.path.join(ROOT, "apple-touch-icon.png"), optimize=True)
big.save(os.path.join(ROOT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("icons written")

