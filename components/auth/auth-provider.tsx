'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { safeSupabase } from '@/lib/supabase'
import { auth } from '@/lib/database'
import type { User as UserProfile } from '@/lib/supabase'
import ErrorBoundary from '@/components/ErrorBoundary'

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
    // Get initial session with error handling
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await safeSupabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }
        
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadUserProfile(session.user.id)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes with error handling
    try {
      const {
        data: { subscription },
      } = safeSupabase.auth.onAuthStateChange(async (event, session) => {
        try {
          setUser(session?.user ?? null)
          if (session?.user) {
            await loadUserProfile(session.user.id)
          } else {
            setUserProfile(null)
            setLoading(false)
          }
        } catch (error) {
          console.error('Error in auth state change:', error)
          setLoading(false)
        }
      })

      return () => subscription.unsubscribe()
    } catch (error) {
      console.error('Error setting up auth listener:', error)
      setLoading(false)
    }
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await auth.getUserProfile(userId)
      setUserProfile(profile)
      
      // Note: Removed automatic redirection to prevent navigation issues
      // Components can handle navigation based on user role as needed
    } catch (error) {
      console.error('Error loading user profile:', error)
      // Don't throw error, just log it and continue
      setUserProfile(null)
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

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </ErrorBoundary>
  )
}

// Safe AuthProvider wrapper that handles initialization errors
export function SafeAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={({ error, resetError }) => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-6">
            There was a problem initializing the authentication system. This may be due to configuration issues.
          </p>
          <div className="space-y-3">
            <button 
              onClick={resetError}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    )}>
      <AuthProvider>{children}</AuthProvider>
    </ErrorBoundary>
  )
}

export function useAuth() {
  try {
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
  } catch (error) {
    console.error('Error in useAuth hook:', error)
    // Return safe defaults to prevent crashes
    return {
      user: null,
      userProfile: null,
      loading: false,
      signIn: async () => { throw new Error('Authentication not available') },
      signUp: async () => { throw new Error('Authentication not available') },
      signOut: async () => { throw new Error('Authentication not available') },
      refreshProfile: async () => {},
      hasPermission: () => false,
    }
  }
}
