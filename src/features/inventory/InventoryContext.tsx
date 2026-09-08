import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Medicine } from '@/types'
import { medicines as seedMedicines } from '@/data/medicines'

const STORAGE_KEY = 'thock-medicine-admin-inventory-v1'

interface InventoryContextValue {
  medicines: Medicine[]
  addProduct: (data: Partial<Medicine>) => void
  updateProduct: (id: string, data: Partial<Medicine>) => void
  deleteProduct: (id: string) => void
  adjustStock: (id: string, delta: number) => void
  decrementStockForBill: (lines: { medicineId: string; quantity: number }[]) => boolean
  getById: (id: string) => Medicine | undefined
}

const InventoryContext = createContext<InventoryContextValue | null>(null)

function computeStockStatus(qty: number): Medicine['stockStatus'] {
  if (qty <= 0) return 'out-of-stock'
  if (qty <= 25) return 'low-stock'
  return 'in-stock'
}

function readInitial(): Medicine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Medicine[]) : seedMedicines
  } catch {
    return seedMedicines
  }
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [medicines, setMedicines] = useState<Medicine[]>(readInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines))
  }, [medicines])

  function addProduct(data: Partial<Medicine>) {
    const id = `med-new-${Date.now()}`
    const qty = data.stockQuantity ?? 0
    setMedicines((prev) => [
      {
        id,
        name: data.name ?? 'New Medicine',
        composition: data.composition ?? '',
        manufacturer: data.manufacturer ?? '',
        category: data.category ?? 'OTC Products',
        dosageForm: data.dosageForm ?? 'Tablet',
        packSize: data.packSize ?? '',
        mrp: data.mrp ?? 0,
        wholesalePrice: data.wholesalePrice ?? 0,
        discountPercent: data.discountPercent ?? 0,
        stockQuantity: qty,
        stockStatus: computeStockStatus(qty),
        minOrderQty: data.minOrderQty ?? 5,
        prescriptionRequired: data.prescriptionRequired ?? false,
        sku: `TM-NEW-${prev.length + 1}`,
        batch: { batchNumber: 'B0000', manufacturingDate: '2026-01-01', expiryDate: '2028-01-01', quantity: qty },
        expiryStatus: 'ok',
        description: data.description ?? '',
      },
      ...prev,
    ])
  }

  function updateProduct(id: string, data: Partial<Medicine>) {
    setMedicines((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m
        const merged = { ...m, ...data }
        if (data.stockQuantity !== undefined) {
          merged.stockStatus = computeStockStatus(data.stockQuantity)
        }
        return merged
      }),
    )
  }

  function deleteProduct(id: string) {
    setMedicines((prev) => prev.filter((m) => m.id !== id))
  }

  function adjustStock(id: string, delta: number) {
    setMedicines((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m
        const qty = Math.max(0, m.stockQuantity + delta)
        return { ...m, stockQuantity: qty, stockStatus: computeStockStatus(qty) }
      }),
    )
  }

  /** Deducts stock for a set of bill lines. Returns false (no changes applied) if any line exceeds available stock. */
  function decrementStockForBill(lines: { medicineId: string; quantity: number }[]) {
    for (const line of lines) {
      const m = medicines.find((x) => x.id === line.medicineId)
      if (!m || m.stockQuantity < line.quantity) return false
    }
    setMedicines((prev) =>
      prev.map((m) => {
        const line = lines.find((l) => l.medicineId === m.id)
        if (!line) return m
        const qty = Math.max(0, m.stockQuantity - line.quantity)
        return { ...m, stockQuantity: qty, stockStatus: computeStockStatus(qty) }
      }),
    )
    return true
  }

  function getById(id: string) {
    return medicines.find((m) => m.id === id)
  }

  return (
    <InventoryContext.Provider
      value={{ medicines, addProduct, updateProduct, deleteProduct, adjustStock, decrementStockForBill, getById }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const ctx = useContext(InventoryContext)
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider')
  return ctx
}
