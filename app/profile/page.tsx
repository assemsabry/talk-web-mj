"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Settings,
  Calendar,
  Grid3X3,
  Star,
  Bookmark,
  Edit,
  Camera,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Crop,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { VerificationBadge } from "@/components/verification-badge"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("posts")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isImageEditOpen, setIsImageEditOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<"profile" | "banner" | null>(null)
  const [profileData, setProfileData] = useState({
    name: "Assem Sabry",
    username: "@assem",
    bio: "I Made It.",
    joinDate: "July 2025",
    followers: 0,
    following: 0,
  })

  const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }

  const handleImageEdit = (type: "profile" | "banner") => {
    setEditingImage(type)
    setIsImageEditOpen(true)
  }

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      {/* Floating Bubbles Background */}
      <div className="floating-bubbles">
        <div
          className="bubble"
          style={{ width: "80px", height: "80px", top: "15%", left: "5%", animationDelay: "0s" }}
        />
        <div
          className="bubble"
          style={{ width: "60px", height: "60px", top: "30%", right: "10%", animationDelay: "1.5s" }}
        />
        <div
          className="bubble"
          style={{ width: "100px", height: "100px", bottom: "30%", left: "15%", animationDelay: "3s" }}
        />
        <div
          className="bubble"
          style={{ width: "70px", height: "70px", bottom: "15%", right: "20%", animationDelay: "4.5s" }}
        />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="liquid-button rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/settings")}
            className="liquid-button rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto">
        {/* Banner */}
        <div className="relative h-64 gradient-bg">
          <Image src="/placeholder.svg?height=256&width=1024" alt="Profile Banner" fill className="object-cover" />
          <Button
            onClick={() => handleImageEdit("banner")}
            className="absolute bottom-4 right-4 liquid-button rounded-full"
            size="icon"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Info - Centered */}
        <div className="px-6 pb-6 text-center">
          {/* Avatar - Centered */}
          <div className="relative -mt-20 mb-6 flex justify-center">
            <div className="relative">
              <Avatar className="w-40 h-40 border-4 border-background shadow-xl">
                <AvatarImage src="/placeholder.svg?height=160&width=160" />
                <AvatarFallback className="text-4xl">AS</AvatarFallback>
              </Avatar>
              <Button
                onClick={() => handleImageEdit("profile")}
                className="absolute bottom-2 right-2 liquid-button rounded-full"
                size="icon"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* User Info - Centered */}
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">{profileData.name}</h1>
              <VerificationBadge />
            </div>

            <p className="text-xl text-muted-foreground">{profileData.username}</p>

            <p className="text-lg text-foreground">{profileData.bio}</p>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>Joined {profileData.joinDate}</span>
            </div>

            {/* Stats - Centered */}
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="font-bold text-2xl gradient-text">{profileData.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl gradient-text">{profileData.following}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>

            {/* Edit Button */}
            <Button onClick={handleEditProfile} className="liquid-button gradient-bg text-white rounded-full px-8 mt-6">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 liquid-nav rounded-full">
              <TabsTrigger value="posts" className="flex items-center gap-2 rounded-full">
                <Grid3X3 className="h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2 rounded-full">
                <Star className="h-4 w-4" />
                Media
              </TabsTrigger>
              <TabsTrigger value="likes" className="flex items-center gap-2 rounded-full">
                <Bookmark className="h-4 w-4" />
                Saved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-8">
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Your posts will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="media" className="mt-8">
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Your media will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="likes" className="mt-8">
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Your saved posts will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profileData.username}
                onChange={(e) => setProfileData((prev) => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsEditModalOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setIsEditModalOpen(false)} className="liquid-button gradient-bg text-white flex-1">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Edit Modal */}
      <Dialog open={isImageEditOpen} onOpenChange={setIsImageEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {editingImage === "profile" ? "Profile" : "Banner"} Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Image preview will appear here</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="icon" className="liquid-button rounded-full bg-transparent">
                <Crop className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="liquid-button rounded-full bg-transparent">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="liquid-button rounded-full bg-transparent">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="liquid-button rounded-full bg-transparent">
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsImageEditOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setIsImageEditOpen(false)} className="liquid-button gradient-bg text-white flex-1">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  )
}
