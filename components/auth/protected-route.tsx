"use client"

import type React from "react"

import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "client" | "team_member"
  requiredPermission?: string
}

export function ProtectedRoute({ children, requiredRole, requiredPermission }: ProtectedRouteProps) {
  const { user, userProfile, loading, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user && userProfile && requiredRole && userProfile.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user role
      switch (userProfile.role) {
        case "admin":
          router.push("/admin")
          break
        case "client":
          router.push("/client-portal")
          break
        case "team_member":
          router.push("/admin")
          break
        default:
          router.push("/")
      }
      return
    }

    if (user && userProfile && requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/unauthorized")
      return
    }
  }, [user, userProfile, loading, requiredRole, requiredPermission, router, hasPermission])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !userProfile) {
    return null
  }

  return <>{children}</>
}
