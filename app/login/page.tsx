"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [fullName, setFullName] = useState("")
  const { signIn, signUp, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          setError("Full name is required")
          return
        }
        await signUp(email, password, fullName)
        setError("")
        setIsSignUp(false)
        // Show success message
        setError("Account created! Please check your email to verify your account before signing in.")
      } else {
        await signIn(email, password)
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      setError(error.message || "Authentication failed. Please try again.")
    }
  }

  const demoAccounts = [
    { 
      email: "admin@saintrix.com", 
      role: "Admin", 
      description: "Full system access",
      note: "Create this account first"
    },
    { 
      email: "client@saintrix.com", 
      role: "Client", 
      description: "Client portal access",
      note: "Create this account first"
    },
    { 
      email: "team@saintrix.com", 
      role: "Team Member", 
      description: "Team dashboard access",
      note: "Create this account first"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              SAINTRIX
            </h1>
          </div>
          <p className="text-slate-600">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        {/* Login/Signup Form */}
        <Card className="bg-white/80 backdrop-blur-sm border border-orange-200/50 shadow-xl rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="rounded-xl"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    minLength={6}
                    className="rounded-xl pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className={`border-red-200 bg-red-50 ${error.includes('created') ? 'border-green-200 bg-green-50' : ''}`}>
                  <AlertDescription className={error.includes('created') ? 'text-green-700' : 'text-red-700'}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isSignUp ? "Creating account..." : "Signing in..."}
                  </>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError("")
                }}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
              </Button>
              
              <div>
                <Link href="/" className="text-sm text-slate-600 hover:text-slate-700">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-lg rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-center text-slate-700">Demo Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => {
                  setEmail(account.email)
                  setPassword("password123")
                  setFullName(account.role + " User")
                }}
              >
                <div>
                  <p className="font-medium text-sm text-slate-900">{account.role}</p>
                  <p className="text-xs text-slate-600">{account.description}</p>
                  <p className="text-xs text-orange-600">{account.note}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Use Account
                </Button>
              </div>
            ))}
            <p className="text-xs text-center text-slate-500 mt-3">
              Password: <code className="bg-slate-200 px-1 rounded">password123</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
