"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { admin, notifications } from "@/lib/database"
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
  Shield,
  Upload,
  Loader2,
} from "lucide-react"

function AdminDashboard() {
  const { user, userProfile } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    users: [],
    creditReports: [],
    disputeLetters: [],
    loading: true
  })

  useEffect(() => {
    if (user && userProfile?.role === 'admin') {
      loadDashboardData()
    }
  }, [user, userProfile])

  const loadDashboardData = async () => {
    try {
      const [users, creditReports, disputeLetters] = await Promise.all([
        admin.getAllUsers(),
        admin.getAllCreditReports(),
        admin.getAllDisputeLetters()
      ])

      setDashboardData({
        users,
        creditReports,
        disputeLetters,
        loading: false
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setDashboardData(prev => ({ ...prev, loading: false }))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-emerald-100 text-emerald-700'
      case 'pending':
        return 'bg-orange-100 text-orange-700'
      case 'sent':
        return 'bg-blue-100 text-blue-700'
      case 'draft':
        return 'bg-slate-100 text-slate-600'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  // Calculate metrics from real data
  const metrics = {
    totalClients: dashboardData.users.filter(u => u.role === 'client').length,
    totalReports: dashboardData.creditReports.length,
    totalDisputes: dashboardData.disputeLetters.length,
    pendingDisputes: dashboardData.disputeLetters.filter(d => d.status === 'pending').length,
    resolvedDisputes: dashboardData.disputeLetters.filter(d => d.status === 'resolved').length,
    unreviewed: dashboardData.creditReports.filter(r => !r.reviewed).length,
    newThisWeek: dashboardData.users.filter(u => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(u.created_at) > weekAgo
    }).length
  }

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

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
            <div className="text-2xl font-bold text-blue-900">{metrics.totalClients}</div>
            <p className="text-xs text-blue-600 mt-1">
              +{metrics.newThisWeek} new this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Credit Reports</CardTitle>
            <FileText className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{metrics.totalReports}</div>
            <p className="text-xs text-emerald-600 mt-1">
              {metrics.unreviewed} pending review
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Active Disputes</CardTitle>
            <Shield className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{metrics.pendingDisputes}</div>
            <p className="text-xs text-orange-600 mt-1">
              {metrics.resolvedDisputes} resolved
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {metrics.totalDisputes > 0 ? Math.round((metrics.resolvedDisputes / metrics.totalDisputes) * 100) : 0}%
            </div>
            <p className="text-xs text-purple-600 mt-1">
              Dispute resolution rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Credit Reports */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              Recent Credit Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.creditReports.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No credit reports yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.creditReports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Upload className="w-8 h-8 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {report.users?.full_name || 'Unknown User'}
                        </p>
                        <p className="text-sm text-slate-600">
                          {report.source} • {formatDate(report.uploaded_at)}
                        </p>
                      </div>
                    </div>
                    <Badge className={report.reviewed ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}>
                      {report.reviewed ? 'Reviewed' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Disputes */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                <Shield className="w-5 h-5 text-amber-600" />
              </div>
              Recent Disputes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.disputeLetters.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No disputes yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.disputeLetters.slice(0, 5).map((dispute) => (
                  <div key={dispute.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">
                          {dispute.users?.full_name || 'Unknown User'}
                        </p>
                        <p className="text-sm text-slate-600">
                          {dispute.credit_bureau} • {dispute.type}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Client Overview */}
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            Client Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData.users.filter(u => u.role === 'client').length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No clients yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData.users.filter(u => u.role === 'client').slice(0, 10).map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {client.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{client.full_name}</p>
                      <p className="text-sm text-slate-600">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Joined</p>
                    <p className="font-medium text-slate-900">{formatDate(client.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  )
}
