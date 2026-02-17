"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, CreditCard, User, FileText, Upload } from "lucide-react"

export function CreditRepairApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    idNumber: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    physicalAddress: "",
    postalAddress: "",
    
    // Employment Information
    employmentStatus: "",
    employer: "",
    monthlyIncome: "",
    
    // Credit Information
    currentCreditScore: "",
    creditBureaus: [] as string[],
    disputeReasons: [] as string[],
    additionalInfo: "",
    
    // Consent
    consentCredit: false,
    consentTerms: false,
    consentPrivacy: false,
  })

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxArray = (field: "creditBureaus" | "disputeReasons", value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Validation
    if (!formData.consentCredit || !formData.consentTerms || !formData.consentPrivacy) {
      setError("Please accept all consent declarations to continue")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/submit-credit-repair", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      setIsSuccess(true)
    } catch (err) {
      setError("Failed to submit application. Please try again or contact us directly.")
      console.error("[v0] Credit repair submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-2 border-[#4DB6AC]">
        <CardContent className="p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-[#4DB6AC] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#0D3B66] mb-4">Application Submitted Successfully!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you for submitting your credit repair application. Sam will review your information and contact you
            within 1-2 business days.
          </p>
          <Button onClick={() => (window.location.href = "/")} className="bg-[#4DB6AC] hover:bg-[#4DB6AC]/90">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#4DB6AC]" />
            </div>
            <div>
              <CardTitle className="text-2xl text-[#0D3B66]">Credit Repair Application</CardTitle>
              <CardDescription>Complete this form to start improving your credit score</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#4DB6AC]" />
              <h3 className="text-xl font-semibold text-[#0D3B66]">Personal Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="e.g., 9001015800080"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="physicalAddress">Physical Address *</Label>
              <Textarea
                id="physicalAddress"
                value={formData.physicalAddress}
                onChange={(e) => handleInputChange("physicalAddress", e.target.value)}
                placeholder="Street address, city, province, postal code"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalAddress">Postal Address (if different)</Label>
              <Textarea
                id="postalAddress"
                value={formData.postalAddress}
                onChange={(e) => handleInputChange("postalAddress", e.target.value)}
                placeholder="Leave blank if same as physical address"
              />
            </div>
          </div>

          {/* Employment Information */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[#4DB6AC]" />
              <h3 className="text-xl font-semibold text-[#0D3B66]">Employment Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment Status *</Label>
                <Input
                  id="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
                  placeholder="e.g., Employed, Self-employed, Unemployed"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employer">Employer Name</Label>
                <Input
                  id="employer"
                  value={formData.employer}
                  onChange={(e) => handleInputChange("employer", e.target.value)}
                  placeholder="Company name or N/A"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                  placeholder="e.g., 15000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Credit Information */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-[#4DB6AC]" />
              <h3 className="text-xl font-semibold text-[#0D3B66]">Credit Information</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentCreditScore">Current Credit Score (if known)</Label>
              <Input
                id="currentCreditScore"
                value={formData.currentCreditScore}
                onChange={(e) => handleInputChange("currentCreditScore", e.target.value)}
                placeholder="e.g., 580 or Unknown"
              />
            </div>

            <div className="space-y-3">
              <Label>Which credit bureaus have you checked? *</Label>
              <div className="space-y-2">
                {["TransUnion", "Experian", "XDS", "Compuscan", "None yet"].map((bureau) => (
                  <div key={bureau} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bureau-${bureau}`}
                      checked={formData.creditBureaus.includes(bureau)}
                      onCheckedChange={(checked) => handleCheckboxArray("creditBureaus", bureau, checked as boolean)}
                    />
                    <Label htmlFor={`bureau-${bureau}`} className="font-normal cursor-pointer">
                      {bureau}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>What are you looking to address? *</Label>
              <div className="space-y-2">
                {[
                  "Improve credit score",
                  "Remove incorrect information",
                  "Dispute judgements",
                  "Address defaults",
                  "Clear old debt listings",
                  "General credit cleanup",
                ].map((reason) => (
                  <div key={reason} className="flex items-center space-x-2">
                    <Checkbox
                      id={`reason-${reason}`}
                      checked={formData.disputeReasons.includes(reason)}
                      onCheckedChange={(checked) => handleCheckboxArray("disputeReasons", reason, checked as boolean)}
                    />
                    <Label htmlFor={`reason-${reason}`} className="font-normal cursor-pointer">
                      {reason}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Tell us more about your credit situation and what you hope to achieve..."
                rows={4}
              />
            </div>
          </div>

          {/* Consent and Declarations */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-xl font-semibold text-[#0D3B66] mb-4">Consent & Declarations</h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[#4DB6AC]/5 rounded-lg">
                <Checkbox
                  id="consentCredit"
                  checked={formData.consentCredit}
                  onCheckedChange={(checked) => handleInputChange("consentCredit", checked as boolean)}
                  required
                />
                <Label htmlFor="consentCredit" className="font-normal cursor-pointer text-sm leading-relaxed">
                  I authorize DCSA to access my credit reports from all major credit bureaus in South Africa to assess
                  my credit repair needs and work on my behalf to dispute inaccurate information.
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-[#4DB6AC]/5 rounded-lg">
                <Checkbox
                  id="consentTerms"
                  checked={formData.consentTerms}
                  onCheckedChange={(checked) => handleInputChange("consentTerms", checked as boolean)}
                  required
                />
                <Label htmlFor="consentTerms" className="font-normal cursor-pointer text-sm leading-relaxed">
                  I understand that credit repair is a process that takes time and results may vary. DCSA will work
                  diligently on my behalf but cannot guarantee specific outcomes or timeframes.
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-[#4DB6AC]/5 rounded-lg">
                <Checkbox
                  id="consentPrivacy"
                  checked={formData.consentPrivacy}
                  onCheckedChange={(checked) => handleInputChange("consentPrivacy", checked as boolean)}
                  required
                />
                <Label htmlFor="consentPrivacy" className="font-normal cursor-pointer text-sm leading-relaxed">
                  I consent to DCSA storing and processing my personal information in accordance with POPIA regulations
                  for the purpose of providing credit repair services.
                </Label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-lg h-14"
            >
              {isSubmitting ? "Submitting Application..." : "Submit Credit Repair Application"}
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-4">
              By submitting this form, your information will be sent securely to Sam at DCSA.
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
