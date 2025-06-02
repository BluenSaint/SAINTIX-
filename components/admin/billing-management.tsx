"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Download,
  RefreshCw,
  Calendar,
} from "lucide-react"

export default function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const billingData = {
    summary: {
      totalRevenue: 224800,
      pendingPayments: 12400,
      overduePayments: 3200,
      successfulPayments: 1156,
    },
    recentTransactions: [
      {
        id: 1,
        clientName: "Sarah Rodriguez",
        amount: 180,
        plan: "Advanced",
        status: "Paid",
        date: "2024-01-20",
        method: "Credit Card",
      },
      {
        id: 2,
        clientName: "John Smith",
        amount: 85,
        plan: "Basic",
        status: "Pending",
        date: "2024-01-19",
        method: "Bank Transfer",
      },
      {
        id: 3,
        clientName: "Maria Garcia",
        amount: 250,
        plan: "Elite",
        status: "Failed",
        date: "2024-01-18",
        method: "Credit Card",
      },
    ],
    upcomingBilling: [
      {
        id: 1,
        clientName: "Sarah Rodriguez",
        amount: 180,
        plan: "Advanced",
        dueDate: "2024-02-15",
        status: "Scheduled",
      },
      {
        id: 2,
        clientName: "John Smith",
        amount: 85,
        plan: "Basic",
        dueDate: "2024-02-10",
        status: "Scheduled",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "failed":
        return "bg-red-100 text-red-700 border-red-200"
      case "scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "scheduled":
        return <Calendar className="w-4 h-4 text-blue-600" />
      default:
        return <DollarSign className="w-4 h-4 text-slate-600" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900">Billing Management</h3>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Billing Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 font-semibold text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-emerald-800">
                  ${billingData.summary.totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 mt-1">This month</p>
              </div>
              <div className="p-3 bg-emerald-200/50 rounded-2xl">
                <DollarSign className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 font-semibold text-sm mb-1">Pending Payments</p>
                <p className="text-3xl font-bold text-amber-800">
                  ${billingData.summary.pendingPayments.toLocaleString()}
                </p>
                <p className="text-xs text-amber-600 mt-1">Awaiting processing</p>
              </div>
              <div className="p-3 bg-amber-200/50 rounded-2xl">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 font-semibold text-sm mb-1">Overdue Payments</p>
                <p className="text-3xl font-bold text-red-800">
                  ${billingData.summary.overduePayments.toLocaleString()}
                </p>
                <p className="text-xs text-red-600 mt-1">Requires attention</p>
              </div>
              <div className="p-3 bg-red-200/50 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-semibold text-sm mb-1">Successful Payments</p>
                <p className="text-3xl font-bold text-blue-800">{billingData.summary.successfulPayments}</p>
                <p className="text-xs text-blue-600 mt-1">This month</p>
              </div>
              <div className="p-3 bg-blue-200/50 rounded-2xl">
                <CheckCircle className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <CreditCard className="w-5 h-5 text-indigo-600" />
              </div>
              Recent Transactions
            </CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 rounded-xl"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingData.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-100 rounded-2xl">{getStatusIcon(transaction.status)}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{transaction.clientName}</p>
                    <p className="text-sm text-slate-600">
                      {transaction.plan} Plan • {transaction.method}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-slate-900">${transaction.amount}</p>
                    <p className="text-sm text-slate-500">{transaction.date}</p>
                  </div>
                  <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Billing */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            Upcoming Billing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingData.upcomingBilling.map((billing) => (
              <div
                key={billing.id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-100"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{billing.clientName}</p>
                    <p className="text-sm text-slate-600">{billing.plan} Plan</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-slate-900">${billing.amount}</p>
                    <p className="text-sm text-slate-500">Due: {billing.dueDate}</p>
                  </div>
                  <Badge className={getStatusColor(billing.status)}>{billing.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
