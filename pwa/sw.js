const CACHE_NAME = 'rieiek-switch-v1.1.0';

// 预缓存资源列表（全部使用相对路径以适配 GitHub Pages 任意二级子目录）
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

// 安装阶段：预缓存核心静态资源并立即接管
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 激活阶段：清理旧版本缓存，立即接管所有客户端
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 请求拦截阶段：离线优先与网络更新
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 仅处理 GET 请求
  if (req.method !== 'GET') return;

  // 区分页面导航请求与静态资源请求
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkResponse) => {
          // 成功获取网络响应，更新缓存
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // 离线状态：从缓存中读取，若找不到则回退到 ./index.html
          const cachedResponse = await caches.match(req);
          if (cachedResponse) return cachedResponse;
          return caches.match('./index.html');
        })
    );
    return;
  }

  // 其他静态资源：Cache First 策略（先看缓存，离线可用；未命中则查网络并写缓存）
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // 后台异步更新缓存（Stale-While-Revalidate 特性）
        fetch(req)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResponse));
            }
          })
          .catch(() => {
            // 离线时网络请求失败属正常，忽略
          });
        return cachedResponse;
      }

      // 未命中缓存时回退网络
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, responseClone));
        return networkResponse;
      });
    })
  );
});
