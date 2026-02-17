"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"
import { CalculatorTooltip } from "@/components/calculator-tooltip"
import { ShareResults } from "@/components/share-results"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function QuickCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0)
  const [totalExpenses, setTotalExpenses] = useState<number>(0)
  const [totalDebt, setTotalDebt] = useState<number>(0)

  const leftOver = monthlyIncome - totalExpenses - totalDebt
  const debtToIncomeRatio = monthlyIncome > 0 ? (totalDebt / monthlyIncome) * 100 : 0
  const expenseRatio = monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0

  let healthStatus: "healthy" | "caution" | "warning" = "healthy"
  let healthMessage = ""
  let healthColor = "text-[#4DB6AC]"
  let healthIcon = CheckCircle2

  if (debtToIncomeRatio > 40 || leftOver < 0) {
    healthStatus = "warning"
    healthMessage = "You may be over-indebted. Consider seeking debt counselling assistance."
    healthColor = "text-[#FF6B6B]"
    healthIcon = AlertCircle
  } else if (debtToIncomeRatio > 30 || expenseRatio > 70) {
    healthStatus = "caution"
    healthMessage = "Your finances are stretched. Be cautious about taking on more debt."
    healthColor = "text-[#FFD93D]"
    healthIcon = TrendingUp
  } else {
    healthMessage = "Your finances appear manageable. Keep up the good work!"
  }

  const HealthIcon = healthIcon

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#0D3B66]/10">
        <CardHeader>
          <CardTitle className="text-2xl text-[#0D3B66]">Quick Financial Check</CardTitle>
          <p className="text-sm text-muted-foreground">
            Get an instant overview of your financial health
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Income */}
          <div className="space-y-2">
            <Label htmlFor="income" className="text-base font-semibold text-[#0D3B66] flex items-center gap-2">
              Monthly Income (Take-home)
              <CalculatorTooltip
                title="Monthly Take-Home Income"
                description="This is your net salary after tax and deductions - the actual amount deposited into your bank account each month."
                examples={[
                  "Gross R30,000 - Tax R5,000 = R25,000 take-home",
                  "Include bonuses if regular (e.g., 13th cheque ÷ 12)",
                  "Average for SA: R15,000 - R25,000",
                ]}
              />
            </Label>
            <Input
              id="income"
              type="number"
              placeholder="e.g., 25000"
              value={monthlyIncome || ""}
              onChange={(e) => setMonthlyIncome(Number.parseFloat(e.target.value) || 0)}
              className="text-lg h-12"
            />
          </div>

          {/* Total Monthly Expenses */}
          <div className="space-y-2">
            <Label htmlFor="expenses" className="text-base font-semibold text-[#0D3B66] flex items-center gap-2">
              Total Monthly Living Expenses
              <CalculatorTooltip
                title="Monthly Living Expenses"
                description="All regular costs needed to live - NOT including debt repayments (add those separately)."
                examples={[
                  "Rent/bond: R6,000",
                  "Groceries: R3,500",
                  "Electricity/water: R1,200",
                  "Transport/petrol: R1,500",
                  "Medical aid: R2,000",
                ]}
              />
            </Label>
            <p className="text-xs text-muted-foreground">
              Include rent, groceries, utilities, transport, etc.
            </p>
            <Input
              id="expenses"
              type="number"
              placeholder="e.g., 15000"
              value={totalExpenses || ""}
              onChange={(e) => setTotalExpenses(Number.parseFloat(e.target.value) || 0)}
              className="text-lg h-12"
            />
          </div>

          {/* Total Monthly Debt Repayments */}
          <div className="space-y-2">
            <Label htmlFor="debt" className="text-base font-semibold text-[#0D3B66] flex items-center gap-2">
              Total Monthly Debt Repayments
              <CalculatorTooltip
                title="Monthly Debt Repayments"
                description="Total minimum payments on all your debts each month."
                examples={[
                  "Home loan: R4,500",
                  "Car finance: R3,200",
                  "Personal loan: R1,800",
                  "Credit cards (min payment): R800",
                  "Store accounts: R500",
                ]}
              />
            </Label>
            <p className="text-xs text-muted-foreground">
              Include home loans, car payments, credit cards, personal loans, etc.
            </p>
            <Input
              id="debt"
              type="number"
              placeholder="e.g., 8000"
              value={totalDebt || ""}
              onChange={(e) => setTotalDebt(Number.parseFloat(e.target.value) || 0)}
              className="text-lg h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {monthlyIncome > 0 && (
        <Card className="border-2 border-[#0D3B66]/20">
          <CardHeader>
            <CardTitle className="text-xl text-[#0D3B66]">Your Financial Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-2xl font-bold text-[#0D3B66]">{formatCurrency(monthlyIncome)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-[#0D3B66]">{formatCurrency(totalExpenses)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Debt Payments</p>
                <p className="text-2xl font-bold text-[#FF6B6B]">{formatCurrency(totalDebt)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Money Left Over</p>
                <p className={`text-2xl font-bold ${leftOver >= 0 ? "text-[#4DB6AC]" : "text-[#FF6B6B]"}`}>
                  {formatCurrency(leftOver)}
                </p>
              </div>
            </div>

            {/* Debt-to-Income Ratio */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#0D3B66]">Debt-to-Income Ratio</span>
                <span className="text-lg font-bold text-[#0D3B66]">{debtToIncomeRatio.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    debtToIncomeRatio > 40
                      ? "bg-[#FF6B6B]"
                      : debtToIncomeRatio > 30
                        ? "bg-[#FFD93D]"
                        : "bg-[#4DB6AC]"
                  }`}
                  style={{ width: `${Math.min(debtToIncomeRatio, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {debtToIncomeRatio > 40 ? "High" : debtToIncomeRatio > 30 ? "Moderate" : "Healthy"} - Ideal is below 30%
              </p>
            </div>

            {/* Health Assessment */}
            <Card className={`border-2 ${healthStatus === "warning" ? "border-[#FF6B6B]/50 bg-[#FF6B6B]/5" : healthStatus === "caution" ? "border-[#FFD93D]/50 bg-[#FFD93D]/5" : "border-[#4DB6AC]/50 bg-[#4DB6AC]/5"}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <HealthIcon className={`h-6 w-6 ${healthColor} shrink-0 mt-1`} />
                  <div>
                    <h4 className={`font-semibold mb-2 ${healthColor}`}>
                      {healthStatus === "warning" ? "Financial Warning" : healthStatus === "caution" ? "Proceed with Caution" : "Financially Healthy"}
                    </h4>
                    <p className="text-sm text-[#0D3B66]/80">{healthMessage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            {healthStatus !== "healthy" && (
              <div className="text-center space-y-3 pt-4">
                <p className="text-sm text-[#0D3B66]/70">
                  Need help managing your debt? We're here to assist.
                </p>
                <Button className="bg-[#4DB6AC] hover:bg-[#4DB6AC]/90">
                  Schedule Free Consultation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Share Calculator */}
      {monthlyIncome > 0 && (
        <ShareResults
          title="Free Quick Financial Health Check"
          description="Check your debt-to-income ratio and see your monthly leftover in under 2 minutes with DCSA's free calculator"
          calculatorType="quick"
        />
      )}

      {/* Educational Note */}
      <Card className="border border-[#0D3B66]/10">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-[#0D3B66]">Note:</strong> This is a simplified overview. For a detailed analysis including all expense categories and personalized recommendations, try our In-Depth Analysis calculator.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
