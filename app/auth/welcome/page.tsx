"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function WelcomePage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  const handleContinue = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Floating Bubbles Background */}
      <div className="floating-bubbles">
        <div
          className="bubble"
          style={{ width: "100px", height: "100px", top: "10%", left: "10%", animationDelay: "0s" }}
        />
        <div
          className="bubble"
          style={{ width: "80px", height: "80px", top: "20%", right: "15%", animationDelay: "1s" }}
        />
        <div
          className="bubble"
          style={{ width: "120px", height: "120px", bottom: "15%", left: "20%", animationDelay: "2s" }}
        />
        <div
          className="bubble"
          style={{ width: "90px", height: "90px", bottom: "25%", right: "10%", animationDelay: "3s" }}
        />
        <div
          className="bubble"
          style={{ width: "70px", height: "70px", top: "50%", left: "5%", animationDelay: "4s" }}
        />
      </div>

      <Card
        className={`w-full max-w-md post-card transition-all duration-1000 ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <CardHeader className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Image src="/talk-logo.png" alt="Talk" width={100} height={100} className="rounded-3xl" priority />
              <div className="absolute -top-2 -right-2">
                <CheckCircle className="h-8 w-8 text-green-500 bg-background rounded-full" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl gradient-text flex items-center justify-center gap-2">
              Welcome to Talk! <Sparkles className="h-6 w-6 text-yellow-500" />
            </CardTitle>
            <p className="text-muted-foreground text-lg">Your account has been created successfully</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Account verified</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Profile setup complete</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Ready to start talking</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              You're all set! Start connecting with people, share your thoughts, and discover amazing content.
            </p>

            <Button onClick={handleContinue} className="w-full liquid-button gradient-bg text-white text-lg py-6">
              Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
