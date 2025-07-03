import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// User titles for selection
export const USER_TITLES = [
  "Public Figure",
  "Influencer",
  "Content Creator",
  "AI Engineer",
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "UI Designer",
  "Graphic Designer",
  "Web Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Cybersecurity Expert",
  "Blockchain Developer",
  "Game Developer",
  "Machine Learning Engineer",
  "Cloud Architect",
  "Business Analyst",
  "Digital Marketer",
  "Social Media Manager",
  "SEO Specialist",
  "Entrepreneur",
  "Startup Founder",
  "CEO",
  "CTO",
  "CMO",
  "CFO",
  "COO",
  "VP of Engineering",
  "Tech Lead",
  "Engineering Manager",
  "Scrum Master",
  "Project Manager",
  "Consultant",
  "Freelancer",
  "Artist",
  "Musician",
  "Writer",
  "Blogger",
  "Journalist",
  "Photographer",
  "Videographer",
  "Film Director",
  "Producer",
  "Actor",
  "Voice Actor",
  "Comedian",
  "Podcaster",
  "YouTuber",
  "Streamer",
  "Gamer",
  "Esports Player",
  "Coach",
  "Trainer",
  "Fitness Instructor",
  "Nutritionist",
  "Doctor",
  "Nurse",
  "Therapist",
  "Psychologist",
  "Teacher",
  "Professor",
  "Researcher",
  "Scientist",
  "Engineer",
  "Architect",
  "Lawyer",
  "Judge",
  "Police Officer",
  "Firefighter",
  "Paramedic",
  "Pilot",
  "Chef",
  "Baker",
  "Restaurant Owner",
  "Food Blogger",
  "Travel Blogger",
  "Fashion Designer",
  "Model",
  "Makeup Artist",
  "Hair Stylist",
  "Beauty Influencer",
  "Lifestyle Blogger",
  "Mom Blogger",
  "Dad Blogger",
  "Parenting Expert",
  "Relationship Coach",
  "Life Coach",
  "Motivational Speaker",
  "Author",
  "Poet",
  "Translator",
  "Editor",
  "Publisher",
  "Librarian",
  "Historian",
  "Archaeologist",
  "Anthropologist",
  "Sociologist",
  "Political Scientist",
  "Economist",
  "Financial Advisor",
  "Investment Banker",
  "Stock Trader",
  "Real Estate Agent",
  "Property Developer",
  "Interior Designer",
  "Landscape Architect",
  "Urban Planner",
  "Environmental Scientist",
  "Marine Biologist",
  "Veterinarian",
  "Farmer",
  "Gardener",
  "Botanist",
  "Zoologist",
  "Geologist",
  "Meteorologist",
  "Astronomer",
  "Physicist",
  "Chemist",
  "Mathematician",
  "Statistician",
  "Actuary",
  "Quality Assurance",
  "Tester",
  "Technical Writer",
  "Sales Manager",
  "Account Manager",
  "Customer Success Manager",
  "HR Manager",
  "Recruiter",
  "Operations Manager",
  "Supply Chain Manager",
  "Logistics Coordinator",
  "Event Planner",
  "Wedding Planner",
  "Travel Agent",
  "Tour Guide",
  "Hotel Manager",
  "Restaurant Manager",
  "Retail Manager",
  "Store Owner",
  "Cashier",
  "Sales Associate",
  "Customer Service Representative",
  "Call Center Agent",
  "Virtual Assistant",
  "Secretary",
  "Administrative Assistant",
  "Office Manager",
  "Receptionist",
  "Data Entry Clerk",
  "Bookkeeper",
  "Accountant",
  "Tax Advisor",
  "Auditor",
  "Insurance Agent",
  "Bank Teller",
  "Loan Officer",
  "Credit Analyst",
  "Risk Manager",
  "Compliance Officer",
  "Legal Assistant",
  "Paralegal",
  "Court Reporter",
  "Bailiff",
  "Security Guard",
  "Private Investigator",
  "Detective",
  "Social Worker",
  "Counselor",
  "Case Manager",
  "Non-profit Worker",
  "Volunteer",
  "Community Organizer",
  "Activist",
  "Politician",
  "Government Official",
  "Diplomat",
  "Military Officer",
  "Veteran",
  "Student",
  "Graduate Student",
  "Intern",
  "Apprentice",
  "Retired",
  "Homemaker",
  "Stay-at-home Parent",
  "Caregiver",
  "Other",
] as const

export type UserTitle = (typeof USER_TITLES)[number]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          bio: string | null
          title: UserTitle
          avatar_url: string | null
          banner_url: string | null
          birth_date: string | null
          verified: boolean
          followers_count: number
          following_count: number
          posts_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          bio?: string | null
          title?: UserTitle
          avatar_url?: string | null
          banner_url?: string | null
          birth_date?: string | null
          verified?: boolean
          followers_count?: number
          following_count?: number
          posts_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          bio?: string | null
          title?: UserTitle
          avatar_url?: string | null
          banner_url?: string | null
          birth_date?: string | null
          verified?: boolean
          followers_count?: number
          following_count?: number
          posts_count?: number
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
          poll_id: string | null
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
          poll_id?: string | null
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
          poll_id?: string | null
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
      polls: {
        Row: {
          id: string
          post_id: string
          question: string
          options: any
          multiple_choice: boolean
          expires_at: string | null
          total_votes: number
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          question: string
          options: any
          multiple_choice?: boolean
          expires_at?: string | null
          total_votes?: number
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          question?: string
          options?: any
          multiple_choice?: boolean
          expires_at?: string | null
          total_votes?: number
          created_at?: string
        }
      }
    }
  }
}

// Fallback data when Supabase is not configured
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
    poll_id: null,
    profiles: {
      username: "assem",
      full_name: "Assem Sabry",
      title: "AI Engineer",
      avatar_url: "/talk-logo.png",
      verified: true,
    },
  },
  {
    id: "2",
    content: "I Made it @talk! 🚀 Welcome to the future of social media. #Innovation #TechStartup",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    likes_count: 3567,
    comments_count: 128,
    reposts_count: 89,
    image_urls: null,
    video_url: null,
    poll_id: null,
    profiles: {
      username: "assem",
      full_name: "Assem Sabry",
      title: "AI Engineer",
      avatar_url: "/talk-logo.png",
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
    poll_id: null,
    profiles: {
      username: "talk",
      full_name: "Talk App",
      title: "Public Figure",
      avatar_url: "/talk-logo.png",
      verified: true,
    },
  },
]

export const fallbackProfiles = [
  {
    id: "1",
    username: "assem",
    full_name: "Assem Sabry",
    bio: "I Made it @talk",
    title: "AI Engineer" as UserTitle,
    avatar_url: "/talk-logo.png",
    banner_url: null,
    verified: true,
    followers_count: 0,
    following_count: 0,
    posts_count: 3,
  },
  {
    id: "2",
    username: "talk",
    full_name: "Talk App",
    bio: "Official Talk App Account 🚀",
    title: "Public Figure" as UserTitle,
    avatar_url: "/talk-logo.png",
    banner_url: null,
    verified: true,
    followers_count: 0,
    following_count: 0,
    posts_count: 1,
  },
]

// Helper function to parse mentions and hashtags
export const parseContent = (content: string) => {
  return content
    .replace(/@(\w+)/g, '<span class="mention" onclick="window.location.href=\'/profile/$1\'">@$1</span>')
    .replace(/#(\w+)/g, '<span class="hashtag" onclick="window.location.href=\'/search?q=%23$1\'">#$1</span>')
}

// Authentication helpers with real Supabase integration
export const signUp = async (email: string, password: string, userData: any) => {
  if (!supabase) throw new Error("Supabase not configured")

  // Real signup with email confirmation
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  if (!supabase) throw new Error("Supabase not configured")

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export const signOut = async () => {
  if (!supabase) throw new Error("Supabase not configured")

  return await supabase.auth.signOut()
}

export const getCurrentUser = async () => {
  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// OTP verification for signup
export const verifyOtp = async (email: string, token: string, type: "signup" | "recovery" = "signup") => {
  if (!supabase) throw new Error("Supabase not configured")

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type,
  })

  return { data, error }
}

// Resend OTP
export const resendOtp = async (email: string, type: "signup" | "recovery" = "signup") => {
  if (!supabase) throw new Error("Supabase not configured")

  const { data, error } = await supabase.auth.resend({
    type,
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  return { data, error }
}

// Get user profile
export const getUserProfile = async (userId: string) => {
  if (!supabase) return null

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  return { data, error }
}

// Create user profile after signup
export const createUserProfile = async (userId: string, profileData: any) => {
  if (!supabase) throw new Error("Supabase not configured")

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      ...profileData,
    })
    .select()
    .single()

  return { data, error }
}

export const uploadFile = async (file: File, bucket: string, path: string) => {
  if (!supabase) throw new Error("Supabase not configured")

  return await supabase.storage.from(bucket).upload(path, file)
}

export const getPublicUrl = (bucket: string, path: string) => {
  if (!supabase) return null

  return supabase.storage.from(bucket).getPublicUrl(path)
}

// Real post creation function
export const createPost = async (content: string, imageUrls?: string[], videoUrl?: string, pollData?: any) => {
  if (!supabase) {
    // Simulate post creation for demo
    const newPost = {
      id: Math.random().toString(36).substring(2),
      content,
      image_urls: imageUrls || null,
      video_url: videoUrl || null,
      poll_id: pollData ? Math.random().toString(36).substring(2) : null,
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      reposts_count: 0,
      profiles: {
        username: "assem",
        full_name: "Assem Sabry",
        title: "AI Engineer",
        avatar_url: "/talk-logo.png",
        verified: true,
      },
    }

    // Add to fallback posts
    fallbackPosts.unshift(newPost)
    return { data: newPost, error: null }
  }

  const user = await getCurrentUser()
  if (!user) throw new Error("User not authenticated")

  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: user.id,
      content,
      image_urls: imageUrls,
      video_url: videoUrl,
      poll_id: pollData?.id,
    })
    .select(`
      *,
      profiles:user_id (
        username,
        full_name,
        avatar_url,
        verified,
        title
      )
    `)
    .single()

  return { data, error }
}

// Real poll creation function
export const createPoll = async (postId: string, pollData: any) => {
  if (!supabase) {
    return { data: { id: Math.random().toString(36).substring(2) }, error: null }
  }

  const expiresAt = pollData.expiresIn ? new Date(Date.now() + pollData.expiresIn * 60 * 60 * 1000).toISOString() : null

  const { data, error } = await supabase
    .from("polls")
    .insert({
      post_id: postId,
      question: pollData.question,
      options: pollData.options.map((text: string, index: number) => ({ text, votes: 0, index })),
      multiple_choice: pollData.multipleChoice,
      expires_at: expiresAt,
    })
    .select()
    .single()

  return { data, error }
}

// Update profile function
export const updateProfile = async (profileData: any) => {
  if (!supabase) {
    return { data: profileData, error: null }
  }

  const user = await getCurrentUser()
  if (!user) throw new Error("User not authenticated")

  const { data, error } = await supabase.from("profiles").update(profileData).eq("id", user.id).select().single()

  return { data, error }
}

// Get posts with real-time updates
export const getPosts = async (limit = 20, offset = 0) => {
  if (!supabase) {
    return { data: fallbackPosts, error: null }
  }

  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles:user_id (
        username,
        full_name,
        avatar_url,
        verified,
        title
      ),
      polls (*)
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  return { data, error }
}
