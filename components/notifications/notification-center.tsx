"use client"

import { useState } from "react"
import {
  Bell,
  CheckCircle2,
  Info,
  TrendingUp,
  TrendingDown,
  FileText,
  DollarSign,
  Settings,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function NotificationCenter() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notification Center</h2>
          <p className="text-muted-foreground">
            Real-time alerts for score changes, dispute updates, and payment reminders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+5 from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Alerts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Credit score changes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispute Updates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Status changes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Reminders</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="score-changes">Score Changes</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Real-time notifications</span>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Notifications</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    Mark All Read
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 rounded-lg border p-4 ${
                      !notification.read ? "bg-muted/5 border-orange-200" : ""
                    }`}
                  >
                    <div className={`rounded-full p-2 ${getNotificationIconBg(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getNotificationPriorityVariant(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-orange-500" />}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                        <div className="flex space-x-2">
                          {notification.actionable && (
                            <Button size="sm" variant="outline">
                              {notification.actionText}
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load More Notifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="score-changes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Score Change Alerts</CardTitle>
              <CardDescription>Real-time notifications when client credit scores change</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreChangeNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{notification.clientInitials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{notification.clientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.bureau} • {notification.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{notification.oldScore}</span>
                          <span className="text-xs text-muted-foreground">→</span>
                          <span className="text-sm font-medium">{notification.newScore}</span>
                          <div className="flex items-center space-x-1">
                            {notification.change > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span
                              className={`text-sm font-medium ${
                                notification.change > 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {notification.change > 0 ? "+" : ""}
                              {notification.change}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Score Alert Settings</CardTitle>
              <CardDescription>Configure when and how you receive credit score alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreAlertSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{setting.name}</p>
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch checked={setting.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dispute Status Updates</CardTitle>
              <CardDescription>Track the progress of all active disputes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputeNotifications.map((notification) => (
                  <div key={notification.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                          <span className="text-white font-medium text-xs">{notification.clientInitials}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{notification.clientName}</p>
                          <p className="text-xs text-muted-foreground">{notification.disputeType}</p>
                        </div>
                      </div>
                      <Badge variant={getDisputeStatusVariant(notification.status)}>{notification.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {notification.bureau} • {notification.timestamp}
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            View Dispute
                          </Button>
                          {notification.actionRequired && <Button size="sm">Take Action</Button>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Reminders</CardTitle>
              <CardDescription>Upcoming payments and billing notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`rounded-full p-2 ${getPaymentIconBg(notification.urgency)}`}>
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">${notification.amount}</p>
                        <p className="text-xs text-muted-foreground">Due {notification.dueDate}</p>
                      </div>
                      <Button size="sm" variant={notification.urgency === "high" ? "destructive" : "outline"}>
                        {notification.urgency === "high" ? "Pay Now" : "View"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Recent payment activities and confirmations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">{payment.description}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${payment.amount}</p>
                      <Badge variant="outline">Confirmed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Customize how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Delivery Methods</h3>
                <div className="space-y-3">
                  {deliveryMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-muted p-1.5">{method.icon}</div>
                        <div>
                          <p className="text-sm font-medium">{method.name}</p>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                      <Switch checked={method.enabled} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                <div className="space-y-3">
                  {notificationTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">{type.name}</p>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue={type.frequency}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                        <Switch checked={type.enabled} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Quiet Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">Enable Quiet Hours</p>
                      <p className="text-xs text-muted-foreground">
                        Pause non-urgent notifications during specified hours
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Start Time</label>
                      <Select defaultValue="22:00">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">End Time</label>
                      <Select defaultValue="08:00">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions
function getNotificationIcon(type: string) {
  switch (type) {
    case "score-change":
      return <TrendingUp className="h-4 w-4" />
    case "dispute-update":
      return <FileText className="h-4 w-4" />
    case "payment-reminder":
      return <DollarSign className="h-4 w-4" />
    case "system":
      return <Info className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

function getNotificationIconBg(type: string) {
  switch (type) {
    case "score-change":
      return "bg-green-100 text-green-600"
    case "dispute-update":
      return "bg-blue-100 text-blue-600"
    case "payment-reminder":
      return "bg-orange-100 text-orange-600"
    case "system":
      return "bg-gray-100 text-gray-600"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getNotificationPriorityVariant(priority: string) {
  switch (priority) {
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

function getDisputeStatusVariant(status: string) {
  switch (status) {
    case "Approved":
      return "success"
    case "Pending":
      return "default"
    case "Rejected":
      return "destructive"
    case "Under Review":
      return "secondary"
    default:
      return "outline"
  }
}

function getPaymentIconBg(urgency: string) {
  switch (urgency) {
    case "high":
      return "bg-red-100 text-red-600"
    case "medium":
      return "bg-orange-100 text-orange-600"
    case "low":
      return "bg-green-100 text-green-600"
    default:
      return "bg-muted text-muted-foreground"
  }
}

// Sample data
const allNotifications = [
  {
    id: 1,
    type: "score-change",
    title: "Credit Score Increased",
    message: "Sarah Johnson's Experian score increased by 15 points to 695",
    timestamp: "2 minutes ago",
    priority: "High",
    read: false,
    actionable: true,
    actionText: "View Report",
  },
  {
    id: 2,
    type: "dispute-update",
    title: "Dispute Approved",
    message: "Collection account dispute for Michael Chen has been approved by Equifax",
    timestamp: "15 minutes ago",
    priority: "High",
    read: false,
    actionable: true,
    actionText: "View Details",
  },
  {
    id: 3,
    type: "payment-reminder",
    title: "Payment Due Tomorrow",
    message: "Monthly service fee of $99 is due tomorrow for Jessica Williams",
    timestamp: "1 hour ago",
    priority: "Medium",
    read: true,
    actionable: true,
    actionText: "Pay Now",
  },
  {
    id: 4,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2-4 AM EST",
    timestamp: "3 hours ago",
    priority: "Low",
    read: true,
    actionable: false,
    actionText: "",
  },
]

const scoreChangeNotifications = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientInitials: "SJ",
    bureau: "Experian",
    oldScore: 680,
    newScore: 695,
    change: 15,
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    clientName: "Michael Chen",
    clientInitials: "MC",
    bureau: "Equifax",
    oldScore: 645,
    newScore: 658,
    change: 13,
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    clientName: "Robert Garcia",
    clientInitials: "RG",
    bureau: "TransUnion",
    oldScore: 720,
    newScore: 715,
    change: -5,
    timestamp: "3 hours ago",
  },
]

const scoreAlertSettings = [
  {
    id: 1,
    name: "Score Increases",
    description: "Notify when credit scores increase",
    enabled: true,
  },
  {
    id: 2,
    name: "Score Decreases",
    description: "Notify when credit scores decrease",
    enabled: true,
  },
  {
    id: 3,
    name: "Significant Changes",
    description: "Only notify for changes of 10+ points",
    enabled: false,
  },
  {
    id: 4,
    name: "Weekly Summaries",
    description: "Send weekly score change summaries",
    enabled: true,
  },
]

const disputeNotifications = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientInitials: "SJ",
    disputeType: "Inaccurate Account",
    status: "Approved",
    message: "Your dispute regarding the inaccurate account information has been approved by Experian.",
    bureau: "Experian",
    timestamp: "15 minutes ago",
    actionRequired: false,
  },
  {
    id: 2,
    clientName: "Michael Chen",
    clientInitials: "MC",
    disputeType: "Collection Account",
    status: "Under Review",
    message: "Your collection account dispute is currently under review. Expected response in 5-7 days.",
    bureau: "Equifax",
    timestamp: "2 hours ago",
    actionRequired: false,
  },
  {
    id: 3,
    clientName: "Jessica Williams",
    clientInitials: "JW",
    disputeType: "Identity Theft",
    status: "Pending",
    message: "Additional documentation required for your identity theft dispute.",
    bureau: "TransUnion",
    timestamp: "1 day ago",
    actionRequired: true,
  },
]

const paymentNotifications = [
  {
    id: 1,
    title: "Monthly Service Fee",
    description: "Jessica Williams - Credit repair service",
    amount: "99.00",
    dueDate: "Tomorrow",
    urgency: "high",
  },
  {
    id: 2,
    title: "Setup Fee",
    description: "Robert Garcia - Initial setup",
    amount: "199.00",
    dueDate: "Jan 20",
    urgency: "medium",
  },
  {
    id: 3,
    title: "Additional Services",
    description: "Sarah Johnson - Credit monitoring",
    amount: "29.00",
    dueDate: "Jan 25",
    urgency: "low",
  },
]

const paymentHistory = [
  {
    id: 1,
    description: "Monthly service fee - Sarah Johnson",
    amount: "99.00",
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    description: "Setup fee - Michael Chen",
    amount: "199.00",
    date: "Jan 14, 2024",
  },
  {
    id: 3,
    description: "Monthly service fee - Jessica Williams",
    amount: "99.00",
    date: "Jan 13, 2024",
  },
]

const deliveryMethods = [
  {
    id: 1,
    name: "Email Notifications",
    description: "Receive notifications via email",
    icon: <Bell className="h-4 w-4" />,
    enabled: true,
  },
  {
    id: 2,
    name: "SMS Alerts",
    description: "Receive urgent alerts via text message",
    icon: <Bell className="h-4 w-4" />,
    enabled: true,
  },
  {
    id: 3,
    name: "Push Notifications",
    description: "Browser and mobile app notifications",
    icon: <Bell className="h-4 w-4" />,
    enabled: false,
  },
  {
    id: 4,
    name: "In-App Notifications",
    description: "Notifications within the dashboard",
    icon: <Bell className="h-4 w-4" />,
    enabled: true,
  },
]

const notificationTypes = [
  {
    id: 1,
    name: "Credit Score Changes",
    description: "When client credit scores change",
    frequency: "immediate",
    enabled: true,
  },
  {
    id: 2,
    name: "Dispute Updates",
    description: "Status changes for active disputes",
    frequency: "immediate",
    enabled: true,
  },
  {
    id: 3,
    name: "Payment Reminders",
    description: "Upcoming payment due dates",
    frequency: "daily",
    enabled: true,
  },
  {
    id: 4,
    name: "System Updates",
    description: "Platform updates and maintenance",
    frequency: "weekly",
    enabled: false,
  },
]
