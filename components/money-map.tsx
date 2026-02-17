"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, TrendingUp, AlertCircle, CheckCircle2, HelpCircle, Calendar, Save, Download } from "lucide-react"
import { ProgressIndicator } from "@/components/progress-indicator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EXPENSE_OPTIONS, DEBT_OPTIONS } from "@/lib/expense-options"
import { Badge } from "@/components/ui/badge"
import { ShareResults } from "@/components/share-results"

interface ExpenseItem {
  id: string
  name: string
  amount: number
}

interface DebtAccount {
  id: string
  name: string
  amount: number
}

interface MoneyMapData {
  monthlyIncome: number
  housing: ExpenseItem[]
  utilities: ExpenseItem[]
  food: ExpenseItem[]
  transportation: ExpenseItem[]
  healthcare: ExpenseItem[]
  personalCare: ExpenseItem[]
  financialObligations: ExpenseItem[]
  familyDependents: ExpenseItem[]
  savingsInvestments: ExpenseItem[]
  entertainment: ExpenseItem[]
  domesticHelp: ExpenseItem[]
  safety: ExpenseItem[]
  miscellaneous: ExpenseItem[]
  debts: DebtAccount[]
}

interface FinancialHealthResult {
  totalDebtToIncome: number
  consumerDebtToIncome: number
  debtServiceRatio: number
  housingRatio: number
  zone: "healthy" | "caution" | "warning"
  message: string
  leftOver: number
  stressLevel?: number
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const TooltipHelper = ({ text }: { text: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground inline cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="text-sm">{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const CategorySection = ({
  title,
  category,
  items,
  options,
  calculateCategoryTotal,
  updateItem,
  removeItem,
  addItem,
}: {
  title: string
  category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">
  items: ExpenseItem[]
  options: readonly string[]
  calculateCategoryTotal: (category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">) => number
  updateItem: (
    category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">,
    id: string,
    field: "name" | "amount",
    value: string | number
  ) => void
  removeItem: (category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">, id: string) => void
  addItem: (category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">) => void
}) => {
  const total = calculateCategoryTotal(category)
  
  // Get list of already selected items to prevent duplicates
  const selectedItems = items.map(item => item.name)
  const availableOptions = options.filter(option => !selectedItems.includes(option))
  
  return (
    <AccordionItem value={category} className="border rounded-lg px-4 mb-2">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex justify-between w-full pr-4">
          <span className="font-medium">{title}</span>
          <div className="flex items-center gap-2">
            {items.length > 0 && <Badge variant="secondary" className="text-xs">{items.length}</Badge>}
            {total > 0 && <span className="text-sm text-muted-foreground">{formatCurrency(total)}</span>}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-3 pt-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2 items-start">
            <div className="flex-1 space-y-1">
              <Select
                value={item.name}
                onValueChange={(value) => updateItem(category, item.id, "name", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select expense item" />
                </SelectTrigger>
                <SelectContent>
                  {/* Current selected item */}
                  {item.name && <SelectItem value={item.name}>{item.name}</SelectItem>}
                  {/* Available options */}
                  {availableOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-32">
              <Input
                type="number"
                placeholder="R 0"
                value={item.amount || ""}
                onChange={(e) => updateItem(category, item.id, "amount", e.target.value)}
                className="text-right"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeItem(category, item.id)} className="shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {availableOptions.length > 0 ? (
          <Button variant="outline" size="sm" onClick={() => addItem(category)} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" /> Add another item
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-2">All items added</p>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

// Simplified DebtSection - all debts in one category now
const DebtSection = ({
  debts,
  updateDebt,
  removeDebt,
  addDebt,
}: {
  debts: DebtAccount[]
  updateDebt: (id: string, field: "name" | "amount", value: string | number) => void
  removeDebt: (id: string) => void
  addDebt: () => void
}) => {
  const total = debts.reduce((sum, debt) => sum + (debt.amount || 0), 0)
  
  // Get list of already selected debt types
  const selectedDebts = debts.map(debt => debt.name)
  const availableOptions = DEBT_OPTIONS.filter(option => !selectedDebts.includes(option))
  
  return (
    <div className="space-y-3">
      {debts.map((debt) => (
        <div key={debt.id} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1">
            <Select
              value={debt.name}
              onValueChange={(value) => updateDebt(debt.id, "name", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select debt type" />
              </SelectTrigger>
              <SelectContent>
                {/* Current selected item */}
                {debt.name && <SelectItem value={debt.name}>{debt.name}</SelectItem>}
                {/* Available options */}
                {availableOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-32">
            <Input
              type="number"
              placeholder="R 0"
              value={debt.amount || ""}
              onChange={(e) => updateDebt(debt.id, "amount", e.target.value)}
              className="text-right"
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeDebt(debt.id)} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="flex justify-between items-center pt-2">
        <Button variant="outline" size="sm" onClick={addDebt} className="bg-transparent" disabled={availableOptions.length === 0}>
          <Plus className="h-4 w-4 mr-2" /> Add another debt
        </Button>
        {total > 0 && (
          <div className="text-sm font-semibold">
            Total: <span className="text-[#4DB6AC]">{formatCurrency(total)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function MoneyMap() {
  const [data, setData] = useState<MoneyMapData>({
    monthlyIncome: 0,
    housing: [],
    utilities: [],
    food: [],
    transportation: [],
    healthcare: [],
    personalCare: [],
    financialObligations: [],
    familyDependents: [],
    savingsInvestments: [],
    entertainment: [],
    domesticHelp: [],
    safety: [],
    miscellaneous: [],
    debts: [],
  })

  const [result, setResult] = useState<FinancialHealthResult | null>(null)
  const [stressLevel, setStressLevel] = useState<number | null>(null)
  const [showStressRating, setShowStressRating] = useState(false)

  // Load saved progress on mount
  useEffect(() => {
    const savedData = localStorage.getItem("moneyMapProgress")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setData(parsed)
      } catch (error) {
        console.error("[v0] Failed to load saved progress:", error)
      }
    }
  }, [])

  // Auto-save progress
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("moneyMapProgress", JSON.stringify(data))
    }, 1000)
    return () => clearTimeout(timer)
  }, [data])

  // Calculate completion progress
  const calculateProgress = () => {
    let filledSections = 0
    const totalSections = 13 // Income + 11 expense categories + debts
    
    if (data.monthlyIncome > 0) filledSections++
    if (data.housing.length > 0 && data.housing.some(i => i.amount > 0)) filledSections++
    if (data.utilities.length > 0 && data.utilities.some(i => i.amount > 0)) filledSections++
    if (data.food.length > 0 && data.food.some(i => i.amount > 0)) filledSections++
    if (data.transportation.length > 0 && data.transportation.some(i => i.amount > 0)) filledSections++
    if (data.healthcare.length > 0 && data.healthcare.some(i => i.amount > 0)) filledSections++
    if (data.personalCare.length > 0 && data.personalCare.some(i => i.amount > 0)) filledSections++
    if (data.financialObligations.length > 0 && data.financialObligations.some(i => i.amount > 0)) filledSections++
    if (data.familyDependents.length > 0 && data.familyDependents.some(i => i.amount > 0)) filledSections++
    if (data.savingsInvestments.length > 0 && data.savingsInvestments.some(i => i.amount > 0)) filledSections++
    if (data.entertainment.length > 0 && data.entertainment.some(i => i.amount > 0)) filledSections++
    if (data.debts.length > 0 && data.debts.some(d => d.amount > 0)) filledSections++
    
    return { filledSections, totalSections }
  }

  const handleDownloadResults = () => {
    if (!result) return
    
    const content = `
DCSA Money Map Results
Generated: ${new Date().toLocaleDateString()}

INCOME
Monthly Income: ${formatCurrency(data.monthlyIncome)}

EXPENSES
Housing: ${formatCurrency(calculateCategoryTotal("housing"))}
Utilities: ${formatCurrency(calculateCategoryTotal("utilities"))}
Food: ${formatCurrency(calculateCategoryTotal("food"))}
Transportation: ${formatCurrency(calculateCategoryTotal("transportation"))}
Healthcare: ${formatCurrency(calculateCategoryTotal("healthcare"))}
Personal Care: ${formatCurrency(calculateCategoryTotal("personalCare"))}
Financial Obligations: ${formatCurrency(calculateCategoryTotal("financialObligations"))}
Family & Dependents: ${formatCurrency(calculateCategoryTotal("familyDependents"))}
Savings & Investments: ${formatCurrency(calculateCategoryTotal("savingsInvestments"))}
Entertainment: ${formatCurrency(calculateCategoryTotal("entertainment"))}

TOTAL EXPENSES: ${formatCurrency(calculateTotalExpenses())}

DEBTS
Total Monthly Debt Payments: ${formatCurrency(calculateDebtTotal())}

FINANCIAL HEALTH
Money Left Over: ${formatCurrency(result.leftOver)}
Debt-to-Income Ratio: ${result.totalDebtToIncome.toFixed(1)}%
Status: ${result.zone.toUpperCase()}

${result.message}

---
For personalized guidance, book a free consultation at www.dcsam.co.za
DCSA - Debt Counselling South Africa
NCR Registered: NCRDC3995
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `DCSA-Money-Map-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClearProgress = () => {
    if (confirm("Are you sure you want to clear all your progress? This cannot be undone.")) {
      localStorage.removeItem("moneyMapProgress")
      setData({
        monthlyIncome: 0,
        housing: [],
        utilities: [],
        food: [],
        transportation: [],
        healthcare: [],
        personalCare: [],
        financialObligations: [],
        familyDependents: [],
        savingsInvestments: [],
        entertainment: [],
        domesticHelp: [],
        safety: [],
        miscellaneous: [],
        debts: [],
      })
      setResult(null)
      setStressLevel(null)
    }
  }

  const addItem = (category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">) => {
    setData((prev) => ({
      ...prev,
      [category]: [...prev[category], { id: Date.now().toString(), name: "", amount: 0 }],
    }))
  }

  const removeItem = (category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">, id: string) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }))
  }

  const updateItem = (
    category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">,
    id: string,
    field: "name" | "amount",
    value: string | number
  ) => {
    setData((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id
          ? { ...item, [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value }
          : item
      ),
    }))
  }

  const addDebt = () => {
    setData((prev) => ({
      ...prev,
      debts: [...prev.debts, { id: Date.now().toString(), name: "", amount: 0 }],
    }))
  }

  const removeDebt = (id: string) => {
    setData((prev) => ({
      ...prev,
      debts: prev.debts.filter((debt) => debt.id !== id),
    }))
  }

  const updateDebt = (id: string, field: "name" | "amount", value: string | number) => {
    setData((prev) => ({
      ...prev,
      debts: prev.debts.map((debt) =>
        debt.id === id
          ? { ...debt, [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value }
          : debt
      ),
    }))
  }

  const calculateCategoryTotal = (category: keyof Omit<MoneyMapData, "monthlyIncome" | "debts">) => {
    return data[category].reduce((sum, item) => sum + item.amount, 0)
  }

  const calculateDebtTotal = () => {
    return data.debts.reduce((sum, debt) => sum + debt.amount, 0)
  }

  const calculateTotalExpenses = () => {
    const categories: Array<keyof Omit<MoneyMapData, "monthlyIncome" | "debts">> = [
      "housing",
      "utilities",
      "food",
      "transportation",
      "healthcare",
      "personalCare",
      "financialObligations",
      "familyDependents",
      "savingsInvestments",
      "entertainment",
      "domesticHelp",
      "safety",
      "miscellaneous",
    ]
    return categories.reduce((sum, cat) => sum + calculateCategoryTotal(cat), 0)
  }

  const calculateFinancialHealth = () => {
    const { monthlyIncome } = data

    if (monthlyIncome === 0) {
      return
    }

    // Show stress rating before calculating results
    setShowStressRating(true)
  }

  const completeCalculation = (userStressLevel: number) => {
    const { monthlyIncome } = data
    const totalExpenses = calculateTotalExpenses()
    const totalDebts = calculateDebtTotal()
    const housingCosts = calculateCategoryTotal("housing")
    const consumerDebt = totalDebts - calculateDebtTotal("homeLoan")

    // Calculate ratios
    const totalDebtToIncome = ((housingCosts + totalDebts) / monthlyIncome) * 100
    const consumerDebtToIncome = (consumerDebt / monthlyIncome) * 100
    const housingRatio = (housingCosts / monthlyIncome) * 100
    const debtServiceRatio = ((totalExpenses + totalDebts) / monthlyIncome) * 100
    const leftOver = monthlyIncome - totalExpenses - totalDebts

    let zone: "healthy" | "caution" | "warning" = "healthy"
    let message = ""

    // Determine zone based on comprehensive criteria
    if (totalDebtToIncome > 43 || totalDebtToIncome > 50 || consumerDebtToIncome > 20 || debtServiceRatio > 40) {
      zone = "warning"
      message =
        "Your finances show strain — speaking with a registered debt counsellor may help you understand your options."
    } else if (
      (totalDebtToIncome >= 30 && totalDebtToIncome <= 36) ||
      (consumerDebtToIncome >= 10 && consumerDebtToIncome <= 20) ||
      (totalDebtToIncome >= 36 && totalDebtToIncome <= 43)
    ) {
      zone = "caution"
      message = "Manageable, but monitor spending closely to avoid stress."
    } else if (totalDebtToIncome < 28 && consumerDebtToIncome < 10 && housingRatio < 28) {
      zone = "healthy"
      message = "Well done — you're managing your finances responsibly and have healthy breathing room."
    } else {
      zone = "caution"
      message = "Manageable, but monitor spending closely to avoid stress."
    }

    setResult({
      totalDebtToIncome,
      consumerDebtToIncome,
      debtServiceRatio,
      housingRatio,
      zone,
      message,
      leftOver,
      stressLevel: userStressLevel,
    })
    setShowStressRating(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Stress Level Rating Modal */}
      {showStressRating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-navy">
                How stressed do you feel about your finances?
              </CardTitle>
              <p className="text-center text-muted-foreground text-sm mt-2">
                This helps us provide more personalized guidance
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { value: 1, label: "Calm", emoji: "🙂", description: "I feel in control" },
                  { value: 2, label: "Slightly Concerned", emoji: "😐", description: "A bit worried but managing" },
                  { value: 3, label: "Concerned", emoji: "😟", description: "It's on my mind often" },
                  { value: 4, label: "Stressed", emoji: "😣", description: "It's affecting my daily life" },
                  { value: 5, label: "Overwhelmed", emoji: "😰", description: "I need help urgently" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setStressLevel(option.value)
                      completeCalculation(option.value)
                    }}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-teal hover:bg-peach/20 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{option.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-navy">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  completeCalculation(0)
                }}
                className="w-full text-sm text-muted-foreground"
              >
                Skip this step
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Where Is Your Money Going?</CardTitle>
          <p className="text-center text-muted-foreground mt-2">
            Curious about your spending and debt? Explore our easy, interactive Money Map to understand your finances
            and find out if you might need support.
          </p>
          <div className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4 mt-4">
            This tool is for educational purposes only and does not constitute financial advice.
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monthly Income */}
          <div className="space-y-2">
            <Label htmlFor="monthlyIncome" className="text-lg font-semibold flex items-center">
              Monthly Take-Home Income
              <TooltipHelper text="Your net monthly income after tax, the amount that actually reaches your bank account each month." />
            </Label>
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="e.g., 25000"
              value={data.monthlyIncome || ""}
              onChange={(e) => setData((prev) => ({ ...prev, monthlyIncome: Number.parseFloat(e.target.value) || 0 }))}
              className="text-lg font-semibold"
            />
          </div>

          {/* Living Expenses */}
          <div className="space-y-2">
            <Label className="text-xl font-bold">Living Expenses</Label>
            <Accordion type="multiple" className="w-full">
              <CategorySection
                title="Housing"
                category="housing"
                items={data.housing}
                options={EXPENSE_OPTIONS.housing}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Utilities"
                category="utilities"
                items={data.utilities}
                options={EXPENSE_OPTIONS.utilities}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Food"
                category="food"
                items={data.food}
                options={EXPENSE_OPTIONS.food}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Transportation"
                category="transportation"
                items={data.transportation}
                options={EXPENSE_OPTIONS.transportation}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Healthcare"
                category="healthcare"
                items={data.healthcare}
                options={EXPENSE_OPTIONS.healthcare}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Personal Care"
                category="personalCare"
                items={data.personalCare}
                options={EXPENSE_OPTIONS.personalCare}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Financial Obligations"
                category="financialObligations"
                items={data.financialObligations}
                options={EXPENSE_OPTIONS.financialObligations}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Family & Dependents"
                category="familyDependents"
                items={data.familyDependents}
                options={EXPENSE_OPTIONS.familyDependents}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Savings & Insurance"
                category="savingsInvestments"
                items={data.savingsInvestments}
                options={EXPENSE_OPTIONS.savingsInvestments}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Entertainment & Lifestyle"
                category="entertainment"
                items={data.entertainment}
                options={EXPENSE_OPTIONS.entertainment}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Domestic Help"
                category="domesticHelp"
                items={data.domesticHelp}
                options={EXPENSE_OPTIONS.domesticHelp}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Safety & Security"
                category="safety"
                items={data.safety}
                options={EXPENSE_OPTIONS.safety}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
              <CategorySection
                title="Miscellaneous"
                category="miscellaneous"
                items={data.miscellaneous}
                options={EXPENSE_OPTIONS.miscellaneous}
                calculateCategoryTotal={calculateCategoryTotal}
                updateItem={updateItem}
                removeItem={removeItem}
                addItem={addItem}
              />
            </Accordion>
          </div>

          {/* Debt Section */}
          <div className="space-y-2">
            <Label className="text-xl font-bold flex items-center">
              Debt Obligations
              <TooltipHelper text="All your monthly debt obligations. Select each debt type and enter the monthly repayment amount." />
            </Label>
            <Card>
              <CardContent className="pt-6">
                <DebtSection
                  debts={data.debts}
                  updateDebt={updateDebt}
                  removeDebt={removeDebt}
                  addDebt={addDebt}
                />
              </CardContent>
            </Card>
          </div>

          {/* Calculate Button */}
          <Button onClick={calculateFinancialHealth} size="lg" className="w-full text-lg h-14">
            See My Financial Picture
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Financial Picture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Zone Indicator */}
            <div
              className={`p-6 rounded-lg border-2 ${
                result.zone === "healthy"
                  ? "bg-[#A8E6CF] border-[#A8E6CF]"
                  : result.zone === "caution"
                    ? "bg-[#FFD3B6] border-[#FFD3B6]"
                    : "bg-[#FFAAA5] border-[#FFAAA5]"
              }`}
            >
              <div className="flex items-start gap-3">
                {result.zone === "healthy" && <CheckCircle2 className="h-6 w-6 text-[#0D3B66] mt-1 shrink-0" />}
                {result.zone === "caution" && <AlertCircle className="h-6 w-6 text-[#0D3B66] mt-1 shrink-0" />}
                {result.zone === "warning" && <AlertCircle className="h-6 w-6 text-[#0D3B66] mt-1 shrink-0" />}
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#0D3B66] font-heading">
                    {result.zone === "healthy" && "🟢 Healthy Zone"}
                    {result.zone === "caution" && "🟡 Caution Zone"}
                    {result.zone === "warning" && "🔴 Warning Zone"}
                  </h3>
                  <p className="text-base leading-relaxed text-[#0D3B66]/90">{result.message}</p>
                </div>
              </div>
            </div>

            {/* What This Means For You - Ratio Explainers */}
            <Card className="bg-[#F5F5F5]">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-navy">What This Means for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Total Debt-to-Income */}
                <div className="border-l-4 border-teal pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-navy">Total Debt-to-Income</span>
                    <span className="font-bold text-xl text-teal">{result.totalDebtToIncome.toFixed(1)}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    This shows how much of your income goes toward debt every month.
                  </p>
                  <p className="text-sm font-medium text-navy/80">
                    {result.zone === "healthy" && "You still have room to breathe and plan ahead."}
                    {result.zone === "caution" && "Your debt is starting to limit flexibility."}
                    {result.zone === "warning" && "Debt is likely putting strain on your monthly budget."}
                  </p>
                </div>

                {/* Consumer Debt */}
                <div className="border-l-4 border-teal pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-navy">Consumer Debt Ratio</span>
                    <span className="font-bold text-xl text-teal">{result.consumerDebtToIncome.toFixed(1)}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    This focuses on credit cards, loans, and store cards.
                  </p>
                  <p className="text-sm font-medium text-navy/80">
                    {result.zone === "healthy" && "Your short-term debt is under control."}
                    {result.zone === "caution" && "You may be relying more on credit than is comfortable."}
                    {result.zone === "warning" && "Credit repayments are likely overwhelming cash flow."}
                  </p>
                </div>

                {/* Housing Ratio */}
                <div className="border-l-4 border-teal pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-navy">Housing Cost Ratio</span>
                    <span className="font-bold text-xl text-teal">{result.housingRatio.toFixed(1)}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    This shows how much of your income goes to rent or bond payments.
                  </p>
                  <p className="text-sm font-medium text-navy/80">
                    {result.housingRatio < 28 && "Housing costs are well balanced."}
                    {result.housingRatio >= 28 && result.housingRatio < 35 && "Housing may be limiting other essentials."}
                    {result.housingRatio >= 35 && "Housing costs may be unaffordable long-term."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Summary Snapshot */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-heading text-navy">Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Income</span>
                    <span className="font-bold">{formatCurrency(data.monthlyIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Expenses</span>
                    <span className="font-bold">{formatCurrency(calculateTotalExpenses())}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Debt Payments</span>
                    <span className="font-bold">{formatCurrency(calculateDebtTotal())}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="font-semibold">Left Over</span>
                    <span className={`font-bold text-lg ${result.leftOver < 0 ? "text-red-600" : "text-green-600"}`}>
                      {formatCurrency(result.leftOver)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Personalized Next Steps */}
              <Card className="bg-[#FFE5D9] border-[#4DB6AC]/20">
                <CardHeader>
                  <CardTitle className="text-lg font-heading text-navy">Your Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {result.zone === "healthy" && (
                    <>
                      <p className="text-sm font-medium text-navy mb-3">
                        You're doing well — the goal now is consistency.
                      </p>
                      <ul className="space-y-2 text-sm text-navy/80">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" />
                          <span>Build or protect emergency savings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" />
                          <span>Avoid taking on new credit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" />
                          <span>Annual check-in with a counsellor</span>
                        </li>
                      </ul>
                    </>
                  )}
                  {result.zone === "caution" && (
                    <>
                      <p className="text-sm font-medium text-navy mb-3">
                        You're not in trouble, but some adjustments now can prevent stress later.
                      </p>
                      <ul className="space-y-2 text-sm text-navy/80">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#FFD3B6] mt-0.5 shrink-0" />
                          <span>Review discretionary spending</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#FFD3B6] mt-0.5 shrink-0" />
                          <span>Prioritise high-interest debt</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#FFD3B6] mt-0.5 shrink-0" />
                          <span>Book a guidance chat with us</span>
                        </li>
                      </ul>
                    </>
                  )}
                  {result.zone === "warning" && (
                    <>
                      <p className="text-sm font-medium text-navy mb-3">
                        Your numbers suggest real pressure — support can help.
                      </p>
                      <ul className="space-y-2 text-sm text-navy/80">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#FFAAA5] mt-0.5 shrink-0" />
                          <span>Speak to a registered debt counsellor</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#FFAAA5] mt-0.5 shrink-0" />
                          <span>Pause new credit applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#FFAAA5] mt-0.5 shrink-0" />
                          <span>Explore debt review options</span>
                        </li>
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Zone-Based WhatsApp CTA */}
            <Card className="bg-[#FFE5D9] border-[#4DB6AC]/30">
              <CardContent className="pt-6">
                {result.zone === "healthy" && (
                  <>
                    <h3 className="font-bold text-lg mb-3 text-[#0D3B66] font-heading">Want to Stay on Track?</h3>
                    <p className="text-sm text-[#0D3B66]/80 mb-4 leading-relaxed">
                      You're doing great! Chat with us for tips to maintain your healthy financial habits.
                    </p>
                    <Button 
                      className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white text-base h-12"
                      asChild
                    >
                      <a
                        href="https://wa.me/27661937596?text=Hi%20DCSA%20%F0%9F%91%8B%20I%27ve%20completed%20the%20Money%20Map%20and%20I%27m%20currently%20in%20the%20Healthy%20Zone.%20I%27d%20love%20a%20few%20tips%20to%20help%20me%20stay%20on%20track."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Chat with us for tips
                      </a>
                    </Button>
                  </>
                )}
                
                {result.zone === "caution" && (
                  <>
                    <h3 className="font-bold text-lg mb-3 text-[#0D3B66] font-heading">Let's Talk Before Things Get Stressful</h3>
                    <p className="text-sm text-[#0D3B66]/80 mb-4 leading-relaxed">
                      A quick chat can make this easier. Get guidance on how to improve your situation.
                    </p>
                    <Button 
                      className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white text-base h-12"
                      asChild
                    >
                      <a
                        href="https://wa.me/27661937596?text=Hi%20DCSA%20%F0%9F%8C%B1%20I%27ve%20just%20finished%20the%20Money%20Map%20and%20I%27m%20in%20the%20Caution%20Zone.%20I%27d%20appreciate%20some%20guidance%20on%20how%20to%20improve%20my%20situation%20before%20it%20becomes%20stressful."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Get guidance on WhatsApp
                      </a>
                    </Button>
                    <p className="text-xs text-center text-[#0D3B66]/60 mt-3">No pressure · Just friendly support</p>
                  </>
                )}
                
                {result.zone === "warning" && (
                  <>
                    <h3 className="font-bold text-lg mb-3 text-[#0D3B66] font-heading">Speak to a Registered Debt Counsellor Now</h3>
                    <p className="text-sm text-[#0D3B66]/80 mb-4 leading-relaxed">
                      Your finances are under significant pressure — and it's okay to ask for help. Speak to a registered debt counsellor to better understand your options.
                    </p>
                    <Button 
                      className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white text-base h-12"
                      asChild
                    >
                      <a
                        href="https://wa.me/27661937596?text=Hi%20DCSA%20%E2%9A%A0%EF%B8%8F%20I%20completed%20the%20Money%20Map%20and%20it%20shows%20I%20m%20in%20the%20Warning%20Zone.%20I%20need%20help%20understanding%20my%20options%20and%20would%20like%20to%20speak%20to%20a%20registered%20debt%20counsellor."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Chat with a debt counsellor
                      </a>
                    </Button>
                    <p className="text-xs text-center text-[#0D3B66]/60 mt-3">Friendly, confidential support · No obligation</p>
                  </>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Share Calculator */}
      {result && (
        <ShareResults
          title="Free Money Map Calculator - Track Your Finances"
          description="Get a complete breakdown of your income, expenses, and debts with personalized financial health insights"
          calculatorType="money-map"
        />
      )}
    </div>
  )
}

// Helper function to calculate total debt
const calculateTotalDebts = (debts: DebtAccount[]) => {
  return debts.reduce((sum, debt) => sum + debt.amount, 0)
}
