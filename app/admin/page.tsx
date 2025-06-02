"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Brain,
  Zap,
  Bell,
  Calendar,
  BarChart3,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Complete platform oversight and control</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">2,847</div>
            <p className="text-xs text-blue-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Active Disputes</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">1,234</div>
            <p className="text-xs text-green-600">87% success rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Avg Score Increase</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">+127</div>
            <p className="text-xs text-orange-600">points in 90 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">$487K</div>
            <p className="text-xs text-purple-600">+23% growth</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Automation Status */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-orange-900">Saintrix Takeover Status</CardTitle>
                <p className="text-sm text-orange-700">AI automation is actively managing 1,847 clients</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl font-bold text-slate-900">47</div>
              <p className="text-sm text-slate-600">Letters generated today</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl font-bold text-slate-900">23</div>
              <p className="text-sm text-slate-600">Responses processed</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl font-bold text-slate-900">156</div>
              <p className="text-sm text-slate-600">Items flagged for review</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                Priority Alerts
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-orange-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-red-900">Payment Failed</p>
                <p className="text-sm text-red-700">Sarah Johnson's card was declined</p>
                <p className="text-xs text-red-600 mt-1">2 minutes ago</p>
              </div>
              <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                Retry
              </Button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-amber-900">Dispute Deadline</p>
                <p className="text-sm text-amber-700">3 disputes approaching 30-day mark</p>
                <p className="text-xs text-amber-600 mt-1">Due in 2 days</p>
              </div>
              <Button size="sm" variant="outline" className="text-amber-600 border-amber-200">
                Review
              </Button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-green-900">Dispute Resolved</p>
                <p className="text-sm text-green-700">Mike Chen - Experian item removed</p>
                <p className="text-xs text-green-600 mt-1">1 hour ago</p>
              </div>
              <Button size="sm" variant="outline" className="text-green-600 border-green-200">
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Bureau Response Review</p>
                <p className="text-sm text-slate-600">Process 23 Equifax responses</p>
              </div>
              <span className="text-sm text-slate-500">10:00 AM</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Client Check-in</p>
                <p className="text-sm text-slate-600">Weekly progress calls</p>
              </div>
              <span className="text-sm text-slate-500">2:00 PM</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">AI Model Review</p>
                <p className="text-sm text-slate-600">Weekly performance analysis</p>
              </div>
              <span className="text-sm text-slate-500">4:00 PM</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dispute Success Rate</CardTitle>
            <p className="text-sm text-slate-600">Last 30 days by bureau</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Experian</span>
                <span className="font-medium">89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Equifax</span>
                <span className="font-medium">84%</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>TransUnion</span>
                <span className="font-medium">91%</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Distribution</CardTitle>
            <p className="text-sm text-slate-600">By plan tier</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Basic ($89)</span>
                <span className="font-medium">1,247 clients</span>
              </div>
              <Progress value={44} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Advanced ($149)</span>
                <span className="font-medium">1,156 clients</span>
              </div>
              <Progress value={41} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Elite ($249)</span>
                <span className="font-medium">444 clients</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
