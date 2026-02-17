"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    console.log("[v0] Client portal login initiated", { email: formData.email })

    const supabase = createClient()

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        console.error("[v0] Login error:", authError)
        setError(authError.message)
        setLoading(false)
        return
      }

      console.log("[v0] Login successful, redirecting to dashboard")
      router.push("/client-portal/dashboard")
      router.refresh()
    } catch (err) {
      console.error("[v0] Unexpected error:", err)
      setError("An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20 px-4 py-12">
      <Card className="w-full max-w-md border-2 border-[#0D3B66]/10">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="inline-block mb-4">
            <div className="text-2xl font-bold">
              <span className="text-primary">DC</span><span className="text-black">SA</span>
            </div>
            <div className="text-sm text-[#0D3B66]/70">Your Safe Space</div>
          </Link>
          <CardTitle className="text-2xl text-[#0D3B66]">Welcome Back, Friend</CardTitle>
          <CardDescription>
            Log in to your safe space
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                <Lock className="inline h-4 w-4 mr-1" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </Button>

            <div className="text-center text-sm space-y-2">
              <div>
                Don't have an account?{" "}
                <Link href="/client-portal/auth/sign-up" className="text-primary hover:underline font-medium">
                  Sign Up
                </Link>
              </div>
              <div>
                <Link href="/client-portal/auth/forgot-password" className="text-[#0D3B66]/70 hover:text-[#0D3B66] underline text-xs">
                  Forgot your password?
                </Link>
              </div>
              <div className="pt-2 border-t mt-4">
                <Link href="/client-portal/admin/login" className="text-[#0D3B66]/50 hover:text-[#0D3B66] text-xs">
                  Admin Portal Access
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
