import { safeSupabase } from './supabase'
import { supabaseAdmin } from './supabase-admin'
import type { User, CreditReport, DisputeLetter, Notification, Payment, AILog } from './supabase'

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
      const { error: profileError } = await supabase
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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from('credit_reports')
      .select('*')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false })
    
    if (error) throw error
    return data as CreditReport[]
  },

  // Upload new credit report
  async uploadReport(userId: string, fileUrl: string, source: string) {
    const { data, error } = await supabase
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
  },

  // Mark report as reviewed (admin only)
  async markAsReviewed(reportId: string) {
    const { data, error } = await supabaseAdmin
      .from('credit_reports')
      .update({ reviewed: true })
      .eq('id', reportId)
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
    const { data, error } = await supabase
      .from('dispute_letters')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as DisputeLetter[]
  },

  // Create new dispute letter
  async createDispute(userId: string, creditBureau: string, type: string, content: string, generatedBy: 'ai' | 'manual' = 'manual') {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Notification[]
  },

  // Create notification (admin only)
  async createNotification(userId: string, message: string) {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: userId,
        message,
        read: false
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Notification
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
    
    if (error) throw error
    return data as Payment[]
  },

  // Create payment record (admin only)
  async createPayment(userId: string, stripeId: string, plan: string, status: string) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .insert({
        user_id: userId,
        stripe_id: stripeId,
        plan,
        status
      })
      .select()
      .single()
    
    if (error) throw error
    return data as Payment
  }
}

// AI Logs operations
export const aiLogs = {
  // Log AI interaction
  async logInteraction(userId: string, intent: string, inputData: any, response: any) {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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

// Admin operations
export const admin = {
  // Get all users (admin only)
  async getAllUsers() {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as User[]
  },

  // Get all credit reports (admin only)
  async getAllCreditReports() {
    const { data, error } = await supabaseAdmin
      .from('credit_reports')
      .select(`
        *,
        users (
          full_name,
          email
        )
      `)
      .order('uploaded_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get all dispute letters (admin only)
  async getAllDisputeLetters() {
    const { data, error } = await supabaseAdmin
      .from('dispute_letters')
      .select(`
        *,
        users (
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}
