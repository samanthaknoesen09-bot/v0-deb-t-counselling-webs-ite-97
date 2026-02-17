"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calculator, FileCheck, Scale, Shield, TrendingUp, ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Apply",
      description: "Submit Form 16",
      icon: FileText,
      color: "text-[#4DB6AC]",
      bgColor: "bg-[#4DB6AC]/10",
    },
    {
      number: 2,
      title: "Assessment",
      description: "We evaluate your finances",
      icon: Calculator,
      color: "text-[#FFD93D]",
      bgColor: "bg-[#FFD93D]/10",
    },
    {
      number: 3,
      title: "Payment Plan",
      description: "Affordable solution created",
      icon: FileCheck,
      color: "text-[#4DB6AC]",
      bgColor: "bg-[#4DB6AC]/10",
    },
    {
      number: 4,
      title: "Court Approval",
      description: "Legal restructuring",
      icon: Scale,
      color: "text-[#FFD93D]",
      bgColor: "bg-[#FFD93D]/10",
    },
    {
      number: 5,
      title: "Protection",
      description: "Legal coverage active",
      icon: Shield,
      color: "text-[#4DB6AC]",
      bgColor: "bg-[#4DB6AC]/10",
    },
    {
      number: 6,
      title: "Freedom",
      description: "Debt-free journey starts",
      icon: TrendingUp,
      color: "text-[#FF6B6B]",
      bgColor: "bg-[#FF6B6B]/10",
    },
  ]

  return (
    <section id="how-it-works" className="py-12 px-4 bg-gradient-to-b from-background to-[#F8F9FA]">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-[#4DB6AC] text-white text-sm px-4 py-1.5">Simple Process</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66] mb-3">
            How Debt Review Works
          </h2>
          <p className="text-lg text-[#0D3B66]/70 max-w-2xl mx-auto">
            Six simple steps to financial freedom
          </p>
        </div>

        {/* Horizontal Flow Chart */}
        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:flex items-center justify-between gap-2 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isLast = index === steps.length - 1
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mb-2 shadow-sm border-2 border-white`}>
                      <Icon className={`h-7 w-7 ${step.color}`} />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-[#0D3B66]/40 mb-1">
                        STEP {step.number}
                      </div>
                      <h3 className="text-sm font-bold text-[#0D3B66] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#0D3B66]/60 leading-snug">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {!isLast && (
                    <ArrowRight className="w-5 h-5 text-[#4DB6AC]/40 flex-shrink-0 -mx-2" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile/Tablet Flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden gap-4 mb-6">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <Card 
                  key={step.number} 
                  className="border border-[#0D3B66]/10 shadow-sm"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center mb-2`}>
                        <Icon className={`h-5 w-5 ${step.color}`} />
                      </div>
                      <div className="text-xs font-bold text-[#0D3B66]/40 mb-1">
                        STEP {step.number}
                      </div>
                      <h3 className="text-sm font-bold text-[#0D3B66] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#0D3B66]/60">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Compact CTA */}
        <div className="text-center bg-gradient-to-r from-[#4DB6AC]/10 to-[#FFD93D]/10 rounded-xl p-6">
          <p className="text-sm text-[#0D3B66]/70 mb-4">
            Immediate relief • Instant protection once you start • No waiting period
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/client-portal/auth/sign-up" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Start Application
            </a>
            <a 
              href="/faq" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white hover:bg-[#F8F9FA] text-[#0D3B66] font-semibold rounded-lg border border-[#0D3B66]/20 transition-colors text-sm"
            >
              Have Questions?
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
