"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  TrendingUp,
  Shield,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Target,
  Zap,
  Phone,
  Mail,
  MessageCircle,
  Play,
  Calculator,
  BookOpen,
  Video,
  FileText,
  Award,
  Globe,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const [currentScore, setCurrentScore] = useState(580)
  const [targetScore, setTargetScore] = useState(750)
  const [income, setIncome] = useState(75000)
  const [debts, setDebts] = useState(25000)

  // AI Credit Estimator Logic
  const calculateEstimate = () => {
    const baseImprovement = Math.min((targetScore - currentScore) * 0.8, 170)
    const incomeBonus = Math.min(income / 10000, 20)
    const debtPenalty = Math.min(debts / 5000, 30)
    const timeEstimate = Math.max(3, Math.ceil((targetScore - currentScore) / 15))

    return {
      improvement: Math.round(baseImprovement + incomeBonus - debtPenalty),
      timeMonths: timeEstimate,
      successRate: Math.min(95, 60 + income / 2000 - debts / 2000),
    }
  }

  const estimate = calculateEstimate()

  const successStories = [
    {
      name: "Maria Rodriguez",
      before: 520,
      after: 780,
      timeframe: "8 months",
      savings: "$45,000",
      story: "Bought her dream home with the lowest interest rate",
    },
    {
      name: "James Wilson",
      before: 610,
      after: 750,
      timeframe: "6 months",
      savings: "$12,000",
      story: "Qualified for premium credit cards and auto loan",
    },
    {
      name: "Sarah Chen",
      before: 480,
      after: 720,
      timeframe: "12 months",
      savings: "$28,000",
      story: "Eliminated high-interest debt and improved credit",
    },
  ]

  const services = [
    {
      title: "Credit Analysis & Repair",
      description: "Comprehensive credit report analysis with personalized dispute strategies",
      icon: BarChart3,
      features: ["3-Bureau Analysis", "Dispute Letters", "Progress Tracking"],
    },
    {
      title: "AI-Powered Optimization",
      description: "Advanced algorithms to identify the fastest path to your credit goals",
      icon: Zap,
      features: ["Smart Recommendations", "Predictive Modeling", "Real-time Updates"],
    },
    {
      title: "Expert Consultation",
      description: "One-on-one guidance from certified credit repair specialists",
      icon: Users,
      features: ["Personal Advisor", "Monthly Check-ins", "Custom Strategy"],
    },
  ]

  const pricingPlans = [
    {
      name: "Basic",
      price: 89,
      description: "Perfect for getting started",
      features: ["Credit report analysis", "Basic dispute letters", "Monthly progress reports", "Email support"],
      popular: false,
    },
    {
      name: "Advanced",
      price: 149,
      description: "Most popular choice",
      features: [
        "Everything in Basic",
        "AI-powered optimization",
        "Priority dispute processing",
        "Phone support",
        "Credit monitoring",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: 249,
      description: "Maximum results guaranteed",
      features: [
        "Everything in Advanced",
        "Dedicated specialist",
        "Expedited processing",
        "Identity theft protection",
        "Legal consultation",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-orange-100/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                SAINTRIX
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-slate-700 hover:text-orange-600 transition-colors">
                Services
              </a>
              <a href="#how-it-works" className="text-slate-700 hover:text-orange-600 transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-slate-700 hover:text-orange-600 transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-slate-700 hover:text-orange-600 transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">Welcome, {user.name}</span>
                  <Link href={user.role === "admin" ? "/admin" : "/client-portal"}>
                    <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl">
                      Go to {user.role === "admin" ? "Admin" : "Portal"}
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-slate-700 hover:text-orange-600">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-6">
                <Star className="w-4 h-4 mr-2" />
                #1 Rated Credit Repair Service
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Transform Your
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent block">
                  Credit Score
                </span>
                in 90 Days
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our AI-powered credit repair system has helped over 50,000 families improve their credit scores and save
                thousands on loans, mortgages, and insurance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl text-lg px-8 py-4"
                  >
                    Start Free Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="rounded-xl text-lg px-8 py-4">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">50K+</div>
                  <div className="text-sm text-slate-600">Clients Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">127</div>
                  <div className="text-sm text-slate-600">Avg Point Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-sm text-slate-600">Success Rate</div>
                </div>
              </div>
            </div>

            {/* AI Credit Estimator */}
            <Card className="bg-white/80 backdrop-blur-sm border border-orange-200/50 shadow-2xl rounded-3xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl">
                    <Calculator className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">AI Credit Estimator</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Current Credit Score</label>
                    <Input
                      type="range"
                      min="300"
                      max="850"
                      value={currentScore}
                      onChange={(e) => setCurrentScore(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                      <span>300</span>
                      <span className="font-bold text-slate-900">{currentScore}</span>
                      <span>850</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Target Credit Score</label>
                    <Input
                      type="range"
                      min={currentScore}
                      max="850"
                      value={targetScore}
                      onChange={(e) => setTargetScore(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                      <span>{currentScore}</span>
                      <span className="font-bold text-slate-900">{targetScore}</span>
                      <span>850</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Income</label>
                      <Input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        placeholder="75000"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Total Debt</label>
                      <Input
                        type="number"
                        value={debts}
                        onChange={(e) => setDebts(Number(e.target.value))}
                        placeholder="25000"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200/50">
                    <h4 className="font-bold text-emerald-900 mb-4">Your Personalized Estimate</h4>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-800">+{estimate.improvement}</div>
                        <div className="text-xs text-emerald-600">Point Increase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-800">{estimate.timeMonths}</div>
                        <div className="text-xs text-emerald-600">Months</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-800">{Math.round(estimate.successRate)}%</div>
                        <div className="text-xs text-emerald-600">Success Rate</div>
                      </div>
                    </div>

                    <Link href="/login">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-xl">
                        Get Your Free Analysis
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">Our Services</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Credit Solutions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From analysis to optimization, we provide everything you need to achieve your credit goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl group"
              >
                <CardContent className="p-8">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-4">How It Works</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple 4-Step Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Our proven methodology gets results fast</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Free Analysis",
                description: "We analyze your credit reports from all three bureaus",
                icon: BarChart3,
              },
              {
                step: "02",
                title: "Custom Strategy",
                description: "AI creates a personalized plan for maximum impact",
                icon: Target,
              },
              {
                step: "03",
                title: "Dispute Process",
                description: "We handle all disputes and negotiations for you",
                icon: Shield,
              },
              {
                step: "04",
                title: "Track Progress",
                description: "Monitor improvements in real-time dashboard",
                icon: TrendingUp,
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">Success Stories</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Real Results from Real People</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how our clients transformed their financial lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {story.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                      <p className="text-slate-600">{story.timeframe}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-red-50 rounded-2xl">
                      <div className="text-2xl font-bold text-red-700">{story.before}</div>
                      <div className="text-sm text-red-600">Before</div>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-2xl">
                      <div className="text-2xl font-bold text-emerald-700">{story.after}</div>
                      <div className="text-sm text-emerald-600">After</div>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-emerald-600">{story.savings}</div>
                    <div className="text-sm text-slate-600">Total Savings</div>
                  </div>

                  <p className="text-slate-700 text-center italic">"{story.story}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Education Hub */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">Education Hub</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Master Your Credit Knowledge</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Free resources to help you understand and improve your credit
            </p>
          </div>

          <Tabs defaultValue="guides" className="w-full">
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

            <TabsContent value="guides">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Understanding Credit Scores",
                  "Dispute Letter Templates",
                  "Credit Building Strategies",
                  "Identity Theft Protection",
                  "Mortgage Preparation Guide",
                  "Business Credit Basics",
                ].map((guide, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {guide}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">
                        Comprehensive guide with actionable steps and expert insights.
                      </p>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Credit Score Basics (5 min)",
                  "Dispute Process Walkthrough (12 min)",
                  "Building Credit from Scratch (8 min)",
                  "Advanced Optimization Tips (15 min)",
                ].map((video, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-4 flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                        <Play className="w-12 h-12 text-slate-600 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">{video}</h3>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                        Watch Now <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Credit Score Calculator", desc: "Estimate your potential score improvement" },
                  { name: "Debt-to-Income Ratio", desc: "Calculate your DTI for loan applications" },
                  { name: "Payment Calculator", desc: "See how payments affect your credit utilization" },
                  { name: "Timeline Planner", desc: "Plan your credit improvement journey" },
                ].map((tool, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Calculator className="w-6 h-6 text-emerald-600" />
                        <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">{tool.desc}</p>
                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 p-0">
                        Use Tool <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 border-green-200 mb-4">Pricing Plans</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Success Plan</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-white/80 backdrop-blur-sm border shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl relative ${
                  plan.popular ? "border-orange-300 ring-2 ring-orange-200 scale-105" : "border-slate-200/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white border-orange-600 px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-slate-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-slate-600">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/login">
                    <Button
                      className={`w-full rounded-xl ${
                        plan.popular
                          ? "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                          : "bg-slate-900 hover:bg-slate-800"
                      }`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">All plans include our 90-day money-back guarantee</p>
            <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>BBB Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>FCRA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-6">Get In Touch</Badge>

              <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Transform Your Credit?</h2>

              <p className="text-xl text-slate-600 mb-8">
                Speak with a credit specialist today and get your free consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Call Us</div>
                    <div className="text-slate-600">(555) 123-CREDIT</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Email Us</div>
                    <div className="text-slate-600">support@saintrix.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Live Chat</div>
                    <div className="text-slate-600">Available 24/7</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-2xl rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Free Consultation</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                      <Input placeholder="John" className="rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                      <Input placeholder="Doe" className="rounded-xl" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <Input type="email" placeholder="john@example.com" className="rounded-xl" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                    <Input type="tel" placeholder="(555) 123-4567" className="rounded-xl" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Current Credit Score (if known)
                    </label>
                    <Input placeholder="e.g. 580" className="rounded-xl" />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl">
                    Schedule Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
                  SAINTRIX
                </h3>
              </div>
              <p className="text-slate-400 mb-6">Transforming credit scores and changing lives since 2020.</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Credit Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dispute Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Credit Monitoring
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Identity Protection
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Credit Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Free Tools
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2024 Saintrix. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <Shield className="w-3 h-3 mr-1" />
                FCRA Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                <Award className="w-3 h-3 mr-1" />
                BBB Accredited
              </Badge>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-2xl animate-pulse"
        >
          <MessageCircle className="w-6 h-6 mr-2" />
          Chat Now
        </Button>
      </div>
    </div>
  )
}
