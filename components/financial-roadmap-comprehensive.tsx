"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Plus, X, ChevronDown } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ExpenseItem {
  id: string
  description: string
  amount: number
}

interface DebtAccount {
  id: string
  name: string
  amount: number
}

interface FinancialData {
  monthlyIncome: number
  livingExpenses: {
    housing: ExpenseItem[]
    utilities: ExpenseItem[]
    food: ExpenseItem[]
    transportation: ExpenseItem[]
    healthcare: ExpenseItem[]
    personalCare: ExpenseItem[]
    maintenance: ExpenseItem[]
    familyDependents: ExpenseItem[]
    savingsInvestments: ExpenseItem[]
    entertainment: ExpenseItem[]
    domesticHelp: ExpenseItem[]
    petCare: ExpenseItem[]
    safetySecur: ExpenseItem[]
    miscellaneous: ExpenseItem[]
  }
  subscriptions: {
    entertainment: ExpenseItem[]
    newsMedia: ExpenseItem[]
    gaming: ExpenseItem[]
    fitnessWellness: ExpenseItem[]
    foodLifestyle: ExpenseItem[]
    productivitySoftware: ExpenseItem[]
    educationLearning: ExpenseItem[]
    professionalServices: ExpenseItem[]
    financialInsurance: ExpenseItem[]
    vehicleSecurity: ExpenseItem[]
    communicationCloud: ExpenseItem[]
    shoppingRetail: ExpenseItem[]
    kidsFamily: ExpenseItem[]
    datingSocial: ExpenseItem[]
  }
  smallSpending: ExpenseItem[]
  debts: {
    homeLoan: DebtAccount[]
    vehicle: DebtAccount[]
    creditCards: DebtAccount[]
    storeCards: DebtAccount[]
    personalLoans: DebtAccount[]
    informalLoans: DebtAccount[]
  }
}

interface Result {
  totalDebtToIncome: number
  consumerDebtToIncome: number
  debtServiceRatio: number
  housingRatio: number
  zone: "healthy" | "caution" | "warning"
  message: string
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function FinancialRoadmapComprehensive() {
  const [data, setData] = useState<FinancialData>({
    monthlyIncome: 0,
    livingExpenses: {
      housing: [],
      utilities: [],
      food: [],
      transportation: [],
      healthcare: [],
      personalCare: [],
      maintenance: [],
      familyDependents: [],
      savingsInvestments: [],
      entertainment: [],
      domesticHelp: [],
      petCare: [],
      safetySecur: [],
      miscellaneous: [],
    },
    subscriptions: {
      entertainment: [],
      newsMedia: [],
      gaming: [],
      fitnessWellness: [],
      foodLifestyle: [],
      productivitySoftware: [],
      educationLearning: [],
      professionalServices: [],
      financialInsurance: [],
      vehicleSecurity: [],
      communicationCloud: [],
      shoppingRetail: [],
      kidsFamily: [],
      datingSocial: [],
    },
    smallSpending: [],
    debts: {
      homeLoan: [],
      vehicle: [],
      creditCards: [],
      storeCards: [],
      personalLoans: [],
      informalLoans: [],
    },
  })

  const [result, setResult] = useState<Result | null>(null)

  // Add item functions
  const addLivingExpense = (category: keyof typeof data.livingExpenses) => {
    setData((prev) => ({
      ...prev,
      livingExpenses: {
        ...prev.livingExpenses,
        [category]: [...prev.livingExpenses[category], { id: Date.now().toString(), description: "", amount: 0 }],
      },
    }))
  }

  const addSubscription = (category: keyof typeof data.subscriptions) => {
    setData((prev) => ({
      ...prev,
      subscriptions: {
        ...prev.subscriptions,
        [category]: [...prev.subscriptions[category], { id: Date.now().toString(), description: "", amount: 0 }],
      },
    }))
  }

  const addSmallSpending = () => {
    setData((prev) => ({
      ...prev,
      smallSpending: [...prev.smallSpending, { id: Date.now().toString(), description: "", amount: 0 }],
    }))
  }

  const addDebt = (category: keyof typeof data.debts) => {
    setData((prev) => ({
      ...prev,
      debts: {
        ...prev.debts,
        [category]: [...prev.debts[category], { id: Date.now().toString(), name: "", amount: 0 }],
      },
    }))
  }

  // Remove item functions
  const removeLivingExpense = (category: keyof typeof data.livingExpenses, id: string) => {
    setData((prev) => ({
      ...prev,
      livingExpenses: {
        ...prev.livingExpenses,
        [category]: prev.livingExpenses[category].filter((item) => item.id !== id),
      },
    }))
  }

  const removeSubscription = (category: keyof typeof data.subscriptions, id: string) => {
    setData((prev) => ({
      ...prev,
      subscriptions: {
        ...prev.subscriptions,
        [category]: prev.subscriptions[category].filter((item) => item.id !== id),
      },
    }))
  }

  const removeSmallSpending = (id: string) => {
    setData((prev) => ({
      ...prev,
      smallSpending: prev.smallSpending.filter((item) => item.id !== id),
    }))
  }

  const removeDebt = (category: keyof typeof data.debts, id: string) => {
    setData((prev) => ({
      ...prev,
      debts: {
        ...prev.debts,
        [category]: prev.debts[category].filter((item) => item.id !== id),
      },
    }))
  }

  // Update item functions
  const updateLivingExpense = (
    category: keyof typeof data.livingExpenses,
    id: string,
    field: "description" | "amount",
    value: string | number
  ) => {
    setData((prev) => ({
      ...prev,
      livingExpenses: {
        ...prev.livingExpenses,
        [category]: prev.livingExpenses[category].map((item) =>
          item.id === id
            ? { ...item, [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value }
            : item
        ),
      },
    }))
  }

  const updateSubscription = (
    category: keyof typeof data.subscriptions,
    id: string,
    field: "description" | "amount",
    value: string | number
  ) => {
    setData((prev) => ({
      ...prev,
      subscriptions: {
        ...prev.subscriptions,
        [category]: prev.subscriptions[category].map((item) =>
          item.id === id
            ? { ...item, [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value }
            : item
        ),
      },
    }))
  }

  const updateSmallSpending = (id: string, field: "description" | "amount", value: string | number) => {
    setData((prev) => ({
      ...prev,
      smallSpending: prev.smallSpending.map((item) =>
        item.id === id
          ? { ...item, [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value }
          : item
      ),
    }))
  }

  const updateDebt = (category: keyof typeof data.debts, id: string, field: "name" | "amount", value: string | number) => {
    setData((prev) => ({
      ...prev,
      debts: {
        ...prev.debts,
        [category]: prev.debts[category].map((item) =>
          item.id === id
            ? { ...item, [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value }
            : item
        ),
      },
    }))
  }

  // Calculate totals
  const calculateCategoryTotal = (items: ExpenseItem[] | DebtAccount[]) => {
    return items.reduce((sum, item) => sum + item.amount, 0)
  }

  const calculateAllLivingExpenses = () => {
    return Object.values(data.livingExpenses).reduce(
      (total, category) => total + calculateCategoryTotal(category),
      0
    )
  }

  const calculateAllSubscriptions = () => {
    return Object.values(data.subscriptions).reduce(
      (total, category) => total + calculateCategoryTotal(category),
      0
    )
  }

  const calculateSmallSpendingTotal = () => {
    return calculateCategoryTotal(data.smallSpending)
  }

  const calculateTotalDebts = () => {
    return Object.values(data.debts).reduce(
      (total, category) => total + calculateCategoryTotal(category),
      0
    )
  }

  const calculateHomeLoanTotal = () => {
    return calculateCategoryTotal(data.debts.homeLoan)
  }

  const calculateConsumerDebtTotal = () => {
    return (
      calculateCategoryTotal(data.debts.vehicle) +
      calculateCategoryTotal(data.debts.creditCards) +
      calculateCategoryTotal(data.debts.storeCards) +
      calculateCategoryTotal(data.debts.personalLoans) +
      calculateCategoryTotal(data.debts.informalLoans)
    )
  }

  const calculateRoadmap = () => {
    const income = data.monthlyIncome

    if (income === 0) {
      return
    }

    const homeLoan = calculateHomeLoanTotal()
    const consumerDebt = calculateConsumerDebtTotal()
    const totalDebt = homeLoan + consumerDebt

    // Ratios
    const totalDebtToIncome = (totalDebt / income) * 100
    const consumerDebtToIncome = (consumerDebt / income) * 100
    const housingRatio = (homeLoan / income) * 100

    const totalExpenses =
      calculateAllLivingExpenses() + calculateAllSubscriptions() + calculateSmallSpendingTotal() + totalDebt
    const debtServiceRatio = (totalExpenses / income) * 100

    let zone: "healthy" | "caution" | "warning" = "healthy"
    let message = ""

    // Zone determination based on specifications
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
        "Excellent control — you're managing well and have breathing room. Keep up the great work."
    } else {
      zone = "caution"
      message = "Manageable, but watch carefully — monitor your spending."
    }

    setResult({
      totalDebtToIncome,
      consumerDebtToIncome,
      debtServiceRatio,
      housingRatio,
      zone,
      message,
    })
  }

  const ExpenseItemRow = ({
    item,
    onUpdate,
    onRemove,
    descriptionPlaceholder = "Description",
  }: {
    item: ExpenseItem | DebtAccount
    onUpdate: (id: string, field: any, value: string | number) => void
    onRemove: (id: string) => void
    descriptionPlaceholder?: string
  }) => (
    <div className="flex gap-2 mb-2">
      <Input
        placeholder={descriptionPlaceholder}
        value={"description" in item ? item.description : item.name}
        onChange={(e) => onUpdate(item.id, "description" in item ? "description" : "name", e.target.value)}
        className="flex-1"
      />
      <Input
        type="number"
        placeholder="R 0"
        value={item.amount || ""}
        onChange={(e) => onUpdate(item.id, "amount", e.target.value)}
        className="w-32"
      />
      <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)} className="shrink-0 bg-transparent">
        <X className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Financial Roadmap Tool</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A comprehensive view of where your money is actually going each month
        </p>
        <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4 max-w-2xl mx-auto text-left">
          This tool is for educational purposes only and does not constitute financial advice.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="income">Total Monthly Income (After Tax)</Label>
            <Input
              id="income"
              type="number"
              placeholder="R 0"
              value={data.monthlyIncome || ""}
              onChange={(e) => setData((prev) => ({ ...prev, monthlyIncome: Number.parseFloat(e.target.value) || 0 }))}
              className="text-lg font-semibold"
            />
          </div>
        </CardContent>
      </Card>

      {/* Living Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Living Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {/* Housing */}
            <AccordionItem value="housing" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Housing</span>
                  {data.livingExpenses.housing.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.housing))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Rent/Bond, Rates & Taxes, Insurance, Levies, Maintenance, Household Supplies, Security, Garden Service
                </p>
                {data.livingExpenses.housing.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("housing", id, field, value)}
                    onRemove={(id) => removeLivingExpense("housing", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("housing")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Housing Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Utilities */}
            <AccordionItem value="utilities" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Utilities</span>
                  {data.livingExpenses.utilities.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.utilities))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Electricity, Water, Refuse, Gas, Internet, Cellphone, Landline
                </p>
                {data.livingExpenses.utilities.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("utilities", id, field, value)}
                    onRemove={(id) => removeLivingExpense("utilities", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("utilities")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Utility
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Food */}
            <AccordionItem value="food" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Food</span>
                  {data.livingExpenses.food.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.food))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Groceries, Eating Out, Takeaways, Coffee Shops, Work/School Lunches
                </p>
                {data.livingExpenses.food.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("food", id, field, value)}
                    onRemove={(id) => removeLivingExpense("food", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("food")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Food Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Transportation */}
            <AccordionItem value="transportation" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Transportation</span>
                  {data.livingExpenses.transportation.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.transportation))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Car Insurance, Petrol, Maintenance, License, Tolls, Parking, Public Transport, Uber/Bolt
                </p>
                {data.livingExpenses.transportation.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("transportation", id, field, value)}
                    onRemove={(id) => removeLivingExpense("transportation", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("transportation")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Transportation Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Healthcare */}
            <AccordionItem value="healthcare" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Healthcare</span>
                  {data.livingExpenses.healthcare.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.healthcare))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Medical Aid, Gap Cover, Dental, Optical, Co-payments, Prescriptions, OTC Medications
                </p>
                {data.livingExpenses.healthcare.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("healthcare", id, field, value)}
                    onRemove={(id) => removeLivingExpense("healthcare", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("healthcare")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Healthcare Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Personal Care */}
            <AccordionItem value="personalCare" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Personal Care</span>
                  {data.livingExpenses.personalCare.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.personalCare))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Hairdresser/Barber, Toiletries, Cosmetics, Gym, Clothing, Dry Cleaning
                </p>
                {data.livingExpenses.personalCare.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("personalCare", id, field, value)}
                    onRemove={(id) => removeLivingExpense("personalCare", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("personalCare")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Personal Care Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Family & Dependents */}
            <AccordionItem value="familyDependents" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Family & Dependents</span>
                  {data.livingExpenses.familyDependents.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.familyDependents))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  School Fees, Aftercare, Uniforms, Extra Murals, University Fees, NSFAS, Child/Spousal Maintenance
                </p>
                {data.livingExpenses.familyDependents.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("familyDependents", id, field, value)}
                    onRemove={(id) => removeLivingExpense("familyDependents", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("familyDependents")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Family Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Pet Care */}
            <AccordionItem value="petCare" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Pet Care</span>
                  {data.livingExpenses.petCare.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.petCare))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Pet Food, Veterinary Care, Pet Insurance, Supplies
                </p>
                {data.livingExpenses.petCare.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("petCare", id, field, value)}
                    onRemove={(id) => removeLivingExpense("petCare", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("petCare")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Pet Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Domestic Help */}
            <AccordionItem value="domesticHelp" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Domestic Help</span>
                  {data.livingExpenses.domesticHelp.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.domesticHelp))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Domestic Worker Wages, Gardener Wages, UIF Contributions
                </p>
                {data.livingExpenses.domesticHelp.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("domesticHelp", id, field, value)}
                    onRemove={(id) => removeLivingExpense("domesticHelp", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("domesticHelp")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Domestic Help Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Safety & Security */}
            <AccordionItem value="safetySecur" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Safety & Security</span>
                  {data.livingExpenses.safetySecur.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.safetySecur))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Armed Response, Alarm Maintenance, Electric Fencing, Vehicle Tracker
                </p>
                {data.livingExpenses.safetySecur.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("safetySecur", id, field, value)}
                    onRemove={(id) => removeLivingExpense("safetySecur", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("safetySecur")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Security Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Entertainment & Lifestyle */}
            <AccordionItem value="entertainment" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Entertainment & Lifestyle</span>
                  {data.livingExpenses.entertainment.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.entertainment))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Hobbies, Recreation, Books, Movies, Concerts, Vacations, Braai, Gifts
                </p>
                {data.livingExpenses.entertainment.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("entertainment", id, field, value)}
                    onRemove={(id) => removeLivingExpense("entertainment", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("entertainment")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Entertainment Expense
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Savings & Investments */}
            <AccordionItem value="savingsInvestments" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Savings & Investments</span>
                  {data.livingExpenses.savingsInvestments.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.savingsInvestments))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Emergency Fund, Retirement Annuity, Unit Trusts, TFSA, Education Savings, Stokvels
                </p>
                {data.livingExpenses.savingsInvestments.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("savingsInvestments", id, field, value)}
                    onRemove={(id) => removeLivingExpense("savingsInvestments", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("savingsInvestments")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Savings/Investment
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Miscellaneous */}
            <AccordionItem value="miscellaneous" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Miscellaneous</span>
                  {data.livingExpenses.miscellaneous.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.livingExpenses.miscellaneous))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  TV License, Professional Fees, Bank Fees, Accountant, SARS Payments, Legal Fees, Donations
                </p>
                {data.livingExpenses.miscellaneous.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateLivingExpense("miscellaneous", id, field, value)}
                    onRemove={(id) => removeLivingExpense("miscellaneous", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addLivingExpense("miscellaneous")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Miscellaneous Expense
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {calculateAllLivingExpenses() > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Living Expenses:</span>
                <span className="font-bold text-xl">{formatCurrency(calculateAllLivingExpenses())}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {/* Entertainment/Streaming */}
            <AccordionItem value="entertainment" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Entertainment & Streaming</span>
                  {data.subscriptions.entertainment.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.subscriptions.entertainment))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  DStv, Showmax, Netflix, Amazon Prime, Disney+, Spotify, Apple Music, YouTube Premium
                </p>
                {data.subscriptions.entertainment.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateSubscription("entertainment", id, field, value)}
                    onRemove={(id) => removeSubscription("entertainment", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSubscription("entertainment")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Entertainment Subscription
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* News & Media */}
            <AccordionItem value="newsMedia" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>News & Media</span>
                  {data.subscriptions.newsMedia.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.subscriptions.newsMedia))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  News24 Premium, Daily Maverick, Financial Mail, Sunday Times Digital
                </p>
                {data.subscriptions.newsMedia.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateSubscription("newsMedia", id, field, value)}
                    onRemove={(id) => removeSubscription("newsMedia", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSubscription("newsMedia")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add News Subscription
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Gaming */}
            <AccordionItem value="gaming" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Gaming</span>
                  {data.subscriptions.gaming.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.subscriptions.gaming))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  PlayStation Plus, Xbox Game Pass, Nintendo Switch Online, Steam
                </p>
                {data.subscriptions.gaming.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateSubscription("gaming", id, field, value)}
                    onRemove={(id) => removeSubscription("gaming", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSubscription("gaming")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Gaming Subscription
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Fitness & Wellness */}
            <AccordionItem value="fitnessWellness" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Fitness & Wellness</span>
                  {data.subscriptions.fitnessWellness.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.subscriptions.fitnessWellness))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Gym, ClassPass, Strava Premium, MyFitnessPal, Headspace, Calm, Peloton
                </p>
                {data.subscriptions.fitnessWellness.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateSubscription("fitnessWellness", id, field, value)}
                    onRemove={(id) => removeSubscription("fitnessWellness", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSubscription("fitnessWellness")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Fitness Subscription
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Food & Lifestyle */}
            <AccordionItem value="foodLifestyle" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Food & Lifestyle</span>
                  {data.subscriptions.foodLifestyle.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.subscriptions.foodLifestyle))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  HelloFresh, Wine Clubs, Coffee Subscriptions, Uber One, Mr D Food Plus
                </p>
                {data.subscriptions.foodLifestyle.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateSubscription("foodLifestyle", id, field, value)}
                    onRemove={(id) => removeSubscription("foodLifestyle", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSubscription("foodLifestyle")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Food/Lifestyle Subscription
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Productivity & Software */}
            <AccordionItem value="productivitySoftware" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Productivity & Software</span>
                  {data.subscriptions.productivitySoftware.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.subscriptions.productivitySoftware))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Microsoft 365, Adobe, Dropbox, Google One, iCloud, Grammarly, Canva Pro, Notion
                </p>
                {data.subscriptions.productivitySoftware.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateSubscription("productivitySoftware", id, field, value)}
                    onRemove={(id) => removeSubscription("productivitySoftware", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSubscription("productivitySoftware")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Productivity Subscription
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Education & Learning */}
            <AccordionItem value="educationLearning" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Education & Learning</span>
                  {data.subscriptions.educationLearning.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.subscriptions.educationLearning))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Udemy, Coursera, Skillshare, LinkedIn Learning, Duolingo, MasterClass
                </p>
                {data.subscriptions.educationLearning.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateSubscription("educationLearning", id, field, value)}
                    onRemove={(id) => removeSubscription("educationLearning", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSubscription("educationLearning")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Education Subscription
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Vehicle & Security */}
            <AccordionItem value="vehicleSecurity" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Vehicle & Security Services</span>
                  {data.subscriptions.vehicleSecurity.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.subscriptions.vehicleSecurity))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Netstar, Tracker Connect, Cartrack, Dashcam Cloud Storage
                </p>
                {data.subscriptions.vehicleSecurity.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateSubscription("vehicleSecurity", id, field, value)}
                    onRemove={(id) => removeSubscription("vehicleSecurity", id)}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSubscription("vehicleSecurity")}
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Vehicle/Security Subscription
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Other Categories - condensed for brevity */}
            <AccordionItem value="other" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Other Subscriptions</span>
                  {(data.subscriptions.professionalServices.length > 0 ||
                    data.subscriptions.financialInsurance.length > 0 ||
                    data.subscriptions.communicationCloud.length > 0 ||
                    data.subscriptions.shoppingRetail.length > 0 ||
                    data.subscriptions.kidsFamily.length > 0 ||
                    data.subscriptions.datingSocial.length > 0) && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(
                        calculateCategoryTotal(data.subscriptions.professionalServices) +
                          calculateCategoryTotal(data.subscriptions.financialInsurance) +
                          calculateCategoryTotal(data.subscriptions.communicationCloud) +
                          calculateCategoryTotal(data.subscriptions.shoppingRetail) +
                          calculateCategoryTotal(data.subscriptions.kidsFamily) +
                          calculateCategoryTotal(data.subscriptions.datingSocial)
                      )}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 space-y-4">
                <div>
                  <p className="text-xs font-semibold mb-2">Professional & Financial:</p>
                  {data.subscriptions.professionalServices.map((item) => (
                    <ExpenseItemRow
                      key={item.id}
                      item={item}
                      onUpdate={(id, field, value) => updateSubscription("professionalServices", id, field, value)}
                      onRemove={(id) => removeSubscription("professionalServices", id)}
                    />
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSubscription("professionalServices")}
                    className="w-full mb-2 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Professional Service
                  </Button>
                </div>

                <div>
                  <p className="text-xs font-semibold mb-2">Communication & Cloud:</p>
                  {data.subscriptions.communicationCloud.map((item) => (
                    <ExpenseItemRow
                      key={item.id}
                      item={item}
                      onUpdate={(id, field, value) => updateSubscription("communicationCloud", id, field, value)}
                      onRemove={(id) => removeSubscription("communicationCloud", id)}
                    />
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSubscription("communicationCloud")}
                    className="w-full mb-2 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Communication/Cloud Service
                  </Button>
                </div>

                <div>
                  <p className="text-xs font-semibold mb-2">Shopping & Retail:</p>
                  {data.subscriptions.shoppingRetail.map((item) => (
                    <ExpenseItemRow
                      key={item.id}
                      item={item}
                      onUpdate={(id, field, value) => updateSubscription("shoppingRetail", id, field, value)}
                      onRemove={(id) => removeSubscription("shoppingRetail", id)}
                    />
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSubscription("shoppingRetail")}
                    className="w-full bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Shopping Subscription
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {calculateAllSubscriptions() > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Subscriptions:</span>
                <span className="font-bold text-xl">{formatCurrency(calculateAllSubscriptions())}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Small Frequent Spending */}
      <Card>
        <CardHeader>
          <CardTitle>Small Frequent Spending</CardTitle>
          <p className="text-sm text-muted-foreground">
            Coffee, snacks, quick purchases — the small costs that add up
          </p>
        </CardHeader>
        <CardContent>
          {data.smallSpending.map((item) => (
            <ExpenseItemRow
              key={item.id}
              item={item}
              onUpdate={(id, field, value) => updateSmallSpending(id, field, value)}
              onRemove={(id) => removeSmallSpending(id)}
              descriptionPlaceholder="e.g., Coffee, Uber Eats"
            />
          ))}
          <Button variant="outline" onClick={addSmallSpending} className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" /> Add Small Expense
          </Button>

          {calculateSmallSpendingTotal() > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Small Spending:</span>
                <span className="font-bold text-xl">{formatCurrency(calculateSmallSpendingTotal())}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debts */}
      <Card>
        <CardHeader>
          <CardTitle>Debt Accounts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add each debt account separately to see your complete debt picture
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="homeLoan" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Home Loan</span>
                  {data.debts.homeLoan.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.debts.homeLoan))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                {data.debts.homeLoan.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateDebt("homeLoan", id, field, value)}
                    onRemove={(id) => removeDebt("homeLoan", id)}
                    descriptionPlaceholder="Lender name"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={() => addDebt("homeLoan")} className="w-full bg-transparent">
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
                      {formatCurrency(calculateCategoryTotal(data.debts.vehicle))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                {data.debts.vehicle.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateDebt("vehicle", id, field, value)}
                    onRemove={(id) => removeDebt("vehicle", id)}
                    descriptionPlaceholder="Vehicle/Lender"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={() => addDebt("vehicle")} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" /> Add Vehicle Repayment
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="creditCards" className="border rounded-lg px-4 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Credit Cards</span>
                  {data.debts.creditCards.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.debts.creditCards))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                {data.debts.creditCards.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateDebt("creditCards", id, field, value)}
                    onRemove={(id) => removeDebt("creditCards", id)}
                    descriptionPlaceholder="Card name"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={() => addDebt("creditCards")} className="w-full bg-transparent">
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
                      {formatCurrency(calculateCategoryTotal(data.debts.storeCards))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                {data.debts.storeCards.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateDebt("storeCards", id, field, value)}
                    onRemove={(id) => removeDebt("storeCards", id)}
                    descriptionPlaceholder="Store name"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={() => addDebt("storeCards")} className="w-full bg-transparent">
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
                      {formatCurrency(calculateCategoryTotal(data.debts.personalLoans))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                {data.debts.personalLoans.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateDebt("personalLoans", id, field, value)}
                    onRemove={(id) => removeDebt("personalLoans", id)}
                    descriptionPlaceholder="Lender name"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={() => addDebt("personalLoans")} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" /> Add Personal Loan
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="informalLoans" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <span>Informal / Payday Loans</span>
                  {data.debts.informalLoans.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(calculateCategoryTotal(data.debts.informalLoans))}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                {data.debts.informalLoans.map((item) => (
                  <ExpenseItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(id, field, value) => updateDebt("informalLoans", id, field, value)}
                    onRemove={(id) => removeDebt("informalLoans", id)}
                    descriptionPlaceholder="Lender name"
                  />
                ))}
                <Button variant="outline" size="sm" onClick={() => addDebt("informalLoans")} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" /> Add Informal Loan
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {calculateTotalDebts() > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Monthly Debt Payments:</span>
                <span className="font-bold text-xl">{formatCurrency(calculateTotalDebts())}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <div className="flex justify-center">
        <Button onClick={calculateRoadmap} size="lg" className="px-12">
          Calculate My Financial Roadmap
        </Button>
      </div>

      {/* Results */}
      {result && (
        <Card
          className={`border-2 ${
            result.zone === "healthy"
              ? "border-green-500 bg-green-50"
              : result.zone === "caution"
                ? "border-yellow-500 bg-yellow-50"
                : "border-red-500 bg-red-50"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.zone === "healthy" && <CheckCircle2 className="h-6 w-6 text-green-600" />}
              {result.zone === "caution" && <AlertCircle className="h-6 w-6 text-yellow-600" />}
              {result.zone === "warning" && <AlertCircle className="h-6 w-6 text-red-600" />}
              Your Financial Position
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">{result.message}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Ratios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Total Debt-to-Income</span>
                      <span className="font-semibold">{result.totalDebtToIncome.toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Healthy: &lt;28-30%</div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Consumer Debt-to-Income</span>
                      <span className="font-semibold">{result.consumerDebtToIncome.toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Healthy: &lt;10%</div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Housing Cost Ratio</span>
                      <span className="font-semibold">{result.housingRatio.toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Healthy: &lt;28%</div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Debt Service Ratio</span>
                      <span className="font-semibold">{result.debtServiceRatio.toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Healthy: &lt;40%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Income</span>
                    <span className="font-medium">{formatCurrency(data.monthlyIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Living Expenses</span>
                    <span>{formatCurrency(calculateAllLivingExpenses())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subscriptions</span>
                    <span>{formatCurrency(calculateAllSubscriptions())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Small Spending</span>
                    <span>{formatCurrency(calculateSmallSpendingTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Debt Payments</span>
                    <span>{formatCurrency(calculateTotalDebts())}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Left Over</span>
                    <span
                      className={
                        data.monthlyIncome -
                          calculateAllLivingExpenses() -
                          calculateAllSubscriptions() -
                          calculateSmallSpendingTotal() -
                          calculateTotalDebts() <
                        0
                          ? "text-destructive"
                          : "text-green-600"
                      }
                    >
                      {formatCurrency(
                        data.monthlyIncome -
                          calculateAllLivingExpenses() -
                          calculateAllSubscriptions() -
                          calculateSmallSpendingTotal() -
                          calculateTotalDebts()
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
              <p className="text-sm italic">
                This tool provides educational guidance only and does not constitute financial advice. For personalized
                guidance, consider speaking to a registered financial professional.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
