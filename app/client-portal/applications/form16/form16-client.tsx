"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Loader2,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  User,
  Home,
  Briefcase,
  CreditCard,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

interface Form16ClientProps {
  user: any
  client: any
}

export function Form16Client({ user, client }: Form16ClientProps) {
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
    maritalStatus: "",
    
    // Address Information
    streetAddress: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
    
    // Employment Information
    employmentStatus: "",
    employer: "",
    monthlyIncome: "",
    otherIncome: "",
    
    // Debt Information
    homeLoans: "",
    vehicleLoans: "",
    personalLoans: "",
    creditCards: "",
    storeCreditAccounts: "",
    otherDebts: "",
    totalMonthlyDebtPayment: "",
    
    // Monthly Expenses
    rentOrBond: "",
    utilities: "",
    groceries: "",
    transport: "",
    insurance: "",
    medical: "",
    education: "",
    otherExpenses: "",
    
    // Additional Information
    reasonForDebtReview: "",
    currentFinancialDifficulties: "",
    
    // Power of Attorney Agreement
    poaAgreement: false,
    consentToContactCreditors: false,
    consentToProcessPersonalInfo: false,
    understandDebtReviewProcess: false,
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
          formData.phone &&
          formData.maritalStatus
        )
      case 2:
        return (
          formData.streetAddress &&
          formData.city &&
          formData.province &&
          formData.postalCode
        )
      case 3:
        return formData.employmentStatus && formData.monthlyIncome
      case 4:
        return formData.totalMonthlyDebtPayment
      case 5:
        return true
      case 6:
        return (
          formData.poaAgreement &&
          formData.consentToContactCreditors &&
          formData.consentToProcessPersonalInfo &&
          formData.understandDebtReviewProcess
        )
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setError("Please complete all required fields before continuing")
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async () => {
    if (!validateStep(6)) {
      setError("Please accept all agreements before submitting")
      return
    }

    setLoading(true)
    setError(null)

    console.log("[v0] Submitting Form 16 application", { userId: user.id })

    try {
      const response = await fetch("/api/client-portal/submit-form16", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      console.log("[v0] Form 16 submitted successfully")
      setSuccess(true)
      
      // Redirect to dashboard after 3 seconds
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
        <Card className="max-w-md w-full border-2 border-[#4DB6AC]/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#4DB6AC]/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-[#4DB6AC]" />
            </div>
            <CardTitle className="text-2xl text-[#0D3B66]">Application Submitted!</CardTitle>
            <CardDescription>
              Your Form 16 debt review application has been received
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-[#0D3B66]/70">
              We've sent confirmation emails to you and our team. A debt counsellor will review your application and contact you within 24-48 hours.
            </p>
            <Button className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white" asChild>
              <Link href="/client-portal/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20">
      {/* Header */}
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
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[#0D3B66]">Form 16 - Debt Review Application</h1>
            <Badge variant="outline" className="text-sm">
              Step {currentStep} of 6
            </Badge>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  step <= currentStep ? "bg-[#4DB6AC]" : "bg-gray-200"
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
              <CardDescription>Please provide your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="9001015009087"
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
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="0712345678"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status *</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married_in_community">Married in Community of Property</SelectItem>
                    <SelectItem value="married_out_community">Married out of Community of Property</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Address */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <Home className="h-5 w-5" />
                Residential Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address *</Label>
                <Input
                  id="streetAddress"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="suburb">Suburb</Label>
                  <Input
                    id="suburb"
                    value={formData.suburb}
                    onChange={(e) => handleInputChange("suburb", e.target.value)}
                    placeholder="Suburb name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Johannesburg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="province">Province *</Label>
                  <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eastern_cape">Eastern Cape</SelectItem>
                      <SelectItem value="free_state">Free State</SelectItem>
                      <SelectItem value="gauteng">Gauteng</SelectItem>
                      <SelectItem value="kwazulu_natal">KwaZulu-Natal</SelectItem>
                      <SelectItem value="limpopo">Limpopo</SelectItem>
                      <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                      <SelectItem value="northern_cape">Northern Cape</SelectItem>
                      <SelectItem value="north_west">North West</SelectItem>
                      <SelectItem value="western_cape">Western Cape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="2000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Employment & Income */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <Briefcase className="h-5 w-5" />
                Employment & Income
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment Status *</Label>
                <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange("employmentStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed_full_time">Employed Full-Time</SelectItem>
                    <SelectItem value="employed_part_time">Employed Part-Time</SelectItem>
                    <SelectItem value="self_employed">Self-Employed</SelectItem>
                    <SelectItem value="pensioner">Pensioner</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.employmentStatus === "employed_full_time" || 
                formData.employmentStatus === "employed_part_time") && (
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer Name</Label>
                  <Input
                    id="employer"
                    value={formData.employer}
                    onChange={(e) => handleInputChange("employer", e.target.value)}
                    placeholder="Company name"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income (Net) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    placeholder="15000"
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherIncome">Other Monthly Income (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                  <Input
                    id="otherIncome"
                    type="number"
                    value={formData.otherIncome}
                    onChange={(e) => handleInputChange("otherIncome", e.target.value)}
                    placeholder="0"
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Include rental income, child support, etc.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Debt Information */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <CreditCard className="h-5 w-5" />
                Current Debt Information
              </CardTitle>
              <CardDescription>
                List all your current monthly debt payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeLoans">Home Loans</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                    <Input
                      id="homeLoans"
                      type="number"
                      value={formData.homeLoans}
                      onChange={(e) => handleInputChange("homeLoans", e.target.value)}
                      placeholder="0"
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleLoans">Vehicle Finance</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                    <Input
                      id="vehicleLoans"
                      type="number"
                      value={formData.vehicleLoans}
                      onChange={(e) => handleInputChange("vehicleLoans", e.target.value)}
                      placeholder="0"
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personalLoans">Personal Loans</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                    <Input
                      id="personalLoans"
                      type="number"
                      value={formData.personalLoans}
                      onChange={(e) => handleInputChange("personalLoans", e.target.value)}
                      placeholder="0"
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditCards">Credit Cards</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                    <Input
                      id="creditCards"
                      type="number"
                      value={formData.creditCards}
                      onChange={(e) => handleInputChange("creditCards", e.target.value)}
                      placeholder="0"
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeCreditAccounts">Store Credit Accounts</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                    <Input
                      id="storeCreditAccounts"
                      type="number"
                      value={formData.storeCreditAccounts}
                      onChange={(e) => handleInputChange("storeCreditAccounts", e.target.value)}
                      placeholder="0"
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherDebts">Other Debts</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                    <Input
                      id="otherDebts"
                      type="number"
                      value={formData.otherDebts}
                      onChange={(e) => handleInputChange("otherDebts", e.target.value)}
                      placeholder="0"
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 bg-[#4DB6AC]/10 p-4 rounded-lg border border-[#4DB6AC]/20">
                <Label htmlFor="totalMonthlyDebtPayment">Total Monthly Debt Payments *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                  <Input
                    id="totalMonthlyDebtPayment"
                    type="number"
                    value={formData.totalMonthlyDebtPayment}
                    onChange={(e) => handleInputChange("totalMonthlyDebtPayment", e.target.value)}
                    placeholder="0"
                    className="pl-7 font-bold"
                  />
                </div>
                <p className="text-xs text-[#0D3B66]/70">
                  Sum of all monthly debt payments listed above
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Monthly Expenses & Additional Info */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <DollarSign className="h-5 w-5" />
                Monthly Expenses & Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#0D3B66] mb-3">Monthly Living Expenses</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rentOrBond">Rent/Bond</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                      <Input
                        id="rentOrBond"
                        type="number"
                        value={formData.rentOrBond}
                        onChange={(e) => handleInputChange("rentOrBond", e.target.value)}
                        placeholder="0"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="utilities">Utilities (Water, Electricity, etc.)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                      <Input
                        id="utilities"
                        type="number"
                        value={formData.utilities}
                        onChange={(e) => handleInputChange("utilities", e.target.value)}
                        placeholder="0"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groceries">Groceries</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                      <Input
                        id="groceries"
                        type="number"
                        value={formData.groceries}
                        onChange={(e) => handleInputChange("groceries", e.target.value)}
                        placeholder="0"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transport">Transport</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                      <Input
                        id="transport"
                        type="number"
                        value={formData.transport}
                        onChange={(e) => handleInputChange("transport", e.target.value)}
                        placeholder="0"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance">Insurance</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                      <Input
                        id="insurance"
                        type="number"
                        value={formData.insurance}
                        onChange={(e) => handleInputChange("insurance", e.target.value)}
                        placeholder="0"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medical">Medical</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                      <Input
                        id="medical"
                        type="number"
                        value={formData.medical}
                        onChange={(e) => handleInputChange("medical", e.target.value)}
                        placeholder="0"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                      <Input
                        id="education"
                        type="number"
                        value={formData.education}
                        onChange={(e) => handleInputChange("education", e.target.value)}
                        placeholder="0"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherExpenses">Other Expenses</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R</span>
                      <Input
                        id="otherExpenses"
                        type="number"
                        value={formData.otherExpenses}
                        onChange={(e) => handleInputChange("otherExpenses", e.target.value)}
                        placeholder="0"
                        className="pl-7"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="reasonForDebtReview">
                    Why do you need debt review? (Optional)
                  </Label>
                  <Textarea
                    id="reasonForDebtReview"
                    value={formData.reasonForDebtReview}
                    onChange={(e) => handleInputChange("reasonForDebtReview", e.target.value)}
                    placeholder="Briefly describe your situation..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentFinancialDifficulties">
                    What financial difficulties are you experiencing? (Optional)
                  </Label>
                  <Textarea
                    id="currentFinancialDifficulties"
                    value={formData.currentFinancialDifficulties}
                    onChange={(e) => handleInputChange("currentFinancialDifficulties", e.target.value)}
                    placeholder="Share any challenges you're facing..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Power of Attorney & Consent */}
        {currentStep === 6 && (
          <Card className="border-2 border-[#4DB6AC]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D3B66]">
                <FileText className="h-5 w-5" />
                Power of Attorney & Consent
              </CardTitle>
              <CardDescription>
                Please read and accept the following agreements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 p-4 bg-[#0D3B66]/5 rounded-lg">
                <h3 className="font-semibold text-[#0D3B66]">Power of Attorney Agreement</h3>
                <p className="text-sm text-[#0D3B66]/80 leading-relaxed">
                  I hereby grant DCSA (Debt Counselling South Africa), NCR Registered Debt Counsellor NCRDC3995, 
                  the authority to act on my behalf in all matters relating to my debt review application. This includes, 
                  but is not limited to, contacting my credit providers, negotiating repayment terms, and representing 
                  me in court proceedings if necessary.
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
                    I grant DCSA power of attorney to act on my behalf in all debt review matters *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consentToContactCreditors"
                    checked={formData.consentToContactCreditors}
                    onCheckedChange={(checked) => handleInputChange("consentToContactCreditors", checked)}
                  />
                  <Label htmlFor="consentToContactCreditors" className="text-sm leading-relaxed cursor-pointer">
                    I consent to DCSA contacting my credit providers on my behalf *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consentToProcessPersonalInfo"
                    checked={formData.consentToProcessPersonalInfo}
                    onCheckedChange={(checked) => handleInputChange("consentToProcessPersonalInfo", checked)}
                  />
                  <Label htmlFor="consentToProcessPersonalInfo" className="text-sm leading-relaxed cursor-pointer">
                    I consent to DCSA processing my personal information in accordance with POPIA *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="understandDebtReviewProcess"
                    checked={formData.understandDebtReviewProcess}
                    onCheckedChange={(checked) => handleInputChange("understandDebtReviewProcess", checked)}
                  />
                  <Label htmlFor="understandDebtReviewProcess" className="text-sm leading-relaxed cursor-pointer">
                    I understand the debt review process and its implications on my credit profile *
                  </Label>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> By submitting this application, you acknowledge that debt review 
                  will be noted on your credit profile and you will not be able to incur additional credit 
                  during the debt review process.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="bg-transparent"
            >
              Previous Step
            </Button>
          )}
          
          {currentStep < 6 ? (
            <Button
              onClick={nextStep}
              className="ml-auto bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
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
