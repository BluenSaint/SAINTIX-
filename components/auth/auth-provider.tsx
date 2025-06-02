"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "client" | "team_member"
  permissions: string[]
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Mock authentication - replace with real authentication
  const mockUsers = {
    "admin@saintrix.com": {
      id: "1",
      email: "admin@saintrix.com",
      name: "Admin User",
      role: "admin" as const,
      permissions: ["*"], // All permissions
    },
    "client@example.com": {
      id: "2",
      email: "client@example.com",
      name: "Sarah Johnson",
      role: "client" as const,
      permissions: ["view_own_data", "upload_documents", "view_reports"],
    },
    "team@saintrix.com": {
      id: "3",
      email: "team@saintrix.com",
      name: "Team Member",
      role: "team_member" as const,
      permissions: ["view_clients", "manage_disputes", "view_analytics"],
    },
  }

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("saintrix_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication logic
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    const mockUser = mockUsers[email as keyof typeof mockUsers]
    if (mockUser && password === "password") {
      setUser(mockUser)
      localStorage.setItem("saintrix_user", JSON.stringify(mockUser))

      // Redirect based on role
      switch (mockUser.role) {
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

      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("saintrix_user")
    router.push("/login")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes("*") || user.permissions.includes(permission)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
