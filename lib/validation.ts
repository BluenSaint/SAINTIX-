import { z } from 'zod'

// Base validation schemas
export const userIdSchema = z.string().uuid('Invalid user ID format')

export const creditReportIdSchema = z.string().uuid('Invalid credit report ID format')

// Credit analysis request schema
export const creditAnalysisRequestSchema = z.object({
  userId: userIdSchema,
  creditReportId: creditReportIdSchema,
  analysisType: z.enum(['basic', 'comprehensive', 'dispute_focused']).default('comprehensive'),
  includeRecommendations: z.boolean().default(true),
  includePredictions: z.boolean().default(true)
})

// Dispute letter creation schema
export const disputeLetterRequestSchema = z.object({
  userId: userIdSchema,
  creditBureau: z.enum(['experian', 'equifax', 'transunion']),
  disputeType: z.enum(['inaccurate_info', 'identity_theft', 'mixed_file', 'outdated_info', 'other']),
  disputeItems: z.array(z.object({
    accountNumber: z.string().min(1, 'Account number is required'),
    creditorName: z.string().min(1, 'Creditor name is required'),
    disputeReason: z.string().min(10, 'Dispute reason must be at least 10 characters'),
    requestedAction: z.enum(['remove', 'update', 'verify'])
  })).min(1, 'At least one dispute item is required'),
  personalStatement: z.string().max(1000, 'Personal statement cannot exceed 1000 characters').optional()
})

// User registration schema
export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Password must contain uppercase, lowercase, number, and special character'),
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
  phoneNumber: z.string()
    .regex(/^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Invalid phone number format')
    .optional(),
  dateOfBirth: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format')
    .optional()
})

// Credit report upload schema
export const creditReportUploadSchema = z.object({
  userId: userIdSchema,
  source: z.enum(['experian', 'equifax', 'transunion', 'annual_credit_report', 'other']),
  fileType: z.enum(['pdf', 'html', 'txt']),
  fileSize: z.number().max(10 * 1024 * 1024, 'File size cannot exceed 10MB'),
  fileName: z.string().min(1, 'File name is required')
})

// Payment processing schema
export const paymentRequestSchema = z.object({
  userId: userIdSchema,
  amount: z.number().positive('Amount must be positive').max(10000, 'Amount cannot exceed $10,000'),
  currency: z.enum(['USD']).default('USD'),
  paymentMethod: z.enum(['card', 'bank_transfer', 'paypal']),
  description: z.string().min(1, 'Payment description is required'),
  metadata: z.record(z.string()).optional()
})

// Session validation schema
export const sessionValidationSchema = z.object({
  userId: userIdSchema,
  sessionToken: z.string().min(1, 'Session token is required'),
  ipAddress: z.string().ip('Invalid IP address'),
  userAgent: z.string().min(1, 'User agent is required')
})

// Sensitive data schemas for encryption validation
export const sensitiveDataSchema = z.object({
  ssn: z.string().regex(/^\d{3}-?\d{2}-?\d{4}$/, 'Invalid SSN format').optional(),
  creditScore: z.number().int().min(300).max(850).optional(),
  accountNumber: z.string().min(1).optional(),
  routingNumber: z.string().regex(/^\d{9}$/, 'Invalid routing number').optional()
})

// Error response schema
export const errorResponseSchema = z.object({
  error: z.string(),
  code: z.string(),
  message: z.string(),
  timestamp: z.string(),
  requestId: z.string().uuid()
})

// Success response schema
export const successResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  message: z.string().optional(),
  timestamp: z.string(),
  requestId: z.string().uuid()
})

// Validation helper functions
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
      throw new ValidationError('Request validation failed', formattedErrors)
    }
    throw error
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: Array<{ field: string; message: string }>
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Rate limiting schema
export const rateLimitSchema = z.object({
  endpoint: z.string(),
  userId: userIdSchema.optional(),
  ipAddress: z.string().ip(),
  requestCount: z.number().int().positive(),
  windowStart: z.date(),
  windowEnd: z.date()
})

export type CreditAnalysisRequest = z.infer<typeof creditAnalysisRequestSchema>
export type DisputeLetterRequest = z.infer<typeof disputeLetterRequestSchema>
export type UserRegistrationRequest = z.infer<typeof userRegistrationSchema>
export type CreditReportUploadRequest = z.infer<typeof creditReportUploadSchema>
export type PaymentRequest = z.infer<typeof paymentRequestSchema>
export type SessionValidation = z.infer<typeof sessionValidationSchema>
export type SensitiveData = z.infer<typeof sensitiveDataSchema>
export type ErrorResponse = z.infer<typeof errorResponseSchema>
export type SuccessResponse = z.infer<typeof successResponseSchema>

