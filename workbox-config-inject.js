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


workbox.precaching.precacheAndRoute([]);