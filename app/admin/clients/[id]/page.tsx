"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  Phone,
  Calendar,
  CreditCard,
  TrendingUp,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  Send,
  Download,
  Pause,
  Brain,
  ChevronLeft,
  Edit,
  Plus,
  Eye,
} from "lucide-react"

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = params.id

  // Mock client data - in a real app, this would be fetched based on the clientId
  const client = {
    id: clientId,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    plan: "Advanced",
    joinDate: "November 12, 2023",
    creditScore: {
      current: 687,
      initial: 640,
      change: 47,
      history: [640, 645, 652, 660, 671, 687],
    },
    riskScore: "Low",
    paymentStatus: "Current",
    nextPayment: "February 15, 2024",
    totalRevenue: "$447",
    activeDisputes: 3,
    completedDisputes: 7,
    successRate: 85,
    lastUpload: "January 15, 2024",
    aiSummary:
      "Client is making good progress with consistent improvement across all bureaus. Recommend focusing on the Capital One account next as it has the highest chance of removal based on our AI analysis.",
  }

  const disputeHistory = [
    {
      id: 1,
      account: "Chase Credit Card",
      bureau: "Experian",
      type: "Factual Dispute",
      dateSent: "December 5, 2023",
      status: "Removed",
      responseDate: "December 28, 2023",
    },
    {
      id: 2,
      account: "Medical Collection",
      bureau: "TransUnion",
      type: "Debt Validation",
      dateSent: "December 12, 2023",
      status: "Removed",
      responseDate: "January 2, 2024",
    },
    {
      id: 3,
      account: "Capital One Credit Card",
      bureau: "Experian",
      type: "Factual Dispute",
      dateSent: "January 10, 2024",
      status: "In Progress",
      responseDate: "-",
    },
  ]

  const letterHistory = [
    {
      id: 1,
      title: "Initial Dispute Letter - Experian",
      dateSent: "December 5, 2023",
      type: "Factual Dispute",
      version: "v1",
    },
    {
      id: 2,
      title: "Initial Dispute Letter - TransUnion",
      dateSent: "December 12, 2023",
      type: "Debt Validation",
      version: "v1",
    },
    {
      id: 3,
      title: "Follow-up Letter - Experian",
      dateSent: "January 10, 2024",
      type: "Factual Dispute",
      version: "v2",
    },
  ]

  const paymentHistory = [
    {
      id: 1,
      date: "January 15, 2024",
      amount: "$149.00",
      status: "Paid",
      method: "Visa •••• 4242",
    },
    {
      id: 2,
      date: "December 15, 2023",
      amount: "$149.00",
      status: "Paid",
      method: "Visa •••• 4242",
    },
    {
      id: 3,
      date: "November 15, 2023",
      amount: "$149.00",
      status: "Paid",
      method: "Visa •••• 4242",
    },
  ]

  const timeline = [
    {
      id: 1,
      date: "January 15, 2024",
      event: "Credit Report Uploaded",
      details: "New credit report from Experian",
      type: "upload",
    },
    {
      id: 2,
      date: "January 10, 2024",
      event: "Dispute Letter Sent",
      details: "Follow-up letter to Experian",
      type: "letter",
    },
    {
      id: 3,
      date: "January 2, 2024",
      event: "Dispute Resolved",
      details: "Medical Collection removed from TransUnion",
      type: "success",
    },
    {
      id: 4,
      date: "December 28, 2023",
      event: "Dispute Resolved",
      details: "Chase Credit Card removed from Experian",
      type: "success",
    },
    {
      id: 5,
      date: "December 15, 2023",
      event: "Payment Processed",
      details: "$149.00 monthly subscription",
      type: "payment",
    },
  ]

  const [notes, setNotes] = useState(
    "Client is very responsive and follows instructions well. Has expressed interest in business credit after personal credit is improved.",
  )

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "upload":
        return (
          <div className="p-2 bg-blue-100 rounded-full">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
        )
      case "letter":
        return (
          <div className="p-2 bg-amber-100 rounded-full">
            <Send className="w-4 h-4 text-amber-600" />
          </div>
        )
      case "success":
        return (
          <div className="p-2 bg-green-100 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
        )
      case "payment":
        return (
          <div className="p-2 bg-purple-100 rounded-full">
            <CreditCard className="w-4 h-4 text-purple-600" />
          </div>
        )
      default:
        return (
          <div className="p-2 bg-slate-100 rounded-full">
            <Clock className="w-4 h-4 text-slate-600" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="rounded-full">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Clients
        </Button>
      </div>

      {/* Client Profile Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">{client.plan}</Badge>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Active
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">Joined: {client.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">Next Payment: {client.nextPayment}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl">
                    <Send className="w-4 h-4 mr-2" />
                    Generate Letter
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause AI
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-80">
          <CardHeader>
            <CardTitle className="text-lg">Credit Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-slate-900">{client.creditScore.current}</div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">+{client.creditScore.change}</span>
              </div>
            </div>
            <Progress value={(client.creditScore.current / 850) * 100} className="h-2" />
            <div className="flex justify-between text-sm text-slate-500">
              <span>Initial: {client.creditScore.initial}</span>
              <span>Goal: 750+</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Brain className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-orange-900 mb-1">AI Summary & Recommendations</h3>
              <p className="text-orange-800">{client.aiSummary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg">
            Overview
          </TabsTrigger>
          <TabsTrigger value="disputes" className="rounded-lg">
            Disputes
          </TabsTrigger>
          <TabsTrigger value="letters" className="rounded-lg">
            Letters
          </TabsTrigger>
          <TabsTrigger value="payments" className="rounded-lg">
            Payments
          </TabsTrigger>
          <TabsTrigger value="documents" className="rounded-lg">
            Documents
          </TabsTrigger>
          <TabsTrigger value="notes" className="rounded-lg">
            Notes
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dispute Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Active Disputes</span>
                  <span className="font-medium text-slate-900">{client.activeDisputes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Completed Disputes</span>
                  <span className="font-medium text-slate-900">{client.completedDisputes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Success Rate</span>
                  <span className="font-medium text-green-600">{client.successRate}%</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full rounded-xl">
                    <FileText className="w-4 h-4 mr-2" />
                    View All Disputes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Plan</span>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">{client.plan}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Monthly Fee</span>
                  <span className="font-medium text-slate-900">$149.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Revenue</span>
                  <span className="font-medium text-slate-900">{client.totalRevenue}</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full rounded-xl">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Billing
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Risk Score</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">{client.riskScore}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Payment Status</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">{client.paymentStatus}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Last Upload</span>
                  <span className="font-medium text-slate-900">{client.lastUpload}</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full rounded-xl">
                    <Brain className="w-4 h-4 mr-2" />
                    AI Risk Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={item.id} className="flex gap-4">
                    {getTimelineIcon(item.type)}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-medium text-slate-900">{item.event}</h4>
                        <span className="text-sm text-slate-500">{item.date}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{item.details}</p>
                      {index < timeline.length - 1 && <div className="border-l-2 border-slate-200 h-6 ml-2 mt-2"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Dispute History</CardTitle>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                New Dispute
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputeHistory.map((dispute) => (
                  <div key={dispute.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-slate-900">{dispute.account}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge
                            className={
                              dispute.bureau === "Experian"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : dispute.bureau === "TransUnion"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-blue-100 text-blue-700 border-blue-200"
                            }
                          >
                            {dispute.bureau}
                          </Badge>
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200">{dispute.type}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge
                          className={
                            dispute.status === "Removed"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }
                        >
                          {dispute.status}
                        </Badge>
                        <div className="flex gap-4 text-sm text-slate-500 mt-1">
                          <span>Sent: {dispute.dateSent}</span>
                          <span>Response: {dispute.responseDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {dispute.status === "In Progress" && (
                        <Button size="sm" variant="outline" className="rounded-lg">
                          <Send className="w-4 h-4 mr-2" />
                          Follow Up
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Letters Tab */}
        <TabsContent value="letters" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Letter History</CardTitle>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Generate Letter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {letterHistory.map((letter) => (
                  <div key={letter.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-slate-900">{letter.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200">{letter.type}</Badge>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200">{letter.version}</Badge>
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">Sent: {letter.dateSent}</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payment History</CardTitle>
              <Button size="sm" variant="outline" className="rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-slate-400" />
                          <h4 className="font-medium text-slate-900">{payment.method}</h4>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">Date: {payment.date}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-slate-900">{payment.amount}</span>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">{payment.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Document Vault</CardTitle>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Request Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Experian Credit Report</h4>
                        <p className="text-sm text-slate-500">Uploaded: January 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">TransUnion Credit Report</h4>
                        <p className="text-sm text-slate-500">Uploaded: December 12, 2023</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Equifax Credit Report</h4>
                        <p className="text-sm text-slate-500">Uploaded: December 5, 2023</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Signed Service Agreement</h4>
                        <p className="text-sm text-slate-500">Uploaded: November 12, 2023</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full min-h-[200px] p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Add notes about this client..."
                />
                <div className="flex justify-end">
                  <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl">Save Notes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
