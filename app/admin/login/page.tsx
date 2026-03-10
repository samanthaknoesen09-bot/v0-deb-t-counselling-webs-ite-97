"use client"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Check credentials
    if (username === "dcsam.admin" && password === "sam@august") {
      // Store auth in sessionStorage (simple auth for demo)
      const authToken = Buffer.from(`${username}:${password}`).toString("base64")
      sessionStorage.setItem("dcsa_admin_auth", authToken)
      router.push("/admin/blog")
    } else {
      setError("Invalid username or password")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-stone-200">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/dcsa-logo.png"
              alt="DCSA Debt Counselling & Credit Repair"
              width={150}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-stone-800">Admin Login</CardTitle>
          <CardDescription>
            Sign in to manage blog posts, SEO settings, and metadata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 focus-visible:ring-[#8B4513]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 focus-visible:ring-[#8B4513]"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white font-semibold transition-colors"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
              Secure Administration Area
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
