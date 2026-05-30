"use client"

import * as React from "react"
import { useAuth } from "@/hooks/use-auth"

export interface ConnectedAccount {
  platform: "meta" | "google" | "tiktok" | "linkedin"
  accountName: string
  connectedAt: string
  status: "active" | "syncing" | "error"
  credentials?: {
    accessToken?: string
    adAccountId?: string
    customerId?: string
    developerToken?: string
  }
}

interface IntegrationContextType {
  connectedAccounts: ConnectedAccount[]
  isModalOpen: boolean
  activePlatform: "meta" | "google" | "tiktok" | "linkedin" | null
  connectAccount: (platform: ConnectedAccount["platform"], accountName: string, credentials?: ConnectedAccount["credentials"]) => void
  disconnectAccount: (platform: ConnectedAccount["platform"]) => void
  openConnectModal: (platform?: ConnectedAccount["platform"]) => void
  closeConnectModal: () => void
}

const IntegrationContext = React.createContext<IntegrationContextType | undefined>(undefined)

export function IntegrationProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth()
  const [connectedAccounts, setConnectedAccounts] = React.useState<ConnectedAccount[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [activePlatform, setActivePlatform] = React.useState<ConnectedAccount["platform"] | null>(null)

  const storageKey = currentUser ? `connected_ad_accounts_${currentUser.email}` : null

  // Load from localStorage when currentUser or storageKey changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (!storageKey) {
        setConnectedAccounts([])
        return
      }
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        try {
          setConnectedAccounts(JSON.parse(stored))
        } catch (e) {
          console.error("Failed to parse connected accounts", e)
        }
      } else {
        // Start fresh with no accounts linked so users link their real Meta/Google Ads!
        setConnectedAccounts([])
        localStorage.setItem(storageKey, JSON.stringify([]))
      }
    }
  }, [storageKey, currentUser])

  const connectAccount = (
    platform: ConnectedAccount["platform"], 
    accountName: string,
    credentials?: ConnectedAccount["credentials"]
  ) => {
    if (!storageKey) return
    const newAccount: ConnectedAccount = {
      platform,
      accountName,
      connectedAt: new Date().toLocaleDateString(),
      status: "active",
      credentials
    }
    const updated = [...connectedAccounts.filter(a => a.platform !== platform), newAccount]
    setConnectedAccounts(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  const disconnectAccount = (platform: ConnectedAccount["platform"]) => {
    if (!storageKey) return
    const updated = connectedAccounts.filter(a => a.platform !== platform)
    setConnectedAccounts(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  const openConnectModal = (platform?: ConnectedAccount["platform"]) => {
    if (platform) {
      setActivePlatform(platform)
    } else {
      setActivePlatform(null)
    }
    setIsModalOpen(true)
  }

  const closeConnectModal = () => {
    setIsModalOpen(false)
    setActivePlatform(null)
  }

  return (
    <IntegrationContext.Provider
      value={{
        connectedAccounts,
        isModalOpen,
        activePlatform,
        connectAccount,
        disconnectAccount,
        openConnectModal,
        closeConnectModal
      }}
    >
      {children}
    </IntegrationContext.Provider>
  )
}

export function useIntegration() {
  const context = React.useContext(IntegrationContext)
  if (context === undefined) {
    throw new Error("useIntegration must be used within an IntegrationProvider")
  }
  return context
}
