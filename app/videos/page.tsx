"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Bookmark, Play, Pause, Volume2, VolumeX, Verified } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ReactionPopover } from "@/components/reaction-popover"

const sampleVideos = [
  {
    id: 1,
    user: {
      name: "Creative Studio",
      username: "@creative",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    description: "Amazing motion graphics tutorial! 🎨 #MotionGraphics #Design #Tutorial",
    video: "/placeholder.svg?height=800&width=450",
    likes: 12500,
    comments: 234,
    shares: 89,
    music: "Original Sound - Creative Studio",
  },
  {
    id: 2,
    user: {
      name: "Tech Reviewer",
      username: "@techrev",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    description: "Latest smartphone review! What do you think? 📱 #TechReview #Smartphone",
    video: "/placeholder.svg?height=800&width=450",
    likes: 8900,
    comments: 156,
    shares: 67,
    music: "Trending Audio - Tech Beats",
  },
]

export default function VideosPage() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const videos = videoRefs.current
      const windowHeight = window.innerHeight

      videos.forEach((video, index) => {
        if (video) {
          const rect = video.getBoundingClientRect()
          const isVisible = rect.top >= 0 && rect.bottom <= windowHeight

          if (isVisible && index !== currentVideo) {
            setCurrentVideo(index)
            video.play()
            setIsPlaying(true)
          } else if (!isVisible) {
            video.pause()
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentVideo])

  const togglePlayPause = () => {
    const video = videoRefs.current[currentVideo]
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = videoRefs.current[currentVideo]
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden pb-20">
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {sampleVideos.map((video, index) => (
          <div key={video.id} className="snap-start h-screen relative flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60">
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Video Player Placeholder</p>
                  <p className="text-sm opacity-50">Tap to play</p>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="liquid-button h-16 w-16 rounded-full bg-black/20 text-white hover:bg-black/40"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
              {/* User Avatar */}
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src={video.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="liquid-button absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600"
                >
                  <span className="text-xs font-bold">+</span>
                </Button>
              </div>

              {/* Like Button */}
              <div className="flex flex-col items-center">
                <ReactionPopover>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="liquid-button h-12 w-12 text-white hover:bg-white/20 bg-gradient-to-br from-pink-500 to-orange-500 text-white"
                  >
                    <Heart className="h-6 w-6" />
                  </Button>
                </ReactionPopover>
                <span className="text-white text-xs font-medium">{video.likes.toLocaleString()}</span>
              </div>

              {/* Comment Button */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="liquid-button h-12 w-12 text-white hover:bg-white/20 bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                >
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs font-medium">{video.comments}</span>
              </div>

              {/* Share Button */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="liquid-button h-12 w-12 text-white hover:bg-white/20 bg-gradient-to-br from-green-500 to-teal-500 text-white"
                >
                  <Share className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs font-medium">{video.shares}</span>
              </div>

              {/* Bookmark Button */}
              <Button variant="ghost" size="icon" className="liquid-button h-12 w-12 text-white hover:bg-white/20">
                <Bookmark className="h-6 w-6" />
              </Button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-24 left-4 right-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{video.user.name}</span>
                {video.user.verified && <Verified className="h-4 w-4 text-blue-500 fill-current" />}
                <span className="text-white/70">@{video.user.username.slice(1)}</span>
              </div>
              <p className="text-sm mb-2">{video.description}</p>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span>♪</span>
                <span>{video.music}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                className="liquid-button h-10 w-10 text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  )
}
