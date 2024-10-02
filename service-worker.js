const CACHE_NAME = 'souvenir-cache-v1';
const urlsToCache = [
    '/TUGASDESAINWEB/',
    '/TUGASDESAINWEB/index.html',
    '/TUGASDESAINWEB/about.html',
    '/TUGASDESAINWEB/contact.html',
    '/TUGASDESAINWEB/style.css',
    '/TUGASDESAINWEB/images/logo.png',
    '/TUGASDESAINWEB/images/produk1.png',
    '/TUGASDESAINWEB/images/produk2.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
