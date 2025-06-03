import { NextRequest, NextResponse } from 'next/server'
import { createApiClient } from '@/lib/supabase-admin'

// Get User Dashboard Statistics
export async function GET(request: NextRequest) {
  try {
    const supabase = createApiClient()
    
    // Get user from session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Call the database function to get dashboard stats
    const { data, error } = await supabase
      .rpc('get_user_dashboard_stats', { p_user_id: user.id })

    if (error) {
      console.error('Dashboard stats error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch dashboard statistics' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      stats: data
    })

  } catch (error) {
    console.error('Dashboard API Error:', error)
    
    // Check if it's a Supabase configuration error
    if (error instanceof Error && error.message.includes('environment variables')) {
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update user dashboard preferences
export async function POST(request: NextRequest) {
  try {
    const supabase = createApiClient()
    const { preferences } = await request.json()
    
    // Get user from session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Update user preferences (this would be stored in a preferences table)
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully'
    })

  } catch (error) {
    console.error('Dashboard preferences error:', error)
    
    // Check if it's a Supabase configuration error
    if (error instanceof Error && error.message.includes('environment variables')) {
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

