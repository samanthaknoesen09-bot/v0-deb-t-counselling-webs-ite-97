import type React from "react"
import type { Metadata } from "next"
import { Poppins, Roboto } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { getLayoutSchema } from "@/lib/structured-data"
import { ViewTracker } from "@/components/view-tracker"
import { SkipToContent } from "@/components/skip-to-content"
import { Analytics } from "@vercel/analytics/next"
import { MotivationalQuotePopup } from "@/components/motivational-quote-popup"
import { Nunito } from "next/font/google" // Added import for Nunito font

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading"
})

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body"
})

const nunito = Nunito({ // Declared the nunito variable
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body"
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dcsam.co.za"),
  title: {
    default: "DCSA - Professional Debt Counselling & Credit Repair South Africa",
    template: "%s | DCSA",
  },
  description:
    "DCSA Debt Counsellors offers professional debt help, debt relief, and debt counselling services in South Africa. Get expert guidance (NCRDC3995) offering professional debt help, debt review, debt relief and credit repair services. Free debt calculators and consultation available.",
  keywords: [
    "debt counselling",
    "DCSA",
    "DCSA debt counsellors",
    "debt counsellor near me",
    "debt help",
    "debt relief",
    "debt review South Africa",
    "NCR registered debt counsellor",
    "credit repair South Africa",
    "debt counsellor South Africa",
    "money map calculator",
    "free debt consultation",
    "debt management",
    "debt consolidation",
    "NCRDC3995",
  ],
  authors: [{ name: "DCSA Debt Counsellors", url: "https://www.dcsam.co.za" }],
  creator: "DCSA",
  publisher: "DCSA Debt Counsellors",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/images/dcsa-logo.jpg",
    shortcut: "/images/dcsa-logo.jpg",
    apple: "/images/dcsa-logo.jpg",
  },
  manifest: "/manifest.json",
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
  verification: {
    google: "google-site-verification-code-here", // User should add actual verification code
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.dcsam.co.za",
    siteName: "DCSA Debt Counsellors",
    title: "DCSA - Professional Debt Help & Debt Relief South Africa",
    description:
      "DCSA offers expert debt help and debt relief services in South Africa. NCR registered debt counsellors with 17+ years experience.",
    images: [
      {
        url: "/images/dcsa-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DCSA Debt Counsellors - Professional Debt Help",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DCSA - Professional Debt Help & Debt Relief",
    description:
      "DCSA offers expert debt help and debt relief services in South Africa. NCR registered debt counsellors with 17+ years experience.",
    images: ["/images/dcsa-logo.jpg"],
  },
  alternates: {
    canonical: "https://www.dcsam.co.za",
  },
  category: "Financial Services",
  classification: "Debt Counselling Services",
  other: {
    "google-site-verification": "WvDUKvcUNr3Dng8NU3MpW-Gcl4rpe31jmsHr4IPTHFk",
    "msvalidate.01": "BING_VERIFICATION_CODE_NEEDED",
    "facebook-domain-verification": "dcsa",
    "fb:page_id": "DebtClearDCSA",
    // AI Bot Meta Tags
    "ai:title": "DCSA Debt Counsellors - Professional Debt Relief South Africa",
    "ai:description": "NCR registered debt counsellors (NCRDC3995) providing immediate debt relief, debt review, and credit repair services across South Africa. Free consultation, 12+ years experience.",
    "ai:category": "Financial Services",
    "ai:service_area": "South Africa",
    rating: "general",
    distribution: "global",
    "DC.title": "DCSA Debt Counsellors - Professional Debt Help South Africa",
    "DC.subject": "Debt Counselling, Financial Services, Debt Management, Debt Help, Debt Relief",
    "DC.description": "DCSA professional debt counselling, debt help and debt relief services in South Africa",
    "geo.region": "ZA",
    "geo.placename": "South Africa",
    language: "en-ZA",
    revisit: "7 days",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <head>
        {/* Facebook SDK for social feed embedding */}
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v18.0&appId=YOUR_APP_ID"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RT5LCR9SW4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RT5LCR9SW4', {
                anonymize_ip: true
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLayoutSchema()) }}
        />
      </head>
      <body className={`${roboto.variable} ${poppins.variable} ${roboto.className}`}>
        <SkipToContent />
        <Suspense fallback={null}>
          <ViewTracker />
        </Suspense>
        {children}
        <MotivationalQuotePopup />
        <Analytics />
      </body>
    </html>
  )
}
