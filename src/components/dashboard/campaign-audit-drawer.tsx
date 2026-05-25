"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Flame,
  ArrowRight,
  RefreshCw,
  Zap,
  Target
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CampaignAuditDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaign: {
    id: string
    name: string
    status: string
    spend: number
    ctr: number
    cpc: number
    roas: number
    conversions: number
    aiScore: number
  } | null
}

export function CampaignAuditDrawer({ open, onOpenChange, campaign }: CampaignAuditDrawerProps) {
  const [syncing, setSyncing] = React.useState(false)
  const [synced, setSynced] = React.useState(false)
  const [checklist, setChecklist] = React.useState([
    { id: 1, text: "Increase budget of winning ad set by 20%", checked: false },
    { id: 2, text: "Deactivate underperforming image creative Lifestyle_04", checked: false },
    { id: 3, text: "Expand Lookalike audience from 1% to 2% to drop CPM", checked: false },
    { id: 4, text: "Enable Advantage+ Placements on retargeting set", checked: false },
  ])

  if (!campaign) return null

  const toggleChecklist = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setSynced(true)
      setTimeout(() => {
        setSynced(false)
      }, 3000)
    }, 2000)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[100vw] sm:max-w-md md:max-w-lg border-l border-border/50 bg-background/95 backdrop-blur-md p-0 flex flex-col h-full z-[100]">
        
        {/* Header */}
        <SheetHeader className="p-6 border-b border-border/50 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2">
                <Badge variant={campaign.status === "active" ? "default" : "secondary"} className={campaign.status === "active" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : ""}>
                  {campaign.status.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">ID: #{campaign.id}</span>
              </div>
              <SheetTitle className="text-xl font-bold leading-tight line-clamp-2 mt-1">{campaign.name}</SheetTitle>
            </div>
            
            <div className="flex flex-col items-center shrink-0 bg-primary/10 border border-primary/20 rounded-2xl p-3 min-w-[70px]">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">AI Score</span>
              <span className={`text-2xl font-black mt-0.5 ${campaign.aiScore > 80 ? 'text-emerald-500' : campaign.aiScore > 60 ? 'text-yellow-500' : 'text-destructive'}`}>
                {campaign.aiScore}
              </span>
            </div>
          </div>
        </SheetHeader>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Key Metrics Quick Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 border border-border/30 rounded-xl p-4">
              <span className="text-xs text-muted-foreground block">ROAS</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold">{campaign.roas.toFixed(2)}x</span>
                <span className={`text-xs flex items-center ${campaign.roas >= 3 ? 'text-emerald-500' : 'text-destructive'}`}>
                  {campaign.roas >= 3 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                  {campaign.roas >= 3 ? '+15%' : '-8%'}
                </span>
              </div>
            </div>
            <div className="bg-muted/30 border border-border/30 rounded-xl p-4">
              <span className="text-xs text-muted-foreground block">CTR</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold">{campaign.ctr.toFixed(2)}%</span>
                <span className="text-xs text-emerald-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> +4.2%
                </span>
              </div>
            </div>
            <div className="bg-muted/30 border border-border/30 rounded-xl p-4">
              <span className="text-xs text-muted-foreground block">CPC</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold">${campaign.cpc.toFixed(2)}</span>
                <span className="text-xs text-emerald-500 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-0.5" /> -5.4%
                </span>
              </div>
            </div>
            <div className="bg-muted/30 border border-border/30 rounded-xl p-4">
              <span className="text-xs text-muted-foreground block">Total Conversions</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold">{campaign.conversions}</span>
                <span className="text-xs text-emerald-500 flex items-center font-medium">
                  +18.2%
                </span>
              </div>
            </div>
          </div>

          {/* AI SWOT Critique */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> AI SWOT Critique
            </h4>
            <div className="grid gap-3 text-xs">
              <div className="border border-emerald-500/20 bg-emerald-500/5 p-3.5 rounded-xl">
                <span className="font-semibold text-emerald-500 flex items-center gap-1.5 mb-1 text-[13px]">
                  <CheckCircle2 className="h-4 w-4" /> Strength
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  High purchasing intent in women 25-34 demographic. Click-through-rate is 45% above average.
                </p>
              </div>
              <div className="border border-destructive/20 bg-destructive/5 p-3.5 rounded-xl">
                <span className="font-semibold text-destructive flex items-center gap-1.5 mb-1 text-[13px]">
                  <AlertTriangle className="h-4 w-4" /> Weakness
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Ad fatigue detected in static lifestyle banners. CPC has scaled up by 12% in the last 48 hours.
                </p>
              </div>
              <div className="border border-primary/20 bg-primary/5 p-3.5 rounded-xl">
                <span className="font-semibold text-primary flex items-center gap-1.5 mb-1 text-[13px]">
                  <Zap className="h-4 w-4" /> Opportunity
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  Excellent hook scores (92/100) on UGC videos suggest scaling spend by 30% on video-focused ad sets.
                </p>
              </div>
            </div>
          </div>

          {/* Audience Breakdown Alert */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 space-y-2">
            <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">
              <Target className="h-4 w-4" /> Demographic Over-Indexing Alert
            </h4>
            <p className="text-xs text-foreground/80 leading-relaxed">
              Our analysis shows that **California (US)** and **Ontario (CA)** are over-indexing on conversions, driving 65% of total purchases but only consuming 30% of total spend.
            </p>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden mt-3">
              <div className="bg-primary h-full w-[65%]" />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Spend allocation: 30%</span>
              <span>Conversion yield: 65%</span>
            </div>
          </div>

          {/* Actionable Optimization Checklist */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500 animate-pulse" /> Actionable Next Steps
            </h4>
            <div className="space-y-2">
              {checklist.map(item => (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:bg-muted/50 ${
                    item.checked 
                      ? 'border-emerald-500/30 bg-emerald-500/5' 
                      : 'border-border/50 bg-card'
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                    item.checked 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-muted-foreground/50'
                  }`}>
                    {item.checked && <CheckCircle2 className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <span className={`text-xs select-none transition-all leading-normal ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-border/50 shrink-0 bg-background/50 backdrop-blur-md flex flex-col gap-3">
          <Button 
            className="w-full gap-2 relative overflow-hidden" 
            size="lg"
            onClick={handleSync}
            disabled={syncing || synced}
          >
            {syncing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Applying Changes...
              </>
            ) : synced ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500 animate-bounce" /> Synced with Meta Manager!
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 text-yellow-400" /> Apply Selected Optimizations
              </>
            )}
          </Button>
          <span className="text-[10px] text-center text-muted-foreground block">
            Directly updates bid caps, statuses, and budget distribution in Meta.
          </span>
        </div>

      </SheetContent>
    </Sheet>
  )
}
