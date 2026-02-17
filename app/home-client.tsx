"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrustStrip } from "@/components/trust-strip"
import { ReassuranceBanner } from "@/components/reassurance-banner"
import { BookingCalendar } from "@/components/booking-calendar"
import { DebtHealthScore } from "@/components/debt-health-score"
import { SocialMediaFeed } from "@/components/social-media-feed"
import { LiveSuccessCounter } from "@/components/live-success-counter"
import { VideoTestimonials } from "@/components/video-testimonials"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { GetInTouchForm } from "@/components/get-in-touch-form"
import { HowItWorks } from "@/components/how-it-works"
import { MeetTheTeam } from "@/components/meet-the-team"
import { VideoIntroduction } from "@/components/video-introduction"
import { SuccessStories } from "@/components/success-stories"
import { SavingsCalculator } from "@/components/savings-calculator"
import { DebtReviewComparison } from "@/components/debt-review-comparison"
import { CalculatorsShowcase } from "@/components/calculators-showcase"
import { POPIComplianceBanner } from "@/components/popi-compliance-banner"
import { PodcastSection } from "@/components/podcast-section"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { WhatsAppWidget } from "@/components/whatsapp-widget" // Import WhatsAppWidget here
import { 
  CheckCircle, 
  TrendingDown, 
  Shield, 
  Users, 
  Calculator,
  Calendar,
  ArrowRight,
  Star,
  Award,
  Phone,
  Mail,
  MessageCircle,
  FileCheck
} from "lucide-react"

export function HomeClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const openBooking = (service: string) => {
    setSelectedService(service)
    setIsBookingOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-[#FFE5D9]/30 via-[#FFD93D]/10 to-[#4DB6AC]/5">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFD93D]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4DB6AC]/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center space-y-8">
              <Badge className="mx-auto bg-gradient-to-r from-[#FFD93D] to-[#FFD93D]/80 text-[#0D3B66] px-6 py-2.5 text-sm font-bold hover:shadow-lg transition-all border border-[#FFD93D]/30">
                Proudly Female-Led • NCR Registered • NCRDC3995
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance text-[#0D3B66]">
                Debt Stress Keeping You Up at Night? We've Been There Too
              </h1>
              
              <p className="text-xl md:text-2xl text-[#0D3B66]/70 max-w-3xl mx-auto text-pretty leading-relaxed">
                Hey friend 🤍 We're a female-led team who gets what financial stress feels like - the sleepless nights, the anxiety, the feeling like you're drowning. But here's what we know for sure: this isn't your fault, and there IS a way through. Let's figure it out together, over a virtual coffee and zero judgment.
              </p>
              
              <div className="flex flex-col items-center gap-6 pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white text-lg px-10 h-16 rounded-2xl shadow-2xl font-bold transition-all hover:scale-105 group" asChild>
                    <Link href="/calculator" className="flex items-center gap-3">
                      <Calculator className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      Free Calculator - See Where You Stand
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-foreground border-3 border-foreground text-lg px-12 h-16 rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm hover:bg-foreground hover:text-white transition-all hover:scale-105" 
                    onClick={() => openBooking("Request Callback")}
                  >
                    Call Me Back
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  FREE calculator · No sign-up · Instant results · 100% private (your secret's safer than your Netflix password)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Urgency Banner */}
        <section className="py-8 px-4 bg-gradient-to-r from-primary to-black">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <Calculator className="w-10 h-10 text-[#FFD93D]" />
                <div className="text-left">
                  <p className="text-white font-bold text-lg">Get Your Debt Health Score</p>
                  <p className="text-white/80 text-sm">Like a vibe check for your wallet - 30 seconds, faster than a Nando's order!</p>
                </div>
              </div>
              <Button size="lg" className="bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-black font-bold px-8" asChild>
                <Link href="/calculator">
                  Check My Score - Free
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Value Proposition - Hook Section */}
        <section className="py-12 px-4 bg-[#F8F9FA]">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <Card className="border-2 border-primary/40 hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-8">
                  <div className="text-5xl font-extrabold text-primary mb-3 tracking-tight">15-45%</div>
                  <div className="text-base font-bold text-[#0D3B66] mb-2">Debt Reduction</div>
                  <p className="text-sm text-[#0D3B66]/70 leading-relaxed">
                    Through NCR-regulated debt review
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-[#FFD93D]/40 hover:border-[#FFD93D] transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-[#FFD93D]/5">
                <CardContent className="p-8">
                  <div className="text-5xl font-extrabold text-[#FFD93D] mb-3 tracking-tight">Immediate</div>
                  <div className="text-base font-bold text-[#0D3B66] mb-2">Relief & Protection</div>
                  <p className="text-xs text-[#0D3B66]/70">
                    Help starts now • No waiting period
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-[#FF6B6B]/30 hover:border-[#FF6B6B] transition-colors">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-[#FF6B6B] mb-2">100%</div>
                  <div className="text-sm font-semibold text-[#0D3B66] mb-2">Legal Protection</div>
                  <p className="text-xs text-[#0D3B66]/70">
                    Stop creditor harassment immediately
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Debt Health Score - Interactive AI Calculator */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <DebtHealthScore />
          </div>
        </section>

        {/* Live Success Counter */}
        <LiveSuccessCounter />

        {/* Trust Strip */}
        <TrustStrip />

        {/* Calculators Showcase - High Priority */}
        <CalculatorsShowcase />

        {/* How It Works - Detailed Process - Show Early */}
        <HowItWorks />

        {/* Debt Review Comparison - Show Early */}
        <DebtReviewComparison />

        {/* Savings Calculator - Show Early */}
        <SavingsCalculator />

        {/* Primary Service - Debt Review */}
        <section id="services" className="py-24 px-4 scroll-mt-20">
          <div className="container mx-auto max-w-5xl">
            <Card className="border-2 border-[#4DB6AC] hover:shadow-2xl transition-shadow">
              <CardContent className="p-8 md:p-12 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-xl bg-[#4DB6AC]/10 flex items-center justify-center">
                    <TrendingDown className="h-8 w-8 text-[#4DB6AC]" />
                  </div>
                  <div>
                    <Badge className="mb-2 bg-[#4DB6AC] text-white">Our Primary Service</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66]">
                      Debt Review — Your Financial Force Field
                    </h2>
                  </div>
                </div>
                
                <div className="space-y-4 text-lg text-[#0D3B66]/80 leading-relaxed">
                  <p>
                    Okay, imagine having a legal force field around your finances. That's Debt Review! It's backed by the National Credit Act and basically tells those persistent creditors to take a seat while we sort out ONE manageable payment that actually fits your life. No more playing financial Jenga with 10 different accounts (we know how exhausting that is).
                  </p>
                  <p>
                    Let's clear something up: This is NOT bankruptcy - you keep your home, your car, your sanity. It's NOT some sketchy loan deal. It's a legit, government-regulated process run by women who genuinely care about getting you to the other side of this stress.
                  </p>
                  <p className="font-medium text-foreground">
                    Honest truth from us? This is your permission slip to breathe again. And it starts with a conversation where we actually listen (radical concept, we know) 🤍
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button 
                    size="lg"
                    className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold"
                    asChild
                  >
                    <Link href="/client-portal/auth/sign-up">
                      Get Started
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#0D3B66] text-[#0D3B66] hover:bg-[#0D3B66]/5 font-semibold bg-transparent"
                    onClick={() => openBooking("Request Callback")}
                  >
                    Request Callback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Secondary Service - Credit Repair */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <Card className="border-2 hover:shadow-xl transition-shadow">
              <CardContent className="p-8 md:p-12 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold">Credit Repair — Because Your Past Doesn't Get to Write Your Future</h2>
                  </div>
                </div>
                
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Listen, that credit score? It's just a snapshot of your past, not a crystal ball. We've helped so many people discover that mistakes on their credit report (yes, ACTUAL errors) were holding them back. We'll walk you through your credit report like a friend explaining a confusing WhatsApp group chat - breaking down what's what, fighting incorrect info, and showing you how to build back better.
                  </p>
                  <p>
                    This isn't about judgment or lectures. It's about giving you the knowledge and tools to take control, make informed choices, and watch your financial confidence grow. You've got this - we're just here to light the way 💪
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button 
                    size="lg"
                    className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold"
                    asChild
                  >
                    <Link href="/client-portal/auth/sign-up">
                      Get Started
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#0D3B66] text-[#0D3B66] hover:bg-[#0D3B66]/5 font-semibold bg-transparent"
                    onClick={() => openBooking("Request Callback")}
                  >
                    Request Callback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Guides & Helpful Tips */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Your Financial Survival Kit (No Boring Jargon, Promise)</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Real talk about money stuff, written by humans for humans - grab a coffee and let's learn together ☕
              </p>
              <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4 mt-4 max-w-2xl mx-auto text-left">
                Just so you know: This is friendly guidance to help you understand your options, not official financial advice. For personalized recommendations, let's chat one-on-one.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Debt Review 101 (The Real Story)</h3>
                  <p className="text-muted-foreground">
                    What it actually is, who it helps, and why it might be your secret weapon (spoiler: no scary fine print)
                  </p>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/blog">
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Credit Score Secrets Revealed</h3>
                  <p className="text-muted-foreground">
                    What that three-digit number really means, why it matters, and how to make it work FOR you (not against you)
                  </p>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/blog">
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Budgeting Without the Boring Spreadsheets</h3>
                  <p className="text-muted-foreground">
                    Real-life money management that actually works when you've got a full life to live (we get it, you're busy)
                  </p>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/blog">
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <VideoTestimonials />

        {/* Success Stories */}
        <SuccessStories />

        {/* Meet the Team */}
        <MeetTheTeam />

        {/* Testimonials */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Real Stories from Real People (Not Made Up, We Promise)</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                These are actual Google reviews from folks who've been in your shoes - and made it to the other side 🤍
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">5.0 Rating</span>
                <span>•</span>
                <span>Verified Google Reviews</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} className="opacity-50" />
                  </div>
                  <p className="text-muted-foreground">
                    "Absolutely outstanding service! The team was not only highly professional but also incredibly kind and understanding throughout the entire process. They made a difficult situation feel manageable and treated me with genuine care and respect. I couldn't recommend them enough for anyone seeking compassionate and expert debt counselling."
                  </p>
                  <div>
                    <div className="font-semibold text-[#0D3B66]">Damian Ellington</div>
                    <div className="text-xs text-muted-foreground">13 weeks ago • Google Review</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} className="opacity-50" />
                  </div>
                  <p className="text-muted-foreground">
                    "I had an amazing experience working with DCSA. They were professional, understanding, and took the time to explain every step of the process. They helped me create a realistic repayment plan that truly fits my budget. Thanks to their guidance, I feel more confident about managing my finances and staying debt-free. I highly recommend them to anyone struggling with debt and they really care about their clients."
                  </p>
                  <div>
                    <div className="font-semibold text-[#0D3B66]">Lizelle Jonker</div>
                    <div className="text-xs text-muted-foreground">13 weeks ago • Google Review</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} className="opacity-50" />
                  </div>
                  <p className="text-muted-foreground">
                    "Samantha Knoesen helped me so much in getting my financial life back, always ready to answer, and because I trusted her so much I got her 2 referrals and they are as happy as I am. Great work Samantha."
                  </p>
                  <div>
                    <div className="font-semibold text-[#0D3B66]">Juanita Scott</div>
                    <div className="text-xs text-muted-foreground">13 weeks ago • Google Review</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Image src="/images/google-icon.svg" alt="Google" width={20} height={20} className="opacity-50" />
                  </div>
                  <p className="text-muted-foreground">
                    "Thanks DCSA for helping me clear my name, now I have a credit card because of you."
                  </p>
                  <div>
                    <div className="font-semibold text-[#0D3B66]">Asanda Jamani</div>
                    <div className="text-xs text-muted-foreground">13 weeks ago • Google Review</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-[#4DB6AC]/5">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
                    <Star className="w-8 h-8 text-[#4DB6AC]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0D3B66] mb-2">Leave Us a Review</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Share your experience with DCSA
                    </p>
                    <Button 
                      variant="outline" 
                      className="bg-white"
                      onClick={() => window.open('https://search.google.com/local/writereview?placeid=ChIJYWZqZm-i1R4RdkB4qJ3mZ0M', '_blank')}
                    >
                      Write a Google Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Podcast Section */}
        <PodcastSection />

        {/* Get in Touch Form */}
        <section className="py-16 px-4 bg-[#FFE5D9]/20">
          <div className="container mx-auto max-w-2xl">
            <GetInTouchForm />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-[#4DB6AC]/10 to-background">
          <div className="container mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66] text-balance">
              Ready to Start Your Journey to Financial Freedom?
            </h2>
            <p className="text-lg text-[#0D3B66]/70 max-w-xl mx-auto text-pretty">
              Get started with a free consultation or explore our tools
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white text-lg px-10 h-14"
                asChild
              >
                <Link href="/get-started">
                  Get Started Now
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-[#0D3B66] border-2 border-[#0D3B66] text-lg px-8 h-14 bg-transparent hover:bg-[#0D3B66]/5" 
                asChild

              >
                <Link href="/calculator">
                  Try Free Tools
                  <Calculator className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

              {/* Insurance Affiliate Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-gray-700">
            Auto & General will pay your claims within 24 hours of approval. Trusted since 1985.
            <a
              href="http://tracking.affcoza.com/aff_c?offer_id=1539&aff_id=26397"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Click here for a free quote
            </a>.
          </p>

          <p className="text-gray-700">
            Combine car and home insurance and save 10% on your premiums!
            <a
              href="http://tracking.affcoza.com/aff_c?offer_id=2311&aff_id=26397"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Click here for your tailored 1st for Women quote
            </a>.
            STOP=optout. FFW FSP#15261. T&amp;Cs online.
          </p>
        </div>
      </section>
      </main>

      <Footer />
      
      {/* Floating Action Buttons for Mobile */}
      <FloatingActionButtons />
    </div>
  )
}
