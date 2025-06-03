'use client'

import { useState, useEffect } from 'react'
import { disputeLetters } from '@/lib/database'
import { useAuth } from './useAuth'
import type { DisputeLetter } from '@/lib/supabase'

export function useDisputeLetters() {
  const { user } = useAuth()
  const [disputes, setDisputes] = useState<DisputeLetter[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (user) {
      loadDisputes()
    } else {
      setDisputes([])
      setLoading(false)
    }
  }, [user])

  const loadDisputes = async () => {
    if (!user) return

    try {
      setLoading(true)
      const data = await disputeLetters.getUserDisputes(user.id)
      setDisputes(data)
    } catch (error) {
      console.error('Error loading dispute letters:', error)
    } finally {
      setLoading(false)
    }
  }

  const createDispute = async (
    creditBureau: string,
    type: string,
    content: string,
    generatedBy: 'ai' | 'manual' = 'manual'
  ) => {
    if (!user) throw new Error('User not authenticated')

    try {
      setCreating(true)
      
      const dispute = await disputeLetters.createDispute(
        user.id,
        creditBureau,
        type,
        content,
        generatedBy
      )
      
      // Add to local state
      setDisputes(prev => [dispute, ...prev])
      
      return dispute
    } catch (error) {
      console.error('Error creating dispute letter:', error)
      throw error
    } finally {
      setCreating(false)
    }
  }

  const updateDisputeStatus = async (disputeId: string, status: string) => {
    try {
      const updatedDispute = await disputeLetters.updateStatus(disputeId, status)
      
      // Update local state
      setDisputes(prev =>
        prev.map(dispute =>
          dispute.id === disputeId ? updatedDispute : dispute
        )
      )
      
      return updatedDispute
    } catch (error) {
      console.error('Error updating dispute status:', error)
      throw error
    }
  }

  const refreshDisputes = () => {
    loadDisputes()
  }

  return {
    disputes,
    loading,
    creating,
    createDispute,
    updateDisputeStatus,
    refreshDisputes,
  }
}
