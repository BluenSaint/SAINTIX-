import { safeSupabase } from './supabase'
import type { User, CreditReport, DisputeLetter, Notification, Payment, AILog } from './supabase'

// Frontend-safe database operations
// This file is imported by frontend components and must only use safeSupabase

// Authentication helpers
export const auth = {
  // Sign up new user
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await safeSupabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })
    
    if (error) throw error
    
    // Create user profile
    if (data.user) {
      const { error: profileError } = await safeSupabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          role: 'client'
        })
      
      if (profileError) throw profileError
    }
    
    return data
  },

  // Sign in user
  async signIn(email: string, password: string) {
    const { data, error } = await safeSupabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Sign out user
  async signOut() {
    const { error } = await safeSupabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await safeSupabase.auth.getUser()
    return user
  },

  // Get user profile
  async getUserProfile(userId: string) {
    const { data, error } = await safeSupabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data as User
  }
}

// Credit Reports operations
export const creditReports = {
  // Get user's credit reports
  async getUserReports(userId: string) {
    const { data, error } = await safeSupabase
      .from('credit_reports')
      .select('*')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false })
    
    if (error) throw error
    return data as CreditReport[]
  },

  // Upload new credit report
  async uploadReport(userId: string, fileUrl: string, source: string) {
    const { data, error } = await safeSupabase
      .from('credit_reports')
      .insert({
        user_id: userId,
        file_url: fileUrl,
        source,
        reviewed: false
      })
      .select()
      .single()
    
    if (error) throw error
    return data as CreditReport
  }
}

// Dispute Letters operations
export const disputeLetters = {
  // Get user's dispute letters
  async getUserDisputes(userId: string) {
    const { data, error } = await safeSupabase
      .from('dispute_letters')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as DisputeLetter[]
  },

  // Create new dispute letter
  async createDispute(userId: string, creditBureau: string, type: string, content: string, generatedBy: 'ai' | 'manual' = 'manual') {
    const { data, error } = await safeSupabase
      .from('dispute_letters')
      .insert({
        user_id: userId,
        credit_bureau: creditBureau,
        type,
        content,
        generated_by: generatedBy,
        status: 'draft'
      })
      .select()
      .single()
    
    if (error) throw error
    return data as DisputeLetter
  },

  // Update dispute status
  async updateStatus(disputeId: string, status: string) {
    const { data, error } = await safeSupabase
      .from('dispute_letters')
      .update({ status })
      .eq('id', disputeId)
      .select()
      .single()
    
    if (error) throw error
    return data as DisputeLetter
  }
}

// Notifications operations
export const notifications = {
  // Get user notifications
  async getUserNotifications(userId: string) {
    const { data, error } = await safeSupabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Notification[]
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    const { data, error } = await safeSupabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single()
    
    if (error) throw error
    return data as Notification
  }
}

// Payments operations
export const payments = {
  // Get user payments
  async getUserPayments(userId: string) {
    const { data, error } = await safeSupabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
    
    if (error) throw error
    return data as Payment[]
  }
}

// AI Logs operations
export const aiLogs = {
  // Log AI interaction
  async logInteraction(userId: string, intent: string, inputData: any, response: any) {
    const { data, error } = await safeSupabase
      .from('ai_logs')
      .insert({
        user_id: userId,
        intent,
        input_data: inputData,
        response
      })
      .select()
      .single()
    
    if (error) throw error
    return data as AILog
  },

  // Get user AI logs
  async getUserLogs(userId: string) {
    const { data, error } = await safeSupabase
      .from('ai_logs')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
    
    if (error) throw error
    return data as AILog[]
  }
}

// Activity logging
export const activityLog = {
  // Log user activity
  async logActivity(userId: string, activityType: string, description?: string, metadata?: any) {
    const { data, error } = await safeSupabase
      .from('client_activity_log')
      .insert({
        user_id: userId,
        activity_type: activityType,
        description,
        metadata
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Frontend-safe admin operations (limited to what clients can see)
export const admin = {
  // Get basic user info (for client's own profile)
  async getUserInfo(userId: string) {
    const { data, error } = await safeSupabase
      .from('users')
      .select('id, full_name, email, role, created_at')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data as User
  },

  // Get user's own credit reports with basic info
  async getUserCreditReports(userId: string) {
    const { data, error } = await safeSupabase
      .from('credit_reports')
      .select('id, file_url, source, reviewed, uploaded_at')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get user's own dispute letters with basic info
  async getUserDisputeLetters(userId: string) {
    const { data, error } = await safeSupabase
      .from('dispute_letters')
      .select('id, credit_bureau, type, status, generated_by, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Health check for frontend
export const healthCheck = {
  // Check if database connection is working
  async checkConnection(): Promise<boolean> {
    try {
      const { error } = await safeSupabase
        .from('users')
        .select('count')
        .limit(1)
      
      return !error
    } catch (error) {
      console.error('Database health check failed:', error)
      return false
    }
  }
}

