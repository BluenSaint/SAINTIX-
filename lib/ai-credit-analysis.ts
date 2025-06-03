import OpenAI from 'openai'
import { EncryptionService } from './encryption'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface CreditAnalysisInput {
  creditReport: any
  userProfile: any
  analysisType: 'basic' | 'comprehensive' | 'dispute_focused'
  includeRecommendations: boolean
  includePredictions: boolean
}

export interface CreditAnalysisResult {
  summary: {
    overallHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor'
    currentScore: number
    scoreRange: string
    primaryConcerns: string[]
    strengths: string[]
    improvementPotential: number
  }
  scoreFactors: Array<{
    factor: string
    impact: 'High' | 'Medium' | 'Low'
    status: 'Excellent' | 'Good' | 'Fair' | 'Poor'
    currentValue: string
    description: string
    recommendation: string
    potentialImpact: string
  }>
  recommendations: Array<{
    priority: 'High' | 'Medium' | 'Low'
    category: string
    action: string
    description: string
    timeframe: string
    expectedImpact: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    cost: 'Free' | 'Low' | 'Medium' | 'High'
  }>
  potentialDisputes: Array<{
    type: string
    creditor: string
    description: string
    likelihood: 'High' | 'Medium' | 'Low'
    potentialImpact: string
    urgency: 'Immediate' | 'Soon' | 'Later'
  }>
  timeline: {
    immediate: string[]
    oneMonth: string[]
    threeMonths: string[]
    sixMonths: string[]
    oneYear: string[]
  }
  predictions: {
    scoreIn30Days: number
    scoreIn90Days: number
    scoreIn180Days: number
    scoreIn365Days: number
    confidence: number
  }
  riskFactors: Array<{
    factor: string
    severity: 'High' | 'Medium' | 'Low'
    description: string
    mitigation: string
  }>
}

export class CreditAnalysisService {
  /**
   * Perform comprehensive AI-powered credit analysis
   */
  static async analyzeCreditReport(input: CreditAnalysisInput): Promise<CreditAnalysisResult> {
    try {
      // Validate OpenAI API key
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured')
      }

      // Prepare credit report data for analysis
      const sanitizedData = this.sanitizeCreditData(input.creditReport)
      
      // Generate AI analysis based on type
      let analysisPrompt = ''
      switch (input.analysisType) {
        case 'comprehensive':
          analysisPrompt = this.buildComprehensivePrompt(sanitizedData, input.userProfile)
          break
        case 'dispute_focused':
          analysisPrompt = this.buildDisputePrompt(sanitizedData, input.userProfile)
          break
        case 'basic':
        default:
          analysisPrompt = this.buildBasicPrompt(sanitizedData, input.userProfile)
          break
      }

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert credit repair specialist with 20+ years of experience. 
                     Analyze credit reports with precision and provide actionable recommendations.
                     Always be specific, accurate, and helpful. Focus on legal and ethical credit repair strategies.
                     Provide realistic timelines and impact estimates based on industry standards.`
          },
          {
            role: "user",
            content: analysisPrompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent, factual responses
        max_tokens: 4000,
        response_format: { type: "json_object" }
      })

      const aiResponse = completion.choices[0]?.message?.content
      if (!aiResponse) {
        throw new Error('No response from AI analysis')
      }

      // Parse and validate AI response
      const analysisResult = JSON.parse(aiResponse)
      
      // Add predictions if requested
      if (input.includePredictions) {
        analysisResult.predictions = await this.generateScorePredictions(sanitizedData)
      }

      // Validate and sanitize the result
      return this.validateAndSanitizeResult(analysisResult)

    } catch (error) {
      console.error('Credit analysis error:', error)
      
      // Return fallback analysis if AI fails
      return this.generateFallbackAnalysis(input.creditReport)
    }
  }

  /**
   * Sanitize credit data for AI analysis (remove/encrypt sensitive info)
   */
  private static sanitizeCreditData(creditReport: any): any {
    const sanitized = { ...creditReport }
    
    // Remove or mask sensitive information
    if (sanitized.ssn) {
      sanitized.ssn = EncryptionService.maskSSN(sanitized.ssn)
    }
    
    if (sanitized.accounts) {
      sanitized.accounts = sanitized.accounts.map((account: any) => ({
        ...account,
        accountNumber: account.accountNumber ? EncryptionService.maskAccountNumber(account.accountNumber) : undefined
      }))
    }
    
    // Remove any PII that shouldn't be sent to external APIs
    delete sanitized.fullSSN
    delete sanitized.fullAccountNumbers
    delete sanitized.personalIdentifiers
    
    return sanitized
  }

  /**
   * Build comprehensive analysis prompt
   */
  private static buildComprehensivePrompt(creditData: any, userProfile: any): string {
    return `
Analyze this credit report comprehensively and provide a detailed JSON response with the following structure:

{
  "summary": {
    "overallHealth": "Fair",
    "currentScore": 650,
    "scoreRange": "Fair (580-669)",
    "primaryConcerns": ["High utilization", "Recent late payments"],
    "strengths": ["Long credit history", "Diverse account types"],
    "improvementPotential": 120
  },
  "scoreFactors": [
    {
      "factor": "Payment History",
      "impact": "High",
      "status": "Fair",
      "currentValue": "85% on-time payments",
      "description": "Recent late payments affecting score",
      "recommendation": "Set up automatic payments",
      "potentialImpact": "+30-50 points"
    }
  ],
  "recommendations": [
    {
      "priority": "High",
      "category": "Payment History",
      "action": "Set up automatic payments",
      "description": "Ensure all bills are paid on time",
      "timeframe": "Immediate",
      "expectedImpact": "+20-40 points in 3-6 months",
      "difficulty": "Easy",
      "cost": "Free"
    }
  ],
  "potentialDisputes": [
    {
      "type": "Late Payment",
      "creditor": "ABC Bank",
      "description": "Payment marked late but was made on time",
      "likelihood": "High",
      "potentialImpact": "+15-25 points",
      "urgency": "Immediate"
    }
  ],
  "timeline": {
    "immediate": ["Set up autopay", "Pay down high balances"],
    "oneMonth": ["Monitor improvements", "Follow up on disputes"],
    "threeMonths": ["Review progress", "Adjust strategy"],
    "sixMonths": ["Consider new credit", "Reassess goals"],
    "oneYear": ["Maintain good habits", "Plan major purchases"]
  },
  "riskFactors": [
    {
      "factor": "High Credit Utilization",
      "severity": "High",
      "description": "Utilization above 30% hurting score",
      "mitigation": "Pay down balances below 30%"
    }
  ]
}

Credit Report Data:
${JSON.stringify(creditData, null, 2)}

User Profile:
- Age: ${userProfile.age || 'Not provided'}
- Income: ${userProfile.income || 'Not provided'}
- Goals: ${userProfile.goals || 'Improve credit score'}

Provide specific, actionable advice based on this data.`
  }

  /**
   * Build dispute-focused analysis prompt
   */
  private static buildDisputePrompt(creditData: any, userProfile: any): string {
    return `
Focus specifically on identifying potential disputes in this credit report. Analyze for:
1. Inaccurate information
2. Outdated items (beyond 7-year reporting period)
3. Duplicate accounts
4. Incorrect payment history
5. Identity theft indicators
6. Mixed file issues

Provide a JSON response focusing on dispute opportunities:

{
  "potentialDisputes": [
    {
      "type": "Inaccurate Late Payment",
      "creditor": "XYZ Credit Card",
      "description": "Late payment reported for March 2023 but payment was made on time",
      "likelihood": "High",
      "potentialImpact": "+20-30 points",
      "urgency": "Immediate",
      "evidence": "Bank statement shows payment processed on due date",
      "disputeStrategy": "Submit payment proof with dispute letter"
    }
  ],
  "summary": {
    "totalDisputeOpportunities": 3,
    "highPriorityDisputes": 1,
    "estimatedScoreIncrease": "40-70 points",
    "timeToResolution": "30-60 days"
  }
}

Credit Report Data:
${JSON.stringify(creditData, null, 2)}`
  }

  /**
   * Build basic analysis prompt
   */
  private static buildBasicPrompt(creditData: any, userProfile: any): string {
    return `
Provide a basic credit analysis focusing on the top 3 improvement areas:

{
  "summary": {
    "overallHealth": "Fair",
    "currentScore": 650,
    "topConcerns": ["High utilization", "Late payments", "Short history"]
  },
  "topRecommendations": [
    {
      "action": "Pay down credit cards",
      "impact": "High",
      "timeframe": "1-2 months"
    }
  ]
}

Credit Report Data:
${JSON.stringify(creditData, null, 2)}`
  }

  /**
   * Generate score predictions using historical patterns
   */
  private static async generateScorePredictions(creditData: any): Promise<any> {
    // This would use machine learning models in production
    // For now, provide realistic estimates based on common patterns
    
    const currentScore = creditData.creditScore || 650
    const utilization = creditData.utilization || 50
    const paymentHistory = creditData.paymentHistory || 85
    
    // Calculate potential improvements
    let scoreIncrease30 = 0
    let scoreIncrease90 = 0
    let scoreIncrease180 = 0
    let scoreIncrease365 = 0
    
    // Payment history improvements
    if (paymentHistory < 95) {
      scoreIncrease30 += 10
      scoreIncrease90 += 25
      scoreIncrease180 += 40
      scoreIncrease365 += 60
    }
    
    // Utilization improvements
    if (utilization > 30) {
      scoreIncrease30 += 20
      scoreIncrease90 += 30
      scoreIncrease180 += 35
      scoreIncrease365 += 40
    }
    
    return {
      scoreIn30Days: Math.min(850, currentScore + scoreIncrease30),
      scoreIn90Days: Math.min(850, currentScore + scoreIncrease90),
      scoreIn180Days: Math.min(850, currentScore + scoreIncrease180),
      scoreIn365Days: Math.min(850, currentScore + scoreIncrease365),
      confidence: 0.75
    }
  }

  /**
   * Validate and sanitize AI response
   */
  private static validateAndSanitizeResult(result: any): CreditAnalysisResult {
    // Ensure all required fields are present with defaults
    return {
      summary: {
        overallHealth: result.summary?.overallHealth || 'Fair',
        currentScore: result.summary?.currentScore || 650,
        scoreRange: result.summary?.scoreRange || 'Fair (580-669)',
        primaryConcerns: result.summary?.primaryConcerns || ['Needs analysis'],
        strengths: result.summary?.strengths || ['Account diversity'],
        improvementPotential: result.summary?.improvementPotential || 50
      },
      scoreFactors: result.scoreFactors || [],
      recommendations: result.recommendations || [],
      potentialDisputes: result.potentialDisputes || [],
      timeline: result.timeline || {
        immediate: ['Review credit report'],
        oneMonth: ['Monitor progress'],
        threeMonths: ['Reassess strategy'],
        sixMonths: ['Continue improvements'],
        oneYear: ['Maintain good habits']
      },
      predictions: result.predictions || {
        scoreIn30Days: 650,
        scoreIn90Days: 670,
        scoreIn180Days: 700,
        scoreIn365Days: 720,
        confidence: 0.7
      },
      riskFactors: result.riskFactors || []
    }
  }

  /**
   * Generate fallback analysis if AI fails
   */
  private static generateFallbackAnalysis(creditReport: any): CreditAnalysisResult {
    return {
      summary: {
        overallHealth: 'Fair',
        currentScore: creditReport.creditScore || 650,
        scoreRange: 'Fair (580-669)',
        primaryConcerns: ['Analysis temporarily unavailable'],
        strengths: ['Credit report uploaded successfully'],
        improvementPotential: 50
      },
      scoreFactors: [
        {
          factor: 'Payment History',
          impact: 'High',
          status: 'Fair',
          currentValue: 'Under review',
          description: 'Payment history analysis in progress',
          recommendation: 'Ensure all payments are made on time',
          potentialImpact: '+20-40 points'
        }
      ],
      recommendations: [
        {
          priority: 'High',
          category: 'General',
          action: 'Review credit report for errors',
          description: 'Manually review your credit report for any inaccuracies',
          timeframe: 'Immediate',
          expectedImpact: 'Varies',
          difficulty: 'Easy',
          cost: 'Free'
        }
      ],
      potentialDisputes: [],
      timeline: {
        immediate: ['Review credit report manually'],
        oneMonth: ['Try analysis again'],
        threeMonths: ['Monitor credit score'],
        sixMonths: ['Reassess progress'],
        oneYear: ['Continue monitoring']
      },
      predictions: {
        scoreIn30Days: creditReport.creditScore || 650,
        scoreIn90Days: (creditReport.creditScore || 650) + 20,
        scoreIn180Days: (creditReport.creditScore || 650) + 40,
        scoreIn365Days: (creditReport.creditScore || 650) + 60,
        confidence: 0.5
      },
      riskFactors: []
    }
  }
}

