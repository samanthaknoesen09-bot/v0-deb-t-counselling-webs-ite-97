import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, TrendingDown, Percent, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Free Debt Calculators | Money Map, Savings & Interest Calculators",
  description:
    "Free online debt calculators to help you manage your finances. Use our Money Map budget tracker, savings calculator, and interest calculator to take control of your debt. Calculate potential savings through debt counselling.",
  keywords: [
    "debt calculator",
    "free debt calculator",
    "savings calculator",
    "money map calculator",
    "budget calculator",
    "interest calculator",
    "debt to income calculator",
    "debt repayment calculator",
    "where is my money going",
    "budget tracker",
    "financial calculator",
    "debt counselling calculator",
    "South Africa debt calculator",
  ],
  alternates: {
    canonical: "https://www.dcsam.co.za/calculators",
  },
  openGraph: {
    title: "Free Debt Calculators | DCSA",
    description: "Free online calculators to help manage your debt and finances. Money Map, savings calculator, and more.",
    url: "https://www.dcsam.co.za/calculators",
    type: "website",
  },
}

export default function CalculatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DCSA Free Debt Calculators",
            description: "Free online financial calculators including Money Map budget tracker, savings calculator, and interest calculator",
            url: "https://www.dcsam.co.za/calculators",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "ZAR",
            },
          }),
        }}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-[#F8F9FA]">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-[#0D3B66]">
                Free Debt & Financial Calculators
              </h1>
              <p className="text-xl text-[#0D3B66]/70 max-w-3xl mx-auto">
                Take control of your finances with our free online calculators. Track your spending, calculate potential savings, and understand your debt better.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-[#4DB6AC]/30 hover:shadow-xl transition-all">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-[#4DB6AC]" />
                  </div>
                  <CardTitle className="text-2xl text-[#0D3B66]">Money Map</CardTitle>
                  <p className="text-sm text-muted-foreground">Budget Tracker</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#0D3B66]/80">
                    See exactly where your money goes each month. Track income, expenses, and identify areas where you can save.
                  </p>
                  <ul className="text-sm space-y-2 text-[#0D3B66]/70">
                    <li>✓ Track all income sources</li>
                    <li>✓ Categorize expenses</li>
                    <li>✓ Identify spending patterns</li>
                    <li>✓ Find savings opportunities</li>
                  </ul>
                  <Button className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90" asChild>
                    <Link href="/calculator">
                      Use Money Map
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#FFD93D]/30 hover:shadow-xl transition-all">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#FFD93D]/20 flex items-center justify-center mb-4">
                    <TrendingDown className="h-8 w-8 text-[#FFD93D]" />
                  </div>
                  <CardTitle className="text-2xl text-[#0D3B66]">Savings Calculator</CardTitle>
                  <p className="text-sm text-muted-foreground">Debt Counselling Savings</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#0D3B66]/80">
                    Calculate how much you could save through debt counselling. See realistic savings on home loans, vehicle loans, and unsecured debt.
                  </p>
                  <ul className="text-sm space-y-2 text-[#0D3B66]/70">
                    <li>✓ 15% savings on home loans</li>
                    <li>✓ 15% savings on vehicle loans</li>
                    <li>✓ Up to 45% on unsecured debt</li>
                    <li>✓ View total monthly savings</li>
                  </ul>
                  <Button className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0D3B66]" asChild>
                    <Link href="/#savings-calculator">
                      Calculate Savings
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#FF6B6B]/30 hover:shadow-xl transition-all">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center mb-4">
                    <Percent className="h-8 w-8 text-[#FF6B6B]" />
                  </div>
                  <CardTitle className="text-2xl text-[#0D3B66]">Interest Calculator</CardTitle>
                  <p className="text-sm text-muted-foreground">Quick Debt Check</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#0D3B66]/80">
                    Understand your debt-to-income ratio and see if you qualify for debt counselling. Quick and simple analysis.
                  </p>
                  <ul className="text-sm space-y-2 text-[#0D3B66]/70">
                    <li>✓ Calculate debt-to-income ratio</li>
                    <li>✓ Check qualification for debt review</li>
                    <li>✓ Instant results</li>
                    <li>✓ Free and confidential</li>
                  </ul>
                  <Button className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white" asChild>
                    <Link href="/interest-calculator">
                      Check Your Ratio
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <Card className="border-2 border-[#4DB6AC]/20 bg-gradient-to-br from-[#4DB6AC]/5 to-background">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-bold text-[#0D3B66] mb-4">
                    Need Help Understanding Your Results?
                  </h2>
                  <p className="text-lg text-[#0D3B66]/70 mb-6 max-w-2xl mx-auto">
                    Our calculators give you the numbers, but we're here to help you understand what they mean and what steps to take next.
                  </p>
                  <Button size="lg" className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white" asChild>
                    <Link href="/get-started">
                      Get Free Consultation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
