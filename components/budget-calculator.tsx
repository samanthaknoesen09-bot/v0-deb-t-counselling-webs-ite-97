"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, PieChart, AlertTriangle, CheckCircle, Plus, Minus } from "lucide-react"

interface BudgetData {
  income: number
  // All household expenses in one section
  rent: number
  utilities: number
  groceries: number
  transport: number
  medicalAid: number
  lifeInsurance: number
  shortTermInsurance: number
  funeralCover: number
  schoolFees: number
  childcare: number
  cellphone: number
  internet: number
  dstv: number
  streaming: number
  entertainment: number
  other: number
}

interface DebtData {
  creditCards: number
  personalLoans: number
  storeAccounts: number
  vehicleFinance: number
  homeLoan: number
  studentLoans: number
  loanSharks: number
  otherDebt: number
}

interface BudgetResult {
  totalIncome: number
  totalExpenses: number
  totalDebt: number
  disposableIncome: number
  debtToIncomeRatio: number
  status: "healthy" | "concerning" | "critical"
  recommendations: string[]
  potentialSavings: number
}

export function BudgetCalculator() {
  const [budgetData, setBudgetData] = useState<BudgetData>({
    income: 0,
    rent: 0,
    utilities: 0,
    groceries: 0,
    transport: 0,
    medicalAid: 0,
    lifeInsurance: 0,
    shortTermInsurance: 0,
    funeralCover: 0,
    schoolFees: 0,
    childcare: 0,
    cellphone: 0,
    internet: 0,
    dstv: 0,
    streaming: 0,
    entertainment: 0,
    other: 0,
  })

  const [debtData, setDebtData] = useState<DebtData>({
    creditCards: 0,
    personalLoans: 0,
    storeAccounts: 0,
    vehicleFinance: 0,
    homeLoan: 0,
    studentLoans: 0,
    loanSharks: 0,
    otherDebt: 0,
  })

  const [result, setResult] = useState<BudgetResult | null>(null)
  const [showDebtSection, setShowDebtSection] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculateBudget = () => {
    const totalExpenses =
      budgetData.rent +
      budgetData.utilities +
      budgetData.groceries +
      budgetData.transport +
      budgetData.medicalAid +
      budgetData.lifeInsurance +
      budgetData.shortTermInsurance +
      budgetData.funeralCover +
      budgetData.schoolFees +
      budgetData.childcare +
      budgetData.cellphone +
      budgetData.internet +
      budgetData.dstv +
      budgetData.streaming +
      budgetData.entertainment +
      budgetData.other

    const totalDebt =
      debtData.creditCards +
      debtData.personalLoans +
      debtData.storeAccounts +
      debtData.vehicleFinance +
      debtData.homeLoan +
      debtData.studentLoans +
      debtData.loanSharks +
      debtData.otherDebt

    const disposableIncome = budgetData.income - totalExpenses - totalDebt
    const debtToIncomeRatio = budgetData.income > 0 ? (totalDebt / budgetData.income) * 100 : 0

    let status: "healthy" | "concerning" | "critical" = "healthy"
    const recommendations: string[] = []

    const securedDebt = debtData.vehicleFinance + debtData.homeLoan
    const unsecuredDebt =
      debtData.creditCards +
      debtData.personalLoans +
      debtData.storeAccounts +
      debtData.studentLoans +
      debtData.loanSharks +
      debtData.otherDebt

    const securedSavings = securedDebt * 0.25
    const unsecuredSavings = unsecuredDebt * 0.45
    const totalSavings = securedSavings + unsecuredSavings

    // New monthly payment after debt counselling
    const potentialSavings = totalSavings
    const monthlySavings = potentialSavings

    // Special warning for loan sharks
    if (debtData.loanSharks > 0) {
      status = "critical"
      recommendations.unshift("⚠️ URGENT: Loan shark debt detected - contact us immediately for protection")
    }

    if (debtToIncomeRatio > 40) {
      status = "critical"
      recommendations.push("You are over-indebted and need urgent help")
      recommendations.push("Contact DCSA immediately - we can help reduce your debt payments by up to 45%")
      if (totalDebt > 0) {
        recommendations.push(`You could save approximately ${formatCurrency(monthlySavings)} per month`)
      }
      recommendations.push("Don't wait - the sooner you act, the sooner you'll find relief")
    } else if (debtToIncomeRatio > 30) {
      status = "concerning"
      recommendations.push("You are over-indebted and struggling with debt payments")
      recommendations.push("Contact DCSA today - we can help restructure your debt and reduce payments")
      if (totalDebt > 0) {
        recommendations.push(`With our help, you could save ${formatCurrency(monthlySavings)} monthly`)
      }
      recommendations.push("Let us guide you back to financial freedom")
    } else if (debtToIncomeRatio > 0 && debtToIncomeRatio <= 30) {
      // Client has debt but it's manageable - they don't need debt review
      status = "healthy"
      recommendations.push("Your debt-to-income ratio is currently manageable")
      recommendations.push("Continue making payments on time to maintain good credit standing")
      recommendations.push("If you're struggling with payments, contact us for a free consultation")
    } else {
      // No debt at all
      status = "healthy"
      recommendations.push("Congratulations! Your finances are in excellent health")
      recommendations.push("You have no debt payments - that's fantastic!")
      recommendations.push("Keep up the great work managing your finances")
      recommendations.push("Focus on building an emergency fund and consider investments for your future")
    }

    if (disposableIncome < 0 && debtToIncomeRatio > 0) {
      status = "critical"
      recommendations.unshift("You are spending more than you earn - you need immediate help")
      recommendations.push("Contact DCSA now to prevent your situation from getting worse")
    }

    setResult({
      totalIncome: budgetData.income,
      totalExpenses,
      totalDebt,
      disposableIncome,
      debtToIncomeRatio,
      status,
      recommendations,
      potentialSavings: monthlySavings,
    })
  }

  const handleBudgetChange = (field: keyof BudgetData, value: string) => {
    setBudgetData((prev) => ({
      ...prev,
      [field]: Number.parseFloat(value) || 0,
    }))
  }

  const handleDebtChange = (field: keyof DebtData, value: string) => {
    setDebtData((prev) => ({
      ...prev,
      [field]: Number.parseFloat(value) || 0,
    }))
  }

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Simple Budget & Debt Calculator
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Enter your monthly income and household expenses to see exactly how much you could save with professional
            debt counselling.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="space-y-6">
            {/* Income Section */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Calculator className="w-5 h-5 text-primary" />
                  <span>Monthly Income</span>
                </CardTitle>
                <CardDescription>Enter your total monthly income after tax (ZAR)</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="income" className="text-card-foreground">
                    Net Monthly Income
                  </Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="0"
                    value={budgetData.income || ""}
                    onChange={(e) => handleBudgetChange("income", e.target.value)}
                    className="bg-input border-border text-lg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">All Household Expenses</CardTitle>
                <CardDescription>
                  Enter all your monthly household expenses below (leave as 0 if not applicable)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rent" className="text-card-foreground">
                      Rent/Bond Payment
                    </Label>
                    <Input
                      id="rent"
                      type="number"
                      placeholder="0"
                      value={budgetData.rent || ""}
                      onChange={(e) => handleBudgetChange("rent", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="utilities" className="text-card-foreground">
                      Utilities (Water/Electricity)
                    </Label>
                    <Input
                      id="utilities"
                      type="number"
                      placeholder="0"
                      value={budgetData.utilities || ""}
                      onChange={(e) => handleBudgetChange("utilities", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="groceries" className="text-card-foreground">
                      Groceries & Food
                    </Label>
                    <Input
                      id="groceries"
                      type="number"
                      placeholder="0"
                      value={budgetData.groceries || ""}
                      onChange={(e) => handleBudgetChange("groceries", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transport" className="text-card-foreground">
                      Transport/Fuel
                    </Label>
                    <Input
                      id="transport"
                      type="number"
                      placeholder="0"
                      value={budgetData.transport || ""}
                      onChange={(e) => handleBudgetChange("transport", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicalAid" className="text-card-foreground">
                      Medical Aid
                    </Label>
                    <Input
                      id="medicalAid"
                      type="number"
                      placeholder="0"
                      value={budgetData.medicalAid || ""}
                      onChange={(e) => handleBudgetChange("medicalAid", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lifeInsurance" className="text-card-foreground">
                      Life Insurance
                    </Label>
                    <Input
                      id="lifeInsurance"
                      type="number"
                      placeholder="0"
                      value={budgetData.lifeInsurance || ""}
                      onChange={(e) => handleBudgetChange("lifeInsurance", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shortTermInsurance" className="text-card-foreground">
                      Car/Home Insurance
                    </Label>
                    <Input
                      id="shortTermInsurance"
                      type="number"
                      placeholder="0"
                      value={budgetData.shortTermInsurance || ""}
                      onChange={(e) => handleBudgetChange("shortTermInsurance", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="funeralCover" className="text-card-foreground">
                      Funeral Cover
                    </Label>
                    <Input
                      id="funeralCover"
                      type="number"
                      placeholder="0"
                      value={budgetData.funeralCover || ""}
                      onChange={(e) => handleBudgetChange("funeralCover", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolFees" className="text-card-foreground">
                      School Fees
                    </Label>
                    <Input
                      id="schoolFees"
                      type="number"
                      placeholder="0"
                      value={budgetData.schoolFees || ""}
                      onChange={(e) => handleBudgetChange("schoolFees", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="childcare" className="text-card-foreground">
                      Childcare/Aftercare
                    </Label>
                    <Input
                      id="childcare"
                      type="number"
                      placeholder="0"
                      value={budgetData.childcare || ""}
                      onChange={(e) => handleBudgetChange("childcare", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cellphone" className="text-card-foreground">
                      Cellphone Contract
                    </Label>
                    <Input
                      id="cellphone"
                      type="number"
                      placeholder="0"
                      value={budgetData.cellphone || ""}
                      onChange={(e) => handleBudgetChange("cellphone", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="internet" className="text-card-foreground">
                      Internet/WiFi
                    </Label>
                    <Input
                      id="internet"
                      type="number"
                      placeholder="0"
                      value={budgetData.internet || ""}
                      onChange={(e) => handleBudgetChange("internet", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dstv" className="text-card-foreground">
                      DSTV/Satellite TV
                    </Label>
                    <Input
                      id="dstv"
                      type="number"
                      placeholder="0"
                      value={budgetData.dstv || ""}
                      onChange={(e) => handleBudgetChange("dstv", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="streaming" className="text-card-foreground">
                      Streaming Services
                    </Label>
                    <Input
                      id="streaming"
                      type="number"
                      placeholder="0"
                      value={budgetData.streaming || ""}
                      onChange={(e) => handleBudgetChange("streaming", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="entertainment" className="text-card-foreground">
                      Entertainment/Dining
                    </Label>
                    <Input
                      id="entertainment"
                      type="number"
                      placeholder="0"
                      value={budgetData.entertainment || ""}
                      onChange={(e) => handleBudgetChange("entertainment", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="other" className="text-card-foreground">
                      Other Monthly Expenses
                    </Label>
                    <Input
                      id="other"
                      type="number"
                      placeholder="0"
                      value={budgetData.other || ""}
                      onChange={(e) => handleBudgetChange("other", e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Debt Section */}
            <Card className="bg-card border-border border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-card-foreground">
                  <span className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <span>Monthly Debt Payments</span>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDebtSection(!showDebtSection)}
                    className="text-xs"
                  >
                    {showDebtSection ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showDebtSection ? "Hide" : "Show"} Debt Details
                  </Button>
                </CardTitle>
                <CardDescription>List all your monthly debt payments separately</CardDescription>
              </CardHeader>
              {showDebtSection && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="creditCards" className="text-card-foreground">
                        Credit Cards
                      </Label>
                      <Input
                        id="creditCards"
                        type="number"
                        placeholder="0"
                        value={debtData.creditCards || ""}
                        onChange={(e) => handleDebtChange("creditCards", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="personalLoans" className="text-card-foreground">
                        Personal Loans
                      </Label>
                      <Input
                        id="personalLoans"
                        type="number"
                        placeholder="0"
                        value={debtData.personalLoans || ""}
                        onChange={(e) => handleDebtChange("personalLoans", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="storeAccounts" className="text-card-foreground">
                        Store Accounts
                      </Label>
                      <Input
                        id="storeAccounts"
                        type="number"
                        placeholder="0"
                        value={debtData.storeAccounts || ""}
                        onChange={(e) => handleDebtChange("storeAccounts", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicleFinance" className="text-card-foreground">
                        Vehicle Finance
                      </Label>
                      <Input
                        id="vehicleFinance"
                        type="number"
                        placeholder="0"
                        value={debtData.vehicleFinance || ""}
                        onChange={(e) => handleDebtChange("vehicleFinance", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="homeLoan" className="text-card-foreground">
                        Home Loan/Bond
                      </Label>
                      <Input
                        id="homeLoan"
                        type="number"
                        placeholder="0"
                        value={debtData.homeLoan || ""}
                        onChange={(e) => handleDebtChange("homeLoan", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentLoans" className="text-card-foreground">
                        Student Loans
                      </Label>
                      <Input
                        id="studentLoans"
                        type="number"
                        placeholder="0"
                        value={debtData.studentLoans || ""}
                        onChange={(e) => handleDebtChange("studentLoans", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="loanSharks" className="text-card-foreground text-destructive font-semibold">
                        ⚠️ Loan Sharks/Mashonisas
                      </Label>
                      <Input
                        id="loanSharks"
                        type="number"
                        placeholder="0"
                        value={debtData.loanSharks || ""}
                        onChange={(e) => handleDebtChange("loanSharks", e.target.value)}
                        className="bg-input border-destructive/50"
                      />
                      <p className="text-xs text-destructive mt-1">
                        If you have loan shark debt, contact us immediately for protection
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="otherDebt" className="text-card-foreground">
                        Other Debt
                      </Label>
                      <Input
                        id="otherDebt"
                        type="number"
                        placeholder="0"
                        value={debtData.otherDebt || ""}
                        onChange={(e) => handleDebtChange("otherDebt", e.target.value)}
                        className="bg-input border-border"
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            <Button
              onClick={calculateBudget}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              Calculate My Financial Health
            </Button>
          </div>

          {/* Results Section */}
          {result && (
            <Card className="bg-card border-border lg:sticky lg:top-24 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <PieChart className="w-5 h-5 text-primary" />
                  <span>Your Financial Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formatCurrency(result.totalIncome)}</div>
                    <div className="text-sm text-muted-foreground">Monthly Income</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{formatCurrency(result.totalExpenses)}</div>
                    <div className="text-sm text-muted-foreground">Living Expenses</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{formatCurrency(result.totalDebt)}</div>
                  <div className="text-sm text-muted-foreground">Total Debt Payments</div>
                </div>

                <div className="text-center p-6 bg-muted rounded-lg">
                  <div
                    className={`text-3xl font-bold mb-2 ${
                      result.disposableIncome >= 0 ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {formatCurrency(result.disposableIncome)}
                  </div>
                  <div className="text-sm text-muted-foreground">Disposable Income</div>
                </div>

                {result.totalDebt > 0 && result.debtToIncomeRatio > 30 && (
                  <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {formatCurrency(result.potentialSavings)}
                    </div>
                    <div className="text-sm text-primary font-semibold">
                      Potential Monthly Savings with DCSA Debt Counselling
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-card-foreground">Debt-to-Income Ratio:</span>
                    <span
                      className={`font-bold ${
                        result.debtToIncomeRatio > 40
                          ? "text-destructive"
                          : result.debtToIncomeRatio > 30
                            ? "text-yellow-600"
                            : "text-primary"
                      }`}
                    >
                      {result.debtToIncomeRatio.toFixed(1)}%
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-l-4 ${
                      result.status === "critical"
                        ? "bg-destructive/10 border-destructive"
                        : result.status === "concerning"
                          ? "bg-yellow-50 border-yellow-500"
                          : "bg-primary/10 border-primary"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {result.status === "critical" ? (
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      ) : result.status === "concerning" ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                      <span className="font-semibold text-card-foreground">
                        {result.status === "critical"
                          ? "Critical - Urgent Action Needed"
                          : result.status === "concerning"
                            ? "Concerning - Needs Attention"
                            : "Healthy Financial Status"}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {result.status !== "healthy" && result.debtToIncomeRatio > 30 && (
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() =>
                        (window.location.href =
                          "mailto:sam@dcsam.co.za?subject=Debt Counselling Consultation&body=Hi, I completed the budget calculator and would like to discuss debt counselling options. My potential monthly savings could be " +
                          formatCurrency(result.potentialSavings) +
                          ". Please contact me to schedule a consultation.")
                      }
                    >
                      Email for Free Consultation - Save {formatCurrency(result.potentialSavings)}/month
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() =>
                        window.open(
                          `https://wa.me/27661937596?text=Hi, I completed the DCSA budget calculator and could potentially save ${formatCurrency(result.potentialSavings)} per month with debt counselling. I'd like to discuss my options.`,
                          "_blank",
                        )
                      }
                    >
                      WhatsApp Us Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
