"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, MessageCircle, UserPlus, Repeat2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { VerificationBadge } from "@/components/verification-badge"
import { useRouter } from "next/navigation"

const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Sarah Wilson",
      username: "sarah",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content: "liked your post",
    post: "Just launched the beta version of Talk!",
    timestamp: "2m",
    read: false,
  },
  {
    id: 2,
    type: "follow",
    user: {
      name: "Tech Insider",
      username: "techinsider",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content: "started following you",
    timestamp: "1h",
    read: false,
  },
  {
    id: 3,
    type: "comment",
    user: {
      name: "John Doe",
      username: "john",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content: "commented on your post",
    post: "AI advancements are changing how we interact...",
    timestamp: "3h",
    read: true,
  },
  {
    id: 4,
    type: "repost",
    user: {
      name: "Design Hub",
      username: "designhub",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content: "reposted your post",
    post: "Share your thoughts...",
    timestamp: "5h",
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="h-4 w-4 text-red-500" />
    case "comment":
      return <MessageCircle className="h-4 w-4 text-blue-500" />
    case "follow":
      return <UserPlus className="h-4 w-4 text-green-500" />
    case "repost":
      return <Repeat2 className="h-4 w-4 text-purple-500" />
    default:
      return null
  }
}

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

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`post-card cursor-pointer transition-all ${!notification.read ? "ring-2 ring-blue-500/20" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{notification.user.name}</span>
                    {notification.user.verified && <VerificationBadge />}
                    <span className="text-sm text-muted-foreground">@{notification.user.username}</span>
                    <span className="text-sm text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{notification.content}</p>
                  {notification.post && (
                    <p className="text-sm text-foreground bg-muted/50 rounded p-2 mt-2">"{notification.post}"</p>
                  )}
                </div>
                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNavigation />
    </div>
  )
}
