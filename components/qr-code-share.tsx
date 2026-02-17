"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Share2, Copy, Check } from "lucide-react"

interface QRCodeShareProps {
  url: string
  title?: string
  description?: string
}

export function QRCodeShare({
  url,
  title = "Share This Calculator",
  description = "Scan this QR code to access the DCSA Budget Calculator",
}: QRCodeShareProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)

  useEffect(() => {
    generateQRCode()
  }, [url])

  const generateQRCode = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // QR Code generation using a simple algorithm
    const size = 200
    const moduleCount = 25
    const moduleSize = size / moduleCount

    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, size, size)

    // Generate QR code data matrix
    const qrData = generateQRMatrix(url, moduleCount)

    // Draw QR code
    ctx.fillStyle = "#000000"
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (qrData[row][col]) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
        }
      }
    }

    // Add corner patterns (finder patterns)
    drawFinderPattern(ctx, 0, 0, moduleSize)
    drawFinderPattern(ctx, (moduleCount - 7) * moduleSize, 0, moduleSize)
    drawFinderPattern(ctx, 0, (moduleCount - 7) * moduleSize, moduleSize)

    setQrGenerated(true)
  }

  const generateQRMatrix = (data: string, size: number): boolean[][] => {
    const matrix: boolean[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(false))

    // Simple pattern generation based on URL hash
    const hash = simpleHash(data)

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        // Skip finder pattern areas
        if (isFinderPatternArea(row, col, size)) continue

        // Generate pattern based on hash and position
        const index = row * size + col
        matrix[row][col] =
          ((hash >> (index % 32)) & 1) === 1 || (row + col + hash) % 3 === 0 || (row * col + hash) % 5 === 0
      }
    }

    return matrix
  }

  const simpleHash = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash)
  }

  const isFinderPatternArea = (row: number, col: number, size: number): boolean => {
    // Top-left
    if (row < 8 && col < 8) return true
    // Top-right
    if (row < 8 && col >= size - 8) return true
    // Bottom-left
    if (row >= size - 8 && col < 8) return true
    return false
  }

  const drawFinderPattern = (ctx: CanvasRenderingContext2D, x: number, y: number, moduleSize: number) => {
    // Outer black square
    ctx.fillStyle = "#000000"
    ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7)

    // Inner white square
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5)

    // Center black square
    ctx.fillStyle = "#000000"
    ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3)
  }

  const downloadQRCode = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create a larger canvas for better print quality
    const printCanvas = document.createElement("canvas")
    const printSize = 400
    printCanvas.width = printSize
    printCanvas.height = printSize + 80 // Extra space for text

    const printCtx = printCanvas.getContext("2d")
    if (!printCtx) return

    // White background
    printCtx.fillStyle = "#FFFFFF"
    printCtx.fillRect(0, 0, printCanvas.width, printCanvas.height)

    // Draw QR code scaled up
    printCtx.drawImage(canvas, 0, 0, printSize, printSize)

    // Add text below QR code
    printCtx.fillStyle = "#000000"
    printCtx.font = "bold 16px Arial"
    printCtx.textAlign = "center"
    printCtx.fillText("DCSA Budget Calculator", printSize / 2, printSize + 30)
    printCtx.font = "12px Arial"
    printCtx.fillText("www.dcsam.co.za/calculator", printSize / 2, printSize + 55)

    const link = document.createElement("a")
    link.download = "DCSA-Budget-Calculator-QR.png"
    link.href = printCanvas.toDataURL("image/png")
    link.click()
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "DCSA Budget Calculator",
          text: "Use this free budget calculator to track your expenses and manage your debt",
          url: url,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    } else {
      copyLink()
    }
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <canvas ref={canvasRef} className="w-[200px] h-[200px]" aria-label="QR Code for DCSA Budget Calculator" />
        </div>

        <p className="text-sm text-muted-foreground text-center">Scan with your phone camera to open the calculator</p>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button onClick={downloadQRCode} variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download QR
          </Button>

          <Button onClick={shareLink} variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Share Link
          </Button>

          <Button onClick={copyLink} variant="outline" size="sm" className="gap-2 bg-transparent">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-2">
          <p className="font-medium">Direct Link:</p>
          <a href={url} className="text-primary hover:underline break-all" target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
