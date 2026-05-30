"use client"

import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { IntegrationProvider } from "@/hooks/use-integration";
import { ConnectModal } from "@/components/dashboard/connect-modal";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { AuthPortal } from "@/components/auth/auth-portal";

function AppContent({ children }: { children: React.ReactNode }) {
  const { currentUser, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] text-muted-foreground font-mono">Securing session tunnel...</span>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <AuthPortal />
  }

  return (
    <IntegrationProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full h-screen overflow-hidden">
          <TopNav />
          <main className="flex-1 overflow-y-auto bg-transparent p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
        <ConnectModal />
      </SidebarProvider>
    </IntegrationProvider>
  )
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
