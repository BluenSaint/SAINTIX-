"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Key,
  Database,
  Activity,
  RefreshCw,
  Download,
} from "lucide-react"

export default function SecurityDashboard() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [passwordPolicy, setPasswordPolicy] = useState(true)

  const securityMetrics = {
    activeThreats: 0,
    blockedAttempts: 23,
    activeSessions: 47,
    lastSecurityScan: "2 hours ago",
    systemHealth: 98.5,
  }

  const recentSecurityEvents = [
    {
      id: 1,
      type: "login_success",
      user: "admin@saintrix.com",
      timestamp: "2024-01-20 14:30:25",
      ip: "192.168.1.100",
      location: "New York, US",
      severity: "low",
    },
    {
      id: 2,
      type: "failed_login",
      user: "unknown@example.com",
      timestamp: "2024-01-20 14:25:12",
      ip: "45.123.45.67",
      location: "Unknown",
      severity: "medium",
    },
    {
      id: 3,
      type: "password_change",
      user: "client@example.com",
      timestamp: "2024-01-20 13:45:33",
      ip: "192.168.1.105",
      location: "California, US",
      severity: "low",
    },
    {
      id: 4,
      type: "suspicious_activity",
      user: "team@saintrix.com",
      timestamp: "2024-01-20 12:15:44",
      ip: "203.45.67.89",
      location: "Unknown",
      severity: "high",
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "login_success":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />
      case "failed_login":
        return <AlertTriangle className="w-4 h-4 text-amber-600" />
      case "password_change":
        return <Key className="w-4 h-4 text-blue-600" />
      case "suspicious_activity":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Activity className="w-4 h-4 text-slate-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900">Security Dashboard</h3>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Security Report
          </Button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 font-semibold text-sm mb-1">Active Threats</p>
                <p className="text-3xl font-bold text-emerald-800">{securityMetrics.activeThreats}</p>
                <p className="text-xs text-emerald-600 mt-1">All clear</p>
              </div>
              <div className="p-3 bg-emerald-200/50 rounded-2xl">
                <Shield className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 font-semibold text-sm mb-1">Blocked Attempts</p>
                <p className="text-3xl font-bold text-red-800">{securityMetrics.blockedAttempts}</p>
                <p className="text-xs text-red-600 mt-1">Last 24h</p>
              </div>
              <div className="p-3 bg-red-200/50 rounded-2xl">
                <Lock className="w-6 h-6 text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-semibold text-sm mb-1">Active Sessions</p>
                <p className="text-3xl font-bold text-blue-800">{securityMetrics.activeSessions}</p>
                <p className="text-xs text-blue-600 mt-1">Current users</p>
              </div>
              <div className="p-3 bg-blue-200/50 rounded-2xl">
                <Users className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 font-semibold text-sm mb-1">System Health</p>
                <p className="text-3xl font-bold text-purple-800">{securityMetrics.systemHealth}%</p>
                <p className="text-xs text-purple-600 mt-1">Optimal</p>
              </div>
              <div className="p-3 bg-purple-200/50 rounded-2xl">
                <Database className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50 shadow-xl rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 font-semibold text-sm mb-1">Last Scan</p>
                <p className="text-lg font-bold text-amber-800">{securityMetrics.lastSecurityScan}</p>
                <p className="text-xs text-amber-600 mt-1">Automated</p>
              </div>
              <div className="p-3 bg-amber-200/50 rounded-2xl">
                <Eye className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <Label className="font-semibold text-slate-900">Two-Factor Authentication</Label>
                <p className="text-sm text-slate-600">Require 2FA for all admin accounts</p>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <Label className="font-semibold text-slate-900">Strong Password Policy</Label>
                <p className="text-sm text-slate-600">Enforce complex password requirements</p>
              </div>
              <Switch checked={passwordPolicy} onCheckedChange={setPasswordPolicy} />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl">
              <Label className="font-semibold text-slate-900 mb-2 block">Session Timeout (minutes)</Label>
              <Input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(Number(e.target.value))}
                className="w-32"
              />
              <p className="text-sm text-slate-600 mt-1">Auto-logout inactive users</p>
            </div>

            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl">
                Save Settings
              </Button>
              <Button variant="outline" className="rounded-xl">
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Security Events */}
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl">
                <Activity className="w-5 h-5 text-amber-600" />
              </div>
              Recent Security Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentSecurityEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100"
                >
                  <div className="p-2 bg-slate-100 rounded-xl">{getEventIcon(event.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-slate-900 capitalize">{event.type.replace("_", " ")}</p>
                      <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{event.user}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{event.timestamp}</span>
                      <span>{event.ip}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Recommendations */}
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900">SSL Certificate Valid</p>
                  <p className="text-sm text-emerald-700">Your SSL certificate is valid and secure</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900">Database Encrypted</p>
                  <p className="text-sm text-emerald-700">All sensitive data is encrypted at rest</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900">Security Audit Due</p>
                  <p className="text-sm text-amber-700">Schedule your quarterly security audit</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <Key className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">API Keys Rotation</p>
                  <p className="text-sm text-blue-700">Consider rotating API keys monthly</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
