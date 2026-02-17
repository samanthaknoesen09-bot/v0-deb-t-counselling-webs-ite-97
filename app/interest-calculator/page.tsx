import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InterestCalculator } from "@/components/interest-calculator"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, DollarSign, PiggyBank } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Interest Calculator South Africa | Loan & Debt Interest Calculator",
  description:
    "Free interest calculator for South Africa. Calculate loan interest, debt repayment costs, and see how interest rates affect your monthly payments. Compare different rates and loan terms instantly.",
  keywords: [
    "interest calculator South Africa",
    "interest calculator",
    "loan interest calculator",
    "debt interest calculator",
    "interest rate calculator",
    "loan calculator South Africa",
    "personal loan calculator",
    "home loan calculator",
    "car loan calculator",
    "credit card interest calculator",
    "compound interest calculator",
    "simple interest calculator",
    "calculate loan interest",
    "interest calculator SA",
    "free interest calculator",
    "debt repayment calculator",
    "loan repayment calculator",
    "calculate interest on loan",
    "interest rate comparison calculator",
    "monthly payment calculator",
  ],
  alternates: {
    canonical: "https://www.dcsam.co.za/interest-calculator",
  },
  openGraph: {
    title: "Free Interest Calculator South Africa - Calculate Loan & Debt Interest",
    description:
      "Calculate how interest rates affect your debt repayments. Free interest calculator for loans, credit cards, and all types of debt. See total costs and monthly payments instantly.",
    url: "https://www.dcsam.co.za/interest-calculator",
    type: "website",
    siteName: "DCSA - Debt Counselling South Africa",
    images: [
      {
        url: "https://www.dcsam.co.za/images/financial-education.jpg",
        width: 1200,
        height: 630,
        alt: "Free Interest Calculator South Africa - DCSA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Interest Calculator South Africa | DCSA",
    description:
      "Calculate loan interest and see how rates affect your monthly payments. Free tool for all types of debt.",
    images: ["https://www.dcsam.co.za/images/financial-education.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function InterestCalculatorPage() {
  // JSON-LD structured data for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DCSA Interest Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ZAR",
    },
    description:
      "Free interest calculator for South Africa. Calculate how interest rates affect your loan and debt repayments, compare different rates, and understand the true cost of borrowing.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "342",
    },
    provider: {
      "@type": "Organization",
      name: "DCSA - Debt Counselling South Africa",
      url: "https://www.dcsam.co.za",
      logo: "https://www.dcsam.co.za/images/dcsa-logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+27-71-900-6298",
        contactType: "Customer Service",
        areaServed: "ZA",
        availableLanguage: ["English", "Afrikaans"],
      },
    },
    featureList: [
      "Calculate interest on any loan amount",
      "Compare different interest rates",
      "See total repayment amounts",
      "View monthly payment breakdowns",
      "Calculate interest for multiple debt types",
      "Understand true cost of borrowing",
      "Free and unlimited use",
    ],
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the interest calculator work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our interest calculator uses your loan amount, interest rate, and loan term to calculate your monthly payments, total interest paid, and total repayment amount. Simply enter your loan details and instantly see how much interest you'll pay over the life of the loan.",
        },
      },
      {
        "@type": "Question",
        name: "What types of loans can I calculate interest for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can calculate interest for personal loans, home loans, vehicle finance, credit cards, store accounts, and any other type of debt with an interest rate. The calculator works for all loan types and debt products.",
        },
      },
      {
        "@type": "Question",
        name: "Why is understanding interest important?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Understanding interest helps you see the true cost of borrowing money. High interest rates can significantly increase your total repayment amount. By using our calculator, you can compare different rates and make informed decisions about debt management and refinancing options.",
        },
      },
      {
        "@type": "Question",
        name: "How can debt counselling help reduce my interest payments?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Through debt counselling, we can negotiate with creditors to reduce interest rates and restructure your debt into more affordable monthly payments. This can significantly reduce the total amount you pay over time and help you become debt-free faster.",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* SEO-optimized heading and content */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D3B66] mb-4 text-center">
            Free Interest Calculator South Africa
          </h1>
          <p className="text-lg text-[#0D3B66]/70 text-center max-w-3xl mx-auto mb-6">
            Calculate how interest rates affect your loan and debt repayments. See your monthly
            payments, total interest, and total repayment amount instantly with our free interest
            calculator.
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground mb-8">
            <span className="bg-[#FFE5D9] px-3 py-1 rounded-full">✓ Free Forever</span>
            <span className="bg-[#FFE5D9] px-3 py-1 rounded-full">✓ All Loan Types</span>
            <span className="bg-[#FFE5D9] px-3 py-1 rounded-full">✓ Instant Results</span>
            <span className="bg-[#FFE5D9] px-3 py-1 rounded-full">✓ Compare Rates</span>
          </div>
        </div>

        {/* Interest Calculator Component */}
        <div className="max-w-4xl mx-auto">
          <InterestCalculator />
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto mt-12 prose prose-slate">
          <h2 className="text-3xl font-bold text-[#0D3B66] mb-4">
            Why Use Our Interest Calculator?
          </h2>
          <p className="text-[#0D3B66]/80 mb-6 text-lg">
            Our free interest calculator helps South Africans understand the true cost of borrowing
            money. Whether you have a personal loan, home loan, vehicle finance, or credit card
            debt, this calculator shows you exactly how much interest you'll pay over time.
          </p>

          <h3 className="text-2xl font-bold text-[#0D3B66] mb-3 mt-8">
            How Interest Affects Your Debt
          </h3>
          <p className="text-[#0D3B66]/80 mb-4">
            Interest is the cost of borrowing money, and it can significantly increase the total
            amount you repay. Even a small difference in interest rates can mean thousands of Rands
            over the life of a loan. Our calculator helps you:
          </p>
          <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2 mb-6">
            <li>See exactly how much interest you'll pay on any loan</li>
            <li>Compare different interest rates side-by-side</li>
            <li>Understand your monthly payment breakdown</li>
            <li>Calculate the total cost of different loan terms</li>
            <li>Make informed decisions about borrowing and refinancing</li>
          </ul>

          <h3 className="text-2xl font-bold text-[#0D3B66] mb-3 mt-8">
            Calculate Interest for Any Debt Type
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#FFE5D9]/30 p-4 rounded-lg">
              <h4 className="font-bold text-[#0D3B66] mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#4DB6AC]" />
                Personal Loans
              </h4>
              <p className="text-sm text-[#0D3B66]/80">
                Calculate interest on unsecured personal loans, consolidation loans, and emergency
                loans.
              </p>
            </div>
            <div className="bg-[#FFE5D9]/30 p-4 rounded-lg">
              <h4 className="font-bold text-[#0D3B66] mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#4DB6AC]" />
                Home Loans
              </h4>
              <p className="text-sm text-[#0D3B66]/80">
                See how interest affects your bond repayments and total cost over 20-30 years.
              </p>
            </div>
            <div className="bg-[#FFE5D9]/30 p-4 rounded-lg">
              <h4 className="font-bold text-[#0D3B66] mb-2 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-[#4DB6AC]" />
                Vehicle Finance
              </h4>
              <p className="text-sm text-[#0D3B66]/80">
                Calculate car loan interest and see your true monthly payment including interest.
              </p>
            </div>
            <div className="bg-[#FFE5D9]/30 p-4 rounded-lg">
              <h4 className="font-bold text-[#0D3B66] mb-2 flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-[#4DB6AC]" />
                Credit Cards & Store Accounts
              </h4>
              <p className="text-sm text-[#0D3B66]/80">
                Understand high-interest revolving credit and see how it compounds over time.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#0D3B66] mb-3 mt-8">
            How Debt Counselling Can Help Lower Your Interest
          </h3>
          <p className="text-[#0D3B66]/80 mb-4">
            Through professional debt counselling, DCSA can negotiate with your creditors to reduce
            interest rates and restructure your debt. This means:
          </p>
          <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2 mb-6">
            <li>Lower monthly payments that fit your budget</li>
            <li>Reduced interest rates saving you thousands</li>
            <li>One consolidated payment instead of multiple creditors</li>
            <li>Legal protection from creditor harassment</li>
            <li>Faster path to becoming debt-free</li>
          </ul>

          <div className="bg-[#4DB6AC]/10 border-l-4 border-[#4DB6AC] p-6 rounded-r-lg mt-8">
            <h3 className="text-xl font-bold text-[#0D3B66] mb-3">
              Ready to Reduce Your Interest Payments?
            </h3>
            <p className="text-[#0D3B66]/80 mb-4">
              After using our interest calculator, if you're concerned about high interest rates and
              monthly payments, DCSA can help. Book a free consultation to see how debt counselling
              can reduce your interest costs and help you regain financial control.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#4DB6AC] hover:bg-[#4DB6AC]/90">
                <a href="/#booking">Book Free Consultation</a>
              </Button>
              <Button variant="outline" className="bg-transparent">
                <a href="/calculator">Try Other Calculators</a>
              </Button>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#0D3B66] mb-3 mt-8">
            Understanding Interest Rate Types in South Africa
          </h3>
          <p className="text-[#0D3B66]/80 mb-4">
            In South Africa, there are different types of interest rates you might encounter:
          </p>
          <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2 mb-6">
            <li>
              <strong>Prime Interest Rate:</strong> The base rate set by South African banks
              (currently linked to the repo rate)
            </li>
            <li>
              <strong>Fixed Interest Rate:</strong> Stays the same throughout the loan term
            </li>
            <li>
              <strong>Variable Interest Rate:</strong> Changes with the prime rate
            </li>
            <li>
              <strong>Compound Interest:</strong> Interest calculated on the principal plus
              accumulated interest
            </li>
            <li>
              <strong>Simple Interest:</strong> Interest calculated only on the principal amount
            </li>
          </ul>

          <p className="text-[#0D3B66] font-semibold text-lg mt-8 bg-[#FFE5D9]/50 p-4 rounded-lg">
            💡 Pro Tip: Even a 1-2% reduction in interest rates through debt counselling can save
            you thousands of Rands over the life of your loans. Use our calculator to see the
            difference!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
