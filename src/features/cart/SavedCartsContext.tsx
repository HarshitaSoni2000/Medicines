import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { CartLine } from '@/types'

const STORAGE_KEY = 'thock-medicine-saved-carts-v1'

export interface SavedCart {
  id: string
  name: string
  createdAt: string
  lines: CartLine[]
}

interface SavedCartsContextValue {
  savedCarts: SavedCart[]
  save: (name: string, lines: CartLine[]) => void
  remove: (id: string) => void
}

const SavedCartsContext = createContext<SavedCartsContextValue | null>(null)

function readInitial(): SavedCart[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SavedCart[]) : []
  } catch {
    return []
  }
}

export function SavedCartsProvider({ children }: { children: ReactNode }) {
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>(readInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCarts))
  }, [savedCarts])

  function save(name: string, lines: CartLine[]) {
    setSavedCarts((prev) => [
      { id: `sc-${Date.now()}`, name, createdAt: new Date().toISOString(), lines },
      ...prev,
    ])
  }

  function remove(id: string) {
    setSavedCarts((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <SavedCartsContext.Provider value={{ savedCarts, save, remove }}>
      {children}
    </SavedCartsContext.Provider>
  )
}

export function useSavedCarts() {
  const ctx = useContext(SavedCartsContext)
  if (!ctx) throw new Error('useSavedCarts must be used within SavedCartsProvider')
  return ctx
}
