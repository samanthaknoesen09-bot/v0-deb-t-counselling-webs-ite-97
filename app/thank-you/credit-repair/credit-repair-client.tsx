"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ThankYouCreditRepairClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D3B66]/10 to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 border-[#0D3B66]">
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-[#0D3B66] rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0D3B66]">
              Application Received!
            </h1>
            <p className="text-lg text-[#0D3B66]/80">
              Thank you for submitting your credit repair application. 
              We've received your information and will review it carefully.
            </p>
          </div>

          <div className="bg-[#4DB6AC]/20 rounded-lg p-6 space-y-3 text-left">
            <h2 className="font-bold text-[#0D3B66] text-lg">What Happens Next?</h2>
            <ul className="space-y-2 text-[#0D3B66]/80">
              <li className="flex items-start gap-2">
                <span className="text-[#0D3B66] font-bold">1.</span>
                <span>We'll review your credit history and disputes within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0D3B66] font-bold">2.</span>
                <span>Sam will contact you to discuss your credit report findings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0D3B66] font-bold">3.</span>
                <span>We'll create a personalized credit repair action plan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0D3B66] font-bold">4.</span>
                <span>Begin the dispute process with credit bureaus on your behalf</span>
              </li>
            </ul>
          </div>

          <div className="border-t pt-6 space-y-4">
            <p className="text-sm text-[#0D3B66]/70">
              <strong>Application Reference:</strong> You should receive a confirmation email at the address you provided.
              Please check your spam folder if you don't see it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild className="flex-1 bg-[#0D3B66] hover:bg-[#0D3B66]/90">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="tel:+27719006298">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </Link>
            </Button>
          </div>

          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => window.open('https://wa.me/27738303287?text=Hi, I just submitted my credit repair application', '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Us on WhatsApp
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
