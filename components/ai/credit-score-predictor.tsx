"use client"

import { useState } from "react"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  Zap,
  BarChart3,
  Calendar,
  DollarSign,
  CreditCard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"

export function CreditScorePredictor() {
  const [activeTab, setActiveTab] = useState("predictions")
  const [selectedClient, setSelectedClient] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Credit Score Predictor</h2>
          <p className="text-muted-foreground">
            Advanced predictive analytics for credit score improvement and risk assessment
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Settings</Button>
          <Button>
            <Brain className="mr-2 h-4 w-4" />
            Run Prediction
          </Button>
        </div>
      </div>

      <Tabs defaultValue="predictions" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="action-plans">Action Plans</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Predicted Increase</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+127 pts</div>
                <p className="text-xs text-muted-foreground">Over 12 months</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High-Risk Clients</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Probability</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">Goal achievement rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">Model accuracy</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Credit Score Predictions</CardTitle>
                <CardDescription>AI-powered forecasts for client credit score improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    current: {
                      label: "Current Score",
                      color: "hsl(var(--chart-1))",
                    },
                    predicted: {
                      label: "Predicted Score",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[500, 800]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="current"
                        stackId="1"
                        stroke="var(--color-current)"
                        fill="var(--color-current)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="predicted"
                        stackId="2"
                        stroke="var(--color-predicted)"
                        fill="var(--color-predicted)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Top Predictions</CardTitle>
                <CardDescription>Clients with highest predicted improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPredictions.map((prediction) => (
                    <div key={prediction.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{prediction.initials}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{prediction.name}</p>
                          <p className="text-xs text-muted-foreground">Current: {prediction.currentScore}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">+{prediction.predictedIncrease}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{prediction.timeframe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Predictions
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Factors</CardTitle>
              <CardDescription>Key factors influencing credit score predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {predictionFactors.map((factor) => (
                  <div key={factor.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{factor.name}</span>
                      <span className="text-sm">{factor.impact}%</span>
                    </div>
                    <Progress value={factor.impact} className="h-2" />
                    <p className="text-xs text-muted-foreground">{factor.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-assessment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-red-800">High Risk</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <CardDescription className="text-red-700">Clients requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-800">3</div>
                <div className="space-y-2 mt-4">
                  {highRiskClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between text-sm">
                      <span className="text-red-700">{client.name}</span>
                      <Badge variant="destructive">{client.riskScore}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" className="w-full">
                  Review High Risk
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-800">Medium Risk</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <CardDescription className="text-yellow-700">Clients needing monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-800">8</div>
                <div className="space-y-2 mt-4">
                  {mediumRiskClients.slice(0, 3).map((client) => (
                    <div key={client.id} className="flex items-center justify-between text-sm">
                      <span className="text-yellow-700">{client.name}</span>
                      <Badge variant="secondary">{client.riskScore}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Monitor Medium Risk
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-800">Low Risk</CardTitle>
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <CardDescription className="text-green-700">Clients on track for success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-800">24</div>
                <div className="space-y-2 mt-4">
                  {lowRiskClients.slice(0, 3).map((client) => (
                    <div key={client.id} className="flex items-center justify-between text-sm">
                      <span className="text-green-700">{client.name}</span>
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        {client.riskScore}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Low Risk
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Matrix</CardTitle>
              <CardDescription>Comprehensive risk analysis across all clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Risk Factors</h3>
                  <div className="space-y-3">
                    {riskFactors.map((factor) => (
                      <div key={factor.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center space-x-3">
                          <div className={`rounded-full p-1.5 ${getRiskFactorColor(factor.severity)}`}>
                            {factor.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{factor.name}</p>
                            <p className="text-xs text-muted-foreground">{factor.description}</p>
                          </div>
                        </div>
                        <Badge variant={getRiskBadgeVariant(factor.severity)}>{factor.severity}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Risk Mitigation</h3>
                  <div className="space-y-3">
                    {riskMitigation.map((action) => (
                      <div key={action.id} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{action.action}</p>
                          <Badge variant="outline">{action.priority}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Impact: {action.impact}%</span>
                          <Button size="sm" variant="outline">
                            Implement
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="action-plans" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personalized Action Plans</CardTitle>
                  <CardDescription>AI-generated recommendations for credit score improvement</CardDescription>
                </div>
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate New Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {actionPlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{plan.clientName}</CardTitle>
                        <Badge variant={getPlanStatusVariant(plan.status)}>{plan.status}</Badge>
                      </div>
                      <CardDescription>
                        Goal: {plan.goal} points in {plan.timeframe}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-medium">{plan.progress}%</span>
                        </div>
                        <Progress value={plan.progress} className="h-2" />

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Next Actions:</h4>
                          {plan.nextActions.map((action, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs">
                              <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Update Plan</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Action Plan Templates</CardTitle>
                <CardDescription>Pre-built templates for common credit improvement scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actionTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{template.usageCount} uses</Badge>
                        <Button size="sm" variant="outline">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
                <CardDescription>Performance indicators for action plan effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {successMetrics.map((metric) => (
                    <div key={metric.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className="text-sm">{metric.value}</span>
                      </div>
                      {metric.hasProgress && <Progress value={Number.parseInt(metric.value)} className="h-2" />}
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Analytics</CardTitle>
              <CardDescription>Performance metrics and accuracy analysis for AI predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  accuracy: {
                    label: "Prediction Accuracy",
                    color: "hsl(var(--chart-1))",
                  },
                  confidence: {
                    label: "Model Confidence",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" strokeWidth={2} />
                    <Line type="monotone" dataKey="confidence" stroke="var(--color-confidence)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>AI model accuracy and reliability metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelPerformance.map((metric) => (
                    <div key={metric.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className="text-sm">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Outcomes</CardTitle>
                <CardDescription>Results of previous predictions vs actual outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictionOutcomes.map((outcome) => (
                    <div key={outcome.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{outcome.category}</p>
                        <p className="text-xs text-muted-foreground">{outcome.description}</p>
                      </div>
                      <Badge variant={getOutcomeVariant(outcome.status)}>{outcome.accuracy}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
                <CardDescription>Most influential factors in prediction accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureImportance.map((feature) => (
                    <div key={feature.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{feature.name}</span>
                        <span className="text-sm">{feature.importance}%</span>
                      </div>
                      <Progress value={feature.importance} className="h-2" />
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

// Helper functions
function getRiskFactorColor(severity: string) {
  switch (severity) {
    case "High":
      return "bg-red-100 text-red-600"
    case "Medium":
      return "bg-yellow-100 text-yellow-600"
    case "Low":
      return "bg-green-100 text-green-600"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getRiskBadgeVariant(severity: string) {
  switch (severity) {
    case "High":
      return "destructive"
    case "Medium":
      return "secondary"
    case "Low":
      return "outline"
    default:
      return "outline"
  }
}

function getPlanStatusVariant(status: string) {
  switch (status) {
    case "Active":
      return "default"
    case "Completed":
      return "success"
    case "Paused":
      return "secondary"
    default:
      return "outline"
  }
}

function getOutcomeVariant(status: string) {
  switch (status) {
    case "Exceeded":
      return "success"
    case "Met":
      return "default"
    case "Below":
      return "destructive"
    default:
      return "outline"
  }
}

// Sample data
const predictionData = [
  { month: "Jan", current: 580, predicted: 580 },
  { month: "Feb", current: 590, predicted: 595 },
  { month: "Mar", current: 605, predicted: 615 },
  { month: "Apr", current: 620, predicted: 635 },
  { month: "May", current: 635, predicted: 655 },
  { month: "Jun", current: 650, predicted: 675 },
  { month: "Jul", current: 665, predicted: 695 },
  { month: "Aug", current: 680, predicted: 715 },
  { month: "Sep", current: 695, predicted: 735 },
  { month: "Oct", current: 710, predicted: 755 },
  { month: "Nov", current: 725, predicted: 775 },
  { month: "Dec", current: 740, predicted: 795 },
]

const topPredictions = [
  {
    id: 1,
    name: "Sarah Johnson",
    initials: "SJ",
    currentScore: 580,
    predictedIncrease: 145,
    timeframe: "8 months",
  },
  {
    id: 2,
    name: "Michael Chen",
    initials: "MC",
    currentScore: 620,
    predictedIncrease: 120,
    timeframe: "6 months",
  },
  {
    id: 3,
    name: "Jessica Williams",
    initials: "JW",
    currentScore: 550,
    predictedIncrease: 180,
    timeframe: "12 months",
  },
  {
    id: 4,
    name: "Robert Garcia",
    initials: "RG",
    currentScore: 640,
    predictedIncrease: 95,
    timeframe: "4 months",
  },
]

const predictionFactors = [
  {
    id: 1,
    name: "Payment History",
    impact: 35,
    description: "On-time payment consistency and history",
  },
  {
    id: 2,
    name: "Credit Utilization",
    impact: 30,
    description: "Percentage of available credit being used",
  },
  {
    id: 3,
    name: "Credit Age",
    impact: 15,
    description: "Length of credit history and account age",
  },
  {
    id: 4,
    name: "Credit Mix",
    impact: 10,
    description: "Variety of credit account types",
  },
  {
    id: 5,
    name: "New Credit",
    impact: 10,
    description: "Recent credit inquiries and new accounts",
  },
]

const highRiskClients = [
  { id: 1, name: "Emily Davis", riskScore: 85 },
  { id: 2, name: "James Wilson", riskScore: 78 },
  { id: 3, name: "Lisa Brown", riskScore: 72 },
]

const mediumRiskClients = [
  { id: 1, name: "David Miller", riskScore: 55 },
  { id: 2, name: "Anna Taylor", riskScore: 48 },
  { id: 3, name: "Mark Anderson", riskScore: 42 },
]

const lowRiskClients = [
  { id: 1, name: "Sarah Johnson", riskScore: 15 },
  { id: 2, name: "Michael Chen", riskScore: 12 },
  { id: 3, name: "Jessica Williams", riskScore: 8 },
]

const riskFactors = [
  {
    id: 1,
    name: "High Credit Utilization",
    description: "Credit usage above 30% threshold",
    severity: "High",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: 2,
    name: "Recent Late Payments",
    description: "Payment delays in the last 6 months",
    severity: "High",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: 3,
    name: "Limited Credit History",
    description: "Short credit history length",
    severity: "Medium",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    id: 4,
    name: "High Debt-to-Income",
    description: "Debt obligations vs income ratio",
    severity: "Medium",
    icon: <DollarSign className="h-4 w-4" />,
  },
]

const riskMitigation = [
  {
    id: 1,
    action: "Reduce Credit Utilization",
    description: "Pay down balances to below 30% utilization",
    priority: "High",
    impact: 85,
  },
  {
    id: 2,
    action: "Set Up Auto-Pay",
    description: "Automate minimum payments to prevent late fees",
    priority: "High",
    impact: 75,
  },
  {
    id: 3,
    action: "Dispute Inaccuracies",
    description: "Challenge incorrect items on credit reports",
    priority: "Medium",
    impact: 60,
  },
  {
    id: 4,
    action: "Increase Credit Limits",
    description: "Request higher limits to improve utilization ratio",
    priority: "Low",
    impact: 40,
  },
]

const actionPlans = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    goal: 150,
    timeframe: "8 months",
    status: "Active",
    progress: 65,
    nextActions: [
      "Pay down credit card balance",
      "Dispute outdated collection account",
      "Request credit limit increase",
    ],
  },
  {
    id: 2,
    clientName: "Michael Chen",
    goal: 120,
    timeframe: "6 months",
    status: "Active",
    progress: 45,
    nextActions: ["Set up automatic payments", "Consolidate high-interest debt", "Monitor credit report changes"],
  },
  {
    id: 3,
    clientName: "Jessica Williams",
    goal: 180,
    timeframe: "12 months",
    status: "Paused",
    progress: 25,
    nextActions: ["Resume payment plan", "Update income verification", "Review dispute strategy"],
  },
]

const actionTemplates = [
  {
    id: 1,
    name: "High Utilization Recovery",
    description: "For clients with credit utilization above 50%",
    usageCount: 23,
  },
  {
    id: 2,
    name: "Payment History Repair",
    description: "Focus on establishing consistent payment patterns",
    usageCount: 18,
  },
  {
    id: 3,
    name: "Credit Mix Optimization",
    description: "Diversify credit types for better scoring",
    usageCount: 12,
  },
  {
    id: 4,
    name: "New Credit Strategy",
    description: "Strategic approach to new credit applications",
    usageCount: 8,
  },
]

const successMetrics = [
  {
    id: 1,
    name: "Plan Completion Rate",
    value: "87%",
    description: "Percentage of clients completing their action plans",
    hasProgress: true,
  },
  {
    id: 2,
    name: "Average Score Increase",
    value: "127 points",
    description: "Mean credit score improvement across all clients",
    hasProgress: false,
  },
  {
    id: 3,
    name: "Goal Achievement Rate",
    value: "89%",
    description: "Clients reaching their target credit scores",
    hasProgress: true,
  },
  {
    id: 4,
    name: "Time to Goal",
    value: "6.2 months",
    description: "Average time to reach target credit score",
    hasProgress: false,
  },
]

const analyticsData = [
  { month: "Jan", accuracy: 85, confidence: 78 },
  { month: "Feb", accuracy: 87, confidence: 82 },
  { month: "Mar", accuracy: 89, confidence: 85 },
  { month: "Apr", accuracy: 91, confidence: 88 },
  { month: "May", accuracy: 93, confidence: 90 },
  { month: "Jun", accuracy: 94, confidence: 92 },
]

const modelPerformance = [
  { id: 1, name: "Overall Accuracy", value: 94 },
  { id: 2, name: "Precision", value: 91 },
  { id: 3, name: "Recall", value: 89 },
  { id: 4, name: "F1 Score", value: 90 },
]

const predictionOutcomes = [
  {
    id: 1,
    category: "Score Increases",
    description: "Predicted vs actual score improvements",
    accuracy: 94,
    status: "Met",
  },
  {
    id: 2,
    category: "Timeline Accuracy",
    description: "Predicted vs actual completion times",
    accuracy: 87,
    status: "Met",
  },
  {
    id: 3,
    category: "Risk Assessment",
    description: "Risk predictions vs actual outcomes",
    accuracy: 91,
    status: "Exceeded",
  },
]

const featureImportance = [
  { id: 1, name: "Payment History", importance: 35 },
  { id: 2, name: "Credit Utilization", importance: 30 },
  { id: 3, name: "Account Age", importance: 15 },
  { id: 4, name: "Credit Mix", importance: 10 },
  { id: 5, name: "New Inquiries", importance: 10 },
]
