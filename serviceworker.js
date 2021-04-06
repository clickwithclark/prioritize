/* eslint-disable no-restricted-globals */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceworker.js')
      .then((registration) => console.log(`Service Worker Registered!...😁 \n ${registration.scope}`))
      .catch((error) => console.error(`service worker error:😭${error}`));
  });
}
const cacheName = 'v2';

const cacheAssets = [
  '/',
  '/index.html',
  '/assets/js/eventListeners.js',
  '/assets/css/bootstrap.min.css',
  '/dist/css/todoapp.min.css',
  '/serviceworker.js',
  '/assets/icons/all.js',
  '/assets/img/oops.png',
  '/assets/img/speak.png',
  '/assets/img/cwc.png',
  'assets/icons/maskable_icon300.png',
  'assets/icons/maskable_icon_x128.png',
  '/manifest.json',
  '/assets/img/background.png',
  '/assets/fonts/CabinSketch.woff2',
  '/assets/fonts/Neucha.woff2',
  '/assets/fonts/Neucha2.woff2',
  '/dist/bundle.js',
];

function preCacheServiceWorker() {
  /* It will not cache and also not reject for individual resources that failed to be added in the cache. unlike fillServiceWorkerCache which stops caching as soon as one problem occurs. see http://stackoverflow.com/questions/41388616/what-can-cause-a-promise-rejected-with-invalidstateerror-here */
  return caches
    .open(cacheName)
    .then((cache) =>
      Promise.all(cacheAssets.map((url) => cache.add(url).catch((reason) => console.table([`Service Worker: ${url} failed...😭 ${String(reason)}`]))))
    );
}

// Call Install Event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed...⚡');

  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: pre-caching assets...💾');
        preCacheServiceWorker();
      })
      // Call Activate Event
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  console.table('Service Worker: Fetching...🦅');
  event.respondWith(
    (async () => {
      try {
        const cacheResponse = await caches.match(event.request);

        // get response from cache if it exists
        if (cacheResponse) {
          return cacheResponse;
        }
        // if it does not exists try to get response from network
        const netWorkResponse = await fetch(event.request);
        // make clone of response
        const clonedResponse = netWorkResponse.clone();
        const cache = await caches.open(cacheName);
        // add response to cache incase missed by precache
        cache.put(event.request, clonedResponse);
        return netWorkResponse;
      } catch (error) {
        // load cached page in event of network failure
        const path = new URL(event.request.url).pathname;
        return caches.match(path).then((cachedResponse) => cachedResponse);
      }
    })()
  );
});
