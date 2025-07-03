"use client"

import { Button } from "@/components/ui/button"

const reactions = ["❤️", "👍🏻", "😂", "😥", "😡"]

interface ReactionSelectorProps {
  onSelect: (reaction: string) => void
  onClose: () => void
}

export function ReactionSelector({ onSelect, onClose }: ReactionSelectorProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 z-50">
      <div className="reaction-popup rounded-full p-2 flex gap-1">
        {reactions.map((reaction) => (
          <Button
            key={reaction}
            variant="ghost"
            size="sm"
            className="h-10 w-10 text-lg hover:scale-125 transition-transform rounded-full"
            onClick={() => onSelect(reaction)}
          >
            {reaction}
          </Button>
        ))}
      </div>
    </div>
  )
}
