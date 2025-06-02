"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
  FileText,
} from "lucide-react"

interface Dispute {
  id: number
  clientName: string
  account: string
  bureau: string
  status: string
  priority: string
  filed: string
  assignedTo: string
  estimatedResolution: string
}

interface DisputeManagementProps {
  disputes: Dispute[]
}

export default function DisputeManagement({ disputes }: DisputeManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      dispute.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.account.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || dispute.status.toLowerCase().includes(filterStatus.toLowerCase())
    const matchesPriority = filterPriority === "all" || dispute.priority.toLowerCase() === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "in review":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "pending response":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-green-100 text-green-700 border-green-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />
      case "in review":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "pending response":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />
      default:
        return <FileText className="w-5 h-5 text-slate-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-slate-900">Dispute Management</h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search disputes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 rounded-xl"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in review">In Review</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            New Dispute
          </Button>
        </div>
      </div>

      {/* Dispute Cards */}
      <div className="grid gap-6">
        {filteredDisputes.map((dispute) => (
          <Card
            key={dispute.id}
            className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl"
          >
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
                      {getStatusIcon(dispute.status)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{dispute.account}</h4>
                      <p className="text-sm text-slate-600">Client: {dispute.clientName}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(dispute.status)}>{dispute.status}</Badge>
                      <Badge className={getPriorityColor(dispute.priority)}>{dispute.priority} Priority</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 gap-6">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">Bureau</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">{dispute.bureau}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-slate-700">Filed Date</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">{dispute.filed}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-slate-700">Assigned To</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">{dispute.assignedTo}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-semibold text-slate-700">Est. Resolution</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">{dispute.estimatedResolution}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-xl">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Resolved
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="w-4 h-4 mr-2" />
                            Reassign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Add Note
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDisputes.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No disputes found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
