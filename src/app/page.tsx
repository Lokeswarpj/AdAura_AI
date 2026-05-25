"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  DollarSign, 
  MousePointerClick, 
  Target, 
  TrendingUp, 
  Users, 
  Activity 
} from "lucide-react"

import { KPICard } from "@/components/dashboard/kpi-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { CampaignTable } from "@/components/dashboard/campaign-table"
import { InsightsPanel } from "@/components/dashboard/insights-panel"

const kpiData = [
  {
    title: "Total Spend",
    value: "$45,231.89",
    change: 12.5,
    trend: "up" as const,
    icon: DollarSign,
    data: [200, 250, 210, 300, 280, 320, 350],
  },
  {
    title: "Avg. ROAS",
    value: "3.24x",
    change: 4.2,
    trend: "up" as const,
    icon: TrendingUp,
    data: [2.8, 2.9, 3.1, 3.0, 3.2, 3.4, 3.24],
  },
  {
    title: "Click-Through Rate",
    value: "1.84%",
    change: -2.1,
    trend: "down" as const,
    icon: MousePointerClick,
    data: [2.1, 2.0, 1.9, 1.95, 1.8, 1.85, 1.84],
  },
  {
    title: "Cost Per Click",
    value: "$0.85",
    change: -5.4,
    trend: "up" as const, // For CPC, lower is better, so down could be green, but let's stick to standard up=green for now, or just show neutral
    icon: Target,
    data: [0.95, 0.92, 0.88, 0.90, 0.87, 0.86, 0.85],
  },
  {
    title: "CPM",
    value: "$12.40",
    change: 1.2,
    trend: "neutral" as const,
    icon: Users,
    data: [12.0, 12.2, 12.1, 12.5, 12.4, 12.3, 12.4],
  },
  {
    title: "Total Conversions",
    value: "1,204",
    change: 18.2,
    trend: "up" as const,
    icon: Activity,
    data: [150, 160, 155, 175, 180, 195, 210],
  },
]

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Here's an overview of your Meta Ads performance.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpiData.map((kpi, i) => (
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
    </div>
  )
}
