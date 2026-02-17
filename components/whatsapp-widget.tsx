"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Phone } from "lucide-react"

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappNumber = "27719006298" // 071 900 6298 in international format

  const quickMessages = [
    "Hi, I need help with debt counselling",
    "I want to know about debt review",
    "Can you help me with budget planning?",
    "I'd like to book a consultation",
    "What are your fees?",
  ]

  const sendWhatsAppMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
        </Button>
      </div>

      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-xl border-green-200">
            <CardHeader className="bg-green-500 text-white rounded-t-lg">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                DCSA Debt Counsellors
              </CardTitle>
              <CardDescription className="text-green-100">Chat with us on WhatsApp</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm text-muted-foreground mb-4">
                <p>Hi there! 👋</p>
                <p>How can we help you with your debt situation today?</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Quick messages:</p>
                {quickMessages.map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto py-2 px-3 text-xs bg-transparent"
                    onClick={() => sendWhatsAppMessage(message)}
                  >
                    {message}
                  </Button>
                ))}
              </div>

              <div className="pt-3 border-t">
                <Button
                  onClick={() => sendWhatsAppMessage("Hi, I need help with my debt situation")}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`tel:0719006298`, "_self")}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Or call us: 071 900 6298
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
