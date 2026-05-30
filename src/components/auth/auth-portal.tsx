"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  AlertCircle,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  HelpCircle
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function AuthPortal() {
  const { login, register } = useAuth()
  const [tab, setTab] = React.useState<"login" | "signup">("login")
  
  // Input fields
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [password, setPassword] = React.useState("")
  
  // Feedback states
  const [errorMsg, setErrorMsg] = React.useState("")
  const [successMsg, setSuccessMsg] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [shakeTrigger, setShakeTrigger] = React.useState(false)

  // Clear messages on tab change
  React.useEffect(() => {
    setErrorMsg("")
    setSuccessMsg("")
    setEmail("")
    setName("")
    setPassword("")
  }, [tab])

  const triggerShake = () => {
    setShakeTrigger(true)
    setTimeout(() => setShakeTrigger(false), 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")
    setIsLoading(true)

    // Artificial tiny loading delay for premium UX feedback
    setTimeout(() => {
      if (tab === "login") {
        const res = login(email, password)
        setIsLoading(false)
        if (!res.success) {
          setErrorMsg(res.message)
          triggerShake()
        }
      } else {
        if (!name.trim()) {
          setErrorMsg("Full name is required")
          setIsLoading(false)
          triggerShake()
          return
        }
        const res = register(name, email, password)
        setIsLoading(false)
        if (res.success) {
          setSuccessMsg(res.message)
        } else {
          setErrorMsg(res.message)
          triggerShake()
        }
      }
    }, 1200)
  }

  // Pre-fill credentials helper
  const handlePreFill = () => {
    setEmail("lokeswarpj4@gmail.com")
    setPassword("password")
    setTab("login")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-foreground relative overflow-hidden px-4 sm:px-6">
      
      {/* Dynamic Floating Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-zinc-950 to-zinc-950 opacity-80" />

      {/* Dynamic Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        
        {/* Logo and Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white shadow-xl shadow-violet-500/20 mb-4"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22h4l3-6h6l3 6h4L12 2zm-1.5 11L12 9.5l1.5 3.5h-3z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="8" className="stroke-pink-300 opacity-50" />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            AdAura AI Portal
          </h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Register your workspace, link your advertising channels, and access automated optimization scoring.
          </p>
        </div>

        {/* Auth Panel Card */}
        <motion.div
          animate={shakeTrigger ? { x: [-10, 10, -8, 8, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-border/60 bg-zinc-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            
            {/* Custom high-fidelity slide tabs selector */}
            <div className="flex border-b border-border/20 bg-muted/10 p-1">
              <button
                type="button"
                onClick={() => setTab("login")}
                className={`w-1/2 py-3 rounded-2xl text-xs font-bold transition-all relative ${
                  tab === "login" 
                    ? "text-primary bg-zinc-950/80 border border-border/30 shadow-md font-extrabold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={`w-1/2 py-3 rounded-2xl text-xs font-bold transition-all relative ${
                  tab === "signup" 
                    ? "text-primary bg-zinc-950/80 border border-border/30 shadow-md font-extrabold" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Create Account
              </button>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Sign-Up Name Field */}
                <AnimatePresence>
                  {tab === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <Label htmlFor="auth-name" className="text-xs font-semibold text-zinc-300">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="auth-name"
                          placeholder="Lokeswar PJ"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-9 h-10 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 bg-zinc-950/50"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="auth-email" className="text-xs font-semibold text-zinc-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="auth-email"
                      type="email"
                      placeholder="e.g. lokeswarpj4@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9 h-10 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 bg-zinc-950/50"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="auth-pw" className="text-xs font-semibold text-zinc-300">Password</Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="auth-pw"
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-9 h-10 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 bg-zinc-950/50"
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 border border-destructive/20 bg-destructive/10 text-destructive text-xs rounded-xl flex items-start gap-2"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs rounded-xl flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </motion.div>
                )}

                {/* Submit Action Button */}
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-4 w-4 border-2 border-background border-t-transparent rounded-full"
                      />
                      <span>Please wait...</span>
                    </>
                  ) : (
                    <>
                      <span>{tab === "login" ? "Sign In" : "Register Workspace"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Fast testing help note for owner */}
              <div className="border-t border-border/10 pt-4 flex flex-col items-center gap-2.5">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Multi-tenant workspace data isolation active
                </span>
                
                <button
                  onClick={handlePreFill}
                  className="text-[10px] text-primary/70 hover:text-primary underline flex items-center gap-1 cursor-pointer transition-colors bg-muted/10 px-3 py-1.5 rounded-full hover:bg-muted/30"
                >
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                  Pre-fill standard Demo credentials
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer legalities */}
        <p className="text-[10px] text-muted-foreground/60 text-center mt-6">
          Authorized with SOC2 security protocols. 256-bit credentials hashing.
        </p>
      </motion.div>
    </div>
  )
}
