"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, Calendar, TrendingUp, Users, DollarSign, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30")

  // Mock data for charts
  const creditScoreData = [
    { month: "Jan", avgScore: 620, newClients: 640, activeClients: 635 },
    { month: "Feb", avgScore: 632, newClients: 645, activeClients: 640 },
    { month: "Mar", avgScore: 645, newClients: 650, activeClients: 648 },
    { month: "Apr", avgScore: 658, newClients: 655, activeClients: 660 },
    { month: "May", avgScore: 670, newClients: 660, activeClients: 672 },
    { month: "Jun", avgScore: 683, newClients: 665, activeClients: 685 },
  ]

  const disputeSuccessData = [
    { name: "Experian", success: 89, pending: 11 },
    { name: "Equifax", success: 84, pending: 16 },
    { name: "TransUnion", success: 91, pending: 9 },
  ]

  const disputeTypeData = [
    { name: "Factual Error", value: 45 },
    { name: "Debt Validation", value: 30 },
    { name: "Metro2 Compliance", value: 15 },
    { name: "Identity Theft", value: 10 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
    { month: "Feb", revenue: 45000, expenses: 29000, profit: 16000 },
    { month: "Mar", revenue: 48000, expenses: 30000, profit: 18000 },
    { month: "Apr", revenue: 51000, expenses: 31000, profit: 20000 },
    { month: "May", revenue: 54000, expenses: 32000, profit: 22000 },
    { month: "Jun", revenue: 58000, expenses: 33000, profit: 25000 },
  ]

  const clientAcquisitionData = [
    { name: "Referrals", value: 40 },
    { name: "Organic Search", value: 25 },
    { name: "Social Media", value: 20 },
    { name: "Paid Ads", value: 15 },
  ]

  const aiTaskData = [
    { name: "Letter Generation", value: 45 },
    { name: "Client Onboarding", value: 25 },
    { name: "Dispute Analysis", value: 20 },
    { name: "Risk Assessment", value: 10 },
  ]

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"]

  const keyMetrics = [
    {
      title: "Average Score Increase",
      value: "+127",
      change: "+12",
      changeType: "positive",
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      color: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    },
    {
      title: "Active Clients",
      value: "2,847",
      change: "+156",
      changeType: "positive",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    },
    {
      title: "Monthly Revenue",
      value: "$487K",
      change: "+23%",
      changeType: "positive",
      icon: <DollarSign className="w-8 h-8 text-purple-600" />,
      color: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    },
    {
      title: "Dispute Success Rate",
      value: "87%",
      change: "+3%",
      changeType: "positive",
      icon: <FileText className="w-8 h-8 text-orange-600" />,
      color: "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600 mt-1">Comprehensive performance metrics and insights</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className={metric.color}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.changeType === "positive" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={metric.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                {metric.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="credit" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="credit" className="rounded-lg">
            Credit Scores
          </TabsTrigger>
          <TabsTrigger value="disputes" className="rounded-lg">
            Disputes
          </TabsTrigger>
          <TabsTrigger value="revenue" className="rounded-lg">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="clients" className="rounded-lg">
            Client Acquisition
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-lg">
            AI Performance
          </TabsTrigger>
        </TabsList>

        {/* Credit Scores Tab */}
        <TabsContent value="credit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Score Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    avgScore: {
                      label: "Average Score",
                      color: "hsl(var(--chart-1))",
                    },
                    newClients: {
                      label: "New Clients",
                      color: "hsl(var(--chart-2))",
                    },
                    activeClients: {
                      label: "Active Clients",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={creditScoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[600, 700]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="avgScore" stroke="var(--color-avgScore)" strokeWidth={2} />
                      <Line type="monotone" dataKey="newClients" stroke="var(--color-newClients)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="activeClients"
                        stroke="var(--color-activeClients)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Improvement by Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Elite Plan</span>
                    <span className="font-medium">+147 points</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Advanced Plan</span>
                    <span className="font-medium">+127 points</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Basic Plan</span>
                    <span className="font-medium">+98 points</span>
                  </div>
                  <Progress value={56} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Clients",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { range: "500-550", value: 124 },
                          { range: "551-600", value: 345 },
                          { range: "601-650", value: 678 },
                          { range: "651-700", value: 987 },
                          { range: "701-750", value: 543 },
                          { range: "751+", value: 170 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="var(--color-value)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Success Rate by Bureau</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      success: {
                        label: "Success",
                        color: "hsl(var(--chart-1))",
                      },
                      pending: {
                        label: "Pending",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={disputeSuccessData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="success" stackId="a" fill="var(--color-success)" />
                        <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dispute Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={disputeTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {disputeTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Timeline Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    submitted: {
                      label: "Submitted",
                      color: "hsl(var(--chart-1))",
                    },
                    resolved: {
                      label: "Resolved",
                      color: "hsl(var(--chart-2))",
                    },
                    success: {
                      label: "Success Rate",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", submitted: 245, resolved: 210, success: 86 },
                        { month: "Feb", submitted: 267, resolved: 230, success: 86 },
                        { month: "Mar", submitted: 289, resolved: 250, success: 87 },
                        { month: "Apr", submitted: 312, resolved: 275, success: 88 },
                        { month: "May", submitted: 334, resolved: 295, success: 88 },
                        { month: "Jun", submitted: 356, resolved: 315, success: 89 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="submitted"
                        stroke="var(--color-submitted)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="resolved"
                        stroke="var(--color-resolved)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="success"
                        stroke="var(--color-success)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    expenses: {
                      label: "Expenses",
                      color: "hsl(var(--chart-2))",
                    },
                    profit: {
                      label: "Profit",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" />
                      <Bar dataKey="expenses" fill="var(--color-expenses)" />
                      <Bar dataKey="profit" fill="var(--color-profit)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Basic Plan", value: 110950 },
                            { name: "Advanced Plan", value: 172244 },
                            { name: "Elite Plan", value: 110656 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#0088FE" />
                          <Cell fill="#00C49F" />
                          <Cell fill="#FFBB28" />
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Lifetime Value</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Elite Plan</span>
                    <span className="font-medium">$2,490</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Advanced Plan</span>
                    <span className="font-medium">$1,788</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Basic Plan</span>
                    <span className="font-medium">$1,068</span>
                  </div>
                  <Progress value={43} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Client Acquisition Tab */}
        <TabsContent value="clients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Acquisition Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={clientAcquisitionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {clientAcquisitionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      retention: {
                        label: "Retention Rate",
                        color: "hsl(var(--chart-1))",
                      },
                      churn: {
                        label: "Churn Rate",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", retention: 92, churn: 8 },
                          { month: "Feb", retention: 93, churn: 7 },
                          { month: "Mar", retention: 94, churn: 6 },
                          { month: "Apr", retention: 94, churn: 6 },
                          { month: "May", retention: 95, churn: 5 },
                          { month: "Jun", retention: 96, churn: 4 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="retention" stroke="var(--color-retention)" strokeWidth={2} />
                        <Line type="monotone" dataKey="churn" stroke="var(--color-churn)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Client Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    newClients: {
                      label: "New Clients",
                      color: "hsl(var(--chart-1))",
                    },
                    totalClients: {
                      label: "Total Clients",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", newClients: 156, totalClients: 2247 },
                        { month: "Feb", newClients: 178, totalClients: 2425 },
                        { month: "Mar", newClients: 189, totalClients: 2614 },
                        { month: "Apr", newClients: 201, totalClients: 2815 },
                        { month: "May", newClients: 212, totalClients: 3027 },
                        { month: "Jun", newClients: 224, totalClients: 3251 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="newClients"
                        stroke="var(--color-newClients)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="totalClients"
                        stroke="var(--color-totalClients)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Performance Tab */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    accuracy: {
                      label: "Accuracy",
                      color: "hsl(var(--chart-1))",
                    },
                    efficiency: {
                      label: "Efficiency",
                      color: "hsl(var(--chart-2))",
                    },
                    satisfaction: {
                      label: "Satisfaction",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", accuracy: 91, efficiency: 87, satisfaction: 89 },
                        { month: "Feb", accuracy: 92, efficiency: 88, satisfaction: 90 },
                        { month: "Mar", accuracy: 93, efficiency: 90, satisfaction: 91 },
                        { month: "Apr", accuracy: 94, efficiency: 91, satisfaction: 92 },
                        { month: "May", accuracy: 94, efficiency: 93, satisfaction: 93 },
                        { month: "Jun", accuracy: 95, efficiency: 94, satisfaction: 94 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" strokeWidth={2} />
                      <Line type="monotone" dataKey="efficiency" stroke="var(--color-efficiency)" strokeWidth={2} />
                      <Line type="monotone" dataKey="satisfaction" stroke="var(--color-satisfaction)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Task Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={aiTaskData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {aiTaskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Saved by AI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Letter Generation</span>
                    <span className="font-medium">87 hours/month</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Client Onboarding</span>
                    <span className="font-medium">64 hours/month</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dispute Analysis</span>
                    <span className="font-medium">93 hours/month</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Risk Assessment</span>
                    <span className="font-medium">42 hours/month</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
