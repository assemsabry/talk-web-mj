"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ReportModalProps {
  postId: string
  onClose: () => void
}

const reportReasons = [
  "Spam",
  "Harassment",
  "Hate Speech",
  "Violence",
  "Misinformation",
  "Copyright Violation",
  "Other",
]

export function ReportModal({ postId, onClose }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleSubmit = () => {
    // Handle report submission
    console.log("Report submitted:", { postId, reason: selectedReason, info: additionalInfo })
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Report Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Reason for reporting</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {reportReasons.map((reason) => (
                <Button
                  key={reason}
                  variant={selectedReason === reason ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedReason(reason)}
                  className="text-sm"
                >
                  {reason}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="additional-info">Additional Information (Optional)</Label>
            <Textarea
              id="additional-info"
              placeholder="Provide more details..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedReason}
              className="liquid-button gradient-bg text-white flex-1"
            >
              Submit Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
