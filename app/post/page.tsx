"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ImageIcon, Video, BarChart3, Smile, MapPin, X } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"

export default function PostPage() {
  const router = useRouter()
  const [postContent, setPostContent] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isPosting, setIsPosting] = useState(false)

  const handlePost = async () => {
    if (!postContent.trim()) return

    setIsPosting(true)
    // Simulate posting
    setTimeout(() => {
      setIsPosting(false)
      router.push("/")
    }, 2000)
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(ellipse_at_50%_150%,rgba(255,255,255,0.15),transparent)]"
          style={{ transform: "translateZ(0)" }}
        />
      </div>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="liquid-button rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Create Post</h1>
          </div>
          <Button
            onClick={handlePost}
            disabled={!postContent.trim() || isPosting}
            className="bg-primary hover:bg-primary/90 liquid-button rounded-full"
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>

      {/* Post Creation */}
      <div className="p-4 max-w-4xl mx-auto">
        <Card className="post-card">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What's happening?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 resize-none min-h-[120px]"
                />

                {/* Selected Images */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Selected ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 bg-black/50 hover:bg-black/70 text-white liquid-button rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Character Count */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-primary liquid-button rounded-full">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary liquid-button rounded-full">
                      <Video className="h-4 w-4 mr-1" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary liquid-button rounded-full">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Poll
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary liquid-button rounded-full">
                      <Smile className="h-4 w-4 mr-1" />
                      Emoji
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary liquid-button rounded-full">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">{postContent.length}/280</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Options */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Who can reply?</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="reply" value="everyone" defaultChecked className="text-primary" />
                <span>Everyone</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="reply" value="followers" className="text-primary" />
                <span>People you follow</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="reply" value="mentioned" className="text-primary" />
                <span>Only people you mention</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
