"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Facebook, CheckCircle, AlertCircle, Linkedin, Instagram } from "lucide-react"
import { useState } from "react"
import PhoneContact from "@/components/phone-contact"

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
            <div className="bg-primary/10 border-l-4 border-primary/50 rounded-r-lg p-4 max-w-md">
              <p className="text-background/90 text-sm italic leading-relaxed">
                "Remember, your journey to financial freedom starts with understanding your money. You're not alone — we're here to guide you every step of the way."
              </p>
            </div>
            <div className="space-y-3">
              <PhoneContact /> {/* Declared PhoneContact component */}
              <a href="mailto:info@dcsam.co.za" className="flex items-center space-x-3 hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@dcsam.co.za</span>
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=81+6th+Avenue,+Newton+Park,+Gqeberha,+South+Africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-[#4DB6AC] transition-colors group cursor-pointer"
                title="Open in Google Maps"
              >
                <MapPin className="w-5 h-5 text-[#4DB6AC] mt-1 flex-shrink-0" />
                <span className="leading-relaxed group-hover:underline">
                  81 6th Avenue, Newton Park, Gqeberha
                </span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/get-started" className="text-background/80 hover:text-primary transition-colors">
                  Get Started
                </a>
              </li>
              <li>
                <a href="/interest-calculator" className="text-background/80 hover:text-primary transition-colors">
                  Interest Calculator
                </a>
              </li>
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
                <a href="/faq" className="text-background/80 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#booking" className="text-background/80 hover:text-primary transition-colors">
                  Book Consultation
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-background/80 hover:text-primary transition-colors">
                  Pricing & Fees
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-background/80 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-background/80 hover:text-primary transition-colors">
                  Terms & Conditions
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
                href="https://www.facebook.com/DCSamDebt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/dcsam-dcsa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-primary transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@dcsam_debt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-primary transition-colors"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://www.instagram.com/debthelp_with_dcsam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 space-y-8">
          {/* Google Maps Embed */}
          <div className="w-full">
            <h4 className="text-lg font-semibold mb-4 text-background">Find Us</h4>
            <div className="rounded-lg overflow-hidden border-2 border-background/20 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.7879845932744!2d25.595891!3d-33.966111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e7ad6a966656a61%3A0x4367e69da17840c!2s81%206th%20Ave%2C%20Newton%20Park%2C%20Gqeberha%2C%206045%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DCSA Office Location - 81 6th Avenue, Newton Park, Gqeberha"
              />
            </div>
            <p className="text-background/70 text-sm mt-3 text-center">
              Click on the map to get directions or{" "}
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=81+6th+Avenue,+Newton+Park,+Gqeberha,+South+Africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                open in Google Maps
              </a>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm text-background/70">
            <div>
              <h4 className="font-semibold text-background mb-2">NCR Registration</h4>
              <p>DCSA is a registered debt counsellor with the National Credit Regulator (NCR).</p>
              <p className="font-medium mt-1">Registration Number: NCRDC3995</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                <span className="text-primary">DC</span><span className="text-black">SA</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your trusted partner for debt counselling and financial freedom
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-4">
            <p className="text-background/60 text-sm">© 2026 DCSA - Debt Clear South Africa. All rights reserved.</p>
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
