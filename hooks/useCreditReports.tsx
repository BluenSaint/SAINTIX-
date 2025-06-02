'use client'

import { useState, useEffect } from 'react'
import { creditReports, storage } from '@/lib/database'
import { useAuth } from './useAuth'
import type { CreditReport } from '@/lib/supabase'

export function useCreditReports() {
  const { user } = useAuth()
  const [reports, setReports] = useState<CreditReport[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (user) {
      loadReports()
    } else {
      setReports([])
      setLoading(false)
    }
  }, [user])

  const loadReports = async () => {
    if (!user) return

    try {
      setLoading(true)
      const data = await creditReports.getUserReports(user.id)
      setReports(data)
    } catch (error) {
      console.error('Error loading credit reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadReport = async (file: File, source: string) => {
    if (!user) throw new Error('User not authenticated')

    try {
      setUploading(true)
      
      // Upload file to storage
      const uploadResult = await storage.uploadCreditReport(file, user.id)
      
      // Create database record
      const report = await creditReports.uploadReport(
        user.id,
        uploadResult.publicUrl,
        source
      )
      
      // Add to local state
      setReports(prev => [report, ...prev])
      
      return report
    } catch (error) {
      console.error('Error uploading credit report:', error)
      throw error
    } finally {
      setUploading(false)
    }
  }

  const refreshReports = () => {
    loadReports()
  }

  return {
    reports,
    loading,
    uploading,
    uploadReport,
    refreshReports,
  }
}

