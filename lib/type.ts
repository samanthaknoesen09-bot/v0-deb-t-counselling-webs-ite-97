export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export interface CallbackRequestData {
  name: string
  phone: string
  email?: string
  preferredTime?: string
  reason?: string
}

export interface BookAppointmentData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  serviceType: string
  notes?: string
}

export interface Form16Data {
  personalInfo: {
    fullName: string
    idNumber: string
    email: string
    phone: string
    alternativePhone?: string
    physicalAddress: string
    city: string
    province: string
    postalCode: string
  }
  employmentInfo: {
    employmentStatus: string
    employer?: string
    position?: string
    employmentLength?: string
  }
  financialInfo: {
    monthlyIncome: number
    monthlyExpenses: number
    totalDebt: number
    numberOfCreditors: number
    creditors: Creditor[]
  }
  consent: {
    termsAccepted: boolean
    creditCheckAuthorized: boolean
    dataProcessingAccepted: boolean
  }
}

export interface CreditRepairData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    idNumber: string
  }
  creditIssues: {
    hasJudgments: boolean
    hasAdverseListings: boolean
    hasIncorrectInformation: boolean
    hasUnpaidAccounts: boolean
    description: string
  }
}

export interface Creditor {
  id?: string
  name: string
  accountNumber: string
  type: string
  balance: number
  monthlyPayment: number
  interestRate?: number
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code: string
    field?: string
  }
}

export interface CalculatorResult {
  currentMonthlyPayment: number
  currentTotalDebt: number
  proposedMonthlyPayment: number
  proposedPayoffTime: number
  monthlySavings: number
  totalSavings: number
  savingsPercentage: number
  debtToIncomeRatio: number
  isEligibleForDebtReview: boolean
  estimatedDuration: number
}
