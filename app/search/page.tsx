"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ArrowLeft, AtSign } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { VerificationBadge } from "@/components/verification-badge"
import { useRouter, useSearchParams } from "next/navigation"
import { fallbackProfiles, fallbackPosts } from "@/lib/supabase"

const trendingHashtags = [
  { tag: "#TalkApp", posts: "12.5K posts" },
  { tag: "#AI", posts: "45.2K posts" },
  { tag: "#SocialMedia", posts: "32.1K posts" },
  { tag: "#Technology", posts: "28.7K posts" },
  { tag: "#Design", posts: "19.3K posts" },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isUsernameSearch, setIsUsernameSearch] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [searchParams])

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      const results = []

      // Search in posts
      const postResults = fallbackPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.profiles.full_name.toLowerCase().includes(query.toLowerCase()) ||
          post.profiles.username.toLowerCase().includes(query.toLowerCase()),
      )

      // Search in profiles
      const profileResults = fallbackProfiles.filter(
        (profile) =>
          profile.full_name.toLowerCase().includes(query.toLowerCase()) ||
          profile.username.toLowerCase().includes(query.toLowerCase()) ||
          (profile.bio && profile.bio.toLowerCase().includes(query.toLowerCase())),
      )

      results.push(...postResults.map((post) => ({ ...post, type: "post" })))
      results.push(...profileResults.map((profile) => ({ ...profile, type: "profile" })))

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const handleUsernameSearch = () => {
    setIsUsernameSearch(true)
    setSearchQuery("@")
  }

  const handleSearchChange = (value: string) => {
    if (isUsernameSearch) {
      // Only allow lowercase letters and numbers after @
      const cleanValue = value.replace(/[^a-z0-9@]/g, "").toLowerCase()
      if (cleanValue.startsWith("@")) {
        setSearchQuery(cleanValue)
      } else {
        setSearchQuery("@" + cleanValue)
      }
    } else {
      setSearchQuery(value)
    }

    // Perform search after typing
    if (value.length > 2) {
      performSearch(value)
    } else {
      setSearchResults([])
    }
  }

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
        <div className="flex items-center gap-4 p-4 max-w-6xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Search</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 max-w-6xl mx-auto">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isUsernameSearch ? "Search by username..." : "Search Talk"}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-12 rounded-full bg-muted/50"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className={`h-12 w-12 rounded-full ${isUsernameSearch ? "gradient-bg text-white" : "liquid-button"}`}
            onClick={handleUsernameSearch}
          >
            <AtSign className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="px-4 space-y-6 max-w-6xl mx-auto">
        {/* Search Results */}
        {searchQuery.length > 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {isSearching ? "Searching..." : `Results for "${searchQuery}"`}
            </h2>
            <div className="space-y-3">
              {searchResults.map((result, index) => (
                <Card key={index} className="post-card cursor-pointer">
                  <CardContent className="p-4">
                    {result.type === "profile" ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={result.avatar_url || "/talk-logo-new.png"} />
                          <AvatarFallback>{result.full_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.full_name}</span>
                            {result.verified && <VerificationBadge />}
                          </div>
                          <p className="text-sm text-muted-foreground">@{result.username}</p>
                          {result.bio && <p className="text-sm text-muted-foreground">{result.bio}</p>}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={result.profiles?.avatar_url || "/talk-logo-new.png"} />
                          <AvatarFallback>{result.profiles?.full_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{result.profiles?.full_name}</span>
                            {result.profiles?.verified && <VerificationBadge />}
                            <span className="text-muted-foreground text-xs">@{result.profiles?.username}</span>
                          </div>
                          <p className="text-sm">{result.content}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {!isSearching && searchResults.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No results found</p>
              )}
            </div>
          </div>
        )}

        {/* Trending Now - Show only when not searching */}
        {searchQuery.length <= 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Trending Now</h2>
            <div className="space-y-3">
              {trendingHashtags.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleSearchChange(item.tag)}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium hashtag-gradient">{item.tag}</p>
                      <p className="text-sm text-muted-foreground">{item.posts}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Accounts - Show only when not searching */}
        {searchQuery.length <= 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Suggested Accounts</h2>
            <div className="space-y-3">
              {fallbackProfiles.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={account.avatar_url || "/talk-logo-new.png"} />
                      <AvatarFallback>{account.full_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{account.full_name}</span>
                        {account.verified && <VerificationBadge />}
                      </div>
                      <p className="text-sm text-muted-foreground">@{account.username}</p>
                      <p className="text-xs text-muted-foreground">{account.followers_count} followers</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="liquid-button bg-transparent">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
