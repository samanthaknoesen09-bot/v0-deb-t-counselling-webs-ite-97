"use client"

import { Shield, Heart, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function LiveSuccessCounter() {
  return (
    <section className="py-12 px-4 bg-gradient-to-r from-primary to-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          Why South Africans Choose <span className="text-[#FFD93D]">DC</span><span className="text-white">SA</span>
        </h2>
        <p className="text-white/80 text-center mb-8">
          Real debt counselling industry facts that matter
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <Shield className="w-12 h-12 text-[#FFD93D] mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">
                15-45%
              </div>
              <div className="text-white/80 text-sm">Average Debt Reduction Through Debt Review</div>
              <p className="text-xs text-white/60 mt-2">Industry average via NCR-regulated process</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <Heart className="w-12 h-12 text-[#FFD93D] mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">
                100%
              </div>
              <div className="text-white/80 text-sm">Personalized Attention for Every Client</div>
              <p className="text-xs text-white/60 mt-2">You're not a number, you're a person</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <Clock className="w-12 h-12 text-[#FFD93D] mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">
                12 Years
              </div>
              <div className="text-white/80 text-sm">
                Sam's Debt Counselling Experience
              </div>
              <p className="text-xs text-white/60 mt-2">Real experience, real results</p>
            </CardContent>
          </Card>
        </div>

        <p className="text-white/60 text-center text-sm mt-6">
          NCR Registered: NCRDC3995 · Honest stats, no BS
        </p>
      </div>
    </section>
  )
}
