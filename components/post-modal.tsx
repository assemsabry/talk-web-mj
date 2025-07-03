"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Verified, Heart, MessageCircle, Repeat2, Share, Bookmark, Send } from "lucide-react"
import { ReactionPopover } from "./reaction-popover"

interface PostModalProps {
  post: any
  onClose: () => void
}

const sampleComments = [
  {
    id: 1,
    user: { name: "John Doe", username: "@john", avatar: "/placeholder.svg?height=32&width=32" },
    content: "Great work! Looking forward to trying it out.",
    timestamp: "2h",
  },
  {
    id: 2,
    user: { name: "Sarah Wilson", username: "@sarah", avatar: "/placeholder.svg?height=32&width=32" },
    content: "This looks amazing! When will it be available?",
    timestamp: "1h",
  },
]

export function PostModal({ post, onClose }: PostModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          {/* Original Post */}
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{post.user.name}</span>
                {post.user.verified && <Verified className="h-4 w-4 text-blue-500 fill-current" />}
                <span className="text-muted-foreground text-sm">{post.user.username}</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">{post.timestamp}</span>
              </div>
              <p className="text-foreground mb-3">{post.content}</p>

              {/* Reaction Summary */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex -space-x-1">
                  {post.reactions.types.map((reaction: string, index: number) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs"
                    >
                      {reaction}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-1">{post.reactions.count}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between max-w-md">
                <ReactionPopover>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-sm">{post.reactions.count}</span>
                  </Button>
                </ReactionPopover>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Repeat2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">{post.reposts}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Comments Section */}
        <div className="space-y-4 mt-6">
          <h3 className="font-semibold text-lg">Comments</h3>

          {/* Comment Input */}
          <div className="flex items-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input placeholder="Write a comment..." className="flex-1" />
              <Button size="icon">
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
                    <span className="text-muted-foreground text-xs">{comment.user.username}</span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="text-muted-foreground text-xs">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Heart className="h-3 w-3 mr-1" />
                      <span className="text-xs">12</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span className="text-xs">Reply</span>
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
