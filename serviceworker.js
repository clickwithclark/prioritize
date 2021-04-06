/* eslint-disable no-restricted-globals */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceworker.js')
      .then((registration) => console.log(`Service Worker Registered!😁 \n ${registration.scope}`))
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
    .then((cache) => Promise.all(cacheAssets.map((url) => cache.add(url).catch((reason) => console.error([`${url} failed: ${String(reason)}`])))));
}

// Call Install Event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: pre-caching assets');
      preCacheServiceWorker();
    })
    // .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('fetch', (event) => {
  // console.log('Service Worker: Fetching...🦅');
  event.respondWith(
    caches
      .match(event.request)
      .then(
        (response) =>
          response ??
          fetch(event.request).then((res) => {
            // make clone of response
            const clonedResponse = res.clone();
            // open cache
            caches.open(cacheName).then((cache) => {
              // add response to cache
              cache.put(event.request, clonedResponse);
            });
            return response;
          })
      )
      .catch(
        (
          err // load default page as generic fallback
        ) => {
          const path = new URL(event.request.url).pathname;
          console.log('currPath', { path });
          caches.match(path);
        }
      )
  );
});

// // cached response
// self.addEventListener('fetch', (event) => {
//   console.log('Service Worker: Fetching...🦅');
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then(
//         (response) =>
//           response ??
//           fetch(event.request).then((res) => {
//             // make clone of response
//             const clonedResponse = res.clone();
//             // open cache
//             caches.open(cacheName).then((cache) => {
//               // add response to cache
//               cache.put(event.request, clonedResponse);
//             });
//             return response;
//           })
//       )
//       .catch(
//         (err) =>
//           // load default page as generic fallback
//           caches.match('/') ?? caches.match('/index.html')
//       )
//   );
// });
