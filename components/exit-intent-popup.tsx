"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Calendar, Download } from "lucide-react"

interface ExitIntentPopupProps {
  onBookConsultation?: () => void
}

export function ExitIntentPopup({ onBookConsultation }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem("exitIntentShown")
    if (shown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of page and hasn't been shown
      if (e.clientY <= 0 && !hasShown && !shown) {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem("exitIntentShown", "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasShown])

  const handleBooking = () => {
    setIsOpen(false)
    onBookConsultation?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="text-5xl mb-2">👻</div>
          <DialogTitle className="text-2xl text-[#0D3B66]">Wait! Don't Ghost Us Like a Bad Tinder Date</DialogTitle>
          <DialogDescription className="text-base">
            Before you bounce, grab your FREE Debt Survival Guide. It's got everything you need to know (minus the boring bits).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-[#FFD93D]/20 p-4 rounded-lg border-l-4 border-[#FFD93D]">
            <p className="text-sm text-[#0D3B66] font-bold mb-2">Inside this guide:</p>
            <ul className="text-sm text-[#0D3B66]/80 space-y-1">
              <li>⚡ Stop creditor harassment (the legal way)</li>
              <li>⚡ The budgeting trick that actually works</li>
              <li>⚡ How debt review protects your stuff</li>
              <li>⚡ Credit repair secrets from the pros</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white"
              onClick={handleBooking}
            >
              <Download className="w-4 h-4 mr-2" />
              Send Me the Free Guide
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setIsOpen(false)}
            >
              Nah, I'll Figure It Out Myself
            </Button>
          </div>

          <p className="text-xs text-center text-[#0D3B66]/60">
            Join the South Africans who've chosen honest help over financial stress
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
