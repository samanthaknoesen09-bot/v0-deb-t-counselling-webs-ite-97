import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function middleware(request: NextRequest) {
  // Run Supabase session refresh first — this returns a response with updated cookies
  const supabaseResponse = await updateSession(request)

  const pathname = request.nextUrl.pathname

  // Static asset caching
  if (pathname.startsWith('/_next/static')) {
    supabaseResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Image caching
  if (/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/.test(pathname)) {
    supabaseResponse.headers.set('Cache-Control', 'public, max-age=86400, must-revalidate')
  }

  // API no-cache
  if (pathname.startsWith('/api')) {
    supabaseResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  }

  // Security headers
  supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff')
  supabaseResponse.headers.set('X-Frame-Options', 'SAMEORIGIN')

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
