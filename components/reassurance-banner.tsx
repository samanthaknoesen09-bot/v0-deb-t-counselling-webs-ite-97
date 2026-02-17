"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const reassuranceMessages = [
  "You're not alone — support is available.",
  "Clarity is the first step forward.",
  "Small steps can make a big difference.",
  "Understanding your money is empowering.",
  "There's no judgment here — only support.",
]

export function ReassuranceBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    // Check if banner was dismissed in the last 24 hours
    const dismissedAt = localStorage.getItem("reassuranceBannerDismissed")
    if (dismissedAt) {
      const dismissedTime = Number.parseInt(dismissedAt, 10)
      const now = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000

      if (now - dismissedTime < twentyFourHours) {
        setIsVisible(false)
        return
      }
    }

    // Rotate messages every 5 seconds
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % reassuranceMessages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("reassuranceBannerDismissed", Date.now().toString())
  }

  if (!isVisible) return null

  return (
    <div className="bg-[#FFE5D9] border-y border-[#4DB6AC]/20 py-4 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <p className="text-[#0D3B66] font-medium text-base md:text-lg animate-in fade-in duration-500">
              {reassuranceMessages[currentMessageIndex]}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="flex-shrink-0 h-8 w-8 hover:bg-[#4DB6AC]/10 text-[#0D3B66]"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
