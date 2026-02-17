"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrendingUp, AlertTriangle, Info } from "lucide-react"
import { InterestRateComparison } from "@/components/interest-rate-comparison"
import { ShareResults } from "@/components/share-results"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const DEBT_TYPES = [
  { value: "personal", label: "Personal Loan", typicalRate: "18-24%" },
  { value: "home", label: "Home Loan", typicalRate: "11-14%" },
  { value: "vehicle", label: "Vehicle Finance", typicalRate: "12-18%" },
  { value: "credit-card", label: "Credit Card", typicalRate: "18-24%" },
  { value: "store-card", label: "Store Card", typicalRate: "20-28%" },
  { value: "payday", label: "Payday Loan", typicalRate: "30-60%" },
]

export function InterestCalculator() {
  const [debtType, setDebtType] = useState("")
  const [principal, setPrincipal] = useState<number>(0)
  const [interestRate, setInterestRate] = useState<number>(0)
  const [term, setTerm] = useState<number>(12)

  // Calculate monthly payment using amortization formula
  const calculateMonthlyPayment = () => {
    if (principal <= 0 || interestRate <= 0 || term <= 0) return 0
    
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = term
    
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalRepayment = monthlyPayment * term
  const totalInterest = totalRepayment - principal

  // Calculate comparison with lower interest rate
  const lowerRate = Math.max(interestRate - 5, 5)
  const lowerMonthlyRate = lowerRate / 100 / 12
  const lowerMonthlyPayment =
    principal > 0 && lowerRate > 0
      ? (principal * lowerMonthlyRate * Math.pow(1 + lowerMonthlyRate, term)) /
        (Math.pow(1 + lowerMonthlyRate, term) - 1)
      : 0
  const savingsWithLowerRate = (monthlyPayment - lowerMonthlyPayment) * term

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#0D3B66]/10">
        <CardHeader>
          <CardTitle className="text-2xl text-[#0D3B66]">Interest Rate Impact Calculator</CardTitle>
          <p className="text-sm text-muted-foreground">
            See how interest rates affect your total debt repayment
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Debt Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="debt-type" className="text-base font-semibold text-[#0D3B66]">
              Type of Debt
            </Label>
            <Select value={debtType} onValueChange={setDebtType}>
              <SelectTrigger id="debt-type" className="h-12">
                <SelectValue placeholder="Select debt type" />
              </SelectTrigger>
              <SelectContent>
                {DEBT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col items-start">
                      <span>{type.label}</span>
                      <span className="text-xs text-muted-foreground">Typical: {type.typicalRate}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Borrowed */}
          <div className="space-y-2">
            <Label htmlFor="principal" className="text-base font-semibold text-[#0D3B66]">
              Amount Borrowed
            </Label>
            <Input
              id="principal"
              type="number"
              placeholder="e.g., 50000"
              value={principal || ""}
              onChange={(e) => setPrincipal(Number.parseFloat(e.target.value) || 0)}
              className="text-lg h-12"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <Label htmlFor="interest" className="text-base font-semibold text-[#0D3B66]">
              Annual Interest Rate (%)
            </Label>
            <Input
              id="interest"
              type="number"
              step="0.1"
              placeholder="e.g., 18.5"
              value={interestRate || ""}
              onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
              className="text-lg h-12"
            />
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <Label htmlFor="term" className="text-base font-semibold text-[#0D3B66]">
              Loan Term (Months)
            </Label>
            <Input
              id="term"
              type="number"
              placeholder="e.g., 24"
              value={term || ""}
              onChange={(e) => setTerm(Number.parseFloat(e.target.value) || 0)}
              className="text-lg h-12"
            />
            <div className="flex gap-2 text-xs">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTerm(12)}
                className="bg-transparent"
              >
                1 year
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTerm(24)}
                className="bg-transparent"
              >
                2 years
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTerm(36)}
                className="bg-transparent"
              >
                3 years
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTerm(60)}
                className="bg-transparent"
              >
                5 years
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {principal > 0 && interestRate > 0 && term > 0 && (
        <>
          <Card className="border-2 border-[#0D3B66]/20">
            <CardHeader>
              <CardTitle className="text-xl text-[#0D3B66]">Your Repayment Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Amount Borrowed</p>
                  <p className="text-2xl font-bold text-[#0D3B66]">{formatCurrency(principal)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="text-2xl font-bold text-[#0D3B66]">{interestRate.toFixed(2)}%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-2xl font-bold text-[#FF6B6B]">{formatCurrency(monthlyPayment)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Loan Term</p>
                  <p className="text-2xl font-bold text-[#0D3B66]">{term} months</p>
                </div>
              </div>

              {/* Total Costs */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-[#0D3B66]">Total Interest Paid</span>
                  <span className="text-xl font-bold text-[#FF6B6B]">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-[#0D3B66]">Total Amount Repaid</span>
                  <span className="text-xl font-bold text-[#0D3B66]">{formatCurrency(totalRepayment)}</span>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#0D3B66]">Repayment Breakdown</p>
                <div className="flex h-8 rounded-lg overflow-hidden">
                  <div
                    className="bg-[#4DB6AC] flex items-center justify-center text-xs text-white"
                    style={{ width: `${(principal / totalRepayment) * 100}%` }}
                  >
                    {((principal / totalRepayment) * 100).toFixed(0)}%
                  </div>
                  <div
                    className="bg-[#FF6B6B] flex items-center justify-center text-xs text-white"
                    style={{ width: `${(totalInterest / totalRepayment) * 100}%` }}
                  >
                    {((totalInterest / totalRepayment) * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>🟢 Principal ({formatCurrency(principal)})</span>
                  <span>🔴 Interest ({formatCurrency(totalInterest)})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Comparison Card */}
          {interestRate > 10 && (
            <InterestRateComparison
              loanAmount={principal}
              currentRate={interestRate}
              term={term}
              currentMonthly={monthlyPayment}
              currentTotal={totalRepayment}
      />
      )}

      {/* Share Calculator */}
      <ShareResults
        title="Free Interest Rate Calculator"
        description="Calculate your loan interest, monthly payments, and total cost for any debt type with DCSA's free calculator"
        calculatorType="interest"
      />
      
      {/* Educational Note */}
      <Card className="border border-[#0D3B66]/10">
            <CardHeader>
              <CardTitle className="text-base text-[#0D3B66] flex items-center gap-2">
                <Info className="h-5 w-5 text-[#4DB6AC]" />
                Understanding Your Interest
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#0D3B66]/80">
              <p>
                <strong>Interest</strong> is the cost of borrowing money. The higher the interest rate and the longer the loan term, the more you'll pay in total.
              </p>
              <p>
                <strong>Why it matters:</strong> A {interestRate.toFixed(1)}% interest rate means you're paying {formatCurrency(totalInterest)} extra on top of the {formatCurrency(principal)} you borrowed - that's {((totalInterest / principal) * 100).toFixed(0)}% more than you borrowed!
              </p>
              <p className="font-semibold text-[#0D3B66]">
                Through debt counselling, we can help negotiate lower interest rates and restructure your debt to reduce these costs significantly.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
