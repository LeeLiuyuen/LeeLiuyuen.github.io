// SPDX-License-Identifier: GPL-2.0-only

const COOP = "same-origin";
const COEP = "require-corp";
const VERSION = "20260623b";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") {
    return;
  }

  event.respondWith(
    fetch(new Request(event.request, { cache: "no-store" })).then((response) => {
      const headers = new Headers(response.headers);
      headers.set("Cross-Origin-Opener-Policy", COOP);
      headers.set("Cross-Origin-Embedder-Policy", COEP);
      headers.set("Cross-Origin-Resource-Policy", "same-origin");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    })
  );
});
