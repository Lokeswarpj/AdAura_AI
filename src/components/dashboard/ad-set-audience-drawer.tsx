"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Target, 
  Users, 
  Zap, 
  Copy, 
  Check, 
  ChevronRight,
  TrendingUp,
  Briefcase,
  Globe
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

interface AdSetAudienceDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockClusters = [
  {
    id: 1,
    name: "High LTV Luxury Shoppers",
    size: "2.1M - 2.5M",
    roas: "4.8x",
    demographics: "US & CA, Age 28-54",
    parameters: "Lookalike 2% (Purchasers) ∩ Engaged Shoppers ∩ Luxury Goods",
    why: "This cluster has historically low CPMs and extremely high purchase frequency during holiday sales.",
    type: "lal-hybrid"
  },
  {
    id: 2,
    name: "Eco-Conscious Creatives",
    size: "3.2M - 3.8M",
    roas: "3.9x",
    demographics: "Global, Age 20-40",
    parameters: "Interests: Sustainable living ∩ Design ∩ Cruelty-free cosmetics",
    why: "High video completion rates on Instagram Reels. Excellent match for UGC creative format v2.",
    type: "interest-broad"
  },
  {
    id: 3,
    name: "Tech-Savy Side-Hustlers",
    size: "1.5M - 1.8M",
    roas: "3.5x",
    demographics: "US, Age 22-35",
    parameters: "Interests: Shopify ∩ SaaS ∩ Web design ∩ Freelancing",
    why: "Perfect demographic for professional SaaS hooks. Click-through rates expected to exceed 2.8%.",
    type: "professional"
  }
]

export function AdSetAudienceDrawer({ open, onOpenChange }: AdSetAudienceDrawerProps) {
  const [copiedId, setCopiedId] = React.useState<number | null>(null)
  const [creatingId, setCreatingId] = React.useState<number | null>(null)
  const [createdId, setCreatedId] = React.useState<number | null>(null)

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCreate = (id: number) => {
    setCreatingId(id)
    setTimeout(() => {
      setCreatingId(null)
      setCreatedId(id)
      setTimeout(() => setCreatedId(null), 2500)
    }, 2000)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[100vw] sm:max-w-md md:max-w-lg border-l border-border/50 bg-background/95 backdrop-blur-md p-0 flex flex-col h-full z-[100]">
        
        {/* Header */}
        <SheetHeader className="p-6 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-xl text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <SheetTitle className="text-lg font-bold">AI Targeting Recommendations</SheetTitle>
              <SheetDescription className="text-xs">Laser-focused audience clusters compiled from account history.</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            {mockClusters.map((cluster, i) => (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="border border-border/50 bg-card rounded-2xl p-5 space-y-4 relative overflow-hidden group hover:border-primary/50 hover:shadow-md transition-all"
              >
                {/* Top header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[10px] uppercase font-semibold border-primary/30 text-primary bg-primary/5">
                      {cluster.type.replace('-', ' ')}
                    </Badge>
                    <h4 className="font-bold text-base leading-tight mt-1 group-hover:text-primary transition-colors">{cluster.name}</h4>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground font-semibold flex items-center justify-end gap-1">
                      <TrendingUp className="h-3 w-3 text-emerald-500" /> ROAS EST.
                    </div>
                    <div className="text-lg font-black text-emerald-500 mt-0.5">{cluster.roas}</div>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-border/30 py-3">
                  <div>
                    <span className="text-muted-foreground block font-medium">Audience Size</span>
                    <span className="font-semibold flex items-center gap-1.5 mt-0.5 text-foreground">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" /> {cluster.size}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block font-medium">Demographics</span>
                    <span className="font-semibold flex items-center gap-1.5 mt-0.5 text-foreground truncate" title={cluster.demographics}>
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" /> {cluster.demographics}
                    </span>
                  </div>
                </div>

                {/* Parameters block */}
                <div className="space-y-1">
                  <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider block">Targeting Parameters</span>
                  <div className="bg-muted/50 border border-border/30 rounded-xl p-3 flex items-center justify-between gap-4">
                    <code className="text-xs font-mono select-all text-foreground truncate leading-relaxed">
                      {cluster.parameters}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleCopy(cluster.id, cluster.parameters)}
                      className="shrink-0 cursor-pointer"
                      title="Copy parameters"
                    >
                      {copiedId === cluster.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* AI Justification text */}
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-primary block mb-0.5">AI Analysis:</span>
                  {cluster.why}
                </div>

                {/* Direct Action */}
                <Button 
                  className="w-full gap-2 text-xs" 
                  variant={createdId === cluster.id ? "secondary" : "outline"}
                  onClick={() => handleCreate(cluster.id)}
                  disabled={creatingId !== null || createdId !== null}
                >
                  {creatingId === cluster.id ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full shrink-0"
                      />
                      Creating Ad Set in Meta Manager...
                    </>
                  ) : createdId === cluster.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      Created! Active in Campaign Drafts.
                    </>
                  ) : (
                    <>
                      <Zap className="h-3.5 w-3.5 text-primary shrink-0" />
                      Deploy Target Cluster to Meta
                    </>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border/50 shrink-0 bg-background/50 text-[10px] text-center text-muted-foreground">
          Recommended target audiences are synced as draft Ad Sets within your Meta Ads Manager dashboard.
        </div>

      </SheetContent>
    </Sheet>
  )
}
