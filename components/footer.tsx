"use client"

import type React from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Facebook, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const ThreadsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01 1.5 8.434 2.35 5.58 3.995 3.529 5.845 1.225 8.598.044 12.179.02h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.58 22.5 8.434 22.5 12.01c0 3.576-.85 6.43-2.495 8.481C18.155 22.795 15.402 23.976 11.821 24h.365zm4.896-7.078c-.346-.997-1.036-1.759-2.054-2.268-.776-.388-1.617-.581-2.502-.576-1.301.007-2.534.339-3.675 1.019-.898.535-1.652 1.301-2.244 2.279-.592.978-.888 2.097-.888 3.334 0 1.237.296 2.356.888 3.334.592.978 1.346 1.744 2.244 2.279 1.141.68 2.374 1.012 3.675 1.019.885.005 1.726-.188 2.502-.576 1.018-.509 1.708-1.271 2.054-2.268.346-.997.519-2.097.519-3.3 0-1.203-.173-2.303-.519-3.3z" />
  </svg>
)

export function Footer() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address")
      setMessageType("error")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const subject = "Newsletter Subscription Request"
      const body = `New newsletter subscription request from: ${email}

Please add this email to the DCSA newsletter list for financial tips and debt management advice.

Email: ${email}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}`

      window.location.href = `mailto:sam@dcsam.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      setMessage("Thank you! We'll add you to our newsletter list.")
      setMessageType("success")
      setEmail("")
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/dcsa-logo.png"
                alt="DCSA Debt Counselling & Credit Repair"
                width={120}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-background/80 leading-relaxed max-w-md text-pretty">
              Professional debt counselling services helping South Africans achieve financial freedom. Take the first
              step towards a debt-free future today.
            </p>
            <div className="space-y-3">
              <a href="tel:+27719006298" className="flex items-center space-x-3 hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <span>071 900 6298</span>
              </a>
              <a href="mailto:info@dcsam.co.za" className="flex items-center space-x-3 hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@dcsam.co.za</span>
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=81+6th+Avenue+Newton+Park+Port+Elizabeth+South+Africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-primary transition-colors"
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span>81 6th Avenue Newton Park Port Elizabeth</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-background/80 hover:text-primary transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-background/80 hover:text-primary transition-colors">
                  Budget Calculator
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-background/80 hover:text-primary transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="/blog" className="text-background/80 hover:text-primary transition-colors">
                  Financial Education
                </a>
              </li>
              <li>
                <a href="/#booking" className="text-background/80 hover:text-primary transition-colors">
                  Book Consultation
                </a>
              </li>
              <li>
                <a href="/sitemap-html" className="text-background/80 hover:text-primary transition-colors">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#contact" className="text-background/80 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-background/80 text-sm">
              Get financial tips and debt management advice delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
              {message && (
                <div
                  className={`flex items-center space-x-2 text-sm ${
                    messageType === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {messageType === "success" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>{message}</span>
                </div>
              )}
            </form>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/DebtClearDCSA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@dcsa_debtclearsa?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-primary transition-colors"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://threads.net/@dcsadebtcounsellors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-primary transition-colors"
              >
                <ThreadsIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">© 2026 DCSA. All rights reserved. NCR Registration: NCRDC3995</p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-background/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-background/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/disclaimer" className="text-background/60 hover:text-primary transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
