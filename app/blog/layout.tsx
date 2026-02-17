import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog & Updates | DCSA Debt Counsellors - Latest Financial Tips & Advice",
  description:
    "Stay updated with the latest debt counselling tips, financial advice, and success stories from DCSA. Follow our blog for expert insights on debt management, budgeting, and achieving financial freedom in South Africa.",
  keywords: [
    "debt counselling blog",
    "financial tips South Africa",
    "debt management advice",
    "DCSA updates",
    "debt help blog",
    "financial education",
    "debt clear tips",
    "budgeting advice",
  ],
  openGraph: {
    title: "DCSA Blog - Latest Debt Counselling Tips & Financial Advice",
    description:
      "Expert debt counselling insights and financial tips from DCSA. Stay informed about debt management strategies and success stories.",
    url: "https://www.dcsam.co.za/blog",
    type: "website",
    images: [
      {
        url: "/images/dcsa-logo.jpg",
        width: 1200,
        height: 630,
        alt: "DCSA Blog - Debt Counselling Tips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DCSA Blog - Latest Debt Counselling Tips & Financial Advice",
    description: "Expert debt counselling insights and financial tips from DCSA.",
    images: ["/images/dcsa-logo.jpg"],
  },
  alternates: {
    canonical: "https://www.dcsam.co.za/blog",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
