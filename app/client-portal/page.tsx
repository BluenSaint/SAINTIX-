"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Upload,
  Bell,
  Settings,
  CreditCard,
  Target,
  Calendar,
  BarChart3,
  Zap,
  ArrowRight,
  Search,
  Home,
  PieChart,
  HelpCircle,
  Phone,
  FileCodeIcon as FileContract,
  ArrowUp,
  FileIcon as FilePdf,
} from "lucide-react"

// Mock client data
const clientData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "(555) 123-4567",
  memberSince: "October 2023",
  plan: "Advanced",
  nextBilling: "February 15, 2024",
  totalPaid: "$540",
  creditScores: {
    experian: { current: 687, previous: 642, lastUpdated: "2 days ago" },
    equifax: { current: 693, previous: 651, lastUpdated: "3 days ago" },
    transunion: { current: 679, previous: 638, lastUpdated: "1 day ago" },
  },
  scoreHistory: [
    { month: "Oct", score: 558 },
    { month: "Nov", score: 602 },
    { month: "Dec", score: 645 },
    { month: "Jan", score: 686 },
  ],
  goals: {
    targetScore: 750,
    targetDate: "2024-06-01",
    currentProgress: 68,
  },
  disputes: [
    {
      id: 1,
      account: "Capital One Collection",
      bureau: "Experian",
      status: "In Review",
      filed: "2024-01-15",
      type: "Collection Account",
      amount: "$1,234",
      priority: "high",
    },
    {
      id: 2,
      account: "Medical Collection - $234",
      bureau: "Equifax",
      status: "Pending Response",
      filed: "2024-01-12",
      type: "Medical Collection",
      amount: "$234",
      priority: "medium",
    },
  ],
  recentActivity: [
    {
      date: "2024-01-20",
      action: "Dispute filed for Capital One Collection",
      description: "Dispute submitted to all three credit bureaus",
      type: "dispute",
      impact: "+15 pts",
    },
    {
      date: "2024-01-18",
      action: "Credit score updated - Experian +5 points",
      description: "Positive change from previous month",
      type: "score",
      impact: "+5 pts",
    },
    {
      date: "2024-01-15",
      action: "Document uploaded: Bank statement",
      description: "Statement for account verification",
      type: "document",
      impact: null,
    },
    {
      date: "2024-01-12",
      action: "Consultation call scheduled",
      description: "30 minute session with credit specialist",
      type: "appointment",
      impact: null,
    },
  ],
}

export default function ClientPortal() {
  const [activeNav, setActiveNav] = useState("dashboard")

  const averageScore = Math.round(
    (clientData.creditScores.experian.current +
      clientData.creditScores.equifax.current +
      clientData.creditScores.transunion.current) /
      3,
  )

  const totalIncrease =
    clientData.creditScores.experian.current -
    clientData.creditScores.experian.previous +
    (clientData.creditScores.equifax.current - clientData.creditScores.equifax.previous) +
    (clientData.creditScores.transunion.current - clientData.creditScores.transunion.previous)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "dispute":
        return <FileContract className="w-5 h-5" />
      case "score":
        return <ArrowUp className="w-5 h-5" />
      case "document":
        return <FilePdf className="w-5 h-5" />
      case "appointment":
        return <Phone className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getActivityIconBg = (type: string) => {
    switch (type) {
      case "dispute":
        return "bg-red-100 text-red-600"
      case "score":
        return "bg-emerald-100 text-emerald-600"
      case "document":
        return "bg-blue-100 text-blue-600"
      case "appointment":
        return "bg-amber-100 text-amber-600"
      default:
        return "bg-slate-100 text-slate-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white fixed h-full z-50 shadow-2xl">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
              SAINTRIX
            </h1>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { id: "dashboard", icon: Home, label: "Dashboard" },
              { id: "scores", icon: CreditCard, label: "Credit Scores" },
              { id: "disputes", icon: FileText, label: "Disputes" },
              { id: "reports", icon: PieChart, label: "Reports" },
              { id: "documents", icon: Upload, label: "Documents" },
              { id: "settings", icon: Settings, label: "Settings" },
              { id: "support", icon: HelpCircle, label: "Support" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeNav === item.id
                      ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl border-b border-orange-100/50 shadow-sm sticky top-0 z-40">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input placeholder="Search..." className="pl-12 w-80 bg-slate-50/50 border-slate-200 rounded-full" />
              </div>

              <div className="flex items-center gap-6">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">SJ</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{clientData.name}</p>
                    <p className="text-xs text-slate-500">{clientData.plan} Plan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Welcome Section */}
          <div className="mb-8 relative">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Good morning, {clientData.name.split(" ")[0]}! 👋
                </h1>
              </div>
              <p className="text-xl text-slate-700">
                Your credit score improved by <span className="font-bold text-orange-600">+{totalIncrease} points</span>{" "}
                this month. Keep up the great work!
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-200/50 rounded-2xl">
                    <BarChart3 className="w-6 h-6 text-orange-700" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    <ArrowUp className="w-3 h-3 mr-1" />+{totalIncrease}
                  </Badge>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold text-sm mb-1">Average Score</p>
                  <p className="text-4xl font-bold text-orange-800">{averageScore}</p>
                  <p className="text-xs text-orange-600 mt-1">+{totalIncrease} this month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-200/50 rounded-2xl">
                    <Target className="w-6 h-6 text-purple-700" />
                  </div>
                </div>
                <div>
                  <p className="text-purple-700 font-semibold text-sm mb-1">Goal Progress</p>
                  <p className="text-4xl font-bold text-purple-800">{clientData.goals.currentProgress}%</p>
                  <p className="text-xs text-purple-600 mt-1">Target: {clientData.goals.targetScore}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-200/50 rounded-2xl">
                    <FileContract className="w-6 h-6 text-red-700" />
                  </div>
                </div>
                <div>
                  <p className="text-red-700 font-semibold text-sm mb-1">Active Disputes</p>
                  <p className="text-4xl font-bold text-red-800">{clientData.disputes.length}</p>
                  <p className="text-xs text-red-600 mt-1">2 in review</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-200/50 rounded-2xl">
                    <Calendar className="w-6 h-6 text-emerald-700" />
                  </div>
                </div>
                <div>
                  <p className="text-emerald-700 font-semibold text-sm mb-1">Program Days</p>
                  <p className="text-4xl font-bold text-emerald-800">67</p>
                  <p className="text-xs text-emerald-600 mt-1">Advanced plan</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Credit Score Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Score Progress Chart */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                        <BarChart3 className="w-5 h-5 text-amber-600" />
                      </div>
                      Credit Score Progress
                    </CardTitle>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      View Report
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Simple chart visualization */}
                  <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100 mb-6">
                    <div className="flex items-end justify-between h-48 gap-4">
                      {clientData.scoreHistory.map((data, index) => (
                        <div key={data.month} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg mb-2 transition-all duration-1000 ease-out"
                            style={{ height: `${((data.score - 500) / 300) * 100}%` }}
                          ></div>
                          <span className="text-sm font-medium text-slate-700">{data.month}</span>
                          <span className="text-xs text-slate-500">{data.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bureau Scores */}
            <div>
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Bureau Scores</CardTitle>
                    <Button variant="ghost" size="sm" className="text-orange-600">
                      Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="text-center">
                        <p className="text-sm text-blue-700 font-medium mb-2">Experian</p>
                        <p className="text-3xl font-bold text-blue-800 mb-1">
                          {clientData.creditScores.experian.current}
                        </p>
                        <div className="flex items-center justify-center text-emerald-600 text-sm font-medium mb-2">
                          <ArrowUp className="w-3 h-3 mr-1" />+
                          {clientData.creditScores.experian.current - clientData.creditScores.experian.previous} pts
                        </div>
                        <p className="text-xs text-blue-600">Updated {clientData.creditScores.experian.lastUpdated}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-2xl border border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="text-center">
                        <p className="text-sm text-emerald-700 font-medium mb-2">Equifax</p>
                        <p className="text-3xl font-bold text-emerald-800 mb-1">
                          {clientData.creditScores.equifax.current}
                        </p>
                        <div className="flex items-center justify-center text-emerald-600 text-sm font-medium mb-2">
                          <ArrowUp className="w-3 h-3 mr-1" />+
                          {clientData.creditScores.equifax.current - clientData.creditScores.equifax.previous} pts
                        </div>
                        <p className="text-xs text-emerald-600">
                          Updated {clientData.creditScores.equifax.lastUpdated}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-2xl border border-purple-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="text-center">
                        <p className="text-sm text-purple-700 font-medium mb-2">TransUnion</p>
                        <p className="text-3xl font-bold text-purple-800 mb-1">
                          {clientData.creditScores.transunion.current}
                        </p>
                        <div className="flex items-center justify-center text-emerald-600 text-sm font-medium mb-2">
                          <ArrowUp className="w-3 h-3 mr-1" />+
                          {clientData.creditScores.transunion.current - clientData.creditScores.transunion.previous} pts
                        </div>
                        <p className="text-xs text-purple-600">
                          Updated {clientData.creditScores.transunion.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  Recent Activity
                </CardTitle>
                <Button variant="ghost" className="text-orange-600">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {clientData.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300 relative"
                  >
                    {/* Timeline connector */}
                    {index < clientData.recentActivity.length - 1 && (
                      <div className="absolute left-8 top-16 w-0.5 h-12 bg-slate-200"></div>
                    )}

                    <div className={`p-3 rounded-2xl ${getActivityIconBg(activity.type)} relative z-10`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{activity.action}</h4>
                        {activity.impact && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                            {activity.impact}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                      <p className="text-xs text-slate-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
