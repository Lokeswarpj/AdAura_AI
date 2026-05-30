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
  sendOtp: (email: string) => { success: boolean; message: string; otp?: string }
  verifyOtpAndResetPassword: (email: string, otp: string, checkPassword: string) => { success: boolean; message: string }
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

  const sendOtp = (email: string) => {
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

    // Permit recovery for both registered users and default admin account
    const userExists = usersList.some((u: any) => u.email === lowerEmail)
    const isAdmin = lowerEmail === "lokeswarpj4@gmail.com"

    if (!userExists && !isAdmin) {
      return { success: false, message: "This email address is not registered" }
    }

    // Generate 6-digit OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpSession = {
      email: lowerEmail,
      otp: generatedOtp,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes expiration
    }

    localStorage.setItem(`auth_otp_${lowerEmail}`, JSON.stringify(otpSession))

    return { 
      success: true, 
      message: `OTP sent successfully! (Simulated Email OTP Code: ${generatedOtp})`,
      otp: generatedOtp
    }
  }

  const verifyOtpAndResetPassword = (email: string, otp: string, checkPassword: string) => {
    if (typeof window === "undefined") return { success: false, message: "Server error" }
    
    const lowerEmail = email.toLowerCase().trim()
    const otpSessionStr = localStorage.getItem(`auth_otp_${lowerEmail}`)

    if (!otpSessionStr) {
      return { success: false, message: "No active password recovery session found. Please request a new OTP." }
    }

    try {
      const otpSession = JSON.parse(otpSessionStr)
      
      if (otpSession.otp !== otp.trim()) {
        return { success: false, message: "Invalid OTP code. Please verify the code and try again." }
      }

      if (Date.now() > otpSession.expires) {
        return { success: false, message: "OTP has expired. Please request a new OTP." }
      }

      // OTP is valid! Reset password in registered list
      const usersStr = localStorage.getItem("auth_registered_users")
      let usersList = []

      if (usersStr) {
        try {
          usersList = JSON.parse(usersStr)
        } catch (e) {
          console.error(e)
        }
      }

      const userIndex = usersList.findIndex((u: any) => u.email === lowerEmail)

      if (userIndex !== -1) {
        usersList[userIndex].password = checkPassword
        localStorage.setItem("auth_registered_users", JSON.stringify(usersList))
      } else if (lowerEmail === "lokeswarpj4@gmail.com") {
        // Mock success for admin account that is not registered yet
        const newUser = {
          name: "Lokeswar PJ",
          email: lowerEmail,
          password: checkPassword,
          avatar: "LP"
        }
        usersList.push(newUser)
        localStorage.setItem("auth_registered_users", JSON.stringify(usersList))
      } else {
        return { success: false, message: "User account could not be found for password reset." }
      }

      // Clean up OTP session
      localStorage.removeItem(`auth_otp_${lowerEmail}`)

      return { success: true, message: "Password updated successfully! You can now log in with your new password." }
    } catch (e) {
      return { success: false, message: "Failed verifying session. Please try again." }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        register,
        logout,
        sendOtp,
        verifyOtpAndResetPassword
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
