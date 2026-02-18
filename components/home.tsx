"use client"

import { HeroSection } from "./hero-section"
import { ServicesSection } from "./services-section"
import { BudgetCalculator } from "./budget-calculator"
import { TestimonialsSection } from "./testimonials-section"
import { AboutSection } from "./about-section"
import { TrustSection } from "./trust-section"
import { NewsletterSection } from "./newsletter-section"
import { Footer } from "./footer"
import { AffiliateOffers } from "./affiliate-offers"

export function Home() {
  return (
    <>
      <HeroSection />
      {/* TODO: Add "Hundreds South Africans Helped" section */}
      {/* TODO: Add "Debt Review vs Other Options" comparison section */}
      <BudgetCalculator />
      <ServicesSection />
      <TrustSection />
      <AboutSection />
      <TestimonialsSection />
      <NewsletterSection />
      <AffiliateOffers />
      <Footer />
    </>
  )
}
