"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Megaphone, 
  Sparkles, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Check, 
  Copy, 
  Wand2, 
  AlertTriangle, 
  CheckCircle2, 
  Eye,
  Plus,
  RefreshCw,
  Sliders,
  ChevronRight,
  Flame,
  MessageSquare
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const initialAds = [
  {
    id: "ad-1",
    name: "Summer UGC Reel - lifestyle_fit",
    campaign: "Q3 Retargeting - All Visitors",
    spend: 2800.00,
    ctr: 2.92,
    roas: 4.5,
    conversions: 112,
    status: "active",
    image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=500&q=80",
    headline: "This simple band replaced my personal trainer 🤯",
    primaryText: "Unbox the absolute future of active health tracking. Track sleep, heart rate, recovery, and stress — with no screen distractions. Order now with 20% off!",
    aiScore: 94,
    critique: "Excellent natural UGC feel. Contrast is optimal. Facial positioning matches the 3-second attention hook.",
    details: {
      visual: "High-contrast, high attention retention. Clear face focus in first 3s.",
      text: "Uses high-converting curiosity-driven hook. Tone matches standard consumer trends.",
      action: "Duplicate this ad creative layout and test with an alternative summer discount CTA."
    }
  },
  {
    id: "ad-2",
    name: "Stop Manual Adjustments! - tech_promo",
    campaign: "Q3 Retargeting - All Visitors",
    spend: 1250.00,
    ctr: 1.84,
    roas: 3.2,
    conversions: 48,
    status: "active",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80",
    headline: "Stop spending hours on manual campaign adjustments!",
    primaryText: "Are you still trying to scale your Meta ads manually? Get our automated SaaS engine and optimize in under 15 seconds. Click to start 👇",
    aiScore: 82,
    critique: "Hook is strong but the headline text can be shortened for better visibility on mobile screens.",
    details: {
      visual: "Clear dashboard showcase. Some text overlap on 9:16 layout formats.",
      text: "High clarity and direct benefit. Urgency can be increased in the first sentence.",
      action: "Shorten primary headline to 'Stop adjusting ads manually!' and test."
    }
  },
  {
    id: "ad-3",
    name: "Static Lifestyle Banner - clean_lifestyle",
    campaign: "Broad - US/CA - 18-35",
    spend: 1900.00,
    ctr: 0.95,
    roas: 1.4,
    conversions: 22,
    status: "paused",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    headline: "Optimize Your Health Effortlessly",
    primaryText: "Premium materials meet advanced biometric sensors. The minimal screen-free tracker built to blend into your daily life. Get free shipping today.",
    aiScore: 45,
    critique: "Urgent: Hook is too passive. Banners are low-contrast and background is cluttered. Swap with a video.",
    details: {
      visual: "Low contrast. Dark elements blend into background. No face triggers.",
      text: "Passive copy. Readability index is high but emotional resonance is completely neutral.",
      action: "Pause this static banner immediately. Deploy UGC Product Reel v2 layout in its place."
    }
  }
]

export default function AdsPage() {
  const [ads, setAds] = React.useState(initialAds)
  const [selectedAd, setSelectedAd] = React.useState<typeof initialAds[0] | null>(initialAds[0])
  const [searchQuery, setSearchQuery] = React.useState("")

  // AI Copywriter states
  const [productName, setProductName] = React.useState("")
  const [coreBenefit, setCoreBenefit] = React.useState("")
  const [copyTone, setCopyTone] = React.useState("direct")
  const [writing, setWriting] = React.useState(false)
  const [generatedCopies, setGeneratedCopies] = React.useState<any[]>([])
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null)
  const [isAiPowered, setIsAiPowered] = React.useState<boolean | null>(null)

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleWriteCopy = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productName.trim() || !coreBenefit.trim()) return

    setWriting(true)
    setGeneratedCopies([])
    setIsAiPowered(null)

    try {
      const response = await fetch("/api/copywriter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName, coreBenefit, copyTone }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate copies")
      }

      const data = await response.json()
      setGeneratedCopies(data.copies || [])
      setIsAiPowered(!!data.aiPowered)
    } catch (err) {
      console.error("AI copywriter generation error, falling back to mock copies:", err)
      setIsAiPowered(false)
      
      // Standalone high-fidelity fallback copies
      if (copyTone === "direct") {
        setGeneratedCopies([
          {
            headline: `🚨 Stop wasting hours on manual ${productName}!`,
            primary: `Still doing ${coreBenefit} manually? 🤦‍♂️ Our advanced platform automates everything in under 15 seconds so you can scale stress-free. 👇 Click below to get a free live demonstration today!`,
            score: 96
          },
          {
            headline: `Instant automated ${productName} is here.`,
            primary: `Say goodbye to manual errors. Optimize your entire ${coreBenefit} flow on autopilot. Try it free for 14 days and see the scaling difference yourself!`,
            score: 89
          }
        ])
      } else if (copyTone === "fomo") {
        setGeneratedCopies([
          {
            headline: `⚠️ Only 50 slots left for the ${productName} pilot program!`,
            primary: `Hundreds of managers have already swapped manual adjustments for screen-free ${coreBenefit} automation. Don't let your competition scale past you. Secure your spot now! ⏳`,
            score: 94
          },
          {
            headline: `Everyone is swapping to automated ${productName}...`,
            primary: `Are you still scaling manually while top agencies utilize AI to optimize ${coreBenefit} instantly? Join 1,200+ brands running on premium autopilot. 👇`,
            score: 91
          }
        ])
      } else {
        setGeneratedCopies([
          {
            headline: `How this minimal band solved my ${coreBenefit} struggle 🤯`,
            primary: `I was completely burned out trying to track ${productName} every single day. Then I swapped to this screen-free autopilot tracker. Best decision of my season. Here is my honest review:`,
            score: 95
          },
          {
            headline: `My honest review of the new automated ${productName}...`,
            primary: `I spent 3 weeks testing different tools for ${coreBenefit}. Most are cluttered and slow. This automated system is screen-free, beautiful, and increases yields by 45%. 10/10 recommend.`,
            score: 92
          }
        ])
      }
    } finally {
      setWriting(false)
    }
  }

  const filteredAds = ads.filter(ad => 
    ad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-primary" /> Active Ads & AI Critique
          </h2>
          <p className="text-muted-foreground">
            Audit live ad performance, read detailed visual critiques, and instantly write high-converting copy with AI.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left Side: Ads Roster Table */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Ad Performance</CardTitle>
                <CardDescription>Live visual assets and conversion scores.</CardDescription>
              </div>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter ads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-background/50 h-9"
                />
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border/30 bg-muted/20 text-xs text-muted-foreground uppercase font-semibold">
                      <th className="p-4">Ad Asset Details</th>
                      <th className="p-4 text-right">Spend</th>
                      <th className="p-4 text-right">ROAS</th>
                      <th className="p-4 text-right">Conversions</th>
                      <th className="p-4 text-center">AI Score</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAds.map((ad) => {
                      const isSelected = selectedAd?.id === ad.id
                      return (
                        <tr 
                          key={ad.id} 
                          onClick={() => setSelectedAd(ad)}
                          className={`border-b border-border/10 hover:bg-muted/40 transition-colors cursor-pointer ${
                            isSelected ? 'bg-primary/5 hover:bg-primary/10' : ''
                          }`}
                        >
                          {/* Details & image preview */}
                          <td className="p-4 flex gap-3 items-center min-w-[200px]">
                            <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-muted border border-border/30">
                              <img src={ad.image} alt={ad.name} className="object-cover w-full h-full" />
                            </div>
                            <div className="space-y-0.5 max-w-[150px] sm:max-w-none">
                              <span className="font-semibold block truncate leading-tight">{ad.name}</span>
                              <span className="text-[10px] text-muted-foreground block truncate">{ad.campaign}</span>
                            </div>
                          </td>
                          
                          {/* Spend */}
                          <td className="p-4 text-right font-mono text-xs">${ad.spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          
                          {/* ROAS */}
                          <td className="p-4 text-right font-bold">
                            <span className={ad.roas >= 3.5 ? 'text-emerald-500' : ad.roas < 2 ? 'text-destructive' : ''}>
                              {ad.roas.toFixed(2)}x
                            </span>
                          </td>
                          
                          {/* Conversions */}
                          <td className="p-4 text-right font-mono text-xs">{ad.conversions}</td>
                          
                          {/* AI Score */}
                          <td className="p-4 text-center">
                            <Badge className={`border-none ${
                              ad.aiScore > 80 ? 'bg-emerald-500/10 text-emerald-500' : 
                              ad.aiScore > 60 ? 'bg-yellow-500/10 text-yellow-500' : 
                              'bg-destructive/10 text-destructive'
                            }`}>
                              {ad.aiScore}
                            </Badge>
                          </td>
                          
                          {/* Action icon */}
                          <td className="p-4 text-right">
                            <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${
                              isSelected ? 'translate-x-1 text-primary' : ''
                            }`} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* AI Copywriter Panel Widget */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" /> AI Copywriter Engine
              </CardTitle>
              <CardDescription>Synthesize highly optimized, high-converting ad copies instantly.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWriteCopy} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="prodName" className="text-xs font-semibold">Product Name</Label>
                    <Input
                      id="prodName"
                      placeholder="e.g. FitBand Biometrics"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                      className="focus-visible:ring-1 focus-visible:ring-primary h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="benefit" className="text-xs font-semibold">Core Value / Solution</Label>
                    <Input
                      id="benefit"
                      placeholder="e.g. screen-free sleep tracking"
                      value={coreBenefit}
                      onChange={(e) => setCoreBenefit(e.target.value)}
                      required
                      className="focus-visible:ring-1 focus-visible:ring-primary h-10"
                    />
                  </div>
                </div>

                {/* Tone Angle */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Copywriter Marketing Tone</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "direct", label: "Direct Response" },
                      { id: "fomo", label: "FOMO / Urgency" },
                      { id: "story", label: "Storytelling UGC" }
                    ].map(tone => (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => setCopyTone(tone.id)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer text-center transition-all ${
                          copyTone === tone.id 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-border/50 bg-card hover:bg-muted/50'
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full h-10 cursor-pointer" disabled={writing}>
                  {writing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-1.5" /> Synthesizing copy formulas...
                    </>
                  ) : "Generate Ad Copy Formulas"}
                </Button>
              </form>

              {/* Generated copy results */}
              <AnimatePresence>
                {generatedCopies.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4 pt-6 border-t border-border/30"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Flame className="h-3.5 w-3.5" /> AI Optimized Formulas
                      </h4>
                      {isAiPowered !== null && (
                        <div>
                          {isAiPowered ? (
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-none font-semibold text-[10px] py-0.5 px-2">
                              ✨ Live Gemini AI Engine Active
                            </Badge>
                          ) : (
                            <Badge className="bg-indigo-500/10 text-indigo-400 border-none font-semibold text-[10px] py-0.5 px-2">
                              💡 Mock Engine Active (Define GEMINI_API_KEY to go live)
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {generatedCopies.map((copy, idx) => (
                        <div key={idx} className="border border-border/40 rounded-xl p-4 bg-muted/20 relative space-y-3">
                          <Badge className="absolute top-3 right-3 bg-emerald-500/10 text-emerald-500 border-none font-bold text-[10px]">
                            Score: {copy.score}
                          </Badge>
                          
                          <div className="space-y-1">
                            <span className="text-[10px] text-muted-foreground font-semibold block uppercase">Headline</span>
                            <div className="flex justify-between items-start gap-4">
                              <span className="font-bold text-sm text-foreground">{copy.headline}</span>
                              <Button 
                                variant="ghost" 
                                size="icon-sm"
                                onClick={() => handleCopyText(copy.headline, idx * 2)}
                                className="h-6 w-6 cursor-pointer"
                              >
                                {copiedIndex === idx * 2 ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-muted-foreground font-semibold block uppercase">Primary Text</span>
                            <div className="flex justify-between items-start gap-4">
                              <p className="text-xs leading-relaxed text-foreground/80">{copy.primary}</p>
                              <Button 
                                variant="ghost" 
                                size="icon-sm"
                                onClick={() => handleCopyText(copy.primary, idx * 2 + 1)}
                                className="h-6 w-6 cursor-pointer"
                              >
                                {copiedIndex === idx * 2 + 1 ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Ad AI Audit Detail Panel */}
        <div className="lg:col-span-5 xl:col-span-4">
          <AnimatePresence mode="wait">
            {selectedAd ? (
              <motion.div
                key={selectedAd.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Visual Preview card */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden flex flex-col">
                  <div className="aspect-video w-full overflow-hidden bg-muted relative">
                    <img src={selectedAd.image} alt={selectedAd.name} className="object-cover w-full h-full" />
                    <Badge className="absolute top-2 right-2 bg-background/85 backdrop-blur-md text-[10px] border-none text-foreground font-semibold">
                      PREVIEW
                    </Badge>
                  </div>
                  
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base truncate">{selectedAd.name}</CardTitle>
                    <CardDescription className="text-xs">{selectedAd.campaign}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0 space-y-3.5 text-xs">
                    {/* Copy block */}
                    <div className="bg-muted/40 border border-border/30 rounded-xl p-3 space-y-2">
                      <div>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase block">Headline</span>
                        <p className="font-semibold text-foreground text-xs mt-0.5 leading-snug">{selectedAd.headline}</p>
                      </div>
                      <div className="border-t border-border/20 pt-2 mt-2">
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase block">Primary Text</span>
                        <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{selectedAd.primaryText}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Diagnostics details card */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" /> AI Ad Diagnosis
                    </CardTitle>
                    <CardDescription className="text-xs">Structured diagnostics and improvements.</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 text-xs">
                    {/* Core Rating */}
                    <div className="flex items-center justify-between p-3 border border-border/40 rounded-xl bg-background/50">
                      <span className="font-semibold">Conversion Health Rating:</span>
                      <Badge className={`border-none font-bold text-xs ${
                        selectedAd.aiScore > 80 ? 'bg-emerald-500/10 text-emerald-500' : 
                        selectedAd.aiScore > 60 ? 'bg-yellow-500/10 text-yellow-500' : 
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {selectedAd.aiScore > 80 ? 'Excellent' : selectedAd.aiScore > 60 ? 'Fair' : 'Critical Action Required'}
                      </Badge>
                    </div>

                    {/* SWOT Breakdown */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase block">Visual Critique</span>
                        <p className="text-foreground leading-relaxed bg-muted/20 border rounded-lg p-2.5">
                          {selectedAd.details.visual}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase block">Copy & Text Critique</span>
                        <p className="text-foreground leading-relaxed bg-muted/20 border rounded-lg p-2.5">
                          {selectedAd.details.text}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-primary font-bold uppercase block flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-primary" /> Actionable AI Suggestion
                        </span>
                        <p className="text-foreground font-medium leading-relaxed bg-primary/10 border border-primary/20 rounded-xl p-3">
                          {selectedAd.details.action}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card className="border-dashed border-border/60 bg-muted/10 h-48 flex items-center justify-center text-muted-foreground text-xs text-center p-6 rounded-2xl">
                <div>
                  <MessageSquare className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                  Select an ad row in the performance list to audit diagnostics.
                </div>
              </Card>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  )
}
