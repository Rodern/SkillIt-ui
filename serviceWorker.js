importScripts('/assets/vendors/workbox/workbox-v6.5.4/workbox-sw.js');
//import { warmStrategyCache } from 'workbox-recipes'

workbox.setConfig({
    modulePathPrefix: '/assets/vendors/workbox/workbox-v6.5.4/',
});

const strategy = new workbox.strategies.NetworkFirst();

const cacheName = 'skillItCache';
const urls = [
    '/manifest.json',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/serviceWorker.js',
    '/assets/vendors/jquery-3.6.0.min.js',
    '/assets/vendors/tailwind/font.awesome.css',
    '/assets/vendors/tailwind/tailwind.elements.min.css',
    '/assets/vendors/tailwind/tailwind.elements.min.js',
    '/assets/vendors/tailwind/tailwindcss.css',
    '/assets/vendors/tailwind/tailwindcss.js',
    '/assets/vendors/workbox/workbox-v6.5.4/workbox-sw.js',
    '/assets/vendors/workbox/workbox-strategies.prod.js',
    '/assets/vendors/workbox/workbox-core.prod.js',
    '/assets/vendors/workbox/workbox-recipes.prod.js',
    '/assets/vendors/workbox/workbox-routing.prod.js',
    '/assets/vendors/workbox/workbox-cacheable-response.prod.js',
    '/assets/vendors/workbox/workbox-expiration.prod.js',
    '/assets/vendors/workbox/precaching.prod.js'
];

workbox.recipes.warmStrategyCache({ urls, strategy })

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    strategy
)

self.addEventListener('fetch', event => {
    if (event.request.url.endsWith('.png') || event.request.url.endsWith('.json') || event.request.url.endsWith('.ico') || event.request.url.endsWith('.jpg') || event.request.url.endsWith('.js') || event.request.url.endsWith('.css')) {
        // Oops! This causes workbox-strategies.js to be imported inside a fetch handler,
        // outside of the initial, synchronous service worker execution.
        const cacheFirst = new workbox.strategies.CacheFirst();
        event.respondWith(cacheFirst.handle({ request: event.request }));
    }
});