"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, User, Calendar, FileText, Award } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { USER_TITLES, type UserTitle } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [bio, setBio] = useState("")
  const [title, setTitle] = useState<UserTitle>("Other")
  const [birthDate, setBirthDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
      setStep(2) // Go to password step
    }
  }, [searchParams])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setStep(3) // Go to OTP step

    // Simulate sending OTP
    toast({
      title: "Verification code sent",
      description: "Please check your email for the verification code.",
    })
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      })
      return
    }

    // For demo purposes, accept any 6-digit code
    setStep(4) // Go to profile setup
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check username availability (simulate)
      if (username.length < 3) {
        toast({
          title: "Username too short",
          description: "Username must be at least 3 characters long.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Simulate account creation
      const userData = {
        username,
        full_name: fullName,
        bio,
        title,
        birth_date: birthDate,
      }

      // In real implementation, this would create the account
      // const { data, error } = await signUp(email, password, userData)

      toast({
        title: "Account created successfully!",
        description: "Welcome to Talk! Your account has been created.",
      })

      router.push("/auth/welcome")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full liquid-button gradient-bg text-white">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )

      case 2:
        return (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full liquid-button gradient-bg text-white">
              Send Verification Code <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )

      case 3:
        return (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                We sent a verification code to <strong>{email}</strong>
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-2xl tracking-widest"
                required
              />
            </div>
            <Button type="submit" className="w-full liquid-button gradient-bg text-white">
              Verify Code <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => toast({ title: "Code resent", description: "A new verification code has been sent." })}
            >
              Resend Code
            </Button>
          </form>
        )

      case 4:
        return (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Select value={title} onValueChange={(value: UserTitle) => setTitle(value)}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select your title" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {USER_TITLES.map((titleOption) => (
                      <SelectItem key={titleOption} value={titleOption}>
                        {titleOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date (Private)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="pl-10 min-h-[80px]"
                />
              </div>
            </div>

            <Button type="submit" className="w-full liquid-button gradient-bg text-white" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )

      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "What's your email?"
      case 2:
        return "Create a password"
      case 3:
        return "Verify your email"
      case 4:
        return "Complete your profile"
      default:
        return "Join Talk"
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
          <div className="flex items-center justify-between">
            {step > 1 && (
              <Button variant="ghost" size="icon" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex justify-center flex-1">
              <Image src="/talk-logo.png" alt="Talk" width={64} height={64} className="rounded-2xl" priority />
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
          <CardTitle className="text-2xl gradient-text">{getStepTitle()}</CardTitle>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  )
}
