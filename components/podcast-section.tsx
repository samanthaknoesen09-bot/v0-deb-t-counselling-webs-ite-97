"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Headphones, Play } from "lucide-react"

export function PodcastSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#4DB6AC]/5 to-[#FFE5D9]/10">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4DB6AC]/10 mb-4">
            <Headphones className="w-8 h-8 text-[#4DB6AC]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66] mb-3">
            Debt Review for Dummies with Corrie and Zak
          </h2>
          <p className="text-lg text-[#0D3B66]/70 max-w-2xl mx-auto">
            A podcast DCSA loves - Listen to expert financial advice, debt management tips, and success stories from real South Africans
          </p>
        </div>

        <Card className="border-2 border-[#4DB6AC]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-[#4DB6AC] to-[#4DB6AC]/80 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Play className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Debt Review for Dummies</h3>
              </div>
              <p className="text-white/90 text-sm">
                With Corrie and Zak - Your weekly dose of financial wisdom, debt solutions, and practical money advice
              </p>
            </div>
            
            {/* Spotify Embed */}
            <div className="relative w-full" style={{ paddingBottom: '380px' }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                src="https://open.spotify.com/embed/show/4se2WtEkWcVMrqOU4Jmh7r?utm_source=generator&theme=0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="DCSA Podcast on Spotify"
              />
            </div>

            <div className="p-6 bg-[#0D3B66]/5">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="text-center md:text-left">
                  <p className="text-sm font-medium text-[#0D3B66] mb-1">
                    Available on Spotify
                  </p>
                  <p className="text-xs text-[#0D3B66]/70">
                    New episodes every week featuring expert advice and client success stories
                  </p>
                </div>
                <a
                  href="https://open.spotify.com/show/4se2WtEkWcVMrqOU4Jmh7r?si=533bfeed89954fd8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Listen on Spotify
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Episode Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="border border-[#4DB6AC]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#4DB6AC]/10 mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-bold text-[#4DB6AC]">💰</span>
              </div>
              <h4 className="font-semibold text-[#0D3B66] mb-2">Debt Management Tips</h4>
              <p className="text-sm text-[#0D3B66]/70">
                Learn practical strategies to reduce debt and improve your financial health
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#4DB6AC]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#4DB6AC]/10 mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-bold text-[#4DB6AC]">✨</span>
              </div>
              <h4 className="font-semibold text-[#0D3B66] mb-2">Success Stories</h4>
              <p className="text-sm text-[#0D3B66]/70">
                Hear from real clients who achieved financial freedom through debt counselling
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#4DB6AC]/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#4DB6AC]/10 mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-bold text-[#4DB6AC]">🎓</span>
              </div>
              <h4 className="font-semibold text-[#0D3B66] mb-2">Expert Insights</h4>
              <p className="text-sm text-[#0D3B66]/70">
                NCR-registered debt counsellors share insider knowledge and industry updates
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
