"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface CreditScoreWidgetProps {
  currentScore: number
  previousScore: number
  bureau: string
  lastUpdated: string
}

export default function CreditScoreWidget({
  currentScore,
  previousScore,
  bureau,
  lastUpdated,
}: CreditScoreWidgetProps) {
  const scoreChange = currentScore - previousScore
  const isPositive = scoreChange > 0
  const scoreColor =
    currentScore >= 740
      ? "text-emerald-600"
      : currentScore >= 670
        ? "text-blue-600"
        : currentScore >= 580
          ? "text-amber-600"
          : "text-red-600"

  const bgColor =
    currentScore >= 740
      ? "from-emerald-50 to-emerald-100/50 border-emerald-200/50"
      : currentScore >= 670
        ? "from-blue-50 to-blue-100/50 border-blue-200/50"
        : currentScore >= 580
          ? "from-amber-50 to-amber-100/50 border-amber-200/50"
          : "from-red-50 to-red-100/50 border-red-200/50"

  return (
    <Card className={`bg-gradient-to-br ${bgColor} shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-slate-900">{bureau}</CardTitle>
          <Badge variant="outline" className="text-xs bg-white/60 backdrop-blur-sm">
            {lastUpdated}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-4xl font-bold ${scoreColor} mb-2`}>{currentScore}</div>
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-semibold ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}
                {scoreChange} pts
              </span>
            </div>
          </div>
          <div className="w-20 h-20 relative">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={
                  currentScore >= 740
                    ? "#10b981"
                    : currentScore >= 670
                      ? "#3b82f6"
                      : currentScore >= 580
                        ? "#f59e0b"
                        : "#ef4444"
                }
                strokeWidth="3"
                strokeDasharray={`${(currentScore / 850) * 100}, 100`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
