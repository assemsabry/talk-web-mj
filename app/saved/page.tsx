"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bookmark, ImageIcon, Video } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { VerificationBadge } from "@/components/verification-badge"
import { useRouter } from "next/navigation"
import { fallbackPosts } from "@/lib/supabase"

export default function SavedPage() {
  const router = useRouter()
  const [savedPosts, setSavedPosts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Load saved posts (using fallback data for now)
    setSavedPosts(fallbackPosts.slice(0, 2)) // Simulate some saved posts
  }, [])

  const filteredPosts = savedPosts.filter((post) => {
    if (activeTab === "images") return post.image_urls && post.image_urls.length > 0
    if (activeTab === "videos") return post.video_url
    return true
  })

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
          <h1 className="text-xl font-semibold">Saved Posts</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 liquid-nav rounded-full">
            <TabsTrigger value="all" className="flex items-center gap-2 rounded-full">
              <Bookmark className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2 rounded-full">
              <ImageIcon className="h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2 rounded-full">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="post-card cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.profiles?.avatar_url || "/talk-logo-new.png"} />
                          <AvatarFallback>{post.profiles?.full_name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-semibold text-lg">{post.profiles?.full_name}</span>
                            {post.profiles?.verified && <VerificationBadge />}
                            <span className="text-muted-foreground">@{post.profiles?.username}</span>
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-foreground mb-4 text-base leading-relaxed">{post.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-16">
                  <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-lg">No saved posts yet</p>
                  <p className="text-muted-foreground text-sm">Posts you save will appear here</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">No saved images yet</p>
              <p className="text-muted-foreground text-sm">Images you save will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="text-center py-16">
              <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">No saved videos yet</p>
              <p className="text-muted-foreground text-sm">Videos you save will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  )
}
