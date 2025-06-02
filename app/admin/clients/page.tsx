"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Pause,
  FileText,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"

interface Client {
  id: number
  name: string
  email: string
  plan: string
  creditScore: number
  scoreChange: number
  lastUpload: string
  disputeStatus: string
  paymentStatus: string
  riskScore: string
  joinDate: string
  totalRevenue: number
  activeDisputes: number
}

const mockClients: Client[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    plan: "Advanced",
    creditScore: 687,
    scoreChange: 47,
    lastUpload: "2024-01-15",
    disputeStatus: "In Progress",
    paymentStatus: "Current",
    riskScore: "Low",
    joinDate: "2023-11-12",
    totalRevenue: 447,
    activeDisputes: 3,
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    plan: "Elite",
    creditScore: 742,
    scoreChange: 89,
    lastUpload: "2024-01-14",
    disputeStatus: "Resolved",
    paymentStatus: "Current",
    riskScore: "Low",
    joinDate: "2023-10-05",
    totalRevenue: 747,
    activeDisputes: 0,
  },
  {
    id: 3,
    name: "Jessica Rodriguez",
    email: "j.rodriguez@email.com",
    plan: "Basic",
    creditScore: 623,
    scoreChange: 23,
    lastUpload: "2024-01-10",
    disputeStatus: "Pending",
    paymentStatus: "Overdue",
    riskScore: "High",
    joinDate: "2023-12-20",
    totalRevenue: 178,
    activeDisputes: 2,
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    plan: "Advanced",
    creditScore: 701,
    scoreChange: 62,
    lastUpload: "2024-01-13",
    disputeStatus: "In Progress",
    paymentStatus: "Current",
    riskScore: "Medium",
    joinDate: "2023-09-18",
    totalRevenue: 596,
    activeDisputes: 4,
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.d@email.com",
    plan: "Elite",
    creditScore: 756,
    scoreChange: 94,
    lastUpload: "2024-01-16",
    disputeStatus: "Resolved",
    paymentStatus: "Current",
    riskScore: "Low",
    joinDate: "2023-08-22",
    totalRevenue: 1245,
    activeDisputes: 1,
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPlan, setFilterPlan] = useState("all")
  const [filterPayment, setFilterPayment] = useState("all")

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "all" || client.disputeStatus.toLowerCase().includes(filterStatus.toLowerCase())
    const matchesPlan = filterPlan === "all" || client.plan.toLowerCase() === filterPlan
    const matchesPayment = filterPayment === "all" || client.paymentStatus.toLowerCase() === filterPayment

    return matchesSearch && matchesStatus && matchesPlan && matchesPayment
  })

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        )
      case "in progress":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        )
      default:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "current":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Current</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Overdue</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">{status}</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Low</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Medium</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-700 border-red-200">High</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">{risk}</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "elite":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Elite</Badge>
      case "advanced":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Advanced</Badge>
      case "basic":
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">Basic</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">{plan}</Badge>
    }
  }

  const getScoreChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-slate-400" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Client Overview</h1>
          <p className="text-slate-600 mt-1">Manage all client accounts and track progress</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <FileText className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 rounded-xl">
                <SelectValue placeholder="Dispute Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="elite">Elite</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPayment} onValueChange={setFilterPayment}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clients ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Credit Score</TableHead>
                <TableHead>Last Upload</TableHead>
                <TableHead>Dispute Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{client.name}</div>
                      <div className="text-sm text-slate-500">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(client.plan)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{client.creditScore}</span>
                      <div className="flex items-center gap-1">
                        {getScoreChangeIcon(client.scoreChange)}
                        <span
                          className={`text-sm ${client.scoreChange > 0 ? "text-green-600" : client.scoreChange < 0 ? "text-red-600" : "text-slate-400"}`}
                        >
                          {client.scoreChange > 0 ? "+" : ""}
                          {client.scoreChange}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{client.lastUpload}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(client.disputeStatus)}</TableCell>
                  <TableCell>{getPaymentBadge(client.paymentStatus)}</TableCell>
                  <TableCell>{getRiskBadge(client.riskScore)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{client.totalRevenue}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Letter
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Brain className="w-4 h-4 mr-2" />
                            AI Summary
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause Client
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
