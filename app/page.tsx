import { HomeClient } from "./home-client"
import { OrganizationSchema } from "@/components/organization-schema"
import { getHomepageSchemas } from "@/lib/structured-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Debt Counsellor Near Me | NCR Registered Debt Review & Credit Repair | DCSA",
  description:
    "Looking for a debt counsellor near you? DCSA offers NCR registered debt counselling (NCRDC3995), credit repair & free debt calculators. Reduce debt by 15-45%. Get help with debt stress today. Free consultation available across South Africa.",
  keywords: [
    "debt counsellor near me",
    "debt counselling near me",
    "credit repair near me",
    "debt help near me",
    "NCR debt counsellor",
    "registered debt counsellor",
    "DCSA",
    "DCSA debt counsellors",
    "NCRDC3995",
    "debt counselling South Africa",
    "debt review South Africa",
    "debt relief",
    "help with debt",
    "debt calculator",
    "free debt calculator",
    "savings calculator",
    "money map calculator",
    "debt stress",
    "over indebted",
    "creditors calling",
    "debt solutions",
    "financial counselling",
    "credit repair South Africa",
    "debt consolidation",
    "struggling with debt",
    "Gqeberha debt counselling",
    "Port Elizabeth debt help",
    "Johannesburg debt counsellor",
    "Cape Town debt counsellor",
    "Durban debt counsellor",
  ],
  alternates: {
    canonical: "https://www.dcsam.co.za",
  },
  openGraph: {
    title: "DCSA - We're Here to Help | Debt Counselling & Credit Repair",
    description: "Compassionate debt counselling and credit repair services. No judgment, just honest support to help you regain control of your finances. Free consultation available.",
    url: "https://www.dcsam.co.za",
    siteName: "DCSA - Debt Counselling South Africa",
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: "https://www.dcsam.co.za/images/dcsa-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DCSA - Debt Counselling South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DCSA - Debt Counselling & Credit Repair",
    description: "We're here to help. Compassionate debt counselling and credit repair services. No judgment, just support.",
    images: ["https://www.dcsam.co.za/images/dcsa-logo.jpg"],
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

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      {getHomepageSchemas().map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomeClient />
    </>
  )
}
