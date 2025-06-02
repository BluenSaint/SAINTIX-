"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  UserPlus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Mail,
  BarChart3,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const teamData = {
    members: [
      {
        id: 1,
        name: "Alex Johnson",
        email: "alex.johnson@saintrix.com",
        role: "Senior Specialist",
        department: "Dispute Resolution",
        status: "Active",
        joinDate: "2023-06-15",
        activeClients: 45,
        resolvedDisputes: 234,
        performance: 94,
      },
      {
        id: 2,
        name: "Sarah Chen",
        email: "sarah.chen@saintrix.com",
        role: "Credit Analyst",
        department: "Analysis",
        status: "Active",
        joinDate: "2023-08-20",
        activeClients: 38,
        resolvedDisputes: 189,
        performance: 91,
      },
      {
        id: 3,
        name: "Michael Rodriguez",
        email: "michael.rodriguez@saintrix.com",
        role: "Team Lead",
        department: "Operations",
        status: "Active",
        joinDate: "2023-03-10",
        activeClients: 52,
        resolvedDisputes: 312,
        performance: 97,
      },
    ],
    roles: [
      { name: "Admin", permissions: ["Full Access"], count: 2 },
      { name: "Team Lead", permissions: ["Manage Team", "View Reports"], count: 3 },
      { name: "Senior Specialist", permissions: ["Handle Disputes", "Client Contact"], count: 4 },
      { name: "Credit Analyst", permissions: ["Analyze Reports", "Create Disputes"], count: 3 },
    ],
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-700 border-red-200"
      case "Team Lead":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Senior Specialist":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-green-100 text-green-700 border-green-200"
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return "text-emerald-600"
    if (performance >= 90) return "text-blue-600"
    if (performance >= 85) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900">Team Management</h3>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-semibold text-sm mb-1">Total Members</p>
                <p className="text-3xl font-bold text-blue-800">{teamData.members.length}</p>
                <p className="text-xs text-blue-600 mt-1">Active team</p>
              </div>
              <div className="p-3 bg-blue-200/50 rounded-2xl">
                <Users className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 font-semibold text-sm mb-1">Avg Performance</p>
                <p className="text-3xl font-bold text-emerald-800">94%</p>
                <p className="text-xs text-emerald-600 mt-1">Team average</p>
              </div>
              <div className="p-3 bg-emerald-200/50 rounded-2xl">
                <BarChart3 className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 font-semibold text-sm mb-1">Active Clients</p>
                <p className="text-3xl font-bold text-purple-800">135</p>
                <p className="text-xs text-purple-600 mt-1">Total assigned</p>
              </div>
              <div className="p-3 bg-purple-200/50 rounded-2xl">
                <CheckCircle className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 font-semibold text-sm mb-1">Resolved Cases</p>
                <p className="text-3xl font-bold text-amber-800">735</p>
                <p className="text-xs text-amber-600 mt-1">This month</p>
              </div>
              <div className="p-3 bg-amber-200/50 rounded-2xl">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              Team Members
            </CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 rounded-xl"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="lead">Team Lead</SelectItem>
                  <SelectItem value="specialist">Specialist</SelectItem>
                  <SelectItem value="analyst">Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teamData.members.map((member) => (
              <div
                key={member.id}
                className="flex items-start justify-between p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                      <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{member.status}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      {member.email} • {member.department}
                    </p>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <span className="text-xs font-semibold text-slate-700">Active Clients</span>
                        <p className="text-lg font-bold text-slate-900">{member.activeClients}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <span className="text-xs font-semibold text-slate-700">Resolved</span>
                        <p className="text-lg font-bold text-slate-900">{member.resolvedDisputes}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <span className="text-xs font-semibold text-slate-700">Performance</span>
                        <p className={`text-lg font-bold ${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <span className="text-xs font-semibold text-slate-700">Join Date</span>
                        <p className="text-lg font-bold text-slate-900">{member.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
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
                        <Shield className="w-4 h-4 mr-2" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Performance
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles & Permissions */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            Roles & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {teamData.roles.map((role, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-slate-900">{role.name}</h4>
                  <Badge className={getRoleColor(role.name)}>{role.count} members</Badge>
                </div>
                <div className="space-y-2">
                  {role.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-slate-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
