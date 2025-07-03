"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, BarChart3 } from "lucide-react"

interface PollCreatorProps {
  onCreatePoll: (pollData: {
    question: string
    options: string[]
    multipleChoice: boolean
    expiresIn: number | null
  }) => void
  onCancel: () => void
}

export function PollCreator({ onCreatePoll, onCancel }: PollCreatorProps) {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [multipleChoice, setMultipleChoice] = useState(false)
  const [expiresIn, setExpiresIn] = useState<number | null>(24) // hours

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = () => {
    if (!question.trim()) return

    const validOptions = options.filter((opt) => opt.trim())
    if (validOptions.length < 2) return

    onCreatePoll({
      question: question.trim(),
      options: validOptions,
      multipleChoice,
      expiresIn,
    })
  }

  const isValid = question.trim() && options.filter((opt) => opt.trim()).length >= 2

  return (
    <Card className="post-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Create Poll
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="question">Poll Question</Label>
          <Input
            id="question"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={500}
          />
        </div>

        <div className="space-y-2">
          <Label>Options</Label>
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                maxLength={100}
              />
              {options.length > 2 && (
                <Button variant="outline" size="icon" onClick={() => removeOption(index)} className="liquid-button">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {options.length < 4 && (
            <Button variant="outline" onClick={addOption} className="w-full liquid-button bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="multiple-choice">Allow multiple choices</Label>
          <Switch id="multiple-choice" checked={multipleChoice} onCheckedChange={setMultipleChoice} />
        </div>

        <div>
          <Label htmlFor="expires">Poll Duration (hours)</Label>
          <Input
            id="expires"
            type="number"
            min="1"
            max="168"
            value={expiresIn || ""}
            onChange={(e) => setExpiresIn(e.target.value ? Number.parseInt(e.target.value) : null)}
            placeholder="24"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid} className="liquid-button gradient-bg text-white flex-1">
            Create Poll
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
