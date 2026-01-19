import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(null)

  const login = (username, initialCount) => {
    setUser(username)
    setCount(initialCount)
  }

  const logout = () => {
    setUser(null)
    setCount(null)
  }

  const updateCount = (newCount) => {
    setCount(newCount)
  }

  return (
    <AuthContext.Provider value={{ user, count, login, logout, updateCount }}>
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
