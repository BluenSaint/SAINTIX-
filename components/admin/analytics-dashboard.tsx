"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Target, Calendar, Download, RefreshCw } from "lucide-react"

interface AnalyticsDashboardProps {
  stats: {
    totalClients: number
    activeDisputes: number
    monthlyRevenue: number
    avgScoreIncrease: number
    newClientsThisMonth: number
    resolvedDisputes: number
    clientRetention: number
    teamMembers: number
  }
}

export default function AnalyticsDashboard({ stats }: AnalyticsDashboardProps) {
  const monthlyData = [
    { month: "Jan", revenue: 180000, clients: 45, disputes: 120 },
    { month: "Feb", revenue: 195000, clients: 52, disputes: 135 },
    { month: "Mar", revenue: 210000, clients: 48, disputes: 142 },
    { month: "Apr", revenue: 224800, clients: 34, disputes: 156 },
  ]

  const scoreDistribution = [
    { range: "300-579", count: 89, percentage: 7.1 },
    { range: "580-669", count: 312, percentage: 25.0 },
    { range: "670-739", count: 498, percentage: 39.9 },
    { range: "740-799", count: 267, percentage: 21.4 },
    { range: "800-850", count: 81, percentage: 6.5 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h3>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
            </div>
            Revenue Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chart visualization */}
            <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-end justify-between h-64 gap-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg mb-2 transition-all duration-1000 ease-out"
                      style={{ height: `${(data.revenue / 250000) * 100}%` }}
                    ></div>
                    <span className="text-sm font-medium text-slate-700">{data.month}</span>
                    <span className="text-xs text-slate-500">${(data.revenue / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-2xl border border-emerald-200/50">
                <p className="text-sm font-semibold text-emerald-700 mb-1">This Month</p>
                <p className="text-2xl font-bold text-emerald-800">${stats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-emerald-600">+12.5% from last month</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200/50">
                <p className="text-sm font-semibold text-blue-700 mb-1">Avg per Client</p>
                <p className="text-2xl font-bold text-blue-800">
                  ${Math.round(stats.monthlyRevenue / stats.totalClients)}
                </p>
                <p className="text-xs text-blue-600">Monthly revenue</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-2xl border border-purple-200/50">
                <p className="text-sm font-semibold text-purple-700 mb-1">Growth Rate</p>
                <p className="text-2xl font-bold text-purple-800">12.5%</p>
                <p className="text-xs text-purple-600">Month over month</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-2xl border border-amber-200/50">
                <p className="text-sm font-semibold text-amber-700 mb-1">Retention</p>
                <p className="text-2xl font-bold text-amber-800">{stats.clientRetention}%</p>
                <p className="text-xs text-amber-600">Client retention rate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Distribution */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            Credit Score Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scoreDistribution.map((range, index) => (
              <div key={range.range} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium text-slate-700">{range.range}</div>
                <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      index === 0
                        ? "bg-gradient-to-r from-red-400 to-red-500"
                        : index === 1
                          ? "bg-gradient-to-r from-amber-400 to-amber-500"
                          : index === 2
                            ? "bg-gradient-to-r from-blue-400 to-blue-500"
                            : index === 3
                              ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                              : "bg-gradient-to-r from-purple-400 to-purple-500"
                    }`}
                    style={{ width: `${range.percentage}%` }}
                  ></div>
                </div>
                <div className="w-16 text-sm font-medium text-slate-700">{range.count}</div>
                <div className="w-12 text-sm text-slate-500">{range.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="font-medium text-slate-700">Avg Score Increase</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  +{stats.avgScoreIncrease} points
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="font-medium text-slate-700">Dispute Success Rate</span>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">87.3%</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="font-medium text-slate-700">Avg Resolution Time</span>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">28 days</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="font-medium text-slate-700">Client Satisfaction</span>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">4.8/5.0</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              Recent Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-emerald-800">1000+ Clients Milestone</p>
                  <p className="text-sm text-emerald-600">Reached 1,247 total clients</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-blue-800">$200k Monthly Revenue</p>
                  <p className="text-sm text-blue-600">Exceeded monthly revenue target</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-purple-800">500+ Disputes Resolved</p>
                  <p className="text-sm text-purple-600">This quarter achievement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
