"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Line, LineChart, ResponsiveContainer } from "recharts"

interface KPICardProps {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
  icon: React.ElementType
  data: number[]
  delay?: number
}

export function KPICard({ title, value, change, trend, icon: Icon, data, delay = 0 }: KPICardProps) {
  const chartData = data.map((value, index) => ({ value, index }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs flex items-center mt-1">
                {trend === "up" ? (
                  <span className="text-emerald-500 flex items-center font-medium">
                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                    {change}%
                  </span>
                ) : trend === "down" ? (
                  <span className="text-destructive flex items-center font-medium">
                    <ArrowDownIcon className="mr-1 h-3 w-3" />
                    {change}%
                  </span>
                ) : (
                  <span className="text-muted-foreground flex items-center font-medium">
                    {change}%
                  </span>
                )}
                <span className="text-muted-foreground ml-1">vs last period</span>
              </p>
            </div>
            <div className="h-10 w-16 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#64748b"}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
