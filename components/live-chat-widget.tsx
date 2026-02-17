"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Phone, User, Bot } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface LiveChatWidgetProps {
  isOpen?: boolean
  onClose?: () => void
}

const FAQ_RESPONSES = [
  {
    keywords: ["debt counselling", "debt review", "what is", "explain"],
    answer: "Hey friend! So debt review is basically your legal shield - it bundles all your debts into ONE manageable payment that actually fits your life. The best part? You get instant protection from those persistent creditors (we know how draining those calls can be). It's like having a financial bodyguard while you catch your breath and get back on your feet.",
  },
  {
    keywords: ["cost", "fee", "price", "how much", "afford"],
    answer: "Let's break it down honestly (NCR-regulated, so no hidden nasties): R50 application, R300-R350 admin fee, restructuring fee (either your first month's payment OR max R8,000), then 5% monthly aftercare (capped at R450). After 2 years it drops to 3%. And girl/guy, your first consultation? Totally FREE. No pressure, no tricks, just a real conversation.",
  },
  {
    keywords: ["qualify", "eligible", "need", "help"],
    answer: "If you're doing the debt juggle (using one card to pay another, spending 40%+ of your income on debt, or just feeling completely overwhelmed), you're exactly who we're here for. Try our FREE Money Map calculator - it's like a gentle check-in for your finances, no judgment, just clarity.",
  },
  {
    keywords: ["credit score", "credit report", "affect credit"],
    answer: "Honest truth time: Yes, debt review shows on your credit report, BUT here's the thing - it actually protects you from further damage. Once you're through it, it gets removed and we'll help you rebuild stronger than before. Think of it like pressing pause to heal properly, rather than letting things get worse.",
  },
  {
    keywords: ["how long", "time", "process", "duration"],
    answer: "You get protection from DAY ONE - that's the important bit. The full journey usually takes 3-5 years depending on your debt, but you're legally protected immediately. And trust me, that breathing room is everything. It's a marathon, not a sprint, but you won't be running alone.",
  },
  {
    keywords: ["start", "apply", "begin", "get started"],
    answer: "So easy! Hit 'Get Started', fill in Form 16 online (it's straightforward, promise), upload your ID and payslip, and we'll review it within 48 hours. Then we walk you through everything step by step. No confusing jargon, no judgment, just support.",
  },
  {
    keywords: ["ncr", "registered", "legitimate", "legal"],
    answer: "100% legit, I promise! We're fully NCR registered (NCRDC3995) - you can verify us on their website. We're a proudly female-led, registered debt counselling practice, not some fly-by-night operation. Your trust matters to us.",
  },
  {
    keywords: ["credit repair", "fix credit", "improve score"],
    answer: "Our credit repair service is like having a knowledgeable friend explain your credit report - we help you understand what's what, challenge any errors (they happen more than you'd think!), and give you a real action plan to build your score back up. It's empowering stuff!",
  },
  {
    keywords: ["help", "hi", "hello", "hey"],
    answer: "Hey there! I'm Sam, and I'm here to help however I can. This is a judgment-free, safe space where you can ask anything about debt, money stress, or just vent if you need to. What's on your mind today?",
  },
]

export function LiveChatWidget({ isOpen: isOpenProp, onClose: onCloseProp }: LiveChatWidgetProps = {}) {
  const [isOpen, setIsOpen] = useState(isOpenProp ?? false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey friend! I'm Sam from DCSA - a proudly female-led debt counselling practice where you'll find zero judgment and lots of support. Whether you're just browsing or dealing with money stress, this is your safe space. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [showEscalation, setShowEscalation] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const chatNumber = "27661937596" // 066 193 7596

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const findBestResponse = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase()
    
    for (const faq of FAQ_RESPONSES) {
      if (faq.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return faq.answer
      }
    }
    
    return null
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])

    const botResponse = findBestResponse(inputMessage)
    
    setTimeout(() => {
      if (botResponse) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "That's a great question, and I want to make sure you get the most helpful answer! How about chatting with one of our counsellors directly? They can give you personalized guidance tailored to your exact situation.",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, botMessage])
        setShowEscalation(true)
      }
    }, 800)

    setInputMessage("")
  }

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])

    const botResponse = findBestResponse(question)
    
    setTimeout(() => {
      if (botResponse) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, botMessage])
      }
    }, 800)
  }

  const sendChatTranscript = () => {
    const transcript = messages
      .map(m => `${m.sender === "user" ? "Client" : "DCSA Bot"}: ${m.text}`)
      .join("\n\n")
    
    const message = `Chat Transcript:\n\n${transcript}\n\nClient wants to speak with a counsellor.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${chatNumber}?text=${encodedMessage}`, "_blank")
  }

  const quickQuestions = [
    "What is debt counselling?",
    "How much does it cost?",
    "How do I get started?",
    "Am I protected immediately?",
  ]

  return (
    <>
      {/* Chat Float Button with Label */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <div className="bg-white shadow-lg rounded-full px-4 py-2 text-sm font-medium text-[#0D3B66] border-2 border-[#4DB6AC] animate-pulse">
            Chat with us 💬
          </div>
        )}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/90 shadow-lg"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
        </Button>
      </div>

      {/* Live Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-2xl border-2 border-[#4DB6AC]">
            <CardHeader className="bg-gradient-to-r from-[#4DB6AC] to-[#4DB6AC]/80 text-white rounded-t-lg p-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Live Chat Support
              </CardTitle>
              <p className="text-xs text-white/90">We typically reply instantly</p>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea className="h-80 p-4" ref={scrollRef}>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-[#4DB6AC]" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-[#4DB6AC] text-white"
                            : "bg-gray-100 text-[#0D3B66]"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-[#0D3B66]/20 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-[#0D3B66]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-xs font-medium text-[#0D3B66] mb-2">Quick Questions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-2 bg-transparent hover:bg-[#4DB6AC]/10"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Escalation Options */}
              {showEscalation && (
                <div className="p-4 bg-[#FFD93D]/10 border-t border-[#FFD93D]/30">
                  <p className="text-sm font-semibold text-[#0D3B66] mb-2">
                    Need personalized help?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={sendChatTranscript}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`tel:0661937596`, "_self")}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-[#0D3B66]/70 mt-2 text-center">
                    066 193 7596
                  </p>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your question..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => {
              setIsOpen(false)
              onCloseProp?.()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
