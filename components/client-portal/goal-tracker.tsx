"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, Edit, Star } from "lucide-react"

interface GoalTrackerProps {
  currentScore: number
  targetScore: number
  targetDate: string
  progress: number
}

export default function GoalTracker({ currentScore, targetScore, targetDate, progress }: GoalTrackerProps) {
  const pointsNeeded = targetScore - currentScore
  const monthsRemaining = Math.ceil(
    (new Date(targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30),
  )
  const pointsPerMonth = Math.ceil(pointsNeeded / monthsRemaining)

  const getScoreCategory = (score: number) => {
    if (score >= 800) return { label: "Exceptional", color: "emerald", icon: "🏆" }
    if (score >= 740) return { label: "Very Good", color: "blue", icon: "⭐" }
    if (score >= 670) return { label: "Good", color: "green", icon: "👍" }
    if (score >= 580) return { label: "Fair", color: "yellow", icon: "📈" }
    return { label: "Poor", color: "red", icon: "📉" }
  }

  const currentCategory = getScoreCategory(currentScore)
  const targetCategory = getScoreCategory(targetScore)

  return (
    <Card className="bg-gradient-to-br from-amber-50 via-white to-orange-50/30 border border-amber-200/50 shadow-xl rounded-3xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
              <Target className="w-5 h-5 text-amber-600" />
            </div>
            Credit Score Goal
          </CardTitle>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Edit className="w-4 h-4 mr-2" />
            Edit Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Progress to Goal</p>
              <p className="text-3xl font-bold text-amber-800">{progress}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-700 mb-1">Target Date</p>
              <p className="text-lg font-bold text-slate-900">{new Date(targetDate).toLocaleDateString()}</p>
              <p className="text-xs text-slate-500">{monthsRemaining} months remaining</p>
            </div>
          </div>

          <Progress value={progress} className="h-3 mb-4" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Current: {currentScore}</span>
            <span className="text-slate-600">Target: {targetScore}</span>
          </div>
        </div>

        {/* Score Categories */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{currentCategory.icon}</span>
              <div>
                <p className="font-semibold text-slate-900">Current Score</p>
                <p className="text-sm text-slate-600">{currentCategory.label}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{currentScore}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200/50">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{targetCategory.icon}</span>
              <div>
                <p className="font-semibold text-emerald-900">Target Score</p>
                <p className="text-sm text-emerald-700">{targetCategory.label}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{targetScore}</p>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            Your Action Plan
          </h4>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{pointsNeeded}</p>
              <p className="text-xs text-slate-600">Points Needed</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{pointsPerMonth}</p>
              <p className="text-xs text-slate-600">Points/Month</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{monthsRemaining}</p>
              <p className="text-xs text-slate-600">Months Left</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-emerald-800">Continue disputing negative items</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-800">Keep credit utilization below 30%</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-purple-800">Make all payments on time</span>
            </div>
          </div>
        </div>

        {/* Benefits of Reaching Goal */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200/50">
          <h4 className="font-bold text-emerald-900 mb-4">Benefits of Reaching {targetScore}</h4>
          <div className="space-y-2 text-sm text-emerald-800">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Qualify for the best credit cards with rewards</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Get approved for mortgages with lowest rates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Save thousands on auto loans and insurance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Access to premium financial products</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
