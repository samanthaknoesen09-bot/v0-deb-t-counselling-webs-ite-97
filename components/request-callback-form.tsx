"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Phone, CheckCircle2 } from "lucide-react"

export function RequestCallbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredTime: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!formData.name || !formData.phone || !formData.email) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/request-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "Website - Request Callback",
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: "",
          phone: "",
          email: "",
          preferredTime: "",
          reason: "",
        })
      } else {
        setError("Failed to submit request. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Callback request error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-2 border-[#4DB6AC]">
        <CardContent className="py-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-[#4DB6AC] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#0D3B66] mb-2">Request Received!</h3>
          <p className="text-muted-foreground">
            Thank you for your callback request. One of our debt counsellors will contact you within 24 hours.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-[#0D3B66]/10">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0D3B66] flex items-center gap-2">
          <Phone className="h-6 w-6 text-[#4DB6AC]" />
          Request a Call Back
        </CardTitle>
        <CardDescription>
          Leave your details and we'll call you at your preferred time
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="callback-name">Full Name *</Label>
            <Input
              id="callback-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="callback-phone">Contact Number *</Label>
            <Input
              id="callback-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g., 082 123 4567"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="callback-email">Email Address *</Label>
            <Input
              id="callback-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="callback-time">Preferred Call Time</Label>
            <Select
              value={formData.preferredTime}
              onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
            >
              <SelectTrigger id="callback-time">
                <SelectValue placeholder="Select preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                <SelectItem value="evening">Evening (4pm - 6pm)</SelectItem>
                <SelectItem value="anytime">Anytime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="callback-reason">What can we help you with? (Optional)</Label>
            <Textarea
              id="callback-reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Brief description of your situation or questions"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90"
          >
            {isSubmitting ? "Submitting..." : "Request Call Back"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
