"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, AlertTriangle, TrendingDown, Target, Zap, ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useIntegration } from "@/hooks/use-integration"

const mockInsights = [
  {
    id: "1",
    title: "CTR dropped 18% in last 3 days",
    description: "The 'Q3 Retargeting' campaign is showing signs of creative fatigue. We recommend refreshing the ad creatives.",
    severity: "high",
    icon: TrendingDown,
    time: "2 hours ago"
  },
  {
    id: "2",
    title: "Audience fatigue detected",
    description: "Lookalike 1% audience has reached 85% overlap. Consider testing a 2% Lookalike or broader targeting.",
    severity: "medium",
    icon: AlertTriangle,
    time: "5 hours ago"
  },
  {
    id: "3",
    title: "Best audience is Women 18-24",
    description: "This demographic has a 4.2x ROAS in your Advantage+ campaign. We suggest increasing budget allocation here.",
    severity: "info",
    icon: Target,
    time: "1 day ago"
  },
  {
    id: "4",
    title: "High-performing ad detected",
    description: "Video Creative 'UGC_Test_v2' has a thumb-stop ratio of 45%. Scaling this ad is recommended.",
    severity: "success",
    icon: Zap,
    time: "1 day ago"
  }
]

export function InsightsPanel({ campaigns: propCampaigns, isLoading: propIsLoading }: { campaigns?: any[], isLoading?: boolean }) {
  const { connectedAccounts } = useIntegration()
  const [internalCampaigns, setInternalCampaigns] = React.useState<any[]>([])
  const [internalIsLoading, setInternalIsLoading] = React.useState(true)

  const campaigns = propCampaigns ?? internalCampaigns
  const isLoading = propIsLoading ?? internalIsLoading

  React.useEffect(() => {
    if (propCampaigns !== undefined) return
    async function syncInsights() {
      setInternalIsLoading(true)
      try {
        const res = await fetch("/api/ads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectedAccounts, demoMode: false })
        })
        if (res.ok) {
          const data = await res.json()
          setInternalCampaigns(data.campaigns || [])
        }
      } catch (err) {
        console.error("Failed fetching live insights:", err)
      } finally {
        setInternalIsLoading(false)
      }
    }
    syncInsights()
  }, [connectedAccounts, propCampaigns])

  const generatedInsights = campaigns.map((c) => {
    let title = ""
    let description = ""
    let severity = "info"
    let icon = Target

    if (c.aiScore < 70) {
      title = `Optimization required for ${c.name}`
      description = `Campaign '${c.name}' has a lower than optimal audit score (${c.aiScore}/100). Consider refreshing your ad copies or creative structures.`
      severity = "high"
      icon = TrendingDown
    } else if (c.roas < 2.0) {
      title = `Low ROAS detected on ${c.name}`
      description = `ROAS is currently at ${c.roas.toFixed(2)}x. We suggest focusing on custom lookalike exclusions to decrease CAC.`
      severity = "medium"
      icon = AlertTriangle
    } else {
      title = `High-performing campaign: ${c.name}`
      description = `This campaign is running exceptionally well with an AI audit score of ${c.aiScore}/100 and ${c.conversions} conversions! Safe to scale budget.`
      severity = "success"
      icon = Zap
    }

    return {
      id: c.id,
      title,
      description,
      severity,
      icon,
      time: "Just synced"
    }
  })

  return (
    <Card className="glass-panel glowing-border-purple border-none h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-md">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Insights</CardTitle>
            <CardDescription>Automated analysis of your accounts</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2 space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center h-48 space-y-2">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full"
            />
            <p className="text-[11px] text-muted-foreground">Analyzing account health...</p>
          </div>
        ) : generatedInsights.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-48 space-y-2 px-4 py-8">
            <p className="text-xs font-semibold text-muted-foreground">No insights available</p>
            <p className="text-[11px] text-muted-foreground leading-normal">
              Once active campaigns are running, our AI will audit them in real-time to deliver scaling tips and warning signs.
            </p>
          </div>
        ) : (
          generatedInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="group relative rounded-xl border bg-card p-4 hover:shadow-md transition-all hover:border-primary/50"
            >
              <div className="flex gap-4">
                <div className={`mt-0.5 rounded-full p-1.5 h-fit ${
                  insight.severity === 'high' ? 'bg-destructive/20 text-destructive' :
                  insight.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                  insight.severity === 'success' ? 'bg-emerald-500/20 text-emerald-500' :
                  'bg-blue-500/20 text-blue-500'
                }`}>
                  <insight.icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm leading-none">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground">{insight.time}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Take Action <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
