"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/images/counsellor-photo.jpg"
                  alt="Samantha - Your Debt Counsellor"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Meet Your Debt Counsellor</h2>
                  <p className="text-lg text-primary font-semibold">Samantha - DCSA Founder</p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Hello, I'm Samantha. For 18 years, I've been helping people just like you find their way through
                  financial challenges. I started in administration in 2008, moved to debt review in 2014, and became a
                  registered debt counsellor in 2021.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Here's what I want you to know: <strong>I will never judge you.</strong> Life happens to all of us -
                  unexpected medical bills, job loss, family emergencies, or simply making it through tough times. Your
                  story is your own, and there's no shame in needing support.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  I truly care about helping you find a path forward. When you reach out to me, you're not just another
                  file on my desk - you're a real person with real concerns, and I'm here to listen with compassion and
                  honesty. Together, we'll walk through every step of your journey to financial freedom.
                </p>

                <p className="text-muted-foreground leading-relaxed italic text-sm">
                  Whatever brought you here today, know that you've already taken the hardest step - asking for help.
                  I'm honored to be part of your journey toward a brighter financial future.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() =>
                      (window.location.href =
                        "https://wa.me/27719006298?text=Hi Samantha, I'd like to speak with you about my debt situation")
                    }
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp Me
                  </Button>
                  <Button variant="outline" onClick={() => (window.location.href = "mailto:info@dcsam.co.za")}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
