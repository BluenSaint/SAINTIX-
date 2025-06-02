"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Edit, Phone, Mail, TrendingUp, FileText, DollarSign } from "lucide-react"

interface Client {
  id: number
  name: string
  email: string
  plan: string
  status: string
  joinDate: string
  currentScore: number
  scoreIncrease: number
  activeDisputes: number
  lastActivity: string
  revenue: number
  priority: string
}

interface ClientOverviewProps {
  clients: Client[]
}

export default function ClientOverview({ clients }: ClientOverviewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPlan, setFilterPlan] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || client.status.toLowerCase() === filterStatus
    const matchesPlan = filterPlan === "all" || client.plan.toLowerCase() === filterPlan

    return matchesSearch && matchesStatus && matchesPlan
  })

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

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Elite":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Advanced":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-slate-900">Client Management</h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search clients..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
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
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid gap-6">
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl"
          >
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{client.name}</h4>
                      <p className="text-sm text-slate-600">{client.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPlanColor(client.plan)}>{client.plan}</Badge>
                      <Badge className={getPriorityColor(client.priority)}>{client.priority} priority</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{client.status}</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-6 gap-6">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-700">Credit Score</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{client.currentScore}</p>
                      <p className="text-xs text-emerald-600">+{client.scoreIncrease} increase</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-slate-700">Disputes</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{client.activeDisputes}</p>
                      <p className="text-xs text-slate-600">active</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-slate-700">Revenue</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">${client.revenue}</p>
                      <p className="text-xs text-slate-600">total</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <span className="text-sm font-semibold text-slate-700">Join Date</span>
                      <p className="text-slate-900 mt-1">{client.joinDate}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <span className="text-sm font-semibold text-slate-700">Last Activity</span>
                      <p className="text-slate-900 mt-1">{client.lastActivity}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-xl">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Client
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            View Documents
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            View Progress
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

      {filteredClients.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No clients found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
