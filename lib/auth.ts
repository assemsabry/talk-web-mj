"use client"

import { supabase, isSupabaseConfigured } from "./supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

// Hook للتحقق من حالة المصادقة
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

    // الحصول على المستخدم الحالي
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Error getting user:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // الاستماع لتغييرات المصادقة
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      if (event === "SIGNED_IN") {
        router.refresh()
      } else if (event === "SIGNED_OUT") {
        router.push("/auth")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return { user, loading }
}

// دالة لتسجيل الخروج
export const logout = async () => {
  if (!supabase) return

  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}

// دالة للتحقق من وجود مستخدم مسجل
export const requireAuth = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  return { user, loading }
}

// دالة للحصول على بروفايل المستخدم
export const getUserProfile = async (userId: string) => {
  if (!supabase) return null

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }

  return data
}

// دالة لتحديث بروفايل المستخدم
export const updateUserProfile = async (userId: string, updates: any) => {
  if (!supabase) throw new Error("Supabase not configured")

  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) {
    throw error
  }

  return data
}
