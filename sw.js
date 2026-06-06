const CACHE_NAME = 'devpm-v1';
const ASSETS = [
  '/dev-project-manager/',
  '/dev-project-manager/index.html',
  '/dev-project-manager/dashboard/',
  '/dev-project-manager/dashboard/index.html',
  '/dev-project-manager/manifest.json',
];

// Install — cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clear old cache
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first, fallback cache
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Push notification
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(
    data.title || 'Dev PM',
    {
      body: data.body || 'Ada task yang perlu perhatian Anda.',
      icon: '/dev-project-manager/icons/icon-192.png',
      badge: '/dev-project-manager/icons/icon-72.png',
      requireInteraction: true,
      data: { url: data.url || '/dev-project-manager/' }
    }
  ));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});
