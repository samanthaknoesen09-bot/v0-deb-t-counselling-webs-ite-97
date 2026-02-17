"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, User, Send, CheckCircle2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export function GetInTouchForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError(null)
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name")
      return false
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.phone.trim() || !/^[0-9\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      setError("Please enter a valid phone number")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "Get in Touch Form",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      console.error("[v0] Form submission error:", err)
      setError("Something went wrong. Please try calling us directly at 071 900 6298")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-2 border-[#4DB6AC] bg-[#4DB6AC]/5">
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-[#4DB6AC]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0D3B66]">Thank You!</h3>
            <p className="text-[#0D3B66]/80 max-w-md mx-auto">
              We've received your message. One of our counsellors will contact you within 24 hours to discuss how we can help.
            </p>
            <p className="text-sm text-[#0D3B66]/60">
              Need immediate assistance? Call us at <strong>071 900 6298</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-[#0D3B66]/10">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-[#0D3B66]">
          Get in Touch
        </CardTitle>
        <p className="text-[#0D3B66]/70 mt-2">
          Leave your details and we'll contact you for a free, no-obligation consultation
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-semibold text-[#0D3B66] flex items-center gap-2">
              <User className="h-4 w-4" />
              Your Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., John Smith"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-12 text-base"
              aria-label="Your full name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-semibold text-[#0D3B66] flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g., john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 text-base"
              aria-label="Your email address"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-semibold text-[#0D3B66] flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Number *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g., 071 234 5678"
              value={formData.phone}
              onChange={handleChange}
              required
              className="h-12 text-base"
              aria-label="Your contact number"
            />
            <p className="text-xs text-muted-foreground">
              We'll use this to call or WhatsApp you
            </p>
          </div>

          {/* Message (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-base font-semibold text-[#0D3B66]">
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us briefly about your situation..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="text-base resize-none"
              aria-label="Optional message"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send My Details
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to our{" "}
            <a href="/privacy-policy" className="text-[#4DB6AC] hover:underline">
              Privacy Policy
            </a>
            . We respect your privacy and will never share your information.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
