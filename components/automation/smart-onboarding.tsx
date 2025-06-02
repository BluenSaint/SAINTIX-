"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCheck,
  FileText,
  Loader2,
  Upload,
  UserCheck,
  Zap,
  CreditCard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SmartOnboarding() {
  const [activeTab, setActiveTab] = useState("overview")
  const [automationEnabled, setAutomationEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Smart Onboarding</h2>
          <p className="text-muted-foreground">Automate your client onboarding process with AI-powered workflows</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Configure</Button>
          <Button>
            <Zap className="mr-2 h-4 w-4" />
            New Client
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Onboardings</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 days</div>
                <p className="text-xs text-muted-foreground">-0.8 days from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents Processed</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">284</div>
                <p className="text-xs text-muted-foreground">+42 from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Onboardings</CardTitle>
              <CardDescription>Track the progress of your most recent client onboardings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOnboardings.map((client) => (
                  <div key={client.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <span className="text-white font-medium">{client.initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-40">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">{client.progress}%</span>
                          <span className="text-xs text-muted-foreground">{client.stage}</span>
                        </div>
                        <Progress value={client.progress} className="h-2" />
                      </div>
                      <Badge variant={getBadgeVariant(client.status)}>{client.status}</Badge>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Onboardings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {onboardingTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{template.name}</CardTitle>
                    <Badge variant={template.active ? "default" : "outline"}>
                      {template.active ? "Active" : "Draft"}
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Steps:</span>
                      <span className="font-medium">{template.steps}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Documents:</span>
                      <span className="font-medium">{template.documents}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Avg. Completion:</span>
                      <span className="font-medium">{template.avgCompletion}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Edit</Button>
                  <Button>Use Template</Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Create New Template</CardTitle>
                <CardDescription>Design a custom onboarding workflow for your clients</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Start from scratch or use one of our pre-built templates to create your custom onboarding workflow
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create Template</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Automation Settings</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant={automationEnabled ? "default" : "outline"}>
                    {automationEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
              <CardDescription>Configure your automated onboarding workflows and triggers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertTitle>Automation is active</AlertTitle>
                <AlertDescription>
                  Your onboarding automation is currently processing 12 active clients.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Automated Tasks</h3>
                <div className="space-y-2">
                  {automatedTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`rounded-full p-1.5 ${task.enabled ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
                        >
                          {task.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{task.name}</p>
                          <p className="text-xs text-muted-foreground">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={task.enabled ? "default" : "outline"} className="text-xs">
                          {task.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Integration Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-muted p-1.5">{integration.icon}</div>
                        <div>
                          <p className="text-sm font-medium">{integration.name}</p>
                          <p className="text-xs text-muted-foreground">{integration.status}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Analytics</CardTitle>
              <CardDescription>Track the performance and efficiency of your onboarding process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/5">
                <p className="text-muted-foreground">Analytics chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rates</CardTitle>
                <CardDescription>Percentage of clients completing each onboarding step</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completionRates.map((step) => (
                    <div key={step.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{step.name}</span>
                        <span className="text-sm">{step.rate}%</span>
                      </div>
                      <Progress value={step.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Analysis</CardTitle>
                <CardDescription>Average time spent on each onboarding phase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeAnalysis.map((phase) => (
                    <div key={phase.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{phase.name}</p>
                        <p className="text-xs text-muted-foreground">{phase.description}</p>
                      </div>
                      <div className="text-sm font-medium">{phase.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function for badge variants
function getBadgeVariant(status: string) {
  switch (status) {
    case "Completed":
      return "success"
    case "In Progress":
      return "default"
    case "Pending":
      return "secondary"
    case "Stalled":
      return "destructive"
    default:
      return "outline"
  }
}

// Sample data
const recentOnboardings = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    initials: "SJ",
    progress: 100,
    stage: "Completed",
    status: "Completed",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    initials: "MC",
    progress: 75,
    stage: "Document Review",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Jessica Williams",
    email: "j.williams@example.com",
    initials: "JW",
    progress: 50,
    stage: "Credit Report",
    status: "In Progress",
  },
  {
    id: 4,
    name: "Robert Garcia",
    email: "r.garcia@example.com",
    initials: "RG",
    progress: 25,
    stage: "Initial Setup",
    status: "Pending",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "e.davis@example.com",
    initials: "ED",
    progress: 10,
    stage: "Registration",
    status: "Stalled",
  },
]

const onboardingTemplates = [
  {
    id: 1,
    name: "Standard Onboarding",
    description: "Default onboarding process for new clients",
    steps: 5,
    documents: 3,
    avgCompletion: "2.5 days",
    active: true,
  },
  {
    id: 2,
    name: "Express Onboarding",
    description: "Streamlined process for returning clients",
    steps: 3,
    documents: 1,
    avgCompletion: "1 day",
    active: true,
  },
  {
    id: 3,
    name: "Business Credit",
    description: "Specialized onboarding for business clients",
    steps: 7,
    documents: 5,
    avgCompletion: "3.5 days",
    active: false,
  },
]

const automatedTasks = [
  {
    id: 1,
    name: "Document Collection",
    description: "Automatically request and collect required documents",
    icon: <FileText className="h-4 w-4" />,
    enabled: true,
  },
  {
    id: 2,
    name: "Credit Report Retrieval",
    description: "Securely fetch credit reports from bureaus",
    icon: <FileCheck className="h-4 w-4" />,
    enabled: true,
  },
  {
    id: 3,
    name: "Welcome Email Sequence",
    description: "Send personalized welcome emails to new clients",
    icon: <UserCheck className="h-4 w-4" />,
    enabled: true,
  },
  {
    id: 4,
    name: "Document Processing",
    description: "AI-powered document analysis and data extraction",
    icon: <Zap className="h-4 w-4" />,
    enabled: true,
  },
  {
    id: 5,
    name: "Bulk Document Upload",
    description: "Process multiple client documents simultaneously",
    icon: <Upload className="h-4 w-4" />,
    enabled: false,
  },
]

const integrations = [
  {
    id: 1,
    name: "CRM System",
    status: "Connected",
    icon: <UserCheck className="h-4 w-4" />,
  },
  {
    id: 2,
    name: "Document Storage",
    status: "Connected",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 3,
    name: "Email Marketing",
    status: "Connected",
    icon: <Loader2 className="h-4 w-4" />,
  },
  {
    id: 4,
    name: "Payment Processor",
    status: "Not connected",
    icon: <CreditCard className="h-4 w-4" />,
  },
]

const completionRates = [
  { id: 1, name: "Registration", rate: 98 },
  { id: 2, name: "Document Upload", rate: 87 },
  { id: 3, name: "Credit Report Authorization", rate: 76 },
  { id: 4, name: "Service Agreement", rate: 92 },
  { id: 5, name: "Payment Setup", rate: 84 },
]

const timeAnalysis = [
  {
    id: 1,
    name: "Registration to Document Upload",
    description: "Time between account creation and first document",
    time: "8 hours",
  },
  {
    id: 2,
    name: "Document Review",
    description: "Average time to process submitted documents",
    time: "12 hours",
  },
  {
    id: 3,
    name: "Credit Report Retrieval",
    description: "Time to fetch and analyze credit reports",
    time: "4 hours",
  },
  {
    id: 4,
    name: "Service Agreement",
    description: "Time to complete legal agreements",
    time: "24 hours",
  },
  {
    id: 5,
    name: "Full Onboarding",
    description: "Total time from start to completion",
    time: "2.4 days",
  },
]
