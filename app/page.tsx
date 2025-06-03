"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  CreditCard,
  Shield,
  ArrowRight,
  CheckCircle,
  Play,
  Brain,
  Lock,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  TrendingUp,
  Info,
  FileText,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [creditInsurance, setCreditInsurance] = useState(false)

  const testimonials = [
    {
      quote: "+102 points in 4 months! The AI insights were incredibly accurate.",
      name: "Maria Rodriguez",
      location: "Austin, TX",
      avatar: "/placeholder.svg?height=48&width=48&text=MR",
      result: "+102 points",
      timeframe: "4 months",
    },
    {
      quote: "Approved for home loan in 6 weeks after working with Saintrix.",
      name: "James Wilson",
      location: "Denver, CO",
      avatar: "/placeholder.svg?height=48&width=48&text=JW",
      result: "Home approved",
      timeframe: "6 weeks",
    },
    {
      quote: "+140 points improvement. Finally understand my credit!",
      name: "Sarah Chen",
      location: "Seattle, WA",
      avatar: "/placeholder.svg?height=48&width=48&text=SC",
      result: "+140 points",
      timeframe: "5 months",
    },
    {
      quote: "Car loan approved at 3.2% APR. Saved thousands in interest!",
      name: "Michael Torres",
      location: "Miami, FL",
      avatar: "/placeholder.svg?height=48&width=48&text=MT",
      result: "3.2% APR",
      timeframe: "3 months",
    },
  ]

  const pricingPlans = [
    {
      name: "Basic",
      price: 99,
      insurancePrice: 29,
      description: "Perfect for getting started",
      features: [
        "2 credit disputes per month",
        "Unlimited inquiry removals",
        "AI-powered credit analysis",
        "Basic support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: 180,
      insurancePrice: 39,
      description: "Most popular choice",
      features: [
        "Everything in Basic",
        "Priority dispute handling",
        "Dedicated credit coach",
        "Monthly credit monitoring report",
        "Full credit roadmap access",
      ],
      popular: true,
    },
    {
      name: "Elite (Personal + Business)",
      price: 250,
      insurancePrice: 0, // Included
      description: "Maximum results guaranteed",
      features: [
        "Everything in Pro",
        "Business credit guidance",
        "Business structure setup assistance",
        "Funding strategy advisory",
        "Dual reporting (personal + business credit support)",
        "Credit insurance included",
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
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                SAINTRIX
              </h1>
            </div>

            <div className="flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Link href={user.role === "admin" ? "/admin" : "/client-portal"}>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-sm">
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
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-sm">
                      Build My Credit Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-white relative overflow-hidden">
        {/* Floating Credit Score Simulator Preview */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden xl:block">
          <div className="bg-white/90 backdrop-blur-sm border border-amber-100 rounded-l-2xl shadow-xl p-6 w-72">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Credit Score Simulator</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Pay down credit card debt</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="30"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <span className="text-xs font-medium text-gray-700">30%</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">Remove late payments</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="3"
                    defaultValue="2"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <span className="text-xs font-medium text-gray-700">2</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Estimated improvement</div>
                  <div className="text-2xl font-bold text-amber-600">+72 points</div>
                </div>
              </div>

              <Button size="sm" variant="outline" className="w-full text-xs">
                Full Simulator
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* BlueCrest Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              Backed by BlueCrest Financial • 10+ Years Experience
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Credit Repair, Redefined by AI.
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Backed by BlueCrest Financial.
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            <strong>Professional credit repair with expert-backed AI and transparent results.</strong>
            <br />
            Clarity, compliance, and confidence—powered by Saintrix and built by BlueCrest Financial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg px-8 py-4 h-auto shadow-lg"
              >
                Build My Credit Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="text-lg px-8 py-4 h-auto text-gray-600 hover:text-gray-900">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
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
              <span>FCRA Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Saintrix Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Saintrix?</h2>
            <p className="text-xl text-gray-600">Three key differentiators that set us apart</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparent Process</h3>
                <p className="text-gray-600 leading-relaxed">
                  See exactly what we're doing, when we're doing it, and why. No black box—complete visibility into your
                  credit repair journey.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart AI</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI doesn't just analyze—it explains in plain English what's affecting your score and provides
                  personalized action plans.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Help</h3>
                <p className="text-gray-600 leading-relaxed">
                  Human specialists with 10+ years experience handle complex disputes while you get clear updates and
                  guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* New Feature Blocks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Credit Insurance */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Credit Insurance</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Protect your hard-earned credit improvements with our comprehensive credit insurance. We monitor your
                credit 24/7 and automatically dispute any new negative items that appear.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">24/7 credit monitoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">Automatic dispute filing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">Identity theft protection</span>
                </li>
              </ul>
            </div>

            {/* Tradelines */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Tradeline Access</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Boost your credit score quickly with access to our network of verified tradeline vendors. Add positive
                payment history and lower your credit utilization instantly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-gray-700">Verified vendor network</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-gray-700">Instant score improvements</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-gray-700">Safe & compliant process</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your credit goals</p>

            {/* Credit Insurance Toggle */}
            <div className="flex items-center justify-center gap-3 mt-8 p-4 bg-gray-50 rounded-xl max-w-md mx-auto">
              <span className="text-sm font-medium text-gray-700">Add Credit Insurance</span>
              <Switch
                checked={creditInsurance}
                onCheckedChange={setCreditInsurance}
                className="data-[state=checked]:bg-amber-500"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Protect your credit improvements with 24/7 monitoring and automatic dispute filing
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-white border shadow-sm hover:shadow-lg transition-all duration-300 relative ${
                  plan.popular ? "ring-2 ring-amber-200 scale-105 border-amber-200" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price + (creditInsurance && plan.insurancePrice > 0 ? plan.insurancePrice : 0)}
                      </span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    {creditInsurance && plan.insurancePrice > 0 && (
                      <p className="text-sm text-amber-600 mt-1">+${plan.insurancePrice} Credit Insurance</p>
                    )}
                    {plan.name === "Elite" && creditInsurance && (
                      <p className="text-sm text-green-600 mt-1">Credit Insurance Included</p>
                    )}
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
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
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

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by thousands</h2>
            <p className="text-xl text-gray-600">Real results from real people</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed italic mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </p>

                  <div className="flex items-center justify-center gap-4 mb-4">
                    <img
                      src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                      <div className="text-sm text-gray-600">{testimonials[currentTestimonial].location}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {testimonials[currentTestimonial].result}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      {testimonials[currentTestimonial].timeframe}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            {/* Thumbnail indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    index === currentTestimonial
                      ? "border-amber-400 ring-2 ring-amber-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Credit?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands who've improved their credit with Saintrix</p>

          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg px-8 py-4 h-auto mb-6 shadow-lg"
            >
              Build My Credit Now
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
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                SAINTRIX
              </h3>
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <p className="text-sm text-gray-600">© 2025 Saintrix.</p>
              <div className="px-3 py-1 bg-slate-800/10 rounded-full">
                <p className="text-sm font-medium text-slate-700">Built by BlueCrest Financial</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
