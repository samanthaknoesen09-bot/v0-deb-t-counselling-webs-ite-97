import { NextResponse, type NextRequest } from "next/server"

export const config = {
  matcher: ["/auth/:path*", "/client-portal/:path*"],
}

export function middleware(_request: NextRequest) {
  // Ultra-safe: never throw, never block
  return NextResponse.next()
}
