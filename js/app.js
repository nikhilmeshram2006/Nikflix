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

  const CATALOG = Array.isArray(window.CATALOG) ? window.CATALOG : [];
  const BY_ID = Object.fromEntries(CATALOG.map((x) => [x.id, x]));
  const byId = (id) => BY_ID[id] || null;
  const movies = () => CATALOG.filter((x) => x.type === "movie");
  const series = () => CATALOG.filter((x) => x.type === "series");
  const inCat = (key, list = CATALOG) => list.filter((x) => x.genres.includes(key));
  const trailerUrl = (item) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(`${item.title} ${item.year || ""} official trailer`);
  const titleUrl = (item) =>
    item.iaOnly ? `watch.html?ia=${encodeURIComponent(item.ia)}&title=${encodeURIComponent(item.title)}`
    : item.tvmazeOnly ? `title.html?tvmaze=${item.tvmaze}`
    : `title.html?id=${encodeURIComponent(item.id)}`;
  const watchUrl = (item, s, e) => {
    const suffix = s && e ? `&s=${s}&e=${e}` : "";
    if (item.iaOnly) return `watch.html?ia=${encodeURIComponent(item.ia)}&title=${encodeURIComponent(item.title)}`;
    if (item.tvmazeOnly || (item.external && item.tvmaze)) return `watch.html?tvmaze=${item.tvmaze}${suffix}`;
    return `watch.html?id=${encodeURIComponent(item.id)}${suffix}`;
  };

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
  const Profile = {
    get: () => Object.assign({}, DEFAULT_PROFILE, store.get("profile", {})),
    save: (p) => store.set("profile", p),
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
    const img = item.poster
      ? `<img src="${esc(item.poster)}" alt="${esc(item.title)} poster" width="342" height="513" ${lazy} decoding="async">`
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

  function search(query, type = "all") {
    const q = norm(query);
    let list = type === "all" ? CATALOG : CATALOG.filter((x) => x.type === type);
    if (!q) return [];
    const tokens = q.split(" ");
    const catHits = CATEGORIES.filter((c) => norm(c.name) === q || c.key === q.replace(/ /g, "")).map((c) => c.key);
    return list
      .map((item) => {
        const t = norm(item.title);
        const genreText = item.genres.map((g) => norm(CAT_MAP[g]?.name || g) + " " + g).join(" ");
        const hay = `${t} ${genreText} ${item.year || ""} ${item.type} ${norm(item.desc)}`;
        let score = 0;
        if (t === q) score += 100;
        else if (t.startsWith(q)) score += 60;
        else if (t.includes(q)) score += 40;
        if (catHits.some((k) => item.genres.includes(k))) score += 30;
        if (tokens.every((tok) => hay.includes(tok))) score += 10 + tokens.filter((tok) => t.includes(tok)).length * 5;
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
    $, $$, esc, norm, params, debounce,
    byId, movies, series, inCat, trailerUrl, titleUrl, watchUrl,
    store, MyList, History, Profile, initial,
    toast, cardHTML, rowHTML, gridHTML, initRows, emptyHTML, noticeHTML, search,
  };

  renderChrome();
})();
