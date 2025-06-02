"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  CreditCard,
  FileText,
  PieChart,
  Upload,
  Settings,
  HelpCircle,
  LogOut,
  BarChart3,
  Target,
} from "lucide-react"

interface ClientSidebarProps {
  activeNav: string
  setActiveNav: (nav: string) => void
}

export function ClientSidebar({ activeNav, setActiveNav }: ClientSidebarProps) {
  const { user, logout } = useAuth()

  const navigationItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "scores", icon: CreditCard, label: "Credit Scores", badge: "+45" },
    { id: "goals", icon: Target, label: "Goals", badge: "68%" },
    { id: "disputes", icon: FileText, label: "Disputes", badge: "2" },
    { id: "reports", icon: PieChart, label: "Reports" },
    { id: "documents", icon: Upload, label: "Documents" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "support", icon: HelpCircle, label: "Support" },
  ]

  return (
    <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white fixed h-full z-50 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
              SAINTRIX
            </h1>
            <p className="text-xs text-slate-400">Client Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeNav === item.id
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-slate-400">Advanced Plan</p>
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
