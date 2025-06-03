import { NextRequest } from 'next/server'
import { createApiClient } from '@/lib/supabase-admin'
import { safeSupabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export interface SessionValidationResult {
  isValid: boolean
  user: any | null
  error?: string
  sessionData?: any
}

export class SessionManager {
  /**
   * Validate user session with comprehensive security checks
   */
  static async validateSession(request: NextRequest): Promise<SessionValidationResult> {
    try {
      // Extract session information
      const authHeader = request.headers.get('authorization')
      const sessionCookie = request.cookies.get('sb-access-token')
      
      if (!authHeader && !sessionCookie) {
        return {
          isValid: false,
          user: null,
          error: 'No authentication credentials provided'
        }
      }

      // Get user from Supabase session
      const supabase = createApiClient()
      const { data: { user }, error: userError } = await supabase.auth.getUser(
        authHeader?.replace('Bearer ', '') || sessionCookie?.value
      )

      if (userError || !user) {
        return {
          isValid: false,
          user: null,
          error: 'Invalid or expired session'
        }
      }

      // Additional security checks
      const securityChecks = await this.performSecurityChecks(request, user)
      if (!securityChecks.passed) {
        return {
          isValid: false,
          user: null,
          error: securityChecks.reason
        }
      }

      // Get user profile with role information
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError || !userProfile) {
        return {
          isValid: false,
          user: null,
          error: 'User profile not found'
        }
      }

      return {
        isValid: true,
        user: userProfile,
        sessionData: {
          sessionId: uuidv4(),
          ipAddress: this.getClientIP(request),
          userAgent: request.headers.get('user-agent'),
          timestamp: new Date().toISOString()
        }
      }

    } catch (error) {
      console.error('Session validation error:', error)
      return {
        isValid: false,
        user: null,
        error: 'Session validation failed'
      }
    }
  }

  /**
   * Perform additional security checks
   */
  private static async performSecurityChecks(request: NextRequest, user: any): Promise<{
    passed: boolean
    reason?: string
  }> {
    try {
      const clientIP = this.getClientIP(request)
      const userAgent = request.headers.get('user-agent') || ''

      // Check for suspicious IP patterns
      if (this.isSuspiciousIP(clientIP)) {
        await this.logSecurityEvent('suspicious_ip', user.id, { ip: clientIP })
        return { passed: false, reason: 'Access denied from suspicious location' }
      }

      // Check for unusual user agent patterns
      if (this.isSuspiciousUserAgent(userAgent)) {
        await this.logSecurityEvent('suspicious_user_agent', user.id, { userAgent })
        return { passed: false, reason: 'Access denied due to security policy' }
      }

      // Check rate limiting
      const rateLimitCheck = await this.checkRateLimit(user.id, clientIP)
      if (!rateLimitCheck.allowed) {
        await this.logSecurityEvent('rate_limit_exceeded', user.id, { ip: clientIP })
        return { passed: false, reason: 'Rate limit exceeded' }
      }

      return { passed: true }

    } catch (error) {
      console.error('Security check error:', error)
      return { passed: false, reason: 'Security validation failed' }
    }
  }

  /**
   * Extract client IP address
   */
  private static getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const cfConnectingIP = request.headers.get('cf-connecting-ip')
    
    if (cfConnectingIP) return cfConnectingIP
    if (realIP) return realIP
    if (forwarded) return forwarded.split(',')[0].trim()
    
    return 'unknown'
  }

  /**
   * Check if IP address is suspicious
   */
  private static isSuspiciousIP(ip: string): boolean {
    // Implement IP reputation checking
    // This could integrate with threat intelligence services
    const suspiciousPatterns = [
      /^10\./, // Private networks (if not expected)
      /^192\.168\./, // Private networks (if not expected)
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./ // Private networks (if not expected)
    ]

    // In production, you would check against known malicious IP lists
    return false // Placeholder implementation
  }

  /**
   * Check if user agent is suspicious
   */
  private static isSuspiciousUserAgent(userAgent: string): boolean {
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /^$/,
      /curl/i,
      /wget/i
    ]

    return suspiciousPatterns.some(pattern => pattern.test(userAgent))
  }

  /**
   * Check rate limiting
   */
  private static async checkRateLimit(userId: string, ip: string): Promise<{
    allowed: boolean
    remaining?: number
    resetTime?: Date
  }> {
    try {
      const supabase = createApiClient()
      const now = new Date()
      const windowStart = new Date(now.getTime() - 60 * 60 * 1000) // 1 hour window

      // Check user-based rate limit
      const { data: userRequests, error } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', windowStart.toISOString())

      if (error) {
        console.error('Rate limit check error:', error)
        return { allowed: true } // Allow on error to prevent blocking legitimate users
      }

      const requestCount = userRequests?.length || 0
      const maxRequests = 100 // 100 requests per hour per user

      if (requestCount >= maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: new Date(windowStart.getTime() + 60 * 60 * 1000)
        }
      }

      // Log this request
      await supabase
        .from('rate_limits')
        .insert({
          user_id: userId,
          ip_address: ip,
          endpoint: 'api_request',
          created_at: now.toISOString()
        })

      return {
        allowed: true,
        remaining: maxRequests - requestCount - 1
      }

    } catch (error) {
      console.error('Rate limit error:', error)
      return { allowed: true } // Allow on error
    }
  }

  /**
   * Log security events
   */
  private static async logSecurityEvent(
    eventType: string,
    userId: string,
    metadata: any
  ): Promise<void> {
    try {
      const supabase = createApiClient()
      await supabase
        .from('security_logs')
        .insert({
          event_type: eventType,
          user_id: userId,
          metadata,
          timestamp: new Date().toISOString()
        })
    } catch (error) {
      console.error('Failed to log security event:', error)
    }
  }

  /**
   * Validate user permissions for specific operations
   */
  static async validatePermissions(
    user: any,
    operation: string,
    resourceId?: string
  ): Promise<boolean> {
    try {
      // Check user role
      if (!user.role) {
        return false
      }

      // Admin users have all permissions
      if (user.role === 'admin') {
        return true
      }

      // Client users can only access their own resources
      if (user.role === 'client') {
        switch (operation) {
          case 'read_credit_report':
          case 'create_dispute':
          case 'read_dispute':
          case 'read_profile':
            return resourceId ? await this.validateResourceOwnership(user.id, resourceId) : true
          
          case 'admin_access':
          case 'read_all_users':
          case 'modify_user':
            return false
          
          default:
            return false
        }
      }

      return false

    } catch (error) {
      console.error('Permission validation error:', error)
      return false
    }
  }

  /**
   * Validate that user owns the resource
   */
  private static async validateResourceOwnership(
    userId: string,
    resourceId: string
  ): Promise<boolean> {
    try {
      const supabase = createApiClient()
      
      // Check credit reports
      const { data: creditReport } = await supabase
        .from('credit_reports')
        .select('user_id')
        .eq('id', resourceId)
        .single()

      if (creditReport && creditReport.user_id === userId) {
        return true
      }

      // Check dispute letters
      const { data: dispute } = await supabase
        .from('dispute_letters')
        .select('user_id')
        .eq('id', resourceId)
        .single()

      if (dispute && dispute.user_id === userId) {
        return true
      }

      return false

    } catch (error) {
      console.error('Resource ownership validation error:', error)
      return false
    }
  }

  /**
   * Create audit log entry
   */
  static async createAuditLog(
    userId: string,
    action: string,
    resourceType: string,
    resourceId: string,
    metadata?: any
  ): Promise<void> {
    try {
      const supabase = createApiClient()
      await supabase
        .from('audit_logs')
        .insert({
          user_id: userId,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          metadata,
          timestamp: new Date().toISOString()
        })
    } catch (error) {
      console.error('Failed to create audit log:', error)
    }
  }
}

