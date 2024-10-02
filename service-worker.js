const CACHE_NAME = 'souvenir-cache-v1';
const urlsToCache = [
    '/',
    '/TUGASDESAINWEB/index.html',
    '/TUGASDESAINWEB/about.html',
    '/TUGASDESAINWEB/contact.html',
    '/TUGASDESAINWEB/style.css',
    '/TUGASDESAINWEB/images/logo.png',
    '/TUGASDESAINWEB/images/produk1.png',
    '/TUGASDESAINWEB/images/produk2.png',
    '/TUGASDESAINWEB/offline.html' // 
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
                // Jika ada respons dalam cache, kembalikan itu
                if (response) {
                    return response;
                }
                // Jika tidak ada, ambil dari jaringan
                return fetch(event.request).catch(() => {
                    // Jika jaringan gagal, kembalikan offline.html
                    return caches.match('/TUGASDESAINWEB/offline.html');
                });
            })
    );
});
