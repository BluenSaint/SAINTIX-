"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Shield,
  Users,
  UserCheck,
  Building,
} from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [fullName, setFullName] = useState("")
  const [accountType, setAccountType] = useState("client")
  const { signIn, signUp, loading } = useAuth()

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    strength = Object.values(checks).filter(Boolean).length
    return { strength: (strength / 5) * 100, checks }
  }

  const passwordStrength = getPasswordStrength(password)

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500"
    if (strength < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 40) return "Weak"
    if (strength < 70) return "Medium"
    return "Strong"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Form validation
    if (isSignUp) {
      if (!fullName.trim()) {
        setError("Full name is required")
        return
      }
      if (passwordStrength.strength < 40) {
        setError("Please choose a stronger password")
        return
      }
    }

    try {
      if (isSignUp) {
        await signUp(email, password, fullName, accountType)
        setError("")
        setIsSignUp(false)
        setError("Account created! Please check your email to verify your account before signing in.")
      } else {
        await signIn(email, password)
      }
    } catch (error: any) {
      console.error("Auth error:", error)
      setError(error.message || "Authentication failed. Please try again.")
    }
  }

  const demoAccounts = [
    {
      email: "admin@saintrix.com",
      role: "Admin",
      description: "Full system access",
      icon: <Shield className="w-4 h-4" />,
      color: "bg-red-100 text-red-800 border-red-200",
    },
    {
      email: "client@saintrix.com",
      role: "Client",
      description: "Client portal access",
      icon: <UserCheck className="w-4 h-4" />,
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      email: "team@saintrix.com",
      role: "Team Member",
      description: "Team dashboard access",
      icon: <Users className="w-4 h-4" />,
      color: "bg-green-100 text-green-800 border-green-200",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/20 flex items-center justify-center p-4">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl"></div>

      <div className="relative w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                SAINTRIX
              </h1>
              <p className="text-sm text-gray-500">by BlueCrest Financial</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg">{isSignUp ? "Create your account" : "Welcome back"}</p>
        </div>

        {/* Main Auth Card */}
        <Card className="bg-white/90 backdrop-blur-sm border border-amber-200/50 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-orange-50">
            <CardTitle className="text-center text-xl font-semibold text-gray-900">
              {isSignUp ? "Create Account" : "Sign In"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountType" className="text-sm font-medium text-gray-700">
                      Account Type
                    </Label>
                    <Select value={accountType} onValueChange={setAccountType}>
                      <SelectTrigger className="rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            Client
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Admin
                          </div>
                        </SelectItem>
                        <SelectItem value="team">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Team Member
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    minLength={6}
                    className="rounded-xl pr-12 border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-2 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Password Strength Indicator */}
                {isSignUp && password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Password strength</span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.strength < 40
                            ? "text-red-600"
                            : passwordStrength.strength < 70
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {getStrengthText(passwordStrength.strength)}
                      </span>
                    </div>
                    <Progress value={passwordStrength.strength} className="h-2" />
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        {passwordStrength.checks.length ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300" />
                        )}
                        <span className={passwordStrength.checks.length ? "text-green-600" : "text-gray-400"}>
                          8+ characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.checks.uppercase ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300" />
                        )}
                        <span className={passwordStrength.checks.uppercase ? "text-green-600" : "text-gray-400"}>
                          Uppercase
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.checks.number ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300" />
                        )}
                        <span className={passwordStrength.checks.number ? "text-green-600" : "text-gray-400"}>
                          Number
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.checks.special ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-300" />
                        )}
                        <span className={passwordStrength.checks.special ? "text-green-600" : "text-gray-400"}>
                          Special char
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <Alert
                  className={`rounded-xl ${
                    error.includes("created") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                  }`}
                >
                  <AlertDescription className={error.includes("created") ? "text-green-700" : "text-red-700"}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl py-3 text-base font-medium shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isSignUp ? "Creating account..." : "Signing in..."}
                  </>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError("")
                  setPassword("")
                }}
                className="text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50"
              >
                {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
              </Button>

              <div>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-700 flex items-center justify-center gap-1"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-gradient-to-br from-slate-50 to-blue-50/30 backdrop-blur-sm border border-slate-200/50 shadow-lg rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-center text-gray-700 flex items-center justify-center gap-2">
              <Building className="w-4 h-4" />
              Demo Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/80 rounded-xl cursor-pointer hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100"
                onClick={() => {
                  setEmail(account.email)
                  setPassword("password123")
                  setFullName(account.role + " User")
                  setAccountType && setAccountType(account.role.toLowerCase().replace(" member", ""))
                }}
              >
                <div className="flex items-center gap-3">
                  <Badge className={`${account.color} flex items-center gap-1`}>
                    {account.icon}
                    {account.role}
                  </Badge>
                  <div>
                    <p className="text-sm text-gray-600">{account.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                >
                  Use Account
                </Button>
              </div>
            ))}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                Password: <code className="bg-gray-200 px-2 py-1 rounded text-gray-700">password123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
