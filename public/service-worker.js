
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('shadsapp-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/client.js',
        '/manifest.json',
        '/icon.png'
      ]);
    })
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
