'use client'

import React from 'react'

// Global error logging and debugging system
interface ErrorLog {
  timestamp: string
  error: string
  stack?: string
  url: string
  userAgent: string
  userId?: string
  sessionId: string
  component?: string
  action?: string
  metadata?: any
}

class ErrorLogger {
  private sessionId: string
  private logs: ErrorLog[] = []
  private maxLogs = 100

  constructor() {
    this.sessionId = this.generateSessionId()
    this.setupGlobalErrorHandlers()
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  private setupGlobalErrorHandlers() {
    if (typeof window === 'undefined') return

    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        error: event.error?.message || event.message || 'Unknown error',
        stack: event.error?.stack,
        component: 'Global',
        action: 'Unhandled Error',
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      })
    })

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        error: event.reason?.message || String(event.reason) || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        component: 'Global',
        action: 'Unhandled Promise Rejection',
        metadata: {
          reason: event.reason
        }
      })
    })

    // Handle React errors (if available)
    if (typeof window !== 'undefined' && (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      const hook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
      if (hook.onCommitFiberRoot) {
        const originalOnCommitFiberRoot = hook.onCommitFiberRoot
        hook.onCommitFiberRoot = (id: any, root: any, priorityLevel: any) => {
          try {
            return originalOnCommitFiberRoot(id, root, priorityLevel)
          } catch (error: any) {
            this.logError({
              error: error.message || 'React commit error',
              stack: error.stack,
              component: 'React',
              action: 'Commit Fiber Root',
              metadata: { id, priorityLevel }
            })
            throw error
          }
        }
      }
    }
  }

  logError(params: {
    error: string
    stack?: string
    component?: string
    action?: string
    metadata?: any
    userId?: string
  }) {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      error: params.error,
      stack: params.stack,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      userId: params.userId,
      sessionId: this.sessionId,
      component: params.component,
      action: params.action,
      metadata: params.metadata
    }

    // Add to local logs
    this.logs.unshift(errorLog)
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // Console logging with formatting
    console.group(`🚨 Error in ${params.component || 'Unknown'} - ${params.action || 'Unknown Action'}`)
    console.error('Error:', params.error)
    if (params.stack) {
      console.error('Stack:', params.stack)
    }
    console.error('URL:', errorLog.url)
    console.error('Timestamp:', errorLog.timestamp)
    console.error('Session ID:', this.sessionId)
    if (params.metadata) {
      console.error('Metadata:', params.metadata)
    }
    console.groupEnd()

    // Send to external logging service if available
    this.sendToExternalService(errorLog)
  }

  private async sendToExternalService(errorLog: ErrorLog) {
    try {
      // You can integrate with services like Sentry, LogRocket, etc.
      // For now, we'll just store locally and optionally send to a custom endpoint
      
      if (typeof window !== 'undefined' && window.localStorage) {
        const existingLogs = JSON.parse(localStorage.getItem('saintrix_error_logs') || '[]')
        existingLogs.unshift(errorLog)
        // Keep only last 50 logs in localStorage
        const trimmedLogs = existingLogs.slice(0, 50)
        localStorage.setItem('saintrix_error_logs', JSON.stringify(trimmedLogs))
      }

      // Optional: Send to custom logging endpoint
      // await fetch('/api/logs/error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorLog)
      // })
    } catch (error) {
      console.error('Failed to send error to external service:', error)
    }
  }

  logInfo(message: string, component?: string, metadata?: any) {
    console.log(`ℹ️ [${component || 'App'}] ${message}`, metadata || '')
  }

  logWarning(message: string, component?: string, metadata?: any) {
    console.warn(`⚠️ [${component || 'App'}] ${message}`, metadata || '')
  }

  logDebug(message: string, component?: string, metadata?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`🐛 [${component || 'App'}] ${message}`, metadata || '')
    }
  }

  getRecentLogs(count = 10): ErrorLog[] {
    return this.logs.slice(0, count)
  }

  clearLogs() {
    this.logs = []
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('saintrix_error_logs')
    }
  }

  getSessionId(): string {
    return this.sessionId
  }

  // Environment and system info for debugging
  getSystemInfo() {
    if (typeof window === 'undefined') return {}

    return {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      screen: {
        width: screen.width,
        height: screen.height
      },
      localStorage: !!window.localStorage,
      sessionStorage: !!window.sessionStorage,
      cookieEnabled: navigator.cookieEnabled,
      language: navigator.language,
      platform: navigator.platform,
      onLine: navigator.onLine
    }
  }
}

// Create global instance
export const errorLogger = new ErrorLogger()

// React hook for component-level error logging
export function useErrorLogger(componentName: string) {
  const logError = (error: Error | string, action?: string, metadata?: any) => {
    errorLogger.logError({
      error: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      component: componentName,
      action,
      metadata
    })
  }

  const logInfo = (message: string, metadata?: any) => {
    errorLogger.logInfo(message, componentName, metadata)
  }

  const logWarning = (message: string, metadata?: any) => {
    errorLogger.logWarning(message, componentName, metadata)
  }

  const logDebug = (message: string, metadata?: any) => {
    errorLogger.logDebug(message, componentName, metadata)
  }

  return {
    logError,
    logInfo,
    logWarning,
    logDebug,
    getSystemInfo: errorLogger.getSystemInfo,
    getRecentLogs: errorLogger.getRecentLogs
  }
}

// Higher-order component for automatic error logging
export function withErrorLogging<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) {
  const WrappedComponent = (props: P) => {
    const logger = useErrorLogger(componentName || Component.displayName || Component.name || 'Unknown')
    
    React.useEffect(() => {
      logger.logDebug('Component mounted')
      return () => {
        logger.logDebug('Component unmounted')
      }
    }, [logger])

    return <Component {...props} />
  }
  
  WrappedComponent.displayName = `withErrorLogging(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Debug panel component for development
export function DebugPanel() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [logs, setLogs] = React.useState<ErrorLog[]>([])

  React.useEffect(() => {
    if (isOpen) {
      setLogs(errorLogger.getRecentLogs(20))
    }
  }, [isOpen])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg z-50"
        title="Debug Panel"
      >
        🐛
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Debug Panel</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">System Info</h3>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(errorLogger.getSystemInfo(), null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Recent Errors ({logs.length})</h3>
                {logs.length === 0 ? (
                  <p className="text-gray-500">No errors logged</p>
                ) : (
                  <div className="space-y-2">
                    {logs.map((log, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded p-2">
                        <div className="text-sm font-medium text-red-800">
                          {log.component} - {log.action}
                        </div>
                        <div className="text-sm text-red-700">{log.error}</div>
                        <div className="text-xs text-red-600">{log.timestamp}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  errorLogger.clearLogs()
                  setLogs([])
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Clear Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default errorLogger

