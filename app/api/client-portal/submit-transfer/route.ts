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
    const { data: transfer, error: dbError } = await supabase
      .from("transfer_requests")
      .insert({
        client_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        id_number: formData.idNumber,
        email: formData.email,
        phone: formData.phone,
        current_dc_name: formData.currentDCName,
        current_dc_registration_number: formData.currentDCRegistrationNumber || null,
        current_dc_contact_number: formData.currentDCContactNumber || null,
        current_dc_email: formData.currentDCEmail || null,
        debt_review_start_date: formData.debtReviewStartDate || null,
        current_monthly_payment: parseFloat(formData.currentMonthlyPayment) || 0,
        number_of_creditors: parseInt(formData.numberOfCreditors) || null,
        reason_for_transfer: formData.reasonForTransfer,
        issues_with_current_dc: formData.issuesWithCurrentDC || null,
        authorize_contact_current_dc: formData.authorizeContactCurrentDC,
        authorize_transfer_of_records: formData.authorizeTransferOfRecords,
        understand_transfer_process: formData.understandTransferProcess,
        consent_to_process_personal_info: formData.consentToProcessPersonalInfo,
        status: "submitted",
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to save transfer request" },
        { status: 500 }
      )
    }



    // Send emails
    try {
      const resend = getResend()
      await resend.emails.send({
        from: "DCSA Client Portal <noreply@dcsam.co.za>",
        to: formData.email,
        subject: "Transfer Request Received - DCSA",
        html: `
          <h2>Transfer Request Received</h2>
          <p>Dear ${formData.firstName} ${formData.lastName},</p>
          <p>We have received your request to transfer your debt review to DCSA. We'll begin the transfer process immediately.</p>
          <h3>Request Summary:</h3>
          <ul>
            <li><strong>Request ID:</strong> ${transfer.id}</li>
            <li><strong>Current Debt Counsellor:</strong> ${formData.currentDCName}</li>
            <li><strong>Current Monthly Payment:</strong> R${formData.currentMonthlyPayment}</li>
            <li><strong>Status:</strong> Submitted</li>
          </ul>
          <h3>Next Steps:</h3>
          <ol>
            <li>We'll contact ${formData.currentDCName} to initiate the transfer</li>
            <li>Request your debt review file and payment history</li>
            <li>Notify credit bureaus of the transfer</li>
            <li>Contact you to confirm the transfer is complete</li>
          </ol>
          <p><strong>Important:</strong> Please continue making your monthly payments until we notify you otherwise.</p>
          <p>If you have questions, contact us:</p>
          <p>Phone: +27 71 900 6298<br/>Email: info@dcsam.co.za</p>
          <p>Best regards,<br/>DCSA Team</p>
        `,
      })

      await resend.emails.send({
        from: "DCSA Client Portal <noreply@dcsam.co.za>",
        to: "info@dcsam.co.za",
        subject: `New Transfer Request - ${formData.firstName} ${formData.lastName}`,
        html: `
          <h2>New Debt Review Transfer Request</h2>
          <h3>Client Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
            <li><strong>ID Number:</strong> ${formData.idNumber}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone}</li>
          </ul>
          <h3>Current Debt Counsellor:</h3>
          <ul>
            <li><strong>Name:</strong> ${formData.currentDCName}</li>
            <li><strong>NCR Number:</strong> ${formData.currentDCRegistrationNumber || "Not provided"}</li>
            <li><strong>Contact:</strong> ${formData.currentDCContactNumber || "Not provided"}</li>
            <li><strong>Email:</strong> ${formData.currentDCEmail || "Not provided"}</li>
          </ul>
          <h3>Debt Review Details:</h3>
          <ul>
            <li><strong>Start Date:</strong> ${formData.debtReviewStartDate || "Not provided"}</li>
            <li><strong>Current Monthly Payment:</strong> R${formData.currentMonthlyPayment}</li>
            <li><strong>Number of Creditors:</strong> ${formData.numberOfCreditors || "Not provided"}</li>
          </ul>
          <h3>Reason for Transfer:</h3>
          <p>${formData.reasonForTransfer}</p>
          ${formData.issuesWithCurrentDC ? `<h3>Issues with Current DC:</h3><p>${formData.issuesWithCurrentDC}</p>` : ''}
          <p><strong>Request ID:</strong> ${transfer.id}</p>
          <p>Please begin the transfer process by contacting ${formData.currentDCName}.</p>
        `,
      })



      await supabase.from("email_logs").insert([
        {
          recipient: formData.email,
          subject: "Transfer Request Received - DCSA",
          application_type: "transfer",
          application_id: transfer.id,
          status: "sent",
        },
        {
          recipient: "info@dcsam.co.za",
          subject: `New Transfer Request - ${formData.firstName} ${formData.lastName}`,
          application_type: "transfer",
          application_id: transfer.id,
          status: "sent",
        },
      ])
    } catch (emailError) {
      console.error("Email error:", emailError)
    }

    return NextResponse.json({
      success: true,
      transfer,
      message: "Transfer request submitted successfully",
    })
  } catch (error) {
    console.error("Transfer request error:", error)
    return NextResponse.json(
      { error: "Failed to submit transfer request" },
      { status: 500 }
    )
  }
}
