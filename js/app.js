(function () {
  "use strict";

  const SITE = {
    name: "Nikflix",
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    email: "nikhilmeshram2006@gmail.com",
  };

  const CATEGORIES = [
    { key: "anime",    name: "Anime",    grad: "linear-gradient(135deg,#ff4d6d,#7b2cbf)" },
    { key: "horror",   name: "Horror",   grad: "linear-gradient(135deg,#3a0000,#8b0000)" },
    { key: "romance",  name: "Romance",  grad: "linear-gradient(135deg,#ff758f,#c9184a)" },
    { key: "tragedy",  name: "Tragedy",  grad: "linear-gradient(135deg,#3d405b,#1b1b2f)" },
    { key: "action",   name: "Action",   grad: "linear-gradient(135deg,#f77f00,#d62828)" },
    { key: "comedy",   name: "Comedy",   grad: "linear-gradient(135deg,#ffba08,#f48c06)" },
    { key: "scifi",    name: "Sci-Fi",   grad: "linear-gradient(135deg,#00b4d8,#023e8a)" },
    { key: "thriller", name: "Thriller", grad: "linear-gradient(135deg,#495057,#212529)" },
    { key: "crime",    name: "Crime",    grad: "linear-gradient(135deg,#6c584c,#283618)" },
    { key: "drama",    name: "Drama",    grad: "linear-gradient(135deg,#9d4edd,#3c096c)" },
    { key: "fantasy",  name: "Fantasy",  grad: "linear-gradient(135deg,#2a9d8f,#264653)" },
    { key: "family",   name: "Family",   grad: "linear-gradient(135deg,#52b788,#2d6a4f)" },
  ];
  const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));
  const AVATAR_COLORS = ["#e50914", "#1f80e0", "#2fb36d", "#f5a623", "#8e44ad", "#e91e63", "#00a8a8", "#5c5c5c"];

  const I = (p, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${extra}>${p}</svg>`;
  const ICONS = {
    home: I('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>'),
    search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    grid: I('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    user: I('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>'),
    menu: I('<path d="M3 6h18M3 12h18M3 18h18"/>'),
    close: I('<path d="M18 6 6 18M6 6l12 12"/>'),
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z"/></svg>',
    info: I('<circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/>'),
    plus: I('<path d="M12 5v14M5 12h14"/>'),
    check: I('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    share: I('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>'),
    left: I('<path d="m15 18-6-6 6-6"/>'),
    right: I('<path d="m9 18 6-6-6-6"/>'),
    alert: I('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/>'),
    ok: I('<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9.5"/>'),
    film: I('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 7.5h4M3 12h18M3 16.5h4M17 7.5h4M17 16.5h4"/>'),
    tv: I('<rect x="2.5" y="6" width="19" height="13" rx="2"/><path d="m8 2 4 4 4-4"/>'),
    heart: I('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>'),
    help: I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>'),
    phone: I('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>'),
    mail: I('<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/>'),
    trash: I('<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>'),
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6L2.5 9.3l6.6-.8L12 2.5Z"/></svg>',
  };
  const LOGO_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="7" fill="#e50914"/><path d="M10 7h4.2l3.6 10.4V7H22v18h-4.1L14.2 14.6V25H10z" fill="#fff"/></svg>';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  const params = () => new URLSearchParams(location.search);
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  // Enforce HTTPS on non-local origins
  if (location.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)) {
    location.replace("https:" + location.href.slice(5));
  }

  // Validate asset/media URLs: allow only local assets/... paths or public https:// URLs (blocks javascript:, data:, http:, and private/loopback IPs)
  function safeUrl(raw) {
    const s = String(raw ?? "").trim();
    if (!s) return "";
    if (/^assets\/[a-zA-Z0-9._/-]+$/.test(s) && !s.includes("..")) return s;
    try {
      const u = new URL(s);
      if (u.protocol !== "https:") return "";
      const h = u.hostname.toLowerCase();
      if (
        h === "localhost" ||
        h.endsWith(".local") ||
        h.endsWith(".internal") ||
        /^127\./.test(h) ||
        /^10\./.test(h) ||
        /^192\.168\./.test(h) ||
        /^169\.254\./.test(h) ||
        /^172\.(1[6-9]|2\d|3[01])\./.test(h) ||
        /^0\./.test(h) ||
        h.startsWith("[")
      ) {
        return "";
      }
      return u.href;
    } catch {
      return "";
    }
  }

  const BASE_CATALOG = Array.isArray(window.CATALOG) ? window.CATALOG : [];
  let storageWarned = false;
  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem("nk:" + key) ?? localStorage.getItem("sf:" + key);
        return v === null ? fallback : JSON.parse(v);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem("nk:" + key, JSON.stringify(value));
        return true;
      } catch {
        if (!storageWarned) {
          toast("Could not save - local storage is disabled in your browser.", "error");
          storageWarned = true;
        }
        return false;
      }
    },
  };

  function sanitizeCatalogItem(item) {
    if (!item || typeof item !== "object" || typeof item.id !== "string") return null;
    const id = item.id.trim().slice(0, 64);
    if (!/^[a-zA-Z0-9_-]+$/.test(id)) return null;
    const type = item.type === "series" ? "series" : "movie";
    const title = String(item.title || "").trim().slice(0, 160);
    if (!title) return null;
    const year = Number.isInteger(+item.year) && +item.year >= 1888 && +item.year <= 2035 ? +item.year : null;
    const rating = Number.isFinite(+item.rating) && +item.rating >= 0 && +item.rating <= 10 ? Math.round(+item.rating * 10) / 10 : null;
    const genres = Array.isArray(item.genres) ? item.genres.filter((g) => CAT_MAP[g]) : [];
    const desc = String(item.desc || "").trim().slice(0, 1200);
    const poster = safeUrl(item.poster) || null;
    const backdrop = safeUrl(item.backdrop) || null;
    const imdb = typeof item.imdb === "string" && /^tt\d{5,10}$/.test(item.imdb.trim()) ? item.imdb.trim() : null;
    const tvmaze = Number.isInteger(+item.tvmaze) && +item.tvmaze > 0 ? +item.tvmaze : null;
    const yt = typeof item.yt === "string" && /^[a-zA-Z0-9_-]{11}$/.test(item.yt.trim()) ? item.yt.trim() : null;
    const ytHi = typeof item.ytHi === "string" && /^[a-zA-Z0-9_-]{11}$/.test(item.ytHi.trim()) ? item.ytHi.trim() : null;
    const stream = safeUrl(item.stream) || null;
    const out = Object.assign({}, item, {
      id, type, title, year, rating, genres, desc, poster, backdrop, imdb, tvmaze, yt, stream,
    });
    if (ytHi) out.ytHi = ytHi;
    if (item.streams && typeof item.streams === "object") {
      out.streams = {
        "1080p": safeUrl(item.streams["1080p"]) || stream,
        "720p": safeUrl(item.streams["720p"]) || stream,
      };
    }
    return out;
  }

  function buildCatalog() {
    const rawAdded = store.get("admin_added", []);
    const added = (Array.isArray(rawAdded) ? rawAdded : []).map(sanitizeCatalogItem).filter(Boolean);
    const rawDel = store.get("admin_deleted", []);
    const deleted = new Set(Array.isArray(rawDel) ? rawDel.filter((x) => typeof x === "string") : []);
    const addedMap = new Map(added.map((x) => [x.id, x]));
    const merged = [];
    const seen = new Set();
    for (const item of added) {
      if (!deleted.has(item.id) && !seen.has(item.id)) {
        merged.push(item);
        seen.add(item.id);
      }
    }
    for (const item of BASE_CATALOG) {
      if (!item || !item.id || deleted.has(item.id) || seen.has(item.id)) continue;
      merged.push(addedMap.get(item.id) || item);
      seen.add(item.id);
    }
    return merged;
  }

  const CATALOG = buildCatalog();
  const BY_ID = Object.fromEntries(CATALOG.map((x) => [x.id, x]));
  const byId = (id) => BY_ID[id] || null;
  const movies = () => CATALOG.filter((x) => x.type === "movie");
  const series = () => CATALOG.filter((x) => x.type === "series");
  const inCat = (key, list = CATALOG) => list.filter((x) => x.genres.includes(key));
  const trailerUrl = (item) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(`${item.title} ${item.year || ""} official trailer`);
  const titleUrl = (item) => `title.html?id=${encodeURIComponent(item.id)}`;
  const watchUrl = (item, s, e) => {
    const suffix = s && e ? `&s=${s}&e=${e}` : "";
    return `watch.html?id=${encodeURIComponent(item.id)}${suffix}`;
  };

  const MyList = {
    ids: () => store.get("mylist", []).filter((id) => BY_ID[id]),
    has: (id) => MyList.ids().includes(id),
    toggle(id) {
      const item = byId(id);
      if (!item) { toast("That title could not be found.", "error"); return false; }
      let ids = MyList.ids();
      const adding = !ids.includes(id);
      ids = adding ? [id, ...ids] : ids.filter((x) => x !== id);
      if (!store.set("mylist", ids)) return !adding;
      toast(adding ? `Added "${item.title}" to My List` : `Removed "${item.title}" from My List`, "success");
      document.dispatchEvent(new CustomEvent("mylist:change"));
      return adding;
    },
    clear() { return store.set("mylist", []); },
  };

  const History = {
    ids: () => store.get("history", []).filter((id) => BY_ID[id]),
    add(id) { if (!BY_ID[id]) return; const ids = [id, ...History.ids().filter((x) => x !== id)].slice(0, 20); store.set("history", ids); },
    clear() { return store.set("history", []); },
  };

  const DEFAULT_PROFILE = { name: "Nikhil", color: AVATAR_COLORS[0], autoplay: true, previews: true, maturity: "all" };
  function sanitizeProfile(raw) {
    const p = raw && typeof raw === "object" ? raw : {};
    const rawName = String(p.name || DEFAULT_PROFILE.name).replace(/[^\p{L}\p{N} ]/gu, "").trim().slice(0, 20);
    return {
      name: rawName.length >= 2 ? rawName : DEFAULT_PROFILE.name,
      color: AVATAR_COLORS.includes(p.color) ? p.color : DEFAULT_PROFILE.color,
      autoplay: typeof p.autoplay === "boolean" ? p.autoplay : DEFAULT_PROFILE.autoplay,
      previews: typeof p.previews === "boolean" ? p.previews : DEFAULT_PROFILE.previews,
      maturity: ["all", "teen", "kids"].includes(p.maturity) ? p.maturity : DEFAULT_PROFILE.maturity,
    };
  }
  const Profile = {
    get: () => sanitizeProfile(store.get("profile", {})),
    save: (p) => store.set("profile", sanitizeProfile(p)),
    reset: () => store.set("profile", DEFAULT_PROFILE),
    defaults: DEFAULT_PROFILE,
  };
  const initial = (name) => (String(name).trim()[0] || "N").toUpperCase();

  function toast(message, type = "info", ms = 3200) {
    let stack = $(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      stack.setAttribute("role", "status");
      stack.setAttribute("aria-live", "polite");
      document.body.appendChild(stack);
    }
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.innerHTML = `${type === "error" ? ICONS.alert : type === "success" ? ICONS.ok : ICONS.info}<span>${esc(message)}</span>`;
    stack.appendChild(el);
    while (stack.children.length > 3) stack.firstElementChild.remove();
    setTimeout(() => { el.classList.add("hide"); setTimeout(() => el.remove(), 260); }, ms);
  }

  function cardHTML(item, opts = {}) {
    const typeLabel = item.type === "movie" ? "Movie" : "Series";
    const lazy = opts.eager ? 'fetchpriority="high"' : 'loading="lazy"';
    const posterUrl = safeUrl(item.poster);
    const img = posterUrl
      ? `<img src="${esc(posterUrl)}" alt="${esc(item.title)} poster" width="342" height="513" ${lazy} decoding="async">`
      : `<span class="card-fallback">${esc(item.title)}</span>`;
    return `<a class="card" href="${titleUrl(item)}" aria-label="${esc(item.title)} (${typeLabel}${item.year ? ", " + item.year : ""})">
      ${img}
      <span class="card-badge ${item.type}">${typeLabel}</span>
      <span class="card-info">${esc(item.title)}<small>${item.year || ""}${item.rating ? " · ★ " + item.rating : ""}</small></span>
    </a>`;
  }

  function rowHTML(title, items, link) {
    if (!items.length) return "";
    const id = "row-" + norm(title).replace(/ /g, "-");
    return `<section class="row" aria-labelledby="${id}">
      <div class="row-head">
        <h2 class="row-title" id="${id}">${esc(title)}</h2>
        ${link ? `<a class="row-link" href="${link}">See all ›</a>` : ""}
      </div>
      <div class="row-viewport">
        <button class="row-arrow prev" type="button" aria-label="Scroll ${esc(title)} left">${ICONS.left}</button>
        <div class="row-track">${items.map((x) => cardHTML(x)).join("")}</div>
        <button class="row-arrow next" type="button" aria-label="Scroll ${esc(title)} right">${ICONS.right}</button>
      </div>
    </section>`;
  }

  function initRows(root = document) {
    $$(".row-viewport", root).forEach((vp) => {
      const track = $(".row-track", vp);
      const prev = $(".row-arrow.prev", vp);
      const next = $(".row-arrow.next", vp);
      const update = () => {
        const max = track.scrollWidth - track.clientWidth - 2;
        prev.hidden = track.scrollLeft <= 2;
        next.hidden = track.scrollLeft >= max;
      };
      prev.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth * 0.9 }));
      next.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * 0.9 }));
      track.addEventListener("scroll", debounce(update, 60), { passive: true });
      window.addEventListener("resize", debounce(update, 150));
      update();
    });
  }

  function gridHTML(items) {
    return `<div class="grid">${items.map((x) => cardHTML(x)).join("")}</div>`;
  }

  function emptyHTML(title, text, actionHTML = "") {
    return `<div class="empty">${ICONS.film}<h3>${esc(title)}</h3><p>${text}</p>${actionHTML}</div>`;
  }

  function noticeHTML(type, text) {
    return `<div class="notice ${type}" role="${type === "error" ? "alert" : "status"}">${type === "error" ? ICONS.alert : ICONS.ok}<div>${text}</div></div>`;
  }

  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG" || img.dataset.fallbackDone) return;
    img.dataset.fallbackDone = "1";
    const card = img.closest(".card, .detail-poster");
    if (card) {
      const span = document.createElement("span");
      span.className = "card-fallback";
      span.textContent = (img.alt || "").replace(/ poster$/, "");
      img.replaceWith(span);
    } else {
      img.style.visibility = "hidden";
    }
  }, true);

  function editDist1OrSwap(a, b) {
    if (a === b) return true;
    if (Math.abs(a.length - b.length) > 1) return false;
    if (a.length < 4 || b.length < 4) return false;
    let i = 0, j = 0, diffs = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++diffs > 1) return false;
      if (a[i + 1] === b[j] && a[i] === b[j + 1]) { i += 2; j += 2; continue; }
      if (a.length > b.length) i++;
      else if (b.length > a.length) j++;
      else { i++; j++; }
    }
    return true;
  }

  function search(query, type = "all") {
    const q = norm(query);
    let list = type === "all" ? CATALOG : CATALOG.filter((x) => x.type === type);
    if (!q) return [];
    const qCompact = q.replace(/ /g, "");
    const tokens = q.split(" ");
    const catHits = CATEGORIES.filter((c) => norm(c.name) === q || c.key === qCompact).map((c) => c.key);
    return list
      .map((item) => {
        const t = norm(item.title);
        const tCompact = t.replace(/ /g, "");
        const tWords = t.split(" ");
        const genreText = item.genres.map((g) => norm(CAT_MAP[g]?.name || g) + " " + g).join(" ");
        const hay = `${t} ${tCompact} ${genreText} ${item.year || ""} ${item.type} ${norm(item.desc)}`;
        let score = 0;
        if (t === q || tCompact === qCompact) score += 100;
        else if (t.startsWith(q) || tCompact.startsWith(qCompact)) score += 60;
        else if (t.includes(q) || (qCompact.length >= 3 && tCompact.includes(qCompact))) score += 45;
        if (catHits.some((k) => item.genres.includes(k))) score += 30;
        const tokMatch = (tok) => hay.includes(tok) || tWords.some((w) => editDist1OrSwap(tok, w));
        if (tokens.every(tokMatch)) score += 10 + tokens.filter((tok) => t.includes(tok) || tWords.some((w) => editDist1OrSwap(tok, w))).length * 5;
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || (b.item.rating || 0) - (a.item.rating || 0))
      .map((r) => r.item);
  }

  function navLinks() {
    return [
      { href: "index.html", label: "Home", key: "home", icon: ICONS.home },
      { href: "categories.html?type=movie", label: "Movies", key: "movies", icon: ICONS.film },
      { href: "categories.html?type=series", label: "Series", key: "series", icon: ICONS.tv },
      { href: "categories.html", label: "Categories", key: "categories", icon: ICONS.grid },
      { href: "profile.html#my-list", label: "My List", key: "mylist", icon: ICONS.heart },
    ];
  }

  function activeKey() {
    const page = document.body.dataset.page || "";
    if (page === "categories") {
      const p = params();
      if (!p.get("cat") && p.get("type") === "movie") return "movies";
      if (!p.get("cat") && p.get("type") === "series") return "series";
    }
    return page;
  }

  function renderChrome() {
    const active = activeKey();
    const prof = Profile.get();
    const cur = (key) => (key === active ? ' aria-current="page"' : "");
    const q = esc(params().get("q") || "");

    const header = `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header">
        <div class="container">
          <a class="logo" href="index.html" aria-label="${SITE.name} home">${LOGO_SVG}<span>${SITE.name}</span></a>
          <nav class="main-nav" aria-label="Primary">
            <ul>${navLinks().map((l) => `<li><a href="${l.href}"${cur(l.key)}>${l.label}</a></li>`).join("")}</ul>
          </nav>
          <form class="header-search" action="search.html" method="get" role="search">
            ${ICONS.search}
            <label class="sr-only" for="header-q">Search movies and series</label>
            <input id="header-q" type="search" name="q" value="${active === "search" ? "" : q}" placeholder="Titles, genres, years" autocomplete="off" required>
          </form>
          <div class="header-actions">
            <a class="icon-btn search-toggle" href="search.html" aria-label="Search">${ICONS.search}</a>
            <a class="icon-btn" href="profile.html" aria-label="Your profile: ${esc(prof.name)}"><span class="avatar-mini" style="background:${esc(prof.color)}">${esc(initial(prof.name))}</span></a>
            <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">${ICONS.menu}</button>
          </div>
        </div>
      </header>
      <div class="menu-backdrop" hidden></div>
      <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile">
        <form action="search.html" method="get" role="search" class="search-box">
          ${ICONS.search}
          <label class="sr-only" for="menu-q">Search movies and series</label>
          <input id="menu-q" type="search" name="q" placeholder="Search movies & series" autocomplete="off" required>
        </form>
        <ul>
          ${navLinks().map((l) => `<li><a href="${l.href}"${cur(l.key)}>${l.icon}${l.label}</a></li>`).join("")}
          <li><a href="profile.html"${cur("profile")}>${ICONS.user}Profile</a></li>
          <li><a href="help.html"${cur("help")}>${ICONS.help}Help &amp; Contact</a></li>
        </ul>
      </nav>`;

    const bottom = `
      <nav class="bottom-nav" aria-label="Bottom navigation">
        <ul>
          <li><a href="index.html"${cur("home")}>${ICONS.home}<span>Home</span></a></li>
          <li><a href="search.html"${cur("search")}>${ICONS.search}<span>Search</span></a></li>
          <li><a href="categories.html"${["categories", "movies", "series"].includes(active) ? ' aria-current="page"' : ""}>${ICONS.grid}<span>Categories</span></a></li>
          <li><a href="profile.html"${["profile", "mylist"].includes(active) ? ' aria-current="page"' : ""}>${ICONS.user}<span>Profile</span></a></li>
        </ul>
      </nav>`;

    const year = new Date().getFullYear();
    const footer = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <h3>Browse</h3>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="categories.html?type=movie">Movies</a></li>
                <li><a href="categories.html?type=series">Series</a></li>
                <li><a href="categories.html?cat=anime">Anime</a></li>
              </ul>
            </div>
            <div>
              <h3>Your Account</h3>
              <ul>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="profile.html#my-list">My List</a></li>
                <li><a href="search.html">Search</a></li>
                <li><a href="categories.html">All Categories</a></li>
              </ul>
            </div>
            <div>
              <h3>Support</h3>
              <ul>
                <li><a href="help.html">Help Center</a></li>
                <li><a href="help.html#contact">Contact Us</a></li>
                <li><a href="privacy.html">Privacy Policy</a></li>
                <li><a href="terms.html">Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h3>Get in touch</h3>
              <ul>
                <li><a href="${SITE.phoneHref}">${SITE.phone}</a></li>
                <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© <span data-year>${year}</span> ${SITE.name} · Built by Nikhil Meshram</span>
            <span>Data: <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVmaze</a> &amp; <a href="https://www.wikipedia.org/" target="_blank" rel="noopener noreferrer">Wikipedia</a></span>
          </div>
        </div>
      </footer>`;

    document.body.insertAdjacentHTML("afterbegin", header);
    const main = $("#main");
    (main || document.body.lastElementChild).insertAdjacentHTML("afterend", footer + bottom);
    $$("[data-year]").forEach((el) => (el.textContent = year));

    const toggle = $(".menu-toggle");
    const menu = $("#mobile-menu");
    const backdrop = $(".menu-backdrop");
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      backdrop.hidden = !open;
      requestAnimationFrame(() => backdrop.classList.toggle("open", open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = open ? ICONS.close : ICONS.menu;
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
    backdrop.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) { setOpen(false); toggle.focus(); } });
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("resize", debounce(() => { if (window.innerWidth >= 1024) setOpen(false); }, 150));

    $$('form[role="search"]').forEach((f) => f.addEventListener("submit", (e) => {
      const input = $('input[name="q"]', f);
      if (!input.value.trim()) { e.preventDefault(); toast("Type a movie, series or genre to search.", "error"); input.focus(); }
    }));
    $$('form[role="search"] input').forEach((i) => i.removeAttribute("required"));

    if (!CATALOG.length) toast("Could not load catalog. Please refresh the page.", "error", 6000);
  }

  window.SF = {
    SITE, CATEGORIES, CAT_MAP, AVATAR_COLORS, ICONS, CATALOG,
    $, $$, esc, norm, params, debounce, safeUrl, sanitizeCatalogItem,
    byId, movies, series, inCat, trailerUrl, titleUrl, watchUrl,
    store, MyList, History, Profile, initial,
    toast, cardHTML, rowHTML, gridHTML, initRows, emptyHTML, noticeHTML, search,
  };

  renderChrome();

  // Dynamic route module loader
  async function checkDynamicRoute() {
    try {
      const seg = (location.pathname.split("/").filter(Boolean).pop() || "").replace(/\.html$/i, "").toLowerCase();
      const hsh = location.hash.replace(/^#\/?/, "").toLowerCase();
      const cand = [seg, hsh].find((x) => x && x.length >= 6);
      if (!cand || !window.crypto?.subtle) return;
      const enc = new TextEncoder();
      const d = await crypto.subtle.digest("SHA-256", enc.encode("nk_route_v1:" + cand));
      const hex = Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, "0")).join("");
      if (hex !== "b7cd4d60d6b0b7edb8e2547cb3e8a17c98d6633429233e62b96ca0346047034b") return;
      const km = await crypto.subtle.importKey("raw", enc.encode("nk_route_key_v1:" + cand), { name: "PBKDF2" }, false, ["deriveKey"]);
      const k = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode("Nikflix_Route_Salt_2026"), iterations: 100000, hash: "SHA-256" },
        km,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
      const b64ToBytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64ToBytes("Cavl5H6ZxAz4ZpPh") }, k, b64ToBytes("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"));
      const mod = JSON.parse(new TextDecoder().decode(pt));
      const st = document.createElement("style");
      st.textContent = mod.css;
      document.head.appendChild(st);
      const m = document.getElementById("main");
      if (m) {
        m.className = "container page";
        m.innerHTML = mod.html;
      }
      const sc = document.createElement("script"); sc.textContent = mod.js; document.body.appendChild(sc);
    } catch {}
  }
  checkDynamicRoute();
  window.addEventListener("hashchange", checkDynamicRoute);
})();
