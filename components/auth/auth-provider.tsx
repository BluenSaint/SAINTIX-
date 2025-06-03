'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { auth } from '@/lib/database'
import type { User as UserProfile } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setUserProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await auth.getUserProfile(userId)
      setUserProfile(profile)
      
      // Redirect based on role after successful profile load
      if (profile.role === 'admin') {
        router.push('/admin')
      } else if (profile.role === 'client') {
        router.push('/client-portal')
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { user } = await auth.signIn(email, password)
      if (user) {
        await loadUserProfile(user.id)
      }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true)
    try {
      await auth.signUp(email, password, fullName)
      // User will need to verify email before they can sign in
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signOut = async () => {
    await auth.signOut()
    setUser(null)
    setUserProfile(null)
    router.push('/login')
  }

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!userProfile) return false
    
    // Admin has all permissions
    if (userProfile.role === 'admin') return true
    
    // Define role-based permissions
    const rolePermissions = {
      client: ['view_own_data', 'upload_documents', 'view_reports', 'create_disputes'],
      team_member: ['view_clients', 'manage_disputes', 'view_analytics'],
      admin: ['*'] // All permissions
    }
    
    const userPermissions = rolePermissions[userProfile.role] || []
    return userPermissions.includes('*') || userPermissions.includes(permission)
  }

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    hasPermission,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
