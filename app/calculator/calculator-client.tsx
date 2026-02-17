"use client"

import { BudgetCalculator } from "@/components/budget-calculator"
import { Button } from "@/components/ui/button"
import { Share2, Facebook } from "lucide-react"
import { QRCodeShare } from "@/components/qr-code-share"

export function ClientCalculatorPage() {
  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(
      "Check out this free budget calculator from DCSA - it helped me understand my finances better! 💰",
    )
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank")
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Free Budget Calculator</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Take control of your finances with DCSA's comprehensive budget calculator
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={shareToFacebook} className="bg-blue-600 hover:bg-blue-700">
            <Facebook className="w-4 h-4 mr-2" />
            Share on Facebook
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              navigator.share?.({
                title: "DCSA Budget Calculator",
                url: window.location.href,
              })
            }
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Calculator
          </Button>
        </div>
      </div>

      <BudgetCalculator />

      <div className="mt-12 max-w-md mx-auto">
        <QRCodeShare
          url="https://www.dcsam.co.za/calculator"
          title="Share This Calculator"
          description="Scan the QR code or share the link to help others take control of their finances"
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          Need help with your budget? Contact DCSA for professional debt counselling.
        </p>
        <Button
          onClick={() =>
            window.open(
              "https://wa.me/27719006298?text=Hi, I used your budget calculator and would like to discuss my financial situation.",
              "_blank",
            )
          }
          className="bg-green-600 hover:bg-green-700"
        >
          Get Professional Help
        </Button>
      </div>
    </>
  )
}
