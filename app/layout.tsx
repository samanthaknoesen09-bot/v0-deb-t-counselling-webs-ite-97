import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { ViewTracker } from "@/components/view-tracker"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dcsam.co.za"),
  title: {
    default: "DCSA | DcSam Debt Counsellors - Debt Help & Debt Relief South Africa",
    template: "%s | DCSA DcSam Debt Counsellors",
  },
  description:
    "DCSA - DcSam Debt Counsellors offers professional debt help, debt relief, and debt counselling services in South Africa. Get expert guidance with 17+ years experience. Free budget calculator available.",
  keywords: [
    "DCSA",
    "DcSam",
    "dc sam",
    "dcsam",
    "debt",
    "debt help",
    "debt relief",
    "debt counselling",
    "debt counselling South Africa",
    "debt review",
    "debt management",
    "debt solutions",
    "budget calculator",
    "financial counselling",
    "debt consolidation",
    "credit repair",
    "financial planning",
    "budget planning",
    "savings coach",
    "over indebted",
    "debt restructuring",
    "NCR registered debt counsellor",
    "debt counsellor South Africa",
    "debt counsellor Port Elizabeth",
    "debt help South Africa",
    "debt relief South Africa",
  ],
  authors: [{ name: "DCSA DcSam Debt Counsellors", url: "https://www.dcsam.co.za" }],
  creator: "DCSA DcSam",
  publisher: "DCSA DcSam Debt Counsellors",
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.dcsam.co.za",
    siteName: "DCSA DcSam Debt Counsellors",
    title: "DCSA | DcSam - Professional Debt Help & Debt Relief South Africa",
    description:
      "DCSA - DcSam Debt Counsellors offers expert debt help, debt relief, and debt counselling services in South Africa with 17+ years experience. NCR registered debt counsellor.",
    images: [
      {
        url: "/images/dcsa-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DCSA DcSam Debt Counsellors - Professional Debt Help",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DCSA | DcSam - Professional Debt Help & Debt Relief",
    description:
      "DCSA - DcSam offers expert debt help and debt relief services in South Africa. Professional debt counselling with 17+ years experience.",
    images: ["/images/dcsa-logo.jpg"],
  },
  alternates: {
    canonical: "https://www.dcsam.co.za",
  },
  category: "Financial Services",
  classification: "Debt Counselling Services",
  other: {
    "google-site-verification": "WvDUKvcUNr3Dng8NU3MpW-Gcl4rpe31jmsHr4IPTHFk",
    "msvalidate.01": "PLEASE_ADD_YOUR_BING_VERIFICATION_CODE_HERE",
    "facebook-domain-verification": "dcsa",
    "fb:page_id": "DebtClearDCSA",
    rating: "general",
    distribution: "global",
    "DC.title": "DCSA DcSam Debt Counsellors - Professional Debt Help South Africa",
    "DC.subject": "Debt Counselling, Financial Services, Debt Management, Debt Help, Debt Relief",
    "DC.description": "DCSA DcSam professional debt counselling, debt help and debt relief services in South Africa",
    "geo.region": "ZA",
    "geo.placename": "South Africa",
    language: "en-ZA",
    revisit: "7 days",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-ZA">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "FinancialService",
                  "@id": "https://www.dcsam.co.za/#organization",
                  name: "DCSA DcSam Debt Counsellors",
                  alternateName: ["DCSA", "DcSam", "DC Sam", "Debt Clear SA", "dcsam"],
                  description:
                    "DCSA DcSam - Professional debt counselling, debt help and debt relief services in South Africa. NCR registered debt counsellor with 17+ years of experience helping South Africans achieve financial freedom.",
                  url: "https://www.dcsam.co.za",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.dcsam.co.za/images/dcsa-logo.jpg",
                    width: 512,
                    height: 512,
                  },
                  image: "https://www.dcsam.co.za/images/dcsa-logo.jpg",
                  telephone: "+27719006298",
                  email: "info@dcsam.co.za",
                  sameAs: ["https://www.facebook.com/DebtClearDCSA", "https://www.tiktok.com/@dcsa_debtclearsa"],
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "ZA",
                    addressRegion: "South Africa",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    addressCountry: "ZA",
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "South Africa",
                  },
                  serviceType: [
                    "Debt Help",
                    "Debt Relief",
                    "Debt Counselling",
                    "Debt Management",
                    "Financial Counselling",
                    "Budget Planning",
                    "Debt Review",
                    "Credit Repair",
                    "Savings Coaching",
                  ],
                  priceRange: "$$",
                  currenciesAccepted: "ZAR",
                  paymentAccepted: "Cash, Credit Card, Bank Transfer",
                  openingHours: "Mo-Fr 08:00-17:00",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Debt Counselling Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Debt Help & Debt Relief Services",
                          description:
                            "Professional debt help and debt relief including debt review, budget planning, and personalized debt management strategies.",
                          provider: {
                            "@id": "https://www.dcsam.co.za/#organization",
                          },
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Credit Repair Services",
                          description:
                            "Professional credit repair services to help improve your credit score and financial standing in South Africa.",
                          provider: {
                            "@id": "https://www.dcsam.co.za/#organization",
                          },
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Budget Planning & Savings Coaching",
                          description:
                            "Expert budget planning and savings coaching to help you manage expenses, track spending, and build financial stability.",
                          provider: {
                            "@id": "https://www.dcsam.co.za/#organization",
                          },
                        },
                      },
                    ],
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    bestRating: "5",
                    worstRating: "1",
                    ratingCount: "150",
                  },
                  founder: {
                    "@type": "Person",
                    name: "DcSam Counsellor",
                    jobTitle: "Registered Debt Counsellor",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.dcsam.co.za/#website",
                  url: "https://www.dcsam.co.za",
                  name: "DCSA DcSam Debt Counsellors",
                  description: "DCSA DcSam - Professional debt help, debt relief and debt counselling in South Africa",
                  publisher: {
                    "@id": "https://www.dcsam.co.za/#organization",
                  },
                  inLanguage: "en-ZA",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://www.dcsam.co.za/?s={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.dcsam.co.za/#webpage",
                  url: "https://www.dcsam.co.za",
                  name: "DCSA | DcSam - Professional Debt Help & Debt Relief South Africa",
                  description:
                    "DCSA DcSam - Get professional debt help, debt relief and debt counselling services with 17+ years experience.",
                  isPartOf: {
                    "@id": "https://www.dcsam.co.za/#website",
                  },
                  about: {
                    "@id": "https://www.dcsam.co.za/#organization",
                  },
                  primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: "https://www.dcsam.co.za/images/dcsa-logo.jpg",
                  },
                  inLanguage: "en-ZA",
                  breadcrumb: {
                    "@id": "https://www.dcsam.co.za/#breadcrumb",
                  },
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.dcsam.co.za/#breadcrumb",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://www.dcsam.co.za",
                    },
                  ],
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "DCSA DcSam Debt Counsellors",
              image: "https://www.dcsam.co.za/images/dcsa-logo.jpg",
              "@id": "https://www.dcsam.co.za",
              url: "https://www.dcsam.co.za",
              telephone: "+27719006298",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ZA",
              },
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "17:00",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ViewTracker />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
