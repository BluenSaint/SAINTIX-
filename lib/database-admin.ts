import { supabaseAdmin } from './supabase-admin'
import type { User, CreditReport, DisputeLetter, Notification, Payment } from './supabase'

// Backend-only database operations using admin client
// This file should ONLY be imported by API routes, never by frontend components

// Admin-only operations
export const adminOperations = {
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
  },

  // Mark report as reviewed (admin only)
  async markReportAsReviewed(reportId: string) {
    const { data, error } = await supabaseAdmin
      .from('credit_reports')
      .update({ reviewed: true })
      .eq('id', reportId)
      .select()
      .single()
    
    if (error) throw error
    return data as CreditReport
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
  },

  // Update user role (admin only)
  async updateUserRole(userId: string, role: 'client' | 'admin') {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ role })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  // Delete user (admin only)
  async deleteUser(userId: string) {
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId)
    
    if (error) throw error
  },

  // Get dashboard stats (admin only)
  async getDashboardStats() {
    const [usersResult, reportsResult, disputesResult, paymentsResult] = await Promise.all([
      supabaseAdmin.from('users').select('count'),
      supabaseAdmin.from('credit_reports').select('count'),
      supabaseAdmin.from('dispute_letters').select('count'),
      supabaseAdmin.from('payments').select('count')
    ])

    return {
      totalUsers: usersResult.count || 0,
      totalReports: reportsResult.count || 0,
      totalDisputes: disputesResult.count || 0,
      totalPayments: paymentsResult.count || 0
    }
  }
}

