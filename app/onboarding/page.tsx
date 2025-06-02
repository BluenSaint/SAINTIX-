"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, CheckCircle, ArrowRight, ArrowLeft, FileText, Shield, Heart, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    ssnLast4: "",
    address: "",
    disputeType: "",
    uploadedFile: null as File | null,
  })
  const router = useRouter()

  const totalSteps = 5

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/client-portal")
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, uploadedFile: file })
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 2:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.ssnLast4 && formData.address
      case 3:
        return formData.uploadedFile
      case 4:
        return formData.disputeType
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50/20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-orange-100/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                SAINTRIX
              </h1>
            </div>
            <div className="text-sm text-slate-600">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 5 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                      step < currentStep ? "bg-gradient-to-r from-orange-400 to-amber-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100/50 shadow-xl rounded-3xl">
          <CardContent className="p-8">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Let's get your credit moving forward.</h2>
                <p className="text-xl text-slate-600 mb-8">Just a few steps, and your custom plan begins.</p>
                <div className="space-y-4 text-left bg-slate-50 rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">Share your information securely</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">Upload your credit report</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">Get your personalized plan</span>
                  </div>
                </div>
                <Button
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl py-6 text-lg font-semibold"
                >
                  Start Setup
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Client Info */}
            {currentStep === 2 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Tell us about yourself</h2>
                  <p className="text-slate-600">We keep everything safe with bank-level encryption</p>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 mb-2 block">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="rounded-xl border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 mb-2 block">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="rounded-xl border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-slate-700 mb-2 block">
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="rounded-xl border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ssnLast4" className="text-sm font-medium text-slate-700 mb-2 block">
                      Last 4 digits of SSN
                    </Label>
                    <Input
                      id="ssnLast4"
                      value={formData.ssnLast4}
                      onChange={(e) =>
                        setFormData({ ...formData, ssnLast4: e.target.value.replace(/\D/g, "").slice(0, 4) })
                      }
                      className="rounded-xl border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                      placeholder="1234"
                      maxLength={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm font-medium text-slate-700 mb-2 block">
                      Current Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="rounded-xl border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-emerald-800">Bank-Level Encryption</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Credit Report Upload */}
            {currentStep === 3 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload your credit report</h2>
                  <p className="text-slate-600">PDF from Credit Karma, IdentityIQ, or any monitoring service</p>
                </div>

                <div className="space-y-6">
                  {!formData.uploadedFile ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-orange-400 transition-colors">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Drop your PDF here</h3>
                      <p className="text-slate-600 mb-4">or click to browse files</p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl cursor-pointer hover:from-orange-600 hover:to-amber-600 transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </label>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <div>
                          <h3 className="font-semibold text-emerald-900">{formData.uploadedFile.name}</h3>
                          <p className="text-sm text-emerald-700">File uploaded successfully</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Need a sample report?</h4>
                    <p className="text-sm text-blue-800 mb-3">Download a sample to see the format we need</p>
                    <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                      <FileText className="w-4 h-4 mr-2" />
                      View Sample PDF
                    </Button>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1">
                    <p>• Report must be recent (within 30 days)</p>
                    <p>• PDF format only, max 10MB</p>
                    <p>• All pages must be readable</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Dispute Type */}
            {currentStep === 4 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">What kind of review would you like?</h2>
                  <p className="text-slate-600">Choose the approach that fits your situation best</p>
                </div>

                <div className="space-y-4">
                  <div
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                      formData.disputeType === "factual"
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setFormData({ ...formData, disputeType: "factual" })}
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">Factual Dispute</h3>
                    <p className="text-sm text-slate-600">Challenge items that are inaccurate or outdated</p>
                  </div>

                  <div
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                      formData.disputeType === "metro2"
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setFormData({ ...formData, disputeType: "metro2" })}
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">Metro2 Compliance</h3>
                    <p className="text-sm text-slate-600">Technical review for reporting violations</p>
                  </div>

                  <div
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                      formData.disputeType === "validation"
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setFormData({ ...formData, disputeType: "validation" })}
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">Debt Validation</h3>
                    <p className="text-sm text-slate-600">Request proof that debts are valid and yours</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">You're all set!</h2>
                <p className="text-xl text-slate-600 mb-8">Our experts and AI are reviewing your report with care.</p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-700">Personal information secured</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-700">Credit report uploaded</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-700">Review type selected</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-orange-900 mb-2">What happens next?</h3>
                  <p className="text-sm text-orange-800">
                    We'll review your report within 24 hours and start your personalized plan. You'll get updates every
                    step of the way.
                  </p>
                </div>

                <Button
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl py-6 text-lg font-semibold"
                >
                  Go to My Portal
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Navigation */}
            {currentStep > 1 && currentStep < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                <Button variant="ghost" onClick={prevStep} className="text-slate-600 hover:text-slate-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
