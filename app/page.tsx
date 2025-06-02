"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Shield,
  Target,
  ArrowRight,
  CheckCircle,
  Play,
  Brain,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote:
        "Saintrix helped me understand my credit in plain English. The AI analysis was spot-on and I improved 140 points in 6 months.",
      name: "Maria Rodriguez",
      location: "Austin, TX",
      avatar: "MR",
    },
    {
      quote:
        "Finally, a credit repair service that actually explains what they're doing. The transparency and results speak for themselves.",
      name: "James Wilson",
      location: "Denver, CO",
      avatar: "JW",
    },
    {
      quote:
        "The AI-powered approach made all the difference. I went from 520 to 720 and qualified for my dream home loan.",
      name: "Sarah Chen",
      location: "Seattle, WA",
      avatar: "SC",
    },
    {
      quote:
        "Professional, transparent, and effective. Saintrix delivered exactly what they promised - and faster than expected.",
      name: "Michael Torres",
      location: "Miami, FL",
      avatar: "MT",
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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">SAINTRIX</h1>
            </div>

            <div className="flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Link href={user.role === "admin" ? "/admin" : "/client-portal"}>
                    <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                      Go to {user.role === "admin" ? "Admin" : "Portal"}
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                      Start Free Trial
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smarter Credit Care,
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Built with AI
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our AI analyzes your credit in plain English while human experts handle the complex work—giving you clarity
            and results you can trust.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-lg px-8 py-4 h-auto"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="text-lg px-8 py-4 h-auto text-gray-600 hover:text-gray-900">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>SOC2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>AICPA Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI That Understands</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get plain-English credit analysis that explains exactly what's affecting your score and why.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Always Protected</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bank-level security with full FCRA compliance ensures your data and rights are protected.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Credit Growth Plan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Personalized roadmap with milestone tracking to reach your credit goals faster.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                See exactly what's
                <br />
                affecting your credit
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our AI breaks down complex credit factors into simple, actionable insights. No confusing jargon—just
                clear explanations and a step-by-step plan to improve your score.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Instant credit report analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Plain-English explanations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Personalized improvement roadmap</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Browser mockup header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="ml-4 text-sm text-gray-500">saintrix.com/analysis</div>
                  </div>
                </div>

                {/* Dashboard preview content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">AI Credit Analysis</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-blue-900 mb-1">Payment History Impact</div>
                      <div className="text-sm text-blue-700">
                        Your on-time payments are helping your score. Keep it up!
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-amber-900 mb-1">Credit Utilization</div>
                      <div className="text-sm text-amber-700">
                        At 45%, this is your biggest opportunity for improvement.
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-green-900 mb-1">Next Steps</div>
                      <div className="text-sm text-green-700">Pay down Card #1 by $2,400 for a 40-point boost.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your credit goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 relative ${
                  plan.popular ? "ring-2 ring-orange-200 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white border-0 px-3 py-1">Most Loved</Badge>
                  </div>
                )}

                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/login">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by thousands</h2>
            <p className="text-xl text-gray-600">Real results from real people</p>
          </div>

          <div className="relative">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <p className="text-xl text-gray-700 leading-relaxed italic">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{testimonials[currentTestimonial].avatar}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-gray-600">{testimonials[currentTestimonial].location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Take Back Control?</h2>

          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-lg px-8 py-4 h-auto mb-6"
            >
              Start My Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <p className="text-gray-600">Cancel anytime. Money-back guarantee.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">SAINTRIX</h3>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-600 mb-6 md:mb-0">
              <a href="#" className="hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2025 Saintrix. Kind credit care for all. Built by BlueCrest Financial.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
