/* Editing Portal - service worker: shows a notification when the server sends a push, even if the portal is closed. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function (e) {
  e.waitUntil(self.registration.showNotification('Editing Portal', {
    body: 'You have a new editing request or reply. Tap to open.',
    tag: 'editing-portal',
    renotify: true,
    vibrate: [250, 120, 250, 120, 250]
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    return self.clients.openWindow(self.registration.scope);
  }));
});
