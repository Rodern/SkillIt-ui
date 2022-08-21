window.addEventListener("DOMContentLoaded", () => {
    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceWorker.js');
            console.info("Succesfully registered Service Worker");
        } catch (error) {
            console.info("Service worker registration failed" + error);
        }
    }
})