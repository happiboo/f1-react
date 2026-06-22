import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('f1_auth') === 'true'
  })
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('f1_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (username, password) => {
    // Hardcoded credentials for Demo/HUD
    if (username.toLowerCase() === 'admin' && password === 'ferrari2026') {
      setIsAuthenticated(true)
      const userData = { username, name: 'Kavin S', role: 'Chief Engineer' }
      setUser(userData)
      sessionStorage.setItem('f1_auth', 'true')
      sessionStorage.setItem('f1_user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    sessionStorage.removeItem('f1_auth')
    sessionStorage.removeItem('f1_user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
