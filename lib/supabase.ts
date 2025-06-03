import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Environment validation and configuration
interface SupabaseConfig {
  url: string
  anonKey: string
  serviceKey?: string
  isProduction: boolean
}

function validateAndGetConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const isProduction = process.env.NODE_ENV === 'production'

  // Critical validation - these are always required
  if (!url) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is required. Please check your environment variables.'
    )
  }

  if (!anonKey) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Please check your environment variables.'
    )
  }

  // Production-specific validation
  if (isProduction && !serviceKey) {
    console.error('❌ PRODUCTION BUILD ERROR: SUPABASE_SERVICE_ROLE_KEY is required in production')
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is required for production builds. Please add this environment variable to your Vercel project.'
    )
  }

  // Development warnings
  if (!isProduction && !serviceKey) {
    console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not found - admin operations will use anon key')
  }

  return {
    url,
    anonKey,
    serviceKey,
    isProduction
  }
}

// Get validated configuration
const config = validateAndGetConfig()

// Create main client with environment-aware key selection
function createMainClient(): SupabaseClient {
  const key = config.isProduction && config.serviceKey 
    ? config.serviceKey 
    : config.anonKey

  console.log(`🔗 Supabase client initialized for ${config.isProduction ? 'production' : 'development'} environment`)

  return createClient(config.url, key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

// Create admin client with service role key
function createAdminClient(): SupabaseClient {
  if (!config.serviceKey) {
    console.warn('⚠️  Admin client fallback: using main client (service key not available)')
    return supabase
  }

  return createClient(config.url, config.serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Export main clients
export const supabase = createMainClient()
export const supabaseAdmin = createAdminClient()

// Environment info for debugging
export const supabaseConfig = {
  url: config.url,
  hasServiceKey: !!config.serviceKey,
  isProduction: config.isProduction,
  environment: process.env.NODE_ENV || 'development'
}

// Client factory for API routes (with enhanced error handling)
export function createApiClient(): SupabaseClient {
  try {
    const key = config.isProduction && config.serviceKey 
      ? config.serviceKey 
      : config.anonKey

    return createClient(config.url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  } catch (error) {
    console.error('❌ Failed to create API client:', error)
    throw new Error('Supabase API client initialization failed. Check environment variables.')
  }
}

// Health check function
export async function checkSupabaseConnection(): Promise<boolean> {
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

