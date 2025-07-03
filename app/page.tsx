"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  Bookmark,
  ImageIcon,
  Video,
  BarChart3,
  Smile,
  Bell,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ReactionSelector } from "@/components/reaction-selector"
import { VerificationBadge } from "@/components/verification-badge"
import { ReportModal } from "@/components/report-modal"
import { CommentModal } from "@/components/comment-modal"
import Image from "next/image"
import Loading from "./loading"
import { supabase, isSupabaseConfigured, fallbackPosts } from "@/lib/supabase"

const postPrompts = [
  "What's new?",
  "What do you think about?",
  "Share your thoughts...",
  "What's happening?",
  "How are you feeling?",
  "What's on your mind?",
  "Share something interesting...",
  "Tell us about your day...",
  "What's inspiring you?",
  "Share your experience...",
  "What are you working on?",
  "What's exciting you today?",
  "Share your perspective...",
  "What's worth sharing?",
  "Express yourself...",
]

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showReactionFor, setShowReactionFor] = useState<string | null>(null)
  const [reportPostId, setReportPostId] = useState<string | null>(null)
  const [commentPostId, setCommentPostId] = useState<string | null>(null)
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    // Only show loading on first visit
    const hasVisited = localStorage.getItem("hasVisited")
    if (!hasVisited) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
        localStorage.setItem("hasVisited", "true")
      }, 3000)
      return () => clearTimeout(timer)
    }

    // Set random prompt
    setCurrentPrompt(postPrompts[Math.floor(Math.random() * postPrompts.length)])

    // Load posts
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data: posts, error } = await supabase
          .from("posts")
          .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url,
            verified
          )
        `)
          .order("created_at", { ascending: false })

        if (error) throw error
        setPosts(posts || fallbackPosts)
      } else {
        // Use fallback data when Supabase is not configured
        setPosts(fallbackPosts)
      }
    } catch (error) {
      console.error("Error loading posts:", error)
      // Always fallback to sample data if there's any error
      setPosts(fallbackPosts)
    }
  }

  const handleReaction = (postId: string, reaction: string) => {
    setShowReactionFor(null)
    // Handle reaction logic here
  }

  const handleMentionClick = (username: string) => {
    window.location.href = `/profile/${username}`
  }

  const renderContent = (content: string) => {
    const parts = content.split(/(@\w+|#\w+)/g)
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        const username = part.slice(1)
        return (
          <span key={index} className="mention" onClick={() => handleMentionClick(username)}>
            {part}
          </span>
        )
      } else if (part.startsWith("#")) {
        return (
          <span
            key={index}
            className="hashtag"
            onClick={() => (window.location.href = `/search?q=${encodeURIComponent(part)}`)}
          >
            {part}
          </span>
        )
      }
      return part
    })
  }

  if (isLoading) {
    return <Loading />
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background pb-24 relative">
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
          <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedPost(null)}
              className="liquid-button rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Post</h1>
            <div />
          </div>
        </div>

        {/* Post Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Card className="post-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedPost.profiles?.avatar_url || "/talk-logo-new.png"} />
                  <AvatarFallback>{selectedPost.profiles?.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-semibold text-xl">{selectedPost.profiles?.full_name}</span>
                    {selectedPost.profiles?.verified && <VerificationBadge />}
                    <span className="text-muted-foreground">@{selectedPost.profiles?.username}</span>
                  </div>
                  <p className="text-foreground mb-6 text-lg leading-relaxed">{renderContent(selectedPost.content)}</p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between max-w-lg">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="liquid-button reaction-button rounded-full"
                        onClick={() => setShowReactionFor(showReactionFor === selectedPost.id ? null : selectedPost.id)}
                      >
                        <Heart className="h-5 w-5 mr-2" />
                        <span>{selectedPost.likes_count}</span>
                      </Button>
                      {showReactionFor === selectedPost.id && (
                        <ReactionSelector
                          onSelect={(reaction) => handleReaction(selectedPost.id, reaction)}
                          onClose={() => setShowReactionFor(null)}
                        />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="liquid-button reaction-button rounded-full"
                      onClick={() => setCommentPostId(selectedPost.id)}
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      <span>{selectedPost.comments_count}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="liquid-button reaction-button rounded-full">
                      <Repeat2 className="h-5 w-5 mr-2" />
                      <span>{selectedPost.reposts_count}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="liquid-button reaction-button rounded-full">
                      <Share className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="liquid-button reaction-button rounded-full">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 relative">
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
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <Image src="/talk-logo-new.png" alt="Talk" width={48} height={48} className="rounded-xl" priority />
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="liquid-button relative rounded-full"
              onClick={() => (window.location.href = "/notifications")}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">5</Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Post Creation */}
        <Card className="post-card">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/talk-logo-new.png" />
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder={currentPrompt}
                  className="border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 h-12"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="liquid-button text-primary rounded-full">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Image
                    </Button>
                    <Button variant="ghost" size="sm" className="liquid-button text-primary rounded-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Poll
                    </Button>
                    <Button variant="ghost" size="sm" className="liquid-button text-primary rounded-full">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm" className="liquid-button text-primary rounded-full">
                      <Smile className="h-4 w-4 mr-2" />
                      GIF
                    </Button>
                  </div>
                  <Button className="liquid-button gradient-bg text-white rounded-full px-6">Post</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        {posts.map((post) => (
          <Card key={post.id} className="post-card cursor-pointer relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
              onClick={(e) => {
                e.stopPropagation()
                setReportPostId(post.id)
              }}
            >
              <AlertCircle className="h-4 w-4" />
            </Button>
            <CardContent className="p-6" onClick={() => setSelectedPost(post)}>
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
                    <span className="text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-foreground mb-4 text-base leading-relaxed">{renderContent(post.content)}</p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between max-w-lg">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="liquid-button reaction-button rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowReactionFor(showReactionFor === post.id ? null : post.id)
                        }}
                      >
                        <Heart className="h-5 w-5 mr-2" />
                        <span>{post.likes_count}</span>
                      </Button>
                      {showReactionFor === post.id && (
                        <ReactionSelector
                          onSelect={(reaction) => handleReaction(post.id, reaction)}
                          onClose={() => setShowReactionFor(null)}
                        />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="liquid-button reaction-button rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        setCommentPostId(post.id)
                      }}
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      <span>{post.comments_count}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="liquid-button reaction-button rounded-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Repeat2 className="h-5 w-5 mr-2" />
                      <span>{post.reposts_count}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="liquid-button reaction-button rounded-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="liquid-button reaction-button rounded-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNavigation />

      {reportPostId && <ReportModal postId={reportPostId} onClose={() => setReportPostId(null)} />}
      {commentPostId && <CommentModal postId={commentPostId} onClose={() => setCommentPostId(null)} />}
    </div>
  )
}
