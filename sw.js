var version = '1.0.3';
var cacheName = 'desktop-' + version;
var appShellFiles = [
    './',
    './index.html',
    './sw.js',
    './images/logo.png',
    './css/private.css',
    './js/click.js',
    './favicon.ico'
];
self.addEventListener('install', function(e) {
    // self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(appShellFiles);
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('activate', event => {
    console.log('activate' + event)
    event.waitUntil(
        caches.keys()
        .then(keylist => {
            return Promise.all(
                keylist
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key)) //删除旧的缓存
            )
        }).then(() => self.clients.claim()))
})