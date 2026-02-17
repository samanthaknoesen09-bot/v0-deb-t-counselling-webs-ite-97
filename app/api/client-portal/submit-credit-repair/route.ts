import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.json()

    // Save to database
    const { data: application, error: dbError } = await supabase
      .from("credit_repair_applications")
      .insert({
        client_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        id_number: formData.idNumber,
        email: formData.email,
        phone: formData.phone,
        credit_score: formData.creditScore || null,
        credit_bureaus: formData.creditBureaus,
        specific_issues: formData.specificIssues,
        issue_description: formData.issueDescription || null,
        dispute_accounts: formData.disputeAccounts || null,
        dispute_reasons: formData.disputeReasons || null,
        desired_outcome: formData.desiredOutcome,
        timeframe: formData.timeframe || null,
        poa_agreement: formData.poaAgreement,
        consent_to_dispute_on_behalf: formData.consentToDisputeOnBehalf,
        consent_to_contact_bureaus: formData.consentToContactBureaus,
        consent_to_process_personal_info: formData.consentToProcessPersonalInfo,
        understand_credit_repair_process: formData.understandCreditRepairProcess,
        status: "submitted",
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to save application" },
        { status: 500 }
      )
    }



    // Send emails
    try {
      const resend = getResend()
      await resend.emails.send({
        from: "DCSA Client Portal <noreply@dcsam.co.za>",
        to: formData.email,
        subject: "Credit Repair Application Received - DCSA",
        html: `
          <h2>Thank You for Your Application</h2>
          <p>Dear ${formData.firstName} ${formData.lastName},</p>
          <p>We have received your credit repair application. Our credit specialists will review your submission and contact you within 24-48 hours to discuss your case.</p>
          <h3>Application Summary:</h3>
          <ul>
            <li><strong>Application ID:</strong> ${application.id}</li>
            <li><strong>Credit Bureaus:</strong> ${formData.creditBureaus.join(", ")}</li>
            <li><strong>Issues:</strong> ${formData.specificIssues.join(", ")}</li>
            <li><strong>Status:</strong> Submitted</li>
          </ul>
          <p>What happens next:</p>
          <ul>
            <li>We'll review your credit reports</li>
            <li>Identify items to dispute</li>
            <li>Begin the dispute process with credit bureaus</li>
            <li>Provide you with monthly updates</li>
          </ul>
          <p>If you have questions, contact us:</p>
          <p>Phone: +27 71 900 6298<br/>Email: info@dcsam.co.za</p>
          <p>Best regards,<br/>DCSA Credit Repair Team</p>
        `,
      })

      await resend.emails.send({
        from: "DCSA Client Portal <noreply@dcsam.co.za>",
        to: "info@dcsam.co.za",
        subject: `New Credit Repair Application - ${formData.firstName} ${formData.lastName}`,
        html: `
          <h2>New Credit Repair Application</h2>
          <h3>Client Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
            <li><strong>ID Number:</strong> ${formData.idNumber}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone}</li>
            <li><strong>Current Credit Score:</strong> ${formData.creditScore || "Not provided"}</li>
          </ul>
          <h3>Credit Issues:</h3>
          <ul>
            <li><strong>Credit Bureaus Checked:</strong> ${formData.creditBureaus.join(", ")}</li>
            <li><strong>Specific Issues:</strong> ${formData.specificIssues.join(", ")}</li>
          </ul>
          ${formData.issueDescription ? `<h3>Issue Description:</h3><p>${formData.issueDescription}</p>` : ''}
          ${formData.disputeAccounts ? `<h3>Accounts to Dispute:</h3><p>${formData.disputeAccounts}</p>` : ''}
          ${formData.disputeReasons ? `<h3>Dispute Reasons:</h3><p>${formData.disputeReasons}</p>` : ''}
          <h3>Goals:</h3>
          <p><strong>Desired Outcome:</strong> ${formData.desiredOutcome}</p>
          ${formData.timeframe ? `<p><strong>Timeframe:</strong> ${formData.timeframe}</p>` : ''}
          <p><strong>Application ID:</strong> ${application.id}</p>
        `,
      })



      await supabase.from("email_logs").insert([
        {
          recipient: formData.email,
          subject: "Credit Repair Application Received - DCSA",
          application_type: "credit_repair",
          application_id: application.id,
          status: "sent",
        },
        {
          recipient: "info@dcsam.co.za",
          subject: `New Credit Repair Application - ${formData.firstName} ${formData.lastName}`,
          application_type: "credit_repair",
          application_id: application.id,
          status: "sent",
        },
      ])
    } catch (emailError) {
      console.error("Email error:", emailError)
    }

    return NextResponse.json({
      success: true,
      application,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("Credit repair submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    )
  }
}
