import { supabase, isSupabaseConfigured } from "./supabase"

// دالة للتحقق من اتصال قاعدة البيانات
export const testDatabaseConnection = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      error: "Supabase not configured. Please check your environment variables.",
    }
  }

  try {
    // اختبار بسيط للاتصال
    const { data, error } = await supabase.from("profiles").select("count").limit(1)

    if (error) {
      return {
        success: false,
        error: `Database connection failed: ${error.message}`,
      }
    }

    return {
      success: true,
      message: "Database connection successful!",
    }
  } catch (error: any) {
    return {
      success: false,
      error: `Connection error: ${error.message}`,
    }
  }
}

// دالة للحصول على إحصائيات قاعدة البيانات
export const getDatabaseStats = async () => {
  if (!supabase) return null

  try {
    const [profilesCount, postsCount, commentsCount] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("posts").select("*", { count: "exact", head: true }),
      supabase.from("comments").select("*", { count: "exact", head: true }),
    ])

    return {
      profiles: profilesCount.count || 0,
      posts: postsCount.count || 0,
      comments: commentsCount.count || 0,
    }
  } catch (error) {
    console.error("Error fetching database stats:", error)
    return null
  }
}

// دالة للتحقق من وجود الجداول المطلوبة
export const checkRequiredTables = async () => {
  if (!supabase) return { success: false, missingTables: [] }

  const requiredTables = ["profiles", "posts", "comments", "saved_posts", "polls"]
  const missingTables: string[] = []

  for (const table of requiredTables) {
    try {
      const { error } = await supabase.from(table).select("*").limit(1)
      if (error && error.message.includes("does not exist")) {
        missingTables.push(table)
      }
    } catch (error) {
      missingTables.push(table)
    }
  }

  return {
    success: missingTables.length === 0,
    missingTables,
  }
}

// دالة لإنشاء منشور جديد
export const createPost = async (userId: string, content: string, imageUrls?: string[]) => {
  if (!supabase) throw new Error("Supabase not configured")

  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: userId,
      content,
      image_urls: imageUrls || null,
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

  if (error) {
    throw error
  }

  return data
}

// دالة للحصول على المنشورات
export const getPosts = async (limit = 20, offset = 0) => {
  if (!supabase) return { data: [], error: null }

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

// دالة للحصول على منشورات مستخدم معين
export const getUserPosts = async (userId: string, limit = 20) => {
  if (!supabase) return { data: [], error: null }

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
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  return { data, error }
}

// دالة للبحث في المنشورات
export const searchPosts = async (query: string, limit = 20) => {
  if (!supabase) return { data: [], error: null }

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
      )
    `)
    .textSearch("content", query)
    .order("created_at", { ascending: false })
    .limit(limit)

  return { data, error }
}
