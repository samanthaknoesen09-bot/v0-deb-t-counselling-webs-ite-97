import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get Zapier webhook URL from environment variable
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    if (!zapierWebhookUrl) {
      console.error("[v0] ZAPIER_WEBHOOK_URL not configured")
      // Still return success to user, but log the error
      return NextResponse.json({ 
        success: true,
        message: "Your details have been received. We'll contact you soon." 
      })
    }

    // Prepare data for Zapier
    const leadData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message || "",
      timestamp: body.timestamp || new Date().toISOString(),
      source: body.source || "Website Contact Form",
      formattedDate: new Date().toLocaleString("en-ZA", {
        timeZone: "Africa/Johannesburg",
        dateStyle: "full",
        timeStyle: "short",
      }),
    }

    console.log("[v0] Sending lead to Zapier:", { 
      name: leadData.name, 
      email: leadData.email 
    })

    // Send to Zapier webhook
    const zapierResponse = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    })

    if (!zapierResponse.ok) {
      console.error("[v0] Zapier webhook failed:", zapierResponse.statusText)
      // Still return success to user
    }

    return NextResponse.json({ 
      success: true,
      message: "Thank you! We'll be in touch soon." 
    })

  } catch (error) {
    console.error("[v0] Lead submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit. Please try again or call us directly." },
      { status: 500 }
    )
  }
}
