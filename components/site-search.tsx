"use client"

import { useState } from "react"
import { Search, FileText, Calculator, BookOpen, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const searchableContent = [
  { title: "Get Started", url: "/get-started", category: "Services", icon: FileText },
  { title: "Debt Review", url: "/#services", category: "Services", icon: FileText },
  { title: "Credit Repair", url: "/#services", category: "Services", icon: FileText },
  { title: "How It Works", url: "/#how-it-works", category: "Info", icon: HelpCircle },
  { title: "Money Map Calculator", url: "/calculator", category: "Tools", icon: Calculator },
  { title: "Interest Calculator", url: "/interest-calculator", category: "Tools", icon: Calculator },
  { title: "Savings Calculator", url: "/calculator", category: "Tools", icon: Calculator },
  { title: "Blog", url: "/blog", category: "Resources", icon: BookOpen },
  { title: "FAQ", url: "/faq", category: "Help", icon: HelpCircle },
  { title: "Testimonials", url: "/#testimonials", category: "About", icon: FileText },
  { title: "Contact Us", url: "/#contact", category: "Support", icon: HelpCircle },
  { title: "Client Portal", url: "/client-portal/auth/login", category: "Portal", icon: FileText },
  { title: "Form 16 Application", url: "/client-portal/applications/form16", category: "Portal", icon: FileText },
  { title: "Credit Repair Application", url: "/client-portal/applications/credit-repair", category: "Portal", icon: FileText },
  { title: "Upload Documents", url: "/client-portal/documents", category: "Portal", icon: FileText },
]

export function SiteSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResults = searchableContent.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-[#4DB6AC]/10">
          <Search className="h-5 w-5 text-[#0D3B66]/70" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Search <span className="text-primary">DC</span><span className="text-black">SA</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#0D3B66]/50" />
            <Input
              placeholder="Search for services, tools, help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => {
                const Icon = item.icon
                return (
                  <a
                    key={index}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#4DB6AC]/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#4DB6AC]/10 flex items-center justify-center group-hover:bg-[#4DB6AC] transition-colors">
                      <Icon className="h-5 w-5 text-[#4DB6AC] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#0D3B66] group-hover:text-[#4DB6AC]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[#0D3B66]/60">
                        {item.category}
                      </div>
                    </div>
                  </a>
                )
              })
            ) : (
              <div className="text-center py-8 text-[#0D3B66]/60">
                {searchQuery ? "No results found" : "Start typing to search..."}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
