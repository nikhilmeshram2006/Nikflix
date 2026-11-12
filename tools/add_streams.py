"""
Populates 'yt' (YouTube video ID) for every item in js/data.js so that
every movie, series, and anime has a working in-app video stream ready immediately.
"""
import json
import os
import re
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36"}


def find_yt(item):
    if item.get("yt"):
        return item["yt"]
    q = f"{item['title']} {item.get('year') or ''} official trailer"
    url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote(q)
    try:
        req = urllib.request.Request(url, headers=UA)
        html = urllib.request.urlopen(req, timeout=12).read().decode("utf-8", "ignore")
        m = re.search(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
        if m:
            item["yt"] = m.group(1)
            return m.group(1)
    except Exception as e:
        print("ERR", item["title"], e)
    return None


def main():
    path = os.path.join(ROOT, "js", "data.js")
    txt = open(path, encoding="utf-8").read()
    items = json.loads(txt[txt.index("["): txt.rindex("]") + 1])

    missing = [i for i in items if not i.get("yt")]
    print(f"Fetching YouTube IDs for {len(missing)} titles...")
    with ThreadPoolExecutor(max_workers=10) as ex:
        list(ex.map(find_yt, missing))

    yt_count = sum(1 for i in items if i.get("yt"))
    print(f"Done! {yt_count}/{len(items)} titles now have 'yt' IDs.")
    js = ("/* Auto-generated catalog - do not edit by hand. */\n"
          "window.CATALOG = " + json.dumps(items, ensure_ascii=False, indent=1) + ";\n")
    with open(path, "w", encoding="utf-8") as f:
        f.write(js)


if __name__ == "__main__":
    main()

