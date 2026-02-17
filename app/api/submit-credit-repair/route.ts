import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Email to Sam
    const emailBody = `
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0D3B66; border-bottom: 3px solid #4DB6AC; padding-bottom: 10px;">
        New Credit Repair Application
      </h1>
      
      <h2 style="color: #4DB6AC; margin-top: 30px;">Personal Information</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Full Name:</strong></td>
          <td style="padding: 8px;">${formData.firstName} ${formData.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>ID Number:</strong></td>
          <td style="padding: 8px;">${formData.idNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Date of Birth:</strong></td>
          <td style="padding: 8px;">${formData.dateOfBirth}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Email:</strong></td>
          <td style="padding: 8px;">${formData.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Phone:</strong></td>
          <td style="padding: 8px;">${formData.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Physical Address:</strong></td>
          <td style="padding: 8px;">${formData.physicalAddress}</td>
        </tr>
        ${formData.postalAddress ? `
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Postal Address:</strong></td>
          <td style="padding: 8px;">${formData.postalAddress}</td>
        </tr>
        ` : ''}
      </table>

      <h2 style="color: #4DB6AC; margin-top: 30px;">Employment Information</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Employment Status:</strong></td>
          <td style="padding: 8px;">${formData.employmentStatus}</td>
        </tr>
        ${formData.employer ? `
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Employer:</strong></td>
          <td style="padding: 8px;">${formData.employer}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Monthly Income:</strong></td>
          <td style="padding: 8px;">R ${formData.monthlyIncome}</td>
        </tr>
      </table>

      <h2 style="color: #4DB6AC; margin-top: 30px;">Credit Information</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${formData.currentCreditScore ? `
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Current Credit Score:</strong></td>
          <td style="padding: 8px;">${formData.currentCreditScore}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Credit Bureaus Checked:</strong></td>
          <td style="padding: 8px;">${formData.creditBureaus.join(", ")}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Issues to Address:</strong></td>
          <td style="padding: 8px;">${formData.disputeReasons.join(", ")}</td>
        </tr>
        ${formData.additionalInfo ? `
        <tr>
          <td style="padding: 8px; background: #f8f9fa;"><strong>Additional Information:</strong></td>
          <td style="padding: 8px;">${formData.additionalInfo}</td>
        </tr>
        ` : ''}
      </table>

      <h2 style="color: #4DB6AC; margin-top: 30px;">Consent Declarations</h2>
      <ul style="list-style: none; padding-left: 0;">
        <li style="padding: 8px; background: #d4edda; margin-bottom: 8px; border-radius: 4px;">
          ✓ Credit report access authorized
        </li>
        <li style="padding: 8px; background: #d4edda; margin-bottom: 8px; border-radius: 4px;">
          ✓ Terms and conditions accepted
        </li>
        <li style="padding: 8px; background: #d4edda; margin-bottom: 8px; border-radius: 4px;">
          ✓ POPIA privacy consent given
        </li>
      </ul>

      <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-left: 4px solid #4DB6AC;">
        <p style="margin: 0;"><strong>Submission Date:</strong> ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}</p>
      </div>
    </div>
  </body>
</html>
    `

    // Send email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DCSA Website <noreply@dcsam.co.za>",
        to: ["sam@dcsam.co.za"],
        subject: `New Credit Repair Application - ${formData.firstName} ${formData.lastName}`,
        html: emailBody,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text()
      console.error("[v0] Resend API error:", errorData)
      throw new Error("Failed to send email")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Credit repair submission error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
