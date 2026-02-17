"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingDown, Sparkles, Home, Car, CreditCard } from "lucide-react"
import { ShareResults } from "@/components/share-results"

export function SavingsCalculator() {
  const [homeLoan, setHomeLoan] = useState<string>("")
  const [vehicleLoan, setVehicleLoan] = useState<string>("")
  const [unsecuredDebt, setUnsecuredDebt] = useState<string>("")
  const [result, setResult] = useState<{
    currentTotal: number
    newTotal: number
    monthlySavings: number
    yearlySavings: number
    breakdown: {
      home: { current: number; new: number; savings: number }
      vehicle: { current: number; new: number; savings: number }
      unsecured: { current: number; new: number; savings: number }
    }
  } | null>(null)

  const calculateSavings = () => {
    const home = parseFloat(homeLoan) || 0
    const vehicle = parseFloat(vehicleLoan) || 0
    const unsecured = parseFloat(unsecuredDebt) || 0

    if (home === 0 && vehicle === 0 && unsecured === 0) return

    // Apply realistic savings rates per debt type
    const homeReduction = 0.15 // 15% on home loans
    const vehicleReduction = 0.15 // 15% on vehicle loans
    const unsecuredReduction = 0.45 // 45% on unsecured debt

    const homeNew = home * (1 - homeReduction)
    const vehicleNew = vehicle * (1 - vehicleReduction)
    const unsecuredNew = unsecured * (1 - unsecuredReduction)

    const currentTotal = home + vehicle + unsecured
    const newTotal = homeNew + vehicleNew + unsecuredNew
    const monthlySavings = currentTotal - newTotal
    const yearlySavings = monthlySavings * 12

    setResult({
      currentTotal,
      newTotal,
      monthlySavings,
      yearlySavings,
      breakdown: {
        home: { current: home, new: homeNew, savings: home - homeNew },
        vehicle: { current: vehicle, new: vehicleNew, savings: vehicle - vehicleNew },
        unsecured: { current: unsecured, new: unsecuredNew, savings: unsecured - unsecuredNew },
      },
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section id="savings-calculator">
      <Card className="border-2 border-[#FFD93D]/40">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0D3B66] flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#FFD93D]" />
          Potential Savings Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your monthly debt payments by type to see realistic savings
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="home-loan" className="flex items-center gap-2">
              <Home className="h-4 w-4 text-[#4DB6AC]" />
              Home Loan Payment (15% savings)
            </Label>
            <Input
              id="home-loan"
              type="number"
              placeholder="e.g., 8000"
              value={homeLoan}
              onChange={(e) => setHomeLoan(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle-loan" className="flex items-center gap-2">
              <Car className="h-4 w-4 text-[#4DB6AC]" />
              Vehicle Loan Payment (15% savings)
            </Label>
            <Input
              id="vehicle-loan"
              type="number"
              placeholder="e.g., 4000"
              value={vehicleLoan}
              onChange={(e) => setVehicleLoan(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unsecured-debt" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#FF6B6B]" />
              Unsecured Debt (Credit Cards, Personal Loans - up to 45% savings)
            </Label>
            <Input
              id="unsecured-debt"
              type="number"
              placeholder="e.g., 5000"
              value={unsecuredDebt}
              onChange={(e) => setUnsecuredDebt(e.target.value)}
              className="text-lg"
            />
          </div>
        </div>

        <Button
          onClick={calculateSavings}
          className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90"
          size="lg"
        >
          Calculate My Potential Savings
        </Button>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div className="bg-[#4DB6AC]/10 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Your Current Total Payment</span>
                <span className="text-lg font-bold text-[#0D3B66] line-through">{formatCurrency(result.currentTotal)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#0D3B66]">Estimated New Total Payment</span>
                <span className="text-2xl font-bold text-[#4DB6AC]">{formatCurrency(result.newTotal)}</span>
              </div>
            </div>

            {/* Breakdown by Debt Type */}
            <div className="space-y-2 bg-white rounded-lg p-4 border">
              <h4 className="font-semibold text-sm text-[#0D3B66] mb-3">Savings Breakdown:</h4>
              
              {result.breakdown.home.current > 0 && (
                <div className="flex justify-between items-center text-sm py-1 border-b">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Home className="h-3 w-3" />
                    Home Loan (15%)
                  </span>
                  <span className="font-medium text-[#4DB6AC]">{formatCurrency(result.breakdown.home.savings)}/mo</span>
                </div>
              )}
              
              {result.breakdown.vehicle.current > 0 && (
                <div className="flex justify-between items-center text-sm py-1 border-b">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Car className="h-3 w-3" />
                    Vehicle Loan (15%)
                  </span>
                  <span className="font-medium text-[#4DB6AC]">{formatCurrency(result.breakdown.vehicle.savings)}/mo</span>
                </div>
              )}
              
              {result.breakdown.unsecured.current > 0 && (
                <div className="flex justify-between items-center text-sm py-1">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="h-3 w-3" />
                    Unsecured Debt (45%)
                  </span>
                  <span className="font-medium text-[#4DB6AC]">{formatCurrency(result.breakdown.unsecured.savings)}/mo</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-[#FFD93D]/10 border-[#FFD93D]/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#0D3B66]">{formatCurrency(result.monthlySavings)}</div>
                  <div className="text-xs text-muted-foreground mt-1">Total Monthly Savings</div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#4DB6AC]/10 border-[#4DB6AC]/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#0D3B66]">{formatCurrency(result.yearlySavings)}</div>
                  <div className="text-xs text-muted-foreground mt-1">Total Yearly Savings</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-lg p-4 border-2 border-[#4DB6AC]">
              <TrendingDown className="h-6 w-6 text-[#4DB6AC]" />
              <div>
                <div className="text-lg font-bold text-[#4DB6AC]">
                  {((result.monthlySavings / result.currentTotal) * 100).toFixed(0)}% Overall Reduction
                </div>
                <div className="text-xs text-muted-foreground">Based on NCR debt review savings rates</div>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground italic">
              *Savings calculated using standard debt review rates: 15% on home loans, 15% on vehicle loans, up to 45% on unsecured debt. 
              Actual results depend on creditor negotiations and your specific situation.
            </p>
          </div>
        )}
      </CardContent>
    </Card>

    {/* Share Calculator */}
    {result && (
      <ShareResults
        title="Free Potential Savings Calculator"
        description="See how much you could save monthly and yearly through debt counselling with DCSA's free calculator"
        calculatorType="savings"
      />
    )}
    </section>
  )
}
