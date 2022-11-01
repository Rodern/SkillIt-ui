importScripts('./assets/vendors/workbox/workbox-v6.5.4/workbox-sw.js');
//import { warmStrategyCache } from 'workbox-recipes'

workbox.setConfig({
    modulePathPrefix: './assets/vendors/workbox/workbox-v6.5.4/',
});

const strategy = new workbox.strategies.CacheFirst();

const cacheName = 'skillItCache';
const urls = [
    '/manifest.json',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/assets/vendors/jquery-3.6.0.min.js',
    '/assets/vendors/tailwind/font.awesome.css',
    '/assets/vendors/tailwind/tailwind.elements.min.css',
    '/assets/vendors/tailwind/tailwind.elements.min.js',
    '/assets/vendors/tailwind/tailwindcss.css',
    '/assets/vendors/tailwind/tailwindcss.js',
    '/assets/vendors/workbox/workbox-v6.5.4/workbox-sw.js',
    '/assets/vendors/workbox/workbox-v6.5.4/workbox-strategies.prod.js',
    '/assets/vendors/workbox/workbox-v6.5.4/workbox-core.prod.js',
    '/assets/vendors/workbox/workbox-v6.5.4/workbox-recipes.prod.js',
    '/assets/vendors/workbox/workbox-v6.5.4/workbox-routing.prod.js',
    '/assets/vendors/workbox/workbox-v6.5.4/workbox-cacheable-response.prod.js',
    '/assets/vendors/workbox/workbox-v6.5.4/workbox-expiration.prod.js',
    '/assets/vendors/workbox/workbox-v6.5.4/precaching.prod.js'
];

workbox.recipes.warmStrategyCache({ urls, strategy})

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    strategy
)

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    //if (url.origin === location.origin && url.pathname === '/') {
    event.respondWith(new workbox.strategies.StaleWhileRevalidate().handle({ event, request }));
    //}
});