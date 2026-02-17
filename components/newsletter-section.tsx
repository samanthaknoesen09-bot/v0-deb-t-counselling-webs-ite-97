"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, CheckCircle2 } from "lucide-react"

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const emailSubject = "Newsletter Subscription - Free Financial Advice"
    const emailBody = `
New Newsletter Subscription:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

This person has subscribed to receive free financial advice and tips from DCSA.
    `.trim()

    window.location.href = `mailto:sam@dcsam.co.za?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    // Show success message
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
      setFormData({ name: "", email: "", phone: "" })
    }, 1000)
  }

  return (
    <section className="py-16 lg:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border shadow-xl">
            <CardContent className="p-8 lg:p-12">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
                      Subscribe for Free Financial Advice
                    </h2>
                    <p className="text-lg text-muted-foreground text-pretty">
                      Get helpful tips, budgeting advice, and debt management strategies delivered straight to your
                      inbox. Join our community and start your journey to financial freedom.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="newsletter-name">Full Name *</Label>
                        <Input
                          id="newsletter-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newsletter-phone">Phone Number *</Label>
                        <Input
                          id="newsletter-phone"
                          type="tel"
                          placeholder="071 234 5678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newsletter-email">Email Address *</Label>
                      <Input
                        id="newsletter-email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        By subscribing, you'll receive practical money tips, budget planning strategies, and debt
                        management advice. We respect your privacy and will never share your information.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe for Free Tips"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Questions? Contact us at{" "}
                    <a href="mailto:info@dcsam.co.za" className="text-primary hover:underline">
                      info@dcsam.co.za
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Welcome to Our Community!</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Thank you for subscribing. You'll start receiving helpful financial tips and advice from DCSA soon.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mx-auto">
                    Subscribe Another Person
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
