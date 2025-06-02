"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreditScoreWidget from "@/components/dashboard/credit-score-widget"
import ProgressChart from "@/components/client-portal/progress-chart"
import GoalTracker from "@/components/client-portal/goal-tracker"
import {
  ArrowRight,
  Star,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Award,
  Target,
  BarChart3,
  CreditCard,
  Quote,
  Play,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Calculator,
  Brain,
  Smartphone,
  BookOpen,
  Video,
  ChevronRight,
  Lock,
  Download,
  UserCheck,
  Home,
  Car,
} from "lucide-react"

export default function SaintrixLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [currentScore, setCurrentScore] = useState(580)
  const [targetScore, setTargetScore] = useState(750)

  // Mock data for components
  const scoreHistory = [
    { date: "Jan", experian: 580, equifax: 575, transunion: 585 },
    { date: "Feb", experian: 610, equifax: 605, transunion: 615 },
    { date: "Mar", experian: 645, equifax: 640, transunion: 650 },
    { date: "Apr", experian: 680, equifax: 675, transunion: 685 },
    { date: "May", experian: 710, equifax: 705, transunion: 715 },
    { date: "Jun", experian: 740, equifax: 735, transunion: 745 },
  ]

  const calculateMonthsToGoal = (current: number, target: number) => {
    const pointsNeeded = target - current
    const avgPointsPerMonth = 25 // Based on our average
    return Math.ceil(pointsNeeded / avgPointsPerMonth)
  }

  const calculateSavings = (scoreIncrease: number) => {
    // Estimated savings based on credit score improvement
    const mortgageSavings = scoreIncrease * 50 // $50 per point on mortgage
    const autoLoanSavings = scoreIncrease * 25 // $25 per point on auto loan
    const creditCardSavings = scoreIncrease * 15 // $15 per point on credit cards
    return mortgageSavings + autoLoanSavings + creditCardSavings
  }

  const testimonials = [
    {
      name: "Sarah Rodriguez",
      location: "Miami, FL",
      beforeScore: 542,
      afterScore: 721,
      timeframe: "8 months",
      savings: "$47,000",
      story: "I was able to buy my first home thanks to Saintrix!",
      image: "/placeholder.svg?height=80&width=80&text=SR",
    },
    {
      name: "Michael Chen",
      location: "Austin, TX",
      beforeScore: 598,
      afterScore: 756,
      timeframe: "6 months",
      savings: "$23,500",
      story: "Got approved for a business loan I never thought possible.",
      image: "/placeholder.svg?height=80&width=80&text=MC",
    },
    {
      name: "Jennifer Davis",
      location: "Phoenix, AZ",
      beforeScore: 515,
      afterScore: 689,
      timeframe: "10 months",
      savings: "$31,200",
      story: "Finally qualified for that dream car loan!",
      image: "/placeholder.svg?height=80&width=80&text=JD",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-orange-100/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                SAINTRIX
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">
                Services
              </a>
              <a href="#calculator" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">
                Calculator
              </a>
              <a href="#success-stories" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">
                Success Stories
              </a>
              <a href="#education" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">
                Learn
              </a>
              <a href="#contact" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">
                Contact
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" className="rounded-xl">
                Client Portal
              </Button>
              <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-lg">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-orange-100">
              <div className="flex flex-col space-y-4">
                <a href="#services" className="text-slate-700 hover:text-orange-600 font-medium">
                  Services
                </a>
                <a href="#calculator" className="text-slate-700 hover:text-orange-600 font-medium">
                  Calculator
                </a>
                <a href="#success-stories" className="text-slate-700 hover:text-orange-600 font-medium">
                  Success Stories
                </a>
                <a href="#education" className="text-slate-700 hover:text-orange-600 font-medium">
                  Learn
                </a>
                <a href="#contact" className="text-slate-700 hover:text-orange-600 font-medium">
                  Contact
                </a>
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="outline" className="rounded-xl">
                    Client Portal
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl">
                    Get Started Free
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-6 px-4 py-2 rounded-full">
              <Star className="w-4 h-4 mr-2" />
              #1 AI-Powered Credit Repair Platform
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent block">
                Credit Score
              </span>
              with AI Intelligence
            </h1>

            <p className="text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Join over 50,000 families who've improved their credit scores by an average of 127 points using our
              revolutionary AI-powered credit repair system. See results in as little as 30 days.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-xl text-lg px-8 py-4"
              >
                <Brain className="w-5 h-5 mr-2" />
                Start AI Credit Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo Video
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span>100% Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>BBB A+ Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-orange-600" />
                <span>50,000+ Happy Clients</span>
              </div>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-white/80 backdrop-blur-sm border border-orange-200/50 shadow-xl rounded-3xl text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">127+</p>
              <p className="text-slate-600">Avg Score Increase</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-xl rounded-3xl text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">94.2%</p>
              <p className="text-slate-600">Success Rate</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-xl rounded-3xl text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">30</p>
              <p className="text-slate-600">Days to Results</p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-xl rounded-3xl text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">50K+</p>
              <p className="text-slate-600">Clients Helped</p>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Credit Estimator */}
      <section id="calculator" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">AI Credit Score Estimator</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See your potential credit score improvement and estimated savings with our advanced AI calculator.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Calculator */}
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50/30 border border-orange-200/50 shadow-xl rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl">
                    <Calculator className="w-6 h-6 text-orange-600" />
                  </div>
                  Credit Score Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Current Credit Score: {currentScore}
                  </label>
                  <input
                    type="range"
                    min="300"
                    max="850"
                    value={currentScore}
                    onChange={(e) => setCurrentScore(Number(e.target.value))}
                    className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Target Credit Score: {targetScore}
                  </label>
                  <input
                    type="range"
                    min={currentScore}
                    max="850"
                    value={targetScore}
                    onChange={(e) => setTargetScore(Number(e.target.value))}
                    className="w-full h-3 bg-emerald-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{currentScore}</span>
                    <span>850</span>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/30">
                  <h4 className="font-bold text-slate-900 mb-4">Your Estimated Results</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-emerald-50 rounded-xl">
                      <p className="text-2xl font-bold text-emerald-800">+{targetScore - currentScore}</p>
                      <p className="text-xs text-emerald-600">Point Increase</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold text-blue-800">
                        {calculateMonthsToGoal(currentScore, targetScore)}
                      </p>
                      <p className="text-xs text-blue-600">Months to Goal</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                    <p className="text-center">
                      <span className="text-sm text-slate-600">Estimated Lifetime Savings:</span>
                      <span className="block text-3xl font-bold text-orange-800">
                        ${calculateSavings(targetScore - currentScore).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl py-4 text-lg font-semibold">
                  <Brain className="w-5 h-5 mr-2" />
                  Get My Personalized Plan
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Benefits Breakdown */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">What This Means for You</h3>

              <div className="space-y-4">
                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-200/50 rounded-xl flex items-center justify-center">
                        <Home className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-800">Home Mortgage</h4>
                        <p className="text-sm text-emerald-600">Lower interest rates</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-emerald-800">
                      Save ${((targetScore - currentScore) * 50).toLocaleString()}
                    </p>
                    <p className="text-sm text-emerald-600">Over 30-year mortgage</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-200/50 rounded-xl flex items-center justify-center">
                        <Car className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-800">Auto Loans</h4>
                        <p className="text-sm text-blue-600">Better financing options</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-blue-800">
                      Save ${((targetScore - currentScore) * 25).toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-600">Over loan lifetime</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-200/50 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-800">Credit Cards</h4>
                        <p className="text-sm text-purple-600">Premium rewards & rates</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-purple-800">
                      Save ${((targetScore - currentScore) * 15).toLocaleString()}
                    </p>
                    <p className="text-sm text-purple-600">Annual savings</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Tracking Demo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Track Your Progress in Real-Time</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Watch your credit score improve month by month with our advanced tracking and goal-setting tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ProgressChart scoreHistory={scoreHistory} />
            <GoalTracker currentScore={680} targetScore={750} targetDate="2024-12-31" progress={68} />
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Real Families, Real Results</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how Saintrix has transformed the financial lives of thousands of families across America.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.location}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-orange-300 mb-4" />
                    <p className="text-slate-700 italic leading-relaxed">"{testimonial.story}"</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                      <span className="text-sm font-medium text-slate-700">Before</span>
                      <span className="text-lg font-bold text-red-600">{testimonial.beforeScore}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                      <span className="text-sm font-medium text-slate-700">After</span>
                      <span className="text-lg font-bold text-emerald-600">{testimonial.afterScore}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-slate-600">Timeframe</p>
                        <p className="font-bold text-slate-900">{testimonial.timeframe}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Savings</p>
                        <p className="font-bold text-emerald-600">{testimonial.savings}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-6 px-4 py-2 rounded-full">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile App Available
              </Badge>

              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Manage Your Credit
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent block">
                  On the Go
                </span>
              </h2>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Track your progress, receive real-time alerts, and manage your credit repair journey from anywhere with
                our award-winning mobile app.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Real-time credit score monitoring",
                  "Instant dispute status updates",
                  "AI-powered credit insights",
                  "Secure document upload",
                  "24/7 expert chat support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button className="bg-slate-900 hover:bg-slate-800 rounded-xl">
                  <Download className="w-5 h-5 mr-2" />
                  Download iOS App
                </Button>
                <Button variant="outline" className="rounded-xl">
                  <Download className="w-5 h-5 mr-2" />
                  Download Android
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-20 flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg">Saintrix App</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <CreditScoreWidget
                      currentScore={687}
                      previousScore={642}
                      bureau="Average Score"
                      lastUpdated="Today"
                    />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                        <span className="text-sm font-medium">Disputes Active</span>
                        <Badge className="bg-emerald-100 text-emerald-700">3</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                        <span className="text-sm font-medium">Goal Progress</span>
                        <Badge className="bg-blue-100 text-blue-700">68%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Education Hub */}
      <section id="education" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Credit Education Hub</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Empower yourself with knowledge. Learn the insider secrets to building and maintaining excellent credit.
            </p>
          </div>

          <Tabs defaultValue="guides" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Complete Guide to Credit Scores",
                    description: "Everything you need to know about how credit scores work",
                    readTime: "8 min read",
                    category: "Basics",
                  },
                  {
                    title: "Dispute Letters That Actually Work",
                    description: "Proven templates and strategies for successful disputes",
                    readTime: "12 min read",
                    category: "Advanced",
                  },
                  {
                    title: "Building Credit from Scratch",
                    description: "Step-by-step guide for credit beginners",
                    readTime: "6 min read",
                    category: "Basics",
                  },
                  {
                    title: "Credit Utilization Optimization",
                    description: "Advanced techniques to maximize your score",
                    readTime: "10 min read",
                    category: "Advanced",
                  },
                ].map((guide, index) => (
                  <Card
                    key={index}
                    className="bg-white border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge
                          className={`${
                            guide.category === "Advanced"
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}
                        >
                          {guide.category}
                        </Badge>
                        <ChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-slate-600 mb-4">{guide.description}</p>
                      <p className="text-sm text-slate-500">{guide.readTime}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Credit Score Basics Explained",
                    duration: "5:32",
                    views: "12.5K",
                    thumbnail: "/placeholder.svg?height=200&width=300&text=Video+1",
                  },
                  {
                    title: "How to Dispute Credit Report Errors",
                    duration: "8:45",
                    views: "8.2K",
                    thumbnail: "/placeholder.svg?height=200&width=300&text=Video+2",
                  },
                  {
                    title: "Building Credit with Secured Cards",
                    duration: "6:18",
                    views: "15.1K",
                    thumbnail: "/placeholder.svg?height=200&width=300&text=Video+3",
                  },
                  {
                    title: "Advanced Credit Optimization",
                    duration: "12:03",
                    views: "6.7K",
                    thumbnail: "/placeholder.svg?height=200&width=300&text=Video+4",
                  },
                ].map((video, index) => (
                  <Card
                    key={index}
                    className="bg-white border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-orange-600 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-slate-500">{video.views} views</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Credit Utilization Calculator",
                    description: "Calculate your optimal credit card balances",
                    icon: Calculator,
                    color: "blue",
                  },
                  {
                    title: "Debt Payoff Planner",
                    description: "Create a strategic debt elimination plan",
                    icon: Target,
                    color: "emerald",
                  },
                  {
                    title: "Credit Mix Analyzer",
                    description: "Optimize your credit account portfolio",
                    icon: BarChart3,
                    color: "purple",
                  },
                  {
                    title: "Score Improvement Tracker",
                    description: "Monitor your progress over time",
                    icon: TrendingUp,
                    color: "orange",
                  },
                ].map((tool, index) => (
                  <Card
                    key={index}
                    className="bg-white border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br from-${tool.color}-100 to-${tool.color}-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <tool.icon className={`w-6 h-6 text-${tool.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-slate-600 text-sm">{tool.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <Button variant="outline" className="w-full rounded-xl border-orange-200 hover:bg-orange-50">
                        Use Tool
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-full shadow-2xl animate-pulse"
        >
          <MessageCircle className="w-6 h-6 mr-2" />
          Chat with Expert
        </Button>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Financial Future?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who've improved their credit and achieved their dreams with Saintrix.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl"
            />
            <Button className="bg-white text-orange-600 hover:bg-gray-100 rounded-xl px-8 whitespace-nowrap">
              <Brain className="w-5 h-5 mr-2" />
              Start Free Analysis
            </Button>
          </div>

          <p className="text-sm opacity-75">
            No credit card required • AI analysis in 60 seconds • 100% money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
                  SAINTRIX
                </h3>
              </div>
              <p className="text-slate-400 mb-6">
                Transforming credit scores and changing lives with AI-powered credit repair solutions.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <Twitter className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <Linkedin className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    AI Credit Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Credit Repair
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Score Monitoring
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Identity Protection
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Credit Building
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Credit Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Credit Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Client Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">© 2024 Saintrix Credit Repair. All rights reserved.</p>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  BBB A+ Rated
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  FCRA Compliant
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Money Back Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
