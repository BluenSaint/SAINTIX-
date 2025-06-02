"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Eye,
  Send,
  RefreshCw,
} from "lucide-react"

interface Dispute {
  id: number
  clientName: string
  bureau: string
  disputeType: string
  dateSent: string
  responseStatus: string
  nextAction: string
  daysRemaining: number
  account: string
  status: string
}

const mockDisputes: Dispute[] = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    bureau: "Experian",
    disputeType: "Factual Dispute",
    dateSent: "2024-01-10",
    responseStatus: "Pending",
    nextAction: "Follow-up required",
    daysRemaining: 15,
    account: "Capital One Credit Card",
    status: "In Progress",
  },
  {
    id: 2,
    clientName: "Mike Chen",
    bureau: "Equifax",
    disputeType: "Metro2 Compliance",
    dateSent: "2024-01-05",
    responseStatus: "Resolved",
    nextAction: "Complete",
    daysRemaining: 0,
    account: "Chase Auto Loan",
    status: "Resolved",
  },
  {
    id: 3,
    clientName: "Jessica Rodriguez",
    bureau: "TransUnion",
    disputeType: "Debt Validation",
    dateSent: "2024-01-12",
    responseStatus: "Under Review",
    nextAction: "Awaiting response",
    daysRemaining: 18,
    account: "Medical Collection",
    status: "In Progress",
  },
  {
    id: 4,
    clientName: "David Kim",
    bureau: "Experian",
    disputeType: "Factual Dispute",
    dateSent: "2023-12-20",
    responseStatus: "Response Received",
    nextAction: "Review required",
    daysRemaining: 2,
    account: "Student Loan",
    status: "Action Required",
  },
  {
    id: 5,
    clientName: "Emily Davis",
    bureau: "Equifax",
    disputeType: "Metro2 Compliance",
    dateSent: "2024-01-08",
    responseStatus: "Pending",
    nextAction: "Monitor",
    daysRemaining: 22,
    account: "Mortgage",
    status: "In Progress",
  },
]

export default function DisputesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBureau, setFilterBureau] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredDisputes = mockDisputes.filter((dispute) => {
    const matchesSearch =
      dispute.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.account.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBureau = filterBureau === "all" || dispute.bureau.toLowerCase() === filterBureau
    const matchesType = filterType === "all" || dispute.disputeType.toLowerCase().includes(filterType.toLowerCase())
    const matchesStatus = filterStatus === "all" || dispute.status.toLowerCase().includes(filterStatus.toLowerCase())

    return matchesSearch && matchesBureau && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        )
      case "in progress":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "action required":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Action Required
          </Badge>
        )
      default:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">{status}</Badge>
    }
  }

  const getBureauBadge = (bureau: string) => {
    const colors = {
      Experian: "bg-red-100 text-red-700 border-red-200",
      Equifax: "bg-blue-100 text-blue-700 border-blue-200",
      TransUnion: "bg-green-100 text-green-700 border-green-200",
    }
    return (
      <Badge className={colors[bureau as keyof typeof colors] || "bg-slate-100 text-slate-700 border-slate-200"}>
        {bureau}
      </Badge>
    )
  }

  const getDaysRemainingColor = (days: number) => {
    if (days <= 5) return "text-red-600"
    if (days <= 10) return "text-amber-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Disputes Dashboard</h1>
          <p className="text-slate-600 mt-1">Track all dispute progress across bureaus</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Responses
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl">
            <Send className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Disputes</p>
                <p className="text-2xl font-bold text-blue-900">1,234</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Pending Response</p>
                <p className="text-2xl font-bold text-amber-900">87</p>
              </div>
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Action Required</p>
                <p className="text-2xl font-bold text-red-900">23</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Success Rate</p>
                <p className="text-2xl font-bold text-green-900">87%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bureau Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Bureau Response Timeline</CardTitle>
          <p className="text-sm text-slate-600">Average response times and success rates</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">Experian</span>
                <Badge className="bg-red-100 text-red-700 border-red-200">89% Success</Badge>
              </div>
              <Progress value={89} className="h-2" />
              <p className="text-sm text-slate-600">Avg: 18 days response</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">Equifax</span>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">84% Success</Badge>
              </div>
              <Progress value={84} className="h-2" />
              <p className="text-sm text-slate-600">Avg: 22 days response</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-900">TransUnion</span>
                <Badge className="bg-green-100 text-green-700 border-green-200">91% Success</Badge>
              </div>
              <Progress value={91} className="h-2" />
              <p className="text-sm text-slate-600">Avg: 16 days response</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by client name or account..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>

            <Select value={filterBureau} onValueChange={setFilterBureau}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Bureau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bureaus</SelectItem>
                <SelectItem value="experian">Experian</SelectItem>
                <SelectItem value="equifax">Equifax</SelectItem>
                <SelectItem value="transunion">TransUnion</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 rounded-xl">
                <SelectValue placeholder="Dispute Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="factual">Factual Dispute</SelectItem>
                <SelectItem value="metro2">Metro2 Compliance</SelectItem>
                <SelectItem value="debt">Debt Validation</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="action">Action Required</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disputes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Disputes ({filteredDisputes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Account</TableHead>
                <TableHead>Bureau</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Sent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDisputes.map((dispute) => (
                <TableRow key={dispute.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{dispute.clientName}</div>
                      <div className="text-sm text-slate-500">{dispute.account}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getBureauBadge(dispute.bureau)}</TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{dispute.disputeType}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{dispute.dateSent}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getDaysRemainingColor(dispute.daysRemaining)}`}>
                      {dispute.daysRemaining > 0 ? `${dispute.daysRemaining} days` : "Complete"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{dispute.nextAction}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Send className="w-4 h-4" />
                      </Button>
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
