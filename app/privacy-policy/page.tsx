import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | DCSA - Debt Counselling South Africa",
  description: "DCSA's privacy policy and POPIA compliance. Learn how we protect your personal information.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D3B66] mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: February 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">POPIA Compliance Statement</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed">
                DCSA (Debt Counselling South Africa) is committed to protecting your privacy and complying with the
                Protection of Personal Information Act (POPIA) No. 4 of 2013. This policy explains how we collect,
                use, store, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">Information We Collect</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed mb-3">
                We collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2">
                <li>Personal details: Name, surname, ID number, contact information</li>
                <li>Financial information: Income, expenses, debts, credit agreements</li>
                <li>Employment information: Employer details, salary information</li>
                <li>Bank account details for debt repayment purposes</li>
                <li>Website usage data through cookies and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">How We Use Your Information</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed mb-3">
                Your information is used solely for:
              </p>
              <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2">
                <li>Providing debt counselling and credit repair services</li>
                <li>Assessing your financial situation and eligibility for debt review</li>
                <li>Communicating with you about your debt counselling process</li>
                <li>Negotiating with creditors on your behalf</li>
                <li>Fulfilling legal and regulatory requirements (NCR compliance)</li>
                <li>Improving our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">Data Security</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2 mt-3">
                <li>SSL encryption for all data transmission</li>
                <li>Secure, password-protected database storage</li>
                <li>Limited access to personal information (staff on need-to-know basis)</li>
                <li>Regular security audits and updates</li>
                <li>Physical security measures at our offices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">Information Sharing</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2 mt-3">
                <li>Credit bureaus as required by the National Credit Act</li>
                <li>Your creditors for negotiation and restructuring purposes</li>
                <li>Payment distribution agencies for debt repayment</li>
                <li>The National Credit Regulator (NCR) when legally required</li>
                <li>Legal and professional advisors when necessary</li>
              </ul>
              <p className="text-[#0D3B66]/80 leading-relaxed mt-3">
                We will never sell or rent your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">Your Rights Under POPIA</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2">
                <li>Access your personal information we hold</li>
                <li>Request correction of inaccurate information</li>
                <li>Object to the processing of your information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Lodge a complaint with the Information Regulator</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">Data Retention</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed">
                We retain your personal information for as long as required by the National Credit Act and other
                applicable laws. Typically, this means:
              </p>
              <ul className="list-disc list-inside text-[#0D3B66]/80 space-y-2 mt-3">
                <li>Active debt counselling files: Duration of process plus 5 years</li>
                <li>Completed cases: 5 years after clearance certificate issued</li>
                <li>Financial records: 7 years as per tax regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">Cookies and Website Analytics</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed">
                Our website uses cookies to improve user experience and analyze website traffic. You can disable
                cookies in your browser settings, though this may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">Contact Us</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed mb-3">
                For privacy-related queries or to exercise your POPIA rights, contact:
              </p>
              <div className="bg-[#FFE5D9]/30 p-6 rounded-lg">
                <p className="text-[#0D3B66] font-medium">DCSA - Debt Counselling South Africa</p>
                <p className="text-[#0D3B66]/80 mt-2">Email: info@dcsam.co.za</p>
                <p className="text-[#0D3B66]/80">Phone: +27 71 900 6298</p>
                <p className="text-[#0D3B66]/80">Address: 81 6th Avenue, Newton Park, Gqeberha, 6045</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0D3B66] mb-4">Changes to This Policy</h2>
              <p className="text-[#0D3B66]/80 leading-relaxed">
                We may update this privacy policy from time to time. Changes will be posted on this page with an
                updated "Last Updated" date. Continued use of our services constitutes acceptance of the updated
                policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
