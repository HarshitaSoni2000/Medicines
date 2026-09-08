import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Bill } from '@/types'

const STORAGE_KEY = 'thock-medicine-admin-bills-v1'

interface BillingContextValue {
  bills: Bill[]
  addBill: (bill: Bill) => void
  nextBillNumber: () => string
}

const BillingContext = createContext<BillingContextValue | null>(null)

function readInitial(): Bill[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Bill[]) : []
  } catch {
    return []
  }
}

export function BillingProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState<Bill[]>(readInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bills))
  }, [bills])

  function addBill(bill: Bill) {
    setBills((prev) => [bill, ...prev])
  }

  function nextBillNumber() {
    return `INV-${String(1000 + bills.length + 1)}`
  }

  return (
    <BillingContext.Provider value={{ bills, addBill, nextBillNumber }}>
      {children}
    </BillingContext.Provider>
  )
}

export function useBilling() {
  const ctx = useContext(BillingContext)
  if (!ctx) throw new Error('useBilling must be used within BillingProvider')
  return ctx
}
