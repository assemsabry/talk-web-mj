"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"

export default function NotificationsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Floating Bubbles Background */}
      <div className="floating-bubbles">
        <div
          className="bubble"
          style={{ width: "60px", height: "60px", top: "10%", left: "10%", animationDelay: "0s" }}
        />
        <div
          className="bubble"
          style={{ width: "80px", height: "80px", top: "20%", right: "15%", animationDelay: "1s" }}
        />
        <div
          className="bubble"
          style={{ width: "40px", height: "40px", top: "60%", left: "20%", animationDelay: "2s" }}
        />
        <div
          className="bubble"
          style={{ width: "100px", height: "100px", bottom: "20%", right: "10%", animationDelay: "3s" }}
        />
        <div
          className="bubble"
          style={{ width: "50px", height: "50px", bottom: "40%", left: "80%", animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-4 p-4 max-w-6xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>
      </div>

      {/* Empty State */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
            <Bell className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No notifications yet</h2>
          <p className="text-muted-foreground mb-6">
            When someone likes, comments, or follows you, you'll see it here.
          </p>
          <Button onClick={() => router.push("/")} className="liquid-button gradient-bg text-white rounded-full px-6">
            Back to Home
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
