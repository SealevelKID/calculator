const CACHE_NAME = 'time-calc-v1';
const urlsToCache = [
  './time.html',
  './manifest.json',
  './icon.png'
];

// 安裝時將檔案加入快取
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求，若斷網則提供快取的檔案
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // 找到快取，直接回傳（實現離線功能）
        }
        return fetch(event.request);
      })
  );
});