"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Upload,
  Eye,
  Archive,
  Search,
} from "lucide-react"

interface Notification {
  id: number
  type: string
  title: string
  message: string
  client?: string
  time: string
  status: string
  priority: string
  action?: string
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "payment",
    title: "Payment Failed",
    message: "Sarah Johnson's payment method was declined",
    client: "Sarah Johnson",
    time: "2 minutes ago",
    status: "unread",
    priority: "high",
    action: "Retry Payment",
  },
  {
    id: 2,
    type: "upload",
    title: "New Credit Report",
    message: "Mike Chen uploaded a new credit report for review",
    client: "Mike Chen",
    time: "15 minutes ago",
    status: "unread",
    priority: "medium",
    action: "Review Report",
  },
  {
    id: 3,
    type: "response",
    title: "Bureau Response",
    message: "Experian responded to dispute for Jessica Rodriguez",
    client: "Jessica Rodriguez",
    time: "1 hour ago",
    status: "read",
    priority: "high",
    action: "Process Response",
  },
  {
    id: 4,
    type: "system",
    title: "AI Suggestion",
    message: "New dispute opportunity identified for David Kim",
    client: "David Kim",
    time: "2 hours ago",
    status: "unread",
    priority: "low",
    action: "Review Suggestion",
  },
  {
    id: 5,
    type: "billing",
    title: "Renewal Reminder",
    message: "Emily Davis's subscription renews in 3 days",
    client: "Emily Davis",
    time: "3 hours ago",
    status: "read",
    priority: "medium",
    action: "Send Reminder",
  },
]

export default function InboxPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notification.client && notification.client.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <DollarSign className="w-4 h-4 text-red-600" />
      case "upload":
        return <Upload className="w-4 h-4 text-blue-600" />
      case "response":
        return <FileText className="w-4 h-4 text-green-600" />
      case "system":
        return <Bell className="w-4 h-4 text-purple-600" />
      case "billing":
        return <Clock className="w-4 h-4 text-amber-600" />
      default:
        return <Bell className="w-4 h-4 text-slate-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-green-100 text-green-700 border-green-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-red-50 border-red-200"
      case "upload":
        return "bg-blue-50 border-blue-200"
      case "response":
        return "bg-green-50 border-green-200"
      case "system":
        return "bg-purple-50 border-purple-200"
      case "billing":
        return "bg-amber-50 border-amber-200"
      default:
        return "bg-slate-50 border-slate-200"
    }
  }

  const unreadCount = mockNotifications.filter((n) => n.status === "unread").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inbox & Notifications</h1>
          <p className="text-slate-600 mt-1">Stay updated on all platform activity</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <Archive className="w-4 h-4 mr-2" />
            Archive All Read
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Unread</p>
                <p className="text-2xl font-bold text-red-900">{unreadCount}</p>
              </div>
              <Bell className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">High Priority</p>
                <p className="text-2xl font-bold text-amber-900">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">New Uploads</p>
                <p className="text-2xl font-bold text-blue-900">7</p>
              </div>
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Responses</p>
                <p className="text-2xl font-bold text-green-900">12</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payment Issues</SelectItem>
                <SelectItem value="upload">New Uploads</SelectItem>
                <SelectItem value="response">Bureau Responses</SelectItem>
                <SelectItem value="system">System Alerts</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications ({filteredNotifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                  notification.status === "unread" ? "bg-orange-50 border-orange-200" : getTypeColor(notification.type)
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-white rounded-lg border">{getTypeIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-900">{notification.title}</h4>
                        <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                        {notification.status === "unread" && (
                          <Badge className="bg-orange-100 text-orange-700 border-orange-200">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        {notification.client && <span>Client: {notification.client}</span>}
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button size="sm" variant="outline" className="rounded-lg">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {notification.action && (
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-lg">
                        {notification.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
