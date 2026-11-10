/* minimal service worker: network first, cached copy when offline */
const C = 'e-pes-team';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(C).then(k => k.put(e.request, c)); return r }).catch(() => caches.match(e.request)));
});
