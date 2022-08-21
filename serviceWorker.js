importScripts('/assets/vendors/workbox/workbox-v6.5.4/workbox-sw.js');
//import { warmStrategyCache } from 'workbox-recipes'

workbox.setConfig({
    modulePathPrefix: '/assets/vendors/workbox/workbox-v6.5.4/',
});

const strategy = new workbox.strategies.NetworkFirst();

const cacheName = 'skillItCache';
const urls = [
    '/',
    '/index.html',
    '/styles/index.css',
    '/scripts/index.js',
    '/manifest.json',
    '/serviceWorker.js',
    '/assets/vendors/jquery-3.6.0.min.js'
];

workbox.recipes.warmStrategyCache({urls, strategy})

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    strategy
)

self.addEventListener('fetch', event => {
    if (event.request.url.endsWith('.png')) {
        // Oops! This causes workbox-strategies.js to be imported inside a fetch handler,
        // outside of the initial, synchronous service worker execution.
        const cacheFirst = new workbox.strategies.CacheFirst();
        event.respondWith(cacheFirst.handle({ request: event.request }));
    }
});