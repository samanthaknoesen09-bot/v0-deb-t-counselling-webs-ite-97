"use client"

export function TrustStrip() {
  return (
    <div className="bg-gradient-to-r from-[#4DB6AC]/10 via-[#FFE5D9]/20 to-[#4DB6AC]/10 py-8 px-4 border-y border-[#4DB6AC]/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-[#4DB6AC]">
              Hundreds
            </div>
            <div className="text-sm md:text-base text-[#0D3B66] font-medium">
              South Africans Helped
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-col items-center">
              <svg className="h-10 w-10 text-[#4DB6AC] mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="text-sm md:text-base font-semibold text-[#0D3B66]">NCR Registered</div>
            </div>
            <div className="text-xs md:text-sm text-[#0D3B66]/70 font-medium">
              NCRDC3995
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-col items-center">
              <svg className="h-10 w-10 text-[#4DB6AC] mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <div className="text-sm md:text-base font-semibold text-[#0D3B66]">Personalized</div>
            </div>
            <div className="text-xs md:text-sm text-[#0D3B66]/70 font-medium">
              Debt Solutions
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-col items-center">
              <svg className="h-10 w-10 text-[#4DB6AC] mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <div className="text-sm md:text-base font-semibold text-[#0D3B66]">No Judgement</div>
            </div>
            <div className="text-xs md:text-sm text-[#0D3B66]/70 font-medium">
              Just Support
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
