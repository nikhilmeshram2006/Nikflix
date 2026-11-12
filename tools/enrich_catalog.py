"""
Enriches js/data.js with:
1. IMDb IDs (tt...) and YouTube trailer IDs from Wikidata & TVmaze for all movies, series, and anime.
2. Full-length direct-stream (.mp4) movies, anime, and series from Internet Archive / Blender Open Movies.
"""
import io
import json
import os
import re
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = {"User-Agent": "NikflixDemo/1.0 (educational clone; contact: hello@nikflix.example)"}

WIKI_MAP = {
    "Inception": "Inception",
    "The Dark Knight": "The_Dark_Knight",
    "Interstellar": "Interstellar_(film)",
    "Titanic": "Titanic_(1997_film)",
    "The Conjuring": "The_Conjuring",
    "Get Out": "Get_Out",
    "A Quiet Place": "A_Quiet_Place",
    "Hereditary": "Hereditary_(film)",
    "It": "It_(2017_film)",
    "The Shining": "The_Shining_(film)",
    "Train to Busan": "Train_to_Busan",
    "The Notebook": "The_Notebook",
    "La La Land": "La_La_Land",
    "Pride & Prejudice": "Pride_&_Prejudice_(2005_film)",
    "Before Sunrise": "Before_Sunrise",
    "Eternal Sunshine of the Spotless Mind": "Eternal_Sunshine_of_the_Spotless_Mind",
    "Spirited Away": "Spirited_Away",
    "Your Name": "Your_Name",
    "Grave of the Fireflies": "Grave_of_the_Fireflies",
    "A Silent Voice": "A_Silent_Voice_(film)",
    "Princess Mononoke": "Princess_Mononoke",
    "Akira": "Akira_(1988_film)",
    "Weathering with You": "Weathering_with_You",
    "Schindler's List": "Schindler's_List",
    "The Green Mile": "The_Green_Mile_(film)",
    "Hachi: A Dog's Tale": "Hachi:_A_Dog's_Tale",
    "Romeo + Juliet": "Romeo_+_Juliet",
    "Requiem for a Dream": "Requiem_for_a_Dream",
    "Joker": "Joker_(2019_film)",
    "Mad Max: Fury Road": "Mad_Max:_Fury_Road",
    "John Wick": "John_Wick_(film)",
    "Avengers: Endgame": "Avengers:_Endgame",
    "The Matrix": "The_Matrix",
    "Dune": "Dune_(2021_film)",
    "Gladiator": "Gladiator_(2000_film)",
    "Parasite": "Parasite_(2019_film)",
    "The Shawshank Redemption": "The_Shawshank_Redemption",
    "Pulp Fiction": "Pulp_Fiction",
    "The Godfather": "The_Godfather",
    "Se7en": "Seven_(1995_film)",
    "Oppenheimer": "Oppenheimer_(film)",
    "Superbad": "Superbad",
    "The Grand Budapest Hotel": "The_Grand_Budapest_Hotel",
    "The Hangover": "The_Hangover",
    "Barbie": "Barbie_(film)",
    "Toy Story": "Toy_Story",
    "Coco": "Coco_(2017_film)",
    "Spider-Man: Into the Spider-Verse": "Spider-Man:_Into_the_Spider-Verse",
    "The Lord of the Rings: The Fellowship of the Ring": "The_Lord_of_the_Rings:_The_Fellowship_of_the_Ring",
    "Harry Potter and the Philosopher's Stone": "Harry_Potter_and_the_Philosopher's_Stone_(film)",
}

FULL_STREAMS = [
    {
        "page": "Night_of_the_Living_Dead",
        "title": "Night of the Living Dead",
        "year": 1968,
        "type": "movie",
        "genres": ["horror", "thriller"],
        "imdb": "tt0063350",
        "ia": "Night.Of.The.Living.Dead_1080p",
        "stream": "https://archive.org/download/Night.Of.The.Living.Dead_1080p/NightOfTheLivingDead.mp4",
    },
    {
        "page": "House_on_Haunted_Hill",
        "title": "House on Haunted Hill",
        "year": 1959,
        "type": "movie",
        "genres": ["horror", "thriller"],
        "imdb": "tt0051744",
        "ia": "house_on_haunted_hill_ipod",
        "stream": "https://archive.org/download/house_on_haunted_hill_ipod/house_on_haunted_hill.mp4",
    },
    {
        "page": "Nosferatu",
        "title": "Nosferatu",
        "year": 1922,
        "type": "movie",
        "genres": ["horror", "tragedy"],
        "imdb": "tt0013442",
        "ia": "Nosferatu_most_complete_version_93_mins.",
        "stream": "https://archive.org/download/Nosferatu_most_complete_version_93_mins./Nosferatu_1922_Symphony_of_Horror_512kb.mp4",
    },
    {
        "page": "Carnival_of_Souls",
        "title": "Carnival of Souls",
        "year": 1962,
        "type": "movie",
        "genres": ["horror", "thriller"],
        "imdb": "tt0055830",
        "ia": "CarnivalofSouls",
        "stream": "https://archive.org/download/CarnivalofSouls/CarnivalOfSouls.mp4",
    },
    {
        "page": "The_Little_Shop_of_Horrors",
        "title": "The Little Shop of Horrors",
        "year": 1960,
        "type": "movie",
        "genres": ["comedy", "horror"],
        "imdb": "tt0054033",
        "ia": "TheLittleShopOfHorrors1960",
        "stream": "https://archive.org/download/TheLittleShopOfHorrors1960/The-Little-Shop-of-Horrors.mp4",
    },
    {
        "page": "His_Girl_Friday",
        "title": "His Girl Friday",
        "year": 1940,
        "type": "movie",
        "genres": ["comedy", "romance"],
        "imdb": "tt0032599",
        "ia": "HisGirlFriday1940",
        "stream": "https://archive.org/download/HisGirlFriday1940/seqhisgirlfridayfull1d.mp4",
    },
    {
        "page": "Metropolis_(1927_film)",
        "title": "Metropolis",
        "year": 1927,
        "type": "movie",
        "genres": ["scifi", "drama", "tragedy"],
        "imdb": "tt0017136",
        "ia": "Metropolis1927EnglishVersion",
        "stream": "https://archive.org/download/Metropolis1927EnglishVersion/Metropolis_1927_English_Version.mp4",
    },
    {
        "page": "The_General_(1926_film)",
        "title": "The General",
        "year": 1926,
        "type": "movie",
        "genres": ["action", "comedy"],
        "imdb": "tt0017925",
        "ia": "TheGeneral1926",
        "stream": "https://archive.org/download/TheGeneral1926/The_General_1926_720p.mp4",
    },
    {
        "page": "Sintel",
        "title": "Sintel",
        "year": 2010,
        "type": "movie",
        "genres": ["fantasy", "action", "tragedy"],
        "imdb": "tt1727587",
        "ia": "Sintel",
        "stream": "https://archive.org/download/Sintel/sintel-2048-stereo.mp4",
    },
    {
        "page": "Gulliver's_Travels_(1939_film)",
        "title": "Gulliver's Travels",
        "year": 1939,
        "type": "movie",
        "genres": ["fantasy", "family", "anime"],
        "imdb": "tt0031397",
        "ia": "GulliversTravels720p_652",
        "stream": "https://archive.org/download/GulliversTravels720p_652/GulliversTravels.mp4",
    },
    {
        "page": "Sherlock_Holmes_and_the_Secret_Weapon",
        "title": "Sherlock Holmes and the Secret Weapon",
        "year": 1942,
        "type": "movie",
        "genres": ["crime", "thriller"],
        "imdb": "tt0035317",
        "ia": "secret_weapon",
        "stream": "https://archive.org/download/secret_weapon/secret_weapon_ipod.mp4",
    },
    {
        "page": "Astro_Boy_(1963_TV_series)",
        "title": "Astro Boy (1963)",
        "year": 1963,
        "type": "series",
        "tvmaze": 6393,
        "genres": ["anime", "scifi", "action", "family"],
        "imdb": "tt0056739",
        "ia": "astro-boy-1963",
        "stream": "https://archive.org/download/astro-boy-1963/Astro%20Boy%20%281963%29%20R1/Astro%20Boy%20S1E001.mp4",
    },
    {
        "page": "Superman_(1940s_animated_film_series)",
        "title": "Superman (Fleischer Series)",
        "year": 1941,
        "type": "series",
        "genres": ["action", "scifi", "family"],
        "imdb": "tt0034247",
        "ia": "superman_1941",
        "stream": "https://archive.org/download/superman_1941/superman_1941_512kb.mp4",
    },
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
    img = Image.open(io.BytesIO(data)).convert("RGB")
    if img.width > width:
        h = round(img.height * width / img.width)
        img = img.resize((width, h), Image.LANCZOS)
    img.save(path, "WEBP", quality=quality, method=6)


def trim(s, n=320):
    s = re.sub(r"\s+", " ", s or "").strip()
    if len(s) <= n:
        return s
    return s[:n].rsplit(" ", 1)[0].rstrip(",;:") + "…"


def fetch_wikidata_meta():
    titles = "|".join(urllib.parse.quote(p.replace("_", " ")) for p in WIKI_MAP.values())
    url = f"https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles={titles}&props=sitelinks|claims&format=json"
    j = get_json(url)
    by_wiki = {}
    for ent in j.get("entities", {}).values():
        sl = (ent.get("sitelinks") or {}).get("enwiki", {}).get("title")
        if not sl:
            continue
        claims = ent.get("claims") or {}
        imdb = None
        yt = None
        if "P345" in claims:
            imdb = claims["P345"][0].get("mainsnak", {}).get("datavalue", {}).get("value")
        if "P1651" in claims:
            yt = claims["P1651"][0].get("mainsnak", {}).get("datavalue", {}).get("value")
        by_wiki[sl] = {"imdb": imdb, "yt": yt}
    return by_wiki


def fetch_tvmaze_imdb(item):
    if not item.get("tvmaze"):
        return
    try:
        s = get_json(f"https://api.tvmaze.com/shows/{item['tvmaze']}")
        imdb = (s.get("externals") or {}).get("imdb")
        if imdb:
            item["imdb"] = imdb
    except Exception as e:
        print("TVmaze imdb err", item["title"], e)


def main():
    data_path = os.path.join(ROOT, "js", "data.js")
    txt = open(data_path, encoding="utf-8").read()
    items = json.loads(txt[txt.index("["): txt.rindex("]") + 1])

    # 1. Enrich movies from Wikidata
    wd = fetch_wikidata_meta()
    for item in items:
        if item["type"] == "movie":
            wpage = WIKI_MAP.get(item["title"], "").replace("_", " ")
            meta = wd.get(wpage) or {}
            if meta.get("imdb"):
                item["imdb"] = meta["imdb"]
            if meta.get("yt"):
                item["yt"] = meta["yt"]

    # 2. Enrich series with IMDb IDs from TVmaze in parallel
    series_items = [i for i in items if i["type"] == "series" and not i.get("imdb")]
    with ThreadPoolExecutor(max_workers=6) as ex:
        list(ex.map(fetch_tvmaze_imdb, series_items))
    for i in items:
        if i["title"] == "Horimiya" and not i.get("imdb"):
            i["imdb"] = "tt13103134"

    # 3. Add full-length streamable titles
    existing_ids = {i["id"] for i in items}
    for fs in FULL_STREAMS:
        prefix = "m-" if fs["type"] == "movie" else "s-"
        slug = prefix + slugify(fs["title"])
        if slug in existing_ids:
            # Update existing if already present
            for i in items:
                if i["id"] == slug:
                    i["stream"] = fs["stream"]
                    i["ia"] = fs["ia"]
                    i["imdb"] = fs["imdb"]
            continue
        try:
            url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(fs["page"], safe="")
            j = get_json(url)
            img = (j.get("originalimage") or j.get("thumbnail") or {}).get("source")
            poster = f"assets/posters/{slug}.webp"
            if img and not os.path.exists(os.path.join(ROOT, poster)):
                save_webp(get_bytes(img), os.path.join(ROOT, poster), 342, 72)
            entry = {
                "id": slug,
                "type": fs["type"],
                "title": fs["title"],
                "year": fs["year"],
                "genres": fs["genres"],
                "rating": 8.1 if fs["type"] == "series" else None,
                "desc": trim(j.get("extract", "")),
                "poster": poster if os.path.exists(os.path.join(ROOT, poster)) else None,
                "backdrop": None,
                "imdb": fs["imdb"],
                "ia": fs["ia"],
                "stream": fs["stream"],
            }
            if fs.get("tvmaze"):
                entry["tvmaze"] = fs["tvmaze"]
            items.insert(0, entry)
            print("Added full stream:", fs["title"])
        except Exception as e:
            print("Failed full stream:", fs["title"], e)

    js = ("/* Auto-generated catalog - do not edit by hand. */\n"
          "window.CATALOG = " + json.dumps(items, ensure_ascii=False, indent=1) + ";\n")
    with open(data_path, "w", encoding="utf-8") as f:
        f.write(js)
    imdb_count = sum(1 for i in items if i.get("imdb"))
    stream_count = sum(1 for i in items if i.get("stream"))
    print(f"Total items: {len(items)}, with IMDb ID: {imdb_count}, with direct MP4 stream: {stream_count}")


if __name__ == "__main__":
    main()
