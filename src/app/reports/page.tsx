"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Download, 
  FileText, 
  Calendar, 
  Sparkles, 
  FileBarChart2, 
  Plus, 
  Check, 
  Loader2, 
  CheckCircle2, 
  Wand2,
  FileDown,
  Trash2,
  X,
  Info
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useIntegration } from "@/hooks/use-integration"

export default function ReportsPage() {
  const { connectedAccounts, openConnectModal } = useIntegration()
  const [campaigns, setCampaigns] = React.useState<any[]>([])
  const [reports, setReports] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  
  // Form states
  const [reportTitle, setReportTitle] = React.useState("")
  const [reportCategory, setReportCategory] = React.useState("campaign")
  const [targetMetric, setTargetMetric] = React.useState("roas")
  const [includeAi, setIncludeAi] = React.useState(true)

  // AI Compile states
  const [isCompiling, setIsCompiling] = React.useState(false)
  const [compileStep, setCompileStep] = React.useState(0)
  const [compileProgress, setCompileProgress] = React.useState(0)

  const hasLinkedAccounts = connectedAccounts.length > 0

  const compileStepsText = [
    "Syncing recent Meta campaign and ad set databases...",
    "Scanning creative assets and calculating thumb-stop hooks...",
    "Evaluating demographic biases and budget overlaps...",
    "Synthesizing actionable executive summaries...",
    "Compiling findings into premium PDF report..."
  ]

  // Sync campaigns and map dynamic reports
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
          
          if (fetchedCampaigns.length === 0) {
            setReports([])
          } else {
            setReports([
              {
                id: "rep-1",
                title: "Weekly Performance Summary",
                description: "Detailed breakdown of spend, ROAS, and conversions for the last 7 days.",
                type: "weekly",
                icon: Calendar,
                date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                size: "2.4 MB",
                highlight: false,
                isNew: false
              },
              {
                id: "rep-2",
                title: "AI Optimization Insights",
                description: "Automated analysis of audience fatigue and creative performance recommendations.",
                type: "ai-summary",
                icon: Sparkles,
                date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                size: "1.2 MB",
                highlight: true,
                isNew: false
              },
              {
                id: "rep-3",
                title: "Monthly Executive Report",
                description: "High-level overview of account health, trends, and month-over-month growth.",
                type: "monthly",
                icon: FileBarChart2,
                date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                size: "5.1 MB",
                highlight: false,
                isNew: false
              }
            ])
          }
        }
      } catch (err) {
        console.error("Failed syncing reports data:", err)
      } finally {
        setIsLoading(false)
      }
    }
    syncAds()
  }, [connectedAccounts])

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reportTitle.trim()) return

    setIsModalOpen(false)
    setIsCompiling(true)
    setCompileStep(0)
    setCompileProgress(0)

    // Start compile sequence animation
    let currentStep = 0
    const stepInterval = setInterval(() => {
      currentStep++
      if (currentStep < compileStepsText.length) {
        setCompileStep(currentStep)
        setCompileProgress((currentStep / compileStepsText.length) * 100)
      } else {
        clearInterval(stepInterval)
        setCompileProgress(100)
        
        // Finalize creation
        setTimeout(() => {
          setIsCompiling(false)
          
          const newReport = {
            id: `rep-${Date.now()}`,
            title: reportTitle,
            description: `Custom ${reportCategory.charAt(0).toUpperCase() + reportCategory.slice(1)} report optimized for ${targetMetric.toUpperCase()}.${includeAi ? " Powered by AI summaries." : ""}`,
            type: reportCategory,
            icon: reportCategory === "creative" ? Sparkles : FileBarChart2,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            size: "1.8 MB",
            highlight: includeAi,
            isNew: true
          }

          setReports(prev => [newReport, ...prev])
          setReportTitle("")
        }, 800)
      }
    }, 1000)
  }

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="flex-1 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 glow-text">
            <FileText className="h-6 w-6 text-violet-400 shrink-0" /> Reports & Exports
          </h2>
          <p className="text-muted-foreground">
            Download your automated performance digests and build custom optimization briefs.
          </p>
        </div>
        {hasLinkedAccounts && campaigns.length > 0 && (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="btn-pill-gradient text-xs px-4 h-9 gap-1.5 shrink-0 cursor-pointer font-bold"
          >
            <Plus className="h-3.5 w-3.5" /> 
            <span>Generate Custom Report</span>
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
                Connect your advertising account in settings to automatically generate monthly and weekly optimization briefs.
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
          <p className="text-xs text-muted-foreground">Synthesizing executive summaries...</p>
        </div>
      ) : reports.length === 0 ? (
        <Card className="border-dashed border-border/60 bg-muted/5 h-64 flex flex-col items-center justify-center text-center p-6 rounded-2xl">
          <div className="max-w-md space-y-3 flex flex-col items-center">
            <FileText className="h-10 w-10 text-muted-foreground/60" />
            <h3 className="text-sm font-semibold text-foreground">No reports compiled yet</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {!hasLinkedAccounts 
                ? "Connect your active ad integrations to download automated performance digests and build custom briefs."
                : "Your linked ad channels have no active campaigns. Performance executive briefs will compile automatically once campaigns begin generating impressions."}
            </p>
            {!hasLinkedAccounts && (
              <Button size="sm" onClick={() => openConnectModal()} className="h-8 mt-2 cursor-pointer font-semibold">
                Link Account Now
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* Roster of Reports */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {reports.map((report, i) => (
              <motion.div
                key={report.id}
                layoutId={report.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card className={`h-full flex flex-col border-border/50 bg-card/50 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-md relative overflow-hidden group ${
                  report.highlight ? 'border-primary/30 bg-primary/5' : ''
                }`}>
                  {report.isNew && (
                    <Badge className="absolute top-3 right-3 bg-emerald-500 hover:bg-emerald-600 text-white border-none animate-bounce">
                      NEW
                    </Badge>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-xl ${report.highlight ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground'}`}>
                        <report.icon className="h-5 w-5" />
                      </div>
                      {!report.isNew && (
                        <button
                          onClick={() => deleteReport(report.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-destructive rounded-md hover:bg-destructive/10 cursor-pointer"
                          title="Delete report"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <CardTitle className="mt-4 text-lg font-bold leading-tight">{report.title}</CardTitle>
                    <CardDescription className="leading-relaxed mt-2 text-xs">
                      {report.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="mt-auto flex justify-between items-center text-[10px] text-muted-foreground pb-4 border-t border-border/10 pt-3 mx-6">
                    <span>{report.date}</span>
                    <span className="font-mono">{report.size}</span>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button 
                      className={`w-full gap-2 ${report.highlight ? '' : 'variant-secondary'}`} 
                      variant={report.highlight ? "default" : "secondary"}
                      onClick={() => {
                        alert(`Downloading ${report.title}...`)
                      }}
                    >
                      <Download className="h-4 w-4" /> Download Brief
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Generator Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-background border border-border/60 rounded-2xl shadow-2xl relative overflow-hidden z-10"
            >
              <form onSubmit={handleGenerate}>
                <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/20">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" /> Report Synthesizer
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Title input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="title" className="text-xs font-semibold">Report Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Q3 Retargeting Audit"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      required
                      className="h-10 focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  {/* Report Type */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Report Focus Category</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "campaign", label: "Campaigns" },
                        { id: "creative", label: "Creatives" },
                        { id: "demographic", label: "Audiences" }
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setReportCategory(cat.id)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer text-center transition-all ${
                            reportCategory === cat.id 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-border/50 bg-card hover:bg-muted/50'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optimization Metric */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Primary Optimization Metric</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "roas", label: "ROAS (Return)" },
                        { id: "cpc", label: "CPA (Cost)" },
                        { id: "ctr", label: "CTR (Click Rate)" },
                        { id: "spend", label: "Spend Allocation" }
                      ].map(metric => (
                        <button
                          key={metric.id}
                          type="button"
                          onClick={() => setTargetMetric(metric.id)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer text-center transition-all ${
                            targetMetric === metric.id 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-border/50 bg-card hover:bg-muted/50'
                          }`}
                        >
                          {metric.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Include AI analysis */}
                  <div className="flex items-center justify-between p-3 border border-border/30 rounded-xl bg-muted/20">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-ai" className="text-xs font-semibold cursor-pointer">Inject AI Executive Critic</Label>
                      <span className="text-[10px] text-muted-foreground block leading-normal">Adds custom AI annotations and SWOT critiques</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIncludeAi(!includeAi)}
                      className={`h-5 w-9 rounded-full relative transition-colors duration-200 cursor-pointer ${
                        includeAi ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    >
                      <span className={`h-4 w-4 rounded-full bg-white absolute top-[2px] transition-transform duration-200 shadow-sm ${
                        includeAi ? "left-[18px]" : "left-[2px]"
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="p-6 border-t border-border/50 bg-muted/10 flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full cursor-pointer"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="w-full cursor-pointer"
                  >
                    Synthesize PDF
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Compile Sequence Overlay */}
      <AnimatePresence>
        {isCompiling && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            {/* Compiler Console Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-card/65 border border-primary/20 rounded-3xl p-8 relative overflow-hidden z-10 shadow-2xl backdrop-blur-md flex flex-col items-center text-center space-y-6"
            >
              {/* Spinning rings */}
              <div className="relative h-20 w-20 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-primary/10 border-t-primary rounded-full animate-spin duration-1000" />
                <div className="absolute inset-1.5 border-4 border-emerald-500/10 border-b-emerald-500 rounded-full animate-spin duration-700 reverse" />
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>

              <div className="space-y-2 w-full">
                <h4 className="font-extrabold text-lg text-foreground tracking-tight flex items-center justify-center gap-2">
                  AI Synthesizing Custom Brief
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Running multi-layered neural audits over your Meta campaign history.
                </p>
              </div>

              {/* Progress status console bar */}
              <div className="w-full space-y-3 bg-black/30 border border-border/50 rounded-2xl p-4 text-left font-mono text-xs text-muted-foreground min-h-[140px] flex flex-col justify-center">
                {compileStepsText.map((step, idx) => {
                  const isActive = idx === compileStep
                  const isDone = idx < compileStep
                  return (
                    <div 
                      key={idx}
                      className={`flex items-start gap-2.5 transition-opacity duration-300 ${
                        isActive ? 'text-primary font-bold opacity-100' : 
                        isDone ? 'text-emerald-500 opacity-60' : 'opacity-25'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      ) : isActive ? (
                        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin mt-0.5" />
                      ) : (
                        <div className="h-3.5 w-3.5 border border-muted-foreground/30 rounded-full shrink-0 mt-0.5" />
                      )}
                      <span className="leading-tight">{step}</span>
                    </div>
                  )
                })}
              </div>

              {/* Technical progress loading bar */}
              <div className="w-full space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>PRODUCING PDF</span>
                  <span>{compileProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden border border-border/20">
                  <motion.div 
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${compileProgress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
