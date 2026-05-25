"use client"

import { CampaignTable } from "@/components/dashboard/campaign-table"

export default function CampaignsPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">
            Manage all your Meta Ads campaigns in one place.
          </p>
        </div>
      </div>
      
      <CampaignTable />
    </div>
  )
}
