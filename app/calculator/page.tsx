import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientCalculatorPage } from "./calculator-client"

export const metadata: Metadata = {
  title: "Free Debt Calculator South Africa | Calculate Your Debt & Budget | DCSA",
  description:
    "Free interactive debt calculator for South Africa. Calculate your total debt, monthly expenses, debt-to-income ratio, and get instant financial clarity. See if debt counselling can help you today.",
  keywords: [
    "debt calculator South Africa",
    "debt calculator",
    "free debt calculator",
    "debt to income calculator",
    "debt repayment calculator",
    "budget calculator South Africa",
    "expense calculator",
    "debt counselling calculator",
    "money calculator",
    "financial calculator",
    "debt assessment tool",
    "calculate my debt",
    "how much debt do I have",
    "debt calculator SA",
    "personal finance calculator",
    "monthly budget calculator",
    "debt relief calculator",
  ],
  alternates: {
    canonical: "https://www.dcsam.co.za/calculator",
  },
  openGraph: {
    title: "Free Debt Calculator South Africa - Calculate Your Total Debt & Budget",
    description:
      "Use our free interactive debt calculator to understand your finances. Calculate total debt, expenses, and debt-to-income ratio instantly. Get help with debt counselling.",
    url: "https://www.dcsam.co.za/calculator",
    type: "website",
    siteName: "DCSA - Debt Counselling South Africa",
    images: [
      {
        url: "https://www.dcsam.co.za/images/budget-planning.jpg",
        width: 1200,
        height: 630,
        alt: "Free Debt Calculator South Africa - DCSA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Debt Calculator South Africa | DCSA",
    description: "Calculate your total debt, monthly expenses, and debt-to-income ratio with our free interactive calculator.",
    images: ["https://www.dcsam.co.za/images/budget-planning.jpg"],
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

export default function CalculatorPage() {
  // JSON-LD structured data for search engines - SoftwareApplication
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DCSA Debt Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ZAR",
    },
    description:
      "Free interactive debt calculator for South Africa. Calculate your total debt, monthly expenses, and debt-to-income ratio to understand your financial situation.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
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
      "Calculate total monthly debt",
      "Track living expenses",
      "Calculate debt-to-income ratio",
      "Identify over-indebtedness",
      "Get debt counselling recommendations",
      "Free and private assessment",
    ],
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.dcsam.co.za"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculator",
        item: "https://www.dcsam.co.za/calculator"
      }
    ]
  }

  // HowTo schema for calculator usage
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use DCSA Debt Calculator",
    description: "Step-by-step guide to using our free debt calculator to assess your financial situation",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose Calculator Type",
        text: "Select between Money Map (in-depth or quick), Interest Calculator, or Potential Savings Calculator based on your needs",
        position: 1
      },
      {
        "@type": "HowToStep",
        name: "Enter Your Financial Information",
        text: "Input your monthly income, debts, and expenses accurately for best results",
        position: 2
      },
      {
        "@type": "HowToStep",
        name: "Review Your Results",
        text: "See your debt-to-income ratio, monthly leftover amount, and financial health status",
        position: 3
      },
      {
        "@type": "HowToStep",
        name: "Share or Save Results",
        text: "Share your results with family or schedule a free consultation if you need help",
        position: 4
      }
    ],
    totalTime: "PT5M"
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* SEO-optimized heading hierarchy */}
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D3B66] mb-4 text-center">
            Free Debt Calculator South Africa
          </h1>
          <p className="text-lg text-[#0D3B66]/70 text-center max-w-3xl mx-auto mb-6">
            Calculate your total debt, monthly expenses, and debt-to-income ratio with our free interactive calculator. 
            Get instant clarity on your finances and find out if debt counselling can help you.
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
            <span className="bg-[#FFE5D9] px-3 py-1 rounded-full">✓ 100% Free</span>
            <span className="bg-[#FFE5D9] px-3 py-1 rounded-full">✓ Private & Secure</span>
            <span className="bg-[#FFE5D9] px-3 py-1 rounded-full">✓ Instant Results</span>
            <span className="bg-[#FFE5D9] px-3 py-1 rounded-full">✓ NCR Registered</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <ClientCalculatorPage />
        </div>
        
        {/* SEO content below calculator */}
        <div className="max-w-4xl mx-auto mt-12 prose prose-slate">
          <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">How Our Debt Calculator Works</h2>
          <p className="text-[#0D3B66]/80 mb-4">
            Our free debt calculator helps South Africans understand their financial situation by calculating your total monthly 
            debt obligations, living expenses, and debt-to-income ratio. Simply enter your income, debts, and expenses to get 
            an instant assessment of your financial health.
          </p>
          
          <h3 className="text-xl font-bold text-[#0D3B66] mb-3 mt-6">What You Can Calculate:</h3>
          <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2 mb-6">
            <li>Total monthly debt repayments (home loans, vehicle finance, credit cards, personal loans)</li>
            <li>Monthly living expenses across all categories</li>
            <li>Debt-to-income ratio percentage</li>
            <li>Amount of money left after expenses</li>
            <li>Financial stress assessment score</li>
            <li>Debt counselling eligibility indicator</li>
          </ul>

          <h3 className="text-xl font-bold text-[#0D3B66] mb-3">Why Use a Debt Calculator?</h3>
          <p className="text-[#0D3B66]/80 mb-4">
            Understanding your debt-to-income ratio is crucial for financial health. If you're spending more than 40% of your 
            income on debt repayments, you may be over-indebted and could benefit from professional debt counselling services. 
            Our calculator helps you identify this quickly and provides guidance on next steps.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
