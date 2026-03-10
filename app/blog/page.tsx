import type { Metadata } from "next"
import BlogClientPage from "./blog-client"

export const metadata: Metadata = {
  title: "DCSA Blog - Latest Debt Help Tips & Financial Advice",
  description:
    "Stay updated with DCSA's latest debt help tips, financial advice, and debt counselling insights. Read expert articles on debt review, credit repair, and budgeting to achieve financial freedom.",
  keywords: [
    "debt help blog",
    "debt counselling tips",
    "financial advice South Africa",
    "debt management blog",
    "debt review articles",
    "credit repair tips",
    "DCSA updates",
    "debt clear tips",
    "South Africa financial education",
  ],
  openGraph: {
    title: "DCSA Blog - Latest Debt Help Tips & Financial Advice",
    description:
      "Expert debt counselling insights, financial tips, and success stories from DCSA. Learn how to become debt free in South Africa.",
    url: "https://www.dcsam.co.za/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://www.dcsam.co.za/blog",
  },
}

export default function BlogPage() {
  return <BlogClientPage />
}
