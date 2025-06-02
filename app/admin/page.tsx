"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  TrendingUp,
  DollarSign,
  FileText,
  Download,
  Bell,
  Settings,
  BarChart3,
  CheckCircle,
  Zap,
  UserPlus,
  Search,
  Home,
  CreditCard,
  PieChart,
  Receipt,
  UserCog,
  FileOutputIcon as FileExport,
  Mail,
  CalendarCheck,
  ArrowRight,
  ArrowUp,
  FolderSyncIcon as Sync,
  AlertTriangle,
  Clock,
  Calendar,
  Phone,
  Eye,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  CreditCardIcon as CreditCardAlt,
  TrendingDown,
  RefreshCw,
  Filter,
} from "lucide-react"

// Mock admin data
const adminData = {
  stats: {
    totalClients: 1247,
    activeDisputes: 89,
    monthlyRevenue: 224800,
    avgScoreIncrease: 67,
    newClientsThisMonth: 34,
    resolvedDisputes: 156,
    clientRetention: 94.2,
    teamMembers: 12,
  },
  recentActivity: [
    {
      id: 1,
      type: "client_signup",
      message: "New client Sarah Rodriguez signed up for Advanced plan",
      timestamp: "2 minutes ago",
      priority: "normal",
    },
    {
      id: 2,
      type: "dispute_resolved",
      message: "Dispute resolved for John Smith - Capital One Collection",
      timestamp: "15 minutes ago",
      priority: "high",
      impact: "+25 pts",
    },
    {
      id: 3,
      type: "payment_received",
      message: "Payment received from Maria Garcia - $180",
      timestamp: "1 hour ago",
      priority: "normal",
    },
    {
      id: 4,
      type: "score_update",
      message: "Credit score updated for 23 clients",
      timestamp: "2 hours ago",
      priority: "normal",
    },
  ],
  performanceData: [
    { month: "Jan", revenue: 185000, clients: 210 },
    { month: "Feb", revenue: 192000, clients: 230 },
    { month: "Mar", revenue: 201000, clients: 245 },
    { month: "Apr", revenue: 196000, clients: 260 },
    { month: "May", revenue: 210000, clients: 280 },
    { month: "Jun", revenue: 224800, clients: 310 },
    { month: "Jul", revenue: 235000, clients: 340 },
  ],
  billingData: {
    paidBills: [
      {
        id: 1,
        clientName: "Sarah Rodriguez",
        email: "sarah.rodriguez@email.com",
        plan: "Advanced",
        amount: 180,
        paidDate: "2024-01-20",
        nextDue: "2024-02-20",
        status: "paid",
        paymentMethod: "Credit Card",
      },
      {
        id: 2,
        clientName: "Michael Chen",
        email: "michael.chen@email.com",
        plan: "Elite",
        amount: 250,
        paidDate: "2024-01-18",
        nextDue: "2024-02-18",
        status: "paid",
        paymentMethod: "Bank Transfer",
      },
      {
        id: 3,
        clientName: "Jennifer Davis",
        email: "jennifer.davis@email.com",
        plan: "Basic",
        amount: 85,
        paidDate: "2024-01-15",
        nextDue: "2024-02-15",
        status: "paid",
        paymentMethod: "Credit Card",
      },
    ],
    upcomingBills: [
      {
        id: 4,
        clientName: "Robert Wilson",
        email: "robert.wilson@email.com",
        plan: "Advanced",
        amount: 180,
        dueDate: "2024-02-05",
        status: "upcoming",
        daysUntilDue: 3,
        paymentMethod: "Credit Card",
      },
      {
        id: 5,
        clientName: "Lisa Thompson",
        email: "lisa.thompson@email.com",
        plan: "Elite",
        amount: 250,
        dueDate: "2024-02-08",
        status: "upcoming",
        daysUntilDue: 6,
        paymentMethod: "Bank Transfer",
      },
      {
        id: 6,
        clientName: "David Martinez",
        email: "david.martinez@email.com",
        plan: "Basic",
        amount: 85,
        dueDate: "2024-02-10",
        status: "upcoming",
        daysUntilDue: 8,
        paymentMethod: "Credit Card",
      },
    ],
    overdueBills: [
      {
        id: 7,
        clientName: "Amanda Johnson",
        email: "amanda.johnson@email.com",
        plan: "Advanced",
        amount: 180,
        dueDate: "2024-01-15",
        status: "overdue",
        daysOverdue: 17,
        paymentMethod: "Credit Card",
        riskLevel: "high",
      },
      {
        id: 8,
        clientName: "Kevin Brown",
        email: "kevin.brown@email.com",
        plan: "Basic",
        amount: 85,
        dueDate: "2024-01-20",
        status: "overdue",
        daysOverdue: 12,
        paymentMethod: "Bank Transfer",
        riskLevel: "medium",
      },
      {
        id: 9,
        clientName: "Maria Garcia",
        email: "maria.garcia@email.com",
        plan: "Elite",
        amount: 250,
        dueDate: "2024-01-10",
        status: "overdue",
        daysOverdue: 22,
        paymentMethod: "Credit Card",
        riskLevel: "critical",
      },
    ],
  },
}

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [showBillingDetails, setShowBillingDetails] = useState(false)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "client_signup":
        return <UserPlus className="w-5 h-5" />
      case "dispute_resolved":
        return <CheckCircle className="w-5 h-5" />
      case "payment_received":
        return <DollarSign className="w-5 h-5" />
      case "score_update":
        return <Sync className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getActivityIconBg = (type: string) => {
    switch (type) {
      case "client_signup":
        return "bg-blue-100 text-blue-600"
      case "dispute_resolved":
        return "bg-emerald-100 text-emerald-600"
      case "payment_received":
        return "bg-amber-100 text-amber-600"
      case "score_update":
        return "bg-purple-100 text-purple-600"
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
              <CreditCard className="w-6 h-6 text-white" />
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
              { id: "clients", icon: Users, label: "Clients" },
              { id: "disputes", icon: FileText, label: "Disputes" },
              { id: "analytics", icon: BarChart3, label: "Analytics" },
              { id: "billing", icon: Receipt, label: "Billing" },
              { id: "team", icon: UserCog, label: "Team" },
              { id: "settings", icon: Settings, label: "Settings" },
              { id: "export", icon: FileExport, label: "Export Data" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveNav(item.id)
                    if (item.id === "billing") {
                      setShowBillingDetails(!showBillingDetails)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeNav === item.id
                      ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.id === "billing" && (
                    <div className="ml-auto">
                      {showBillingDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  )}
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
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h2>
                <p className="text-slate-600 mt-1">Credit Repair Management System</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input placeholder="Search..." className="pl-12 w-80 bg-slate-50/50 border-slate-200 rounded-full" />
                </div>

                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                </Button>

                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">AD</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Admin</p>
                    <p className="text-xs text-slate-500">Super User</p>
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
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">Welcome back, Admin! 👋</h3>
                  <p className="text-lg text-slate-600">
                    Here's what's happening with your credit repair business today.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-lg">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-200/50 rounded-2xl">
                    <Users className="w-6 h-6 text-blue-700" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    <ArrowUp className="w-3 h-3 mr-1" />+{adminData.stats.newClientsThisMonth}
                  </Badge>
                </div>
                <div>
                  <p className="text-blue-700 font-semibold text-sm mb-1">Total Clients</p>
                  <p className="text-4xl font-bold text-blue-800">{adminData.stats.totalClients.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 mt-1">+{adminData.stats.newClientsThisMonth} this month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-200/50 rounded-2xl">
                    <DollarSign className="w-6 h-6 text-emerald-700" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </Badge>
                </div>
                <div>
                  <p className="text-emerald-700 font-semibold text-sm mb-1">Monthly Revenue</p>
                  <p className="text-4xl font-bold text-emerald-800">
                    ${adminData.stats.monthlyRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">+12.5% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-200/50 rounded-2xl">
                    <FileText className="w-6 h-6 text-amber-700" />
                  </div>
                </div>
                <div>
                  <p className="text-amber-700 font-semibold text-sm mb-1">Active Disputes</p>
                  <p className="text-4xl font-bold text-amber-800">{adminData.stats.activeDisputes}</p>
                  <p className="text-xs text-amber-600 mt-1">{adminData.stats.resolvedDisputes} resolved</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-200/50 rounded-2xl">
                    <TrendingUp className="w-6 h-6 text-orange-700" />
                  </div>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold text-sm mb-1">Avg Score Increase</p>
                  <p className="text-4xl font-bold text-orange-800">+{adminData.stats.avgScoreIncrease}</p>
                  <p className="text-xs text-orange-600 mt-1">{adminData.stats.clientRetention}% retention</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Activity Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Performance Chart */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl">
                        <BarChart3 className="w-5 h-5 text-orange-600" />
                      </div>
                      Performance Analytics
                    </CardTitle>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      View Reports
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Simple chart visualization */}
                  <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100 mb-6">
                    <div className="flex items-end justify-between h-48 gap-4">
                      {adminData.performanceData.slice(-6).map((data, index) => (
                        <div key={data.month} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg mb-2 transition-all duration-1000 ease-out"
                            style={{ height: `${(data.revenue / 250000) * 100}%` }}
                          ></div>
                          <span className="text-sm font-medium text-slate-700">{data.month}</span>
                          <span className="text-xs text-slate-500">${(data.revenue / 1000).toFixed(0)}k</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-2xl border border-emerald-200/50">
                      <p className="text-sm font-semibold text-emerald-700 mb-1">Revenue Growth</p>
                      <p className="text-2xl font-bold text-emerald-800">+12.5%</p>
                      <p className="text-xs text-emerald-600">vs last month</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200/50">
                      <p className="text-sm font-semibold text-blue-700 mb-1">New Clients</p>
                      <p className="text-2xl font-bold text-blue-800">+{adminData.stats.newClientsThisMonth}</p>
                      <p className="text-xs text-blue-600">this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                        <Zap className="w-5 h-5 text-amber-600" />
                      </div>
                      Recent Activity
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-orange-600">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminData.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className={`p-2 rounded-xl ${getActivityIconBg(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-900">{activity.message}</p>
                            {activity.impact && (
                              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                                {activity.impact}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { icon: UserPlus, label: "Add New Client", color: "blue" },
                  { icon: FileText, label: "Create Dispute", color: "purple" },
                  { icon: PieChart, label: "Generate Report", color: "emerald" },
                  { icon: Mail, label: "Send Bulk Message", color: "amber" },
                  { icon: FileExport, label: "Export Data", color: "orange" },
                  { icon: CalendarCheck, label: "Schedule Task", color: "red" },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-${action.color}-50 to-${action.color}-100/50 border-${action.color}-200/50 hover:border-${action.color}-300`}
                  >
                    <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                    <span className={`text-xs font-medium text-${action.color}-700 text-center`}>{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Billing Management Section */}
          {showBillingDetails && (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">💰 Billing Management Center</h3>
                    <p className="text-slate-600">Comprehensive payment tracking and collection management</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Data
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-xl">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Enhanced Billing Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-700">Paid Today</span>
                    </div>
                    <p className="text-xl font-bold text-emerald-800">$1,240</p>
                    <p className="text-xs text-emerald-600">8 payments</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">Due Today</span>
                    </div>
                    <p className="text-xl font-bold text-blue-800">$890</p>
                    <p className="text-xs text-blue-600">5 clients</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-semibold text-amber-700">Due This Week</span>
                    </div>
                    <p className="text-xl font-bold text-amber-800">$2,340</p>
                    <p className="text-xs text-amber-600">13 clients</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-semibold text-red-700">Overdue</span>
                    </div>
                    <p className="text-xl font-bold text-red-800">$1,515</p>
                    <p className="text-xs text-red-600">9 clients</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-700">Collection Rate</span>
                    </div>
                    <p className="text-xl font-bold text-purple-800">87.3%</p>
                    <p className="text-xs text-purple-600">This month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCardAlt className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-semibold text-orange-700">Failed Payments</span>
                    </div>
                    <p className="text-xl font-bold text-orange-800">$425</p>
                    <p className="text-xs text-orange-600">3 attempts</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Paid Bills */}
                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-xl rounded-3xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-emerald-200/50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <span className="text-emerald-800">Paid Bills</span>
                          <p className="text-sm font-normal text-emerald-600">Recent payments</p>
                        </div>
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-emerald-600">
                        <Eye className="w-4 h-4 mr-1" />
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {adminData.billingData.paidBills.map((bill) => (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-200/30 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <span className="text-emerald-700 font-bold text-sm">
                                {bill.clientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-emerald-800 text-sm">{bill.clientName}</p>
                              <p className="text-xs text-emerald-600">
                                {bill.plan} Plan • {bill.paymentMethod}
                              </p>
                              <p className="text-xs text-emerald-500">Paid: {bill.paidDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-800">${bill.amount}</p>
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Paid
                            </Badge>
                            <div className="flex gap-1 mt-2">
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                                <Mail className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-emerald-100/50 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-emerald-700">Total Collected</span>
                        <span className="text-lg font-bold text-emerald-800">
                          ${adminData.billingData.paidBills.reduce((sum, bill) => sum + bill.amount, 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-600">Success Rate</span>
                        <span className="text-sm font-bold text-emerald-700">94.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Bills */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-xl rounded-3xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-blue-200/50 rounded-xl">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-blue-800">Upcoming Bills</span>
                          <p className="text-sm font-normal text-blue-600">Due soon</p>
                        </div>
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        <Mail className="w-4 h-4 mr-1" />
                        Remind All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {adminData.billingData.upcomingBills.map((bill) => (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-200/30 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-700 font-bold text-sm">
                                {bill.clientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-blue-800 text-sm">{bill.clientName}</p>
                              <p className="text-xs text-blue-600">
                                {bill.plan} Plan • {bill.paymentMethod}
                              </p>
                              <p className="text-xs text-blue-500">Due: {bill.dueDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-800">${bill.amount}</p>
                            <Badge
                              className={`text-xs ${
                                bill.daysUntilDue <= 3
                                  ? "bg-amber-100 text-amber-700 border-amber-200"
                                  : "bg-blue-100 text-blue-700 border-blue-200"
                              }`}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {bill.daysUntilDue} days
                            </Badge>
                            <div className="flex gap-1 mt-2">
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                                <Phone className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                                <Mail className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-blue-100/50 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-blue-700">Expected Revenue</span>
                        <span className="text-lg font-bold text-blue-800">
                          ${adminData.billingData.upcomingBills.reduce((sum, bill) => sum + bill.amount, 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600">Auto-Retry Enabled</span>
                        <span className="text-sm font-bold text-blue-700">Yes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Overdue Bills - Risk of Termination */}
                <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50 shadow-xl rounded-3xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-red-200/50 rounded-xl">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <span className="text-red-800">Overdue Bills</span>
                          <p className="text-sm font-normal text-red-600">Risk of termination</p>
                        </div>
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Urgent
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {adminData.billingData.overdueBills.map((bill) => (
                        <div
                          key={bill.id}
                          className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-200/30 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                bill.riskLevel === "critical"
                                  ? "bg-red-200 animate-pulse"
                                  : bill.riskLevel === "high"
                                    ? "bg-red-150"
                                    : "bg-amber-100"
                              }`}
                            >
                              <span
                                className={`font-bold text-sm ${
                                  bill.riskLevel === "critical"
                                    ? "text-red-800"
                                    : bill.riskLevel === "high"
                                      ? "text-red-700"
                                      : "text-amber-700"
                                }`}
                              >
                                {bill.clientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-red-800 text-sm">{bill.clientName}</p>
                              <p className="text-xs text-red-600">
                                {bill.plan} Plan • {bill.paymentMethod}
                              </p>
                              <p className="text-xs text-red-500">Due: {bill.dueDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-800">${bill.amount}</p>
                            <Badge
                              className={`text-xs ${
                                bill.riskLevel === "critical"
                                  ? "bg-red-200 text-red-800 border-red-300 animate-pulse"
                                  : bill.riskLevel === "high"
                                    ? "bg-red-100 text-red-700 border-red-200"
                                    : "bg-amber-100 text-amber-700 border-amber-200"
                              }`}
                            >
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {bill.daysOverdue}d overdue
                            </Badge>
                            <div className="flex gap-1 mt-2">
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-red-600">
                                <Phone className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-red-600">
                                <AlertTriangle className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="p-4 bg-red-100/50 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-red-700">Total Overdue</span>
                          <span className="text-lg font-bold text-red-800">
                            ${adminData.billingData.overdueBills.reduce((sum, bill) => sum + bill.amount, 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-red-600">Termination Risk</span>
                          <span className="text-sm font-bold text-red-700">
                            {adminData.billingData.overdueBills.filter((b) => b.riskLevel === "critical").length}{" "}
                            Critical
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl">
                          <Phone className="w-3 h-3 mr-1" />
                          Call All
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-200 text-red-700 hover:bg-red-50 rounded-xl"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Payment Methods & Analytics */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                        <CreditCardAlt className="w-5 h-5 text-blue-600" />
                      </div>
                      Payment Methods Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCardAlt className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-blue-800">Credit Cards</p>
                            <p className="text-xs text-blue-600">Most popular method</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-800">67%</p>
                          <p className="text-xs text-blue-600">Success: 94.2%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-emerald-800">Bank Transfer</p>
                            <p className="text-xs text-emerald-600">Most reliable</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-emerald-800">28%</p>
                          <p className="text-xs text-emerald-600">Success: 98.1%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-white rounded-2xl border border-amber-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-amber-800">Other Methods</p>
                            <p className="text-xs text-amber-600">PayPal, Crypto, etc.</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-amber-800">5%</p>
                          <p className="text-xs text-amber-600">Success: 89.3%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                      </div>
                      Collection Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-emerald-700">This Month</span>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +5.2%
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-emerald-800">$224,800</p>
                        <p className="text-xs text-emerald-600">1,156 successful payments</p>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-blue-700">Average Days to Collect</span>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            -2 days
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-blue-800">12.3</p>
                        <p className="text-xs text-blue-600">Improved from 14.3 days</p>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-amber-50 to-white rounded-2xl border border-amber-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-amber-700">Recovery Rate</span>
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +3.1%
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-amber-800">87.3%</p>
                        <p className="text-xs text-amber-600">Of overdue accounts recovered</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Billing Summary Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                Billing Overview & Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-2xl border border-emerald-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-800">Paid This Month</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-800">
                    ${adminData.billingData.paidBills.reduce((sum, bill) => sum + bill.amount, 0)}
                  </p>
                  <p className="text-sm text-emerald-600">{adminData.billingData.paidBills.length} payments</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Due Soon</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800">
                    ${adminData.billingData.upcomingBills.reduce((sum, bill) => sum + bill.amount, 0)}
                  </p>
                  <p className="text-sm text-blue-600">{adminData.billingData.upcomingBills.length} clients</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 rounded-2xl border border-red-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Overdue</span>
                  </div>
                  <p className="text-2xl font-bold text-red-800">
                    ${adminData.billingData.overdueBills.reduce((sum, bill) => sum + bill.amount, 0)}
                  </p>
                  <p className="text-sm text-red-600">{adminData.billingData.overdueBills.length} at risk</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-2xl border border-purple-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">Collection Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">87.3%</p>
                  <p className="text-sm text-purple-600">This month</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-xl">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Payments
                </Button>
                <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50 rounded-xl">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Payment Reminders
                </Button>
                <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 rounded-xl">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Review Termination List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
