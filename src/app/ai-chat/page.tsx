"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Send, Bot, User, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const SUGGESTED_PROMPTS = [
  "Why did ROAS drop last week?",
  "Which campaign is best right now?",
  "What should I scale today?",
  "Which creative performs best?",
]

const INITIAL_MESSAGES = [
  {
    role: "ai",
    content: "Hi! I'm your AI Analyst. I've been monitoring your Meta Ads accounts. How can I help you optimize today?",
    time: "10:00 AM",
  }
]

export default function AIChatPage() {
  const [messages, setMessages] = React.useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    setMessages(prev => [...prev, { role: "user", content: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: `Based on your recent data, your 'Q3 Retargeting' campaign has a 4.2x ROAS, which is performing best. However, ROAS dropped slightly overall due to audience fatigue in the 'Lookalike 1%' ad set. I recommend refreshing creatives there.`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }])
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" /> AI Chat
        </h2>
        <p className="text-muted-foreground">Ask anything about your campaigns, creatives, or account performance.</p>
      </div>

      <Card className="flex-1 flex flex-col border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "ai" && (
                  <Avatar className="h-8 w-8 border border-primary/20 bg-primary/10">
                    <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"} max-w-[80%]`}>
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-muted rounded-tl-sm"
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">{message.time}</span>
                </div>

                {message.role === "user" && (
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-start"
              >
                <Avatar className="h-8 w-8 border border-primary/20 bg-primary/10">
                  <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-background/50 border-t border-border/50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length <= 2 && !isTyping && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full text-xs border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
                    onClick={() => handleSend(prompt)}
                  >
                    <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
                    {prompt}
                  </Button>
                ))}
              </div>
            )}
            
            <form 
              className="relative flex items-center"
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(inputValue)
              }}
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about campaigns, creatives, or ROAS..."
                className="pr-12 h-12 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-1.5 h-9 w-9 rounded-lg"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  )
}
