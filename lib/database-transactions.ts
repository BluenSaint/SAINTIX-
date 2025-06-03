import { createApiClient } from './supabase-admin'
import { EncryptionService, encryptSensitiveFields } from './encryption'
import { v4 as uuidv4 } from 'uuid'

export interface TransactionContext {
  transactionId: string
  operations: TransactionOperation[]
  rollbackOperations: RollbackOperation[]
  startTime: Date
  status: 'pending' | 'committed' | 'rolled_back' | 'failed'
}

export interface TransactionOperation {
  id: string
  table: string
  operation: 'insert' | 'update' | 'delete'
  data: any
  conditions?: any
  timestamp: Date
}

export interface RollbackOperation {
  id: string
  table: string
  operation: 'insert' | 'update' | 'delete'
  data: any
  conditions?: any
  originalOperationId: string
}

export class DatabaseTransaction {
  private context: TransactionContext
  private supabase = createApiClient()

  constructor() {
    this.context = {
      transactionId: uuidv4(),
      operations: [],
      rollbackOperations: [],
      startTime: new Date(),
      status: 'pending'
    }
  }

  /**
   * Execute a transaction with automatic rollback on failure
   */
  static async execute<T>(
    transactionFn: (tx: DatabaseTransaction) => Promise<T>
  ): Promise<T> {
    const transaction = new DatabaseTransaction()
    
    try {
      // Log transaction start
      await transaction.logTransactionStart()
      
      // Execute the transaction function
      const result = await transactionFn(transaction)
      
      // Commit the transaction
      await transaction.commit()
      
      return result
      
    } catch (error) {
      // Rollback on any error
      await transaction.rollback()
      throw error
    }
  }

  /**
   * Insert operation with rollback support
   */
  async insert(table: string, data: any): Promise<any> {
    const operationId = uuidv4()
    
    try {
      // Encrypt sensitive fields before insertion
      const encryptedData = encryptSensitiveFields(data)
      
      // Perform the insert
      const { data: insertedData, error } = await this.supabase
        .from(table)
        .insert(encryptedData)
        .select()
        .single()
      
      if (error) throw error
      
      // Record the operation
      this.context.operations.push({
        id: operationId,
        table,
        operation: 'insert',
        data: encryptedData,
        timestamp: new Date()
      })
      
      // Record rollback operation (delete the inserted record)
      this.context.rollbackOperations.push({
        id: uuidv4(),
        table,
        operation: 'delete',
        data: null,
        conditions: { id: insertedData.id },
        originalOperationId: operationId
      })
      
      return insertedData
      
    } catch (error) {
      console.error(`Transaction insert failed for table ${table}:`, error)
      throw error
    }
  }

  /**
   * Update operation with rollback support
   */
  async update(table: string, data: any, conditions: any): Promise<any> {
    const operationId = uuidv4()
    
    try {
      // First, get the current data for rollback
      const { data: currentData, error: selectError } = await this.supabase
        .from(table)
        .select('*')
        .match(conditions)
        .single()
      
      if (selectError) throw selectError
      
      // Encrypt sensitive fields in update data
      const encryptedData = encryptSensitiveFields(data)
      
      // Perform the update
      const { data: updatedData, error } = await this.supabase
        .from(table)
        .update(encryptedData)
        .match(conditions)
        .select()
        .single()
      
      if (error) throw error
      
      // Record the operation
      this.context.operations.push({
        id: operationId,
        table,
        operation: 'update',
        data: encryptedData,
        conditions,
        timestamp: new Date()
      })
      
      // Record rollback operation (restore original data)
      this.context.rollbackOperations.push({
        id: uuidv4(),
        table,
        operation: 'update',
        data: currentData,
        conditions,
        originalOperationId: operationId
      })
      
      return updatedData
      
    } catch (error) {
      console.error(`Transaction update failed for table ${table}:`, error)
      throw error
    }
  }

  /**
   * Delete operation with rollback support
   */
  async delete(table: string, conditions: any): Promise<any> {
    const operationId = uuidv4()
    
    try {
      // First, get the data to be deleted for rollback
      const { data: dataToDelete, error: selectError } = await this.supabase
        .from(table)
        .select('*')
        .match(conditions)
        .single()
      
      if (selectError) throw selectError
      
      // Perform the delete
      const { data: deletedData, error } = await this.supabase
        .from(table)
        .delete()
        .match(conditions)
        .select()
        .single()
      
      if (error) throw error
      
      // Record the operation
      this.context.operations.push({
        id: operationId,
        table,
        operation: 'delete',
        data: null,
        conditions,
        timestamp: new Date()
      })
      
      // Record rollback operation (re-insert the deleted data)
      this.context.rollbackOperations.push({
        id: uuidv4(),
        table,
        operation: 'insert',
        data: dataToDelete,
        conditions: null,
        originalOperationId: operationId
      })
      
      return deletedData
      
    } catch (error) {
      console.error(`Transaction delete failed for table ${table}:`, error)
      throw error
    }
  }

  /**
   * Commit the transaction
   */
  async commit(): Promise<void> {
    try {
      this.context.status = 'committed'
      
      // Log successful transaction
      await this.logTransactionEnd('committed')
      
      console.log(`Transaction ${this.context.transactionId} committed successfully`)
      
    } catch (error) {
      console.error(`Failed to commit transaction ${this.context.transactionId}:`, error)
      throw error
    }
  }

  /**
   * Rollback the transaction
   */
  async rollback(): Promise<void> {
    try {
      this.context.status = 'rolled_back'
      
      // Execute rollback operations in reverse order
      const rollbackOps = [...this.context.rollbackOperations].reverse()
      
      for (const rollbackOp of rollbackOps) {
        try {
          await this.executeRollbackOperation(rollbackOp)
        } catch (rollbackError) {
          console.error(`Rollback operation failed:`, rollbackError)
          // Continue with other rollback operations even if one fails
        }
      }
      
      // Log rollback
      await this.logTransactionEnd('rolled_back')
      
      console.log(`Transaction ${this.context.transactionId} rolled back successfully`)
      
    } catch (error) {
      console.error(`Failed to rollback transaction ${this.context.transactionId}:`, error)
      this.context.status = 'failed'
      await this.logTransactionEnd('failed')
      throw error
    }
  }

  /**
   * Execute a single rollback operation
   */
  private async executeRollbackOperation(rollbackOp: RollbackOperation): Promise<void> {
    switch (rollbackOp.operation) {
      case 'insert':
        await this.supabase
          .from(rollbackOp.table)
          .insert(rollbackOp.data)
        break
        
      case 'update':
        await this.supabase
          .from(rollbackOp.table)
          .update(rollbackOp.data)
          .match(rollbackOp.conditions)
        break
        
      case 'delete':
        await this.supabase
          .from(rollbackOp.table)
          .delete()
          .match(rollbackOp.conditions)
        break
    }
  }

  /**
   * Log transaction start
   */
  private async logTransactionStart(): Promise<void> {
    try {
      await this.supabase
        .from('transaction_logs')
        .insert({
          transaction_id: this.context.transactionId,
          status: 'started',
          start_time: this.context.startTime.toISOString(),
          operations_count: 0
        })
    } catch (error) {
      console.error('Failed to log transaction start:', error)
      // Don't throw - logging failure shouldn't prevent transaction
    }
  }

  /**
   * Log transaction end
   */
  private async logTransactionEnd(status: string): Promise<void> {
    try {
      await this.supabase
        .from('transaction_logs')
        .update({
          status,
          end_time: new Date().toISOString(),
          operations_count: this.context.operations.length,
          operations: this.context.operations,
          rollback_operations: this.context.rollbackOperations
        })
        .eq('transaction_id', this.context.transactionId)
    } catch (error) {
      console.error('Failed to log transaction end:', error)
      // Don't throw - logging failure shouldn't prevent transaction completion
    }
  }

  /**
   * Get transaction context (for debugging)
   */
  getContext(): TransactionContext {
    return { ...this.context }
  }
}

// High-level transaction operations for common use cases
export class TransactionOperations {
  /**
   * Create user with all related data in a single transaction
   */
  static async createUserWithProfile(userData: {
    email: string
    fullName: string
    role: string
    sensitiveData?: {
      ssn?: string
      dateOfBirth?: string
      phoneNumber?: string
    }
  }): Promise<any> {
    return DatabaseTransaction.execute(async (tx) => {
      // Insert user record
      const user = await tx.insert('users', {
        email: userData.email,
        full_name: userData.fullName,
        role: userData.role,
        // Sensitive data will be encrypted by the insert method
        ...userData.sensitiveData
      })

      // Create initial notification
      await tx.insert('notifications', {
        user_id: user.id,
        title: 'Welcome to SAINTRIX',
        message: 'Your account has been created successfully.',
        type: 'welcome',
        read: false
      })

      // Log user creation activity
      await tx.insert('client_activity_log', {
        user_id: user.id,
        activity_type: 'account_created',
        description: 'User account created successfully'
      })

      return user
    })
  }

  /**
   * Upload credit report with analysis in a single transaction
   */
  static async uploadCreditReportWithAnalysis(reportData: {
    userId: string
    fileUrl: string
    source: string
    creditData?: any
    analysisResults?: any
  }): Promise<any> {
    return DatabaseTransaction.execute(async (tx) => {
      // Insert credit report
      const creditReport = await tx.insert('credit_reports', {
        user_id: reportData.userId,
        file_url: reportData.fileUrl,
        source: reportData.source,
        reviewed: false,
        // Credit data will be encrypted by the insert method
        ...reportData.creditData
      })

      // If analysis results provided, store them
      if (reportData.analysisResults) {
        await tx.insert('ai_logs', {
          user_id: reportData.userId,
          intent: 'credit_analysis',
          input_data: {
            credit_report_id: creditReport.id,
            source: reportData.source
          },
          response: reportData.analysisResults,
          // Sensitive analysis data will be encrypted
          encrypted_data: reportData.analysisResults
        })
      }

      // Create notification
      await tx.insert('notifications', {
        user_id: reportData.userId,
        title: 'Credit Report Uploaded',
        message: 'Your credit report has been uploaded and is ready for analysis.',
        type: 'credit_report',
        read: false
      })

      // Log activity
      await tx.insert('client_activity_log', {
        user_id: reportData.userId,
        activity_type: 'credit_report_uploaded',
        description: `Credit report uploaded from ${reportData.source}`,
        metadata: {
          credit_report_id: creditReport.id,
          source: reportData.source
        }
      })

      return creditReport
    })
  }

  /**
   * Create dispute letter with related data in a single transaction
   */
  static async createDisputeWithTracking(disputeData: {
    userId: string
    creditBureau: string
    type: string
    content: string
    generatedBy: 'ai' | 'manual'
    sensitiveInfo?: any
  }): Promise<any> {
    return DatabaseTransaction.execute(async (tx) => {
      // Insert dispute letter
      const dispute = await tx.insert('dispute_letters', {
        user_id: disputeData.userId,
        credit_bureau: disputeData.creditBureau,
        type: disputeData.type,
        content: disputeData.content, // Will be encrypted
        generated_by: disputeData.generatedBy,
        status: 'draft',
        // Sensitive info will be encrypted
        ...disputeData.sensitiveInfo
      })

      // Create tracking record
      await tx.insert('dispute_tracking', {
        dispute_id: dispute.id,
        status: 'created',
        notes: 'Dispute letter created',
        updated_by: disputeData.userId
      })

      // Create notification
      await tx.insert('notifications', {
        user_id: disputeData.userId,
        title: 'Dispute Letter Created',
        message: `Your dispute letter for ${disputeData.creditBureau} has been created.`,
        type: 'dispute',
        read: false
      })

      // Log activity
      await tx.insert('client_activity_log', {
        user_id: disputeData.userId,
        activity_type: 'dispute_created',
        description: `Dispute letter created for ${disputeData.creditBureau}`,
        metadata: {
          dispute_id: dispute.id,
          credit_bureau: disputeData.creditBureau,
          type: disputeData.type,
          generated_by: disputeData.generatedBy
        }
      })

      return dispute
    })
  }

  /**
   * Process payment with all related updates in a single transaction
   */
  static async processPaymentWithUpdates(paymentData: {
    userId: string
    amount: number
    currency: string
    paymentMethod: string
    paymentToken: string
    serviceType: string
  }): Promise<any> {
    return DatabaseTransaction.execute(async (tx) => {
      // Insert payment record
      const payment = await tx.insert('payments', {
        user_id: paymentData.userId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        payment_method: paymentData.paymentMethod,
        status: 'processing',
        // Payment token will be encrypted
        payment_token: paymentData.paymentToken
      })

      // Update user's service access
      await tx.update('users', {
        last_payment_date: new Date().toISOString(),
        service_status: 'active'
      }, {
        id: paymentData.userId
      })

      // Create service record
      await tx.insert('user_services', {
        user_id: paymentData.userId,
        service_type: paymentData.serviceType,
        payment_id: payment.id,
        status: 'active',
        activated_at: new Date().toISOString()
      })

      // Create notification
      await tx.insert('notifications', {
        user_id: paymentData.userId,
        title: 'Payment Processed',
        message: `Your payment of $${paymentData.amount} has been processed successfully.`,
        type: 'payment',
        read: false
      })

      // Log activity
      await tx.insert('client_activity_log', {
        user_id: paymentData.userId,
        activity_type: 'payment_processed',
        description: `Payment processed for ${paymentData.serviceType}`,
        metadata: {
          payment_id: payment.id,
          amount: paymentData.amount,
          service_type: paymentData.serviceType
        }
      })

      return payment
    })
  }

  /**
   * Update dispute status with tracking in a single transaction
   */
  static async updateDisputeStatusWithTracking(disputeData: {
    disputeId: string
    userId: string
    newStatus: string
    notes?: string
    responseReceived?: boolean
    responseContent?: string
  }): Promise<any> {
    return DatabaseTransaction.execute(async (tx) => {
      // Update dispute status
      const dispute = await tx.update('dispute_letters', {
        status: disputeData.newStatus,
        ...(disputeData.responseReceived && {
          response_received: true,
          response_content: disputeData.responseContent // Will be encrypted
        })
      }, {
        id: disputeData.disputeId
      })

      // Add tracking record
      await tx.insert('dispute_tracking', {
        dispute_id: disputeData.disputeId,
        status: disputeData.newStatus,
        notes: disputeData.notes || `Status updated to ${disputeData.newStatus}`,
        updated_by: disputeData.userId
      })

      // Create notification if significant status change
      if (['submitted', 'resolved', 'rejected'].includes(disputeData.newStatus)) {
        await tx.insert('notifications', {
          user_id: disputeData.userId,
          title: 'Dispute Status Updated',
          message: `Your dispute status has been updated to: ${disputeData.newStatus}`,
          type: 'dispute',
          read: false
        })
      }

      // Log activity
      await tx.insert('client_activity_log', {
        user_id: disputeData.userId,
        activity_type: 'dispute_status_updated',
        description: `Dispute status updated to ${disputeData.newStatus}`,
        metadata: {
          dispute_id: disputeData.disputeId,
          old_status: dispute.status,
          new_status: disputeData.newStatus,
          response_received: disputeData.responseReceived
        }
      })

      return dispute
    })
  }
}

// Utility functions for transaction management
export const transactionUtils = {
  /**
   * Check if a transaction is still active
   */
  async isTransactionActive(transactionId: string): Promise<boolean> {
    try {
      const supabase = createApiClient()
      const { data, error } = await supabase
        .from('transaction_logs')
        .select('status')
        .eq('transaction_id', transactionId)
        .single()

      if (error) return false
      return data.status === 'started'
    } catch (error) {
      return false
    }
  },

  /**
   * Get transaction details
   */
  async getTransactionDetails(transactionId: string): Promise<any> {
    try {
      const supabase = createApiClient()
      const { data, error } = await supabase
        .from('transaction_logs')
        .select('*')
        .eq('transaction_id', transactionId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Failed to get transaction details:', error)
      return null
    }
  },

  /**
   * Clean up old transaction logs
   */
  async cleanupOldTransactionLogs(daysOld: number = 30): Promise<void> {
    try {
      const supabase = createApiClient()
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysOld)

      await supabase
        .from('transaction_logs')
        .delete()
        .lt('start_time', cutoffDate.toISOString())
        .in('status', ['committed', 'rolled_back'])

    } catch (error) {
      console.error('Failed to cleanup old transaction logs:', error)
    }
  }
}

