"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  FileCheck,
  Loader2,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  User,
  CreditCard,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface CreditRepairClientProps {
  user: any
  client: any
}

export function CreditRepairClient({ user, client }: CreditRepairClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: client?.first_name || "",
    lastName: client?.last_name || "",
    idNumber: "",
    email: user.email || "",
    phone: client?.phone || "",
    
    // Credit Issues
    creditScore: "",
    creditBureaus: [] as string[],
    specificIssues: [] as string[],
    issueDescription: "",
    
    // Disputes
    disputeAccounts: "",
    disputeReasons: "",
    
    // Goals
    desiredOutcome: "",
    timeframe: "",
    
    // Power of Attorney Agreement
    poaAgreement: false,
    consentToDisputeOnBehalf: false,
    consentToContactBureaus: false,
    consentToProcessPersonalInfo: false,
    understandCreditRepairProcess: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const toggleArrayValue = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    setFormData({ ...formData, [field]: newArray })
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.idNumber &&
          formData.email &&
          formData.phone
        )
      case 2:
        return formData.creditBureaus.length > 0 && formData.specificIssues.length > 0
      case 3:
        return formData.desiredOutcome
      case 4:
        return (
          formData.poaAgreement &&
          formData.consentToDisputeOnBehalf &&
          formData.consentToContactBureaus &&
          formData.consentToProcessPersonalInfo &&
          formData.understandCreditRepairProcess
        )
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      setError(null)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setError("Please complete all required fields before continuing")
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    setError(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      setError("Please accept all agreements before submitting")
      return
    }

    setLoading(true)
    setError(null)

    console.log("[v0] Submitting credit repair application", { userId: user.id })

    try {
      const response = await fetch("/api/client-portal/submit-credit-repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      console.log("[v0] Credit repair application submitted successfully")
      setSuccess(true)
      
      setTimeout(() => {
        router.push("/client-portal/dashboard")
      }, 3000)
    } catch (err: any) {
      console.error("[v0] Submission error:", err)
      setError(err.message || "Failed to submit application")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-2 border-[#FFD93D]/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#FFD93D]/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-[#FFD93D]" />
            </div>
            <CardTitle className="text-2xl text-[#0D3B66]">Application Submitted!</CardTitle>
            <CardDescription>
              Your credit repair application has been received
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-[#0D3B66]/70">
              We've sent confirmation emails to you and our team. A credit specialist will review your application and contact you within 24-48 hours.
            </p>
            <Button className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0D3B66]" asChild>
              <Link href="/client-portal/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/client-portal/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <Link href="/" className="text-xl font-bold text-[#0D3B66]">
              DCSA
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[#0D3B66]">Credit Repair Application</h1>
            <Badge variant="outline" className="text-sm">
              Step {currentStep} of 4
            </Badge>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  step <= currentStep ? "bg-[#FFD93D]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  maxLength={13}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Credit Issues */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <CreditCard className="h-5 w-5" />
                Credit History & Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="creditScore">Current Credit Score (if known)</Label>
                <Input
                  id="creditScore"
                  type="number"
                  value={formData.creditScore}
                  onChange={(e) => handleInputChange("creditScore", e.target.value)}
                  placeholder="e.g., 550"
                />
              </div>

              <div className="space-y-3">
                <Label>Which credit bureaus have you checked? *</Label>
                <div className="space-y-2">
                  {["TransUnion", "Experian", "XDS", "Compuscan"].map((bureau) => (
                    <div key={bureau} className="flex items-center gap-2">
                      <Checkbox
                        id={`bureau-${bureau}`}
                        checked={formData.creditBureaus.includes(bureau)}
                        onCheckedChange={() => toggleArrayValue("creditBureaus", bureau)}
                      />
                      <Label htmlFor={`bureau-${bureau}`} className="cursor-pointer">
                        {bureau}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>What specific credit issues are you experiencing? *</Label>
                <div className="space-y-2">
                  {[
                    "Incorrect payment history",
                    "Accounts that don't belong to me",
                    "Judgements",
                    "Collections",
                    "Late payments incorrectly reported",
                    "Credit inquiries I didn't authorize",
                    "Identity theft",
                    "Other",
                  ].map((issue) => (
                    <div key={issue} className="flex items-center gap-2">
                      <Checkbox
                        id={`issue-${issue}`}
                        checked={formData.specificIssues.includes(issue)}
                        onCheckedChange={() => toggleArrayValue("specificIssues", issue)}
                      />
                      <Label htmlFor={`issue-${issue}`} className="cursor-pointer">
                        {issue}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueDescription">Describe your credit issues in detail</Label>
                <Textarea
                  id="issueDescription"
                  value={formData.issueDescription}
                  onChange={(e) => handleInputChange("issueDescription", e.target.value)}
                  rows={4}
                  placeholder="Please provide as much detail as possible about the items you'd like to dispute..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disputeAccounts">
                  List specific accounts or items you want to dispute (optional)
                </Label>
                <Textarea
                  id="disputeAccounts"
                  value={formData.disputeAccounts}
                  onChange={(e) => handleInputChange("disputeAccounts", e.target.value)}
                  rows={3}
                  placeholder="e.g., ABC Bank credit card, XYZ Collections account..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disputeReasons">Reasons for disputes (optional)</Label>
                <Textarea
                  id="disputeReasons"
                  value={formData.disputeReasons}
                  onChange={(e) => handleInputChange("disputeReasons", e.target.value)}
                  rows={3}
                  placeholder="Explain why you believe these items are incorrect..."
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Goals */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <AlertTriangle className="h-5 w-5" />
                Your Credit Repair Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="desiredOutcome">What is your primary goal? *</Label>
                <Textarea
                  id="desiredOutcome"
                  value={formData.desiredOutcome}
                  onChange={(e) => handleInputChange("desiredOutcome", e.target.value)}
                  rows={3}
                  placeholder="e.g., Improve credit score to qualify for a home loan, remove incorrect judgements, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Desired timeframe (optional)</Label>
                <Input
                  id="timeframe"
                  value={formData.timeframe}
                  onChange={(e) => handleInputChange("timeframe", e.target.value)}
                  placeholder="e.g., 3-6 months"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What to expect:</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Credit repair typically takes 3-6 months</li>
                  <li>Results vary based on the complexity of issues</li>
                  <li>We'll dispute inaccurate items with credit bureaus</li>
                  <li>You'll receive monthly progress updates</li>
                  <li>We provide credit education and coaching</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Power of Attorney */}
        {currentStep === 4 && (
          <Card className="border-2 border-[#FFD93D]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <FileCheck className="h-5 w-5" />
                Power of Attorney & Authorization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 p-4 bg-[#0D3B66]/5 rounded-lg">
                <h3 className="font-semibold text-[#0D3B66]">Credit Repair Authorization</h3>
                <p className="text-sm text-[#0D3B66]/80 leading-relaxed">
                  I hereby authorize DCSA (Debt Counselling South Africa) to act on my behalf in all matters 
                  relating to my credit repair. This includes, but is not limited to, submitting disputes to 
                  credit bureaus, requesting credit reports, communicating with creditors, and representing me 
                  in credit-related matters.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="poaAgreement"
                    checked={formData.poaAgreement}
                    onCheckedChange={(checked) => handleInputChange("poaAgreement", checked)}
                  />
                  <Label htmlFor="poaAgreement" className="text-sm leading-relaxed cursor-pointer">
                    I grant DCSA power of attorney to act on my behalf for credit repair services *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consentToDisputeOnBehalf"
                    checked={formData.consentToDisputeOnBehalf}
                    onCheckedChange={(checked) => handleInputChange("consentToDisputeOnBehalf", checked)}
                  />
                  <Label htmlFor="consentToDisputeOnBehalf" className="text-sm leading-relaxed cursor-pointer">
                    I authorize DCSA to file disputes with credit bureaus on my behalf *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consentToContactBureaus"
                    checked={formData.consentToContactBureaus}
                    onCheckedChange={(checked) => handleInputChange("consentToContactBureaus", checked)}
                  />
                  <Label htmlFor="consentToContactBureaus" className="text-sm leading-relaxed cursor-pointer">
                    I consent to DCSA contacting credit bureaus and creditors on my behalf *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consentToProcessPersonalInfo"
                    checked={formData.consentToProcessPersonalInfo}
                    onCheckedChange={(checked) => handleInputChange("consentToProcessPersonalInfo", checked)}
                  />
                  <Label htmlFor="consentToProcessPersonalInfo" className="text-sm leading-relaxed cursor-pointer">
                    I consent to DCSA processing my personal and financial information *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="understandCreditRepairProcess"
                    checked={formData.understandCreditRepairProcess}
                    onCheckedChange={(checked) => handleInputChange("understandCreditRepairProcess", checked)}
                  />
                  <Label htmlFor="understandCreditRepairProcess" className="text-sm leading-relaxed cursor-pointer">
                    I understand that credit repair results vary and are not guaranteed *
                  </Label>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Credit repair is a process that requires time and patience. 
                  While we work diligently to remove inaccurate items, we cannot guarantee specific results 
                  or timeframes.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep} className="bg-transparent">
              Previous Step
            </Button>
          )}
          
          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              className="ml-auto bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0D3B66]"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0D3B66]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
