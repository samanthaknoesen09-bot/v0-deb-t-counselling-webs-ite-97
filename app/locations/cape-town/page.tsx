import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Debt Counsellor Cape Town | NCR Registered Debt Counselling & Credit Repair",
  description:
    "Professional debt counsellor in Cape Town. NCR registered debt counselling services (NCRDC3995). Get debt help, debt relief, and credit repair in Cape Town. Free consultation available.",
  keywords: [
    "debt counsellor Cape Town",
    "debt counselling Cape Town",
    "debt help Cape Town",
    "credit repair Cape Town",
    "debt counsellor near me Cape Town",
    "NCR registered debt counsellor Cape Town",
    "debt relief Cape Town",
    "debt review Cape Town",
  ],
  alternates: {
    canonical: "https://www.dcsam.co.za/locations/cape-town",
  },
}

export default function CapeTownPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-[#F8F9FA]">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#4DB6AC]/10 px-4 py-2 rounded-full mb-4">
                <MapPin className="h-4 w-4 text-[#4DB6AC]" />
                <span className="text-sm font-medium text-[#0D3B66]">Serving Cape Town</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0D3B66] mb-4">
                Debt Counsellor in Cape Town
              </h1>
              <p className="text-xl text-[#0D3B66]/70">
                Professional NCR registered debt counselling and credit repair services for Cape Town residents
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-[#0D3B66]/80 space-y-6">
              <p>
                Looking for a trusted debt counsellor in Cape Town? DCSA (DCSam) provides expert debt counselling and credit repair services to help Cape Town residents overcome financial challenges and achieve debt-free living.
              </p>

              <div className="bg-[#4DB6AC]/10 p-6 rounded-lg border-2 border-[#4DB6AC]/20 not-prose">
                <div className="flex items-start gap-4">
                  <Award className="h-8 w-8 text-[#4DB6AC] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#0D3B66] mb-2">NCR Registered Debt Counsellor</h3>
                    <p className="text-[#0D3B66]/70">
                      Fully registered with the National Credit Regulator (NCR) under registration number NCRDC3995. Professional, compliant debt counselling services.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#0D3B66] mt-8">Debt Help Services in Cape Town</h2>
              <p>
                Serving the entire Cape Town area including Bellville, Somerset West, Brackenfell, and beyond:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comprehensive debt review and restructuring</li>
                <li>Professional credit repair services</li>
                <li>Personalized budget planning</li>
                <li>Free debt consultations</li>
                <li>Virtual consultations available</li>
              </ul>

              <h2 className="text-3xl font-bold text-foreground mt-8">
                Why Cape Town Residents Choose <span className="text-primary">DC</span><span className="text-black">SA</span>
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>NCR Compliant:</strong> Registered and regulated by the National Credit Regulator</li>
                <li><strong>Experience:</strong> Successfully helping Cape Town families achieve financial freedom</li>
                <li><strong>Compassionate Approach:</strong> Judgment-free support every step of the way</li>
                <li><strong>Flexible Consultations:</strong> Online and phone consultations for your convenience</li>
                <li><strong>Free Tools:</strong> Access our Money Map calculator and savings calculator</li>
              </ul>

              <div className="bg-[#FFD93D]/10 p-6 rounded-lg border-2 border-[#FFD93D]/20 not-prose mt-8">
                <h3 className="text-2xl font-bold text-[#0D3B66] mb-4">Ready to Get Debt Help in Cape Town?</h3>
                <p className="text-[#0D3B66]/70 mb-6">
                  Contact us today for a free consultation. Let's work together to create your path to financial freedom.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white" asChild>
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white" asChild>
                    <a href="tel:+27719006298">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
