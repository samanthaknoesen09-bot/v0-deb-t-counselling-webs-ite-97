"use client"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  label?: string
}

export function ProgressIndicator({ currentStep, totalSteps, label }: ProgressIndicatorProps) {
  const percentage = (currentStep / totalSteps) * 100

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-[#0D3B66] font-medium">
          {label || `Step ${currentStep} of ${totalSteps}`}
        </span>
        <span className="text-[#0D3B66]/60">{Math.round(percentage)}% Complete</span>
      </div>
      <div className="w-full h-3 bg-[#0D3B66]/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#4DB6AC] to-[#4DB6AC]/80 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
