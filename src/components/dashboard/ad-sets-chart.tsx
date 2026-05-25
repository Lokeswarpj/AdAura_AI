"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis, Legend } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const platformData = [
  { platform: "instagram", spend: 8900, fill: "var(--color-instagram)" },
  { platform: "facebook", spend: 6400, fill: "var(--color-facebook)" },
  { platform: "audience_network", spend: 1800, fill: "var(--color-audience_network)" },
  { platform: "messenger", spend: 900, fill: "var(--color-messenger)" },
]

const platformConfig = {
  spend: {
    label: "Spend ($)",
  },
  instagram: {
    label: "Instagram",
    color: "oklch(0.609 0.244 329.8)",
  },
  facebook: {
    label: "Facebook",
    color: "oklch(0.551 0.17 264.3)",
  },
  audience_network: {
    label: "Audience Network",
    color: "oklch(0.627 0.185 149.8)",
  },
  messenger: {
    label: "Messenger",
    color: "oklch(0.672 0.22 211.2)",
  },
} satisfies ChartConfig

const demographicData = [
  { age: "18-24", female: 420, male: 250 },
  { age: "25-34", female: 850, male: 610 },
  { age: "35-44", female: 540, male: 480 },
  { age: "45-54", female: 310, male: 290 },
  { age: "55+", female: 120, male: 150 },
]

const demographicConfig = {
  female: {
    label: "Female",
    color: "oklch(0.697 0.162 334.8)",
  },
  male: {
    label: "Male",
    color: "oklch(0.589 0.188 236.7)",
  },
} satisfies ChartConfig

export function AdSetsChart() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Platform Allocation */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-base">Platform Spend Allocation</CardTitle>
          <CardDescription>Visual breakdown of budgets across Meta platforms</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[260px] pb-4">
          <ChartContainer config={platformConfig} className="h-full w-full max-w-[280px]">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="platform" />}
              />
              <Pie
                data={platformData}
                dataKey="spend"
                nameKey="platform"
                innerRadius={60}
                strokeWidth={5}
                stroke="hsl(var(--card))"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          
          <div className="flex flex-col gap-2.5 text-xs text-muted-foreground ml-4">
            {platformData.map((item) => {
              const configItem = (platformConfig as any)[item.platform]
              const label = configItem?.label
              const color = configItem?.color
              const percent = ((item.spend / 18000) * 100).toFixed(0)
              return (
                <div key={item.platform} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="font-medium text-foreground">{label}</span>
                  <span className="ml-auto font-mono text-[11px] tabular-nums">({percent}%)</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Demographics Overview */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-base">Demographics Breakdown</CardTitle>
          <CardDescription>Age and Gender conversion yield</CardDescription>
        </CardHeader>
        <CardContent className="h-[260px] pb-4">
          <ChartContainer config={demographicConfig} className="h-full w-full">
            <BarChart data={demographicData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="age" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar 
                dataKey="female" 
                fill="var(--color-female)" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={18}
              />
              <Bar 
                dataKey="male" 
                fill="var(--color-male)" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={18}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
