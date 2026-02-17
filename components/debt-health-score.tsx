"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { TrendingDown, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

export function DebtHealthScore() {
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [debts, setDebts] = useState("")
  const [score, setScore] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const calculateScore = () => {
    const monthlyIncome = Number.parseFloat(income) || 0
    const monthlyExpenses = Number.parseFloat(expenses) || 0
    const monthlyDebts = Number.parseFloat(debts) || 0

    if (monthlyIncome === 0) return

    // Calculate debt-to-income ratio
    const debtRatio = (monthlyDebts / monthlyIncome) * 100
    const expenseRatio = (monthlyExpenses / monthlyIncome) * 100
    const totalCommitment = debtRatio + expenseRatio

    // Score calculation (100 = perfect, 0 = disaster)
    let healthScore = 100

    // Debt ratio impact
    if (debtRatio > 40) healthScore -= 30
    else if (debtRatio > 30) healthScore -= 20
    else if (debtRatio > 20) healthScore -= 10

    // Expense ratio impact
    if (expenseRatio > 60) healthScore -= 25
    else if (expenseRatio > 50) healthScore -= 15
    else if (expenseRatio > 40) healthScore -= 5

    // Total commitment impact
    if (totalCommitment > 90) healthScore -= 25
    else if (totalCommitment > 80) healthScore -= 15

    setScore(Math.max(0, healthScore))
    setShowResult(true)
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) {
      return {
        emoji: "😎",
        title: "You're doing lekker!",
        message: "Your finances are looking solid. Keep it up, you financial boss!",
        color: "text-green-600",
        icon: CheckCircle2,
      }
    }
    if (score >= 60) {
      return {
        emoji: "😐",
        title: "Eish, could be better...",
        message: "You're managing, but there's room to breathe easier. Let's chat about options.",
        color: "text-yellow-600",
        icon: AlertCircle,
      }
    }
    if (score >= 40) {
      return {
        emoji: "😟",
        title: "Yoh, that's stressful...",
        message: "Your finances are under pressure. Good news? We can help sort this out!",
        color: "text-orange-600",
        icon: TrendingDown,
      }
    }
    return {
      emoji: "😰",
      title: "Haibo! We need to talk...",
      message: "Your debt score is lower than Eskom's reliability rating. But don't stress - we've helped thousands in your exact position. Let's fix this together!",
      color: "text-red-600",
      icon: AlertCircle,
    }
  }

  const resetCalculator = () => {
    setIncome("")
    setExpenses("")
    setDebts("")
    setScore(null)
    setShowResult(false)
  }

  return (
    null
  )
}
