import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartLine } from '@/types'
import { getMedicineById } from '@/data/medicines'

const STORAGE_KEY = 'thock-medicine-cart-v1'

interface CartContextValue {
  lines: CartLine[]
  addLine: (medicineId: string, quantity: number) => void
  setQuantity: (medicineId: string, quantity: number) => void
  removeLine: (medicineId: string) => void
  clear: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

function readInitial(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  function addLine(medicineId: string, quantity: number) {
    setLines((prev) => {
      const existing = prev.find((l) => l.medicineId === medicineId)
      if (existing) {
        return prev.map((l) =>
          l.medicineId === medicineId ? { ...l, quantity: l.quantity + quantity } : l,
        )
      }
      return [...prev, { medicineId, quantity }]
    })
  }

  function setQuantity(medicineId: string, quantity: number) {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.medicineId !== medicineId)
        : prev.map((l) => (l.medicineId === medicineId ? { ...l, quantity } : l)),
    )
  }

  function removeLine(medicineId: string) {
    setLines((prev) => prev.filter((l) => l.medicineId !== medicineId))
  }

  function clear() {
    setLines([])
  }

  const itemCount = lines.reduce((s, l) => s + l.quantity, 0)
  const subtotal = useMemo(
    () =>
      lines.reduce((s, l) => {
        const m = getMedicineById(l.medicineId)
        return s + (m ? m.wholesalePrice * l.quantity : 0)
      }, 0),
    [lines],
  )

  return (
    <CartContext.Provider
      value={{ lines, addLine, setQuantity, removeLine, clear, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
