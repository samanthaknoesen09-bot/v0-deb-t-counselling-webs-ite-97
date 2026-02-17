"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown } from "lucide-react"

interface InterestRateComparisonProps {
  loanAmount: number
  currentRate: number
  term: number
  currentMonthly: number
  currentTotal: number
}

export function InterestRateComparison({
  loanAmount,
  currentRate,
  term,
  currentMonthly,
  currentTotal,
}: InterestRateComparisonProps) {
  const calculateSavings = (reducedRate: number) => {
    const monthlyRate = reducedRate / 100 / 12
    const numPayments = term * 12
    
    const newMonthly =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    
    const newTotal = newMonthly * numPayments
    const monthlySaving = currentMonthly - newMonthly
    const totalSaving = currentTotal - newTotal
    
    return { newMonthly, newTotal, monthlySaving, totalSaving, reducedRate }
  }

  const scenarios = [
    calculateSavings(currentRate - 2),
    calculateSavings(currentRate - 3),
    calculateSavings(currentRate - 5),
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="border-2 border-[#4DB6AC]/30 bg-[#4DB6AC]/5">
      <CardHeader>
        <CardTitle className="text-xl text-[#0D3B66] flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-[#4DB6AC]" />
          Potential Savings Through Debt Counselling
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          See how reducing your interest rate through debt counselling could save you money
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {scenarios.map((scenario, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-[#0D3B66]/10 space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#0D3B66]">
                If rate reduced to {scenario.reducedRate.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">
                (-{(currentRate - scenario.reducedRate).toFixed(1)}%)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Monthly Saving</p>
                <p className="font-semibold text-[#4DB6AC]">
                  {formatCurrency(scenario.monthlySaving)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Total Saving</p>
                <p className="font-semibold text-[#4DB6AC]">
                  {formatCurrency(scenario.totalSaving)}
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground pt-2 border-t border-[#0D3B66]/10">
              New monthly payment: {formatCurrency(scenario.newMonthly)}
            </div>
          </div>
        ))}
        
        <div className="bg-[#FFE5D9]/50 p-4 rounded-lg text-sm">
          <p className="font-medium text-[#0D3B66] mb-2">
            How Debt Counselling Helps:
          </p>
          <ul className="text-[#0D3B66]/80 space-y-1 text-xs">
            <li>✓ Negotiate lower interest rates with creditors</li>
            <li>✓ Restructure debt into one affordable payment</li>
            <li>✓ Legal protection from creditor harassment</li>
            <li>✓ Save thousands in interest over the loan term</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
