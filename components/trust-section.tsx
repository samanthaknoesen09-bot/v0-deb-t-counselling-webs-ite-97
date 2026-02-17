import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Users, Heart } from "lucide-react"
import Image from "next/image"

const trustElements = [
  {
    icon: Shield,
    title: "NCR Registered",
    description: "Fully registered with the National Credit Regulator",
    detail: "NCRDC Registration: NCRDC3995",
  },
  {
    icon: Award,
    title: "Experienced Team",
    description: "Certified debt counsellors who truly care about your success",
    detail: "17+ Years Experience",
  },
  {
    icon: Users,
    title: "Real People, Real Results",
    description: "South Africans finding their path to financial freedom with us",
    detail: "Success Stories",
  },
  {
    icon: Heart,
    title: "Personal Approach",
    description: "We see you as a person, not a number. Your story matters to us.",
    detail: "100% Personal Care",
  },
]

export function TrustSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Why Trust DCSA?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Because we believe every person deserves a second chance and a judgment-free space to rebuild their
            financial life. We're not just debt counsellors - we're your partners in this journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustElements.map((element, index) => (
            <Card
              key={index}
              className="bg-card border-border text-center hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <element.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{element.title}</h3>
                <p className="text-muted-foreground mb-4 text-pretty">{element.description}</p>
                <div className="text-sm font-semibold text-primary">{element.detail}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Promise to You</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                "We understand that reaching out for help with debt can feel overwhelming and scary. That's why we've
                created a safe, judgment-free environment where you can share your story without fear. Every client who
                walks through our doors (or calls us) is treated with dignity, respect, and genuine care. You're not
                just another case file - you're a person with dreams, and we're here to help you achieve them."
              </p>
              <div className="mt-6 text-primary font-semibold">- The DCSA Team</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 p-8 bg-card rounded-lg border border-border">
            <Image
              src="/images/dcsa-logo.png"
              alt="DCSA Logo"
              width={100}
              height={40}
              className="h-10 w-auto opacity-70"
            />
            <div className="text-sm text-muted-foreground">
              <div className="font-semibold">Located in Port Elizabeth</div>
              <div>81 6th Avenue Newton Park</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
