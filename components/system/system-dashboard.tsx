"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Settings,
  Zap,
  Clock,
} from "lucide-react"

export default function SystemDashboard() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  const [debugMode, setDebugMode] = useState(false)

  const systemMetrics = {
    uptime: "99.9%",
    responseTime: "145ms",
    activeUsers: 1247,
    totalRequests: 45678,
    errorRate: "0.02%",
    lastBackup: "2 hours ago",
  }

  const serverStats = [
    { name: "CPU Usage", value: 45, max: 100, color: "blue", icon: Cpu },
    { name: "Memory Usage", value: 68, max: 100, color: "emerald", icon: Database },
    { name: "Disk Usage", value: 32, max: 100, color: "amber", icon: HardDrive },
    { name: "Network I/O", value: 23, max: 100, color: "purple", icon: Wifi },
  ]

  const systemServices = [
    { name: "Web Server", status: "running", uptime: "15 days", cpu: "12%", memory: "2.1GB" },
    { name: "Database", status: "running", uptime: "15 days", cpu: "8%", memory: "4.2GB" },
    { name: "Cache Server", status: "running", uptime: "15 days", cpu: "3%", memory: "512MB" },
    { name: "Background Jobs", status: "running", uptime: "15 days", cpu: "5%", memory: "1.8GB" },
    { name: "File Storage", status: "running", uptime: "15 days", cpu: "1%", memory: "256MB" },
    { name: "Email Service", status: "warning", uptime: "2 hours", cpu: "15%", memory: "800MB" },
  ]

  const recentLogs = [
    {
      id: 1,
      timestamp: "2024-01-20 14:30:25",
      level: "info",
      service: "web-server",
      message: "User authentication successful",
    },
    {
      id: 2,
      timestamp: "2024-01-20 14:29:12",
      level: "warning",
      service: "database",
      message: "Slow query detected: 2.3s execution time",
    },
    {
      id: 3,
      timestamp: "2024-01-20 14:28:45",
      level: "error",
      service: "email-service",
      message: "SMTP connection timeout",
    },
    {
      id: 4,
      timestamp: "2024-01-20 14:27:33",
      level: "info",
      service: "cache-server",
      message: "Cache cleared successfully",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "warning":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "error":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-700 border-red-200"
      case "warning":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900">System Dashboard</h3>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            System Report
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 font-semibold text-sm mb-1">Uptime</p>
                <p className="text-3xl font-bold text-emerald-800">{systemMetrics.uptime}</p>
                <p className="text-xs text-emerald-600 mt-1">This month</p>
              </div>
              <div className="p-3 bg-emerald-200/50 rounded-2xl">
                <Activity className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-semibold text-sm mb-1">Response Time</p>
                <p className="text-3xl font-bold text-blue-800">{systemMetrics.responseTime}</p>
                <p className="text-xs text-blue-600 mt-1">Average</p>
              </div>
              <div className="p-3 bg-blue-200/50 rounded-2xl">
                <Zap className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 font-semibold text-sm mb-1">Active Users</p>
                <p className="text-3xl font-bold text-purple-800">{systemMetrics.activeUsers}</p>
                <p className="text-xs text-purple-600 mt-1">Online now</p>
              </div>
              <div className="p-3 bg-purple-200/50 rounded-2xl">
                <Activity className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 font-semibold text-sm mb-1">Requests</p>
                <p className="text-3xl font-bold text-amber-800">{systemMetrics.totalRequests.toLocaleString()}</p>
                <p className="text-xs text-amber-600 mt-1">Today</p>
              </div>
              <div className="p-3 bg-amber-200/50 rounded-2xl">
                <Server className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 font-semibold text-sm mb-1">Error Rate</p>
                <p className="text-3xl font-bold text-red-800">{systemMetrics.errorRate}</p>
                <p className="text-xs text-red-600 mt-1">Last 24h</p>
              </div>
              <div className="p-3 bg-red-200/50 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-700 font-semibold text-sm mb-1">Last Backup</p>
                <p className="text-lg font-bold text-slate-800">{systemMetrics.lastBackup}</p>
                <p className="text-xs text-slate-600 mt-1">Automated</p>
              </div>
              <div className="p-3 bg-slate-200/50 rounded-2xl">
                <Database className="w-6 h-6 text-slate-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Statistics */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
            Server Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serverStats.map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                    <span className="font-medium text-slate-700">{stat.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{stat.value}%</span>
                </div>
                <Progress value={stat.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Services & Settings */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* System Services */}
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              System Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-xl">
                      {service.status === "running" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{service.name}</p>
                      <p className="text-sm text-slate-600">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <p className="text-slate-700">CPU: {service.cpu}</p>
                      <p className="text-slate-700">RAM: {service.memory}</p>
                    </div>
                    <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <Label className="font-semibold text-slate-900">Maintenance Mode</Label>
                <p className="text-sm text-slate-600">Put system in maintenance mode</p>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <Label className="font-semibold text-slate-900">Auto Backup</Label>
                <p className="text-sm text-slate-600">Automatic daily backups</p>
              </div>
              <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <Label className="font-semibold text-slate-900">Debug Mode</Label>
                <p className="text-sm text-slate-600">Enable detailed logging</p>
              </div>
              <Switch checked={debugMode} onCheckedChange={setDebugMode} />
            </div>

            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl">
                Save Settings
              </Button>
              <Button variant="outline" className="rounded-xl">
                Restart Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            Recent System Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100"
              >
                <Badge className={getLogLevelColor(log.level)}>{log.level}</Badge>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-900">{log.service}</p>
                    <span className="text-xs text-slate-500">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-600">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
