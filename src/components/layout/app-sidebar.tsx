"use client"

import * as React from "react"
import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Settings,
  Sparkles,
  Layers,
  Image as ImageIcon,
  FileText,
  PieChart,
  Megaphone,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    icon: BarChart3,
  },
  {
    title: "Ad Sets",
    url: "/ad-sets",
    icon: Layers,
  },
  {
    title: "Creatives",
    url: "/creatives",
    icon: ImageIcon,
  },
  {
    title: "Ads",
    url: "/ads",
    icon: Megaphone,
  },
  {
    title: "AI Insights",
    url: "/ai-insights",
    icon: Sparkles,
  },
  {
    title: "AI Chat",
    url: "/ai-chat",
    icon: Bot,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { currentUser, logout } = useAuth()

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2.5">
        <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white shadow-lg shadow-violet-500/20">
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22h4l3-6h6l3 6h4L12 2zm-1.5 11L12 9.5l1.5 3.5h-3z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="13" r="8" className="stroke-pink-300 opacity-50" />
          </svg>
        </div>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-black text-lg tracking-tight bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">AdAura AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 mt-4 space-y-1.5">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  isActive={isActive} 
                  tooltip={item.title} 
                  render={<Link href={item.url} />}
                  className={cn(
                    "transition-all duration-300 rounded-xl px-3 py-2.5 border border-transparent! relative overflow-hidden",
                    isActive 
                      ? "bg-gradient-to-r from-violet-600/20 via-purple-600/12 to-pink-600/6 text-foreground font-bold border-violet-500/40! shadow-md shadow-violet-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    {isActive && (
                      <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-md bg-gradient-to-b from-violet-400 via-purple-500 to-pink-400" />
                    )}
                    <item.icon className={cn(
                      "size-4 shrink-0 transition-all duration-300",
                      isActive ? "text-pink-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.7)] scale-110" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-xs transition-colors duration-300",
                      isActive ? "bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent font-extrabold" : ""
                    )}>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-4">
        {currentUser && (
          <div className="flex items-center justify-between gap-3 p-2 bg-muted/20 border border-border/20 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-[11px] shrink-0">
                {currentUser.avatar}
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-[11px] text-foreground block truncate leading-tight">{currentUser.name}</span>
                <span className="text-[9px] text-muted-foreground block truncate leading-tight mt-0.5">{currentUser.email}</span>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-lg text-muted-foreground transition-colors cursor-pointer shrink-0"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <div className="rounded-xl bg-card p-4 text-card-foreground shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium">Pro Plan</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            You are using 80% of your AI tokens this month.
          </p>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[80%]" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
