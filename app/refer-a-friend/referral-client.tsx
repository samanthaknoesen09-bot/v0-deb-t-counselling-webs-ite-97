"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Users, Gift, CheckCircle2, Share2 } from "lucide-react"
import Link from "next/link"

export function ReferralClient() {
  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    yourPhone: "",
    friendName: "",
    friendEmail: "",
    friendPhone: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Referral submitted:", formData)
    // TODO: Send to backend
    setIsSubmitted(true)
  }

  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://www.dcsam.co.za"
  const shareMessage = `Eish, if you're stressed about debt, check out DCSA. They helped me and they can help you too! ${shareUrl}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFD93D] mb-6">
            <Heart className="w-10 h-10 text-[#0D3B66]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-[#0D3B66] mb-6">
            Help a Bru, Help Yourself
          </h1>
          
          <p className="text-xl md:text-2xl text-[#0D3B66]/70 max-w-2xl mx-auto mb-8">
            Your friend gets debt relief. You get R500 off your fees. Everyone wins! That's enough for a braai or two 🍖
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-[#0D3B66] text-center mb-12">
            How It Works (Super Easy)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-2 hover:border-[#4DB6AC] transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-[#4DB6AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-[#4DB6AC]" />
                </div>
                <CardTitle className="text-xl text-[#0D3B66]">1. Refer Your Friend</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0D3B66]/70">
                  Fill in the form below or share via WhatsApp. Simple as that.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-[#4DB6AC] transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-[#4DB6AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#4DB6AC]" />
                </div>
                <CardTitle className="text-xl text-[#0D3B66]">2. They Sign Up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0D3B66]/70">
                  Your friend gets in touch and starts their debt relief journey.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-[#4DB6AC] transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-[#4DB6AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-[#4DB6AC]" />
                </div>
                <CardTitle className="text-xl text-[#0D3B66]">3. You Both Win!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0D3B66]/70">
                  You get R500 off your fees. They get expert debt help. Win-win!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Referral Form */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          {!isSubmitted ? (
            <Card className="border-2 border-[#4DB6AC]">
              <CardHeader className="bg-gradient-to-r from-[#0D3B66] to-[#4DB6AC] text-white">
                <CardTitle className="text-2xl">Refer a Friend</CardTitle>
                <CardDescription className="text-white/90">
                  Help someone you care about. Get rewarded for it.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4 pb-4 border-b">
                    <h3 className="font-bold text-[#0D3B66]">Your Details</h3>
                    <div>
                      <Label htmlFor="yourName">Your Name</Label>
                      <Input
                        id="yourName"
                        value={formData.yourName}
                        onChange={(e) => setFormData({...formData, yourName: e.target.value})}
                        placeholder="e.g. Sipho Mahlangu"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="yourEmail">Your Email</Label>
                      <Input
                        id="yourEmail"
                        type="email"
                        value={formData.yourEmail}
                        onChange={(e) => setFormData({...formData, yourEmail: e.target.value})}
                        placeholder="sipho@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="yourPhone">Your Phone</Label>
                      <Input
                        id="yourPhone"
                        type="tel"
                        value={formData.yourPhone}
                        onChange={(e) => setFormData({...formData, yourPhone: e.target.value})}
                        placeholder="082 123 4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-[#0D3B66]">Your Friend's Details</h3>
                    <div>
                      <Label htmlFor="friendName">Friend's Name</Label>
                      <Input
                        id="friendName"
                        value={formData.friendName}
                        onChange={(e) => setFormData({...formData, friendName: e.target.value})}
                        placeholder="e.g. Thandi Dlamini"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="friendEmail">Friend's Email</Label>
                      <Input
                        id="friendEmail"
                        type="email"
                        value={formData.friendEmail}
                        onChange={(e) => setFormData({...formData, friendEmail: e.target.value})}
                        placeholder="thandi@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="friendPhone">Friend's Phone</Label>
                      <Input
                        id="friendPhone"
                        type="tel"
                        value={formData.friendPhone}
                        onChange={(e) => setFormData({...formData, friendPhone: e.target.value})}
                        placeholder="083 765 4321"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 text-lg bg-[#FF6B6B] hover:bg-[#FF6B6B]/90">
                    Send Referral
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-[#4DB6AC] text-center">
              <CardContent className="pt-12 pb-12">
                <CheckCircle2 className="w-20 h-20 text-[#4DB6AC] mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-[#0D3B66] mb-4">
                  Lekker! Referral Sent
                </h2>
                <p className="text-lg text-[#0D3B66]/70 mb-8">
                  We'll reach out to your friend ASAP. Once they sign up, you'll get your R500 discount. Easy peasy!
                </p>
                <Button asChild className="bg-[#4DB6AC] hover:bg-[#4DB6AC]/90">
                  <Link href="/">Back to Home</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Quick Share Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Or Share on WhatsApp</CardTitle>
              <CardDescription className="text-white/90">
                Quick and easy - just tap to share
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                asChild
                className="w-full h-12 text-lg bg-white text-[#128C7E] hover:bg-white/90"
              >
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
