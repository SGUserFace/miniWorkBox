importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");


workbox.setConfig({ debug: true });
workbox.googleAnalytics.initialize();
workbox.core.setCacheNameDetails({ prefix: 'test' });


workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkFirst()
);


workbox.routing.setCatchHandler(({event}) =>
{
    if(event.request.destination === 'document')
    {
        return caches.match('https://sguserface.github.io/miniWorkBox/offline.html');
    }

    return Response.error();
});


self.addEventListener('install', (event) =>
{
    const urls = ['https://sguserface.github.io/miniWorkBox/offline.html',];
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
    "revision": "9b1eaded2a4e2b134caeb1436399c12c"
  },
  {
    "url": "images/app_logo_144.png",
    "revision": "ec2351d7366b798b2000e82755cad428"
  },
  {
    "url": "images/app_logo_192.png",
    "revision": "0a1039f3cbd9fd9c586fbd78c2ac613c"
  },
  {
    "url": "images/app_logo_256.png",
    "revision": "b74f20969f27d75274694daa90e91b66"
  },
  {
    "url": "images/app_logo_384.png",
    "revision": "b5e3ba30869bb84269e77b82a5a16f2f"
  },
  {
    "url": "images/app_logo_512.png",
    "revision": "ecbea926e014cdd1eff820f07b6ce182"
  },
  {
    "url": "images/apple-touch-icon.png",
    "revision": "5a623591e42a7ab54338f3b03e025d7a"
  },
  {
    "url": "index.html",
    "revision": "383f9b3d2981b999b5947b9f5eef85fa"
  },
  {
    "url": "js/bundle.js",
    "revision": "f7fa3873e91784cc73bd47975b970a26"
  },
  {
    "url": "manifest.json",
    "revision": "7685c376940a302b48f6ec897536c70b"
  },
  {
    "url": "offline.html",
    "revision": "df293ceee30efad2abf7d3d350e1e697"
  },
  {
    "url": "package.json",
    "revision": "b7a00fc658cdf967fb83faa3ed075097"
  },
  {
    "url": "page.html",
    "revision": "f2ceffe2c81f01cd6a403c95a940dd03"
  },
  {
    "url": "README.md",
    "revision": "1de8603787c0ff12aafea10dff3e4cbf"
  },
  {
    "url": "workbox-config-inject.js",
    "revision": "1cc950f8800ca7d9604d5b42f8941189"
  },
  {
    "url": "workbox-config.js",
    "revision": "7985ff4cc849448b28913b940ece2abe"
  },
  {
    "url": "z.html",
    "revision": "ac30b9149a3216e0b9a6c41465c42143"
  }
]);