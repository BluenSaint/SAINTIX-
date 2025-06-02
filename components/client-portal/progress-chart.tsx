"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3 } from "lucide-react"

interface ScoreHistory {
  date: string
  experian: number
  equifax: number
  transunion: number
}

interface ProgressChartProps {
  scoreHistory: ScoreHistory[]
}

export default function ProgressChart({ scoreHistory }: ProgressChartProps) {
  const maxScore = 850
  const minScore = 300
  const chartHeight = 200

  // Calculate the latest scores and improvements
  const latestData = scoreHistory[scoreHistory.length - 1]
  const firstData = scoreHistory[0]

  const improvements = {
    experian: latestData.experian - firstData.experian,
    equifax: latestData.equifax - firstData.equifax,
    transunion: latestData.transunion - firstData.transunion,
  }

  const totalImprovement = improvements.experian + improvements.equifax + improvements.transunion

  // Create SVG path for each bureau
  const createPath = (scores: number[], color: string) => {
    const points = scores
      .map((score, index) => {
        const x = (index / (scores.length - 1)) * 100
        const y = ((maxScore - score) / (maxScore - minScore)) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="drop-shadow-sm"
      />
    )
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
              <BarChart3 className="w-5 h-5 text-amber-600" />
            </div>
            Credit Score Progress
          </CardTitle>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1">
            <TrendingUp className="w-3 h-3 mr-1" />+{totalImprovement} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart */}
        <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100 mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-48" preserveAspectRatio="none">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Score lines */}
            {createPath(
              scoreHistory.map((d) => d.experian),
              "#3b82f6",
            )}
            {createPath(
              scoreHistory.map((d) => d.equifax),
              "#10b981",
            )}
            {createPath(
              scoreHistory.map((d) => d.transunion),
              "#8b5cf6",
            )}

            {/* Data points */}
            {scoreHistory.map((data, index) => {
              const x = (index / (scoreHistory.length - 1)) * 100
              const experianY = ((maxScore - data.experian) / (maxScore - minScore)) * 100
              const equifaxY = ((maxScore - data.equifax) / (maxScore - minScore)) * 100
              const transunionY = ((maxScore - data.transunion) / (maxScore - minScore)) * 100

              return (
                <g key={index}>
                  <circle cx={x} cy={experianY} r="2" fill="#3b82f6" className="drop-shadow-sm" />
                  <circle cx={x} cy={equifaxY} r="2" fill="#10b981" className="drop-shadow-sm" />
                  <circle cx={x} cy={transunionY} r="2" fill="#8b5cf6" className="drop-shadow-sm" />
                </g>
              )
            })}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-4 text-xs text-slate-500">
            {scoreHistory.map((data, index) => (
              <span key={index}>{data.date}</span>
            ))}
          </div>
        </div>

        {/* Legend and Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-blue-900">Experian</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{latestData.experian}</p>
            <p className="text-sm text-blue-600">+{improvements.experian} points</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-2xl border border-emerald-200/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-semibold text-emerald-900">Equifax</span>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{latestData.equifax}</p>
            <p className="text-sm text-emerald-600">+{improvements.equifax} points</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-2xl border border-purple-200/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-semibold text-purple-900">TransUnion</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">{latestData.transunion}</p>
            <p className="text-sm text-purple-600">+{improvements.transunion} points</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
