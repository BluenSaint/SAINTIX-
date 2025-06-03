import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, CreditReport, DisputeLetter, Notification, Payment, AILog } from '@/lib/supabase'

export interface DashboardData {
  user: User | null
  creditReports: CreditReport[]
  disputeLetters: DisputeLetter[]
  notifications: Notification[]
  payments: Payment[]
  aiLogs: AILog[]
  loading: boolean
  error: string | null
}

export function useClientDashboard() {
  const [data, setData] = useState<DashboardData>({
    user: null,
    creditReports: [],
    disputeLetters: [],
    notifications: [],
    payments: [],
    aiLogs: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) throw new Error('No authenticated user')

      // Fetch user profile
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError

      // Fetch credit reports
      const { data: creditReports, error: reportsError } = await supabase
        .from('credit_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false })

      if (reportsError) throw reportsError

      // Fetch dispute letters
      const { data: disputeLetters, error: disputesError } = await supabase
        .from('dispute_letters')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (disputesError) throw disputesError

      // Fetch notifications
      const { data: notifications, error: notificationsError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (notificationsError) throw notificationsError

      // Fetch payments
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })

      if (paymentsError) throw paymentsError

      // Fetch AI logs
      const { data: aiLogs, error: aiLogsError } = await supabase
        .from('ai_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(5)

      if (aiLogsError) throw aiLogsError

      setData({
        user: userProfile,
        creditReports: creditReports || [],
        disputeLetters: disputeLetters || [],
        notifications: notifications || [],
        payments: payments || [],
        aiLogs: aiLogs || [],
        loading: false,
        error: null
      })

    } catch (error) {
      console.error('Dashboard data fetch error:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load dashboard data'
      }))
    }
  }

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)

      if (error) throw error

      // Update local state
      setData(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      }))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const refreshData = () => {
    fetchDashboardData()
  }

  return {
    ...data,
    markNotificationAsRead,
    refreshData
  }
}

// Hook for admin dashboard
export function useAdminDashboard() {
  const [data, setData] = useState({
    users: [],
    allCreditReports: [],
    allDisputeLetters: [],
    allNotifications: [],
    allPayments: [],
    allAiLogs: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }))

      // Check if user is admin
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) throw new Error('No authenticated user')

      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError
      if (userProfile.role !== 'admin') throw new Error('Access denied: Admin role required')

      // Fetch all data for admin view
      const [usersResult, reportsResult, disputesResult, notificationsResult, paymentsResult, aiLogsResult] = await Promise.all([
        supabase.from('users').select('*').order('created_at', { ascending: false }),
        supabase.from('credit_reports').select('*, users(full_name, email)').order('uploaded_at', { ascending: false }),
        supabase.from('dispute_letters').select('*, users(full_name, email)').order('created_at', { ascending: false }),
        supabase.from('notifications').select('*, users(full_name, email)').order('created_at', { ascending: false }),
        supabase.from('payments').select('*, users(full_name, email)').order('started_at', { ascending: false }),
        supabase.from('ai_logs').select('*, users(full_name, email)').order('timestamp', { ascending: false })
      ])

      setData({
        users: usersResult.data || [],
        allCreditReports: reportsResult.data || [],
        allDisputeLetters: disputesResult.data || [],
        allNotifications: notificationsResult.data || [],
        allPayments: paymentsResult.data || [],
        allAiLogs: aiLogsResult.data || [],
        loading: false,
        error: null
      })

    } catch (error) {
      console.error('Admin dashboard data fetch error:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load admin data'
      }))
    }
  }

  return {
    ...data,
    refreshData: fetchAdminData
  }
}
