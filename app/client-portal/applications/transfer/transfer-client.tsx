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
  ArrowRight,
  Loader2,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  User,
  FileText,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

interface TransferClientProps {
  user: any
  client: any
}

export function TransferClient({ user, client }: TransferClientProps) {
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
    
    // Current Debt Counsellor Information
    currentDCName: "",
    currentDCRegistrationNumber: "",
    currentDCContactNumber: "",
    currentDCEmail: "",
    
    // Debt Review Information
    debtReviewStartDate: "",
    currentMonthlyPayment: "",
    numberOfCreditors: "",
    
    // Reason for Transfer
    reasonForTransfer: "",
    issuesWithCurrentDC: "",
    
    // Transfer Authorization
    authorizeContactCurrentDC: false,
    authorizeTransferOfRecords: false,
    understandTransferProcess: false,
    consentToProcessPersonalInfo: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
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
        return (
          formData.currentDCName &&
          formData.currentMonthlyPayment
        )
      case 3:
        return formData.reasonForTransfer
      case 4:
        return (
          formData.authorizeContactCurrentDC &&
          formData.authorizeTransferOfRecords &&
          formData.understandTransferProcess &&
          formData.consentToProcessPersonalInfo
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
      setError("Please accept all authorizations before submitting")
      return
    }

    setLoading(true)
    setError(null)

    console.log("[v0] Submitting transfer request", { userId: user.id })

    try {
      const response = await fetch("/api/client-portal/submit-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      console.log("[v0] Transfer request submitted successfully")
      setSuccess(true)
      
      setTimeout(() => {
        router.push("/client-portal/dashboard")
      }, 3000)
    } catch (err: any) {
      console.error("[v0] Submission error:", err)
      setError(err.message || "Failed to submit request")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-2 border-[#FF6B6B]/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-[#FF6B6B]" />
            </div>
            <CardTitle className="text-2xl text-[#0D3B66]">Transfer Request Submitted!</CardTitle>
            <CardDescription>
              Your request has been received
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-[#0D3B66]/70">
              We've sent confirmation emails to you and our team. We'll contact your current debt counsellor 
              and begin the transfer process. You should hear from us within 24-48 hours.
            </p>
            <Button className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white" asChild>
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
            <h1 className="text-2xl font-bold text-[#0D3B66]">Transfer Request</h1>
            <Badge variant="outline" className="text-sm">
              Step {currentStep} of 4
            </Badge>
          </div>
          <p className="text-[#0D3B66]/70 mb-4">
            Transfer your debt review from another debt counsellor to DCSA
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  step <= currentStep ? "bg-[#FF6B6B]" : "bg-gray-200"
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
                Your Information
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

        {/* Step 2: Current Debt Counsellor */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <Briefcase className="h-5 w-5" />
                Current Debt Counsellor Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentDCName">Current Debt Counsellor Name *</Label>
                <Input
                  id="currentDCName"
                  value={formData.currentDCName}
                  onChange={(e) => handleInputChange("currentDCName", e.target.value)}
                  placeholder="Company or person name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentDCRegistrationNumber">NCR Registration Number</Label>
                  <Input
                    id="currentDCRegistrationNumber"
                    value={formData.currentDCRegistrationNumber}
                    onChange={(e) => handleInputChange("currentDCRegistrationNumber", e.target.value)}
                    placeholder="NCRDC####"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentDCContactNumber">Contact Number</Label>
                  <Input
                    id="currentDCContactNumber"
                    value={formData.currentDCContactNumber}
                    onChange={(e) => handleInputChange("currentDCContactNumber", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentDCEmail">Email Address</Label>
                <Input
                  id="currentDCEmail"
                  type="email"
                  value={formData.currentDCEmail}
                  onChange={(e) => handleInputChange("currentDCEmail", e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="debtReviewStartDate">When did your debt review start?</Label>
                  <Input
                    id="debtReviewStartDate"
                    type="date"
                    value={formData.debtReviewStartDate}
                    onChange={(e) => handleInputChange("debtReviewStartDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentMonthlyPayment">Current Monthly Payment *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                    <Input
                      id="currentMonthlyPayment"
                      type="number"
                      value={formData.currentMonthlyPayment}
                      onChange={(e) => handleInputChange("currentMonthlyPayment", e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfCreditors">Number of Creditors</Label>
                <Input
                  id="numberOfCreditors"
                  type="number"
                  value={formData.numberOfCreditors}
                  onChange={(e) => handleInputChange("numberOfCreditors", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Reason for Transfer */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <FileText className="h-5 w-5" />
                Why do you want to transfer?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reasonForTransfer">Main reason for transfer *</Label>
                <Textarea
                  id="reasonForTransfer"
                  value={formData.reasonForTransfer}
                  onChange={(e) => handleInputChange("reasonForTransfer", e.target.value)}
                  rows={4}
                  placeholder="Please tell us why you want to transfer to DCSA..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuesWithCurrentDC">Issues with current debt counsellor (optional)</Label>
                <Textarea
                  id="issuesWithCurrentDC"
                  value={formData.issuesWithCurrentDC}
                  onChange={(e) => handleInputChange("issuesWithCurrentDC", e.target.value)}
                  rows={4}
                  placeholder="Describe any problems you've experienced..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What to expect:</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>We'll contact your current debt counsellor to request transfer</li>
                  <li>Your debt review status will be maintained</li>
                  <li>There should be no interruption to your monthly payments</li>
                  <li>We'll update credit bureaus about the transfer</li>
                  <li>The transfer process typically takes 2-4 weeks</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Authorization */}
        {currentStep === 4 && (
          <Card className="border-2 border-[#FF6B6B]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <ArrowRight className="h-5 w-5" />
                Transfer Authorization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 p-4 bg-[#0D3B66]/5 rounded-lg">
                <h3 className="font-semibold text-[#0D3B66]">Authorization to Transfer</h3>
                <p className="text-sm text-[#0D3B66]/80 leading-relaxed">
                  I hereby authorize DCSA (Debt Counselling South Africa) to contact my current debt counsellor 
                  and initiate the transfer of my debt review file. I understand that DCSA will act as my new 
                  debt counsellor and will handle all future communication with my creditors and the credit bureaus.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="authorizeContactCurrentDC"
                    checked={formData.authorizeContactCurrentDC}
                    onCheckedChange={(checked) => handleInputChange("authorizeContactCurrentDC", checked)}
                  />
                  <Label htmlFor="authorizeContactCurrentDC" className="text-sm leading-relaxed cursor-pointer">
                    I authorize DCSA to contact my current debt counsellor to request my transfer *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="authorizeTransferOfRecords"
                    checked={formData.authorizeTransferOfRecords}
                    onCheckedChange={(checked) => handleInputChange("authorizeTransferOfRecords", checked)}
                  />
                  <Label htmlFor="authorizeTransferOfRecords" className="text-sm leading-relaxed cursor-pointer">
                    I authorize the transfer of all my debt review records to DCSA *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="understandTransferProcess"
                    checked={formData.understandTransferProcess}
                    onCheckedChange={(checked) => handleInputChange("understandTransferProcess", checked)}
                  />
                  <Label htmlFor="understandTransferProcess" className="text-sm leading-relaxed cursor-pointer">
                    I understand the transfer process and that it may take 2-4 weeks *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consentToProcessPersonalInfo"
                    checked={formData.consentToProcessPersonalInfo}
                    onCheckedChange={(checked) => handleInputChange("consentToProcessPersonalInfo", checked)}
                  />
                  <Label htmlFor="consentToProcessPersonalInfo" className="text-sm leading-relaxed cursor-pointer">
                    I consent to DCSA processing my personal information for the transfer *
                  </Label>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Please continue making your monthly payments to your current 
                  payment distribution agency until we notify you of the successful transfer.
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
              className="ml-auto bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Transfer Request"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
