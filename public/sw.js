importScripts("https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js");

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

// Navigation
workbox.routing.registerRoute(
  ({ request }) => request.mode === "navigate",
  new workbox.strategies.NetworkFirst({ cacheName: "navigation" })
);

// Styles
workbox.routing.registerRoute(
  ({ request }) => request.destination === "style",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "styles",
    plugins: [
      new workbox.cacheableResponse.CacheableResponse({
        statuses: [200],
      }),
    ],
  })
);

// Fonts
workbox.routing.registerRoute(
  ({ request }) => request.destination === "font",
  new workbox.strategies.CacheFirst({ cacheName: "fonts" })
);

// Scripts
workbox.routing.registerRoute(
  ({ request }) => request.destination === "script",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "scripts",
    plugins: [
      new workbox.cacheableResponse.CacheableResponse({
        statuses: [200],
      }),
    ],
  })
);

// Images
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.cacheableResponse.CacheableResponse({
        statuses: [200, 404],
      }),
      new workbox.expiration.CacheExpiration("images", {
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  })
);
