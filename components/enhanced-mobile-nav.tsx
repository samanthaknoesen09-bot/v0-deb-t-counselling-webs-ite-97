"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Home, Calculator, FileText, HelpCircle, Phone, ArrowRight, BookOpen } from "lucide-react"

export function EnhancedMobileNav() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ArrowRight, label: "Get Started", href: "/get-started", highlight: true },
    { icon: Calculator, label: "Tools", href: "/calculator" },
    { icon: FileText, label: "Services", href: "/#services" },
    { icon: BookOpen, label: "How It Works", href: "/#how-it-works" },
    { icon: FileText, label: "Blog", href: "/blog" },
    { icon: HelpCircle, label: "FAQ", href: "/faq" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden bg-transparent">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-left text-2xl font-bold">
            <span className="text-primary">DC</span><span className="text-black">SA</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.highlight
                    ? "bg-[#FF6B6B] text-white hover:bg-[#FF6B6B]/90"
                    : "hover:bg-[#4DB6AC]/10 text-[#0D3B66]"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            )
          })}
          
          <div className="mt-6 pt-6 border-t">
            <Button
              className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white"
              onClick={() => {
                window.location.href = "tel:+27817779090"
                setOpen(false)
              }}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
