"use client"

import * as React from "react"

export interface User {
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  currentUser: User | null
  isLoading: boolean
  login: (email: string, checkPassword: string) => { success: boolean; message: string }
  register: (name: string, email: string, checkPassword: string) => { success: boolean; message: string }
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Load active session from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const activeSession = localStorage.getItem("current_auth_session")
      if (activeSession) {
        try {
          setCurrentUser(JSON.parse(activeSession))
        } catch (e) {
          console.error("Failed to parse auth session", e)
        }
      }
      setIsLoading(false)
    }
  }, [])

  const register = (name: string, email: string, checkPassword: string) => {
    if (typeof window === "undefined") return { success: false, message: "Server error" }
    
    const lowerEmail = email.toLowerCase().trim()
    const usersStr = localStorage.getItem("auth_registered_users")
    let usersList = []
    
    if (usersStr) {
      try {
        usersList = JSON.parse(usersStr)
      } catch (e) {
        console.error("Failed parsing registered users list", e)
      }
    }

    // Check if email already registered
    const exists = usersList.some((u: any) => u.email === lowerEmail)
    if (exists) {
      return { success: false, message: "Email is already registered" }
    }

    const newUser = {
      name,
      email: lowerEmail,
      password: checkPassword,
      avatar: name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    }

    usersList.push(newUser)
    localStorage.setItem("auth_registered_users", JSON.stringify(usersList))

    // Automatically log in
    const userSession: User = {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar
    }
    setCurrentUser(userSession)
    localStorage.setItem("current_auth_session", JSON.stringify(userSession))

    return { success: true, message: "Registration successful!" }
  }

  const login = (email: string, checkPassword: string) => {
    if (typeof window === "undefined") return { success: false, message: "Server error" }
    
    const lowerEmail = email.toLowerCase().trim()
    const usersStr = localStorage.getItem("auth_registered_users")
    let usersList = []

    if (usersStr) {
      try {
        usersList = JSON.parse(usersStr)
      } catch (e) {
        console.error(e)
      }
    }

    // Default admin user if no users registered yet
    if (usersList.length === 0 && lowerEmail === "lokeswarpj4@gmail.com" && checkPassword === "password") {
      const defaultUser = {
        name: "Lokeswar PJ",
        email: "lokeswarpj4@gmail.com",
        avatar: "LP"
      }
      setCurrentUser(defaultUser)
      localStorage.setItem("current_auth_session", JSON.stringify(defaultUser))
      return { success: true, message: "Login successful!" }
    }

    const matchedUser = usersList.find((u: any) => u.email === lowerEmail && u.password === checkPassword)
    
    if (!matchedUser) {
      return { success: false, message: "Invalid email or password" }
    }

    const userSession: User = {
      name: matchedUser.name,
      email: matchedUser.email,
      avatar: matchedUser.avatar
    }

    setCurrentUser(userSession)
    localStorage.setItem("current_auth_session", JSON.stringify(userSession))

    return { success: true, message: "Login successful!" }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("current_auth_session")
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
