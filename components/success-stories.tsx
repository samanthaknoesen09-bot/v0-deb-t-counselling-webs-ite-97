"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, Clock, CheckCircle } from "lucide-react"

interface Story {
  name: string
  totalDebt: number
  monthlyBefore: number
  monthlyAfter: number
  interestBefore: number
  interestAfter: number
  timeline: string
  outcome: string
  amountPaid: number
}

export function SuccessStories() {
  const stories: Story[] = [
    {
      name: "Thabo M.",
      totalDebt: 450000,
      monthlyBefore: 18500,
      monthlyAfter: 9200,
      interestBefore: 24,
      interestAfter: 15,
      timeline: "18 months",
      outcome: "Successfully reduced monthly payments by 50% and is on track to be debt-free",
      amountPaid: 165600,
    },
    {
      name: "Sarah K.",
      totalDebt: 280000,
      monthlyBefore: 12000,
      monthlyAfter: 6800,
      interestBefore: 22,
      interestAfter: 14,
      timeline: "14 months",
      outcome: "Avoided legal action and regained financial stability for her family",
      amountPaid: 95200,
    },
    {
      name: "Michael P.",
      totalDebt: 620000,
      monthlyBefore: 22000,
      monthlyAfter: 11500,
      interestBefore: 26,
      interestAfter: 16,
      timeline: "22 months",
      outcome: "Protected assets and reduced debt-to-income ratio from 85% to 42%",
      amountPaid: 253000,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-[#F8F9FA]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66] mb-4">
            Real People, Real Results
          </h2>
          <p className="text-lg text-[#0D3B66]/70 max-w-2xl mx-auto">
            See how South Africans just like you have regained control of their finances through debt counselling
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <Card key={index} className="border-2 border-[#4DB6AC]/20 hover:border-[#4DB6AC]/40 transition-all">
              <CardHeader>
                <CardTitle className="text-xl text-[#0D3B66] flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-[#4DB6AC]" />
                  {story.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#0D3B66]/5 rounded-lg p-3 mb-3">
                  <div className="text-xs text-muted-foreground mb-1">Total Debt Under Review</div>
                  <div className="text-xl font-bold text-[#0D3B66]">{formatCurrency(story.totalDebt)}</div>
                  <div className="text-xs text-[#4DB6AC] mt-1">
                    Paid down {formatCurrency(story.amountPaid)} in {story.timeline}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium text-[#0D3B66]">Monthly Payment</span>
                    <div className="text-right">
                      <div className="text-xs line-through text-red-600">{formatCurrency(story.monthlyBefore)}</div>
                      <div className="text-lg font-bold text-[#4DB6AC]">{formatCurrency(story.monthlyAfter)}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium text-[#0D3B66]">Interest Rate</span>
                    <div className="text-right">
                      <div className="text-xs line-through text-red-600">{story.interestBefore}%</div>
                      <div className="text-lg font-bold text-[#4DB6AC]">{story.interestAfter}%</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#0D3B66]/70 pt-2">
                  <Clock className="h-4 w-4" />
                  <span>{story.timeline} in debt review</span>
                </div>

                <p className="text-sm text-[#0D3B66]/80 italic">
                  "{story.outcome}"
                </p>

                <div className="flex items-center gap-2 bg-[#4DB6AC]/10 px-3 py-2 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-[#4DB6AC]" />
                  <span className="text-sm font-semibold text-[#4DB6AC]">
                    {Math.round(((story.monthlyBefore - story.monthlyAfter) / story.monthlyBefore) * 100)}% monthly payment reduction
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground italic">
            *Names changed for privacy. Results vary based on individual circumstances.
          </p>
          <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
            Debt counselling reduces your monthly payments through negotiated lower interest rates and extended payment terms. 
            The total debt amount remains the same but becomes more affordable to pay off over time with legal protection from creditors.
          </p>
        </div>
      </div>
    </section>
  )
}
