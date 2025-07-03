"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  MessageSquare,
  Heart,
  UserPlus,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isChangeUsernameOpen, setIsChangeUsernameOpen] = useState(false)
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    likes: true,
    comments: true,
    follows: true,
    messages: true,
  })
  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    showActivity: true,
    allowMessages: true,
    showInSearch: true,
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Floating Bubbles Background */}
      <div className="floating-bubbles">
        <div
          className="bubble"
          style={{ width: "60px", height: "60px", top: "10%", left: "10%", animationDelay: "0s" }}
        />
        <div
          className="bubble"
          style={{ width: "80px", height: "80px", top: "20%", right: "15%", animationDelay: "1s" }}
        />
        <div
          className="bubble"
          style={{ width: "40px", height: "40px", top: "60%", left: "20%", animationDelay: "2s" }}
        />
        <div
          className="bubble"
          style={{ width: "100px", height: "100px", bottom: "20%", right: "10%", animationDelay: "3s" }}
        />
        <div
          className="bubble"
          style={{ width: "50px", height: "50px", bottom: "40%", left: "80%", animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-4xl mx-auto">
        {/* Account Settings */}
        <Card className="post-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="secondary" className="w-full justify-start" onClick={() => router.push("/profile")}>
              <User className="h-4 w-4 mr-3" />
              Edit Profile
            </Button>
            <Button variant="secondary" className="w-full justify-start" onClick={() => setIsChangePasswordOpen(true)}>
              <Lock className="h-4 w-4 mr-3" />
              Change Password
            </Button>
            <Button variant="secondary" className="w-full justify-start" onClick={() => setIsChangeEmailOpen(true)}>
              <Mail className="h-4 w-4 mr-3" />
              Change Email
            </Button>
            <Button variant="secondary" className="w-full justify-start" onClick={() => setIsChangeUsernameOpen(true)}>
              <User className="h-4 w-4 mr-3" />
              Change Username
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="post-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <div>
                  <span className="font-medium">Night Mode</span>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            </div>
            <Separator />
            <Button variant="secondary" className="w-full justify-start">
              <Smartphone className="h-4 w-4 mr-3" />
              Display Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="post-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <span>Push Notifications</span>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>Email Notifications</span>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="h-4 w-4" />
                <span>Likes</span>
              </div>
              <Switch
                checked={notifications.likes}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, likes: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4" />
                <span>Comments</span>
              </div>
              <Switch
                checked={notifications.comments}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, comments: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserPlus className="h-4 w-4" />
                <span>New Followers</span>
              </div>
              <Switch
                checked={notifications.follows}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, follows: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="post-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4" />
                <span>Private Account</span>
              </div>
              <Switch
                checked={privacy.privateAccount}
                onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, privateAccount: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="h-4 w-4" />
                <span>Show Activity Status</span>
              </div>
              <Switch
                checked={privacy.showActivity}
                onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showActivity: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4" />
                <span>Allow Messages from Anyone</span>
              </div>
              <Switch
                checked={privacy.allowMessages}
                onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, allowMessages: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4" />
                <span>Show in Search Results</span>
              </div>
              <Switch
                checked={privacy.showInSearch}
                onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showInSearch: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="post-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="secondary" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-3" />
              Help Center
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-3" />
              Contact Support
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="post-card">
          <CardContent className="p-4">
            <Button variant="destructive" className="w-full">
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Change Email Modal */}
      <Dialog open={isChangeEmailOpen} onOpenChange={setIsChangeEmailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-email">Current Email</Label>
              <Input id="current-email" type="email" placeholder="current@example.com" />
            </div>
            <div>
              <Label htmlFor="new-email">New Email</Label>
              <Input id="new-email" type="email" placeholder="new@example.com" />
            </div>
            <div>
              <Label htmlFor="password-confirm">Password</Label>
              <Input id="password-confirm" type="password" placeholder="Enter your password" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsChangeEmailOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => setIsChangeEmailOpen(false)}
                className="liquid-button gradient-bg text-white flex-1"
              >
                Update Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsChangePasswordOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => setIsChangePasswordOpen(false)}
                className="liquid-button gradient-bg text-white flex-1"
              >
                Update Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Username Modal */}
      <Dialog open={isChangeUsernameOpen} onOpenChange={setIsChangeUsernameOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Username</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-username">Current Username</Label>
              <Input id="current-username" value="@assem" disabled />
            </div>
            <div>
              <Label htmlFor="new-username">New Username</Label>
              <Input id="new-username" placeholder="@newusername" />
            </div>
            <div>
              <Label htmlFor="password-username">Password</Label>
              <Input id="password-username" type="password" placeholder="Enter your password" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsChangeUsernameOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => setIsChangeUsernameOpen(false)}
                className="liquid-button gradient-bg text-white flex-1"
              >
                Update Username
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  )
}
