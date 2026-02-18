"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function AffiliateOffers() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
            Partner Offers
          </h2>

          <Card className="bg-card border-border p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-card-foreground">
                Combine car and home insurance and save 10% on your premiums!
              </h3>
              <p className="text-muted-foreground">
                Get a tailored quote from 1st for Women Insurance and start saving today.
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a
                  href="http://tracking.affcoza.com/aff_c?offer_id=2311&aff_id=26397"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  Get Your Quote - Free
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Partner offer | Affiliate link
              </p>
            </div>
          </Card>

          <Card className="bg-card border-border p-6 md:p-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-card-foreground">
                Count on Auto&General for swift 100% claim payouts & comprehensive coverage.
              </h3>
              <p className="text-muted-foreground">
                Get a free quote today and experience insurance that works for you.
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a
                  href="http://tracking.affcoza.com/aff_c?offer_id=1539&aff_id=26397"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  Get Your Quote - Free
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Partner offer | Affiliate link
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
