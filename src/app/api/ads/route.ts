import { NextResponse } from "next/server"
import { fetchMetaCampaigns, fetchGoogleCampaigns, aggregateMetrics, UnifiedCampaign } from "@/lib/ad-services"

export async function POST(req: Request) {
  try {
    const { connectedAccounts, demoMode } = await req.json()

    if (demoMode) {
      // In Demo Mode, return the static aggregated demo campaign data
      return NextResponse.json({
        success: true,
        campaigns: [
          {
            id: "1",
            name: "Q3 Retargeting - All Visitors",
            status: "active",
            spend: 3450.00,
            ctr: 2.4,
            cpc: 0.85,
            roas: 4.2,
            conversions: 124,
            aiScore: 92,
            platform: "meta"
          },
          {
            id: "2",
            name: "Lookalike 1% - Purchasers",
            status: "active",
            spend: 8900.50,
            ctr: 1.8,
            cpc: 1.10,
            roas: 2.8,
            conversions: 215,
            aiScore: 78,
            platform: "meta"
          },
          {
            id: "3",
            name: "Broad - US/CA - 18-35",
            status: "paused",
            spend: 12500.00,
            ctr: 0.9,
            cpc: 2.40,
            roas: 1.2,
            conversions: 89,
            aiScore: 45,
            platform: "meta"
          },
          {
            id: "4",
            name: "Advantage+ Shopping Campaign",
            status: "learning",
            spend: 1200.00,
            ctr: 3.1,
            cpc: 0.65,
            roas: 3.5,
            conversions: 45,
            aiScore: 85,
            platform: "meta"
          },
          {
            id: "5",
            name: "Winback - Last 90 Days",
            status: "active",
            spend: 2100.00,
            ctr: 2.1,
            cpc: 0.95,
            roas: 5.1,
            conversions: 98,
            aiScore: 95,
            platform: "meta"
          }
        ],
        metrics: {
          totalSpend: 45231.89,
          avgRoas: 3.24,
          ctr: 1.84,
          cpc: 0.85,
          cpm: 12.40,
          totalConversions: 1204
        }
      })
    }

    if (!connectedAccounts || connectedAccounts.length === 0) {
      return NextResponse.json({
        success: true,
        campaigns: [],
        metrics: {
          totalSpend: 0,
          avgRoas: 0,
          ctr: 0,
          cpc: 0,
          cpm: 0,
          totalConversions: 0
        }
      })
    }

    const campaigns: UnifiedCampaign[] = []
    const errors: string[] = []

    // Loop through linked platforms and fetch live API statistics
    for (const account of connectedAccounts) {
      try {
        if (account.platform === "meta" && account.credentials?.accessToken && account.credentials?.adAccountId) {
          const metaCampaigns = await fetchMetaCampaigns(
            account.credentials.accessToken,
            account.credentials.adAccountId
          )
          campaigns.push(...metaCampaigns)
        } else if (account.platform === "google" && account.credentials?.customerId && account.credentials?.developerToken && account.credentials?.accessToken) {
          const googleCampaigns = await fetchGoogleCampaigns(
            account.credentials.customerId,
            account.credentials.developerToken,
            account.credentials.accessToken
          )
          campaigns.push(...googleCampaigns)
        }
      } catch (err: any) {
        console.error(`Failed to sync platform ${account.platform}:`, err)
        errors.push(`Sync failed for ${account.platform}: ${err.message}`)
      }
    }

    const aggregated = aggregateMetrics(campaigns)

    return NextResponse.json({
      success: true,
      campaigns,
      metrics: aggregated,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error: any) {
    console.error("Ads tracking API endpoint error:", error)
    return NextResponse.json(
      { error: "Internal Server Error occurred while tracking ads." },
      { status: 500 }
    )
  }
}
