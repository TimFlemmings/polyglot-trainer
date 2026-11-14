// Polyglot Trainer offline cache. Bump VERSION when any file changes.
const VERSION = "pt-v2";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];
const AUDIO = ["uk", "ru", "de", "es", "fr", "it", "en"].map(l => `./audio-${l}.json`);
const FONTS = "pt-fonts";

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(CORE);
    await Promise.all(AUDIO.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION && k !== FONTS) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: serve cached copy, refresh in the background
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith((async () => {
      const c = await caches.open(FONTS);
      const hit = await c.match(req);
      const net = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })());
    return;
  }
  if (url.origin !== location.origin) return;

  // The app page: try the network briefly so updates arrive, fall back to cache offline
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      const c = await caches.open(VERSION);
      try {
        const r = await Promise.race([fetch(req), new Promise((_, rej) => setTimeout(rej, 3000))]);
        if (r && r.ok) { c.put("./index.html", r.clone()); return r; }
        throw 0;
      } catch { return (await c.match("./index.html")) || (await c.match("./")); }
    })());
    return;
  }

  // Everything else (audio, icons): cache first
  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    const r = await fetch(req);
    if (r.ok) c.put(req, r.clone());
    return r;
  })());
});
