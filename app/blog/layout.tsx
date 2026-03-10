import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Blog | DCSA - Debt Counselling & Financial Tips",
    template: "%s | DCSA Blog",
  },
  description:
    "Expert debt counselling insights, financial tips, and success stories from DCSA. Learn about debt review, budgeting, credit repair, and achieving financial freedom in South Africa.",
  keywords: [
    "debt counselling blog",
    "financial tips South Africa",
    "debt management advice",
    "debt review South Africa",
    "DCSA blog",
    "debt help blog",
    "financial education",
    "credit repair tips",
    "budgeting advice",
    "debt free South Africa",
  ],
  openGraph: {
    title: "DCSA Blog - Debt Counselling & Financial Advice",
    description:
      "Expert debt counselling insights and financial tips from DCSA. Learn about debt review, credit repair, and financial freedom in South Africa.",
    url: "https://www.dcsam.co.za/blog",
    siteName: "DCSA Debt Counselling",
    type: "website",
    images: [
      {
        url: "/images/dcsa-logo.png",
        width: 1200,
        height: 630,
        alt: "DCSA Blog - Debt Counselling & Financial Tips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DCSA Blog - Debt Counselling & Financial Advice",
    description: "Expert debt counselling insights and financial tips from DCSA.",
    images: ["/images/dcsa-logo.png"],
  },
  alternates: {
    canonical: "https://www.dcsam.co.za/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
