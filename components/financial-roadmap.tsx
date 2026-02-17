"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle, TrendingUp, AlertCircle, CheckCircle2, Plus, X } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface DebtAccount {
  id: string
  name: string
  amount: number
}

interface DebtCategory {
  homeLoan: DebtAccount[]
  vehicle: DebtAccount[]
  creditCards: DebtAccount[]
  storeCards: DebtAccount[]
  personalLoans: DebtAccount[]
  informalLoans: DebtAccount[]
}

interface RoadmapData {
  income: number
  housingCosts: number
  livingExpenses: number
  subscriptions: number
  smallSpending: number
  debts: DebtCategory
}

interface RoadmapResult {
  totalDebtToIncome: number
  consumerDebtToIncome: number
  debtServiceRatio: number
  zone: "healthy" | "caution" | "warning"
  message: string
}

export function FinancialRoadmap() {
  const [data, setData] = useState<RoadmapData>({
    income: 0,
    housingCosts: 0,
    livingExpenses: 0,
    subscriptions: 0,
    smallSpending: 0,
    debts: {
      homeLoan: [],
      vehicle: [],
      creditCards: [],
      storeCards: [],
      personalLoans: [],
      informalLoans: [],
    },
  })

  const [result, setResult] = useState<RoadmapResult | null>(null)

  const handleChange = (field: keyof Omit<RoadmapData, 'debts'>, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: Number.parseFloat(value) || 0,
    }))
  }

  const addDebtAccount = (category: keyof DebtCategory) => {
    setData((prev) => ({
      ...prev,
      debts: {
        ...prev.debts,
        [category]: [
          ...prev.debts[category],
          { id: Date.now().toString(), name: "", amount: 0 },
        ],
      },
    }))
  }

  const removeDebtAccount = (category: keyof DebtCategory, id: string) => {
    setData((prev) => ({
      ...prev,
      debts: {
        ...prev.debts,
        [category]: prev.debts[category].filter((debt) => debt.id !== id),
      },
    }))
  }

  const updateDebtAccount = (
    category: keyof DebtCategory,
    id: string,
    field: "name" | "amount",
    value: string | number
  ) => {
    setData((prev) => ({
      ...prev,
      debts: {
        ...prev.debts,
        [category]: prev.debts[category].map((debt) =>
          debt.id === id
            ? { ...debt, [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value }
            : debt
        ),
      },
    }))
  }

  const calculateTotalDebts = () => {
    const allDebts = Object.values(data.debts).flat()
    return allDebts.reduce((sum, debt) => sum + debt.amount, 0)
  }

  const calculateRoadmap = () => {
    const { income, housingCosts, livingExpenses, subscriptions, smallSpending } = data
    const totalDebtRepayments = calculateTotalDebts()

    if (income === 0) {
      return
    }

    // Total Debt-to-Income Ratio (including housing)
    const totalDebtToIncome = ((housingCosts + totalDebtRepayments) / income) * 100

    // Consumer Debt-to-Income Ratio (excluding housing)
    const consumerDebtToIncome = (totalDebtRepayments / income) * 100

    // Housing cost ratio
    const housingRatio = (housingCosts / income) * 100

    // Debt Service Ratio (all fixed costs)
    const totalFixedCosts = housingCosts + totalDebtRepayments + livingExpenses + subscriptions + smallSpending
    const debtServiceRatio = (totalFixedCosts / income) * 100

    let zone: "healthy" | "caution" | "warning" = "healthy"
    let message = ""

    // Enhanced zone determination with NCR-compliant messaging
    if (totalDebtToIncome > 43 || consumerDebtToIncome > 20 || debtServiceRatio > 40) {
      zone = "warning"
      message =
        "Your finances are under significant pressure — and it's okay to ask for help. Many people reach this point without realising how quickly debt can build up. You may benefit from speaking to a registered debt counsellor to better understand your options."
    } else if (
      (totalDebtToIncome >= 30 && totalDebtToIncome <= 36) ||
      (consumerDebtToIncome >= 10 && consumerDebtToIncome <= 20) ||
      (totalDebtToIncome >= 36 && totalDebtToIncome <= 43)
    ) {
      zone = "caution"
      message =
        "Your finances are manageable, but there's less margin for error. Keeping a close eye on spending now can help prevent future stress."
    } else if (totalDebtToIncome < 30 && consumerDebtToIncome < 10 && housingRatio < 28) {
      zone = "healthy"
      message =
        "Well done — you're managing your finances responsibly and have healthy breathing room. Keep up the great work."
    } else {
      zone = "caution"
      message = "Your finances are workable but require attention. Monitoring expenses can help maintain stability."
    }

    setResult({
      totalDebtToIncome,
      consumerDebtToIncome,
      debtServiceRatio,
      zone,
      message,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const TooltipHelper = ({ text }: { text: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help inline-block ml-1" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Financial Roadmap Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Understand where your money is actually going each month
          </p>
          <p className="text-sm text-muted-foreground italic mt-4 border-l-2 border-primary/30 pl-4 max-w-xl mx-auto text-left">
            This tool is for educational purposes only and does not constitute financial advice.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Monthly Finances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="income" className="flex items-center">
                  Monthly Income
                  <TooltipHelper text="Your total monthly income before deductions." />
                </Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="0"
                  value={data.income || ""}
                  onChange={(e) => handleChange("income", e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="housingCosts" className="flex items-center">
                  Housing Costs
                  <TooltipHelper text="Rent or bond payments, excluding utilities." />
                </Label>
                <Input
                  id="housingCosts"
                  type="number"
                  placeholder="0"
                  value={data.housingCosts || ""}
                  onChange={(e) => handleChange("housingCosts", e.target.value)}
                />
              </div>

              {/* Detailed Debt Section */}
              <div className="space-y-2">
                <Label className="flex items-center text-lg font-semibold">
                  Debt Details
                  <TooltipHelper text="Add each debt account separately to see your complete debt picture. This helps identify forgotten expenses and shows where debt pressure is coming from." />
                </Label>
                
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="homeLoan" className="border rounded-lg px-4 mb-2">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <span>Home Loan</span>
                        {data.debts.homeLoan.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(data.debts.homeLoan.reduce((sum, d) => sum + d.amount, 0))}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      {data.debts.homeLoan.map((debt) => (
                        <div key={debt.id} className="flex gap-2">
                          <Input
                            placeholder="Account name"
                            value={debt.name}
                            onChange={(e) => updateDebtAccount("homeLoan", debt.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Monthly payment"
                            value={debt.amount || ""}
                            onChange={(e) => updateDebtAccount("homeLoan", debt.id, "amount", e.target.value)}
                            className="w-32"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDebtAccount("homeLoan", debt.id)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addDebtAccount("homeLoan")}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Home Loan
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vehicle" className="border rounded-lg px-4 mb-2">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <span>Vehicle Repayment</span>
                        {data.debts.vehicle.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(data.debts.vehicle.reduce((sum, d) => sum + d.amount, 0))}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      {data.debts.vehicle.map((debt) => (
                        <div key={debt.id} className="flex gap-2">
                          <Input
                            placeholder="Vehicle/Account"
                            value={debt.name}
                            onChange={(e) => updateDebtAccount("vehicle", debt.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Monthly payment"
                            value={debt.amount || ""}
                            onChange={(e) => updateDebtAccount("vehicle", debt.id, "amount", e.target.value)}
                            className="w-32"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDebtAccount("vehicle", debt.id)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addDebtAccount("vehicle")}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Vehicle
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="creditCards" className="border rounded-lg px-4 mb-2">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <span>Credit Cards</span>
                        {data.debts.creditCards.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(data.debts.creditCards.reduce((sum, d) => sum + d.amount, 0))}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      {data.debts.creditCards.map((debt) => (
                        <div key={debt.id} className="flex gap-2">
                          <Input
                            placeholder="Card name"
                            value={debt.name}
                            onChange={(e) => updateDebtAccount("creditCards", debt.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Monthly payment"
                            value={debt.amount || ""}
                            onChange={(e) => updateDebtAccount("creditCards", debt.id, "amount", e.target.value)}
                            className="w-32"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDebtAccount("creditCards", debt.id)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addDebtAccount("creditCards")}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Credit Card
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="storeCards" className="border rounded-lg px-4 mb-2">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <span>Store Cards</span>
                        {data.debts.storeCards.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(data.debts.storeCards.reduce((sum, d) => sum + d.amount, 0))}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      {data.debts.storeCards.map((debt) => (
                        <div key={debt.id} className="flex gap-2">
                          <Input
                            placeholder="Store name"
                            value={debt.name}
                            onChange={(e) => updateDebtAccount("storeCards", debt.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Monthly payment"
                            value={debt.amount || ""}
                            onChange={(e) => updateDebtAccount("storeCards", debt.id, "amount", e.target.value)}
                            className="w-32"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDebtAccount("storeCards", debt.id)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addDebtAccount("storeCards")}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Store Card
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="personalLoans" className="border rounded-lg px-4 mb-2">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <span>Personal Loans</span>
                        {data.debts.personalLoans.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(data.debts.personalLoans.reduce((sum, d) => sum + d.amount, 0))}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      {data.debts.personalLoans.map((debt) => (
                        <div key={debt.id} className="flex gap-2">
                          <Input
                            placeholder="Lender name"
                            value={debt.name}
                            onChange={(e) => updateDebtAccount("personalLoans", debt.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Monthly payment"
                            value={debt.amount || ""}
                            onChange={(e) => updateDebtAccount("personalLoans", debt.id, "amount", e.target.value)}
                            className="w-32"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDebtAccount("personalLoans", debt.id)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addDebtAccount("personalLoans")}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Personal Loan
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="informalLoans" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <span>Informal / High-Interest Loans</span>
                        {data.debts.informalLoans.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(data.debts.informalLoans.reduce((sum, d) => sum + d.amount, 0))}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-3">
                      {data.debts.informalLoans.map((debt) => (
                        <div key={debt.id} className="flex gap-2">
                          <Input
                            placeholder="Lender name"
                            value={debt.name}
                            onChange={(e) => updateDebtAccount("informalLoans", debt.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Monthly payment"
                            value={debt.amount || ""}
                            onChange={(e) => updateDebtAccount("informalLoans", debt.id, "amount", e.target.value)}
                            className="w-32"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDebtAccount("informalLoans", debt.id)}
                            className="shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addDebtAccount("informalLoans")}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Informal Loan
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {calculateTotalDebts() > 0 && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Monthly Debt Payments:</span>
                      <span className="font-bold text-lg">{formatCurrency(calculateTotalDebts())}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="livingExpenses" className="flex items-center">
                  Living Expenses
                  <TooltipHelper text="Groceries, transport, utilities, insurance, and other essential monthly costs." />
                </Label>
                <Input
                  id="livingExpenses"
                  type="number"
                  placeholder="0"
                  value={data.livingExpenses || ""}
                  onChange={(e) => handleChange("livingExpenses", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subscriptions" className="flex items-center">
                  Subscriptions
                  <TooltipHelper text="Streaming services, apps, memberships — these are often easy to overlook." />
                </Label>
                <Input
                  id="subscriptions"
                  type="number"
                  placeholder="0"
                  value={data.subscriptions || ""}
                  onChange={(e) => handleChange("subscriptions", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smallSpending" className="flex items-center">
                  Small Frequent Spending
                  <TooltipHelper text="Daily or weekly expenses like coffee, cigarettes, or takeaways. Small amounts add up over time." />
                </Label>
                <Input
                  id="smallSpending"
                  type="number"
                  placeholder="0"
                  value={data.smallSpending || ""}
                  onChange={(e) => handleChange("smallSpending", e.target.value)}
                />
              </div>

              <Button onClick={calculateRoadmap} className="w-full bg-primary hover:bg-primary/90" size="lg">
                View My Roadmap
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Zone Card */}
                <Card
                  className={`border-2 ${
                    result.zone === "healthy"
                      ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20"
                      : result.zone === "caution"
                        ? "border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/20"
                        : "border-red-500/50 bg-red-50/50 dark:bg-red-950/20"
                  }`}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      {result.zone === "healthy" && <CheckCircle2 className="h-8 w-8 text-green-600" />}
                      {result.zone === "caution" && <AlertCircle className="h-8 w-8 text-yellow-600" />}
                      {result.zone === "warning" && <AlertCircle className="h-8 w-8 text-red-600" />}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">
                          {result.zone === "healthy" && "🟢 Healthy Zone"}
                          {result.zone === "caution" && "🟡 Caution Zone"}
                          {result.zone === "warning" && "🔴 Warning Zone"}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{result.message}</p>
                    {result.zone !== "healthy" && (
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <a href="tel:+27661937596">Speak to a debt counsellor</a>
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Metrics Cards */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Financial Ratios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Debt-to-Income</span>
                        <span className="font-bold">{result.totalDebtToIncome.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(result.totalDebtToIncome, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Consumer Debt-to-Income</span>
                        <span className="font-bold">{result.consumerDebtToIncome.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(result.consumerDebtToIncome, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Debt Service Ratio</span>
                        <span className="font-bold">{result.debtServiceRatio.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(result.debtServiceRatio, 100)}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Income</span>
                      <span className="font-medium">{formatCurrency(data.income)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Housing</span>
                      <span>{formatCurrency(data.housingCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Debt Payments</span>
                      <span>{formatCurrency(calculateTotalDebts())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Living Expenses</span>
                      <span>{formatCurrency(data.livingExpenses)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subscriptions</span>
                      <span>{formatCurrency(data.subscriptions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Small Spending</span>
                      <span>{formatCurrency(data.smallSpending)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Left Over</span>
                      <span
                        className={
                          data.income -
                            data.housingCosts -
                            calculateTotalDebts() -
                            data.livingExpenses -
                            data.subscriptions -
                            data.smallSpending <
                          0
                            ? "text-destructive"
                            : "text-green-600"
                        }
                      >
                        {formatCurrency(
                          data.income -
                            data.housingCosts -
                            calculateTotalDebts() -
                            data.livingExpenses -
                            data.subscriptions -
                            data.smallSpending
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Enter your financial details to see your roadmap</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
