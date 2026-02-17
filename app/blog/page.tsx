import type { Metadata } from "next"
import BlogClientPage from "./blog-client"

export const metadata: Metadata = {
  title: "DCSA Blog - Latest Debt Help Tips & Financial Advice | Debt Counselling Updates",
  description:
    "Stay updated with DCSA's latest debt help tips, financial advice, and debt counselling insights. Follow our blog for practical solutions to manage debt, improve credit scores, and achieve financial freedom in South Africa.",
  keywords: [
    "debt help blog",
    "debt counselling tips",
    "financial advice South Africa",
    "debt management blog",
    "DCSA updates",
    "debt clear tips",
  ],
  alternates: {
    canonical: "https://dcsam.co.za/blog",
  },
  openGraph: {
    title: "DCSA Blog - Latest Debt Help Tips & Financial Advice",
    description: "Get expert debt counselling tips and financial advice from DCSA's experienced team.",
    url: "https://dcsam.co.za/blog",
    type: "website",
  },
}

export default function BlogPage() {
  return <BlogClientPage />
}
