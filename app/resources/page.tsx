import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppWidget } from "@/components/whatsapp-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Financial Education Resources - DCSA | Understand Your Rights",
  description:
    "Learn about interest rates, prescribed debt, reckless lending, and your consumer rights. Educational resources from DCSA Debt Counsellors.",
  alternates: {
    canonical: "https://www.dcsam.co.za/resources",
  },
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Education Resources</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Plain-language explanations to help you understand key financial concepts
            </p>
            
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg max-w-2xl mx-auto">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-left text-amber-900 dark:text-amber-100">
                <strong>Important:</strong> The information provided here is for general educational purposes only and does not constitute financial advice. For personalized guidance, please consult with a registered financial professional.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* How Interest Rates Work */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">How Interest Rates Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Interest is the cost of borrowing money. When you take out a loan or use a credit card, the lender charges you interest — usually shown as a percentage per year.
                </p>
                <p>
                  For example, if you borrow R10,000 at 20% interest per year, you'll owe R2,000 in interest after one year (if no payments are made). The longer debt remains unpaid, the more interest builds up.
                </p>
                <p>
                  <strong className="text-foreground">Why it matters:</strong> High interest rates mean debt grows faster. Credit cards and store accounts often have higher interest rates than personal loans or home loans, which is why they can become difficult to manage over time.
                </p>
              </CardContent>
            </Card>

            {/* Prescribed Debt */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What is Prescribed Debt?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In South Africa, debt can "prescribe" (expire) after a certain period if the creditor does not take legal action or if you don't acknowledge the debt in writing.
                </p>
                <p>
                  Generally, debt prescribes after <strong className="text-foreground">3 years</strong> from the date you last acknowledged it or made a payment. Once prescribed, the creditor can no longer legally force you to pay.
                </p>
                <p>
                  <strong className="text-foreground">Important:</strong> If you acknowledge the debt (even verbally or in writing), make a payment, or sign anything, the prescription period restarts.
                </p>
              </CardContent>
            </Card>

            {/* Reckless Lending */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What is Reckless Lending?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Reckless lending happens when a credit provider grants you credit without properly checking whether you can afford to repay it. This is illegal under the National Credit Act.
                </p>
                <p>
                  Examples include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lending money without doing an affordability assessment</li>
                  <li>Approving credit when it's clear you cannot afford the repayments</li>
                  <li>Not explaining the terms and costs of the agreement properly</li>
                </ul>
                <p>
                  <strong className="text-foreground">If reckless lending is proven,</strong> a court may reduce the debt, suspend it, or declare it void entirely.
                </p>
              </CardContent>
            </Card>

            {/* Debt Collectors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What Debt Collectors Can and Cannot Do</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Debt collectors are allowed to contact you to recover money owed, but they must follow legal rules set out in the National Credit Act and Debt Collectors Act.
                </p>
                <p className="font-semibold text-foreground">
                  What they CAN do:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact you by phone, SMS, email, or letter</li>
                  <li>Request payment and explain the debt</li>
                  <li>Take legal action if you do not pay</li>
                </ul>
                <p className="font-semibold text-foreground mt-4">
                  What they CANNOT do:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Harass, threaten, or intimidate you</li>
                  <li>Contact you at unreasonable times (e.g., late at night)</li>
                  <li>Disclose your debt to third parties without permission</li>
                  <li>Pretend to be law enforcement or government officials</li>
                  <li>Take your belongings without a court order</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-foreground">Know your rights:</strong> If a debt collector behaves inappropriately, you can report them to the National Credit Regulator (NCR).
                </p>
              </CardContent>
            </Card>

            {/* Consumer Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Important Consumer Rights When Taking on Debt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Under the National Credit Act, you have several protections when applying for or managing credit:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong className="text-foreground">Right to information:</strong> You must be given clear details about interest rates, fees, and terms before signing any credit agreement.
                  </li>
                  <li>
                    <strong className="text-foreground">Right to affordability assessment:</strong> Credit providers must assess whether you can afford the loan before approving it.
                  </li>
                  <li>
                    <strong className="text-foreground">Right to debt review:</strong> If you are over-indebted, you have the right to apply for debt review (also called debt counselling) to restructure your repayments.
                  </li>
                  <li>
                    <strong className="text-foreground">Right to a cooling-off period:</strong> In some cases, you have 5 business days to cancel a credit agreement without penalty.
                  </li>
                  <li>
                    <strong className="text-foreground">Right to fair treatment:</strong> You cannot be discriminated against based on race, gender, age, or other protected characteristics when applying for credit.
                  </li>
                </ul>
                <p className="mt-4">
                  Understanding these rights can help you make informed decisions and protect yourself from unfair practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  )
}
