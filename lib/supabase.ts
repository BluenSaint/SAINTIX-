import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Environment validation for frontend-safe configuration
interface SupabaseConfig {
  url: string
  anonKey: string
  isProduction: boolean
}

// Enhanced error handling for missing environment variables
function validateAndGetConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const isProduction = process.env.NODE_ENV === 'production'

  // Critical validation - these are always required for frontend
  if (!url) {
    const errorMsg = 'NEXT_PUBLIC_SUPABASE_URL is missing. Please check your environment variables.'
    console.error('❌ Supabase Configuration Error:', errorMsg)
    
    if (isProduction) {
      // In production, this is a critical error
      throw new Error(`Production Error: ${errorMsg}`)
    } else {
      // In development, provide helpful guidance
      console.warn('🔧 Development Setup Required:')
      console.warn('1. Copy .env.local.example to .env.local')
      console.warn('2. Add your Supabase URL to NEXT_PUBLIC_SUPABASE_URL')
      console.warn('3. Restart your development server')
      throw new Error(`Development Error: ${errorMsg}`)
    }
  }

  if (!anonKey) {
    const errorMsg = 'NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Please check your environment variables.'
    console.error('❌ Supabase Configuration Error:', errorMsg)
    
    if (isProduction) {
      throw new Error(`Production Error: ${errorMsg}`)
    } else {
      console.warn('🔧 Development Setup Required:')
      console.warn('1. Copy .env.local.example to .env.local')
      console.warn('2. Add your Supabase anon key to NEXT_PUBLIC_SUPABASE_ANON_KEY')
      console.warn('3. Restart your development server')
      throw new Error(`Development Error: ${errorMsg}`)
    }
  }

  // Validate URL format
  try {
    new URL(url)
  } catch {
    const errorMsg = `Invalid NEXT_PUBLIC_SUPABASE_URL format: ${url}`
    console.error('❌ Supabase URL Error:', errorMsg)
    throw new Error(errorMsg)
  }

  // Validate key format (basic check)
  if (anonKey.length < 100) {
    const errorMsg = 'NEXT_PUBLIC_SUPABASE_ANON_KEY appears to be invalid (too short)'
    console.error('❌ Supabase Key Error:', errorMsg)
    throw new Error(errorMsg)
  }

  return {
    url,
    anonKey,
    isProduction
  }
}

// Safe configuration getter with error handling
function getConfigSafely(): SupabaseConfig | null {
  try {
    return validateAndGetConfig()
  } catch (error) {
    console.error('Supabase configuration error:', error)
    
    // In production, we want to fail fast
    if (process.env.NODE_ENV === 'production') {
      throw error
    }
    
    // In development, return null to use fallback
    return null
  }
}

// Create main client with enhanced error handling
function createMainClient(): SupabaseClient | null {
  const config = getConfigSafely()
  
  if (!config) {
    console.error('❌ Failed to create Supabase client - configuration invalid')
    return null
  }

  try {
    console.log(`🔗 Supabase client initialized for ${config.isProduction ? 'production' : 'development'} environment`)
    console.log(`📍 URL: ${config.url}`)
    console.log(`🔑 Key: ${config.anonKey.substring(0, 20)}...`)

    const client = createClient(config.url, config.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      },
      global: {
        headers: {
          'X-Client-Info': 'saintrix-frontend'
        }
      }
    })

    // Test the client connection
    client.from('users').select('count').limit(1).then(({ error }) => {
      if (error) {
        console.warn('⚠️ Supabase connection test failed:', error.message)
      } else {
        console.log('✅ Supabase connection verified')
      }
    }).catch((error) => {
      console.warn('⚠️ Supabase connection test error:', error)
    })

    return client
  } catch (error) {
    console.error('❌ Failed to create Supabase client:', error)
    
    // In production, throw the error to fail fast
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Supabase client creation failed: ${error}`)
    }
    
    return null
  }
}

// Export main client with null safety
export const supabase = createMainClient()

// Fallback client for when main client fails
const fallbackClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null })
  },
  from: () => ({
    select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }) }),
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    update: () => ({ eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
    delete: () => ({ eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) })
  }),
  rpc: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
      createSignedUrl: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      list: () => Promise.resolve({ data: [], error: null }),
      remove: () => Promise.resolve({ data: null, error: null })
    })
  }
}

// Safe client that always returns something
export const safeSupabase = supabase || fallbackClient

// Environment info for debugging (frontend-safe)
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'not-configured',
  hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  isProduction: process.env.NODE_ENV === 'production',
  environment: process.env.NODE_ENV || 'development',
  clientInitialized: !!supabase
}

// Health check function with error handling
export async function checkSupabaseConnection(): Promise<boolean> {
  if (!supabase) {
    console.warn('⚠️ Supabase client not initialized')
    return false
  }

  try {
    const { data, error } = await supabase.from('users').select('count').limit(1)
    if (error) {
      console.error('❌ Supabase connection failed:', error.message)
      return false
    }
    console.log('✅ Supabase connection verified')
    return true
  } catch (error) {
    console.error('❌ Supabase health check failed:', error)
    return false
  }
}

// Database types (to be expanded as needed)
export interface User {
  id: string
  full_name?: string
  email: string
  role: 'client' | 'admin'
  created_at: string
}

export interface CreditReport {
  id: string
  user_id: string
  file_url: string
  source: string
  reviewed: boolean
  uploaded_at: string
  users?: User
}

export interface DisputeLetter {
  id: string
  user_id: string
  credit_bureau: string
  type: string
  status: string
  generated_by: 'ai' | 'manual'
  content: string
  created_at: string
  users?: User
}

export interface AILog {
  id: string
  user_id: string
  intent: string
  input_data: any
  response: any
  timestamp: string
}

export interface Notification {
  id: string
  user_id: string
  message: string
  read: boolean
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  stripe_id: string
  plan: string
  status: string
  started_at: string
}

export interface AdminNote {
  id: string
  user_id: string
  admin_id: string
  note: string
  category: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  created_at: string
  updated_at: string
}

export interface ClientActivityLog {
  id: string
  user_id: string
  activity_type: string
  description?: string
  metadata?: any
  ip_address?: string
  user_agent?: string
  created_at: string
}

