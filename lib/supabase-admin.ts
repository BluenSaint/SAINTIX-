import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Backend-only Supabase client configuration
// This file should NEVER be imported by frontend components

interface SupabaseAdminConfig {
  url: string
  serviceKey: string
  isProduction: boolean
}

function validateAdminConfig(): SupabaseAdminConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const isProduction = process.env.NODE_ENV === 'production'

  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required for admin client')
  }

  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin client')
  }

  return {
    url,
    serviceKey,
    isProduction
  }
}

// Create admin client with service role key (backend only)
function createAdminClient(): SupabaseClient {
  const config = validateAdminConfig()
  
  return createClient(config.url, config.serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Export admin client for API routes only
export const supabaseAdmin = createAdminClient()

// Client factory for API routes with enhanced error handling
export function createApiClient(): SupabaseClient {
  try {
    const config = validateAdminConfig()
    
    return createClient(config.url, config.serviceKey, {
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

