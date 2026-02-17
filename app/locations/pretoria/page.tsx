import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Debt Counsellor Pretoria | NCR Registered Debt Counselling & Credit Repair",
  description:
    "Professional debt counsellor in Pretoria. NCR registered debt counselling services (NCRDC3995). Get debt help, debt relief, and credit repair in Pretoria & Tshwane. Free consultation.",
  keywords: [
    "debt counsellor Pretoria",
    "debt counselling Pretoria",
    "debt help Pretoria",
    "credit repair Pretoria",
    "debt counsellor near me Pretoria",
    "NCR registered debt counsellor Pretoria",
    "debt relief Pretoria",
    "debt review Pretoria",
    "debt counsellor Tshwane",
  ],
  alternates: {
    canonical: "https://www.dcsam.co.za/locations/pretoria",
  },
}

export default function PretoriaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-[#F8F9FA]">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Serving Pretoria & Tshwane</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Debt Counsellor in Pretoria
              </h1>
              <p className="text-xl text-muted-foreground">
                Professional NCR registered debt counselling and credit repair services for Pretoria residents
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Searching for a trusted debt counsellor in Pretoria? <span className="text-primary font-semibold">DC</span><span className="text-black font-semibold">SA</span> (DCSam) provides expert debt counselling and credit repair services to help Pretoria and Tshwane residents overcome financial challenges and achieve debt-free living.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary/20 not-prose">
                <div className="flex items-start gap-4">
                  <Award className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">NCR Registered Debt Counsellor</h3>
                    <p className="text-muted-foreground">
                      Fully registered with the National Credit Regulator (NCR) under registration number NCRDC3995. Providing professional, compliant debt counselling services.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mt-8">Debt Counselling Services in Pretoria</h2>
              <p>
                Serving Centurion, Midrand, Menlyn, Hatfield, Brooklyn, and all Pretoria suburbs:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Professional debt review and restructuring</li>
                <li>Credit repair services</li>
                <li>Budget planning and financial guidance</li>
                <li>Free debt consultations</li>
                <li>Online and phone consultations available</li>
              </ul>

              <h2 className="text-3xl font-bold text-foreground mt-8">
                Why Pretoria Residents Choose <span className="text-primary">DC</span><span className="text-black">SA</span>
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>NCR Compliant:</strong> Registered and regulated by the National Credit Regulator</li>
                <li><strong>Experienced:</strong> Successfully helping Pretoria families become debt-free</li>
                <li><strong>Compassionate:</strong> Judgment-free support throughout your journey</li>
                <li><strong>Flexible:</strong> Virtual consultations to fit your schedule</li>
                <li><strong>Free Calculators:</strong> Use our Money Map and savings calculators</li>
              </ul>

              <div className="bg-[#FFD93D]/10 p-6 rounded-lg border-2 border-[#FFD93D]/20 not-prose mt-8">
                <h3 className="text-2xl font-bold text-[#0D3B66] mb-4">Ready to Get Debt Help in Pretoria?</h3>
                <p className="text-[#0D3B66]/70 mb-6">
                  Contact us today for a free consultation. Let's create your personalized path to financial freedom.
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
