"use client"

import { InsightsPanel } from "@/components/dashboard/insights-panel"

export default function AIInsightsPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Insights</h2>
          <p className="text-muted-foreground">
            All your automated insights in one place.
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <InsightsPanel />
      </div>
    </div>
  )
}
