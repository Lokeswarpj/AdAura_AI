"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowUpDown, Search, MoreHorizontal, TrendingUp, TrendingDown, Sparkles } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CampaignAuditDrawer } from "./campaign-audit-drawer"

const mockCampaigns = [
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
  },
]

export function CampaignTable() {
  const [sortColumn, setSortColumn] = React.useState<string>("spend")
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCampaign, setSelectedCampaign] = React.useState<any | null>(null)
  const [isAuditOpen, setIsAuditOpen] = React.useState(false)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const filteredData = mockCampaigns.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Manage and analyze your active campaigns.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-background/50"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border bg-card/50">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" onClick={() => handleSort("name")} className="font-semibold -ml-4">
                      Campaign Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort("spend")} className="font-semibold -mr-4 justify-end w-full">
                      Spend
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort("roas")} className="font-semibold -mr-4 justify-end w-full">
                      ROAS
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort("ctr")} className="font-semibold -mr-4 justify-end w-full">
                      CTR
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" onClick={() => handleSort("aiScore")} className="font-semibold -mr-4 justify-end w-full">
                      AI Score
                      <Sparkles className="ml-2 h-3 w-3 text-primary" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((campaign) => (
                  <TableRow key={campaign.id} className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setSelectedCampaign(campaign)
                            setIsAuditOpen(true)
                          }}
                          className="hover:underline hover:text-primary transition-colors text-left font-semibold cursor-pointer"
                        >
                          {campaign.name}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCampaign(campaign)
                            setIsAuditOpen(true)
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary/10 rounded-md text-primary cursor-pointer"
                          title="Ask AI Analyst"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        campaign.status === "active" ? "default" :
                        campaign.status === "learning" ? "secondary" : "destructive"
                      } className={
                        campaign.status === "active" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : ""
                      }>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${campaign.spend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={campaign.roas > 3 ? "text-emerald-500" : campaign.roas < 2 ? "text-destructive" : ""}>
                        {campaign.roas.toFixed(2)}x
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{campaign.ctr.toFixed(2)}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${campaign.aiScore > 80 ? 'bg-emerald-500' : campaign.aiScore > 60 ? 'bg-yellow-500' : 'bg-destructive'}`} 
                            style={{ width: `${campaign.aiScore}%` }} 
                          />
                        </div>
                        <span className="font-semibold w-6 text-right">{campaign.aiScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedCampaign(campaign)
                            setIsAuditOpen(true)
                          }}>View details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedCampaign(campaign)
                            setIsAuditOpen(true)
                          }}>Ask AI about this</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className={campaign.status === 'active' ? "text-destructive" : "text-emerald-500"}>
                            {campaign.status === 'active' ? "Pause campaign" : "Enable campaign"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <CampaignAuditDrawer 
        open={isAuditOpen} 
        onOpenChange={setIsAuditOpen} 
        campaign={selectedCampaign} 
      />
    </motion.div>

  )
}
