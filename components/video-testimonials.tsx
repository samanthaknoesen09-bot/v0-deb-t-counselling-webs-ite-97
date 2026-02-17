"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoTestimonials() {
  const videoPlaceholders = [
    {
      id: 1,
      title: "From Broke to Boss Mode",
      description: "Thabo from JHB shares his debt-free journey",
      thumbnail: "https://via.placeholder.com/400x225/0D3B66/FFFFFF?text=Video+Coming+Soon"
    },
    {
      id: 2,
      title: "How I Survived Load Shedding AND Debt",
      description: "Sarah's story of financial recovery",
      thumbnail: "https://via.placeholder.com/400x225/4DB6AC/FFFFFF?text=Video+Coming+Soon"
    },
    {
      id: 3,
      title: "Debt Review: What Actually Happens",
      description: "A real client walks you through the process",
      thumbnail: "https://via.placeholder.com/400x225/FFD93D/0D3B66?text=Video+Coming+Soon"
    }
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-[#F8F9FA]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF6B6B]/10 mb-4">
            <Video className="w-8 h-8 text-[#FF6B6B]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66] mb-4">
            Real Stories, Real People
          </h2>
          <p className="text-lg text-[#0D3B66]/70 max-w-2xl mx-auto">
            Don't just take our word for it - hear from South Africans who've walked the path and come out winning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {videoPlaceholders.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-[#4DB6AC]">
              <div className="relative aspect-video bg-gradient-to-br from-[#0D3B66] to-[#4DB6AC] flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                <Play className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-2 right-2 bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded">
                  Coming Soon
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-[#0D3B66]">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="bg-[#FFD93D]/20 border-l-4 border-[#FFD93D] p-6 rounded-r-lg">
          <h3 className="font-bold text-[#0D3B66] mb-2">Want to Share Your Story?</h3>
          <p className="text-[#0D3B66]/70 mb-4">
            We'd love to hear how DCSA helped you. Record a quick video on your phone (no fancy equipment needed) and inspire others!
          </p>
          <Button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90">
            Share Your Story
          </Button>
        </div>
      </div>
    </section>
  )
}
