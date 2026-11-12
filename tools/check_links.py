"""
Site QA: broken links, missing images, page titles, meta descriptions,
favicons, viewport tags and leftover placeholder text.

Usage:  python tools/check_links.py
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
problems = []

html_files = sorted(f for f in os.listdir(ROOT) if f.endswith(".html"))
js_files = [os.path.join("js", f) for f in os.listdir(os.path.join(ROOT, "js")) if f.endswith(".js")]


def exists(rel):
    rel = rel.split("#")[0].split("?")[0]
    return rel == "" or os.path.exists(os.path.join(ROOT, rel))


def check_ref(src, ref):
    if re.match(r"^(https?:|mailto:|tel:|data:|#|javascript:)", ref) or "${" in ref:
        if ref in ("#", "javascript:void(0)"):
            problems.append(f"{src}: dead link '{ref}'")
        return
    if not exists(ref):
        problems.append(f"{src}: broken link -> {ref}")


titles = {}
for f in html_files:
    text = open(os.path.join(ROOT, f), encoding="utf-8").read()
    for ref in re.findall(r'(?:href|src)="([^"]+)"', text):
        check_ref(f, ref)
    for ref in re.findall(r'["`]([a-z0-9-]+\.html(?:[?#][^"`$]*)?)["`]', text):
        check_ref(f, ref)
    t = re.search(r"<title>(.*?)</title>", text, re.S)
    if not t or not t.group(1).strip():
        problems.append(f"{f}: missing <title>")
    else:
        titles.setdefault(t.group(1).strip(), []).append(f)
    d = re.search(r'<meta name="description" content="([^"]*)"', text)
    if not d:
        problems.append(f"{f}: missing meta description")
    elif not 50 <= len(d.group(1)) <= 170:
        problems.append(f"{f}: meta description length {len(d.group(1))} (aim for 50-170)")
    if 'rel="icon"' not in text:
        problems.append(f"{f}: missing favicon")
    if 'name="viewport"' not in text:
        problems.append(f"{f}: missing viewport meta")
    if re.search(r"lorem ipsum|TODO|FIXME|placeholder text|your text here", text, re.I):
        problems.append(f"{f}: placeholder text found")

for title, files in titles.items():
    if len(files) > 1:
        problems.append(f"duplicate <title> '{title}' in {files}")

for f in js_files:
    text = open(os.path.join(ROOT, f), encoding="utf-8").read()
    if f.endswith("data.js"):
        data = json.loads(text[text.index("["): text.rindex("]") + 1])
        for item in data:
            for key in ("poster", "backdrop"):
                if item.get(key) and not exists(item[key]):
                    problems.append(f"data.js: {item['id']} missing {key} {item[key]}")
        print(f"data.js: {len(data)} titles checked")
        continue
    for ref in re.findall(r'["`]([a-z0-9-]+\.html)(?:[?#][^"`]*)?["`]', text):
        check_ref(f, ref)
    for ref in re.findall(r'href="([a-z0-9-]+\.html)', text):
        check_ref(f, ref)

for asset in ("favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-512.png", "site.webmanifest", "404.html"):
    if not exists(asset):
        problems.append(f"missing {asset}")

size = sum(os.path.getsize(os.path.join(dp, n)) for dp, _, fs in os.walk(os.path.join(ROOT, "assets")) for n in fs)
print(f"images: {size / 1024 / 1024:.2f} MB total in assets/")
print(f"checked {len(html_files)} pages, {len(js_files)} scripts")
if problems:
    print("\nPROBLEMS:")
    print("\n".join(" - " + p for p in problems))
    sys.exit(1)
print("All checks passed ✔")

