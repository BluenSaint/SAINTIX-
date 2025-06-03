"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/FileUpload"
import { useCreditReports } from "@/hooks/useCreditReports"
import { useDisputeLetters } from "@/hooks/useDisputeLetters"
import { notifications } from "@/lib/database"
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
  Loader2,
} from "lucide-react"

function ClientPortalDashboard() {
  const { user, userProfile } = useAuth()
  const { creditReports, loading: reportsLoading, fetchReports } = useCreditReports()
  const { disputeLetters, loading: disputesLoading, fetchDisputes } = useDisputeLetters()
  const [userNotifications, setUserNotifications] = useState([])
  const [notificationsLoading, setNotificationsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchReports()
      fetchDisputes()
      loadNotifications()
    }
  }, [user, fetchReports, fetchDisputes])

  const loadNotifications = async () => {
    if (!user) return
    
    try {
      const data = await notifications.getUserNotifications(user.id)
      setUserNotifications(data.slice(0, 5)) // Show latest 5
    } catch (error) {
      console.error('Error loading notifications:', error)
    } finally {
      setNotificationsLoading(false)
    }
  }

  // Calculate stats from real data
  const stats = {
    totalReports: creditReports.length,
    totalDisputes: disputeLetters.length,
    pendingDisputes: disputeLetters.filter(d => d.status === 'pending').length,
    resolvedDisputes: disputeLetters.filter(d => d.status === 'resolved').length,
  }

  // Mock score data (would come from credit reports analysis)
  const scoreData = {
    current: 687,
    starting: 558,
    target: 750,
    progress: 68,
  }

  const getDisputeStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'draft':
        return 'bg-slate-100 text-slate-600 border-slate-200'
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (reportsLoading || disputesLoading || notificationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    )
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
                Welcome back, {userProfile?.full_name?.split(" ")[0] || "Client"}!<span className="ml-2">✨</span>
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
                      +{scoreData.current - scoreData.starting}
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
                    <p className="text-sm text-orange-700 font-medium">Credit Reports</p>
                    <p className="text-2xl font-bold text-orange-800">{stats.totalReports}</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Active Disputes</p>
                    <p className="text-2xl font-bold text-purple-800">{stats.pendingDisputes}</p>
                  </div>
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Resolved Items</p>
                    <p className="text-2xl font-bold text-blue-800">{stats.resolvedDisputes}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* File Upload Section */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                    <Upload className="w-5 h-5 text-amber-600" />
                  </div>
                  Upload Credit Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onUploadComplete={(fileUrl) => {
                    console.log('File uploaded:', fileUrl)
                    fetchReports() // Refresh reports after upload
                  }}
                />
              </CardContent>
            </Card>

            {/* Credit Reports */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  Your Credit Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                {creditReports.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">No credit reports uploaded yet</p>
                    <p className="text-sm text-slate-500">Upload your first report to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {creditReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">
                              Credit Report - {formatDate(report.uploaded_at)}
                            </p>
                            <p className="text-sm text-slate-600">Source: {report.source}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={report.reviewed ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}>
                            {report.reviewed ? 'Reviewed' : 'Pending Review'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dispute Letters */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  Your Dispute Letters
                </CardTitle>
              </CardHeader>
              <CardContent>
                {disputeLetters.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">No disputes created yet</p>
                    <p className="text-sm text-slate-500">We'll create disputes based on your credit report analysis</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {disputeLetters.map((dispute) => (
                      <div key={dispute.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <Shield className="w-8 h-8 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">
                              {dispute.credit_bureau} - {dispute.type}
                            </p>
                            <p className="text-sm text-slate-600">
                              Created: {formatDate(dispute.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getDisputeStatusColor(dispute.status)}>
                            {dispute.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                    <p className="text-3xl font-bold text-slate-900 mb-2">{scoreData.starting}</p>
                    <p className="text-xs text-slate-500">When you joined</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200/50">
                    <p className="text-sm text-emerald-700 mb-2">Current Score</p>
                    <p className="text-3xl font-bold text-emerald-800 mb-2">{scoreData.current}</p>
                    <p className="text-xs text-emerald-600">
                      +{scoreData.current - scoreData.starting} improvement!
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Progress to goal ({scoreData.target})</span>
                    <span className="font-semibold text-slate-900">{scoreData.progress}%</span>
                  </div>
                  <Progress value={scoreData.progress} className="h-3 mb-4" />
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
                {userNotifications.length === 0 ? (
                  <div className="text-center py-4">
                    <Bell className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                        <Bell className="w-5 h-5 text-amber-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-slate-900 font-medium mb-1">{notification.message}</p>
                          <p className="text-xs text-slate-500">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  Account Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{userProfile?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Member Since</p>
                    <p className="font-medium text-slate-900">
                      {userProfile?.created_at ? formatDate(userProfile.created_at) : 'Recently'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Plan</p>
                    <p className="font-medium text-slate-900">Standard</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClientPortalPage() {
  return (
    <ProtectedRoute requiredRole="client">
      <ClientPortalDashboard />
    </ProtectedRoute>
  )
}
