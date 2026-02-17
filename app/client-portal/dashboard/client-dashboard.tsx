"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/breadcrumbs"
import {
  FileText,
  Upload,
  LogOut,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  FileCheck,
  PlusCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

interface ClientDashboardProps {
  user: any
  client: any
  documentsCount: number
  form16Applications: any[]
  creditRepairApplications: any[]
  transferRequests: any[]
}

export function ClientDashboard({
  user,
  client,
  documentsCount,
  form16Applications,
  creditRepairApplications,
  transferRequests,
}: ClientDashboardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showWelcomeTour, setShowWelcomeTour] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/client-portal/auth/login")
    router.refresh()
  }

  // Check if user is new (no applications or documents)
  const isNewUser = documentsCount === 0 && 
    form16Applications.length === 0 && 
    creditRepairApplications.length === 0 && 
    transferRequests.length === 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-blue-500"><Clock className="h-3 w-3 mr-1" />Submitted</Badge>
      case "under_review":
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" />Under Review</Badge>
      case "approved":
        return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Approved</Badge>
      case "completed":
        return <Badge className="bg-green-600"><CheckCircle2 className="h-3 w-3 mr-1" />Completed</Badge>
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold text-primary">
                <span className="text-primary">DC</span><span className="text-black">SA</span>
              </Link>
              <p className="text-sm text-[#0D3B66]/70">Your Safe Space</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={loading}
              className="bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Client Portal", href: "/client-portal" },
            { label: "Dashboard" }
          ]}
        />

        {/* Welcome Section */}
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-bold text-[#0D3B66] mb-2">
            Hey {client?.first_name || "friend"}! Good to see you
          </h1>
          <p className="text-[#0D3B66]/70">
            Your safe space to manage everything - documents, applications, and progress tracking
          </p>
        </div>

        {/* Welcome Tour for New Users */}
        {isNewUser && (
          <Card className="mb-6 border-2 border-[#4DB6AC] bg-gradient-to-r from-[#4DB6AC]/10 to-[#FFD93D]/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4DB6AC] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
                    Welcome to Your Safe Space!
                  </h3>
                  <p className="text-[#0D3B66]/80 mb-4">
                    You're here, you're taking action - that's huge! Here's how to get the ball rolling (we'll guide you every step):
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#4DB6AC] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-[#0D3B66]">Upload Documents</p>
                        <p className="text-[#0D3B66]/70">ID, payslips, bank statements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#FFD93D] text-[#0D3B66] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-[#0D3B66]">Complete Application</p>
                        <p className="text-[#0D3B66]/70">Form 16 or Credit Repair</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-[#0D3B66]">We'll Review</p>
                        <p className="text-[#0D3B66]/70">Typically within 48 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="border-2 border-[#4DB6AC]/20">
              <CardHeader>
                <CardTitle className="text-[#0D3B66]">Quick Actions</CardTitle>
                <CardDescription>Get started with your applications</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button
                  className="h-auto py-4 bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white justify-start"
                  asChild
                >
                  <Link href="/client-portal/applications/form16">
                    <FileText className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Form 16 Application</div>
                      <div className="text-xs opacity-90">Debt review application</div>
                    </div>
                  </Link>
                </Button>

                <Button
                  className="h-auto py-4 bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0D3B66] justify-start"
                  asChild
                >
                  <Link href="/client-portal/applications/credit-repair">
                    <FileCheck className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Credit Repair</div>
                      <div className="text-xs opacity-90">Improve your credit score</div>
                    </div>
                  </Link>
                </Button>

                <Button
                  className="h-auto py-4 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white justify-start"
                  asChild
                >
                  <Link href="/client-portal/applications/transfer">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Transfer Request</div>
                      <div className="text-xs opacity-90">Transfer to DCSA</div>
                    </div>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 justify-start bg-transparent"
                  asChild
                >
                  <Link href="/client-portal/documents">
                    <Upload className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Upload Documents</div>
                      <div className="text-xs opacity-70">ID, Payslip, etc.</div>
                    </div>
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0D3B66]">Recent Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form16Applications.length === 0 &&
                  creditRepairApplications.length === 0 &&
                  transferRequests.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No applications yet</p>
                      <p className="text-sm">Start by submitting your first application above</p>
                    </div>
                  )}

                {form16Applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[#4DB6AC]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0D3B66]">Form 16 - Debt Review</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                ))}

                {creditRepairApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FFD93D]/10 flex items-center justify-center">
                        <FileCheck className="h-5 w-5 text-[#FFD93D]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0D3B66]">Credit Repair Application</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                ))}

                {transferRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-[#FF6B6B]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0D3B66]">Transfer Request</p>
                        <p className="text-sm text-muted-foreground">
                          From: {req.current_dc_name}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(req.status)}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <Card className="border-2 border-[#0D3B66]/10">
              <CardHeader>
                <CardTitle className="text-[#0D3B66] flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-[#4DB6AC] mt-0.5" />
                  <div>
                    <p className="text-muted-foreground text-xs">Email</p>
                    <p className="text-[#0D3B66]">{user.email}</p>
                  </div>
                </div>
                {client?.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-[#4DB6AC] mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-xs">Phone</p>
                      <p className="text-[#0D3B66]">{client.phone}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Documents Summary */}
            <Card className="border-2 border-[#4DB6AC]/20">
              <CardHeader>
                <CardTitle className="text-[#0D3B66] flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-[#4DB6AC]">{documentsCount}</div>
                  <p className="text-sm text-muted-foreground mt-1">Uploaded documents</p>
                </div>
                <Button className="w-full mt-4 bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white" asChild>
                  <Link href="/client-portal/documents">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Manage Documents
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-gradient-to-br from-[#4DB6AC]/10 to-[#FFE5D9]/20 border-2 border-[#4DB6AC]/20">
              <CardHeader>
                <CardTitle className="text-[#0D3B66]">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-[#0D3B66]/70">
                  Our team is here to support you through your journey.
                </p>
                <Button className="w-full bg-[#0D3B66] hover:bg-[#0D3B66]/90 text-white" asChild>
                  <a href="tel:+27719006298">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </a>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a
                    href="https://wa.me/27661937596"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Chat
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
