import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.json()

    // Save to database
    const { data: application, error: dbError } = await supabase
      .from("form16_applications")
      .insert({
        client_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        id_number: formData.idNumber,
        email: formData.email,
        phone: formData.phone,
        marital_status: formData.maritalStatus,
        street_address: formData.streetAddress,
        suburb: formData.suburb,
        city: formData.city,
        province: formData.province,
        postal_code: formData.postalCode,
        employment_status: formData.employmentStatus,
        employer: formData.employer,
        monthly_income: parseFloat(formData.monthlyIncome) || 0,
        other_income: parseFloat(formData.otherIncome) || 0,
        home_loans: parseFloat(formData.homeLoans) || 0,
        vehicle_loans: parseFloat(formData.vehicleLoans) || 0,
        personal_loans: parseFloat(formData.personalLoans) || 0,
        credit_cards: parseFloat(formData.creditCards) || 0,
        store_credit_accounts: parseFloat(formData.storeCreditAccounts) || 0,
        other_debts: parseFloat(formData.otherDebts) || 0,
        total_monthly_debt_payment: parseFloat(formData.totalMonthlyDebtPayment) || 0,
        rent_or_bond: parseFloat(formData.rentOrBond) || 0,
        utilities: parseFloat(formData.utilities) || 0,
        groceries: parseFloat(formData.groceries) || 0,
        transport: parseFloat(formData.transport) || 0,
        insurance: parseFloat(formData.insurance) || 0,
        medical: parseFloat(formData.medical) || 0,
        education: parseFloat(formData.education) || 0,
        other_expenses: parseFloat(formData.otherExpenses) || 0,
        reason_for_debt_review: formData.reasonForDebtReview || null,
        current_financial_difficulties: formData.currentFinancialDifficulties || null,
        poa_agreement: formData.poaAgreement,
        consent_to_contact_creditors: formData.consentToContactCreditors,
        consent_to_process_personal_info: formData.consentToProcessPersonalInfo,
        understand_debt_review_process: formData.understandDebtReviewProcess,
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



    // Send email to client
    try {
      const resend = getResend()
      await resend.emails.send({
        from: "DCSA Client Portal <noreply@dcsam.co.za>",
        to: formData.email,
        subject: "Form 16 Application Received - DCSA",
        html: `
          <h2>Thank You for Your Application</h2>
          <p>Dear ${formData.firstName} ${formData.lastName},</p>
          <p>We have received your Form 16 debt review application. Our team will review your submission and contact you within 24-48 hours.</p>
          <h3>Application Summary:</h3>
          <ul>
            <li><strong>Application ID:</strong> ${application.id}</li>
            <li><strong>Monthly Income:</strong> R${formData.monthlyIncome}</li>
            <li><strong>Total Monthly Debt Payments:</strong> R${formData.totalMonthlyDebtPayment}</li>
            <li><strong>Status:</strong> Submitted</li>
          </ul>
          <p>If you have any questions, please contact us:</p>
          <p>Phone: +27 71 900 6298<br/>Email: info@dcsam.co.za</p>
          <p>Best regards,<br/>DCSA Team</p>
        `,
      })

      // Send email to DCSA office
      await resend.emails.send({
        from: "DCSA Client Portal <noreply@dcsam.co.za>",
        to: "info@dcsam.co.za",
        subject: `New Form 16 Application - ${formData.firstName} ${formData.lastName}`,
        html: `
          <h2>New Form 16 Debt Review Application</h2>
          <h3>Client Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
            <li><strong>ID Number:</strong> ${formData.idNumber}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone}</li>
            <li><strong>Marital Status:</strong> ${formData.maritalStatus}</li>
          </ul>
          <h3>Financial Summary:</h3>
          <ul>
            <li><strong>Monthly Income:</strong> R${formData.monthlyIncome}</li>
            <li><strong>Other Income:</strong> R${formData.otherIncome || 0}</li>
            <li><strong>Total Monthly Debt:</strong> R${formData.totalMonthlyDebtPayment}</li>
            <li><strong>Employment Status:</strong> ${formData.employmentStatus}</li>
          </ul>
          <h3>Debt Breakdown:</h3>
          <ul>
            <li>Home Loans: R${formData.homeLoans || 0}</li>
            <li>Vehicle Loans: R${formData.vehicleLoans || 0}</li>
            <li>Personal Loans: R${formData.personalLoans || 0}</li>
            <li>Credit Cards: R${formData.creditCards || 0}</li>
            <li>Store Credit: R${formData.storeCreditAccounts || 0}</li>
            <li>Other Debts: R${formData.otherDebts || 0}</li>
          </ul>
          <h3>Address:</h3>
          <p>${formData.streetAddress}${formData.suburb ? ', ' + formData.suburb : ''}, ${formData.city}, ${formData.province} ${formData.postalCode}</p>
          ${formData.reasonForDebtReview ? `<h3>Reason for Debt Review:</h3><p>${formData.reasonForDebtReview}</p>` : ''}
          ${formData.currentFinancialDifficulties ? `<h3>Financial Difficulties:</h3><p>${formData.currentFinancialDifficulties}</p>` : ''}
          <p><strong>Application ID:</strong> ${application.id}</p>
          <p>Please review this application in the client portal admin panel.</p>
        `,
      })



      // Log email sent in database
      await supabase.from("email_logs").insert({
        recipient: formData.email,
        subject: "Form 16 Application Received - DCSA",
        application_type: "form16",
        application_id: application.id,
        status: "sent",
      })

      await supabase.from("email_logs").insert({
        recipient: "info@dcsam.co.za",
        subject: `New Form 16 Application - ${formData.firstName} ${formData.lastName}`,
        application_type: "form16",
        application_id: application.id,
        status: "sent",
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      application,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("Form 16 submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    )
  }
}
