"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn, getCurrentUser } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const user = await getCurrentUser()
      if (user) {
        router.push("/")
      }
    }
    checkUser()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        const { data, error } = await signIn(email, password)
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Account not found",
              description: "Please check your email and password or create a new account.",
              variant: "destructive",
            })
          } else {
            throw error
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          })
          router.push("/")
        }
      } else {
        // For signup, redirect to OTP verification
        router.push(`/auth/signup?email=${encodeURIComponent(email)}`)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Floating Bubbles Background */}
      <div className="floating-bubbles">
        <div
          className="bubble"
          style={{ width: "80px", height: "80px", top: "15%", left: "10%", animationDelay: "0s" }}
        />
        <div
          className="bubble"
          style={{ width: "60px", height: "60px", top: "25%", right: "15%", animationDelay: "1s" }}
        />
        <div
          className="bubble"
          style={{ width: "100px", height: "100px", bottom: "20%", left: "20%", animationDelay: "2s" }}
        />
        <div
          className="bubble"
          style={{ width: "70px", height: "70px", bottom: "30%", right: "10%", animationDelay: "3s" }}
        />
      </div>

      <Card className="w-full max-w-md post-card">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Image src="/talk-logo.png" alt="Talk" width={80} height={80} className="rounded-2xl" priority />
          </div>
          <CardTitle className="text-3xl gradient-text">{isLogin ? "Welcome back to Talk" : "Join Talk"}</CardTitle>
          <p className="text-muted-foreground">
            {isLogin ? "Sign in to your account" : "Create your account to get started"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full liquid-button gradient-bg text-white" disabled={isLoading}>
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  {isLogin ? "Sign In" : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
