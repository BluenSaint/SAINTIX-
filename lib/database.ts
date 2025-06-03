import { safeSupabase } from './supabase'
import { EncryptionService, encryptSensitiveFields, decryptSensitiveFields } from './encryption'
import type { User, CreditReport, DisputeLetter, Notification, Payment, AILog } from './supabase'

// Frontend-safe database operations with encryption
// This file is imported by frontend components and must only use safeSupabase

// Authentication helpers
export const auth = {
  // Sign up new user with encrypted sensitive data
  async signUp(email: string, password: string, fullName: string, sensitiveData?: {
    ssn?: string
    dateOfBirth?: string
    phoneNumber?: string
  }) {
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
    
    // Create user profile with encrypted sensitive data
    if (data.user) {
      const profileData: any = {
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName,
        role: 'client'
      }

      // Encrypt sensitive fields if provided
      if (sensitiveData) {
        if (sensitiveData.ssn) {
          profileData.encrypted_ssn = EncryptionService.encryptSSN(sensitiveData.ssn)
        }
        if (sensitiveData.dateOfBirth) {
          profileData.encrypted_dob = EncryptionService.encrypt(sensitiveData.dateOfBirth)
        }
        if (sensitiveData.phoneNumber) {
          profileData.encrypted_phone = EncryptionService.encrypt(sensitiveData.phoneNumber)
        }
      }

      const { error: profileError } = await safeSupabase
        .from('users')
        .insert(profileData)
      
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

  // Get user profile with decrypted sensitive data
  async getUserProfile(userId: string) {
    const { data, error } = await safeSupabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    
    // Decrypt sensitive fields for frontend use
    const decryptedProfile = decryptSensitiveFields(data)
    return decryptedProfile as User
  }
}

// Credit Reports operations with encryption
export const creditReports = {
  // Get user's credit reports with decrypted data
  async getUserReports(userId: string) {
    const { data, error } = await safeSupabase
      .from('credit_reports')
      .select('*')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false })
    
    if (error) throw error
    
    // Decrypt sensitive fields in each report
    const decryptedReports = data.map(report => decryptSensitiveFields(report))
    return decryptedReports as CreditReport[]
  },

  // Upload new credit report with encryption
  async uploadReport(
    userId: string, 
    fileUrl: string, 
    source: string, 
    creditData?: {
      creditScore?: number
      accounts?: any[]
      personalInfo?: any
    }
  ) {
    const reportData: any = {
      user_id: userId,
      file_url: fileUrl,
      source,
      reviewed: false
    }

    // Encrypt sensitive credit data if provided
    if (creditData) {
      if (creditData.creditScore) {
        reportData.encrypted_credit_score = EncryptionService.encryptCreditScore(creditData.creditScore)
      }
      if (creditData.accounts) {
        // Encrypt account numbers in accounts array
        const encryptedAccounts = creditData.accounts.map(account => ({
          ...account,
          accountNumber: account.accountNumber 
            ? EncryptionService.encryptAccountNumber(account.accountNumber)
            : undefined
        }))
        reportData.encrypted_accounts = EncryptionService.encrypt(JSON.stringify(encryptedAccounts))
      }
      if (creditData.personalInfo) {
        reportData.encrypted_personal_info = EncryptionService.encrypt(JSON.stringify(creditData.personalInfo))
      }
    }

    const { data, error } = await safeSupabase
      .from('credit_reports')
      .insert(reportData)
      .select()
      .single()
    
    if (error) throw error
    
    // Return decrypted data for frontend use
    return decryptSensitiveFields(data) as CreditReport
  }
}

// Dispute Letters operations with encryption
export const disputeLetters = {
  // Get user's dispute letters with decrypted content
  async getUserDisputes(userId: string) {
    const { data, error } = await safeSupabase
      .from('dispute_letters')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Decrypt sensitive content in each dispute
    const decryptedDisputes = data.map(dispute => decryptSensitiveFields(dispute))
    return decryptedDisputes as DisputeLetter[]
  },

  // Create new dispute letter with encrypted content
  async createDispute(
    userId: string, 
    creditBureau: string, 
    type: string, 
    content: string, 
    generatedBy: 'ai' | 'manual' = 'manual',
    sensitiveInfo?: {
      accountNumbers?: string[]
      personalDetails?: any
    }
  ) {
    const disputeData: any = {
      user_id: userId,
      credit_bureau: creditBureau,
      type,
      encrypted_content: EncryptionService.encryptDisputeContent(content),
      generated_by: generatedBy,
      status: 'draft'
    }

    // Encrypt additional sensitive information
    if (sensitiveInfo) {
      if (sensitiveInfo.accountNumbers) {
        const encryptedAccountNumbers = sensitiveInfo.accountNumbers.map(num => 
          EncryptionService.encryptAccountNumber(num)
        )
        disputeData.encrypted_account_numbers = EncryptionService.encrypt(JSON.stringify(encryptedAccountNumbers))
      }
      if (sensitiveInfo.personalDetails) {
        disputeData.encrypted_personal_details = EncryptionService.encrypt(JSON.stringify(sensitiveInfo.personalDetails))
      }
    }

    const { data, error } = await safeSupabase
      .from('dispute_letters')
      .insert(disputeData)
      .select()
      .single()
    
    if (error) throw error
    
    // Return decrypted data for frontend use
    return decryptSensitiveFields(data) as DisputeLetter
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
    
    // Return decrypted data for frontend use
    return decryptSensitiveFields(data) as DisputeLetter
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

// Payments operations with encryption
export const payments = {
  // Get user payments
  async getUserPayments(userId: string) {
    const { data, error } = await safeSupabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
    
    if (error) throw error
    
    // Decrypt sensitive payment data
    const decryptedPayments = data.map(payment => decryptSensitiveFields(payment))
    return decryptedPayments as Payment[]
  },

  // Create payment record with encrypted sensitive data
  async createPayment(
    userId: string,
    amount: number,
    currency: string,
    paymentMethod: string,
    sensitivePaymentData?: {
      cardLast4?: string
      bankAccount?: string
      paymentToken?: string
    }
  ) {
    const paymentData: any = {
      user_id: userId,
      amount,
      currency,
      payment_method: paymentMethod,
      status: 'pending'
    }

    // Encrypt sensitive payment information
    if (sensitivePaymentData) {
      if (sensitivePaymentData.cardLast4) {
        paymentData.encrypted_card_info = EncryptionService.encrypt(sensitivePaymentData.cardLast4)
      }
      if (sensitivePaymentData.bankAccount) {
        paymentData.encrypted_bank_info = EncryptionService.encrypt(sensitivePaymentData.bankAccount)
      }
      if (sensitivePaymentData.paymentToken) {
        paymentData.encrypted_payment_token = EncryptionService.encrypt(sensitivePaymentData.paymentToken)
      }
    }

    const { data, error } = await safeSupabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single()
    
    if (error) throw error
    
    // Return decrypted data for frontend use
    return decryptSensitiveFields(data) as Payment
  }
}

// AI Logs operations with encryption
export const aiLogs = {
  // Log AI interaction with encrypted sensitive data
  async logInteraction(userId: string, intent: string, inputData: any, response: any) {
    const logData: any = {
      user_id: userId,
      intent,
      input_data: inputData,
      response
    }

    // Encrypt sensitive data in AI logs
    if (inputData && typeof inputData === 'object') {
      const encryptedInputData = encryptSensitiveFields(inputData)
      logData.encrypted_input_data = EncryptionService.encrypt(JSON.stringify(encryptedInputData))
    }

    if (response && typeof response === 'object') {
      const encryptedResponse = encryptSensitiveFields(response)
      logData.encrypted_response = EncryptionService.encrypt(JSON.stringify(encryptedResponse))
    }

    const { data, error } = await safeSupabase
      .from('ai_logs')
      .insert(logData)
      .select()
      .single()
    
    if (error) throw error
    
    // Return decrypted data for frontend use
    return decryptSensitiveFields(data) as AILog
  },

  // Get user AI logs with decrypted data
  async getUserLogs(userId: string) {
    const { data, error } = await safeSupabase
      .from('ai_logs')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
    
    if (error) throw error
    
    // Decrypt sensitive data in logs
    const decryptedLogs = data.map(log => decryptSensitiveFields(log))
    return decryptedLogs as AILog[]
  }
}

// Activity logging with encryption
export const activityLog = {
  // Log user activity with encrypted metadata
  async logActivity(userId: string, activityType: string, description?: string, metadata?: any) {
    const activityData: any = {
      user_id: userId,
      activity_type: activityType,
      description
    }

    // Encrypt sensitive metadata
    if (metadata && typeof metadata === 'object') {
      const encryptedMetadata = encryptSensitiveFields(metadata)
      activityData.encrypted_metadata = EncryptionService.encrypt(JSON.stringify(encryptedMetadata))
      activityData.metadata = metadata // Keep non-sensitive metadata unencrypted for queries
    }

    const { data, error } = await safeSupabase
      .from('client_activity_log')
      .insert(activityData)
      .select()
      .single()
    
    if (error) throw error
    
    // Return decrypted data
    return decryptSensitiveFields(data)
  }
}

// Frontend-safe admin operations with encryption
export const admin = {
  // Get basic user info with decrypted sensitive fields
  async getUserInfo(userId: string) {
    const { data, error } = await safeSupabase
      .from('users')
      .select('id, full_name, email, role, created_at, encrypted_ssn, encrypted_phone, encrypted_dob')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    
    // Decrypt sensitive fields for display (masked)
    const userInfo = { ...data }
    if (data.encrypted_ssn) {
      try {
        const decryptedSSN = EncryptionService.decryptSSN(data.encrypted_ssn)
        userInfo.ssn_masked = EncryptionService.maskSSN(decryptedSSN)
      } catch (error) {
        console.error('Error decrypting SSN:', error)
        userInfo.ssn_masked = 'XXX-XX-XXXX'
      }
    }
    
    return userInfo as User
  },

  // Get user's own credit reports with basic info
  async getUserCreditReports(userId: string) {
    const { data, error } = await safeSupabase
      .from('credit_reports')
      .select('id, file_url, source, reviewed, uploaded_at, encrypted_credit_score')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false })
    
    if (error) throw error
    
    // Decrypt and mask credit scores for display
    const reportsWithMaskedData = data.map(report => {
      const maskedReport = { ...report }
      if (report.encrypted_credit_score) {
        try {
          const decryptedScore = EncryptionService.decryptCreditScore(report.encrypted_credit_score)
          maskedReport.credit_score_display = EncryptionService.maskCreditScore(decryptedScore)
        } catch (error) {
          console.error('Error decrypting credit score:', error)
          maskedReport.credit_score_display = 'N/A'
        }
      }
      return maskedReport
    })
    
    return reportsWithMaskedData
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
  },

  // Check encryption service health
  async checkEncryption(): Promise<boolean> {
    try {
      // Test encryption/decryption with sample data
      const testData = 'test-encryption-data'
      const encrypted = EncryptionService.encrypt(testData)
      const decrypted = EncryptionService.decrypt(encrypted)
      
      return decrypted === testData
    } catch (error) {
      console.error('Encryption health check failed:', error)
      return false
    }
  }
}

// Utility functions for data migration and key rotation
export const encryptionUtils = {
  // Migrate existing unencrypted data to encrypted format
  async migrateUserData(userId: string) {
    try {
      const { data: user, error } = await safeSupabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error || !user) {
        throw new Error('User not found')
      }

      const updates: any = {}
      
      // Encrypt SSN if present and not already encrypted
      if (user.ssn && !user.encrypted_ssn) {
        updates.encrypted_ssn = EncryptionService.encryptSSN(user.ssn)
        updates.ssn = null // Remove unencrypted SSN
      }

      // Encrypt phone if present and not already encrypted
      if (user.phone && !user.encrypted_phone) {
        updates.encrypted_phone = EncryptionService.encrypt(user.phone)
        updates.phone = null // Remove unencrypted phone
      }

      // Encrypt date of birth if present and not already encrypted
      if (user.date_of_birth && !user.encrypted_dob) {
        updates.encrypted_dob = EncryptionService.encrypt(user.date_of_birth)
        updates.date_of_birth = null // Remove unencrypted DOB
      }

      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await safeSupabase
          .from('users')
          .update(updates)
          .eq('id', userId)

        if (updateError) {
          throw updateError
        }
      }

      return { success: true, migratedFields: Object.keys(updates) }

    } catch (error) {
      console.error('Data migration error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

