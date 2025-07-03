const CACHE_NAME = "talk-v1"
const urlsToCache = ["/", "/talk-logo.png", "/manifest.json"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})

self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New notification from Talk",
    icon: "/talk-logo.png",
    badge: "/talk-logo.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "explore",
        title: "Open Talk",
        icon: "/talk-logo.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/talk-logo.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Talk", options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})
