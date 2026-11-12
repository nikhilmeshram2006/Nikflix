<div align="center">

# NIKFLIX

**Stream movies, TV series, and anime in your browser - no sign-up required.**

<br>

<a href="https://nikhilmeshram2006.github.io/Nikflix/">
  <img src="assets/preview/btn-live.svg" alt="Watch Live on Nikflix" height="50">
</a>

<a href="https://nikhilmeshram2006.github.io/Nikflix/watch.html?id=s-305&s=1&e=1">
  <img src="assets/preview/btn-player.svg" alt="Open Video Player" height="44">
</a>
<a href="https://nikhilmeshram2006.github.io/Nikflix/categories.html">
  <img src="assets/preview/btn-categories.svg" alt="Browse Categories" height="44">
</a>

<br><br>

</div>

---

## Preview

<div align="center">
  <a href="https://nikhilmeshram2006.github.io/Nikflix/watch.html?id=s-305&s=1&e=1">
    <img src="assets/preview/player-preview.png" alt="Nikflix Theater Player" width="100%">
  </a>
</div>

---

## About

I built **Nikflix** so I could browse and watch my favorite movies, series, and anime from my laptop or phone without dealing with cluttered streaming sites or popups.

It runs entirely on vanilla HTML, CSS, and JavaScript (no frameworks or build step) and is hosted on GitHub Pages.

### What's included

- **106 curated titles** across 12 genres (`Anime`, `Horror`, `Romance`, `Tragedy`, `Action`, `Sci-Fi`, `Thriller`, `Crime`, `Comedy`, `Drama`, `Fantasy`, `Family`) with local WebP posters and backdrops.
- **Custom Theater Player (`watch.html`)** with a collapsible right-side drawer for switching seasons, episodes, servers, subtitles, playback speed, and cast info.
- **Multi-Server Playback** supporting direct `.mp4` streams, YouTube embeds with custom timeline controls (`-10s` / `+10s`, scrub bar, volume, fullscreen), and fallback embed servers (`VidSrc`, `SuperEmbed`, `AutoEmbed`) wrapped in an iframe popup/redirect shield.
- **Live Search** that queries the built-in catalog plus live series data from TVmaze and public-domain films from the Internet Archive.
- **Local Profile & My List** saved in `localStorage` so your watchlist and watch progress stay on your device.

---
## Important Notes

- **Multi-server playback**
Supports multiple external streaming sources. Availability and playback quality depend on the selected provider, and some sources may occasionally be unavailable.
- **Popup and redirect protection**
Includes basic safeguards that attempt to prevent unwanted popups and redirects from embedded video players. These safeguards are not a replacement for browser security or an ad blocker.

## How to Use

### Watch Online (Phone or Laptop)

1. Open **[nikhilmeshram2006.github.io/Nikflix](https://nikhilmeshram2006.github.io/Nikflix/)**.
2. Pick any title on the home screen, browse by genre under **Categories**, or search by name/year in **Search**.
3. Click **Watch Now** to start playback.
4. If you're watching a series or anime, use the right-hand panel in the player to switch seasons and episodes, or open the **Server** tab if you want to switch streaming sources.
5. On mobile, you can tap **Add to Home screen** in your browser menu to install it like a regular app.

### Keyboard Shortcuts (Player)

| Key | Action |
| :--- | :--- |
| `Space` / `K` | Play or Pause |
| `Left Arrow` | Rewind 10 seconds |
| `Right Arrow` | Fast-forward 10 seconds |
| `M` | Mute / Unmute |
| `F` | Toggle Fullscreen |
| `N` | Next Episode |

---

## Run Locally

Since there are no dependencies or build tools, you can run it with any static server:

```bash
git clone https://github.com/nikhilmeshram2006/Nikflix.git
cd Nikflix
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser (or double-click `start-nikflix.bat` on Windows).

---

## About the Developer 

**Nikhil Meshram** ([@nikhilmeshram2006](https://github.com/nikhilmeshram2006))
