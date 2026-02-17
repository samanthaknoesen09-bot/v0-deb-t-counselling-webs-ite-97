import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | DCSA Debt Counselling",
  description:
    "Find answers to common questions about debt counselling, credit repair, and our services. Learn about the debt review process, costs, and how DCSA can help you.",
  keywords: [
    "debt counselling FAQ",
    "debt review questions",
    "DCSA FAQ",
    "debt counselling process",
    "credit repair questions",
    "debt help South Africa",
  ],
  alternates: {
    canonical: "https://www.dcsam.co.za/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions - DCSA Debt Counselling",
    description: "Get answers to your questions about debt counselling and credit repair services.",
    url: "https://www.dcsam.co.za/faq",
    type: "website",
  },
}

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is debt counselling?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Debt counselling (also known as debt review) is a legal process regulated by the National Credit Regulator (NCR) that helps over-indebted South Africans restructure their debt repayments. It consolidates all your debts into one affordable monthly payment while providing legal protection from creditors.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know if I need debt counselling?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You may benefit from debt counselling if you're struggling to meet monthly debt payments, using credit to pay other debts, receiving calls from creditors, or spending more than 40% of your income on debt repayments. Our free Money Map calculator can help assess your situation.",
        },
      },
      {
        "@type": "Question",
        name: "What does DCSA offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DCSA offers two main services: Debt Counselling (Debt Review) to restructure your debt into one affordable payment with legal protection, and Credit Repair to help you understand and improve your credit score. We provide compassionate, judgment-free support with free consultations.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the debt review process take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You get IMMEDIATE relief and legal protection from day one - no waiting period. The initial application and assessment take 1-2 weeks, and court finalization varies by case. The full debt review continues until your debts are paid off, typically 3-5 years depending on your repayment plan.",
        },
      },
      {
        "@type": "Question",
        name: "Will debt counselling affect my credit score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While under debt review, your credit report will show you're under debt counselling. However, this protects you from further negative marks. Once completed successfully, this status is removed and you can rebuild your credit with our credit repair guidance.",
        },
      },
      {
        "@type": "Question",
        name: "How much does debt counselling cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NCR-regulated fees: R50 application fee, R300-R350 admin fee, restructuring fee (your 1st month payment OR max R8,000 whichever is less), then 5% monthly aftercare fee (capped at R400-R450). After 24 months, aftercare reduces to 3%. Your first consultation is completely FREE.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get credit while under debt review?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, you cannot apply for or receive new credit while under debt review. This is actually a benefit as it prevents you from accumulating more debt while you're working to become debt-free.",
        },
      },
      {
        "@type": "Question",
        name: "Is DCSA registered with the NCR?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, DCSA is fully registered with the National Credit Regulator (NCR) under registration number NCRDC3995. You can verify our registration on the NCR website.",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0D3B66] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#0D3B66]/70 max-w-2xl mx-auto">
              Find answers to common questions about debt counselling, credit repair, and how DCSA can help you 
              achieve financial freedom.
            </p>
          </div>

          {/* General Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0D3B66] mb-6">General Questions</h2>
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="what-is-dcsa" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What is DCSA and what do you offer?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  DCSA (Debt Counselling South Africa) is an NCR registered debt counsellor (NCRDC3995) providing 
                  two main services: <strong>Debt Counselling (Debt Review)</strong> to restructure your debt into 
                  one affordable payment with legal protection, and <strong>Credit Repair</strong> to help you 
                  understand and improve your credit score. We offer compassionate, judgment-free support with free 
                  consultations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="who-can-help" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Who can benefit from DCSA's services?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  If you're juggling debt like it's a side hustle, we're here for you! We help anyone in South Africa who's behind 
                  on payments, using credit cards to pay other credit cards (eish!), getting those annoying creditor calls, or 
                  spending 40%+ of their salary on debt. Whether you're employed, self-employed, or just trying to keep it together 
                  - we've got you.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-start" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How do I get started with DCSA?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  Super easy! Start with our FREE consultation (no strings attached). Try our Money Map calculator to see where 
                  you're at, then ping us on WhatsApp, call, or book through the website. We'll chat about your situation, 
                  explain your options in plain English (no financial jargon!), and help you pick the best path. Zero judgment, 
                  zero pressure - promise.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Debt Counselling Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0D3B66] mb-6">Debt Counselling (Debt Review)</h2>
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="what-is-debt-counselling" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What is debt counselling?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  Debt counselling (also known as debt review) is a legal process regulated by the National Credit 
                  Regulator (NCR) that helps over-indebted South Africans. It restructures your debt repayments into 
                  one affordable monthly payment, reduces interest rates where possible, extends repayment terms, and 
                  provides legal protection from creditors and legal action.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-long" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How long does the debt review process take?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  <strong>You get IMMEDIATE relief and legal protection from day one - no waiting period.</strong> The 
                  timeline varies by stage: Initial application and assessment take 1-2 weeks. Proposal to creditors 
                  takes 2-4 weeks. Court finalization varies by case complexity. The full debt review continues until 
                  debts are paid off, usually 3-5 years depending on your repayment plan and debt amount.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="costs" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How much does debt counselling cost?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  All fees are regulated by the NCR and built into your restructured payment plan. Costs include: 
                  <strong>R50 application fee</strong>, <strong>R300-R350 admin fee</strong>, 
                  <strong>Restructuring fee</strong> (your 1st month payment OR maximum R8,000, whichever is less), 
                  and <strong>5% monthly aftercare fee</strong> (capped at R400-R450). After 24 months, the aftercare 
                  fee reduces to just 3%. Your initial consultation is always free with no obligation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="need-debt-counselling" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How do I know if I need debt counselling?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  You may benefit from debt counselling if you: struggle to meet monthly debt payments, use credit 
                  to pay other debts, receive regular calls from creditors, have legal action threatened against you, 
                  or spend more than 40% of income on debt repayments. Use our Money Map calculator for a free 
                  assessment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="credit-score" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Will debt counselling affect my credit score?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  While under debt review, your credit report will show you're receiving debt counselling. However, 
                  this actually protects you from further negative marks and legal action. Once you successfully 
                  complete the process, this status is removed from your record, and you can begin rebuilding your 
                  credit with our guidance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="get-credit" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I get credit while under debt review?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  No, you cannot apply for or receive new credit while under debt review. This is a protective 
                  measure that prevents you from accumulating more debt while working to become debt-free. Once 
                  you complete the process, you can access credit again responsibly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="protected" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What protection does debt counselling provide?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  Debt counselling provides legal protection from creditors taking legal action against you, 
                  repossessing assets, or garnishing your wages. Once you're under debt review, creditors must deal 
                  with your debt counsellor, giving you peace of mind to focus on your repayment plan.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Credit Repair Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0D3B66] mb-6">Credit Repair</h2>
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="what-is-credit-repair" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What is credit repair and how does it work?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  Credit repair involves reviewing your credit report, identifying errors or inaccuracies, disputing 
                  incorrect information with credit bureaus, and educating you on responsible credit behavior. We 
                  guide you through understanding your credit score, creating a plan to improve it, and maintaining 
                  good credit health long-term.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="credit-repair-time" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How long does credit repair take?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  Credit repair timelines vary depending on your situation. Disputing errors can take 20-30 business 
                  days per dispute. Improving your score through responsible behavior takes 3-12 months to see 
                  significant changes. We provide ongoing support and guidance throughout your credit repair journey.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="credit-score-improve" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can you guarantee my credit score will improve?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  We cannot guarantee specific results as credit scores depend on many factors. However, we can help 
                  you understand your credit report, dispute legitimate errors, and guide you on responsible credit 
                  behavior that typically leads to score improvement over time. Your commitment to the process is key.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Process & Practical Questions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0D3B66] mb-6">Process & Practical Information</h2>
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="ncr-registered" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is DCSA registered with the NCR?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  Yes, DCSA is fully registered with the National Credit Regulator (NCR) under registration number 
                  <strong> NCRDC3995</strong>. You can verify our registration on the NCR website. Only work with 
                  registered debt counsellors to ensure you're protected under the National Credit Act.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="documents-needed" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What documents do I need to apply?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  You'll need: Valid ID document, Latest payslips (3 months), Bank statements (3 months), Credit 
                  agreements for all debts, Proof of residence, and Marriage certificate (if applicable). Don't 
                  worry—we'll guide you through gathering everything needed during your consultation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="online-consultation" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Do you offer online consultations?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  Yes! We offer consultations via WhatsApp, telephone, and in-person at our Gqeberha office. We serve 
                  clients throughout South Africa, so distance is not a barrier to getting the help you need.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="spouse-included" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Does my spouse need to be included in debt counselling?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  If you're married in community of property, yes, your spouse must be included as you share a joint 
                  estate. If married out of community of property or not married, each person applies separately based 
                  on their individual debts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="withdrawal" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I withdraw from debt counselling?
                </AccordionTrigger>
                <AccordionContent className="text-[#0D3B66]/80 leading-relaxed">
                  Yes, you can withdraw at any time by providing written notice. However, withdrawing means you lose 
                  the legal protection, and creditors can resume collection actions. We recommend discussing your 
                  concerns with us first to explore alternatives.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Still Have Questions CTA */}
          <Card className="bg-gradient-to-br from-[#4DB6AC]/10 to-[#0D3B66]/5 border-2 border-[#4DB6AC]/20">
            <CardContent className="p-8 text-center space-y-6">
              <h2 className="text-2xl font-bold text-[#0D3B66]">
                Still Have Questions?
              </h2>
              <p className="text-[#0D3B66]/70 max-w-2xl mx-auto">
                We're here to help! Get in touch with our friendly team for personalized answers to your specific 
                situation. No judgment, just honest guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#4DB6AC] hover:bg-[#4DB6AC]/90"
                  asChild
                >
                  <a 
                    href="https://wa.me/27661937596?text=Hi%20DCSA%20%F0%9F%91%8B%20I%20have%20a%20question%20about%20debt%20counselling."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-[#0D3B66]"
                  asChild
                >
                  <a href="tel:+27719006298">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 071 900 6298
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
