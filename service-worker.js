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
    '/TUGASDESAINWEB/offline.html' // Pastikan file ini ada
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache opened');
            // Gunakan Promise.all untuk memeriksa setiap URL
            return Promise.all(urlsToCache.map((url) => {
                return fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${url}: ${response.status}`);
                        }
                        return cache.add(url); // Menambahkan ke cache
                    })
                    .catch(error => {
                        console.error(`Failed to cache ${url}: ${error}`);
                    });
            }));
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // Jika fetch gagal, kembalikan offline.html
            return caches.match('/TUGASDESAINWEB/offline.html');
        })
    );
});
