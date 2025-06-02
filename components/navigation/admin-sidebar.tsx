"use client"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Users,
  FileText,
  BarChart3,
  Receipt,
  UserCog,
  Settings,
  FileOutputIcon as FileExport,
  LogOut,
  CreditCard,
  ChevronUp,
  ChevronDown,
  Shield,
  Database,
  Bell,
} from "lucide-react"

interface AdminSidebarProps {
  activeNav: string
  setActiveNav: (nav: string) => void
  showBillingDetails: boolean
  setShowBillingDetails: (show: boolean) => void
}

export function AdminSidebar({
  activeNav,
  setActiveNav,
  showBillingDetails,
  setShowBillingDetails,
}: AdminSidebarProps) {
  const { user, logout } = useAuth()

  const navigationItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", permission: "view_dashboard" },
    { id: "clients", icon: Users, label: "Clients", permission: "manage_clients" },
    { id: "disputes", icon: FileText, label: "Disputes", permission: "manage_disputes" },
    { id: "analytics", icon: BarChart3, label: "Analytics", permission: "view_analytics" },
    { id: "billing", icon: Receipt, label: "Billing", permission: "manage_billing" },
    { id: "team", icon: UserCog, label: "Team", permission: "manage_team" },
    { id: "security", icon: Shield, label: "Security", permission: "manage_security" },
    { id: "system", icon: Database, label: "System", permission: "manage_system" },
    { id: "settings", icon: Settings, label: "Settings", permission: "manage_settings" },
    { id: "export", icon: FileExport, label: "Export Data", permission: "export_data" },
  ]

  return (
    <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white fixed h-full z-50 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
              SAINTRIX
            </h1>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            // Check if user has permission for this item
            if (!user?.permissions.includes("*") && !user?.permissions.includes(item.permission)) {
              return null
            }

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveNav(item.id)
                    if (item.id === "billing") {
                      setShowBillingDetails(!showBillingDetails)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeNav === item.id
                      ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.id === "billing" && (
                    <div className="ml-auto">
                      {showBillingDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  )}
                  {item.id === "disputes" && (
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">89</Badge>
                  )}
                  {item.id === "security" && (
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                      <Bell className="w-3 h-3" />
                    </Badge>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role.replace("_", " ")}</p>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
