"use client"

import { Home, Search, Plus, Video, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [indicatorPosition, setIndicatorPosition] = useState(0)

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Plus, label: "Post", path: "/post" },
    { icon: Video, label: "Videos", path: "/videos" },
    { icon: User, label: "Profile", path: "/profile" },
  ]

  const currentIndex = navItems.findIndex((item) => item.path === pathname)

  useEffect(() => {
    setIndicatorPosition(currentIndex * 56) // 56px is button width + gap
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "ArrowRight") {
        event.preventDefault()
        const nextIndex = (currentIndex + 1) % navItems.length
        router.push(navItems[nextIndex].path)
      }
      if (event.ctrlKey && event.key === "ArrowLeft") {
        event.preventDefault()
        const prevIndex = currentIndex === 0 ? navItems.length - 1 : currentIndex - 1
        router.push(navItems[prevIndex].path)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, router])

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 mb-6">
      <div className="liquid-nav rounded-full p-3 w-fit relative">
        <div
          className="nav-indicator"
          style={{
            transform: `translateX(${indicatorPosition}px)`,
            left: "12px",
            top: "12px",
          }}
        />
        <div className="flex items-center gap-2 relative z-10">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Button
                key={item.path}
                variant="ghost"
                size="icon"
                className={`h-12 w-12 rounded-full transition-all duration-300 hover:bg-white/10 ${
                  isActive ? "text-white" : "text-gray-600 hover:text-white"
                }`}
                onClick={() => router.push(item.path)}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
