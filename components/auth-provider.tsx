"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase"
import Loading from "@/app/loading"

interface AuthContextType {
  user: any | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        // Redirect logic
        const isAuthPage = pathname.startsWith("/auth")

        if (!currentUser && !isAuthPage) {
          router.push("/auth")
        } else if (currentUser && isAuthPage) {
          router.push("/")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        if (!pathname.startsWith("/auth")) {
          router.push("/auth")
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  if (loading) {
    return <Loading />
  }

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}
