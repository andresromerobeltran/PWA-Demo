/* =====================================================
   PWA Learn
   Service Worker
===================================================== */

/* =====================================================
   NOMBRE DEL CACHE
===================================================== */

const CACHE_NAME = "pwa-learn-v2";

/* =====================================================
   ARCHIVOS A ALMACENAR
===================================================== */

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./offline.html",
    "./manifest.json",
    "./css/styles.css",
    "./js/app.js",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

/* =====================================================
   INSTALACIÓN
===================================================== */

self.addEventListener("install", event => {

    console.log("Service Worker instalado.");

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});

/* =====================================================
   ACTIVACIÓN
===================================================== */

self.addEventListener("activate", event => {

    console.log("Service Worker activado.");

});

/* =====================================================
   INTERCEPTAR PETICIONES
===================================================== */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(cachedResponse => {

                if (cachedResponse) {

                    return cachedResponse;

                }

                return fetch(event.request)

                    .then(networkResponse => {

                        if (networkResponse.ok) {

                            return networkResponse;

                        }

                        return caches.match("./offline.html");

                    })

                    .catch(() => {

                        return caches.match("./offline.html");

                    });

            })

    );

});