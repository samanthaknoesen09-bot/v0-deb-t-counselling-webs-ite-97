"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calculator, FileText, CreditCard, GraduationCap } from "lucide-react"
import { useState } from "react"

const services = [
  {
    icon: FileText,
    title: "Debt Review & Financial Counselling",
    description:
      "Comprehensive debt restructuring with one-on-one guidance from certified counsellors to address your unique financial situation.",
    features: [
      "Legal protection from creditors",
      "Reduced monthly payments",
      "Expert personalized advice",
      "Ongoing support",
    ],
  },
  {
    icon: GraduationCap,
    title: "Financial Education, Budget Planning & Savings Coaching",
    description:
      "Basic financial tips and tools to help you understand money management, track spending, and build healthy financial habits.",
    features: [
      "Budget tracking tools",
      "Simple money tips",
      "Expense awareness",
      "Savings ideas",
      "Basic financial guidance",
    ],
  },
  {
    icon: CreditCard,
    title: "Credit Repair",
    description: "Help improve your credit score and restore your financial reputation after debt clearance.",
    features: ["Credit monitoring", "Score improvement", "Report disputes"],
  },
]

export function ServicesSection() {
  const [showFinancialAdvice, setShowFinancialAdvice] = useState(false)
  const [showCreditRepairAdvice, setShowCreditRepairAdvice] = useState(false)

  const [expenses, setExpenses] = useState({
    coffee: 0,
    lunch: 0,
    netflix: 0,
    spotify: 0,
    disney: 0,
    otherSubscriptions: 0,
    uberEats: 0,
    cigarettes: 0,
    airtime: 0,
    gym: 0,
    drinks: 0,
    snacks: 0,
    braaiWood: 0,
    braaiMeat: 0,
    braaiDrinks: 0,
    other: 0,
  })

  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + Number(val || 0), 0)

  const updateExpense = (key: string, value: string) => {
    setExpenses((prev) => ({
      ...prev,
      [key]: value === "" ? 0 : Number.parseFloat(value) || 0,
    }))
  }

  const getSavingsTips = () => {
    const tips = []
    if (expenses.coffee > 500) {
      const savings = Math.round(expenses.coffee * 0.6)
      tips.push({
        category: "Coffee",
        tip: `Make coffee at home 3 days a week and save R${savings}/month`,
        color: "amber",
      })
    }
    if (expenses.lunch > 800) {
      const savings = Math.round(expenses.lunch * 0.6)
      tips.push({
        category: "Lunch",
        tip: `Pack lunch 3 days a week and save R${savings}/month`,
        color: "green",
      })
    }
    if (expenses.netflix + expenses.spotify + expenses.disney + expenses.otherSubscriptions > 300) {
      tips.push({
        category: "Subscriptions",
        tip: "Share accounts with family or keep only 1-2 services to save R200-400/month",
        color: "blue",
      })
    }
    if (expenses.uberEats > 500) {
      const savings = Math.round(expenses.uberEats * 0.75)
      tips.push({
        category: "Food Delivery",
        tip: `Limit to twice a month and save R${savings}/month`,
        color: "purple",
      })
    }
    if (expenses.cigarettes > 500) {
      tips.push({
        category: "Cigarettes",
        tip: "Consider cutting down or quitting - save money and improve your health",
        color: "red",
      })
    }
    if (expenses.gym > 0 && expenses.gym < 600) {
      tips.push({
        category: "Gym",
        tip: `If you're not using it, cancel and save R${expenses.gym}/month. Exercise at home or outdoors!`,
        color: "orange",
      })
    }
    if (expenses.braaiWood + expenses.braaiMeat + expenses.braaiDrinks > 800) {
      tips.push({
        category: "Braai",
        tip: "Host braais twice a month instead of weekly to save R400-600/month",
        color: "amber",
      })
    }
    return tips
  }

  const savingsTips = getSavingsTips()
  const potentialSavings = savingsTips.length > 0 ? Math.round(totalExpenses * 0.4) : 0

  return (
    <section id="services" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Comprehensive Debt Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our range of services is designed to address every aspect of your financial challenges, from immediate debt
            relief to long-term financial wellness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.title === "Financial Education, Budget Planning & Savings Coaching" ? (
                  <Dialog open={showFinancialAdvice} onOpenChange={setShowFinancialAdvice}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                      >
                        Read More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-primary">
                          Financial Education, Budget Planning & Savings Coaching
                        </DialogTitle>
                        <DialogDescription>Basic tips and tools to help you manage your money better</DialogDescription>
                      </DialogHeader>

                      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                          <strong>Important Disclaimer:</strong> I am not a qualified financial advisor. These are basic
                          tips and tools to help you understand your spending and make better money decisions. For
                          professional financial advice, please consult a certified financial advisor.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                            <Calculator className="w-5 h-5" />
                            Budget Planning Tips
                          </h3>
                          <ul className="space-y-3 text-sm text-blue-900 dark:text-blue-100">
                            <li className="flex gap-3">
                              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                              <span>
                                <strong>Track everything:</strong> Write down every expense for one month. You'll be
                                surprised where your money goes.
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                              <span>
                                <strong>Use the 50/30/20 rule:</strong> 50% for needs (rent, food, transport), 30% for
                                wants (entertainment), 20% for savings.
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                              <span>
                                <strong>Watch small expenses:</strong> R50 daily on coffee = R1,500/month. Small things
                                add up fast!
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                              <span>
                                <strong>Be honest:</strong> Don't hide expenses from yourself. You can't fix what you
                                don't acknowledge.
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            Savings Tips
                          </h3>
                          <ul className="space-y-3 text-sm text-green-900 dark:text-green-100">
                            <li className="flex gap-3">
                              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                              <span>
                                <strong>Emergency fund first:</strong> Save R500-R1,000 for emergencies. This stops you
                                borrowing when things break.
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                              <span>
                                <strong>Pay yourself first:</strong> Move money to savings on payday, before you spend
                                anything.
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                              <span>
                                <strong>Start small:</strong> Even R100/month is better than nothing. Build the habit
                                first.
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                              <span>
                                <strong>Use what you save:</strong> Cut R200 from takeaways? Move that R200 to savings
                                immediately.
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            Basic Money Tips
                          </h3>
                          <ul className="space-y-3 text-sm text-purple-900 dark:text-purple-100">
                            <li className="flex gap-3">
                              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                              <span>
                                <strong>Good debt vs bad debt:</strong> Good debt buys things that grow in value (home,
                                education). Bad debt buys things that lose value (clothes, holidays on credit).
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                              <span>
                                <strong>Interest is expensive:</strong> R10,000 store card at 25% interest costs you
                                R2,500 extra per year!
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                              <span>
                                <strong>Needs vs wants:</strong> You need food, transport, shelter. Everything else is a
                                want. Know the difference.
                              </span>
                            </li>
                            <li className="flex gap-3">
                              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                              <span>
                                <strong>Plan for big expenses:</strong> Car service, school fees, Christmas - these
                                aren't surprises. Save monthly for them.
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* Interactive Budget Calculator */}
                        <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Track Your Spending</h3>
                          <p className="text-sm text-muted-foreground mb-6">
                            Fill in what you spend each month on these common items. Be honest with yourself.
                          </p>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-foreground text-sm">Daily Expenses</h4>

                              <div className="space-y-2">
                                <Label htmlFor="coffee" className="text-sm">
                                  Coffee/Tea Takeaways
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="coffee"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.coffee || ""}
                                    onChange={(e) => updateExpense("coffee", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="lunch" className="text-sm">
                                  Lunch at Work
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="lunch"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.lunch || ""}
                                    onChange={(e) => updateExpense("lunch", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="snacks" className="text-sm">
                                  Snacks & Cold Drinks
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="snacks"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.snacks || ""}
                                    onChange={(e) => updateExpense("snacks", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="cigarettes" className="text-sm">
                                  Cigarettes/Vaping
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="cigarettes"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.cigarettes || ""}
                                    onChange={(e) => updateExpense("cigarettes", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-semibold text-foreground text-sm">Subscriptions & Services</h4>

                              <div className="space-y-2">
                                <Label htmlFor="netflix" className="text-sm">
                                  Netflix
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="netflix"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.netflix || ""}
                                    onChange={(e) => updateExpense("netflix", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="spotify" className="text-sm">
                                  Spotify/Apple Music
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="spotify"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.spotify || ""}
                                    onChange={(e) => updateExpense("spotify", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="disney" className="text-sm">
                                  Disney+/Showmax
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="disney"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.disney || ""}
                                    onChange={(e) => updateExpense("disney", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="otherSubscriptions" className="text-sm">
                                  Other Subscriptions
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="otherSubscriptions"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.otherSubscriptions || ""}
                                    onChange={(e) => updateExpense("otherSubscriptions", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="gym" className="text-sm">
                                  Gym Membership
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="gym"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.gym || ""}
                                    onChange={(e) => updateExpense("gym", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-semibold text-foreground text-sm">Entertainment & Social</h4>

                              <div className="space-y-2">
                                <Label htmlFor="uberEats" className="text-sm">
                                  Uber Eats/Mr D Food
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="uberEats"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.uberEats || ""}
                                    onChange={(e) => updateExpense("uberEats", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="drinks" className="text-sm">
                                  Weekend Drinks/Socializing
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="drinks"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.drinks || ""}
                                    onChange={(e) => updateExpense("drinks", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="airtime" className="text-sm">
                                  Airtime & Data Top-ups
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="airtime"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.airtime || ""}
                                    onChange={(e) => updateExpense("airtime", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-semibold text-foreground text-sm">Braai Expenses</h4>

                              <div className="space-y-2">
                                <Label htmlFor="braaiWood" className="text-sm">
                                  Wood/Charcoal
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="braaiWood"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.braaiWood || ""}
                                    onChange={(e) => updateExpense("braaiWood", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="braaiMeat" className="text-sm">
                                  Meat/Wors
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="braaiMeat"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.braaiMeat || ""}
                                    onChange={(e) => updateExpense("braaiMeat", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="braaiDrinks" className="text-sm">
                                  Drinks & Beverages
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="braaiDrinks"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.braaiDrinks || ""}
                                    onChange={(e) => updateExpense("braaiDrinks", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="other" className="text-sm">
                                  Other Monthly Expenses
                                </Label>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">R</span>
                                  <Input
                                    id="other"
                                    type="number"
                                    placeholder="0"
                                    value={expenses.other || ""}
                                    onChange={(e) => updateExpense("other", e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {totalExpenses > 0 && (
                            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-foreground">Total Monthly Spending:</span>
                                <span className="text-2xl font-bold text-primary">R{totalExpenses.toFixed(2)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                That's R{(totalExpenses * 12).toFixed(2)} per year on these items!
                              </p>

                              {savingsTips.length > 0 && (
                                <div className="mt-6">
                                  <h4 className="font-semibold text-foreground mb-3">
                                    Ways You Could Save Up To R{potentialSavings}/month:
                                  </h4>
                                  <div className="space-y-2">
                                    {savingsTips.map((tip, idx) => (
                                      <div
                                        key={idx}
                                        className={`p-3 rounded-lg bg-${tip.color}-50 dark:bg-${tip.color}-950 border border-${tip.color}-200 dark:border-${tip.color}-800`}
                                      >
                                        <p className="text-sm font-medium text-foreground">{tip.category}</p>
                                        <p className="text-sm text-muted-foreground">{tip.tip}</p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                                      Potential Annual Savings: R{(potentialSavings * 12).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-center">
                          <Button
                            onClick={() => {
                              window.open(
                                `https://wa.me/27719006298?text=${encodeURIComponent("Hi, I'd like help with budgeting and savings coaching. Can we discuss this?")}`,
                                "_blank",
                              )
                            }}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Get Personal Help via WhatsApp
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : service.title === "Credit Repair" ? (
                  <Dialog open={showCreditRepairAdvice} onOpenChange={setShowCreditRepairAdvice}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                      >
                        Read More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-primary">Credit Repair Guide</DialogTitle>
                        <DialogDescription>
                          Understanding credit scores and realistic ways to improve them in South Africa
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                            What is a Credit Score?
                          </h3>
                          <p className="text-sm text-blue-900 dark:text-blue-100 mb-3">
                            Your credit score is a number (usually 300-850) that shows lenders how risky you are to lend
                            money to. In South Africa, companies like TransUnion, Experian, and Compuscan track this.
                          </p>
                          <ul className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
                            <li>
                              <strong>Excellent (767-999):</strong> You'll get loans easily with low interest rates
                            </li>
                            <li>
                              <strong>Good (681-766):</strong> Most lenders will approve you
                            </li>
                            <li>
                              <strong>Fair (614-680):</strong> You might get approved but with higher interest
                            </li>
                            <li>
                              <strong>Poor (Below 614):</strong> You'll struggle to get credit
                            </li>
                          </ul>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">
                            ⚠️ Warning: Credit Repair Scams
                          </h3>
                          <p className="text-sm text-amber-900 dark:text-amber-100 mb-3">
                            <strong>Be careful!</strong> No one can magically "fix" your credit instantly. Avoid
                            companies that promise:
                          </p>
                          <ul className="space-y-2 text-sm text-amber-900 dark:text-amber-100">
                            <li>• To remove accurate negative information</li>
                            <li>• To create a "new credit identity" for you</li>
                            <li>• Instant credit score improvements</li>
                            <li>• Guaranteed results without seeing your credit report</li>
                          </ul>
                          <p className="text-sm text-amber-900 dark:text-amber-100 mt-3">
                            <strong>The truth:</strong> Only time, consistent payments, and clearing debts will improve
                            your score.
                          </p>
                        </div>

                        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                            ✅ What Actually Works (Honest Timeline)
                          </h3>
                          <div className="space-y-4 text-sm text-green-900 dark:text-green-100">
                            <div>
                              <p className="font-semibold mb-1">1. Get Your Free Credit Report</p>
                              <p>
                                You're entitled to one free report per year from each bureau. Check for errors and
                                dispute them.
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">2. Pay Everything On Time (Most Important!)</p>
                              <p>
                                Even one late payment hurts. Set up debit orders if you forget. This takes 6-12 months
                                to show improvement.
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">3. Pay Down High Balances</p>
                              <p>
                                Keep credit card balances below 30% of your limit. Owing R8,000 on a R10,000 limit hurts
                                your score.
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">4. Don't Close Old Accounts</p>
                              <p>
                                Length of credit history matters. Keep your oldest accounts open, even if you don't use
                                them.
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">5. Limit New Credit Applications</p>
                              <p>
                                Each application is a "hard inquiry" that temporarily lowers your score. Only apply when
                                necessary.
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">6. Clear Judgements and Defaults</p>
                              <p>
                                Negotiate with creditors to settle and remove these. They stay on your record for 5
                                years if unpaid!
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                            ⏰ Realistic Timeline
                          </h3>
                          <ul className="space-y-2 text-sm text-purple-900 dark:text-purple-100">
                            <li>
                              <strong>3-6 months:</strong> Small improvements from consistent payments
                            </li>
                            <li>
                              <strong>6-12 months:</strong> Noticeable score increase with good habits
                            </li>
                            <li>
                              <strong>2-5 years:</strong> Full recovery from serious defaults or debt review
                            </li>
                          </ul>
                          <p className="text-sm text-purple-900 dark:text-purple-100 mt-4">
                            <strong>Bottom line:</strong> Credit repair is slow but possible. Focus on good habits, not
                            quick fixes.
                          </p>
                        </div>

                        <div className="flex justify-center gap-4">
                          <Button
                            onClick={() => {
                              window.open(
                                `https://wa.me/27719006298?text=${encodeURIComponent("Hi, I need help understanding my credit report and improving my credit score. Can you assist?")}`,
                                "_blank",
                              )
                            }}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Get Help via WhatsApp
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              window.location.href = "mailto:sam@dcsam.co.za?subject=Credit Repair Help"
                            }}
                          >
                            Email Me
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                    onClick={() => {
                      window.open(
                        `https://wa.me/27719006298?text=${encodeURIComponent(`Hi, I'm interested in ${service.title}. Can you help?`)}`,
                        "_blank",
                      )
                    }}
                  >
                    Learn More
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
