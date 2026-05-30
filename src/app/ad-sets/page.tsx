"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Layers, 
  Sparkles, 
  Search, 
  ArrowUpDown, 
  Edit3, 
  Check, 
  X, 
  AlertTriangle,
  Play,
  Pause,
  ArrowUpRight,
  Info
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { AdSetsChart } from "@/components/dashboard/ad-sets-chart"
import { AdSetAudienceDrawer } from "@/components/dashboard/ad-set-audience-drawer"
import { useIntegration } from "@/hooks/use-integration"

export default function AdSetsPage() {
  const { connectedAccounts, openConnectModal } = useIntegration()
  const [campaigns, setCampaigns] = React.useState<any[]>([])
  const [adSets, setAdSets] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editingBudget, setEditingBudget] = React.useState<number>(0)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [sortColumn, setSortColumn] = React.useState<string>("conversions")
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc")

  const hasLinkedAccounts = connectedAccounts.length > 0

  // Fetch campaigns from backend dynamically
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
          const fetchedCampaigns = data.campaigns || []
          setCampaigns(fetchedCampaigns)
          
          // Generate ad sets based on campaigns
          if (fetchedCampaigns.length === 0) {
            setAdSets([])
          } else {
            const generatedAdSets = fetchedCampaigns.flatMap((c: any) => {
              return [
                {
                  id: `as-${c.id}a`,
                  name: `LAL 1% - Purchasers - ${c.platform === "meta" ? "US" : "Global"}`,
                  campaign: c.name,
                  conversions: Math.round(c.conversions * 0.6),
                  cpc: Math.round(c.cpc * 100) / 100,
                  roas: c.roas,
                  fatigue: (parseInt(c.id) * 23) % 45 + 15,
                  budget: Math.round((c.spend / 10) * 0.6) || 50,
                  status: c.status,
                  aiScore: Math.min(100, Math.max(0, c.aiScore + 2))
                },
                {
                  id: `as-${c.id}b`,
                  name: `Retargeting - Product Viewers - 30d`,
                  campaign: c.name,
                  conversions: Math.round(c.conversions * 0.4),
                  cpc: Math.round(c.cpc * 1.2 * 100) / 100,
                  roas: Math.round(c.roas * 1.15 * 10) / 10,
                  fatigue: (parseInt(c.id) * 37) % 55 + 35,
                  budget: Math.round((c.spend / 10) * 0.4) || 30,
                  status: c.status,
                  aiScore: Math.min(100, Math.max(0, c.aiScore - 3))
                }
              ]
            })
            setAdSets(generatedAdSets)
          }
        }
      } catch (err) {
        console.error("Failed syncing ad sets:", err)
      } finally {
        setIsLoading(false)
      }
    }
    syncAds()
  }, [connectedAccounts])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const toggleStatus = (id: string) => {
    setAdSets(prev => prev.map(as => {
      if (as.id === id) {
        return { ...as, status: as.status === "active" ? "paused" : "active" }
      }
      return as
    }))
  }

  const startEditing = (id: string, budget: number) => {
    setEditingId(id)
    setEditingBudget(budget)
  }

  const saveBudget = (id: string) => {
    setAdSets(prev => prev.map(as => {
      if (as.id === id) {
        return { ...as, budget: editingBudget }
      }
      return as
    }))
    setEditingId(null)
  }

  const filteredAdSets = adSets.filter(as => 
    as.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    as.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedAdSets = [...filteredAdSets].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Quick sums for KPI metrics (safe guard against empty data)
  const totalConversions = adSets.reduce((acc, curr) => acc + curr.conversions, 0)
  const avgRoas = adSets.length > 0 ? (adSets.reduce((acc, curr) => acc + curr.roas, 0) / adSets.length).toFixed(2) : "0.00"
  const avgCpc = adSets.length > 0 ? (adSets.reduce((acc, curr) => acc + curr.cpc, 0) / adSets.length).toFixed(2) : "0.00"
  const activeCount = adSets.filter(as => as.status === "active").length

  return (
    <div className="flex-1 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 glow-text">
            <Layers className="h-6 w-6 text-violet-400 shrink-0" /> Ad Sets Targeting
          </h2>
          <p className="text-muted-foreground">
            Manage your audience targeting segments, budget distributions, and ad set health.
          </p>
        </div>
        {hasLinkedAccounts && campaigns.length > 0 && (
          <button 
            onClick={() => setIsDrawerOpen(true)} 
            className="btn-pill-gradient text-xs px-4 h-9 gap-1.5 shrink-0 cursor-pointer font-bold"
          >
            <Sparkles className="h-3.5 w-3.5" /> 
            <span>Get AI Targeting Ideas</span>
          </button>
        )}
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
                To start tracking targeting metrics and demographics, connect your Meta Ads or Google Ads account in settings.
              </span>
            </div>
          </div>
          <Button size="sm" onClick={() => openConnectModal()} className="shrink-0 text-xs h-8 cursor-pointer font-semibold">
            Connect Account
          </Button>
        </motion.div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          />
          <p className="text-xs text-muted-foreground">Analyzing targeting structures...</p>
        </div>
      ) : (
        <>
          {/* KPI Cards Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-medium uppercase tracking-wider">Active Segments</CardDescription>
                <CardTitle className="text-2xl font-black mt-1">
                  {activeCount} <span className="text-xs text-muted-foreground font-normal">/ {adSets.length} Total</span>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-medium uppercase tracking-wider">Targeting Conversions</CardDescription>
                <CardTitle className="text-2xl font-black mt-1">{totalConversions}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-medium uppercase tracking-wider">Avg Cost Per Result</CardDescription>
                <CardTitle className="text-2xl font-black mt-1">${avgCpc}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-medium uppercase tracking-wider">Average Target ROAS</CardDescription>
                <CardTitle className="text-2xl font-black mt-1">{avgRoas}x</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Demographic charts */}
          <AdSetsChart campaigns={campaigns} isLoading={isLoading} />

          {/* Main Table section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Targeting Roster</CardTitle>
                  <CardDescription>Audience groups and dynamic budgets.</CardDescription>
                </div>
                {adSets.length > 0 && (
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search ad sets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 bg-background/50"
                    />
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border bg-card/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead className="min-w-[200px]">
                        <Button variant="ghost" onClick={() => handleSort("name")} className="font-semibold -ml-4">
                          Ad Set Name <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Associated Campaign</TableHead>
                      <TableHead className="text-right">
                        <Button variant="ghost" onClick={() => handleSort("budget")} className="font-semibold -mr-4 justify-end w-full">
                          Daily Budget <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button variant="ghost" onClick={() => handleSort("conversions")} className="font-semibold -mr-4 justify-end w-full">
                          Conversions <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button variant="ghost" onClick={() => handleSort("roas")} className="font-semibold -mr-4 justify-end w-full">
                          ROAS <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Fatigue Level</TableHead>
                      <TableHead className="text-right">
                        <Button variant="ghost" onClick={() => handleSort("aiScore")} className="font-semibold -mr-4 justify-end w-full">
                          AI Score <Sparkles className="ml-2 h-3.5 w-3.5 text-primary" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAdSets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-48 text-center">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <p className="text-sm font-semibold text-muted-foreground">No active ad sets found</p>
                            <p className="text-xs text-muted-foreground max-w-sm">
                              {!hasLinkedAccounts 
                                ? "Connect an advertising account to synchronize targeting segments in real-time."
                                : "Your linked ad channels have no active campaigns. Once you deploy active targeting groups on your ad network, they will populate here dynamically."}
                            </p>
                            {!hasLinkedAccounts && (
                              <Button size="sm" onClick={() => openConnectModal()} className="h-8 mt-2 cursor-pointer font-semibold">
                                Link Account Now
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedAdSets.map((as) => (
                        <TableRow key={as.id} className="group hover:bg-muted/50 transition-colors">
                          {/* Toggle Switch */}
                          <TableCell>
                            <button
                              onClick={() => toggleStatus(as.id)}
                              className={`h-5 w-9 rounded-full relative transition-colors duration-200 cursor-pointer ${
                                as.status === "active" ? "bg-emerald-500" : "bg-muted-foreground/30"
                              }`}
                            >
                              <span className={`h-4 w-4 rounded-full bg-white absolute top-[2px] transition-transform duration-200 shadow-sm ${
                                as.status === "active" ? "left-[18px]" : "left-[2px]"
                              }`} />
                            </button>
                          </TableCell>
                          
                          {/* Name & status indicator */}
                          <TableCell className="font-semibold">
                            <div className="flex flex-col">
                              <span>{as.name}</span>
                              <span className="text-[10px] text-muted-foreground font-normal mt-0.5 uppercase tracking-wide">{as.id}</span>
                            </div>
                          </TableCell>
                          
                          {/* Associated Campaign */}
                          <TableCell className="text-muted-foreground text-xs">{as.campaign}</TableCell>
                          
                          {/* Interactive Budget adjust */}
                          <TableCell className="text-right">
                            <AnimatePresence mode="wait">
                              {editingId === as.id ? (
                                <motion.div 
                                  key="edit"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center justify-end gap-1.5"
                                >
                                  <Input
                                    type="number"
                                    value={editingBudget}
                                    onChange={(e) => setEditingBudget(Number(e.target.value))}
                                    className="h-8 w-16 text-right px-1.5 focus-visible:ring-1 focus-visible:ring-primary"
                                  />
                                  <Button 
                                    size="icon" 
                                    variant="outline" 
                                    className="h-7 w-7 rounded-md text-emerald-500 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer"
                                    onClick={() => saveBudget(as.id)}
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    size="icon" 
                                    variant="outline" 
                                    className="h-7 w-7 rounded-md text-destructive border-destructive/20 bg-destructive/5 hover:bg-destructive/10 cursor-pointer"
                                    onClick={() => setEditingId(null)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </motion.div>
                              ) : (
                                <motion.div 
                                  key="view"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center justify-end gap-1.5 group/budget"
                                >
                                  <span className="font-mono">${as.budget}/day</span>
                                  <button
                                    onClick={() => startEditing(as.id, as.budget)}
                                    className="opacity-0 group-hover/budget:opacity-100 p-1 hover:bg-muted border border-transparent hover:border-border rounded-md text-muted-foreground hover:text-foreground cursor-pointer transition-all"
                                    title="Edit budget"
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </TableCell>
                          
                          {/* Conversions */}
                          <TableCell className="text-right font-mono font-medium">{as.conversions}</TableCell>
                          
                          {/* ROAS */}
                          <TableCell className="text-right font-semibold">
                            <span className={as.roas > 3.5 ? "text-emerald-500" : as.roas < 2.5 ? "text-destructive" : ""}>
                              {as.roas.toFixed(2)}x
                            </span>
                          </TableCell>
                          
                          {/* Fatigue */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden shrink-0">
                                <div 
                                  className={`h-full ${as.fatigue > 70 ? 'bg-destructive' : as.fatigue > 40 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${as.fatigue}%` }}
                                />
                              </div>
                              <span className={`text-[10px] font-bold ${
                                as.fatigue > 70 ? 'text-destructive flex items-center gap-0.5' : 
                                as.fatigue > 40 ? 'text-yellow-500' : 'text-emerald-500'
                              }`}>
                                {as.fatigue}%
                                {as.fatigue > 70 && <AlertTriangle className="h-2.5 w-2.5" />}
                              </span>
                            </div>
                          </TableCell>
                          
                          {/* AI Score */}
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1.5 font-bold">
                              <span className={as.aiScore > 80 ? 'text-emerald-500' : as.aiScore > 60 ? 'text-yellow-500' : 'text-destructive'}>
                                {as.aiScore}
                              </span>
                              <Sparkles className="h-3 w-3 text-primary shrink-0" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* recommendations drawer */}
      <AdSetAudienceDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />

    </div>
  )
}
