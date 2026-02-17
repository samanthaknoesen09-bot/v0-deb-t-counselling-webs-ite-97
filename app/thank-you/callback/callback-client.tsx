"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Calculator, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ThankYouCallbackClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD93D]/10 to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 border-[#FFD93D]">
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-[#FFD93D] rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-[#0D3B66]" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0D3B66]">
              We'll Call You Soon!
            </h1>
            <p className="text-lg text-[#0D3B66]/80">
              Thank you for requesting a callback. 
              We've received your information and will reach out to you shortly.
            </p>
          </div>

          <div className="bg-[#4DB6AC]/20 rounded-lg p-6 space-y-3 text-left">
            <h2 className="font-bold text-[#0D3B66] text-lg">What to Expect:</h2>
            <ul className="space-y-2 text-[#0D3B66]/80">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD93D] font-bold">•</span>
                <span>We'll call you within 24 hours (usually much sooner)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD93D] font-bold">•</span>
                <span>The call will come from: <strong>071 900 6298</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD93D] font-bold">•</span>
                <span>We'll discuss your situation and answer all your questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD93D] font-bold">•</span>
                <span>No pressure, just honest advice about your options</span>
              </li>
            </ul>
          </div>

          <div className="border-t pt-6 space-y-4">
            <p className="text-sm text-[#0D3B66]/70">
              <strong>In the meantime:</strong> Explore our free calculators to understand your financial situation better
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild className="flex-1 bg-[#4DB6AC] hover:bg-[#4DB6AC]/90">
              <Link href="/calculator">
                <Calculator className="w-4 h-4 mr-2" />
                Try Our Calculators
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
          </div>

          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => window.open('https://wa.me/27738303287?text=Hi, I just requested a callback. Can we chat on WhatsApp instead?', '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Prefer WhatsApp? Message Us Now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
