"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialMediaFeed() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-[#FFE5D9]/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66] mb-4">
            Follow Our Journey
          </h2>
          <p className="text-lg text-[#0D3B66]/70 max-w-2xl mx-auto">
            Stay updated with financial tips, success stories, and debt management advice
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Facebook Feed */}
          <Card className="border-2 border-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center mb-3">
                <Facebook className="h-6 w-6 text-[#1877F2]" />
              </div>
              <CardTitle className="text-xl text-[#0D3B66]">Facebook</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Join our community for daily financial tips and debt counselling advice
              </p>
              <div 
                className="fb-page" 
                data-href="https://www.facebook.com/DCSamDebt" 
                data-tabs="timeline" 
                data-width="340" 
                data-height="400" 
                data-small-header="true" 
                data-adapt-container-width="true" 
                data-hide-cover="false" 
                data-show-facepile="true"
              >
                <blockquote cite="https://www.facebook.com/DCSamDebt" className="fb-xfbml-parse-ignore">
                  <a href="https://www.facebook.com/DCSamDebt">DCSA Debt Counselling</a>
                </blockquote>
              </div>
              <Button 
                className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90"
                onClick={() => window.open('https://www.facebook.com/DCSamDebt', '_blank')}
              >
                Follow on Facebook
              </Button>
            </CardContent>
          </Card>

          {/* Instagram Feed */}
          <Card className="border-2 border-[#E4405F]/20 hover:border-[#E4405F]/40 transition-all">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-[#F58529] via-[#E4405F] to-[#833AB4] opacity-10 flex items-center justify-center mb-3">
                <Instagram className="h-6 w-6 text-[#E4405F]" />
              </div>
              <CardTitle className="text-xl text-[#0D3B66]">Instagram</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Visual guides and motivational content to help you stay on track
              </p>
              <div className="bg-gradient-to-br from-[#F58529]/10 via-[#E4405F]/10 to-[#833AB4]/10 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground italic">
                  Follow us for financial tips, success stories, and inspiration on your debt-free journey
                </p>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-[#F58529] via-[#E4405F] to-[#833AB4] hover:opacity-90"
                onClick={() => window.open('https://www.instagram.com/debthelp_with_dcsam', '_blank')}
              >
                Follow on Instagram
              </Button>
            </CardContent>
          </Card>

          {/* LinkedIn Feed */}
          <Card className="border-2 border-[#0A66C2]/20 hover:border-[#0A66C2]/40 transition-all">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#0A66C2]/10 flex items-center justify-center mb-3">
                <Linkedin className="h-6 w-6 text-[#0A66C2]" />
              </div>
              <CardTitle className="text-xl text-[#0D3B66]">LinkedIn</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Professional insights and industry updates on debt counselling
              </p>
              <div className="bg-[#0A66C2]/5 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground italic">
                  Connect with us for professional debt counselling insights and financial education
                </p>
              </div>
              <Button 
                className="w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90"
                onClick={() => window.open('https://www.linkedin.com/company/dcsam-dcsa', '_blank')}
              >
                Connect on LinkedIn
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-[#0D3B66]/60">
            Share our content with friends and family who might benefit from debt counselling services
          </p>
        </div>
      </div>
    </section>
  )
}
