"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Search, Send, Phone, Video, MoreHorizontal, Verified } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"

const conversations = [
  {
    id: 1,
    user: {
      name: "Sarah Wilson",
      username: "@sarah",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
      online: true,
    },
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m",
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: "Tech Insider",
      username: "@techinsider",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      online: false,
    },
    lastMessage: "Thanks for the follow!",
    timestamp: "1h",
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: "John Doe",
      username: "@john",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
      online: true,
    },
    lastMessage: "See you tomorrow!",
    timestamp: "3h",
    unread: 0,
  },
]

const messages = [
  {
    id: 1,
    sender: "other",
    content: "Hey! How are you doing?",
    timestamp: "2:30 PM",
  },
  {
    id: 2,
    sender: "me",
    content: "I'm doing great! Just working on some new projects. How about you?",
    timestamp: "2:32 PM",
  },
  {
    id: 3,
    sender: "other",
    content: "That sounds exciting! I'd love to hear more about it.",
    timestamp: "2:35 PM",
  },
]

export default function MessagesPage() {
  const router = useRouter()
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Handle sending message
    setNewMessage("")
  }

  if (selectedConversation) {
    return (
      <div className="min-h-screen bg-background pb-20 flex flex-col">
        {/* Chat Header */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSelectedConversation(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedConversation.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{selectedConversation.user.name}</span>
                  {selectedConversation.user.verified && <Verified className="h-4 w-4 text-blue-500 fill-current" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedConversation.user.online ? "Active now" : "Last seen 1h ago"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages" className="pl-10 h-12 rounded-full bg-muted/50" />
        </div>
      </div>

      {/* Conversations */}
      <div className="px-4 space-y-2">
        {conversations.map((conversation) => (
          <Card
            key={conversation.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectedConversation(conversation)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold truncate">{conversation.user.name}</span>
                      {conversation.user.verified && (
                        <Verified className="h-4 w-4 text-blue-500 fill-current flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{conversation.timestamp}</span>
                      {conversation.unread > 0 && (
                        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNavigation />
    </div>
  )
}
