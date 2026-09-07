import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { BusinessProfile } from '@/types'

const STORAGE_KEY = 'thock-medicine-auth-v1'

interface AuthState {
  isAuthenticated: boolean
  profile: BusinessProfile | null
}

interface AuthContextValue extends AuthState {
  login: (email: string) => void
  register: (profile: BusinessProfile) => void
  logout: () => void
}

const defaultProfile: BusinessProfile = {
  ownerName: 'Rakesh Verma',
  storeName: 'Verma Medical & General Store',
  gstNumber: '22AAAAA0000A1Z5',
  drugLicenseNumber: 'CG-DL-4521-2023',
  phone: '+91 98261 45210',
  email: 'rakesh@vermamedical.in',
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readInitial(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthState) : { isAuthenticated: false, profile: null }
  } catch {
    return { isAuthenticated: false, profile: null }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(readInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function login(_email: string) {
    setState({ isAuthenticated: true, profile: defaultProfile })
  }

  function register(profile: BusinessProfile) {
    setState({ isAuthenticated: true, profile })
  }

  function logout() {
    setState({ isAuthenticated: false, profile: null })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
