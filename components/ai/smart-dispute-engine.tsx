"use client"

import { useState } from "react"
import { Bot, FileText, Send, Clock, TrendingUp, Zap, Target, TrendingDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SmartDisputeEngine() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDispute, setSelectedDispute] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Smart Dispute Engine</h2>
          <p className="text-muted-foreground">
            AI-powered dispute letter generation with success rate optimization and timing intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Settings</Button>
          <Button>
            <Bot className="mr-2 h-4 w-4" />
            Generate Letter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="generator">Letter Generator</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+23 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18 days</div>
                <p className="text-xs text-muted-foreground">-3 days from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">Model accuracy</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Recent Disputes</CardTitle>
                <CardDescription>Latest dispute letters generated and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Bureau</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Success Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDisputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">{dispute.client}</TableCell>
                        <TableCell>{dispute.bureau}</TableCell>
                        <TableCell>{dispute.type}</TableCell>
                        <TableCell>{dispute.generated}</TableCell>
                        <TableCell>
                          <Badge variant={getDisputeStatusVariant(dispute.status)}>{dispute.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={dispute.successRate} className="h-2 w-[60px]" />
                            <span className="text-sm">{dispute.successRate}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Disputes
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Success Rate by Bureau</CardTitle>
                <CardDescription>Dispute success rates across different credit bureaus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bureauSuccessRates.map((bureau) => (
                    <div key={bureau.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{bureau.name}</span>
                        <span className="text-sm">{bureau.rate}%</span>
                      </div>
                      <Progress value={bureau.rate} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{bureau.total} disputes</span>
                        <span>{bureau.successful} successful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Categories Performance</CardTitle>
              <CardDescription>Success rates and timing analysis by dispute type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {disputeCategories.map((category) => (
                  <div key={category.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">{category.name}</h3>
                      <Badge variant="outline">{category.count} disputes</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className="font-medium">{category.successRate}%</span>
                      </div>
                      <Progress value={category.successRate} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span>Avg. Response:</span>
                        <span className="font-medium">{category.avgResponse} days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Best Timing:</span>
                        <span className="font-medium">{category.bestTiming}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Dispute Letter Generator</CardTitle>
                  <CardDescription>Generate optimized dispute letters using AI and historical data</CardDescription>
                </div>
                <Alert className="w-auto">
                  <Bot className="h-4 w-4" />
                  <AlertDescription>AI model confidence: 92%</AlertDescription>
                </Alert>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Client</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="michael">Michael Chen</SelectItem>
                        <SelectItem value="jessica">Jessica Williams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Credit Bureau</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bureau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="experian">Experian</SelectItem>
                        <SelectItem value="equifax">Equifax</SelectItem>
                        <SelectItem value="transunion">TransUnion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Dispute Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dispute type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inaccurate">Inaccurate Information</SelectItem>
                        <SelectItem value="outdated">Outdated Information</SelectItem>
                        <SelectItem value="identity">Identity Theft</SelectItem>
                        <SelectItem value="duplicate">Duplicate Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Account Details</label>
                    <Textarea
                      placeholder="Provide specific details about the account or item being disputed..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4 bg-muted/5">
                    <h3 className="text-sm font-medium mb-2">AI Recommendations</h3>
                    <div className="space-y-2">
                      {aiRecommendations.map((rec) => (
                        <div key={rec.id} className="flex items-start space-x-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2" />
                          <div>
                            <p className="font-medium">{rec.title}</p>
                            <p className="text-muted-foreground">{rec.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-2">Success Prediction</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Predicted Success Rate:</span>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Based on similar disputes</span>
                        <span>High confidence</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-2">Optimal Timing</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Best Send Date:</span>
                        <span className="font-medium">Tuesday, Jan 16</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Expected Response:</span>
                        <span className="font-medium">15-20 days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Follow-up Date:</span>
                        <span className="font-medium">Feb 5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Generated Letter Preview</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-muted/5 min-h-[300px]">
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Date: January 15, 2024</p>
                      <p>Experian Information Solutions</p>
                      <p>P.O. Box 4500</p>
                      <p>Allen, TX 75013</p>
                    </div>

                    <div>
                      <p className="font-medium">Re: Request for Investigation - Sarah Johnson</p>
                      <p>SSN: XXX-XX-1234</p>
                      <p>DOB: XX/XX/XXXX</p>
                    </div>

                    <div>
                      <p>Dear Experian,</p>
                      <p className="mt-2">
                        I am writing to dispute the following information in my credit file. I have circled the items I
                        dispute on the attached copy of the report I received.
                      </p>
                      <p className="mt-2">
                        This item is inaccurate or incomplete, which is why I am requesting that you remove or correct
                        this information, and provide an accurate credit report.
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-xs text-yellow-800">
                        <strong>AI Enhancement:</strong> This letter has been optimized based on successful disputes for
                        similar account types. Success rate: 89%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Send Letter
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Letter Templates</CardTitle>
                <CardDescription>Pre-optimized templates for common dispute scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {letterTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{template.successRate}% success</Badge>
                        <Button size="sm" variant="outline">
                          Use
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Generations</CardTitle>
                <CardDescription>Recently generated dispute letters and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentGenerations.map((generation) => (
                    <div key={generation.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">{generation.client}</p>
                        <p className="text-xs text-muted-foreground">
                          {generation.type} - {generation.bureau}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getGenerationStatusVariant(generation.status)}>{generation.status}</Badge>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Success Rate Optimization</CardTitle>
              <CardDescription>
                AI-driven insights to improve dispute success rates and timing strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Optimization Factors</h3>
                  <div className="space-y-3">
                    {optimizationFactors.map((factor) => (
                      <div key={factor.id} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{factor.name}</p>
                          <Badge variant={getOptimizationVariant(factor.impact)}>{factor.impact}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{factor.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Current Score: {factor.currentScore}%</span>
                          <span className="text-xs">Potential: +{factor.improvement}%</span>
                        </div>
                        <Progress value={factor.currentScore} className="h-2 mt-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Timing Intelligence</h3>
                  <div className="space-y-3">
                    {timingInsights.map((insight) => (
                      <div key={insight.id} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{insight.bureau}</p>
                          <Badge variant="outline">{insight.bestDay}</Badge>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Best Time:</span>
                            <span className="font-medium">{insight.bestTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg Response:</span>
                            <span className="font-medium">{insight.avgResponse} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Success Rate:</span>
                            <span className="font-medium">{insight.successRate}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertTitle>AI Recommendation</AlertTitle>
                <AlertDescription>
                  Based on current data, sending disputes on Tuesday mornings increases success rates by 12%. Consider
                  implementing automated scheduling for optimal timing.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Performance Trends</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {performanceTrends.map((trend) => (
                    <Card key={trend.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{trend.metric}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{trend.value}</div>
                        <div className="flex items-center space-x-1 text-xs">
                          {trend.change > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                          <span className={trend.change > 0 ? "text-green-600" : "text-red-600"}>
                            {trend.change > 0 ? "+" : ""}
                            {trend.change}% from last month
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Target className="mr-2 h-4 w-4" />
                Apply Optimizations
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>A/B Testing Results</CardTitle>
                <CardDescription>Performance comparison of different letter variations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {abTestResults.map((test) => (
                    <div key={test.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{test.name}</p>
                        <Badge variant={test.winner === "A" ? "default" : "outline"}>
                          {test.winner === "A" ? "Winner" : "Control"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="font-medium">Version A</p>
                          <p>Success: {test.versionA.success}%</p>
                          <p>Response: {test.versionA.response} days</p>
                        </div>
                        <div>
                          <p className="font-medium">Version B</p>
                          <p>Success: {test.versionB.success}%</p>
                          <p>Response: {test.versionB.response} days</p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs text-muted-foreground">{test.insight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Queue</CardTitle>
                <CardDescription>Pending optimizations and their expected impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {optimizationQueue.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">{item.optimization}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">+{item.expectedImprovement}%</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{item.effort}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Implement All
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Engine Analytics</CardTitle>
              <CardDescription>Comprehensive performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/5">
                <p className="text-muted-foreground">Analytics chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
                <CardDescription>Key performance indicators for dispute success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {successMetricsData.map((metric) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Response Analysis</CardTitle>
                <CardDescription>Bureau response patterns and timing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {responseAnalysis.map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{analysis.category}</p>
                        <p className="text-xs text-muted-foreground">{analysis.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{analysis.value}</p>
                        <p className="text-xs text-muted-foreground">{analysis.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Model Performance</CardTitle>
                <CardDescription>Machine learning model accuracy and improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiModelPerformance.map((metric) => (
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions
function getDisputeStatusVariant(status: string) {
  switch (status) {
    case "Successful":
      return "success"
    case "Pending":
      return "default"
    case "Rejected":
      return "destructive"
    case "In Review":
      return "secondary"
    default:
      return "outline"
  }
}

function getGenerationStatusVariant(status: string) {
  switch (status) {
    case "Sent":
      return "default"
    case "Draft":
      return "outline"
    case "Scheduled":
      return "secondary"
    default:
      return "outline"
  }
}

function getOptimizationVariant(impact: string) {
  switch (impact) {
    case "High":
      return "destructive"
    case "Medium":
      return "default"
    case "Low":
      return "outline"
    default:
      return "outline"
  }
}

// Sample data
const recentDisputes = [
  {
    id: 1,
    client: "Sarah Johnson",
    bureau: "Experian",
    type: "Inaccurate Info",
    generated: "2024-01-15",
    status: "Pending",
    successRate: 89,
  },
  {
    id: 2,
    client: "Michael Chen",
    bureau: "Equifax",
    type: "Outdated Info",
    generated: "2024-01-14",
    status: "Successful",
    successRate: 94,
  },
  {
    id: 3,
    client: "Jessica Williams",
    bureau: "TransUnion",
    type: "Identity Theft",
    generated: "2024-01-13",
    status: "In Review",
    successRate: 76,
  },
  {
    id: 4,
    client: "Robert Garcia",
    bureau: "Experian",
    type: "Duplicate Account",
    generated: "2024-01-12",
    status: "Rejected",
    successRate: 45,
  },
]

const bureauSuccessRates = [
  { id: 1, name: "Experian", rate: 89, total: 156, successful: 139 },
  { id: 2, name: "Equifax", rate: 85, total: 142, successful: 121 },
  { id: 3, name: "TransUnion", rate: 87, total: 134, successful: 117 },
]

const disputeCategories = [
  {
    id: 1,
    name: "Inaccurate Information",
    count: 89,
    successRate: 91,
    avgResponse: 16,
    bestTiming: "Tuesday AM",
  },
  {
    id: 2,
    name: "Outdated Information",
    count: 67,
    successRate: 88,
    avgResponse: 14,
    bestTiming: "Wednesday AM",
  },
  {
    id: 3,
    name: "Identity Theft",
    count: 34,
    successRate: 76,
    avgResponse: 22,
    bestTiming: "Monday AM",
  },
  {
    id: 4,
    name: "Duplicate Accounts",
    count: 45,
    successRate: 84,
    avgResponse: 18,
    bestTiming: "Thursday AM",
  },
  {
    id: 5,
    name: "Payment Disputes",
    count: 56,
    successRate: 79,
    avgResponse: 20,
    bestTiming: "Tuesday PM",
  },
  {
    id: 6,
    name: "Account Status",
    count: 23,
    successRate: 92,
    avgResponse: 12,
    bestTiming: "Friday AM",
  },
]

const aiRecommendations = [
  {
    id: 1,
    title: "Use specific account details",
    description: "Include exact account numbers and dates for higher success rate",
  },
  {
    id: 2,
    title: "Reference FCRA Section 611",
    description: "Legal backing increases bureau compliance by 23%",
  },
  {
    id: 3,
    title: "Request method of verification",
    description: "Forces bureaus to provide detailed investigation process",
  },
  {
    id: 4,
    title: "Include supporting documentation",
    description: "Attach relevant proof to strengthen your dispute",
  },
]

const letterTemplates = [
  {
    id: 1,
    name: "FCRA Section 611 Template",
    description: "Standard template citing Fair Credit Reporting Act",
    successRate: 89,
  },
  {
    id: 2,
    name: "Identity Theft Template",
    description: "Specialized template for identity theft disputes",
    successRate: 76,
  },
  {
    id: 3,
    name: "Method of Verification",
    description: "Requests detailed verification procedures",
    successRate: 84,
  },
  {
    id: 4,
    name: "Outdated Information",
    description: "For accounts past statute of limitations",
    successRate: 92,
  },
]

const recentGenerations = [
  {
    id: 1,
    client: "Sarah Johnson",
    type: "Inaccurate Info",
    bureau: "Experian",
    status: "Sent",
  },
  {
    id: 2,
    client: "Michael Chen",
    type: "Outdated Info",
    bureau: "Equifax",
    status: "Draft",
  },
  {
    id: 3,
    client: "Jessica Williams",
    type: "Identity Theft",
    bureau: "TransUnion",
    status: "Scheduled",
  },
]

const optimizationFactors = [
  {
    id: 1,
    name: "Letter Tone",
    description: "Professional vs assertive language impact",
    impact: "High",
    currentScore: 78,
    improvement: 12,
  },
  {
    id: 2,
    name: "Legal Citations",
    description: "Specific law references and their effectiveness",
    impact: "High",
    currentScore: 85,
    improvement: 8,
  },
  {
    id: 3,
    name: "Documentation",
    description: "Supporting evidence attachment strategy",
    impact: "Medium",
    currentScore: 72,
    improvement: 15,
  },
  {
    id: 4,
    name: "Follow-up Timing",
    description: "Optimal intervals for follow-up communications",
    impact: "Medium",
    currentScore: 68,
    improvement: 18,
  },
]

const timingInsights = [
  {
    id: 1,
    bureau: "Experian",
    bestDay: "Tuesday",
    bestTime: "9:00 AM",
    avgResponse: 16,
    successRate: 89,
  },
  {
    id: 2,
    bureau: "Equifax",
    bestDay: "Wednesday",
    bestTime: "10:00 AM",
    avgResponse: 18,
    successRate: 85,
  },
  {
    id: 3,
    bureau: "TransUnion",
    bestDay: "Thursday",
    bestTime: "8:30 AM",
    avgResponse: 15,
    successRate: 87,
  },
]

const performanceTrends = [
  { id: 1, metric: "Success Rate", value: "87%", change: 5 },
  { id: 2, metric: "Response Time", value: "16 days", change: -12 },
  { id: 3, metric: "AI Accuracy", value: "92%", change: 3 },
]

const abTestResults = [
  {
    id: 1,
    name: "Professional vs Assertive Tone",
    winner: "A",
    versionA: { success: 89, response: 16 },
    versionB: { success: 82, response: 18 },
    insight: "Professional tone increases success rate by 7%",
  },
  {
    id: 2,
    name: "With vs Without Legal Citations",
    winner: "A",
    versionA: { success: 91, response: 15 },
    versionB: { success: 78, response: 20 },
    insight: "Legal citations significantly improve outcomes",
  },
]

const optimizationQueue = [
  {
    id: 1,
    optimization: "Enhanced Legal Language",
    description: "Incorporate more specific FCRA citations",
    expectedImprovement: 8,
    effort: "Low",
  },
  {
    id: 2,
    optimization: "Personalized Templates",
    description: "Client-specific template customization",
    expectedImprovement: 12,
    effort: "Medium",
  },
  {
    id: 3,
    optimization: "Timing Automation",
    description: "Automated optimal send timing",
    expectedImprovement: 6,
    effort: "High",
  },
]

const successMetricsData = [
  {
    id: 1,
    name: "Overall Success Rate",
    value: "87%",
    description: "Percentage of successful dispute outcomes",
    hasProgress: true,
  },
  {
    id: 2,
    name: "Average Response Time",
    value: "16 days",
    description: "Mean time for bureau responses",
    hasProgress: false,
  },
  {
    id: 3,
    name: "Client Satisfaction",
    value: "94%",
    description: "Client satisfaction with dispute process",
    hasProgress: true,
  },
]

const responseAnalysis = [
  {
    id: 1,
    category: "Fastest Response",
    description: "Quickest bureau response time",
    value: "8 days",
    trend: "Improving",
  },
  {
    id: 2,
    category: "Most Responsive",
    description: "Bureau with highest response rate",
    value: "Experian",
    trend: "Stable",
  },
  {
    id: 3,
    category: "Peak Response Day",
    description: "Day with most bureau responses",
    value: "Wednesday",
    trend: "Consistent",
  },
]

const aiModelPerformance = [
  { id: 1, name: "Prediction Accuracy", value: 92 },
  { id: 2, name: "Template Optimization", value: 89 },
  { id: 3, name: "Timing Intelligence", value: 87 },
  { id: 4, name: "Success Forecasting", value: 94 },
]
