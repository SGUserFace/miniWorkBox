importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");


workbox.setConfig({ debug: true });
workbox.googleAnalytics.initialize();
workbox.core.setCacheNameDetails({ prefix: 'DoFIFO' });


workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkFirst()
);


workbox.routing.setCatchHandler(({event}) =>
{
    if(event.request.destination === 'document')
    {
        return caches.match('/offline');
    }

    return Response.error();
});


self.addEventListener('install', (event) =>
{
    const urls = ['/offline',];
    const cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});


// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);


// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);


workbox.precaching.precacheAndRoute([
  {
    "url": "css/bundle.css",
    "revision": "a3adf6e26012ff7bab27bf645c4102ca"
  },
  {
    "url": "images/app_logo_144.png",
    "revision": "6405feb070dfc858f3d77dc496423e3c"
  },
  {
    "url": "images/app_logo_192.png",
    "revision": "c8d2dd8c6d5f40a45cff0f03f3998c10"
  },
  {
    "url": "images/app_logo_256.png",
    "revision": "e375618aaf585cec367b6b768bb9c522"
  },
  {
    "url": "images/app_logo_384.png",
    "revision": "21b27f3e65cad30c4196eeb51d3f968e"
  },
  {
    "url": "images/app_logo_512.png",
    "revision": "eed7372033385cc1db6dde6e4bdb7c3a"
  },
  {
    "url": "images/apple-touch-icon.png",
    "revision": "befa71df9ad3c76719c1fd043f4b73d4"
  },
  {
    "url": "images/categories.jpg",
    "revision": "57de9a3febdf7b5db9ea20f890e94dea"
  },
  {
    "url": "images/monitoring.jpg",
    "revision": "b3a6bbe7b2c3e475f03e93481659a65f"
  },
  {
    "url": "images/saving.jpg",
    "revision": "bf125eb50429b75b07744bf5dcf9b309"
  },
  {
    "url": "images/tracking.jpg",
    "revision": "d0eeb92801b725020220521d451d0729"
  },
  {
    "url": "images/traffic_lights.png",
    "revision": "e2f8c6176f36de1386bc10e86603af9a"
  },
  {
    "url": "js/bundle.js",
    "revision": "6a1ef63305ea1738bf172ba73e380eef"
  },
  {
    "url": "manifest.json",
    "revision": "21223304590dc73fde21e7c69c9ff9cf"
  },
  {
    "url": "mix-manifest.json",
    "revision": "8ad623ee9e8dc02aa876a386eb3d62ce"
  },
  {
    "url": "sw.js",
    "revision": "62eddceeb3cfea3497b28e796d80ad28"
  },
  {
    "url": "vendor/telescope/app-dark.css",
    "revision": "cc82d53d3e440d812816f63e7c041d06"
  },
  {
    "url": "vendor/telescope/app.css",
    "revision": "c240916d61afc6dbecb1a8590f11e3ab"
  },
  {
    "url": "vendor/telescope/app.js",
    "revision": "ad63c09db53bccb4e2507a495c2095ef"
  },
  {
    "url": "vendor/telescope/favicon.ico",
    "revision": "a903f931a3fcbcb88c8c8ab8d5b189b8"
  },
  {
    "url": "vendor/telescope/mix-manifest.json",
    "revision": "2157d2a5112c12084923c7543d485c9c"
  }
]);