import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    story:
      "I was drowning in debt with payments totaling R18,000 per month. The DCSA team didn't judge my situation - they listened, understood, and helped me reduce this to R9,500. I finally have breathing room and hope again.",
    rating: 5,
    savings: "R8,500/month saved",
  },
  {
    name: "Michael K.",
    story:
      "The debt review process seemed scary at first, but the DCSA team walked with me through every step. They made me feel like family, not just another client. My credit cards are paid off and I'm building savings for the first time in years.",
    rating: 5,
    savings: "Debt-free in 3 years",
  },
  {
    name: "Nomsa T.",
    story:
      "DCSA's budget calculator opened my eyes to where my money was going. But more than that, their counselling helped me understand I wasn't a failure - just someone who needed guidance. Now I manage my finances with confidence.",
    rating: 5,
    savings: "R12,000 emergency fund",
  },
  {
    name: "David L.",
    story:
      "I thought bankruptcy was my only option and felt so ashamed. DCSA showed me there was another way and treated me with such kindness. Now I'm on track to be completely debt-free within 4 years instead of losing everything.",
    rating: 5,
    savings: "Avoided bankruptcy",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Real People, Real Stories, Real Hope
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            These aren't just success stories - they're real people who found their way back to financial freedom with
            DCSA. Your story could be next.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="space-y-4">
                    <p className="text-card-foreground leading-relaxed text-pretty">"{testimonial.story}"</p>

                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary">{testimonial.savings}</div>
                        <div className="text-xs text-muted-foreground">Achievement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
