import { createApiClient } from './supabase-admin'
import { v4 as uuidv4 } from 'uuid'

// Error types and codes
export enum ErrorCode {
  // Authentication & Authorization
  AUTH_REQUIRED = 'AUTH_REQUIRED',
  AUTH_INVALID = 'AUTH_INVALID',
  AUTH_EXPIRED = 'AUTH_EXPIRED',
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  INVALID_JSON = 'INVALID_JSON',
  
  // Resource Management
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',
  RESOURCE_LOCKED = 'RESOURCE_LOCKED',
  
  // Rate Limiting & Security
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  IP_BLOCKED = 'IP_BLOCKED',
  
  // Processing & Business Logic
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  
  // External Services
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  AI_SERVICE_ERROR = 'AI_SERVICE_ERROR',
  PAYMENT_SERVICE_ERROR = 'PAYMENT_SERVICE_ERROR',
  
  // System Errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR'
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ErrorDetails {
  code: ErrorCode
  message: string
  userMessage: string
  httpStatus: number
  severity: ErrorSeverity
  retryable: boolean
  metadata?: any
}

export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly userMessage: string
  public readonly httpStatus: number
  public readonly severity: ErrorSeverity
  public readonly retryable: boolean
  public readonly metadata: any
  public readonly errorId: string
  public readonly timestamp: Date

  constructor(details: ErrorDetails, originalError?: Error) {
    super(details.message)
    
    this.name = 'AppError'
    this.code = details.code
    this.userMessage = details.userMessage
    this.httpStatus = details.httpStatus
    this.severity = details.severity
    this.retryable = details.retryable
    this.metadata = details.metadata || {}
    this.errorId = uuidv4()
    this.timestamp = new Date()
    
    // Preserve original error stack if available
    if (originalError) {
      this.stack = originalError.stack
      this.metadata.originalError = {
        name: originalError.name,
        message: originalError.message
      }
    }
  }

  toJSON() {
    return {
      errorId: this.errorId,
      code: this.code,
      message: this.userMessage, // Only expose user-friendly message
      timestamp: this.timestamp.toISOString(),
      retryable: this.retryable,
      ...(this.metadata.userMetadata && { metadata: this.metadata.userMetadata })
    }
  }

  toLogJSON() {
    return {
      errorId: this.errorId,
      code: this.code,
      message: this.message, // Internal message for logging
      userMessage: this.userMessage,
      httpStatus: this.httpStatus,
      severity: this.severity,
      retryable: this.retryable,
      metadata: this.metadata,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack
    }
  }
}

// Error factory functions
export const ErrorFactory = {
  // Authentication & Authorization Errors
  authRequired(metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.AUTH_REQUIRED,
      message: 'Authentication required',
      userMessage: 'Please sign in to access this feature',
      httpStatus: 401,
      severity: ErrorSeverity.MEDIUM,
      retryable: false,
      metadata
    })
  },

  authInvalid(metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.AUTH_INVALID,
      message: 'Invalid authentication credentials',
      userMessage: 'Your session has expired. Please sign in again',
      httpStatus: 401,
      severity: ErrorSeverity.MEDIUM,
      retryable: false,
      metadata
    })
  },

  forbidden(resource?: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.FORBIDDEN,
      message: `Access denied to ${resource || 'resource'}`,
      userMessage: 'You do not have permission to access this resource',
      httpStatus: 403,
      severity: ErrorSeverity.MEDIUM,
      retryable: false,
      metadata
    })
  },

  insufficientPermissions(action?: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.INSUFFICIENT_PERMISSIONS,
      message: `Insufficient permissions for action: ${action || 'unknown'}`,
      userMessage: 'You do not have the required permissions for this action',
      httpStatus: 403,
      severity: ErrorSeverity.MEDIUM,
      retryable: false,
      metadata
    })
  },

  // Validation Errors
  validationError(details: string[], metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.VALIDATION_ERROR,
      message: `Validation failed: ${details.join(', ')}`,
      userMessage: 'Please check your input and try again',
      httpStatus: 422,
      severity: ErrorSeverity.LOW,
      retryable: false,
      metadata: { ...metadata, validationErrors: details }
    })
  },

  invalidInput(field: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.INVALID_INPUT,
      message: `Invalid input for field: ${field}`,
      userMessage: `Please provide a valid ${field}`,
      httpStatus: 400,
      severity: ErrorSeverity.LOW,
      retryable: false,
      metadata
    })
  },

  invalidJson(metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.INVALID_JSON,
      message: 'Invalid JSON in request body',
      userMessage: 'Request format is invalid. Please check your data and try again',
      httpStatus: 400,
      severity: ErrorSeverity.LOW,
      retryable: false,
      metadata
    })
  },

  // Resource Management Errors
  notFound(resource: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.NOT_FOUND,
      message: `${resource} not found`,
      userMessage: `The requested ${resource.toLowerCase()} could not be found`,
      httpStatus: 404,
      severity: ErrorSeverity.LOW,
      retryable: false,
      metadata
    })
  },

  alreadyExists(resource: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.ALREADY_EXISTS,
      message: `${resource} already exists`,
      userMessage: `This ${resource.toLowerCase()} already exists`,
      httpStatus: 409,
      severity: ErrorSeverity.LOW,
      retryable: false,
      metadata
    })
  },

  // Rate Limiting & Security Errors
  rateLimitExceeded(limit?: number, resetTime?: Date, metadata?: any): AppError {
    const resetMessage = resetTime ? ` Try again after ${resetTime.toLocaleTimeString()}` : ''
    return new AppError({
      code: ErrorCode.RATE_LIMIT_EXCEEDED,
      message: `Rate limit exceeded: ${limit || 'unknown'} requests`,
      userMessage: `Too many requests. Please slow down and try again later.${resetMessage}`,
      httpStatus: 429,
      severity: ErrorSeverity.MEDIUM,
      retryable: true,
      metadata: { ...metadata, limit, resetTime }
    })
  },

  suspiciousActivity(metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.SUSPICIOUS_ACTIVITY,
      message: 'Suspicious activity detected',
      userMessage: 'Access temporarily restricted due to security policy',
      httpStatus: 403,
      severity: ErrorSeverity.HIGH,
      retryable: false,
      metadata
    })
  },

  // Processing & Business Logic Errors
  processingError(operation: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.PROCESSING_ERROR,
      message: `Processing error in ${operation}`,
      userMessage: 'Unable to process your request. Please try again later',
      httpStatus: 500,
      severity: ErrorSeverity.MEDIUM,
      retryable: true,
      metadata
    })
  },

  businessRuleViolation(rule: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.BUSINESS_RULE_VIOLATION,
      message: `Business rule violation: ${rule}`,
      userMessage: 'This action is not allowed due to business rules',
      httpStatus: 422,
      severity: ErrorSeverity.MEDIUM,
      retryable: false,
      metadata
    })
  },

  paymentRequired(service?: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.PAYMENT_REQUIRED,
      message: `Payment required for ${service || 'service'}`,
      userMessage: 'This feature requires a paid subscription. Please upgrade your account',
      httpStatus: 402,
      severity: ErrorSeverity.LOW,
      retryable: false,
      metadata
    })
  },

  // External Service Errors
  aiServiceError(service: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.AI_SERVICE_ERROR,
      message: `AI service error: ${service}`,
      userMessage: 'AI analysis is temporarily unavailable. Please try again later',
      httpStatus: 503,
      severity: ErrorSeverity.MEDIUM,
      retryable: true,
      metadata
    })
  },

  externalServiceError(service: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.EXTERNAL_SERVICE_ERROR,
      message: `External service error: ${service}`,
      userMessage: 'A required service is temporarily unavailable. Please try again later',
      httpStatus: 503,
      severity: ErrorSeverity.MEDIUM,
      retryable: true,
      metadata
    })
  },

  // System Errors
  internalError(operation?: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.INTERNAL_ERROR,
      message: `Internal error${operation ? ` in ${operation}` : ''}`,
      userMessage: 'An unexpected error occurred. Please try again later',
      httpStatus: 500,
      severity: ErrorSeverity.HIGH,
      retryable: true,
      metadata
    })
  },

  databaseError(operation: string, originalError?: Error, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.DATABASE_ERROR,
      message: `Database error in ${operation}`,
      userMessage: 'A database error occurred. Please try again later',
      httpStatus: 500,
      severity: ErrorSeverity.HIGH,
      retryable: true,
      metadata
    }, originalError)
  },

  encryptionError(operation: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.ENCRYPTION_ERROR,
      message: `Encryption error in ${operation}`,
      userMessage: 'Unable to process sensitive data. Please try again later',
      httpStatus: 500,
      severity: ErrorSeverity.CRITICAL,
      retryable: true,
      metadata
    })
  },

  configurationError(component: string, metadata?: any): AppError {
    return new AppError({
      code: ErrorCode.CONFIGURATION_ERROR,
      message: `Configuration error in ${component}`,
      userMessage: 'Service configuration error. Please contact support',
      httpStatus: 503,
      severity: ErrorSeverity.CRITICAL,
      retryable: false,
      metadata
    })
  }
}

// Error logging service
export class ErrorLogger {
  private static supabase = createApiClient()

  /**
   * Log error to database and external services
   */
  static async logError(error: AppError, context?: {
    userId?: string
    endpoint?: string
    requestId?: string
    userAgent?: string
    ipAddress?: string
    additionalContext?: any
  }): Promise<void> {
    try {
      // Prepare log entry
      const logEntry = {
        error_id: error.errorId,
        code: error.code,
        message: error.message,
        user_message: error.userMessage,
        http_status: error.httpStatus,
        severity: error.severity,
        retryable: error.retryable,
        metadata: error.metadata,
        stack_trace: error.stack,
        timestamp: error.timestamp.toISOString(),
        
        // Context information
        user_id: context?.userId || null,
        endpoint: context?.endpoint || null,
        request_id: context?.requestId || null,
        user_agent: context?.userAgent || null,
        ip_address: context?.ipAddress || null,
        additional_context: context?.additionalContext || null
      }

      // Log to database
      await this.supabase
        .from('error_logs')
        .insert(logEntry)

      // Log to console for development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error logged:', error.toLogJSON())
      }

      // Send to external monitoring service in production
      if (process.env.NODE_ENV === 'production' && error.severity === ErrorSeverity.CRITICAL) {
        await this.sendToMonitoringService(error, context)
      }

    } catch (loggingError) {
      // Fallback logging - don't let logging errors break the application
      console.error('Failed to log error:', loggingError)
      console.error('Original error:', error.toLogJSON())
    }
  }

  /**
   * Send critical errors to external monitoring service
   */
  private static async sendToMonitoringService(error: AppError, context?: any): Promise<void> {
    try {
      // This would integrate with services like Sentry, DataDog, etc.
      // For now, just log to console
      console.error('CRITICAL ERROR:', {
        errorId: error.errorId,
        code: error.code,
        message: error.message,
        context
      })
    } catch (monitoringError) {
      console.error('Failed to send error to monitoring service:', monitoringError)
    }
  }

  /**
   * Get error statistics
   */
  static async getErrorStats(timeframe: 'hour' | 'day' | 'week' = 'day'): Promise<any> {
    try {
      const now = new Date()
      let startTime: Date

      switch (timeframe) {
        case 'hour':
          startTime = new Date(now.getTime() - 60 * 60 * 1000)
          break
        case 'week':
          startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'day':
        default:
          startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
          break
      }

      const { data, error } = await this.supabase
        .from('error_logs')
        .select('code, severity, timestamp')
        .gte('timestamp', startTime.toISOString())

      if (error) throw error

      // Aggregate statistics
      const stats = {
        total: data.length,
        bySeverity: {} as Record<string, number>,
        byCode: {} as Record<string, number>,
        timeframe
      }

      data.forEach(log => {
        stats.bySeverity[log.severity] = (stats.bySeverity[log.severity] || 0) + 1
        stats.byCode[log.code] = (stats.byCode[log.code] || 0) + 1
      })

      return stats

    } catch (error) {
      console.error('Failed to get error statistics:', error)
      return null
    }
  }
}

// Error handling middleware for API routes
export class ErrorHandler {
  /**
   * Handle errors in API routes
   */
  static handleApiError(error: unknown, context?: {
    endpoint?: string
    requestId?: string
    userId?: string
    userAgent?: string
    ipAddress?: string
  }): { error: any, status: number } {
    let appError: AppError

    // Convert unknown errors to AppError
    if (error instanceof AppError) {
      appError = error
    } else if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('JWT')) {
        appError = ErrorFactory.authInvalid({ originalError: error.message })
      } else if (error.message.includes('permission')) {
        appError = ErrorFactory.forbidden(undefined, { originalError: error.message })
      } else if (error.message.includes('validation')) {
        appError = ErrorFactory.validationError([error.message])
      } else {
        appError = ErrorFactory.internalError(undefined, { originalError: error.message })
      }
    } else {
      appError = ErrorFactory.internalError(undefined, { originalError: String(error) })
    }

    // Log the error
    ErrorLogger.logError(appError, context).catch(logError => {
      console.error('Failed to log error:', logError)
    })

    // Return sanitized error response
    return {
      error: appError.toJSON(),
      status: appError.httpStatus
    }
  }

  /**
   * Handle errors in React components
   */
  static handleComponentError(error: unknown, errorInfo?: any): AppError {
    const appError = error instanceof AppError 
      ? error 
      : ErrorFactory.internalError('component_render', { 
          originalError: error instanceof Error ? error.message : String(error),
          errorInfo 
        })

    // Log the error
    ErrorLogger.logError(appError, {
      endpoint: 'frontend_component',
      additionalContext: errorInfo
    }).catch(logError => {
      console.error('Failed to log component error:', logError)
    })

    return appError
  }

  /**
   * Handle async operation errors
   */
  static async handleAsyncError<T>(
    operation: () => Promise<T>,
    context?: {
      operationName?: string
      userId?: string
      retryCount?: number
    }
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      const appError = error instanceof AppError 
        ? error 
        : ErrorFactory.processingError(context?.operationName || 'async_operation', {
            originalError: error instanceof Error ? error.message : String(error),
            retryCount: context?.retryCount || 0
          })

      // Log the error
      await ErrorLogger.logError(appError, {
        userId: context?.userId,
        additionalContext: context
      })

      throw appError
    }
  }
}

// Utility functions for error handling
export const errorUtils = {
  /**
   * Check if error is retryable
   */
  isRetryable(error: unknown): boolean {
    if (error instanceof AppError) {
      return error.retryable
    }
    return false
  },

  /**
   * Get user-friendly error message
   */
  getUserMessage(error: unknown): string {
    if (error instanceof AppError) {
      return error.userMessage
    }
    return 'An unexpected error occurred. Please try again later'
  },

  /**
   * Check if error is critical
   */
  isCritical(error: unknown): boolean {
    if (error instanceof AppError) {
      return error.severity === ErrorSeverity.CRITICAL
    }
    return false
  },

  /**
   * Extract error code
   */
  getErrorCode(error: unknown): string {
    if (error instanceof AppError) {
      return error.code
    }
    return ErrorCode.INTERNAL_ERROR
  },

  /**
   * Create error response for API
   */
  createErrorResponse(error: unknown, requestId?: string): any {
    const appError = error instanceof AppError 
      ? error 
      : ErrorFactory.internalError()

    return {
      success: false,
      error: appError.toJSON(),
      requestId,
      timestamp: new Date().toISOString()
    }
  }
}

