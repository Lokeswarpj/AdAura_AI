"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useIntegration } from "@/hooks/use-integration"

const chartDataDemo = [
  { date: "May 01", spend: 1200, roas: 2.4, ctr: 1.2 },
  { date: "May 02", spend: 1350, roas: 2.6, ctr: 1.3 },
  { date: "May 03", spend: 1100, roas: 2.2, ctr: 1.1 },
  { date: "May 04", spend: 1450, roas: 2.8, ctr: 1.4 },
  { date: "May 05", spend: 1800, roas: 3.1, ctr: 1.5 },
  { date: "May 06", spend: 1950, roas: 3.4, ctr: 1.6 },
  { date: "May 07", spend: 2100, roas: 3.2, ctr: 1.5 },
  { date: "May 08", spend: 1900, roas: 2.9, ctr: 1.4 },
  { date: "May 09", spend: 2200, roas: 3.5, ctr: 1.7 },
  { date: "May 10", spend: 2400, roas: 3.8, ctr: 1.8 },
  { date: "May 11", spend: 2100, roas: 3.4, ctr: 1.6 },
  { date: "May 12", spend: 2500, roas: 4.1, ctr: 1.9 },
  { date: "May 13", spend: 2800, roas: 4.5, ctr: 2.1 },
  { date: "May 14", spend: 3100, roas: 4.8, ctr: 2.3 },
]

const chartDataLive = [
  { date: "May 01", spend: 0, roas: 0, ctr: 0 },
  { date: "May 02", spend: 0, roas: 0, ctr: 0 },
  { date: "May 03", spend: 0, roas: 0, ctr: 0 },
  { date: "May 04", spend: 0, roas: 0, ctr: 0 },
  { date: "May 05", spend: 0, roas: 0, ctr: 0 },
  { date: "May 06", spend: 0, roas: 0, ctr: 0 },
  { date: "May 07", spend: 0, roas: 0, ctr: 0 },
  { date: "May 08", spend: 0, roas: 0, ctr: 0 },
  { date: "May 09", spend: 0, roas: 0, ctr: 0 },
  { date: "May 10", spend: 0, roas: 0, ctr: 0 },
  { date: "May 11", spend: 0, roas: 0, ctr: 0 },
  { date: "May 12", spend: 0, roas: 0, ctr: 0 },
  { date: "May 13", spend: 0, roas: 0, ctr: 0 },
  { date: "May 14", spend: 0, roas: 0, ctr: 0 },
]

const chartConfig = {
  spend: {
    label: "Spend ($)",
    color: "hsl(var(--chart-1))",
  },
  roas: {
    label: "ROAS",
    color: "hsl(var(--chart-2))",
  },
  ctr: {
    label: "CTR (%)",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function PerformanceChart() {
  const [activeMetric, setActiveMetric] = React.useState<"spend" | "roas" | "ctr">("spend")
  const displayChartData = chartDataLive

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-panel glowing-border-purple border-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-1">
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Daily trend for selected metric</CardDescription>
          </div>
          <Select value={activeMetric} onValueChange={(value: any) => setActiveMetric(value)}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spend">Spend</SelectItem>
              <SelectItem value="roas">ROAS</SelectItem>
              <SelectItem value="ctr">CTR</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full mt-4">
            <AreaChart accessibilityLayer data={displayChartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <defs>
                <linearGradient id={`fill${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`var(--color-${activeMetric})`} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={`var(--color-${activeMetric})`} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey={activeMetric}
                type="monotone"
                fill={`url(#fill${activeMetric})`}
                stroke={`var(--color-${activeMetric})`}
                fillOpacity={0.4}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
