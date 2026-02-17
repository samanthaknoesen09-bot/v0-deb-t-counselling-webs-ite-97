"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Play } from "lucide-react"

export function VideoIntroduction() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#F8F9FA] to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0D3B66] mb-3">
            Meet Sam - Your Debt Counsellor
          </h2>
          <p className="text-lg text-[#0D3B66]/70">
            Watch this short video to understand how we can help you
          </p>
        </div>

        <Card className="overflow-hidden border-2 border-[#4DB6AC]/20">
          <CardContent className="p-0">
            {/* Placeholder for video - replace with actual video URL */}
            <div className="relative aspect-video bg-gradient-to-br from-[#0D3B66] to-[#4DB6AC] flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all cursor-pointer">
                  <Play className="h-10 w-10 text-white fill-white" />
                </div>
                <p className="text-lg font-medium">Coming Soon: Introduction Video</p>
                <p className="text-sm text-white/80 max-w-md mx-auto px-4">
                  We're creating a personal introduction video to help you understand our process and feel comfortable reaching out
                </p>
              </div>
            </div>
            {/* When ready, replace with:
            <video controls className="w-full">
              <source src="/videos/intro.mp4" type="video/mp4" />
            </video>
            */}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
