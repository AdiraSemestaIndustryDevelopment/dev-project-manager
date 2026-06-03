// sw.js — Service Worker untuk Push Notification
// File ini HARUS berada di root folder project

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Development Project Manager';
  const options = {
    body: data.body || 'Ada task yang perlu perhatian Anda.',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: '📋 Lihat Task' },
      { action: 'dismiss', title: 'Tutup' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data.url;
    event.waitUntil(clients.openWindow(url));
  }
});
