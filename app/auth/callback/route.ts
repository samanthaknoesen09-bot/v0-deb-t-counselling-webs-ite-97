import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/client-portal/dashboard'

  if (code) {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('[v0] Error exchanging code for session:', error)
      return NextResponse.redirect(new URL('/client-portal/auth/login?error=confirmation_failed', requestUrl.origin))
    }
    
    console.log('[v0] Email confirmation successful, redirecting to:', next)
    return NextResponse.redirect(new URL(next, requestUrl.origin))
  }

  // No code present, redirect to login
  return NextResponse.redirect(new URL('/client-portal/auth/login', requestUrl.origin))
}
