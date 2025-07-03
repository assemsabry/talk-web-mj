"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Heart } from "lucide-react"

interface CommentModalProps {
  postId: string
  onClose: () => void
}

const sampleComments = [
  {
    id: 1,
    user: { name: "John Doe", username: "john", avatar: "/talk-logo-new.png" },
    content: "Great work! Looking forward to trying it out.",
    timestamp: "2h",
    likes: 12,
  },
  {
    id: 2,
    user: { name: "Sarah Wilson", username: "sarah", avatar: "/talk-logo-new.png" },
    content: "This looks amazing! When will it be available?",
    timestamp: "1h",
    likes: 8,
  },
]

export function CommentModal({ postId, onClose }: CommentModalProps) {
  const [newComment, setNewComment] = useState("")

  const handleSubmit = () => {
    if (!newComment.trim()) return
    // Handle comment submission
    console.log("Comment submitted:", { postId, content: newComment })
    setNewComment("")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Comment Input */}
          <div className="flex items-start gap-3 border-b pb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/talk-logo-new.png" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Write a comment..."
                className="flex-1"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              />
              <Button size="icon" onClick={handleSubmit} disabled={!newComment.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {sampleComments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.user.name}</span>
                    <span className="text-muted-foreground text-xs">@{comment.user.username}</span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="text-muted-foreground text-xs">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm mb-2">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-6 px-2 liquid-button rounded-full">
                      <Heart className="h-3 w-3 mr-1" />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
