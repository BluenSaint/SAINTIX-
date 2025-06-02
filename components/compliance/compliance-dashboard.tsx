"use client"

import { useState } from "react"
import { AlertCircle, ChevronRight, FileCheck, FileCog, FileText, Search, Shield, UserCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ComplianceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compliance Automation</h2>
          <p className="text-muted-foreground">
            Automated FCRA compliance, audit trails, and legal document generation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Settings</Button>
          <Button>
            <FileCheck className="mr-2 h-4 w-4" />
            Run Compliance Check
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
          <TabsTrigger value="documents">Legal Documents</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Verifications</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents Generated</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+28 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">-3 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Compliance Alerts</CardTitle>
                <CardDescription>Recent compliance issues that require attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceAlerts.map((alert) => (
                    <Alert key={alert.id} variant={alert.severity === "High" ? "destructive" : "default"}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="flex items-center justify-between">
                        <span>{alert.title}</span>
                        <Badge variant={getAlertVariant(alert.severity)}>{alert.severity}</Badge>
                      </AlertTitle>
                      <AlertDescription className="flex flex-col gap-2">
                        <p>{alert.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span>Client: {alert.client}</span>
                          <span>Detected: {alert.detected}</span>
                        </div>
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline">
                            Resolve
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Alerts
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Compliance Metrics</CardTitle>
                <CardDescription>Key compliance performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceMetrics.map((metric) => (
                    <div key={metric.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span className="text-sm">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit-trail" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Audit Trail</CardTitle>
                  <CardDescription>Comprehensive record of all system activities and changes</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search audit logs..."
                    className="w-[250px]"
                    startIcon={<Search className="h-4 w-4" />}
                  />
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === "Success" ? "success" : "destructive"}>{log.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Showing 10 of 234 entries</div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Audit Settings</CardTitle>
                <CardDescription>Configure audit trail retention and notification settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Retention Period</h3>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm">Audit Log Retention</p>
                        <p className="text-xs text-muted-foreground">How long audit logs are stored</p>
                      </div>
                      <Badge>365 days</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Monitoring</h3>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm">Critical Action Alerts</p>
                        <p className="text-xs text-muted-foreground">Notify admins of critical actions</p>
                      </div>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Configure Settings
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>Overview of system activity by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activitySummary.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-muted p-1.5">{activity.icon}</div>
                        <div>
                          <p className="text-sm font-medium">{activity.category}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{activity.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Legal Document Generation</CardTitle>
                  <CardDescription>Automated creation of compliant legal documents</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <FileCog className="mr-2 h-4 w-4" />
                    Templates
                  </Button>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    New Document
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search documents..." className="flex-1" />
                  <Button variant="outline">Filter</Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {legalDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.client}</TableCell>
                        <TableCell>{doc.generated}</TableCell>
                        <TableCell>
                          <Badge variant={getDocumentStatusVariant(doc.status)}>{doc.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {documentTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Last Updated:</span>
                      <span className="font-medium">{template.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Usage Count:</span>
                      <span className="font-medium">{template.usageCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Compliance:</span>
                      <Badge variant={template.compliant ? "success" : "destructive"}>
                        {template.compliant ? "Compliant" : "Review Needed"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Edit</Button>
                  <Button>Generate</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Verification</CardTitle>
                  <CardDescription>Automated verification of client information and documents</CardDescription>
                </div>
                <Button>
                  <UserCheck className="mr-2 h-4 w-4" />
                  New Verification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Verification Type</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell className="font-medium">{verification.client}</TableCell>
                      <TableCell>{verification.type}</TableCell>
                      <TableCell>{verification.submitted}</TableCell>
                      <TableCell>
                        <Badge variant={getVerificationStatusVariant(verification.status)}>{verification.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={verification.confidence} className="h-2 w-[60px]" />
                          <span className="text-sm">{verification.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            Review
                          </Button>
                          <Button variant="ghost" size="sm">
                            Approve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Verification Methods</CardTitle>
                <CardDescription>Available methods for client identity and document verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-muted p-1.5">{method.icon}</div>
                        <div>
                          <p className="text-sm font-medium">{method.name}</p>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                      <Badge variant={method.enabled ? "default" : "outline"}>
                        {method.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Analytics</CardTitle>
                <CardDescription>Performance metrics for verification processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationAnalytics.map((metric) => (
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
      </Tabs>
    </div>
  )
}

// Helper functions for badge variants
function getAlertVariant(severity: string) {
  switch (severity) {
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

function getDocumentStatusVariant(status: string) {
  switch (status) {
    case "Signed":
      return "success"
    case "Pending":
      return "default"
    case "Expired":
      return "destructive"
    case "Draft":
      return "outline"
    default:
      return "outline"
  }
}

function getVerificationStatusVariant(status: string) {
  switch (status) {
    case "Verified":
      return "success"
    case "In Progress":
      return "default"
    case "Failed":
      return "destructive"
    case "Pending":
      return "outline"
    default:
      return "outline"
  }
}

// Sample data
const complianceAlerts = [
  {
    id: 1,
    title: "Missing Consent Form",
    description: "Client is missing required consent form for credit report access.",
    severity: "High",
    client: "Michael Chen",
    detected: "2 hours ago",
  },
  {
    id: 2,
    title: "Outdated Privacy Policy",
    description: "The privacy policy document needs to be updated to reflect recent regulatory changes.",
    severity: "Medium",
    client: "System-wide",
    detected: "1 day ago",
  },
]

const complianceMetrics = [
  {
    id: 1,
    name: "FCRA Compliance",
    value: 98,
    description: "Adherence to Fair Credit Reporting Act requirements",
  },
  {
    id: 2,
    name: "Document Compliance",
    value: 100,
    description: "Legal documents meeting regulatory standards",
  },
  {
    id: 3,
    name: "Data Security",
    value: 96,
    description: "Client data protection and encryption compliance",
  },
  {
    id: 4,
    name: "Audit Readiness",
    value: 94,
    description: "System readiness for regulatory audits",
  },
]

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:22",
    user: "admin@saintrix.com",
    action: "Document Generated",
    resource: "Dispute Letter - John Doe",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:25:15",
    user: "sarah.j@example.com",
    action: "Credit Report Access",
    resource: "Experian Report",
    status: "Success",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:20:08",
    user: "system",
    action: "Compliance Check",
    resource: "Client Verification",
    status: "Success",
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:15:33",
    user: "m.chen@example.com",
    action: "Document Upload",
    resource: "Identity Verification",
    status: "Failed",
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:10:45",
    user: "admin@saintrix.com",
    action: "User Role Change",
    resource: "Team Member Access",
    status: "Success",
  },
]

const activitySummary = [
  {
    id: 1,
    category: "Document Access",
    description: "Credit reports and legal documents",
    count: "156",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 2,
    category: "User Authentication",
    description: "Login and access attempts",
    count: "1,234",
    icon: <UserCheck className="h-4 w-4" />,
  },
  {
    id: 3,
    category: "Data Modifications",
    description: "Client data updates and changes",
    count: "89",
    icon: <FileCog className="h-4 w-4" />,
  },
  {
    id: 4,
    category: "System Events",
    description: "Automated system actions",
    count: "567",
    icon: <Shield className="h-4 w-4" />,
  },
]

const legalDocuments = [
  {
    id: 1,
    name: "Credit Repair Agreement",
    type: "Service Agreement",
    client: "Sarah Johnson",
    generated: "2024-01-15",
    status: "Signed",
  },
  {
    id: 2,
    name: "FCRA Dispute Letter",
    type: "Dispute Letter",
    client: "Michael Chen",
    generated: "2024-01-15",
    status: "Pending",
  },
  {
    id: 3,
    name: "Privacy Policy Acknowledgment",
    type: "Consent Form",
    client: "Jessica Williams",
    generated: "2024-01-14",
    status: "Signed",
  },
  {
    id: 4,
    name: "Credit Report Authorization",
    type: "Authorization",
    client: "Robert Garcia",
    generated: "2024-01-14",
    status: "Expired",
  },
]

const documentTemplates = [
  {
    id: 1,
    name: "FCRA Dispute Letter",
    description: "Standard dispute letter template compliant with FCRA regulations",
    category: "Dispute",
    lastUpdated: "2024-01-10",
    usageCount: 45,
    compliant: true,
  },
  {
    id: 2,
    name: "Service Agreement",
    description: "Comprehensive credit repair service agreement",
    category: "Contract",
    lastUpdated: "2024-01-08",
    usageCount: 23,
    compliant: true,
  },
  {
    id: 3,
    name: "Privacy Notice",
    description: "Privacy policy and data handling notice",
    category: "Legal",
    lastUpdated: "2023-12-15",
    usageCount: 67,
    compliant: false,
  },
]

const verifications = [
  {
    id: 1,
    client: "Sarah Johnson",
    type: "Identity Verification",
    submitted: "2024-01-15",
    status: "Verified",
    confidence: 98,
  },
  {
    id: 2,
    client: "Michael Chen",
    type: "Address Verification",
    submitted: "2024-01-15",
    status: "In Progress",
    confidence: 85,
  },
  {
    id: 3,
    client: "Jessica Williams",
    type: "Income Verification",
    submitted: "2024-01-14",
    status: "Pending",
    confidence: 72,
  },
  {
    id: 4,
    client: "Robert Garcia",
    type: "Identity Verification",
    submitted: "2024-01-14",
    status: "Failed",
    confidence: 45,
  },
]

const verificationMethods = [
  {
    id: 1,
    name: "Document OCR",
    description: "Automated document text extraction and verification",
    icon: <FileText className="h-4 w-4" />,
    enabled: true,
  },
  {
    id: 2,
    name: "Identity Database",
    description: "Cross-reference with identity verification databases",
    icon: <UserCheck className="h-4 w-4" />,
    enabled: true,
  },
  {
    id: 3,
    name: "Biometric Verification",
    description: "Facial recognition and biometric matching",
    icon: <Shield className="h-4 w-4" />,
    enabled: false,
  },
  {
    id: 4,
    name: "Address Validation",
    description: "Real-time address verification services",
    icon: <FileCog className="h-4 w-4" />,
    enabled: true,
  },
]

const verificationAnalytics = [
  {
    id: 1,
    name: "Success Rate",
    value: "94%",
    description: "Percentage of successful verifications",
    hasProgress: true,
  },
  {
    id: 2,
    name: "Average Processing Time",
    value: "2.3 hours",
    description: "Mean time to complete verification",
    hasProgress: false,
  },
  {
    id: 3,
    name: "Manual Review Rate",
    value: "12%",
    description: "Verifications requiring manual review",
    hasProgress: true,
  },
  {
    id: 4,
    name: "False Positive Rate",
    value: "3%",
    description: "Incorrectly flagged verifications",
    hasProgress: true,
  },
]
