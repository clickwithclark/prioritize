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
  '/css',
  '/assets/css/bootstrap.min.css',
  '/dist/css/todoapp.min.css',
  '/serviceworker.js',
  '/assets/icons/all.js',
  '/assets/img/speak.png',
  '/assets/img/cwc.png',
  '/manifest.json',
  '/assets/img/background.png',
  '/assets/fonts/CabinSketch.woff2',
  '/assets/fonts/Neucha.woff2',
  '/assets/js/editTodo.js',
  '/assets/js/addTodo.js',
  '/assets/js/updateDOM.js',
  '/assets/js/addGlobalEventListener.js',
  '/assets/js/updateTodoStatus.js',
  '/assets/js/localStorage.js',
  '/assets/js/endUpdate.js',
  '/assets/js/dateSort.js',
  '/assets/js/categorySort.js',
  '/assets/js/tellUserAboutError.js',
  '/assets/icons/maskable_icon300.png',
  '/assets/js/updateTodo.js',
  '/assets/js/updateTodoFromSpan.js',
  '/assets/js/createOneTodo.js',
  '/assets/js/createManyTodos.js',
  '/assets/js/addTodoToDOM.js',
  '/assets/js/draggable.js',
  '/assets/js/defaultTodos.js',
  '/assets/js/processTodo.js',
  '/assets/js/generateID.js',
  '/assets/js/capitalizeFirstLetter.js',
  '/assets/fonts/Neucha2.woff2',
];

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Caching Files');
      return cache.addAll(cacheAssets);
    })
    // .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Call Fetch Event
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
