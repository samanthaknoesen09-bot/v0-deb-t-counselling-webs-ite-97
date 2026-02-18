"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ClientDetailsForm } from "./client-details-form"
import Image from "next/image"

export function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/dcsa-logo.png"
                alt="DCSA Debt Counselling & Credit Repair"
                width={150}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>

            <nav className="hidden md:flex items-center space-x-12">
              <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </a>

              <a href="/#calculator" className="text-foreground hover:text-primary transition-colors font-medium">
                Budget Calculator
              </a>

              <a href="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
                Blog
              </a>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-medium">
                  <span>Menu</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <a href="/#services" className="w-full font-medium">
                      Our Services
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#services" className="w-full">
                      • Debt Review Process
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#services" className="w-full">
                      • Budget Planning
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#services" className="w-full">
                      • Financial Counselling
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/blog" className="w-full font-medium">
                      Blog
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/blog" className="w-full">
                      • Financial Education
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/blog" className="w-full">
                      • Debt Counselling Tips
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#testimonials" className="w-full">
                      • Success Stories
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/#contact" className="w-full font-medium">
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

            <div className="flex items-center space-x-8">
              <div className="hidden lg:flex items-center space-x-8 text-sm text-muted-foreground">
                <a href="tel:+27719006298" className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>071 900 6298</span>
                </a>
                <a
                  href="mailto:info@dcsam.co.za"
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@dcsam.co.za</span>
                </a>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setIsFormOpen(true)}
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ClientDetailsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  )
}
