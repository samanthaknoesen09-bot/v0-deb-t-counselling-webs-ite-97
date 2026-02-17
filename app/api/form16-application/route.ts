import { NextResponse } from "next/server"
import { Resend } from "resend"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const submittedAt = new Date().toISOString()

    // Prepare structured data for ClickUp via Zapier
    const clickUpData = {
      type: "Form 16 - Debt Review Application",
      clientType: "New Client",
      status: "New Application",
      submittedAt,
      
      // Client Details
      clientName: `${body.personalInfo?.firstName || ""} ${body.personalInfo?.surname || ""}`.trim(),
      email: body.personalInfo?.email || "",
      phone: body.personalInfo?.cellphone || body.personalInfo?.telephone || "",
      idNumber: body.personalInfo?.idNumber || "",
      
      // Address
      address: `${body.personalInfo?.streetAddress || ""}, ${body.personalInfo?.suburb || ""}, ${body.personalInfo?.city || ""}, ${body.personalInfo?.postalCode || ""}`.trim(),
      
      // Employment
      employer: body.personalInfo?.employer || "",
      occupation: body.personalInfo?.occupation || "",
      employmentStartDate: body.personalInfo?.employmentStartDate || "",
      
      // Financial Summary
      totalGrossIncome: body.income?.totalGross || 0,
      totalDeductions: body.deductions?.totalDeductions || 0,
      netIncome: body.income?.netIncome || 0,
      totalMonthlyCommitments: body.monthlyCommitments?.totalCommitments || 0,
      totalDebtObligations: body.debtObligations?.totalDebt || 0,
      
      // Full Application Data
      fullApplication: body,
      
      // Metadata for routing
      source: "DCSA Website - Form 16",
      priority: "High",
    }

    // Send to Zapier webhook (which will create task in ClickUp)
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    if (zapierWebhookUrl) {
      const zapierResponse = await fetch(zapierWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clickUpData),
      })

      if (!zapierResponse.ok) {
        console.error("[v0] Failed to send to Zapier:", await zapierResponse.text())
      } else {
        console.log("[v0] Form 16 sent to Zapier/ClickUp successfully")
      }
    }

    // Send email notification to sam@dcsam.co.za
    try {
      const resend = getResend()
      await resend.emails.send({
        from: "DCSA Website <noreply@dcsam.co.za>",
        to: "sam@dcsam.co.za",
        subject: `New Form 16 Application - ${clickUpData.clientName}`,
        html: `
          <h2>New Debt Review Application Received</h2>
          <p><strong>Submitted:</strong> ${new Date(submittedAt).toLocaleString("en-ZA")}</p>
          
          <h3>Client Information</h3>
          <ul>
            <li><strong>Name:</strong> ${clickUpData.clientName}</li>
            <li><strong>ID Number:</strong> ${clickUpData.idNumber}</li>
            <li><strong>Email:</strong> ${clickUpData.email}</li>
            <li><strong>Phone:</strong> ${clickUpData.phone}</li>
            <li><strong>Address:</strong> ${clickUpData.address}</li>
          </ul>
          
          <h3>Employment Details</h3>
          <ul>
            <li><strong>Employer:</strong> ${clickUpData.employer}</li>
            <li><strong>Occupation:</strong> ${clickUpData.occupation}</li>
            <li><strong>Employment Start:</strong> ${clickUpData.employmentStartDate}</li>
          </ul>
          
          <h3>Financial Summary</h3>
          <ul>
            <li><strong>Gross Income:</strong> R${clickUpData.totalGrossIncome.toLocaleString()}</li>
            <li><strong>Total Deductions:</strong> R${clickUpData.totalDeductions.toLocaleString()}</li>
            <li><strong>Net Income:</strong> R${clickUpData.netIncome.toLocaleString()}</li>
            <li><strong>Monthly Commitments:</strong> R${clickUpData.totalMonthlyCommitments.toLocaleString()}</li>
            <li><strong>Total Debt:</strong> R${clickUpData.totalDebtObligations.toLocaleString()}</li>
          </ul>
          
          <p><em>Full application details have been sent to your ClickUp workspace.</em></p>
        `,
      })
      console.log("[v0] Email notification sent to sam@dcsam.co.za")
    } catch (emailError) {
      console.error("[v0] Failed to send email:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      success: true,
      message: "Application submitted successfully" 
    })

  } catch (error) {
    console.error("[v0] Form 16 submission error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
