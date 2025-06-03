'use client'

import { NextResponse } from 'next/server'

export default function EnvironmentError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuration Error</h1>
          <p className="text-gray-600 mb-6">
            The application is not properly configured. Please contact the administrator.
          </p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold text-red-800 mb-2">For Administrators:</h2>
          <ul className="text-xs text-red-700 text-left space-y-1">
            <li>• Check Vercel environment variables</li>
            <li>• Verify Supabase configuration</li>
            <li>• Review deployment logs</li>
            <li>• Run environment validation script</li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
          <a 
            href="mailto:support@saintrix.com" 
            className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Contact Support
          </a>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Error Code: ENV_CONFIG_ERROR
          </p>
        </div>
      </div>
    </div>
  )
}

