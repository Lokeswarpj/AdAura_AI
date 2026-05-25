"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, 
  Plug, 
  Bell, 
  Users, 
  CreditCard, 
  Moon, 
  Sun, 
  CheckCircle2,
  Trash2,
  Plus,
  X,
  Loader2,
  Check,
  Sparkles,
  Zap,
  TrendingUp,
  Shield,
  Briefcase,
  AlertTriangle
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

// Initial Team roster
const initialTeam = [
  { id: "tm-1", name: "Lokeswar PJ", email: "lokeswarpj4@gmail.com", role: "Owner", status: "active", avatar: "LP" },
  { id: "tm-2", name: "Sarah Chen", email: "sarah.c@acme.co", role: "Analyst", status: "active", avatar: "SC" },
  { id: "tm-3", name: "David Kim", email: "d.kim@acme.co", role: "Viewer", status: "invited", avatar: "DK" }
]

// Initial Invoices
const initialInvoices = [
  { id: "INV-602", date: "May 15, 2026", amount: 79.00, status: "Paid" },
  { id: "INV-584", date: "Apr 15, 2026", amount: 79.00, status: "Paid" },
  { id: "INV-511", date: "Mar 15, 2026", amount: 79.00, status: "Paid" }
]

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()

  // Slack Webhook Integration state
  const [slackWebhook, setSlackWebhook] = React.useState("https://hooks.slack.com/services/YOUR_WORKSPACE_ID/YOUR_CHANNEL_ID/YOUR_TOKEN")
  const [slackTesting, setSlackTesting] = React.useState(false)
  const [slackTested, setSlackTested] = React.useState(false)

  // Team management states
  const [team, setTeam] = React.useState(initialTeam)
  const [isInviteOpen, setIsInviteOpen] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState("Analyst")
  const [inviteName, setInviteName] = React.useState("")

  // Slack test simulation
  const testSlack = () => {
    setSlackTesting(true)
    setTimeout(() => {
      setSlackTesting(false)
      setSlackTested(true)
      setTimeout(() => setSlackTested(false), 2500)
    }, 1500)
  }

  // Invite member trigger
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim() || !inviteName.trim()) return

    const newMember = {
      id: `tm-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: "invited",
      avatar: inviteName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    }

    setTeam(prev => [...prev, newMember])
    setIsInviteOpen(false)
    setInviteEmail("")
    setInviteName("")
  }

  // Delete team member
  const removeMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id))
  }

  // Edit member role
  const updateRole = (id: string, newRole: string) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m))
  }

  return (
    <div className="flex-1 space-y-6">
      
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" /> Settings
        </h2>
        <p className="text-muted-foreground">
          Manage your account configurations, integrations, team, and billing structures.
        </p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="bg-muted/50 w-full justify-start overflow-x-auto border-b border-border/20 rounded-none h-11 p-0">
          <TabsTrigger value="integrations" className="gap-2 px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-11"><Plug className="h-4 w-4" /> Integrations</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-11"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="team" className="gap-2 px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-11"><Users className="h-4 w-4" /> Team</TabsTrigger>
          <TabsTrigger value="billing" className="gap-2 px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-11"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2 px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-11"><Moon className="h-4 w-4" /> Appearance</TabsTrigger>
        </TabsList>

        {/* ==================== INTEGRATIONS TAB ==================== */}
        <TabsContent value="integrations">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Meta Ads Integration</CardTitle>
                <CardDescription>Connect your Meta Business account to sync campaigns and insights.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-2xl bg-background/50">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="fill-current text-white h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1.1-6.1h-2.5v-4h3.6v-2.8c0-3.6 2.2-5.5 5.3-5.5 1.5 0 2.8.1 3.2.2v3.7h-2.2c-1.7 0-2 .8-2 2v2.4h4.1l-.5 4h-3.6v8.1c-1.2.2-2.5.3-3.8.3s-2.6-.1-3.8-.3v-8.1h-3.5v-4h3.5V18c0-3.5 2.1-5.4 5.2-5.4 1.5 0 2.8.1 3.2.2v3.7h-2.2c-1.7 0-2 .8-2 2v2.4h3.9l-.5 4h-3.4v6.1z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Meta Business Manager</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Connected as Acme Corp
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 cursor-pointer shrink-0">Disconnect</Button>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-semibold">Sync Syncing Settings</h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-sync" className="flex flex-col gap-1 cursor-pointer">
                      <span>Auto-sync metrics</span>
                      <span className="text-xs text-muted-foreground font-normal">Pull latest data every 15 minutes</span>
                    </Label>
                    <Switch id="auto-sync" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ai-analysis" className="flex flex-col gap-1 cursor-pointer">
                      <span>Automated AI Analysis</span>
                      <span className="text-xs text-muted-foreground font-normal">Allow AI Analyst to score campaigns and creatives</span>
                    </Label>
                    <Switch id="ai-analysis" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ==================== NOTIFICATIONS TAB ==================== */}
        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Anomaly Toggles</CardTitle>
                <CardDescription>Get notified when something goes out of standard bounds.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-ctr" className="flex flex-col gap-1 cursor-pointer">
                    <span>Creative Hook Fatigue</span>
                    <span className="text-xs text-muted-foreground font-normal">When CTR drops by over 15% in a 48 hour span</span>
                  </Label>
                  <Switch id="notif-ctr" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-cpc" className="flex flex-col gap-1 cursor-pointer">
                    <span>CPC Spike Alerts</span>
                    <span className="text-xs text-muted-foreground font-normal">Notify immediately if Cost Per Click spikes by over 30%</span>
                  </Label>
                  <Switch id="notif-cpc" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-budget" className="flex flex-col gap-1 cursor-pointer">
                    <span>Weekly AI Optimization Brief</span>
                    <span className="text-xs text-muted-foreground font-normal">Receive detailed optimization digests every Friday morning</span>
                  </Label>
                  <Switch id="notif-budget" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Slack Integration Webhook</CardTitle>
                <CardDescription>Pipe critical ad alerts directly into your team channels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="webhook" className="text-xs font-semibold">Slack Webhook URL</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="webhook"
                      value={slackWebhook}
                      onChange={(e) => setSlackWebhook(e.target.value)}
                      className="font-mono text-xs focus-visible:ring-1 focus-visible:ring-primary flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={testSlack}
                      disabled={slackTesting}
                      className="shrink-0 cursor-pointer"
                    >
                      {slackTesting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Testing
                        </>
                      ) : slackTested ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-500 mr-1.5 animate-bounce" /> Success
                        </>
                      ) : "Test Channel"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ==================== TEAM TAB ==================== */}
        <TabsContent value="team">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Collaborators</CardTitle>
                  <CardDescription>Manage user roles and dashboard editing scopes.</CardDescription>
                </div>
                <Button onClick={() => setIsInviteOpen(true)} className="gap-2 shrink-0 cursor-pointer">
                  <Plus className="h-4 w-4" /> Invite Member
                </Button>
              </CardHeader>
              
              <CardContent>
                <div className="border border-border/30 rounded-2xl overflow-hidden bg-background/50">
                  <div className="divide-y divide-border/20">
                    {team.map((member) => (
                      <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary shrink-0 text-sm">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-sm flex items-center gap-2">
                              {member.name}
                              {member.status === "invited" && (
                                <Badge variant="secondary" className="text-[10px] py-0 border-none bg-yellow-500/10 text-yellow-500">
                                  Invited
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">{member.email}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                          {member.role === "Owner" ? (
                            <Badge className="text-xs py-1 border-none bg-primary/10 text-primary font-semibold select-none">
                              Owner
                            </Badge>
                          ) : (
                            <select
                              value={member.role}
                              onChange={(e) => updateRole(member.id, e.target.value)}
                              className="text-xs border border-border/50 bg-card rounded-lg px-2.5 py-1 focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer font-medium"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Analyst">Analyst</option>
                              <option value="Viewer">Viewer</option>
                            </select>
                          )}

                          {member.role !== "Owner" && (
                            <button
                              onClick={() => removeMember(member.id)}
                              className="p-1 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
                              title="Revoke access"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* ==================== BILLING TAB ==================== */}
        <TabsContent value="billing">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* SaaS Tier Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-border/50 bg-card/50 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="w-fit text-[9px] font-bold border-none uppercase">Starter</Badge>
                  <CardTitle className="text-xl font-bold mt-2">Ad copy brief</CardTitle>
                  <CardDescription className="text-xs">Perfect for single stores</CardDescription>
                  <div className="text-2xl font-black mt-2">$29 <span className="text-xs font-normal text-muted-foreground">/ mo</span></div>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full text-xs cursor-pointer">Downgrade</Button>
                </CardFooter>
              </Card>

              <Card className="border-primary bg-primary/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between border-2">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] px-3 py-1 font-bold rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Active
                </div>
                <CardHeader className="pb-3">
                  <Badge variant="outline" className="w-fit text-[9px] font-bold border-primary/30 text-primary bg-primary/5 uppercase">Scale Pro</Badge>
                  <CardTitle className="text-xl font-bold mt-2">Professional</CardTitle>
                  <CardDescription className="text-xs">Advanced analytics & automated insights</CardDescription>
                  <div className="text-2xl font-black mt-2">$79 <span className="text-xs font-normal text-muted-foreground">/ mo</span></div>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button className="w-full text-xs" disabled>Current Tier</Button>
                </CardFooter>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="w-fit text-[9px] font-bold border-none uppercase">Enterprise</Badge>
                  <CardTitle className="text-xl font-bold mt-2">Custom Power</CardTitle>
                  <CardDescription className="text-xs">Multi-agency white-label and webhooks</CardDescription>
                  <div className="text-2xl font-black mt-2">$249 <span className="text-xs font-normal text-muted-foreground">/ mo</span></div>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full text-xs cursor-pointer">Upgrade Tier</Button>
                </CardFooter>
              </Card>
            </div>

            {/* AI Token Breakdown Progress Meters */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" /> AI Resource Consumption
                </CardTitle>
                <CardDescription>How your optimization tokens were consumed this period.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Ad Creative Scoring & Hook Analysis</span>
                    <span className="font-mono text-muted-foreground">42% (4,200 tokens)</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[42%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Audience Overlap & Target Clusters</span>
                    <span className="font-mono text-muted-foreground">28% (2,800 tokens)</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[28%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Ad Copy Synths & Chat Assistant</span>
                    <span className="font-mono text-muted-foreground">20% (2,000 tokens)</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[20%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Real-time Manager Database Syncing</span>
                    <span className="font-mono text-muted-foreground">10% (1,000 tokens)</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full w-[10%]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoices List */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>Download and view past credit card transactions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-border/30 rounded-2xl overflow-hidden bg-background/50">
                  <div className="divide-y divide-border/20">
                    {initialInvoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-muted">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <span className="font-semibold text-sm block">{inv.id}</span>
                            <span className="text-[10px] text-muted-foreground">{inv.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-semibold">${inv.amount.toFixed(2)}</span>
                          <Badge className="border-none bg-emerald-500/10 text-emerald-500 text-[10px]">
                            {inv.status}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon-sm" 
                            className="cursor-pointer"
                            onClick={() => alert(`Downloading Invoice ${inv.id}...`)}
                          >
                            <Trash2 className="h-4 w-4 rotate-180 text-muted-foreground hover:text-foreground" style={{ transform: "rotate(180deg)" }} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

          </motion.div>
        </TabsContent>

        {/* ==================== APPEARANCE TAB ==================== */}
        <TabsContent value="appearance">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">Theme Preference</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setTheme("light")}
                      className={`border-2 rounded-xl p-4 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                        theme === 'light' ? 'border-primary bg-primary/5 font-bold' : 'border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Sun className="h-5 w-5 text-slate-900" />
                      </div>
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button 
                      onClick={() => setTheme("dark")}
                      className={`border-2 rounded-xl p-4 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                        theme === 'dark' ? 'border-primary bg-primary/5 font-bold' : 'border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                        <Moon className="h-5 w-5 text-slate-100" />
                      </div>
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

      </Tabs>

      {/* Invite Member Dialog Overlay */}
      <AnimatePresence>
        {isInviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInviteOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm bg-background border border-border/60 rounded-2xl shadow-2xl relative overflow-hidden z-10"
            >
              <form onSubmit={handleInvite}>
                <div className="p-5 border-b border-border/50 flex justify-between items-center bg-muted/20">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <Users className="h-4.5 w-4.5 text-primary" /> Invite Collaborator
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => setIsInviteOpen(false)}
                    className="p-1 hover:bg-muted rounded-md text-muted-foreground cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Sarah Chen"
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      required
                      className="h-10 text-xs focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. sarah.c@acme.co"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                      className="h-10 text-xs focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Collaborator Role</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "Admin", label: "Admin" },
                        { id: "Analyst", label: "Analyst" },
                        { id: "Viewer", label: "Viewer" }
                      ].map(role => (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setInviteRole(role.id)}
                          className={`p-2 rounded-xl border text-xs font-semibold cursor-pointer text-center transition-all ${
                            inviteRole === role.id 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-border/50 bg-card hover:bg-muted/50'
                          }`}
                        >
                          {role.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-border/50 bg-muted/10 flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full text-xs cursor-pointer"
                    onClick={() => setIsInviteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="w-full text-xs cursor-pointer"
                  >
                    Send Invitation
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
