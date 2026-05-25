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
  Megaphone
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

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <PieChart className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold text-lg tracking-tight">AI Analyst</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 mt-4 space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={isActive} tooltip={item.title} render={<Link href={item.url} />}>
                  <div className="flex items-center gap-3">
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
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
