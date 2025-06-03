import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId, creditBureau, disputeType, creditReportData } = await request.json()

    // Validate required fields
    if (!userId || !creditBureau || !disputeType) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, creditBureau, disputeType' },
        { status: 400 }
      )
    }

    // Verify user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, full_name, email')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate AI dispute letter content (stub implementation)
    const disputeContent = generateDisputeContent({
      userFullName: user.full_name,
      creditBureau,
      disputeType,
      creditReportData
    })

    // Save dispute letter to database
    const { data: disputeLetter, error: disputeError } = await supabaseAdmin
      .from('dispute_letters')
      .insert({
        user_id: userId,
        credit_bureau: creditBureau,
        type: disputeType,
        status: 'draft',
        generated_by: 'ai',
        content: disputeContent
      })
      .select()
      .single()

    if (disputeError) {
      console.error('Error saving dispute letter:', disputeError)
      return NextResponse.json(
        { error: 'Failed to save dispute letter' },
        { status: 500 }
      )
    }

    // Log AI usage
    await supabaseAdmin
      .from('ai_logs')
      .insert({
        user_id: userId,
        intent: 'dispute_generation',
        input_data: {
          credit_bureau: creditBureau,
          dispute_type: disputeType,
          has_credit_data: !!creditReportData
        },
        response: {
          dispute_id: disputeLetter.id,
          content_length: disputeContent.length,
          status: 'success'
        }
      })

    return NextResponse.json({
      success: true,
      disputeLetter,
      message: 'AI dispute letter generated successfully'
    })

  } catch (error) {
    console.error('AI dispute generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateDisputeContent({
  userFullName,
  creditBureau,
  disputeType,
  creditReportData
}: {
  userFullName: string
  creditBureau: string
  disputeType: string
  creditReportData?: any
}): string {
  // This is a stub implementation. In a real application, you would:
  // 1. Use an AI service like OpenAI GPT-4 to generate personalized content
  // 2. Analyze the credit report data to identify specific issues
  // 3. Generate legally compliant dispute language
  
  const currentDate = new Date().toLocaleDateString()
  
  const templates = {
    'inaccurate_information': `
Dear ${creditBureau} Dispute Department,

I am writing to dispute inaccurate information on my credit report. Under the Fair Credit Reporting Act (FCRA), I have the right to dispute incomplete or inaccurate information.

After reviewing my credit report dated ${currentDate}, I have identified the following inaccuracies that require immediate correction:

[SPECIFIC ITEMS TO BE IDENTIFIED FROM CREDIT REPORT DATA]

I am requesting that you investigate these items and remove or correct the inaccurate information within 30 days as required by law.

Please provide me with written confirmation of the results of your investigation and any changes made to my credit report.

Sincerely,
${userFullName}

Date: ${currentDate}
    `.trim(),
    
    'identity_theft': `
Dear ${creditBureau} Fraud Department,

I am writing to report fraudulent accounts and activities on my credit report that are the result of identity theft.

I have discovered unauthorized accounts and inquiries on my credit report that I did not open or authorize. These fraudulent items are negatively impacting my credit score and financial standing.

The fraudulent items include:
[SPECIFIC FRAUDULENT ITEMS TO BE IDENTIFIED]

I am requesting that you:
1. Place a fraud alert on my credit file
2. Remove all fraudulent accounts and inquiries
3. Provide me with a corrected credit report

Enclosed please find a copy of my identity theft report and supporting documentation.

Sincerely,
${userFullName}

Date: ${currentDate}
    `.trim(),
    
    'outdated_information': `
Dear ${creditBureau} Dispute Department,

I am writing to dispute outdated information on my credit report that should be removed according to the Fair Credit Reporting Act.

The following items have exceeded the maximum reporting period and should be removed from my credit report:

[SPECIFIC OUTDATED ITEMS TO BE IDENTIFIED]

Under the FCRA, most negative information should be removed after 7 years, and bankruptcies after 10 years. I request that you remove these time-barred items immediately.

Please confirm in writing that these items have been removed from my credit report.

Sincerely,
${userFullName}

Date: ${currentDate}
    `.trim()
  }

  return templates[disputeType as keyof typeof templates] || templates['inaccurate_information']
}
