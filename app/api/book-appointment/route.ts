import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

type APIResponse =
  | { success: true; data?: any }
  | { success: false; error: { message: string; code: string } }

type BookAppointmentData = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  serviceType?: string

}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookAppointmentData

    if (!body.name || !body.email || !body.phone || !body.date || !body.time) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          error: { message: 'All fields required', code: 'VALIDATION_ERROR' },
        },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'DCSA <noreply@dcsam.co.za>',
      to: ['sam@dcsam.co.za'],
      subject: `New Appointment - ${body.date} ${body.time}`,
      html: `
        <h2>New Appointment</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Date:</strong> ${body.date}</p>
        <p><strong>Time:</strong> ${body.time}</p>
        <p><strong>Service:</strong> ${body.serviceType ?? 'Not specified'}</p>
      `,
    })

    return NextResponse.json<APIResponse>(
      { success: true, data: { message: 'Appointment booked' } },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: { message: 'Failed to book appointment', code: 'ERROR' },
      },
      { status: 500 }
    )
  }
}
