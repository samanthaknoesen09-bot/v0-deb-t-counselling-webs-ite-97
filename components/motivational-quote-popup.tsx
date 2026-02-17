"use client"

import { useState, useEffect } from "react"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const quotes = [
  "Small steps every day make a big difference.",
  "Debt is a challenge, not a sentence. You're taking control.",
  "Progress, not perfection, is what matters.",
  "Financial freedom starts with understanding your money.",
  "Every journey begins with a single step — and you've already started.",
  "You're not alone. Support and guidance are available.",
  "Taking action today brings you closer to financial peace tomorrow.",
  "Remember: This is about relief, not judgment.",
  "Your future is brighter than you think — one day at a time.",
]

export function MotivationalQuotePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuote, setCurrentQuote] = useState("")
  const [hasShownToday, setHasShownToday] = useState(false)

  useEffect(() => {
    // Check if we've shown the quote today
    const lastShown = localStorage.getItem("quote_last_shown")
    const today = new Date().toDateString()
    
    if (lastShown === today) {
      setHasShownToday(true)
      return
    }

    // Get quote of the day based on date
    const dayIndex = new Date().getDate() % quotes.length
    setCurrentQuote(quotes[dayIndex])

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
      localStorage.setItem("quote_last_shown", today)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Auto-close after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [isVisible])

  if (!isVisible || hasShownToday) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-top duration-500">
      <div className="bg-[#FFE5D9] backdrop-blur-sm border-2 border-[#4DB6AC]/30 rounded-xl shadow-2xl p-6 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 hover:bg-[#4DB6AC]/10"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4 text-[#0D3B66]" />
        </Button>

        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-[#4DB6AC]" />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-bold text-[#0D3B66] mb-2">Daily Encouragement</h3>
            <p className="text-[#0D3B66]/80 text-sm leading-relaxed italic">
              "{currentQuote}"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
