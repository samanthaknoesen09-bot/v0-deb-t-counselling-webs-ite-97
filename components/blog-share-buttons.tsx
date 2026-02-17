"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Link as LinkIcon, MessageCircle } from "lucide-react"
import { useState } from "react"

interface BlogShareButtonsProps {
  title: string
  url: string
  description?: string
}

export function BlogShareButtons({ title, url, description }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)
  const shareDescription = encodeURIComponent(description || "")

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTitle}`,
      "_blank",
      "width=600,height=400"
    )
  }

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      "_blank",
      "width=600,height=400"
    )
  }

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      "_blank",
      "width=600,height=400"
    )
  }

  const shareToWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
      "_blank"
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        size="sm"
        variant="outline"
        className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-none"
        onClick={shareToFacebook}
      >
        <Facebook className="w-4 h-4 mr-2" />
        Share
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90 border-none"
        onClick={shareToTwitter}
      >
        <Twitter className="w-4 h-4 mr-2" />
        Tweet
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 border-none"
        onClick={shareToLinkedIn}
      >
        <Linkedin className="w-4 h-4 mr-2" />
        Share
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="bg-[#25D366] text-white hover:bg-[#25D366]/90 border-none"
        onClick={shareToWhatsApp}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        WhatsApp
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="bg-transparent"
        onClick={handleCopyLink}
      >
        <LinkIcon className="w-4 h-4 mr-2" />
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  )
}
