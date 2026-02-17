"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, X } from "lucide-react"

export function POPIComplianceBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const accepted = localStorage.getItem("popiAccepted")
    if (!accepted) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("popiAccepted", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D3B66] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Shield className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4DB6AC]" />
            <div className="text-sm">
              <p className="font-medium mb-1">Your Privacy Matters</p>
              <p className="text-white/80 text-xs leading-relaxed">
                We comply with the Protection of Personal Information Act (POPIA). Your data is secure,
                encrypted, and never shared without your consent.{" "}
                <a href="/privacy-policy" className="underline hover:text-[#4DB6AC]">
                  Read our Privacy Policy
                </a>
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              className="bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 flex-1 sm:flex-none"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10 bg-transparent"
              onClick={handleAccept}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
