import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Sitemap | DCSA Debt Counsellors",
  description:
    "Complete sitemap of DCSA Debt Counselling website. Find all our pages including debt services, budget calculator, and blog posts.",
  alternates: {
    canonical: "https://www.dcsam.co.za/sitemap-html", // Updated to production domain
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HtmlSitemap() {
  const pages = [
    {
      title: "Home",
      url: "/",
      description: "Professional debt counselling and debt clear solutions in South Africa",
    },
    {
      title: "Budget Calculator",
      url: "/calculator",
      description: "Free budget calculator to assess your financial situation and debt levels",
    },
    {
      title: "Blog",
      url: "/blog",
      description: "Latest debt counselling tips, financial advice, and success stories",
    },
    {
      title: "HTML Sitemap",
      url: "/sitemap-html",
      description: "Complete list of all pages on our website",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Site Map</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find all the pages and resources available on the DCSA Debt Counselling website. We provide professional
            debt help, financial counselling, and debt clear solutions throughout South Africa.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Main Pages</h2>
              <ul className="space-y-4">
                {pages.map((page) => (
                  <li key={page.url} className="border-l-4 border-primary pl-4">
                    <Link href={page.url} className="text-lg font-medium text-primary hover:underline">
                      {page.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{page.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Debt Clear Solutions & Financial Counselling</span> - Comprehensive debt
                  review and management
                </li>
                <li>
                  <span className="font-medium">Credit Repair Services</span> - Improve your credit score with proven
                  strategies
                </li>
                <li>
                  <span className="font-medium">Budget Planning & Savings Coaching</span> - Track expenses and build
                  financial stability
                </li>
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+27719006298" className="text-primary hover:underline">
                    +27 71 900 6298
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@dcsam.co.za" className="text-primary hover:underline">
                    info@dcsam.co.za
                  </a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href="https://wa.me/27719006298"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat with us on WhatsApp
                  </a>
                </p>
                <p>
                  <strong>Facebook:</strong>{" "}
                  <a
                    href="https://www.facebook.com/DebtClearDCSA"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow us on Facebook
                  </a>
                </p>
              </div>
            </section>

            <section className="mt-12 p-6 bg-muted rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">About DCSA</h2>
              <p className="text-muted-foreground">
                DCSA is a professional debt counselling service dedicated to helping South Africans
                achieve financial freedom. We are NCR registered debt counsellors providing personalized debt management
                plans, budget planning, credit repair, and financial guidance. Our judgment-free approach ensures you
                receive compassionate support throughout your debt-free journey.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
