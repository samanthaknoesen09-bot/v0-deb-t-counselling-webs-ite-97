import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Debt Counselling Costs & Fees | DCSA Transparent Pricing",
  description: "Clear breakdown of debt counselling costs in South Africa. NCR regulated fees, no hidden charges. Understand exactly what you'll pay for debt review services.",
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0D3B66] mb-4">
              Transparent Pricing
            </h1>
            <p className="text-xl text-[#0D3B66]/70">
              No hidden fees. NCR regulated. Affordable and honest.
            </p>
          </div>

          {/* NCR Regulated Fees */}
          <Card className="mb-8 border-2 border-[#4DB6AC]/30">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0D3B66]">NCR Regulated Fees</CardTitle>
              <p className="text-sm text-muted-foreground">
                All debt counselling fees in South Africa are regulated by the National Credit Regulator (NCR)
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-[#0D3B66] mb-3">Application Fee</h3>
                <div className="bg-[#FFD93D]/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-[#0D3B66]">R50</div>
                  <p className="text-sm text-muted-foreground mt-1">One-time payment when you apply</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-[#0D3B66] mb-3">Restructuring Fee</h3>
                <div className="bg-[#4DB6AC]/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-[#0D3B66]">Maximum R8,000</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Paid over the first months of debt review (not upfront). The actual amount depends on your debt amount and is capped by NCR regulations.
                  </p>
                  <div className="mt-3 space-y-1 text-sm text-[#0D3B66]/80">
                    <p>• Debts under R50,000: Lower fee (approximately R3,000-R5,000)</p>
                    <p>• Debts R50,000-R150,000: Medium fee (approximately R5,000-R6,500)</p>
                    <p>• Debts over R150,000: Maximum R8,000</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-[#0D3B66] mb-3">Monthly After-Care Fee</h3>
                <div className="bg-[#4DB6AC]/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-[#0D3B66]">5% of monthly payment</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Maximum R450 per month for managing and distributing your payments to creditors
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    Example: If your new monthly payment is R5,000, the after-care fee would be R250/month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Included */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0D3B66]">What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Free initial consultation",
                  "Complete financial assessment",
                  "Form 16 application preparation",
                  "Creditor negotiations",
                  "Court representation",
                  "Payment distribution to creditors",
                  "Ongoing support and advice",
                  "Monthly statements",
                  "Credit bureau liaison",
                  "Clearance certificate upon completion",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#4DB6AC] shrink-0 mt-0.5" />
                    <span className="text-[#0D3B66]/80">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-8 border-2 border-[#FFD93D]/40 bg-[#FFD93D]/5">
            <CardHeader>
              <CardTitle className="text-xl text-[#0D3B66] flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-[#FFD93D]" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-[#0D3B66]/80">
              <p>
                <strong>No upfront payments:</strong> The restructuring fee is paid over several months as part of your debt review payments, not upfront.
              </p>
              <p>
                <strong>Free consultation:</strong> We assess your situation at no cost to determine if debt review is right for you.
              </p>
              <p>
                <strong>NCR regulated:</strong> All fees are regulated by the National Credit Regulator and cannot exceed the legal maximum.
              </p>
              <p>
                <strong>Value for money:</strong> The savings from reduced monthly payments far exceed the cost of debt counselling.
              </p>
            </CardContent>
          </Card>

          {/* Example Calculation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-[#0D3B66]">Example: How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#F8F9FA] rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Monthly Payments</div>
                      <div className="text-2xl font-bold text-red-600">R12,000</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">New Monthly Payment</div>
                      <div className="text-2xl font-bold text-[#4DB6AC]">R7,000</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Reduced payment amount:</span>
                    <span className="font-semibold">R7,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>After-care fee (5%):</span>
                    <span className="font-semibold">R350</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Your total monthly payment:</span>
                    <span className="font-bold text-lg text-[#4DB6AC]">R7,350</span>
                  </div>
                  <div className="flex justify-between text-[#4DB6AC]">
                    <span className="font-semibold">You still save:</span>
                    <span className="font-bold">R4,650/month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="bg-[#4DB6AC] hover:bg-[#4DB6AC]/90" asChild>
              <Link href="/get-started">Get Your Free Consultation</Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No obligation. We'll explain all costs before you commit.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
