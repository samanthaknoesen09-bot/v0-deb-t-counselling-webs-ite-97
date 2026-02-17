import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CalculatorSkeleton } from "@/components/skeleton-loader"

export default function CalculatorLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <CalculatorSkeleton />
        </div>
      </main>
      <Footer />
    </div>
  )
}
