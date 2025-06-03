import { NextRequest, NextResponse } from 'next/server'
import { createApiClient } from '@/lib/supabase-admin'
import { validateRequest, creditAnalysisRequestSchema, ValidationError } from '@/lib/validation'
import { SessionManager } from '@/lib/session-manager'
import { CreditAnalysisService } from '@/lib/ai-credit-analysis'
import { EncryptionService, encryptSensitiveFields } from '@/lib/encryption'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  const requestId = uuidv4()
  const timestamp = new Date().toISOString()
  
  try {
    // 1. Validate session and authentication
    const sessionResult = await SessionManager.validateSession(request)
    if (!sessionResult.isValid || !sessionResult.user) {
      return NextResponse.json(
        {
          error: 'Authentication required',
          code: 'AUTH_REQUIRED',
          message: 'Please sign in to access this feature',
          timestamp,
          requestId
        },
        { status: 401 }
      )
    }

    const user = sessionResult.user

    // 2. Parse and validate request body
    let requestBody: any
    try {
      requestBody = await request.json()
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Invalid request format',
          code: 'INVALID_JSON',
          message: 'Request body must be valid JSON',
          timestamp,
          requestId
        },
        { status: 400 }
      )
    }

    // 3. Validate request schema
    let validatedRequest
    try {
      validatedRequest = validateRequest(creditAnalysisRequestSchema, requestBody)
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            message: 'Request data is invalid',
            details: error.errors,
            timestamp,
            requestId
          },
          { status: 422 }
        )
      }
      throw error
    }

    const { userId, creditReportId, analysisType, includeRecommendations, includePredictions } = validatedRequest

    // 4. Verify user authorization
    if (user.id !== userId) {
      await SessionManager.createAuditLog(
        user.id,
        'unauthorized_access_attempt',
        'credit_analysis',
        creditReportId,
        { attemptedUserId: userId, sessionData: sessionResult.sessionData }
      )
      
      return NextResponse.json(
        {
          error: 'Access denied',
          code: 'FORBIDDEN',
          message: 'You can only analyze your own credit reports',
          timestamp,
          requestId
        },
        { status: 403 }
      )
    }

    // 5. Validate permissions
    const hasPermission = await SessionManager.validatePermissions(
      user,
      'read_credit_report',
      creditReportId
    )

    if (!hasPermission) {
      await SessionManager.createAuditLog(
        user.id,
        'permission_denied',
        'credit_analysis',
        creditReportId,
        { reason: 'insufficient_permissions' }
      )

      return NextResponse.json(
        {
          error: 'Insufficient permissions',
          code: 'FORBIDDEN',
          message: 'You do not have permission to access this credit report',
          timestamp,
          requestId
        },
        { status: 403 }
      )
    }

    // 6. Retrieve and verify credit report
    const supabase = createApiClient()
    const { data: creditReport, error: reportError } = await supabase
      .from('credit_reports')
      .select(`
        *,
        users!inner(
          id,
          full_name,
          email,
          role
        )
      `)
      .eq('id', creditReportId)
      .eq('user_id', userId)
      .single()

    if (reportError || !creditReport) {
      await SessionManager.createAuditLog(
        user.id,
        'credit_report_not_found',
        'credit_analysis',
        creditReportId,
        { error: reportError?.message }
      )

      return NextResponse.json(
        {
          error: 'Credit report not found',
          code: 'NOT_FOUND',
          message: 'The requested credit report could not be found or you do not have access to it',
          timestamp,
          requestId
        },
        { status: 404 }
      )
    }

    // 7. Decrypt sensitive data if needed
    let decryptedCreditReport
    try {
      decryptedCreditReport = {
        ...creditReport,
        // Decrypt sensitive fields for analysis
        creditScore: creditReport.encrypted_credit_score 
          ? EncryptionService.decryptCreditScore(creditReport.encrypted_credit_score)
          : creditReport.credit_score,
        // Add other decrypted fields as needed
      }
    } catch (decryptionError) {
      console.error('Decryption error:', decryptionError)
      return NextResponse.json(
        {
          error: 'Data processing error',
          code: 'PROCESSING_ERROR',
          message: 'Unable to process credit report data',
          timestamp,
          requestId
        },
        { status: 500 }
      )
    }

    // 8. Perform AI credit analysis
    let analysis
    try {
      analysis = await CreditAnalysisService.analyzeCreditReport({
        creditReport: decryptedCreditReport,
        userProfile: user,
        analysisType,
        includeRecommendations,
        includePredictions
      })
    } catch (analysisError) {
      console.error('Credit analysis error:', analysisError)
      
      // Log the error but don't expose details to user
      await SessionManager.createAuditLog(
        user.id,
        'analysis_error',
        'credit_analysis',
        creditReportId,
        { 
          error: analysisError instanceof Error ? analysisError.message : 'Unknown error',
          analysisType 
        }
      )

      return NextResponse.json(
        {
          error: 'Analysis unavailable',
          code: 'ANALYSIS_ERROR',
          message: 'Credit analysis is temporarily unavailable. Please try again later.',
          timestamp,
          requestId
        },
        { status: 503 }
      )
    }

    // 9. Encrypt sensitive analysis results before storing
    const encryptedAnalysisData = encryptSensitiveFields({
      analysis_results: analysis,
      user_id: userId,
      credit_report_id: creditReportId,
      analysis_type: analysisType
    })

    // 10. Log AI usage and store results
    try {
      const { data: aiLog, error: logError } = await supabase
        .from('ai_logs')
        .insert({
          user_id: userId,
          intent: 'credit_analysis',
          input_data: {
            credit_report_id: creditReportId,
            source: creditReport.source,
            analysis_type: analysisType,
            include_recommendations: includeRecommendations,
            include_predictions: includePredictions
          },
          response: {
            analysis_type: analysisType,
            recommendations_count: analysis.recommendations?.length || 0,
            score_factors_count: analysis.scoreFactors?.length || 0,
            disputes_count: analysis.potentialDisputes?.length || 0,
            status: 'success',
            request_id: requestId
          },
          encrypted_data: encryptedAnalysisData.analysis_results,
          timestamp
        })
        .select()
        .single()

      if (logError) {
        console.error('Failed to log AI usage:', logError)
        // Continue execution - logging failure shouldn't block the response
      }

      // Create audit log for successful analysis
      await SessionManager.createAuditLog(
        user.id,
        'credit_analysis_completed',
        'credit_report',
        creditReportId,
        {
          analysis_type: analysisType,
          ai_log_id: aiLog?.id,
          session_data: sessionResult.sessionData,
          request_id: requestId
        }
      )

    } catch (loggingError) {
      console.error('Logging error:', loggingError)
      // Continue execution - logging errors shouldn't block the response
    }

    // 11. Return successful response with sanitized data
    return NextResponse.json(
      {
        success: true,
        data: {
          analysis,
          metadata: {
            analysisType,
            creditReportSource: creditReport.source,
            analysisDate: timestamp,
            requestId
          }
        },
        message: 'Credit analysis completed successfully',
        timestamp,
        requestId
      },
      { 
        status: 200,
        headers: {
          'X-Request-ID': requestId,
          'X-Analysis-Type': analysisType
        }
      }
    )

  } catch (error) {
    // 12. Handle unexpected errors
    console.error('Unexpected error in credit analysis:', error)
    
    // Log error for debugging (without exposing to user)
    try {
      const supabase = createApiClient()
      await supabase
        .from('error_logs')
        .insert({
          endpoint: '/api/ai/analyze-credit',
          error_message: error instanceof Error ? error.message : 'Unknown error',
          error_stack: error instanceof Error ? error.stack : null,
          request_id: requestId,
          timestamp,
          user_id: null // Don't include user ID in error logs for privacy
        })
    } catch (logError) {
      console.error('Failed to log error:', logError)
    }

    // Return generic error response
    return NextResponse.json(
      {
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred. Please try again later.',
        timestamp,
        requestId
      },
      { status: 500 }
    )
  }
}

