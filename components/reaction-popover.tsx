"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const reactions = ["❤️", "👍🏻", "😂", "😥", "😡"]

interface ReactionPopoverProps {
  children: React.ReactNode
}

export function ReactionPopover({ children }: ReactionPopoverProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-2" side="top">
        <div className="flex gap-1">
          {reactions.map((reaction) => (
            <Button
              key={reaction}
              variant="ghost"
              size="sm"
              className="h-10 w-10 text-lg hover:scale-125 transition-transform"
              onClick={() => setSelectedReaction(reaction)}
            >
              {reaction}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
