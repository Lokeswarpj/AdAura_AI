"use client"

import * as React from "react"
import { Bell, Search, Plug } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useIntegration } from "@/hooks/use-integration"
import { useAuth } from "@/hooks/use-auth"

export function TopNav() {
  const { openConnectModal, connectedAccounts } = useIntegration()
  const { currentUser } = useAuth()
  const isMetaConnected = connectedAccounts.some(a => a.platform === "meta")
  const metaAccount = connectedAccounts.find(a => a.platform === "meta")

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/30 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="sm:hidden" />
        <div className="hidden sm:flex items-center relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="w-full appearance-none bg-background pl-8 shadow-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center mr-2">
          <button 
            onClick={() => openConnectModal()}
            className={`${
              isMetaConnected 
                ? "border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-500 font-bold" 
                : "btn-pill-gradient font-bold"
            } text-xs px-4 h-9 gap-1.5 cursor-pointer flex items-center justify-center rounded-full transition-all`}
          >
            {isMetaConnected ? (
              <>
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{metaAccount?.accountName || "Meta Ads Connected"}</span>
              </>
            ) : (
              <>
                <Plug className="h-3.5 w-3.5" />
                <span>Connect Ad Account</span>
              </>
            )}
          </button>
        </div>

        {/* Date Range Selector placeholder */}
        <button className="btn-pill-outline text-xs px-4 h-9 hidden sm:flex cursor-pointer">
          Last 7 Days
        </button>

        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </Button>

        <Avatar className="h-9 w-9 border border-border">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser?.name || "AI"}`} alt={currentUser?.name || "User"} />
          <AvatarFallback>{currentUser?.avatar || "AI"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
