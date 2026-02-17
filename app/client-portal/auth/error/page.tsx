import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20 px-4 py-12">
      <Card className="w-full max-w-md border-2 border-red-200">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-[#0D3B66]">Authentication Error</CardTitle>
          <CardDescription>
            There was a problem with your authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-[#0D3B66]/70">
            This could be due to an invalid or expired link. Please try logging in again.
          </p>
          
          <div className="space-y-2">
            <Button
              className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
              asChild
            >
              <Link href="/client-portal/auth/login">
                Go to Login
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="w-full bg-transparent"
              asChild
            >
              <Link href="/">
                Return to Homepage
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
