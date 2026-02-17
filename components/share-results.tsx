"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, Check, Facebook, Linkedin, Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ShareResultsProps {
  title: string
  description: string
  calculatorType: "money-map" | "quick" | "interest" | "savings"
  results?: Record<string, string | number>
}

export function ShareResults({ title, description, calculatorType, results }: ShareResultsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/calculator?type=${calculatorType}` 
    : ""
  
  const shareText = `Check out this free financial calculator from DCSA!\n\nCalculate your debt, savings, and financial health: ${shareUrl}`
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(shareUrl)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Share link has been copied to your clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(title + " - " + description)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  return (
    <Card className="border-2 border-[#4DB6AC]/20 mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-[#0D3B66]">
          <Share2 className="h-5 w-5 text-[#4DB6AC]" />
          Share This Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help friends and family calculate their financial health with DCSA's free tools
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {/* WhatsApp */}
          <Button
            variant="outline"
            className="bg-white hover:bg-green-50 border-green-500/30 hover:border-green-500"
            onClick={() => window.open(shareLinks.whatsapp, "_blank")}
          >
            <svg className="h-5 w-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </Button>

          {/* Facebook */}
          <Button
            variant="outline"
            className="bg-white hover:bg-blue-50 border-blue-500/30 hover:border-blue-500"
            onClick={() => window.open(shareLinks.facebook, "_blank")}
          >
            <Facebook className="h-5 w-5 mr-2 text-blue-600" />
            Facebook
          </Button>

          {/* Twitter/X */}
          <Button
            variant="outline"
            className="bg-white hover:bg-slate-50 border-slate-500/30 hover:border-slate-500"
            onClick={() => window.open(shareLinks.twitter, "_blank")}
          >
            <svg className="h-5 w-5 mr-2 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Twitter
          </Button>

          {/* LinkedIn */}
          <Button
            variant="outline"
            className="bg-white hover:bg-blue-50 border-blue-600/30 hover:border-blue-600"
            onClick={() => window.open(shareLinks.linkedin, "_blank")}
          >
            <Linkedin className="h-5 w-5 mr-2 text-blue-700" />
            LinkedIn
          </Button>
        </div>

        {/* Copy Link Button */}
        <Button
          variant="outline"
          className="w-full bg-white hover:bg-[#4DB6AC]/10 border-[#4DB6AC]/30"
          onClick={handleCopyLink}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-[#4DB6AC]" />
              Link Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Calculator Link
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
