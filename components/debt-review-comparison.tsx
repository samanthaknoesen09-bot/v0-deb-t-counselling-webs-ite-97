"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, Share2, Bookmark } from "lucide-react"

export function DebtReviewComparison() {
  const features = [
    {
      feature: "Legal Protection from Creditors",
      debtReview: true,
      consolidation: false,
      adminOrder: true,
      bankruptcy: true,
    },
    {
      feature: "Reduced Monthly Payments",
      debtReview: true,
      consolidation: false,
      adminOrder: true,
      bankruptcy: true,
    },
    {
      feature: "Lower Interest Rates",
      debtReview: true,
      consolidation: false,
      adminOrder: false,
      bankruptcy: false,
    },
    {
      feature: "Keep Your Assets",
      debtReview: true,
      consolidation: true,
      adminOrder: true,
      bankruptcy: false,
    },
    {
      feature: "Stop Legal Action",
      debtReview: true,
      consolidation: false,
      adminOrder: true,
      bankruptcy: true,
    },
    {
      feature: "Credit Record Impact",
      debtReview: "Temporary notation (removed after clearance)",
      consolidation: "New credit application",
      adminOrder: "Public court record",
      bankruptcy: "Severe (10 years)",
    },
    {
      feature: "Qualification Requirements",
      debtReview: "Over-indebted with income",
      consolidation: "Good credit score needed",
      adminOrder: "Court application",
      bankruptcy: "Insolvent",
    },
    {
      feature: "Cost",
      debtReview: "Regulated affordable fees",
      consolidation: "High interest + fees",
      adminOrder: "Court fees",
      bankruptcy: "Legal fees + trustee costs",
    },
  ]

  const CheckIcon = () => <Check className="h-5 w-5 text-[#4DB6AC]" />
  const XIcon = () => <X className="h-5 w-5 text-red-500" />

  return (
    <section id="debt-review-comparison" className="py-20 px-4 bg-gradient-to-b from-[#F8F9FA] to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#FFD93D]/20 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#0D3B66]">💡 Make an Informed Decision</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B66] mb-4">
            Debt Review vs Other Options
          </h2>
          <p className="text-lg text-[#0D3B66]/70 max-w-2xl mx-auto">
            Understanding your debt relief options helps you make the right choice
          </p>
        </div>

        {/* Promotional Callout */}
        <Card className="mb-8 border-2 border-[#4DB6AC] bg-gradient-to-r from-[#4DB6AC]/10 to-[#FFD93D]/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#0D3B66] mb-2">
                  Not Sure Which Option is Right for You?
                </h3>
                <p className="text-[#0D3B66]/80">
                  Compare all debt relief solutions side-by-side and discover why Debt Review is the most comprehensive, 
                  legally protected option for South Africans struggling with debt.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 text-white font-semibold rounded-lg transition-colors"
                >
                  Get Free Advice
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0D3B66] text-white">
                <th className="p-4 text-left font-semibold">Feature</th>
                <th className="p-4 text-center font-semibold bg-[#4DB6AC]">
                  <div className="text-lg">Debt Review</div>
                  <div className="text-xs font-normal">(Recommended)</div>
                </th>
                <th className="p-4 text-center font-semibold">Debt Consolidation</th>
                <th className="p-4 text-center font-semibold">Administration Order</th>
                <th className="p-4 text-center font-semibold">Bankruptcy/Sequestration</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"}>
                  <td className="p-4 font-medium text-[#0D3B66] border-b">{row.feature}</td>
                  <td className="p-4 text-center border-b border-l-4 border-l-[#4DB6AC] bg-[#4DB6AC]/5">
                    {typeof row.debtReview === "boolean" ? (
                      row.debtReview ? <CheckIcon /> : <XIcon />
                    ) : (
                      <span className="text-sm text-[#0D3B66]">{row.debtReview}</span>
                    )}
                  </td>
                  <td className="p-4 text-center border-b">
                    {typeof row.consolidation === "boolean" ? (
                      row.consolidation ? <CheckIcon /> : <XIcon />
                    ) : (
                      <span className="text-sm text-[#0D3B66]">{row.consolidation}</span>
                    )}
                  </td>
                  <td className="p-4 text-center border-b">
                    {typeof row.adminOrder === "boolean" ? (
                      row.adminOrder ? <CheckIcon /> : <XIcon />
                    ) : (
                      <span className="text-sm text-[#0D3B66]">{row.adminOrder}</span>
                    )}
                  </td>
                  <td className="p-4 text-center border-b">
                    {typeof row.bankruptcy === "boolean" ? (
                      row.bankruptcy ? <CheckIcon /> : <XIcon />
                    ) : (
                      <span className="text-sm text-[#0D3B66]">{row.bankruptcy}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Button
            variant="outline"
            className="bg-white"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Debt Review vs Other Options - DCSA',
                  text: 'Compare debt relief solutions and find the right option for you',
                  url: window.location.href + '#debt-review-comparison'
                })
              }
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share This Comparison
          </Button>
          <Button
            variant="outline"
            className="bg-white"
            onClick={() => window.print()}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save as PDF
          </Button>
        </div>

        <Card className="mt-8 border-2 border-[#4DB6AC]/30 bg-[#4DB6AC]/5">
          <CardHeader>
            <CardTitle className="text-xl text-[#0D3B66]">Why Choose Debt Review?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-[#0D3B66]/80">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#4DB6AC] shrink-0 mt-0.5" />
                <span>NCR regulated process with legal protection</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#4DB6AC] shrink-0 mt-0.5" />
                <span>Negotiated lower interest rates and extended payment terms</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#4DB6AC] shrink-0 mt-0.5" />
                <span>One affordable monthly payment covering all debts</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#4DB6AC] shrink-0 mt-0.5" />
                <span>Keep your assets and avoid bankruptcy consequences</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
