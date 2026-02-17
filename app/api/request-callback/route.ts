import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import type { APIResponse, CallbackRequestData } from '@/lib/types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as CallbackRequestData
    
    if (!body.name || !body.phone) {
      return NextResponse.json<APIResponse>(
        { success: false, error: { message: 'Name and phone required', code: 'VALIDATION_ERROR' } },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'DCSA <noreply@dcsam.co.za>',
      to: ['sam@dcsam.co.za'],
      subject: `Callback Request - ${body.name}`,
      html: `
        <h2>Callback Request</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        ${body.email ? `<p><strong>Email:</strong> ${body.email}</p>` : ''}
        ${body.preferredTime ? `<p><strong>Preferred Time:</strong> ${body.preferredTime}</p>` : ''}
      `,
    })

    return NextResponse.json<APIResponse>(
      { success: true, data: { message: 'Request submitted' } },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json<APIResponse>(
      { success: false, error: { message: 'Failed to submit', code: 'ERROR' } },
      { status: 500 }
    )
  }
}
