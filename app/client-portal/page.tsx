"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  Bell,
  CreditCard,
  Target,
  Calendar,
  BarChart3,
  ArrowRight,
  Heart,
  Sparkles,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Star,
  RefreshCw,
  DollarSign,
} from "lucide-react"

// Mock client data with warm, friendly copy
const clientData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  memberSince: "October 2023",
  plan: "Advanced",
  nextBilling: "February 15, 2024",
  daysUntilBilling: 4,
  currentScore: 687,
  startingScore: 558,
  targetScore: 750,
  progress: 68,

  // Progress Timeline
  timeline: [
    { step: "Report Uploaded", status: "completed", date: "Jan 15", description: "Your report is safely in our hands" },
    {
      step: "Review In Progress",
      status: "current",
      date: "Jan 18",
      description: "Our experts are reviewing with care",
      daysLeft: 2,
    },
    {
      step: "Disputes Sent",
      status: "upcoming",
      date: "Jan 22",
      description: "We'll send your disputes to all bureaus",
    },
    {
      step: "Responses Received",
      status: "upcoming",
      date: "Feb 15",
      description: "Tracking responses and celebrating wins",
    },
  ],

  // Dispute Summary
  disputes: {
    experian: { flagged: 3, inReview: 2, sent: 1, resolved: 0 },
    equifax: { flagged: 4, inReview: 2, sent: 2, resolved: 0 },
    transunion: { flagged: 2, inReview: 1, sent: 1, resolved: 0 },
  },

  // Uploaded Reports
  reports: [
    { name: "Credit Report - January 2024", date: "Jan 15, 2024", status: "Reviewed", type: "Credit Karma" },
    { name: "Credit Report - December 2023", date: "Dec 20, 2023", status: "Reviewed", type: "IdentityIQ" },
  ],

  // Notifications
  notifications: [
    {
      type: "success",
      message: "Great news! We sent your Equifax dispute today",
      time: "2 hours ago",
      icon: "celebration",
    },
    {
      type: "info",
      message: "Your billing renews in 4 days - keep the magic going!",
      time: "1 day ago",
      icon: "billing",
    },
    {
      type: "action",
      message: "Ready for another report upload? It's been 30 days!",
      time: "3 days ago",
      icon: "upload",
    },
  ],

  // Recent achievements
  achievements: [
    { title: "First Upload Complete", description: "You've taken the first step!", earned: true },
    { title: "30-Day Champion", description: "You've been with us for a month!", earned: true },
    { title: "Dispute Warrior", description: "Your first dispute has been sent", earned: false },
  ],
}

export default function ClientPortalDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getTimelineStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "current":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "upcoming":
        return "bg-slate-100 text-slate-600 border-slate-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  const getNotificationIcon = (iconType: string) => {
    switch (iconType) {
      case "celebration":
        return <Star className="w-5 h-5 text-amber-500" />
      case "billing":
        return <DollarSign className="w-5 h-5 text-blue-500" />
      case "upload":
        return <Upload className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-slate-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome back, {clientData.name.split(" ")[0]}!<span className="ml-2">✨</span>
              </h1>
              <p className="text-slate-600">Your credit journey is moving forward beautifully</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">Score Improvement</p>
                    <p className="text-2xl font-bold text-emerald-800">
                      +{clientData.currentScore - clientData.startingScore}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-700 font-medium">Current Score</p>
                    <p className="text-2xl font-bold text-orange-800">{clientData.currentScore}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Goal Progress</p>
                    <p className="text-2xl font-bold text-purple-800">{clientData.progress}%</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Program Days</p>
                    <p className="text-2xl font-bold text-blue-800">67</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Timeline */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  Your Journey Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientData.timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="relative">
                        <div
                          className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center ${getTimelineStatusColor(item.status)}`}
                        >
                          {item.status === "completed" ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : item.status === "current" ? (
                            <RefreshCw className="w-6 h-6 animate-spin" />
                          ) : (
                            <Clock className="w-6 h-6" />
                          )}
                        </div>
                        {index < clientData.timeline.length - 1 && (
                          <div className="absolute top-12 left-6 w-0.5 h-12 bg-slate-200"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-slate-900">{item.step}</h3>
                          <span className="text-sm text-slate-500">{item.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{item.description}</p>
                        {item.daysLeft && (
                          <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                            {item.daysLeft} days remaining
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dispute Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  Dispute Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(clientData.disputes).map(([bureau, data]) => (
                    <div key={bureau} className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="font-bold text-slate-900 mb-4 capitalize">{bureau}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Items flagged:</span>
                          <span className="font-semibold text-slate-900">{data.flagged}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">In review:</span>
                          <span className="font-semibold text-orange-600">{data.inReview}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Disputes sent:</span>
                          <span className="font-semibold text-blue-600">{data.sent}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Resolved:</span>
                          <span className="font-semibold text-emerald-600">{data.resolved}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Score Tracking */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                  Track Your Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-slate-50 rounded-2xl">
                    <p className="text-sm text-slate-600 mb-2">Starting Score</p>
                    <p className="text-3xl font-bold text-slate-900 mb-2">{clientData.startingScore}</p>
                    <p className="text-xs text-slate-500">When you joined</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200/50">
                    <p className="text-sm text-emerald-700 mb-2">Current Score</p>
                    <p className="text-3xl font-bold text-emerald-800 mb-2">{clientData.currentScore}</p>
                    <p className="text-xs text-emerald-600">
                      +{clientData.currentScore - clientData.startingScore} improvement!
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Progress to goal ({clientData.targetScore})</span>
                    <span className="font-semibold text-slate-900">{clientData.progress}%</span>
                  </div>
                  <Progress value={clientData.progress} className="h-3 mb-4" />
                  <p className="text-sm text-slate-600 text-center">Keep going! You're doing amazing.</p>
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl">
                  Update My Score
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Bell className="w-5 h-5 text-amber-600" />
                  Latest Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.notifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                      {getNotificationIcon(notification.icon)}
                      <div className="flex-1">
                        <p className="text-sm text-slate-900 font-medium mb-1">{notification.message}</p>
                        <p className="text-xs text-slate-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Billing Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  Billing Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600">Current Plan</p>
                    <p className="font-semibold text-slate-900">{clientData.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Next Billing</p>
                    <p className="font-semibold text-slate-900">{clientData.nextBilling}</p>
                  </div>
                  {clientData.daysUntilBilling <= 5 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-sm text-amber-800">
                        Keep the magic going! Your plan renews in {clientData.daysUntilBilling} days.
                      </p>
                    </div>
                  )}
                  <Button variant="outline" className="w-full rounded-xl">
                    Manage Billing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reports */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <FileText className="w-5 h-5 text-amber-600" />
                  Your Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {clientData.reports.map((report, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-slate-900">{report.name}</p>
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        {report.date} • {report.type}
                      </p>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Report
                </Button>
              </CardContent>
            </Card>

            {/* AI Helper Placeholder */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Ask Alex, Your Credit Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-800 mb-4">
                  Coming soon! Chat with our AI helper for instant answers.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs border-purple-200 text-purple-700"
                  >
                    "What's a dispute?"
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs border-purple-200 text-purple-700"
                  >
                    "When will I see changes?"
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs border-purple-200 text-purple-700"
                  >
                    "How can I improve faster?"
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
