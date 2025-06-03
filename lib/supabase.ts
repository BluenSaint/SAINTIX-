import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

// Environment-aware client configuration
const supabaseKey = process.env.NODE_ENV === 'production'
  ? process.env.SUPABASE_SERVICE_ROLE_KEY!
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseKey) {
  throw new Error(`Missing Supabase key for ${process.env.NODE_ENV} environment`)
}

// Main Supabase client with environment-aware key selection
export const supabase = createClient(supabaseUrl, supabaseKey)

// For admin operations, create a separate client with service role key when available
function createAdminClient() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseServiceKey) {
    // In development or when service key is not available, return the main client
    console.warn('SUPABASE_SERVICE_ROLE_KEY not available - using main client for admin operations')
    return supabase
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export const supabaseAdmin = createAdminClient()

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
