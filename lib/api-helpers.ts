import { NextResponse } from "next/server"
import type { APIResponse } from "@/lib/types"

export function successResponse<T>(data?: T, status = 200) {
  const body: APIResponse<T> = { success: true, data }
  return NextResponse.json(body, { status })
}

export function errorResponse(message: string, code: string, status = 400) {
  const body: APIResponse = { success: false, error: { message, code } }
  return NextResponse.json(body, { status })
}
