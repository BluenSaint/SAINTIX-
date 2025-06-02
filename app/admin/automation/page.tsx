"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Brain,
  Bot,
  Play,
  Settings,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Eye,
  Users,
} from "lucide-react"

export default function AutomationPage() {
  const [globalAutomation, setGlobalAutomation] = useState(true)
  const [letterGeneration, setLetterGeneration] = useState(true)
  const [responseProcessing, setResponseProcessing] = useState(true)
  const [clientOnboarding, setClientOnboarding] = useState(false)

  const automationStats = {
    totalClients: 1847,
    activeAutomation: 1623,
    lettersGenerated: 47,
    responsesProcessed: 23,
    itemsFlagged: 156,
    successRate: 87,
  }

  const recentActivity = [
    {
      id: 1,
      action: "Letter generated",
      client: "Sarah Johnson",
      details: "Experian factual dispute letter",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      action: "Response processed",
      client: "Mike Chen",
      details: "Equifax response - item removed",
      time: "5 minutes ago",
      status: "success",
    },
    {
      id: 3,
      action: "Manual review required",
      client: "Jessica Rodriguez",
      details: "Complex dispute flagged",
      time: "8 minutes ago",
      status: "warning",
    },
    {
      id: 4,
      action: "Letter generated",
      client: "David Kim",
      details: "TransUnion Metro2 compliance",
      time: "12 minutes ago",
      status: "success",
    },
    {
      id: 5,
      action: "Client onboarded",
      client: "Emily Davis",
      details: "AI analysis completed",
      time: "15 minutes ago",
      status: "success",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      task: "Generate follow-up letter",
      client: "Robert Wilson",
      priority: "High",
      estimatedTime: "2 minutes",
    },
    {
      id: 2,
      task: "Process bureau response",
      client: "Lisa Anderson",
      priority: "Medium",
      estimatedTime: "5 minutes",
    },
    {
      id: 3,
      task: "Analyze credit report",
      client: "James Taylor",
      priority: "Low",
      estimatedTime: "8 minutes",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />
      default:
        return <Clock className="w-4 h-4 text-blue-600" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Saintrix Takeover</h1>
          <p className="text-slate-600 mt-1">AI automation control and monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl">
            <Activity className="w-4 h-4 mr-2" />
            View Logs
          </Button>
        </div>
      </div>

      {/* Global Status */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-orange-900">AI Automation Status</CardTitle>
                <p className="text-sm text-orange-700">
                  {globalAutomation ? "Active and processing" : "Paused - manual mode"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={
                  globalAutomation
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${globalAutomation ? "bg-green-500" : "bg-red-500"}`}></div>
                {globalAutomation ? "Active" : "Paused"}
              </Badge>
              <Switch
                checked={globalAutomation}
                onCheckedChange={setGlobalAutomation}
                className="data-[state=checked]:bg-orange-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-slate-700">Active Clients</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{automationStats.activeAutomation}</div>
              <p className="text-xs text-slate-600">of {automationStats.totalClients} total</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Letters Today</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{automationStats.lettersGenerated}</div>
              <p className="text-xs text-slate-600">generated automatically</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-slate-700">Responses</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{automationStats.responsesProcessed}</div>
              <p className="text-xs text-slate-600">processed today</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-slate-700">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{automationStats.successRate}%</div>
              <p className="text-xs text-slate-600">last 30 days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-orange-600" />
              Automation Modules
            </CardTitle>
            <p className="text-sm text-slate-600">Control individual AI features</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <h4 className="font-medium text-slate-900">Letter Generation</h4>
                <p className="text-sm text-slate-600">Auto-generate dispute letters</p>
              </div>
              <Switch
                checked={letterGeneration}
                onCheckedChange={setLetterGeneration}
                disabled={!globalAutomation}
                className="data-[state=checked]:bg-orange-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <h4 className="font-medium text-slate-900">Response Processing</h4>
                <p className="text-sm text-slate-600">Auto-process bureau responses</p>
              </div>
              <Switch
                checked={responseProcessing}
                onCheckedChange={setResponseProcessing}
                disabled={!globalAutomation}
                className="data-[state=checked]:bg-orange-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <h4 className="font-medium text-slate-900">Client Onboarding</h4>
                <p className="text-sm text-slate-600">Auto-analyze new uploads</p>
              </div>
              <Switch
                checked={clientOnboarding}
                onCheckedChange={setClientOnboarding}
                disabled={!globalAutomation}
                className="data-[state=checked]:bg-orange-500"
              />
            </div>

            <div className="pt-4 border-t">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl">
                <Settings className="w-4 h-4 mr-2" />
                Advanced Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              Live Activity Feed
            </CardTitle>
            <p className="text-sm text-slate-600">Real-time automation actions</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.client}</p>
                    <p className="text-xs text-slate-500">{activity.details}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Pending AI Tasks
              </CardTitle>
              <p className="text-sm text-slate-600">Tasks queued for automation</p>
            </div>
            <Button variant="outline" className="rounded-xl">
              <Play className="w-4 h-4 mr-2" />
              Process All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-slate-900">{task.task}</h4>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Client: {task.client}</p>
                  <p className="text-xs text-slate-500">Est. time: {task.estimatedTime}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-lg">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Automation Performance</CardTitle>
            <p className="text-sm text-slate-600">Last 30 days</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Letter Generation Success</span>
                <span className="font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Processing Accuracy</span>
                <span className="font-medium">91%</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Client Satisfaction</span>
                <span className="font-medium">96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Savings</CardTitle>
            <p className="text-sm text-slate-600">Automation efficiency gains</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="text-2xl font-bold text-green-900">247 hours</div>
              <p className="text-sm text-green-700">saved this month</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-900">$12,350</div>
              <p className="text-sm text-blue-700">cost savings</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <div className="text-2xl font-bold text-purple-900">1,847</div>
              <p className="text-sm text-purple-700">clients managed automatically</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
