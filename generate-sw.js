const OFFLINE_VERSION = 1;
const cacheName = "offline";
// Customize this with a different URL if needed.
const appShell = [
  "/index.html",
  "/surah.json",
  "/juzz.json",
  "/manifest.json",
  "/offline.html",
  "/quran.pdf",
  "/favicon.svg",
  "/scripts/Hijri.js",
  "/scripts/juzz.js",
  "/scripts/main.js",
  "/scripts/quran.js",
  "/scripts/quarn-pdf.js",
  "/scripts/surah.js",
  "/pages/juzz.html",
  "/pages/quran.html",
  "/pages/surahs.html",
  "/fonts/Quran.woff2",
  "/css/juzz.css",
  "/css/quran.css",
  "/css/responsive.css",
  "/css/style.css",
  "/css/surah.css",
  "/css/utilites.css",
  "/images/Icons/",
  "https://mozilla.github.io/pdf.js/build/pdf.js",
];
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(appShell);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      // console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());

      return response;
    })()
  );
});
