"use client"

import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CalculatorTooltipProps {
  title: string
  description: string
  examples?: string[]
}

export function CalculatorTooltip({ title, description, examples }: CalculatorTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="inline-flex items-center">
            <HelpCircle className="h-4 w-4 text-[#4DB6AC] hover:text-[#4DB6AC]/80 transition-colors cursor-help" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4" side="right">
          <div className="space-y-2">
            <p className="font-semibold text-sm text-[#0D3B66]">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            {examples && examples.length > 0 && (
              <div className="pt-2 border-t border-[#0D3B66]/10">
                <p className="text-xs font-medium text-[#0D3B66] mb-1">Examples:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {examples.map((example, index) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
