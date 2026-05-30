"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Lock, 
  Info, 
  Loader2, 
  AlertCircle, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  TrendingUp,
  LineChart
} from "lucide-react"
import { useIntegration, ConnectedAccount } from "@/hooks/use-integration"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface PlatformConfig {
  id: ConnectedAccount["platform"]
  name: string
  color: string
  bgHover: string
  textClass: string
  borderClass: string
  logo: React.ReactNode
  accounts: string[]
}

export function ConnectModal() {
  const { 
    isModalOpen, 
    activePlatform, 
    closeConnectModal, 
    connectAccount,
    connectedAccounts
  } = useIntegration()

  const [step, setStep] = React.useState<1 | 2 | 3 | 4 | 5>(1)
  const [selectedPlatform, setSelectedPlatform] = React.useState<ConnectedAccount["platform"] | null>(null)
  
  // Form states - Meta
  const [metaAccessToken, setMetaAccessToken] = React.useState("")
  const [metaAdAccountId, setMetaAdAccountId] = React.useState("")

  // Form states - Google
  const [googleCustomerId, setGoogleCustomerId] = React.useState("")
  const [googleDevToken, setGoogleDevToken] = React.useState("")
  const [googleAccessToken, setGoogleAccessToken] = React.useState("")
  
  // Custom metadata name
  const [customAccountName, setCustomAccountName] = React.useState("")
  const [selectedMockAccount, setSelectedMockAccount] = React.useState("")
  
  // Simulation states
  const [isAuthenticating, setIsAuthenticating] = React.useState(false)
  const [syncProgress, setSyncProgress] = React.useState(0)
  const [syncStatus, setSyncStatus] = React.useState("Initializing secure tunnel...")

  // Set selected platform if passed in hook
  React.useEffect(() => {
    if (activePlatform) {
      setSelectedPlatform(activePlatform)
      setStep(2)
    } else {
      setSelectedPlatform(null)
      setStep(1)
    }
  }, [activePlatform, isModalOpen])

  // Reset form states on close
  const handleClose = () => {
    setStep(1)
    setSelectedPlatform(null)
    setMetaAccessToken("")
    setMetaAdAccountId("")
    setGoogleCustomerId("")
    setGoogleDevToken("")
    setGoogleAccessToken("")
    setCustomAccountName("")
    setSelectedMockAccount("")
    setIsAuthenticating(false)
    setSyncProgress(0)
    closeConnectModal()
  }

  const platforms: PlatformConfig[] = [
    {
      id: "meta",
      name: "Meta Ads Manager",
      color: "from-blue-600 to-cyan-500",
      bgHover: "hover:bg-blue-500/5",
      textClass: "text-blue-500",
      borderClass: "border-blue-500/20",
      logo: (
        <svg viewBox="0 0 36 36" className="h-6 w-6 fill-current text-blue-500" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1.1-6.1h-2.5v-4h3.6v-2.8c0-3.6 2.2-5.5 5.3-5.5 1.5 0 2.8.1 3.2.2v3.7h-2.2c-1.7 0-2 .8-2 2v2.4h4.1l-.5 4h-3.6v8.1c-1.2.2-2.5.3-3.8.3s-2.6-.1-3.8-.3v-8.1h-3.5v-4h3.5V18c0-3.5 2.1-5.4 5.2-5.4 1.5 0 2.8.1 3.2.2v3.7h-2.2c-1.7 0-2 .8-2 2v2.4h3.9l-.5 4h-3.4v6.1z"/>
        </svg>
      ),
      accounts: ["Acme Corp (Meta)", "Lokeswar PJ - Growth Portal", "Alpha E-Commerce Hub"]
    },
    {
      id: "google",
      name: "Google Ads",
      color: "from-red-500 via-yellow-500 to-green-500",
      bgHover: "hover:bg-red-500/5",
      textClass: "text-red-500",
      borderClass: "border-red-500/20",
      logo: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
      ),
      accounts: ["Lokeswar - Search Engine Leads", "YouTube Brand Campaign Max", "Acme Corp Google Ads Main"]
    },
    {
      id: "linkedin",
      name: "LinkedIn Campaign Manager",
      color: "from-blue-700 to-indigo-800",
      bgHover: "hover:bg-blue-600/5",
      textClass: "text-blue-700",
      borderClass: "border-blue-700/20",
      logo: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      accounts: ["B2B Enterprise Lead Gen", "Acme Executive Branding", "SaaS Scale Recruitment"]
    }
  ]

  const activeConfig = platforms.find(p => p.id === selectedPlatform)

  // Step transitions
  const handleSelectPlatform = (platform: ConnectedAccount["platform"]) => {
    setSelectedPlatform(platform)
    setStep(2)
  }

  const handleOAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthenticating(true)

    // Simulate OAuth connection
    setTimeout(() => {
      setIsAuthenticating(false)
      if (activeConfig) {
        setSelectedMockAccount(activeConfig.accounts[0])
      }
      setStep(3)
    }, 1800)
  }

  const handleStartSync = () => {
    setStep(4)
    setSyncProgress(0)

    const syncMessages = [
      { prg: 10, msg: "Establishing TLS handshake with secure ad API..." },
      { prg: 25, msg: "Retrieving campaign configurations, structures, and limits..." },
      { prg: 45, msg: "Downloading creative assets, video hooks, and thumbnail copies..." },
      { prg: 65, msg: "Analyzing Click-Through Rates (CTR) and historical CPM variance..." },
      { prg: 85, msg: "Running AI evaluation score on active creatives & copywriting..." },
      { prg: 95, msg: "Finalizing sync database and caching metrics..." },
      { prg: 100, msg: "Sync Complete! Compiling final insights report..." }
    ]

    let currentMsgIndex = 0
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        const next = Math.min(prev + Math.floor(Math.random() * 8) + 4, 100)
        
        // Find matching status message
        const matched = syncMessages.find(m => next >= m.prg && m.prg > (syncMessages[currentMsgIndex - 1]?.prg || 0))
        if (matched && syncMessages.indexOf(matched) > currentMsgIndex) {
          currentMsgIndex = syncMessages.indexOf(matched)
          setSyncStatus(matched.msg)
        }

        if (next >= 100) {
          clearInterval(interval)
          // Finish and go to completion step
          setTimeout(() => {
            const finalName = customAccountName.trim() || selectedMockAccount || "My Ad Account"
            if (selectedPlatform) {
              connectAccount(selectedPlatform, finalName, {
                accessToken: selectedPlatform === "meta" ? metaAccessToken : googleAccessToken,
                adAccountId: selectedPlatform === "meta" ? metaAdAccountId : undefined,
                customerId: selectedPlatform === "google" ? googleCustomerId : undefined,
                developerToken: selectedPlatform === "google" ? googleDevToken : undefined,
              })
            }
            setStep(5)
          }, 600)
        }
        return next
      })
    }, 150)
  }

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-card/90 border border-border/80 rounded-3xl shadow-2xl relative overflow-hidden z-10 backdrop-blur-2xl"
      >
        {/* Animated header background based on selected platform */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
        
        {/* Header */}
        <div className="p-6 border-b border-border/20 flex justify-between items-center bg-muted/10">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              {step === 1 && "Connect Ad Channel"}
              {step === 2 && `Authorize ${activeConfig?.name}`}
              {step === 3 && "Select Ad Account"}
              {step === 4 && "AI Analysis & Sync"}
              {step === 5 && "Account Connected!"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {step === 1 && "Select the advertising network you want to sync."}
              {step === 2 && "Sign in securely via official OAuth 2.0 API protocol."}
              {step === 3 && "Choose which account's ad assets you want to analyze."}
              {step === 4 && "Please wait while our models parse campaigns & structures."}
              {step === 5 && "Your campaigns are now linked and ready for AI insights."}
            </p>
          </div>
          <button 
            type="button" 
            onClick={handleClose}
            className="p-2 hover:bg-muted/50 rounded-full text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SELECT PLATFORM */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {platforms.map((platform) => {
                    const isConnected = connectedAccounts.some(a => a.platform === platform.id)
                    return (
                      <button
                        key={platform.id}
                        onClick={() => handleSelectPlatform(platform.id)}
                        className={`group relative p-5 rounded-2xl border text-left flex flex-col justify-between h-40 transition-all cursor-pointer bg-background/40 hover:bg-background/80 hover:shadow-lg ${platform.borderClass} hover:border-primary/40`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="p-2.5 bg-card rounded-xl border border-border/30">
                            {platform.logo}
                          </div>
                          {isConnected && (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/20 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                              Linked
                            </span>
                          )}
                        </div>

                        <div className="mt-4">
                          <h4 className="font-bold text-sm text-foreground flex items-center gap-1">
                            {platform.name}
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                          </h4>
                          <p className="text-[11px] text-muted-foreground mt-1">
                            Sync active campaigns, creatives, CTR analytics, and calculate optimization scores.
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="rounded-2xl border border-border/30 bg-muted/20 p-4 mt-6 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-foreground block">Enterprise Grade Security & Compliance</span>
                    <span className="text-muted-foreground block mt-1">
                      We never store your passwords. Connections are fully authorized using official, read-only API access tokens and security tokens.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CREDENTIALS / SIGN IN */}
            {step === 2 && activeConfig && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <form onSubmit={handleOAuthSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-2xl border border-border/30">
                    <div className="p-2 bg-card rounded-xl border">
                      {activeConfig.logo}
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block font-medium">Channel Selected</span>
                      <span className="text-sm font-bold text-foreground block">{activeConfig.name}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedPlatform === "meta" ? (
                      <>
                        <div className="space-y-1.5">
                          <Label htmlFor="meta-token" className="text-xs font-semibold">Meta Access Token</Label>
                          <Input
                            id="meta-token"
                            type="text"
                            placeholder="EAAb..."
                            value={metaAccessToken}
                            onChange={(e) => setMetaAccessToken(e.target.value)}
                            required
                            className="h-11 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="meta-act-id" className="text-xs font-semibold">Meta Ad Account ID</Label>
                          <Input
                            id="meta-act-id"
                            type="text"
                            placeholder="e.g. act_123456789"
                            value={metaAdAccountId}
                            onChange={(e) => setMetaAdAccountId(e.target.value)}
                            required
                            className="h-11 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                          />
                        </div>
                      </>
                    ) : selectedPlatform === "google" ? (
                      <>
                        <div className="space-y-1.5">
                          <Label htmlFor="google-cust-id" className="text-xs font-semibold">Google Ads Customer ID</Label>
                          <Input
                            id="google-cust-id"
                            type="text"
                            placeholder="e.g. 123-456-7890"
                            value={googleCustomerId}
                            onChange={(e) => setGoogleCustomerId(e.target.value)}
                            required
                            className="h-11 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="google-dev-token" className="text-xs font-semibold">Google Developer Token</Label>
                          <Input
                            id="google-dev-token"
                            type="text"
                            placeholder="Developer Token"
                            value={googleDevToken}
                            onChange={(e) => setGoogleDevToken(e.target.value)}
                            required
                            className="h-11 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="google-oauth-token" className="text-xs font-semibold">OAuth User Access Token</Label>
                          <Input
                            id="google-oauth-token"
                            type="text"
                            placeholder="ya29..."
                            value={googleAccessToken}
                            onChange={(e) => setGoogleAccessToken(e.target.value)}
                            required
                            className="h-11 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1.5">
                          <Label htmlFor="auth-email" className="text-xs font-semibold">Account Email or Username</Label>
                          <Input
                            id="auth-email"
                            type="email"
                            placeholder="username@platform.com"
                            className="h-11 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Accordion Setup Help Guide */}
                  <div className="text-xs border border-border/30 bg-muted/10 p-4 rounded-2xl space-y-2">
                    <span className="font-bold text-foreground flex items-center gap-1">
                      <Info className="h-3.5 w-3.5 text-primary" /> Token Setup Instructions:
                    </span>
                    {selectedPlatform === "meta" ? (
                      <ol className="list-decimal pl-4 space-y-1 text-muted-foreground leading-normal">
                        <li>Log in to your Facebook Developer Dashboard.</li>
                        <li>Create or select your Marketing App.</li>
                        <li>Navigate to **Marketing API** &rarr; **Tools**.</li>
                        <li>Check the `ads_read` and `ads_management` scopes & generate token.</li>
                      </ol>
                    ) : (
                      <ol className="list-decimal pl-4 space-y-1 text-muted-foreground leading-normal">
                        <li>Register a Google Ads API Developer Token from API Center.</li>
                        <li>Locate your 10-digit Customer ID at Google Ads top-right menu.</li>
                        <li>Obtain an active OAuth access token with read permissions.</li>
                      </ol>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border/10">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(1)} 
                      disabled={isAuthenticating}
                      className="w-1/2 h-11 rounded-xl text-xs cursor-pointer"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isAuthenticating}
                      className="w-1/2 h-11 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      {isAuthenticating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Connecting
                        </>
                      ) : (
                        <>
                          Authorize <ArrowRight className="h-4 w-4 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: ACCOUNT SELECTOR */}
            {step === 3 && activeConfig && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-emerald-500 block">Authorization Succeeded!</span>
                    <span className="text-muted-foreground block mt-0.5">
                      Successfully signed in to platform APIs. Select an account portfolio below.
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-bold">Available Portfolios & Linked Accounts</Label>
                  <div className="space-y-2">
                    {activeConfig.accounts.map((accName) => (
                      <button
                        key={accName}
                        onClick={() => {
                          setSelectedMockAccount(accName)
                          setCustomAccountName("")
                        }}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedMockAccount === accName && !customAccountName
                            ? "border-primary bg-primary/5 font-semibold text-foreground shadow-sm"
                            : "border-border/30 bg-background/20 hover:bg-background/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            selectedMockAccount === accName && !customAccountName
                              ? "border-primary text-primary"
                              : "border-muted-foreground"
                          }`}>
                            {selectedMockAccount === accName && !customAccountName && (
                              <span className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className="text-xs">{accName}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground bg-muted border border-border/30 px-2 py-0.5 rounded-full font-mono font-medium">
                          ID: {Math.floor(100000 + Math.random() * 900000)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-border/30"></div>
                    <span className="flex-shrink mx-4 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Or Sync Custom Name</span>
                    <div className="flex-grow border-t border-border/30"></div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="custom-name" className="text-xs font-semibold">Custom Ad Account Name</Label>
                    <Input
                      id="custom-name"
                      placeholder="e.g. Acme Enterprise US Division"
                      value={customAccountName}
                      onChange={(e) => {
                        setCustomAccountName(e.target.value)
                        setSelectedMockAccount("")
                      }}
                      className="h-11 rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border/10">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(2)} 
                    className="w-1/2 h-11 rounded-xl text-xs cursor-pointer"
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleStartSync}
                    className="w-1/2 h-11 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Sync Campaigns <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SYNCING PROGRESS */}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6 py-4 flex flex-col items-center text-center"
              >
                <div className="relative flex items-center justify-center w-24 h-24">
                  {/* Glowing orbital ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary/50 border-b-primary/10 border-l-transparent animate-spin" />
                  <Zap className="h-10 w-10 text-primary animate-bounce" />
                </div>

                <div className="space-y-2 w-full max-w-sm">
                  <h4 className="font-bold text-sm text-foreground">Analyzing Ad Inventory ({syncProgress}%)</h4>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border/30 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-150"
                      style={{ width: `${syncProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground bg-muted/40 p-3 border border-border/20 rounded-2xl min-h-[56px] flex items-center justify-center">
                    {syncStatus}
                  </p>
                </div>

                <div className="w-full border-t border-border/10 pt-4 text-[10px] text-muted-foreground flex justify-center items-center gap-1.5">
                  <Lock className="h-3 w-3" /> Shared end-to-end encrypted protocol
                </div>
              </motion.div>
            )}

            {/* STEP 5: SYNC COMPLETED */}
            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 py-2 text-center"
              >
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 relative">
                  <Check className="h-10 w-10 animate-bounce" />
                  {/* Sparkle icons floating around */}
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-500 animate-pulse" />
                  <Zap className="absolute -bottom-1 -left-1 h-5 w-5 text-primary animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-foreground">Sync Complete!</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Your ad data has been imported and digested by our AI models successfully.
                  </p>
                </div>

                {/* Simulated imported specs card */}
                <div className="border border-border/30 bg-muted/20 rounded-2xl p-4 text-left max-w-sm mx-auto space-y-3.5 shadow-inner">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground font-medium">Synced Account:</span>
                    <span className="font-bold text-foreground">{customAccountName.trim() || selectedMockAccount}</span>
                  </div>
                  <hr className="border-border/10" />
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">Active Campaigns</span>
                      <span className="font-mono font-bold text-foreground block text-sm">18 Campaigns</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">Imported Creatives</span>
                      <span className="font-mono font-bold text-foreground block text-sm">45 Elements</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">AI Copilot Score</span>
                      <span className="font-mono font-bold text-primary block text-sm flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> 8.6 / 10
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">Tracked Budget</span>
                      <span className="font-mono font-bold text-emerald-500 block text-sm">$12,400.00</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleClose} 
                  className="w-full h-11 rounded-xl text-xs font-bold cursor-pointer"
                >
                  View Dashboard Analytics
                </Button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
