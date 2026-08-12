const CACHE_NAME = 'timetable-v1';
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/dr_doom_bg.jpg",
  "/iron_man_bg.jpg",
  "/logo.png",
  "/assets/index-Cg4ZwfaJ.css",
  "/assets/index-fwF5NuqR.js",
  "/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2",
  "/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2",
  "/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2",
  "/assets/inter-greek-wght-normal-CkhJZR-_.woff2",
  "/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2",
  "/assets/inter-latin-wght-normal-Dx4kXJAl.woff2",
  "/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2",
  "/iste.png"
];

// Install Event: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Ignore chrome-extension or other non-http schemes
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background to keep cache updated
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {
          // Fail silently if network update fails offline
        });
        
        return cachedResponse;
      }

      // Network Fallback
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch((err) => {
        // If offline and request is page navigation, show index.html fallback
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        throw err;
      });
    })
  );
});
