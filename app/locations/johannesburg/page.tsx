import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Debt Counsellor Johannesburg | Registered NCR Debt Counselling & Credit Repair",
  description:
    "Professional debt counsellor in Johannesburg. NCR registered debt counselling services (NCRDC3995). Get debt help, debt relief, and credit repair in Johannesburg. Free consultation available.",
  keywords: [
    "debt counsellor Johannesburg",
    "debt counselling Johannesburg",
    "debt help Johannesburg",
    "credit repair Johannesburg",
    "debt counsellor near me Johannesburg",
    "NCR registered debt counsellor Johannesburg",
    "debt relief Johannesburg",
    "debt review Johannesburg",
  ],
  alternates: {
    canonical: "https://www.dcsam.co.za/locations/johannesburg",
  },
}

export default function JohannesburgPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-[#F8F9FA]">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Serving Johannesburg</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Debt Counsellor in Johannesburg
              </h1>
              <p className="text-xl text-muted-foreground">
                Professional NCR registered debt counselling and credit repair services for Johannesburg residents
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Are you looking for a reliable debt counsellor in Johannesburg? <span className="text-primary font-semibold">DC</span><span className="text-black font-semibold">SA</span> (DCSam) provides professional debt counselling and credit repair services to individuals and families throughout Johannesburg and surrounding areas.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary/20 not-prose">
                <div className="flex items-start gap-4">
                  <Award className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">NCR Registered Debt Counsellor</h3>
                    <p className="text-muted-foreground">
                      Fully registered with the National Credit Regulator (NCR) under registration number NCRDC3995. We provide compliant, professional debt counselling services.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mt-8">Debt Counselling Services in Johannesburg</h2>
              <p>
                Whether you're in Sandton, Roodepoort, Randburg, or anywhere else in Johannesburg, we offer:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Debt review and restructuring</li>
                <li>Credit repair services</li>
                <li>Budget planning and financial counselling</li>
                <li>Free debt consultations</li>
                <li>Online and in-person consultations available</li>
              </ul>

              <h2 className="text-3xl font-bold text-foreground mt-8">
                Why Choose <span className="text-primary">DC</span><span className="text-black">SA</span> for Debt Help in Johannesburg?
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>NCR Registered:</strong> Fully compliant with National Credit Regulator standards</li>
                <li><strong>Proven Track Record:</strong> Helping Johannesburg residents become debt-free</li>
                <li><strong>Compassionate Service:</strong> No judgment, just honest support</li>
                <li><strong>Convenient Consultations:</strong> Online meetings available for your convenience</li>
                <li><strong>Free Calculators:</strong> Use our Money Map and savings calculators to understand your finances</li>
              </ul>

              <div className="bg-[#FFD93D]/10 p-6 rounded-lg border-2 border-[#FFD93D]/20 not-prose mt-8">
                <h3 className="text-2xl font-bold text-[#0D3B66] mb-4">Get Started Today</h3>
                <p className="text-[#0D3B66]/70 mb-6">
                  Take the first step towards financial freedom. Contact us for a free, no-obligation consultation.
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
