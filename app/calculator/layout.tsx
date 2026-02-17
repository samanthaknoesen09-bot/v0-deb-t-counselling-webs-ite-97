import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Budget Calculator | DCSA - Calculate Your Debt & Monthly Expenses",
  description:
    "Use DCSA's free budget calculator to assess your financial situation. Calculate your monthly expenses, debt-to-income ratio, and discover if you qualify for debt review. Get instant results and personalized recommendations.",
  keywords: [
    "budget calculator",
    "debt calculator South Africa",
    "free budget tool",
    "debt-to-income calculator",
    "expense calculator",
    "financial calculator",
    "debt assessment tool",
    "DCSA calculator",
  ],
  openGraph: {
    title: "Free Budget Calculator | DCSA Debt Counsellors",
    description:
      "Calculate your monthly expenses and debt-to-income ratio with DCSA's free budget calculator. Get instant results and personalized debt management recommendations.",
    url: "https://www.dcsam.co.za/calculator",
    type: "website",
    images: [
      {
        url: "/images/dcsa-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DCSA Budget Calculator - Free Financial Assessment Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Budget Calculator | DCSA Debt Counsellors",
    description: "Calculate your monthly expenses and debt-to-income ratio with DCSA's free budget calculator.",
    images: ["/images/dcsa-logo.jpg"],
  },
  alternates: {
    canonical: "https://www.dcsam.co.za/calculator",
  },
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
