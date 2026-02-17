import { NextResponse, type NextRequest } from "next/server"

export const config = {
  matcher: ["/auth/:path*", "/client-portal/:path*"],
}

export function middleware(request: NextRequest) {
  try {
    // Ultra-safe middleware: never crash the site.
    // If anything goes wrong here, we just allow the request to continue.
    return NextResponse.next()
  } catch {
    return NextResponse.next()
  }
}
