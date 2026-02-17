import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientCalculatorPage } from "./calculator-client"

export const metadata: Metadata = {
  title: "Free Budget Calculator - DCSA | Track Expenses & Manage Debt South Africa",
  description:
    "Use DCSA's free budget calculator to track your expenses, understand your debt situation, and get personalized savings tips. Calculate your debt-to-income ratio and discover if you qualify for debt review in South Africa.",
  keywords: [
    "budget calculator South Africa",
    "free budget planner",
    "debt calculator",
    "expense tracker",
    "debt-to-income calculator",
    "budget planning tool",
    "DCSA calculator",
  ],
  alternates: {
    canonical: "https://dcsam.co.za/calculator",
  },
  openGraph: {
    title: "Free Budget Calculator - DCSA Debt Counsellors",
    description:
      "Track your expenses and understand your financial situation with our comprehensive budget calculator.",
    url: "https://dcsam.co.za/calculator",
    type: "website",
  },
}

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ClientCalculatorPage />
        </div>
      </main>
      <Footer />
    </div>
  )
}
