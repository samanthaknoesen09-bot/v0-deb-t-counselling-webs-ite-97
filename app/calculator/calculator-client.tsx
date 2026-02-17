"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Zap, TrendingUp, DollarSign } from "lucide-react"
import { MoneyMap } from "@/components/money-map"
import { QuickCalculator } from "@/components/quick-calculator"
import { InterestCalculator } from "@/components/interest-calculator"
import { SavingsCalculator } from "@/components/savings-calculator"

type CalculatorType = "select" | "money-map" | "indepth" | "quick" | "interest" | "savings"

export function ClientCalculatorPage() {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType>("select")

  if (selectedCalculator === "money-map") {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedCalculator("select")}
          className="mb-4 bg-transparent"
        >
          ← Back to Calculator Options
        </Button>
        
        <Card className="border-2 border-[#0D3B66]/10">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-[#0D3B66]">
              Choose Your Money Map Type
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Select between in-depth analysis or quick check
            </p>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* In-Depth Analysis */}
            <Card className="border-2 border-[#4DB6AC] hover:shadow-xl transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center mb-3 group-hover:bg-[#4DB6AC]/20 transition-colors">
                  <Calculator className="h-10 w-10 text-[#4DB6AC]" />
                </div>
                <CardTitle className="text-xl text-[#0D3B66]">
                  In-Depth Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Comprehensive breakdown of your income, expenses, and debts across all categories
                </p>
                <ul className="text-sm space-y-2 text-[#0D3B66]/80">
                  <li className="flex items-start">
                    <span className="text-[#4DB6AC] mr-2">✓</span>
                    <span>Detailed expense tracking by category</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4DB6AC] mr-2">✓</span>
                    <span>Complete debt analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4DB6AC] mr-2">✓</span>
                    <span>Personalized financial health report</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4DB6AC] mr-2">✓</span>
                    <span>Debt counselling recommendations</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
                  onClick={() => setSelectedCalculator("indepth")}
                >
                  Start In-Depth Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Quick Check */}
            <Card className="border-2 border-[#FF6B6B] hover:shadow-xl transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center mb-3 group-hover:bg-[#FF6B6B]/20 transition-colors">
                  <Zap className="h-10 w-10 text-[#FF6B6B]" />
                </div>
                <CardTitle className="text-xl text-[#0D3B66]">
                  Quick Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Fast overview of your financial situation with essential calculations only
                </p>
                <ul className="text-sm space-y-2 text-[#0D3B66]/80">
                  <li className="flex items-start">
                    <span className="text-[#FF6B6B] mr-2">✓</span>
                    <span>Simple income & expense totals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B6B] mr-2">✓</span>
                    <span>Quick debt-to-income ratio</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B6B] mr-2">✓</span>
                    <span>Instant results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B6B] mr-2">✓</span>
                    <span>Perfect for a quick assessment</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white"
                  onClick={() => setSelectedCalculator("quick")}
                >
                  Start Quick Check
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedCalculator === "indepth") {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedCalculator("select")}
          className="mb-4 bg-transparent"
        >
          ← Back to Calculator Options
        </Button>
        <MoneyMap />
      </div>
    )
  }

  if (selectedCalculator === "quick") {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedCalculator("select")}
          className="mb-4 bg-transparent"
        >
          ← Back to Calculator Options
        </Button>
        <QuickCalculator />
      </div>
    )
  }

  if (selectedCalculator === "interest") {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedCalculator("select")}
          className="mb-4 bg-transparent"
        >
          ← Back to Calculator Options
        </Button>
        <InterestCalculator />
      </div>
    )
  }

  if (selectedCalculator === "savings") {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedCalculator("select")}
          className="mb-4 bg-transparent"
        >
          ← Back to Calculator Options
        </Button>
        <SavingsCalculator />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#0D3B66]/10">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-[#0D3B66]">
            Choose Your Calculator
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Select the calculator that best suits your needs
          </p>
          <div className="mt-3">
            <a 
              href="/interest-calculator" 
              className="text-[#FFD93D] hover:underline text-sm font-medium inline-flex items-center gap-1"
            >
              💡 Looking for our full Interest Calculator? Click here
            </a>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Money Map Calculator */}
          <Card className="border-2 border-[#4DB6AC] hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center mb-3 group-hover:bg-[#4DB6AC]/20 transition-colors">
                <Calculator className="h-8 w-8 text-[#4DB6AC]" />
              </div>
              <CardTitle className="text-xl text-[#0D3B66]">
                Money Map
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Track your income, expenses, and debts - Choose between in-depth or quick check
              </p>
              <ul className="text-xs text-left space-y-2 text-muted-foreground">
                <li>✓ In-Depth or Quick analysis</li>
                <li>✓ Complete financial overview</li>
                <li>✓ Personalized recommendations</li>
                <li>✓ Visual financial insights</li>
              </ul>
              <Button
                className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90"
                onClick={() => setSelectedCalculator("money-map")}
              >
                Start Money Map
              </Button>
            </CardContent>
          </Card>

          {/* Interest Rate Calculator */}
          <Card className="border-2 border-[#FFD93D] hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#FFD93D]/10 flex items-center justify-center mb-3 group-hover:bg-[#FFD93D]/20 transition-colors">
                <TrendingUp className="h-8 w-8 text-[#FFD93D]" />
              </div>
              <CardTitle className="text-xl text-[#0D3B66]">
                Interest Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                See how interest rates affect your debt repayments over time
              </p>
              <ul className="text-xs text-left space-y-2 text-muted-foreground">
                <li>✓ Calculate interest on loans</li>
                <li>✓ Compare different interest rates</li>
                <li>✓ See total repayment amounts</li>
                <li>✓ Understand cost of borrowing</li>
              </ul>
              <Button
                className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0D3B66]"
                onClick={() => setSelectedCalculator("interest")}
              >
                Start Interest Calculator
              </Button>
            </CardContent>
          </Card>

          {/* Savings Calculator */}
          <Card className="border-2 border-[#4DB6AC] hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center mb-3 group-hover:bg-[#4DB6AC]/20 transition-colors">
                <DollarSign className="h-8 w-8 text-[#4DB6AC]" />
              </div>
              <CardTitle className="text-xl text-[#0D3B66]">
                Potential Savings Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                See how much you could potentially save through debt counselling
              </p>
              <ul className="text-xs text-left space-y-2 text-muted-foreground">
                <li>✓ Potential monthly savings</li>
                <li>✓ Reduced debt payments</li>
                <li>✓ Counselling benefit analysis</li>
                <li>✓ Compare before & after scenarios</li>
              </ul>
              <Button
                className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90"
                onClick={() => setSelectedCalculator("savings")}
              >
                Calculate Potential Savings
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
