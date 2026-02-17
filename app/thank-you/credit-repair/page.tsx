import type { Metadata } from "next"
import ThankYouCreditRepairClient from "./credit-repair-client"

export const metadata: Metadata = {
  title: "Application Submitted - Thank You | DCSA",
  description: "Your credit repair application has been successfully submitted. We'll contact you within 24 hours.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouCreditRepairPage() {
  return <ThankYouCreditRepairClient />
}
