"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ClientDetailsForm } from "./client-details-form"
import { EnhancedMobileNav } from "./enhanced-mobile-nav"
import { SiteSearch } from "./site-search"
import { LiveChatWidget } from "./live-chat-widget"
import { MessageCircle } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Side: Logo + Contact Info */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <a href="/" className="font-bold text-2xl hover:opacity-80 transition-opacity">
                <span className="text-primary">DC</span><span className="text-black">SA</span>
              </a>
              
              <div className="hidden lg:flex items-center gap-3 text-sm text-[#0D3B66]/70 border-l border-[#0D3B66]/20 pl-4">
                <a href="tel:+27719006298" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">071 900 6298</span>
                </a>
                <span className="text-[#0D3B66]/30">|</span>
                <a
                  href="mailto:info@dcsam.co.za"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">info@dcsam.co.za</span>
                </a>
              </div>
            </div>

            {/* Center: Search & Menu */}
            <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
              <SiteSearch />
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-medium">
                  <span>Menu</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuItem>
                    <a href="/get-started" className="w-full font-semibold text-[#0D3B66]">
                      Get Started
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#services" className="w-full font-semibold text-[#0D3B66]">
                      Services
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#how-it-works" className="w-full">
                      • How It Works
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#debt-review-comparison" className="w-full">
                      • Compare Debt Options
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/calculator" className="w-full font-semibold text-[#0D3B66]">
                      Tools
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/calculator" className="w-full">
                      • Money Map Calculator
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/interest-calculator" className="w-full">
                      • Interest Calculator
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/blog" className="w-full font-semibold text-[#0D3B66]">
                      Blog
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/faq" className="w-full font-semibold text-[#0D3B66]">
                      FAQ
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#testimonials" className="w-full">
                      • Success Stories
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/refer-a-friend" className="w-full font-semibold text-[#FFD93D]">
                      🎁 Refer a Friend - Get R500
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/client-portal/auth/login" className="w-full font-semibold text-[#4DB6AC]">
                      Client Portal
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#contact" className="w-full font-semibold text-[#0D3B66]">
                      Contact Us
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="tel:+27719006298" className="w-full">
                      • Call: 071 900 6298
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="mailto:info@dcsam.co.za" className="w-full">
                      • Email: info@dcsam.co.za
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right Side: CTAs */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <EnhancedMobileNav />
              
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="outline"
                  className="bg-[#4DB6AC] text-white hover:bg-[#4DB6AC]/90 border-[#4DB6AC] font-semibold"
                  asChild
                >
                  <a href="/client-portal/auth/login">Client Portal</a>
                </Button>
                
                <Button
                  variant="outline"
                  className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-semibold bg-transparent"
                  onClick={() => setIsChatOpen(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Sam
                </Button>
                
                <Button
                  className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white font-semibold"
                  onClick={() => setIsFormOpen(true)}
                >
                  Start Your Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ClientDetailsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      
      {/* Chat Widget - Only shows when triggered from header button */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
          <div className="pointer-events-auto">
            <LiveChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
