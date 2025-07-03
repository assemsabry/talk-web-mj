import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          bio: string | null
          avatar_url: string | null
          banner_url: string | null
          verified: boolean
          followers_count: number
          following_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          bio?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          verified?: boolean
          followers_count?: number
          following_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          bio?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          verified?: boolean
          followers_count?: number
          following_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          image_urls: string[] | null
          video_url: string | null
          poll_data: any | null
          likes_count: number
          comments_count: number
          reposts_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          image_urls?: string[] | null
          video_url?: string | null
          poll_data?: any | null
          likes_count?: number
          comments_count?: number
          reposts_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          image_urls?: string[] | null
          video_url?: string | null
          poll_data?: any | null
          likes_count?: number
          comments_count?: number
          reposts_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          likes_count: number
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          likes_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          likes_count?: number
          created_at?: string
        }
      }
      saved_posts: {
        Row: {
          id: string
          user_id: string
          post_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          post_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string
          created_at?: string
        }
      }
    }
  }
}

// Fallback data when Supabase is not configured - All in English
export const fallbackPosts = [
  {
    id: "1",
    content: "Just launched the beta version of Talk! Excited to hear your feedback. #TalkApp #SocialMedia",
    created_at: new Date().toISOString(),
    likes_count: 1243,
    comments_count: 45,
    reposts_count: 23,
    image_urls: null,
    video_url: null,
    poll_data: null,
    profiles: {
      username: "assem",
      full_name: "Assem Sabry",
      avatar_url: "/assem-profile.jpg",
      verified: true,
    },
  },
  {
    id: "2",
    content:
      "Building the future of social media! 🚀 What features would you like to see next? #Innovation #TechStartup",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    likes_count: 3567,
    comments_count: 128,
    reposts_count: 89,
    image_urls: null,
    video_url: null,
    poll_data: null,
    profiles: {
      username: "assem",
      full_name: "Assem Sabry",
      avatar_url: "/assem-profile.jpg",
      verified: true,
    },
  },
  {
    id: "3",
    content:
      "Welcome to Talk! 🎉 The new era of social networking begins now. Connect, share, and discover amazing content! #Welcome #TalkApp",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    likes_count: 2891,
    comments_count: 67,
    reposts_count: 156,
    image_urls: null,
    video_url: null,
    poll_data: null,
    profiles: {
      username: "talk",
      full_name: "Talk App",
      avatar_url: "/talk-logo-new.png",
      verified: true,
    },
  },
]

export const fallbackProfiles = [
  {
    id: "1",
    username: "assem",
    full_name: "Assem Sabry",
    bio: "Founder & CEO of Talk 🚀 Building the future of social media",
    avatar_url: "/assem-profile.jpg",
    banner_url: null,
    verified: true,
    followers_count: 1250,
    following_count: 180,
  },
  {
    id: "2",
    username: "talk",
    full_name: "Talk App",
    bio: "Official Talk App Account 🚀 The future of social media is here",
    avatar_url: "/talk-logo-new.png",
    banner_url: null,
    verified: true,
    followers_count: 50000,
    following_count: 0,
  },
]

// Helper function to parse mentions and hashtags
export const parseContent = (content: string) => {
  return content
    .replace(/@(\w+)/g, '<span class="mention" onclick="window.location.href=\'/profile/$1\'">@$1</span>')
    .replace(/#(\w+)/g, '<span class="hashtag" onclick="window.location.href=\'/search?q=%23$1\'">#$1</span>')
}
