import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms & Conditions | DCSA Debt Counselling",
  description: "Terms and conditions for DCSA debt counselling services. Understanding your rights and responsibilities.",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-slate">
          <h1 className="text-4xl font-bold text-[#0D3B66] mb-4">Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-ZA")}</p>

          <h2>1. Services Provided</h2>
          <p>
            DCSA (Debt Counselling South Africa), NCR registration number NCRDC3995, provides debt counselling services in accordance with the National Credit Act (NCA), Act 34 of 2005.
          </p>

          <h2>2. Debt Counselling Process</h2>
          <p>By applying for debt review, you acknowledge and agree that:</p>
          <ul>
            <li>You are over-indebted and require assistance managing your debt obligations</li>
            <li>You receive immediate legal protection from day one - no waiting period for relief</li>
            <li>Your credit profile will be flagged as "under debt review" during the process</li>
            <li>You may not incur further credit while under debt review</li>
            <li>Court finalization timelines vary by case complexity, but protection begins immediately</li>
            <li>You must continue making payments as agreed in the restructured plan</li>
          </ul>

          <h2>3. Fees and Payments</h2>
          <p>All fees charged by DCSA are regulated by the National Credit Regulator and include:</p>
          <ul>
            <li>Application fee: R50 (once-off)</li>
            <li>Restructuring fee: Maximum R8,000 (paid over time, not upfront)</li>
            <li>Monthly after-care fee: 5% of monthly payment (maximum R450)</li>
          </ul>
          <p>
            Fees are only charged once your debt restructuring is approved. The initial consultation is free with no obligation.
          </p>

          <h2>4. Client Responsibilities</h2>
          <p>As a client under debt review, you agree to:</p>
          <ul>
            <li>Provide accurate and complete financial information</li>
            <li>Make payments as per the agreed restructured payment plan</li>
            <li>Inform DCSA of any changes in your financial circumstances</li>
            <li>Not incur additional debt while under debt review</li>
            <li>Cooperate with the debt counselling process</li>
          </ul>

          <h2>5. DCSA Responsibilities</h2>
          <p>DCSA commits to:</p>
          <ul>
            <li>Conduct a thorough assessment of your financial situation</li>
            <li>Negotiate with creditors on your behalf for reduced payments</li>
            <li>Distribute payments to creditors as per the court-approved plan</li>
            <li>Provide ongoing support and guidance throughout the process</li>
            <li>Issue a clearance certificate upon successful completion</li>
          </ul>

          <h2>6. Withdrawal from Debt Review</h2>
          <p>
            You have the right to withdraw from debt review at any time by providing written notice. However, withdrawal before completion means:
          </p>
          <ul>
            <li>You will be responsible for full debt obligations at original terms</li>
            <li>Creditors may resume legal action</li>
            <li>Fees for services rendered up to withdrawal remain payable</li>
          </ul>

          <h2>7. Privacy and Confidentiality</h2>
          <p>
            All personal and financial information provided is treated as confidential and handled in accordance with POPIA (Protection of Personal Information Act). See our <a href="/privacy-policy" className="text-[#4DB6AC] hover:underline">Privacy Policy</a> for details.
          </p>

          <h2>8. Credit Bureau Reporting</h2>
          <p>
            While under debt review, your credit profile will show "under debt review" status. Upon successful completion and clearance, this notation will be removed. DCSA will liaise with credit bureaus on your behalf.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            DCSA will use reasonable skill and care in providing debt counselling services. However, we cannot guarantee specific outcomes with creditors or court proceedings. Each case depends on individual circumstances and creditor cooperation.
          </p>

          <h2>10. Dispute Resolution</h2>
          <p>
            Any disputes arising from these terms will be resolved through:
          </p>
          <ol>
            <li>Direct communication with DCSA management</li>
            <li>Escalation to the National Credit Regulator if unresolved</li>
            <li>Formal mediation or arbitration if necessary</li>
          </ol>

          <h2>11. Amendments</h2>
          <p>
            DCSA reserves the right to amend these terms in accordance with changes in legislation or NCR regulations. Clients will be notified of material changes.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            For questions about these terms:<br />
            Email: sam@dcsam.co.za<br />
            Phone: 081 777 9090<br />
            NCR Registration: NCRDC3995
          </p>

          <p className="text-sm text-muted-foreground italic mt-8">
            By proceeding with DCSA's debt counselling services, you acknowledge that you have read, understood, and agree to these terms and conditions.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
