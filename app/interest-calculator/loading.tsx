import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CalculatorSkeleton } from "@/components/skeleton-loader"

export default function InterestCalculatorLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="h-12 bg-muted rounded w-2/3 animate-pulse mb-3" />
            <div className="h-6 bg-muted rounded w-full animate-pulse" />
          </div>
          <CalculatorSkeleton />
        </div>
      </main>
      <Footer />
    </div>
  )
}
