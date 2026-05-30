"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  DollarSign, 
  MousePointerClick, 
  Target, 
  TrendingUp, 
  Users, 
  Activity,
  Info
} from "lucide-react"

import { KPICard } from "@/components/dashboard/kpi-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { CampaignTable } from "@/components/dashboard/campaign-table"
import { InsightsPanel } from "@/components/dashboard/insights-panel"
import { useIntegration } from "@/hooks/use-integration"

export default function Dashboard() {
  const { connectedAccounts } = useIntegration()
  const [metrics, setMetrics] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const hasLinkedAccounts = connectedAccounts.length > 0

  React.useEffect(() => {
    async function syncAds() {
      setIsLoading(true)
      try {
        const res = await fetch("/api/ads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectedAccounts, demoMode: false })
        })
        if (res.ok) {
          const data = await res.json()
          setMetrics(data.metrics || null)
        }
      } catch (err) {
        console.error("Failed syncing ad metrics:", err)
      } finally {
        setIsLoading(false)
      }
    }
    syncAds()
  }, [connectedAccounts])

  const displayKpiData = [
    {
      title: "Total Spend",
      value: metrics ? `$${metrics.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$0.00",
      change: 0,
      trend: "neutral" as const,
      icon: DollarSign,
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      title: "Avg. ROAS",
      value: metrics ? `${metrics.avgRoas.toFixed(2)}x` : "0.00x",
      change: 0,
      trend: "neutral" as const,
      icon: TrendingUp,
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      title: "Click-Through Rate",
      value: metrics ? `${metrics.ctr.toFixed(2)}%` : "0.00%",
      change: 0,
      trend: "neutral" as const,
      icon: MousePointerClick,
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      title: "Cost Per Click",
      value: metrics ? `$${metrics.cpc.toFixed(2)}` : "$0.00",
      change: 0,
      trend: "neutral" as const,
      icon: Target,
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      title: "CPM",
      value: metrics ? `$${metrics.cpm.toFixed(2)}` : "$0.00",
      change: 0,
      trend: "neutral" as const,
      icon: Users,
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      title: "Total Conversions",
      value: metrics ? metrics.totalConversions.toLocaleString() : "0",
      change: 0,
      trend: "neutral" as const,
      icon: Activity,
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ]

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 glow-text">Dashboard</h2>
          <p className="text-muted-foreground">
            Here's an overview of your live connected advertising channels.
          </p>
        </div>
      </div>

      {/* Warning/Banner if no active ad channels linked */}
      {!hasLinkedAccounts && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm backdrop-blur-md"
        >
          <div className="flex items-start sm:items-center gap-3">
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-xs">
              <span className="font-bold text-foreground block sm:inline mr-1">No active ad channels connected.</span>
              <span className="text-muted-foreground">
                To start tracking your performance metrics, please navigate to settings or click the header button to connect your Meta Ads or Google Ads accounts.
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {displayKpiData.map((kpi, i) => (
              <KPICard
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                trend={kpi.trend}
                icon={kpi.icon}
                data={kpi.data}
                delay={i * 0.1}
              />
            ))}
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7 xl:grid-cols-3">
            <div className="lg:col-span-4 xl:col-span-2">
              <PerformanceChart />
            </div>
            <div className="lg:col-span-3 xl:col-span-1 h-full">
              <InsightsPanel />
            </div>
          </div>

          <div className="pb-8">
            <CampaignTable />
          </div>
        </>
      )}
    </div>
  )
}
