"""
Builds js/data.js for the Netflix-style clone.

- Movies: poster + description from the Wikipedia REST API.
- Series: poster, backdrop, rating + description from the TVmaze API.
- All images are downloaded and compressed to WebP (Pillow) so the site
  never hot-links external images (no broken image links at runtime).

Usage:  python tools/build_catalog.py
"""
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from html import unescape

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTER_DIR = os.path.join(ROOT, "assets", "posters")
BACKDROP_DIR = os.path.join(ROOT, "assets", "backdrops")
UA = {"User-Agent": "NikflixDemo/1.0 (educational clone; contact: hello@nikflix.example)"}

# (wikipedia_page, display_title, year, genres)
MOVIES = [
    ("Inception", "Inception", 2010, ["scifi", "action", "thriller"]),
    ("The_Dark_Knight", "The Dark Knight", 2008, ["action", "crime", "drama"]),
    ("Interstellar_(film)", "Interstellar", 2014, ["scifi", "drama"]),
    ("Titanic_(1997_film)", "Titanic", 1997, ["romance", "tragedy", "drama"]),
    ("The_Conjuring", "The Conjuring", 2013, ["horror"]),
    ("Get_Out", "Get Out", 2017, ["horror", "thriller"]),
    ("A_Quiet_Place", "A Quiet Place", 2018, ["horror", "scifi"]),
    ("Hereditary_(film)", "Hereditary", 2018, ["horror", "tragedy"]),
    ("It_(2017_film)", "It", 2017, ["horror"]),
    ("The_Shining_(film)", "The Shining", 1980, ["horror", "thriller"]),
    ("Train_to_Busan", "Train to Busan", 2016, ["horror", "action"]),
    ("The_Notebook", "The Notebook", 2004, ["romance", "drama"]),
    ("La_La_Land", "La La Land", 2016, ["romance", "drama"]),
    ("Pride_&_Prejudice_(2005_film)", "Pride & Prejudice", 2005, ["romance", "drama"]),
    ("Before_Sunrise", "Before Sunrise", 1995, ["romance"]),
    ("Eternal_Sunshine_of_the_Spotless_Mind", "Eternal Sunshine of the Spotless Mind", 2004, ["romance", "scifi"]),
    ("Spirited_Away", "Spirited Away", 2001, ["anime", "fantasy", "family"]),
    ("Your_Name", "Your Name", 2016, ["anime", "romance", "fantasy"]),
    ("Grave_of_the_Fireflies", "Grave of the Fireflies", 1988, ["anime", "tragedy", "drama"]),
    ("A_Silent_Voice_(film)", "A Silent Voice", 2016, ["anime", "drama", "romance"]),
    ("Princess_Mononoke", "Princess Mononoke", 1997, ["anime", "fantasy", "action"]),
    ("Akira_(1988_film)", "Akira", 1988, ["anime", "scifi", "action"]),
    ("Weathering_with_You", "Weathering with You", 2019, ["anime", "romance", "fantasy"]),
    ("Schindler's_List", "Schindler's List", 1993, ["tragedy", "drama"]),
    ("The_Green_Mile_(film)", "The Green Mile", 1999, ["tragedy", "drama", "fantasy"]),
    ("Hachi:_A_Dog's_Tale", "Hachi: A Dog's Tale", 2009, ["tragedy", "drama", "family"]),
    ("Romeo_+_Juliet", "Romeo + Juliet", 1996, ["romance", "tragedy"]),
    ("Requiem_for_a_Dream", "Requiem for a Dream", 2000, ["tragedy", "drama"]),
    ("Joker_(2019_film)", "Joker", 2019, ["crime", "thriller", "tragedy"]),
    ("Mad_Max:_Fury_Road", "Mad Max: Fury Road", 2015, ["action", "scifi"]),
    ("John_Wick_(film)", "John Wick", 2014, ["action", "thriller"]),
    ("Avengers:_Endgame", "Avengers: Endgame", 2019, ["action", "scifi"]),
    ("The_Matrix", "The Matrix", 1999, ["scifi", "action"]),
    ("Dune_(2021_film)", "Dune", 2021, ["scifi", "action"]),
    ("Gladiator_(2000_film)", "Gladiator", 2000, ["action", "drama", "tragedy"]),
    ("Parasite_(2019_film)", "Parasite", 2019, ["thriller", "drama"]),
    ("The_Shawshank_Redemption", "The Shawshank Redemption", 1994, ["drama", "crime"]),
    ("Pulp_Fiction", "Pulp Fiction", 1994, ["crime", "thriller"]),
    ("The_Godfather", "The Godfather", 1972, ["crime", "drama"]),
    ("Seven_(1995_film)", "Se7en", 1995, ["crime", "thriller"]),
    ("Oppenheimer_(film)", "Oppenheimer", 2023, ["drama"]),
    ("Superbad", "Superbad", 2007, ["comedy"]),
    ("The_Grand_Budapest_Hotel", "The Grand Budapest Hotel", 2014, ["comedy"]),
    ("The_Hangover", "The Hangover", 2009, ["comedy"]),
    ("Barbie_(film)", "Barbie", 2023, ["comedy", "fantasy"]),
    ("Toy_Story", "Toy Story", 1995, ["family", "comedy"]),
    ("Coco_(2017_film)", "Coco", 2017, ["family", "fantasy"]),
    ("Spider-Man:_Into_the_Spider-Verse", "Spider-Man: Into the Spider-Verse", 2018, ["action", "family"]),
    ("The_Lord_of_the_Rings:_The_Fellowship_of_the_Ring", "The Lord of the Rings: The Fellowship of the Ring", 2001, ["fantasy", "action"]),
    ("Harry_Potter_and_the_Philosopher's_Stone_(film)", "Harry Potter and the Philosopher's Stone", 2001, ["fantasy", "family"]),
]

# (tvmaze query OR int id, genres)
SERIES = [
    ("Stranger Things", ["scifi", "horror", "drama"]),
    ("Breaking Bad", ["crime", "drama", "thriller"]),
    ("Game of Thrones", ["fantasy", "action", "drama", "tragedy"]),
    ("The Witcher", ["fantasy", "action"]),
    ("Wednesday", ["comedy", "fantasy", "horror"]),
    (27436, ["crime", "thriller", "action"], "Money Heist"),
    ("Squid Game", ["thriller", "drama", "tragedy"]),
    ("Dark", ["scifi", "thriller"]),
    ("The Crown", ["drama"]),
    ("Bridgerton", ["romance", "drama"]),
    ("Peaky Blinders", ["crime", "drama"]),
    ("The Office", ["comedy"]),
    ("Friends", ["comedy", "romance"]),
    ("Brooklyn Nine-Nine", ["comedy", "crime"]),
    ("The Haunting of Hill House", ["horror", "tragedy", "drama"]),
    ("The Walking Dead", ["horror", "action", "drama"]),
    ("Black Mirror", ["scifi", "thriller"]),
    ("The Boys", ["action", "scifi", "comedy"]),
    ("Sherlock", ["crime", "thriller"]),
    ("Normal People", ["romance", "drama", "tragedy"]),
    ("Emily in Paris", ["romance", "comedy"]),
    ("The Last of Us", ["horror", "drama", "action", "tragedy"]),
    ("Chernobyl", ["tragedy", "drama"]),
    (55138, ["action", "fantasy", "scifi"], "Arcane"),
    ("Midnight Mass", ["horror", "tragedy"]),
    ("Naruto", ["anime", "action", "fantasy"]),
    (1505, ["anime", "action", "comedy", "fantasy"]),
    ("Attack on Titan", ["anime", "action", "horror", "tragedy"]),
    ("Death Note", ["anime", "thriller", "crime"]),
    (41469, ["anime", "action", "fantasy"]),
    ("Jujutsu Kaisen", ["anime", "action", "horror"]),
    ("Fullmetal Alchemist: Brotherhood", ["anime", "action", "fantasy", "tragedy"]),
    (6605, ["anime", "romance", "tragedy"], "Your Lie in April"),
    ("Clannad", ["anime", "romance", "tragedy"]),
    ("Cowboy Bebop", ["anime", "scifi", "action"]),
    ("My Hero Academia", ["anime", "action", "comedy"]),
    ("Spy x Family", ["anime", "comedy", "action", "family"]),
    ("Chainsaw Man", ["anime", "horror", "action"]),
    ("Tokyo Ghoul", ["anime", "horror", "tragedy"]),
    ("Violet Evergarden", ["anime", "drama", "tragedy"]),
    ("Toradora!", ["anime", "romance", "comedy"]),
    ("Horimiya", ["anime", "romance", "comedy"]),
]


def get_json(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))


def get_bytes(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def save_webp(data, path, width, quality):
    """Resize + compress an image to WebP."""
    img = Image.open(io.BytesIO(data)).convert("RGB")
    if img.width > width:
        h = round(img.height * width / img.width)
        img = img.resize((width, h), Image.LANCZOS)
    img.save(path, "WEBP", quality=quality, method=6)
    return img.width, img.height


def clean_html(s):
    s = re.sub(r"<[^>]+>", "", s or "")
    return unescape(s).strip()


def trim(s, n=320):
    s = re.sub(r"\s+", " ", s).strip()
    if len(s) <= n:
        return s
    cut = s[:n].rsplit(" ", 1)[0]
    return cut.rstrip(",;:") + "…"


def build_movies(out):
    for page, title, year, genres in MOVIES:
        slug = "m-" + slugify(title)
        try:
            url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(page, safe="")
            j = get_json(url)
            img = (j.get("originalimage") or j.get("thumbnail") or {}).get("source")
            if not img:
                raise RuntimeError("no image")
            poster = f"assets/posters/{slug}.webp"
            if not os.path.exists(os.path.join(ROOT, poster)):
                save_webp(get_bytes(img), os.path.join(ROOT, poster), 342, 72)
            out.append({
                "id": slug, "type": "movie", "title": title, "year": year,
                "genres": genres, "rating": None,
                "desc": trim(j.get("extract", "")),
                "poster": poster, "backdrop": None,
            })
            print("OK   movie ", title)
        except Exception as e:  # noqa
            print("FAIL movie ", title, e, file=sys.stderr)
        time.sleep(0.15)


def build_series(out):
    for entry in SERIES:
        q, genres = entry[0], entry[1]
        display = entry[2] if len(entry) > 2 else None
        try:
            if isinstance(q, int):
                show = get_json(f"https://api.tvmaze.com/shows/{q}")
            else:
                show = get_json("https://api.tvmaze.com/singlesearch/shows?q=" + urllib.parse.quote(q))
            title = display or show["name"]
            slug = "s-" + slugify(title)
            img = (show.get("image") or {}).get("original")
            if not img:
                raise RuntimeError("no image")
            poster = f"assets/posters/{slug}.webp"
            if not os.path.exists(os.path.join(ROOT, poster)):
                save_webp(get_bytes(img), os.path.join(ROOT, poster), 342, 72)

            backdrop = f"assets/backdrops/{slug}.webp"
            if not os.path.exists(os.path.join(ROOT, backdrop)):
                backdrop = None
                time.sleep(0.5)
                imgs = get_json(f"https://api.tvmaze.com/shows/{show['id']}/images")
                bgs = [i for i in imgs if i.get("type") == "background"]
                if bgs:
                    bg_url = bgs[0]["resolutions"]["original"]["url"]
                    backdrop = f"assets/backdrops/{slug}.webp"
                    save_webp(get_bytes(bg_url), os.path.join(ROOT, backdrop), 1280, 62)

            year = int(show["premiered"][:4]) if show.get("premiered") else None
            out.append({
                "id": slug, "type": "series", "title": title, "year": year,
                "genres": genres, "rating": (show.get("rating") or {}).get("average"),
                "desc": trim(clean_html(show.get("summary"))),
                "poster": poster, "backdrop": backdrop,
                "tvmaze": show["id"],
            })
            print(f"OK   series  {q!r:40} -> {show['name']} ({year}) id={show['id']} bg={'y' if backdrop else 'n'}")
        except Exception as e:  # noqa
            print("FAIL series ", q, e, file=sys.stderr)
        time.sleep(0.5)


def main():
    os.makedirs(POSTER_DIR, exist_ok=True)
    os.makedirs(BACKDROP_DIR, exist_ok=True)
    items = []
    build_movies(items)
    build_series(items)
    js = ("/* Auto-generated by tools/build_catalog.py - do not edit by hand. */\n"
          "window.CATALOG = " + json.dumps(items, ensure_ascii=False, indent=1) + ";\n")
    with open(os.path.join(ROOT, "js", "data.js"), "w", encoding="utf-8") as f:
        f.write(js)
    print(f"\nWrote {len(items)} titles to js/data.js")

    # Remove images that are no longer referenced by the catalog.
    used = {i["poster"] for i in items} | {i["backdrop"] for i in items if i["backdrop"]}
    for folder in ("posters", "backdrops"):
        for name in os.listdir(os.path.join(ROOT, "assets", folder)):
            rel = f"assets/{folder}/{name}"
            if rel not in used:
                os.remove(os.path.join(ROOT, rel))
                print("removed unused", rel)


if __name__ == "__main__":
    os.makedirs(os.path.join(ROOT, "js"), exist_ok=True)
    main()
