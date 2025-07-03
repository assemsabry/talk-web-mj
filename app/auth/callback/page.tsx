"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Loading from "@/app/loading"
import { useToast } from "@/hooks/use-toast"

export default function AuthCallback() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!supabase) {
        router.push("/auth")
        return
      }

      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (data.session) {
          toast({
            title: "Welcome to Talk!",
            description: "Your account has been verified successfully.",
          })
          router.push("/")
        } else {
          router.push("/auth")
        }
      } catch (error: any) {
        toast({
          title: "Authentication Error",
          description: error.message || "Something went wrong during authentication.",
          variant: "destructive",
        })
        router.push("/auth")
      }
    }

    handleAuthCallback()
  }, [router, toast])

  return <Loading />
}
