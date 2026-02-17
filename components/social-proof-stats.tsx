"use client"

import React from "react"

import { useEffect, useState } from "react"
import { Users, TrendingDown, Award, CheckCircle } from "lucide-react"

interface Stat {
  icon: React.ElementType
  value: string
  label: string
  prefix?: string
}

export function SocialProofStats() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [])

  const stats: Stat[] = [
    {
      icon: Users,
      value: "Hundreds",
      label: "South Africans Helped",
    },
    {
      icon: Award,
      value: "NCR Registered",
      label: "NCRDC3995",
    },
    {
      icon: TrendingDown,
      value: "Personalized",
      label: "Debt Solutions",
    },
    {
      icon: CheckCircle,
      value: "No Judgement",
      label: "Just Support",
    },
  ]

  return (
    <div className="bg-gradient-to-br from-[#0D3B66] to-[#0D3B66]/90 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`text-center space-y-2 transform transition-all duration-700 delay-${index * 100} ${
                  animated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#4DB6AC]" />
                  </div>
                </div>
                {stat.prefix && (
                  <p className="text-xs text-white/60 uppercase tracking-wide">{stat.prefix}</p>
                )}
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
