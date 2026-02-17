"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar, Phone, FileCheck, ArrowLeft } from "lucide-react"
import { RequestCallbackForm } from "@/components/request-callback-form"
import { Form16Application } from "@/components/form-16-application"
import { CreditRepairApplication } from "@/components/credit-repair-application"
import { BookingCalendar } from "@/components/booking-calendar"

type ContactOption = "none" | "whatsapp" | "booking" | "callback" | "form16" | "creditrepair"

export function ContactOptionsHub() {
  const [selectedOption, setSelectedOption] = useState<ContactOption>("none")

  const contactOptions = [
    {
      id: "whatsapp" as ContactOption,
      icon: MessageCircle,
      title: "WhatsApp Us",
      description: "Quick chat with instant responses",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      action: () => {
        const whatsappNumber = "27661937596"
        const message = encodeURIComponent("Hi, I need help with debt counselling")
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
      },
    },
    {
      id: "booking" as ContactOption,
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule a consultation at your convenience",
      color: "bg-[#4DB6AC]",
      hoverColor: "hover:bg-[#4DB6AC]/90",
      action: () => setSelectedOption("booking"),
    },
    {
      id: "callback" as ContactOption,
      icon: Phone,
      title: "Request Call Back",
      description: "We'll call you at your preferred time",
      color: "bg-[#FF6B6B]",
      hoverColor: "hover:bg-[#FF6B6B]/90",
      action: () => setSelectedOption("callback"),
    },
    {
      id: "form16" as ContactOption,
      icon: FileCheck,
      title: "Debt Review Application",
      description: "Start your debt counselling process (Form 16)",
      color: "bg-[#FFD93D]",
      hoverColor: "hover:bg-[#FFD93D]/90",
      action: () => setSelectedOption("form16"),
    },
    {
      id: "creditrepair" as ContactOption,
      icon: FileCheck,
      title: "Credit Repair Application",
      description: "Apply for credit repair services",
      color: "bg-[#0D3B66]",
      hoverColor: "hover:bg-[#0D3B66]/90",
      action: () => setSelectedOption("creditrepair"),
    },
  ]

  return (
    <div className="space-y-8">
      {selectedOption === "none" && (
        <div>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0D3B66] mb-4">
              Let's Take This Journey Together
            </h1>
            <p className="text-xl text-[#0D3B66]/70 mb-3 leading-relaxed">
              You've taken the first step by being here. Now, choose how you'd like to connect with us.
            </p>
            <p className="text-base text-[#0D3B66]/60 italic">
              No pressure, no judgment — just honest support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {contactOptions.map((option) => {
              const Icon = option.icon
              return (
                <Card
                  key={option.id}
                  className="border-2 border-[#0D3B66]/10 hover:border-[#4DB6AC] transition-all cursor-pointer group hover:shadow-lg"
                  onClick={option.action}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`mx-auto w-16 h-16 rounded-full ${option.color} ${option.hoverColor} flex items-center justify-center transition-colors`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0D3B66] mb-2">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <Button
                      className={`w-full ${option.color} ${option.hoverColor} text-white`}
                      onClick={option.action}
                    >
                      {option.id === "whatsapp" ? "Chat Now" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {selectedOption === "booking" && (
        <div>
          <Button
            variant="outline"
            onClick={() => setSelectedOption("none")}
            className="mb-6 bg-transparent"
          >
            ← Back to Options
          </Button>
          <BookingCalendar />
        </div>
      )}

      {selectedOption === "callback" && (
        <div>
          <Button
            variant="outline"
            onClick={() => setSelectedOption("none")}
            className="mb-6 bg-transparent"
          >
            ← Back to Options
          </Button>
          <RequestCallbackForm />
        </div>
      )}

      {selectedOption === "form16" && (
        <div>
          <Button
            variant="outline"
            onClick={() => setSelectedOption("none")}
            className="mb-6 bg-transparent"
          >
            ← Back to Options
          </Button>
          <Form16Application />
        </div>
      )}

      {selectedOption === "creditrepair" && (
        <div>
          <Button
            variant="outline"
            onClick={() => setSelectedOption("none")}
            className="mb-6 bg-transparent"
          >
            ← Back to Options
          </Button>
          <CreditRepairApplication />
        </div>
      )}
    </div>
  )
}
