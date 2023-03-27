const OFFLINE_VERSION = 1;
const cacheName = "offline";
// Customize this with a different URL if needed.
const appShell = [
  "/",
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
  "/images/Icons/back.svg",
  "/images/Icons/bookmark.svg",
  "/images/Icons/clock.svg",
  "/images/Icons/close.svg",
  "/images/Icons/des-palette.svg",
  "/images/Icons/goto-page.svg",
  "/images/Icons/info.svg",
  "/images/Icons/language.svg",
  "/images/Icons/light-mode.svg",
  "/images/Icons/moon.svg",
  "/images/Icons/mosque.svg",
  "/images/Icons/mosque1.svg",
  "/images/Icons/next.svg",
  "/images/Icons/quran.svg",
  "/images/Icons/quran1.svg",
  "/images/Icons/quran2.svg",
  "/images/Icons/safe-alert.svg",
  "/images/Icons/search.svg",
  "/images/Icons/share.svg",
  "/images/Icons/star.svg",
  "/images/Icons/three-dots.svg",
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
      
      if (e.request.url.indexOf("quran.html") > -1) {
        const cache = await caches.open(cacheName);
        const r = await caches.match('/pages/quran.html');    
        return r
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
     
      return response;
    })()
  );
});
