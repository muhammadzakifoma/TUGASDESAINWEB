const cacheName = 'souvenir-jejepangan-v1';
const assetsToCache = [
  '/index.html',
  '/about.html',
  '/contact.html',
  '/images/logo.png',
  '/style.css',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Caching assets');
        return cache.addAll(assetsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      }).catch(() => caches.match('/offline.html'))
  );
});
