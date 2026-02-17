"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Calculator, X, Sparkles } from "lucide-react"
import Link from "next/link"

export function FloatingActionButtons() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Calculator,
      label: "Free Calculator",
      href: "/calculator",
      color: "bg-primary hover:bg-primary/90",
      badge: "See Your Numbers"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Sam",
      href: "https://wa.me/27661937596",
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
      external: true
    },
    {
      icon: Phone,
      label: "Call Sam",
      href: "tel:+27719006298",
      color: "bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
    }
  ]

  return (
    <>
      {/* Mobile FAB Menu */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        {/* Action Buttons */}
        <div className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {actions.map((action, index) => (
            <div key={index} className="flex items-center gap-2">
              {action.badge && (
                <div className="bg-white px-3 py-1 rounded-full shadow-lg text-xs font-semibold text-primary whitespace-nowrap">
                  {action.badge}
                </div>
              )}
              <Button
                asChild
                size="lg"
                className={`${action.color} text-white shadow-lg w-14 h-14 rounded-full p-0 flex items-center justify-center hover:scale-110 transition-transform`}
              >
                {action.external ? (
                  <a href={action.href} target="_blank" rel="noopener noreferrer" aria-label={action.label}>
                    <action.icon className="h-6 w-6" />
                  </a>
                ) : (
                  <Link href={action.href} aria-label={action.label}>
                    <action.icon className="h-6 w-6" />
                  </Link>
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary hover:bg-primary/90 text-white shadow-2xl w-16 h-16 rounded-full p-0 flex items-center justify-center hover:scale-105 transition-transform relative"
          aria-label="Quick actions menu"
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <>
              <Sparkles className="h-7 w-7 animate-pulse" />
              <span className="absolute -top-1 -right-1 bg-[#FFD93D] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                !
              </span>
            </>
          )}
        </Button>
      </div>

      {/* Desktop Sticky Calculator CTA */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white shadow-2xl rounded-2xl px-6 py-6 flex items-center gap-3 group hover:scale-105 transition-all"
        >
          <Link href="/calculator">
            <Calculator className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start">
              <span className="text-xs opacity-90">FREE & INSTANT</span>
              <span className="font-bold">See Your Numbers</span>
            </div>
          </Link>
        </Button>
      </div>
    </>
  )
}
