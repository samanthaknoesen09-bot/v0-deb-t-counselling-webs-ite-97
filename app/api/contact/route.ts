import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import type { APIResponse, ContactFormData } from '@/lib/types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactFormData
    
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          error: { message: 'Missing required fields', code: 'VALIDATION_ERROR' },
        },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          error: { message: 'Invalid email address', code: 'VALIDATION_ERROR' },
        },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'DCSA <noreply@dcsam.co.za>',
      to: ['sam@dcsam.co.za'],
      subject: `New Contact - ${body.name}`,
      html: `
        <h2>New Contact Form</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Message:</strong> ${body.message || 'No message'}</p>
      `,
    })

    return NextResponse.json<APIResponse>(
      { success: true, data: { message: 'Form submitted' } },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json<APIResponse>(
      { success: false, error: { message: 'Failed to submit', code: 'ERROR' } },
      { status: 500 }
    )
  }
}
