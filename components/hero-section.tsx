"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Shield, Users, Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                You're Not Just a Number,
                <span className="text-primary"> You're Family</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                At DCSA, we understand that behind every debt story is a real person with real dreams. We don't judge
                your situation - we walk this journey with you, step by step, towards the financial freedom you deserve.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() =>
                  (window.location.href =
                    "mailto:info@dcsam.co.za?subject=I'd like to chat about my options&body=Hi DCSA team,%0D%0A%0D%0AI'd love to have a friendly, no-pressure chat about how debt counselling could help my situation. Please reach out when you can.%0D%0A%0D%0AThanks!")
                }
              >
                {"Let's Have a Chat"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
              >
                See Where My Money Goes
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">NCR Registered NCRDC3995</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">100% Confidential & Safe</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">17+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">No Judgment Zone</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-card border-border shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">Let's See How We Can Help You</h3>
                  <p className="text-muted-foreground">Every journey starts with understanding where you are</p>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary">Up to 45%</div>
                    <div className="text-sm text-muted-foreground mt-2">Debt Reduction Possible</div>
                  </div>

                  <Button
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    {"Show Me My Options - It's Free"}
                  </Button>
                </div>
              </div>
            </Card>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
