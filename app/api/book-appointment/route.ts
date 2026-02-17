import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, time, name, phone, email, service, message, appointmentType } = body

    const startDateTime = new Date(`${date}T${time}:00`)
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // 1 hour consultation

    const appointmentTypeLabel =
      appointmentType === "whatsapp"
        ? "Online via WhatsApp"
        : appointmentType === "telephone"
          ? "Online via Telephone"
          : "In-Person (Onsite)"

    const calendarEvent = {
      summary: `Debt Counselling - ${name} (${appointmentTypeLabel})`,
      description: `
Appointment Type: ${appointmentTypeLabel}
Service: ${service}
Client: ${name}
Phone: ${phone}
Email: ${email}
${message ? `\nAdditional Info: ${message}` : ""}

Duration: 1 hour
${appointmentType === "whatsapp" ? "\nContact via WhatsApp: +27719006298" : ""}
${appointmentType === "telephone" ? "\nContact via Telephone: +27719006298" : ""}
${appointmentType === "in-person" ? "\nLocation: DCSA Office (Details will be sent via email)" : ""}
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Africa/Johannesburg",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Africa/Johannesburg",
      },
      attendees: [
        {
          email: "samantha.knoesen09@gmail.com",
          displayName: "Samantha Knoesen - DCSA",
          organizer: true,
          responseStatus: "accepted",
        },
        {
          email: email,
          displayName: name,
          responseStatus: "needsAction",
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 60 }, // 1 hour before
          { method: "email", minutes: 60 }, // 1 hour before
        ],
      },
      sendUpdates: "all",
      guestsCanModify: false,
      guestsCanInviteOthers: false,
      guestsCanSeeOtherGuests: false,
    }

    const emailData = {
      to: ["samantha.knoesen09@gmail.com", email],
      subject: `Appointment Confirmation - ${name} (${appointmentTypeLabel})`,
      html: `
        <h2>Debt Counselling Consultation Confirmed</h2>
        <p><strong>Appointment Type:</strong> ${appointmentTypeLabel}</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString("en-ZA", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
        <p><strong>Time:</strong> ${time} (1 hour duration)</p>
        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        ${message ? `<p><strong>Additional Information:</strong> ${message}</p>` : ""}
        
        ${appointmentType === "whatsapp" ? "<p><strong>Connection Method:</strong> We will contact you via WhatsApp on +27719006298</p>" : ""}
        ${appointmentType === "telephone" ? "<p><strong>Connection Method:</strong> We will call you on the provided phone number from +27719006298</p>" : ""}
        ${appointmentType === "in-person" ? "<p><strong>Location:</strong> DCSA Office - Address details will be provided in a follow-up email</p>" : ""}
        
        <p>A calendar invitation has been sent to both parties.</p>
        <p><em>This is an automated confirmation from DCSA Debt Counselling.</em></p>
      `,
    }

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
      calendarEvent,
      emailData,
      calendarLink: generateGoogleCalendarLink(calendarEvent),
    })
  } catch (error) {
    console.error("Error booking appointment:", error)
    return NextResponse.json({ success: false, error: "Failed to book appointment" }, { status: 500 })
  }
}

function generateGoogleCalendarLink(event: any) {
  const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
  const params = new URLSearchParams({
    text: event.summary,
    details: event.description,
    dates: `${formatGoogleCalendarDate(event.start.dateTime)}/${formatGoogleCalendarDate(event.end.dateTime)}`,
    ctz: "Africa/Johannesburg",
    add: "samantha.knoesen09@gmail.com",
  })
  return `${baseUrl}&${params.toString()}`
}

function formatGoogleCalendarDate(isoDate: string): string {
  return isoDate.replace(/[-:]/g, "").split(".")[0] + "Z"
}
