"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Clock, Users } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface PollDisplayProps {
  poll: {
    id: string
    question: string
    options: { text: string; votes: number }[]
    multipleChoice: boolean
    expiresAt: string | null
    totalVotes: number
    userVotes?: number[]
  }
  onVote?: () => void
}

export function PollDisplay({ poll, onVote }: PollDisplayProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(poll.userVotes || [])
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState((poll.userVotes?.length || 0) > 0)
  const { user } = useAuth()
  const { toast } = useToast()

  const isExpired = poll.expiresAt ? new Date(poll.expiresAt) < new Date() : false
  const canVote = user && !hasVoted && !isExpired

  const handleOptionToggle = (optionIndex: number) => {
    if (!canVote) return

    if (poll.multipleChoice) {
      setSelectedOptions((prev) =>
        prev.includes(optionIndex) ? prev.filter((i) => i !== optionIndex) : [...prev, optionIndex],
      )
    } else {
      setSelectedOptions([optionIndex])
    }
  }

  const handleVote = async () => {
    if (!user || selectedOptions.length === 0) return

    setIsVoting(true)
    try {
      // Submit votes for each selected option
      for (const optionIndex of selectedOptions) {
        const { error } = await supabase!.from("poll_votes").insert({
          poll_id: poll.id,
          user_id: user.id,
          option_index: optionIndex,
        })

        if (error) throw error
      }

      setHasVoted(true)
      toast({
        title: "Vote submitted",
        description: "Thank you for participating in the poll!",
      })

      onVote?.()
    } catch (error: any) {
      toast({
        title: "Failed to vote",
        description: error.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVoting(false)
    }
  }

  const getTimeRemaining = () => {
    if (!poll.expiresAt) return null

    const now = new Date()
    const expires = new Date(poll.expiresAt)
    const diff = expires.getTime() - now.getTime()

    if (diff <= 0) return "Expired"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) return `${hours}h ${minutes}m left`
    return `${minutes}m left`
  }

  return (
    <Card className="post-card mt-3">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-4">
          <BarChart3 className="h-5 w-5 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="font-medium mb-2">{poll.question}</h3>

            <div className="space-y-2">
              {poll.options.map((option, index) => {
                const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0
                const isSelected = selectedOptions.includes(index)
                const showResults = hasVoted || isExpired

                return (
                  <div key={index} className="space-y-1">
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full justify-start text-left h-auto p-3 ${
                        canVote ? "cursor-pointer" : "cursor-default"
                      } ${showResults ? "opacity-75" : ""}`}
                      onClick={() => handleOptionToggle(index)}
                      disabled={!canVote}
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span>{option.text}</span>
                          {showResults && (
                            <span className="text-sm font-medium">
                              {percentage.toFixed(1)}% ({option.votes})
                            </span>
                          )}
                        </div>
                        {showResults && <Progress value={percentage} className="mt-2 h-2" />}
                      </div>
                    </Button>
                  </div>
                )
              })}
            </div>

            {canVote && selectedOptions.length > 0 && (
              <Button
                onClick={handleVote}
                disabled={isVoting}
                className="w-full mt-3 liquid-button gradient-bg text-white"
              >
                {isVoting ? "Voting..." : "Submit Vote"}
              </Button>
            )}

            <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{poll.totalVotes} votes</span>
              </div>

              {poll.expiresAt && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{getTimeRemaining()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
