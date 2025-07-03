export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications")
    return false
  }

  if (Notification.permission === "granted") {
    return true
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  }

  return false
}

export const showNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      icon: "/talk-logo.png",
      badge: "/talk-logo.png",
      ...options,
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    // Auto close after 5 seconds
    setTimeout(() => notification.close(), 5000)

    return notification
  }
}

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js")
      console.log("SW registered: ", registration)
      return registration
    } catch (error) {
      console.log("SW registration failed: ", error)
    }
  }
}
