import { useNavigate } from 'react-router-dom'
import { Archive, ShoppingCart, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { useSavedCarts } from '@/features/cart/SavedCartsContext'
import { useCart } from '@/features/cart/CartContext'
import { getMedicineById } from '@/data/medicines'
import { formatDate, formatINR } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

export default function SavedCarts() {
  const { savedCarts, remove } = useSavedCarts()
  const { addLine } = useCart()
  const { push } = useToast()
  const navigate = useNavigate()

  if (savedCarts.length === 0) {
    return (
      <div>
        <PageHeader title="Saved Carts" subtitle="Cart snapshots you saved for later" />
        <EmptyState
          icon={<Archive className="h-8 w-8" />}
          title="No saved carts"
          message="Use “Save Cart” from your cart page to keep an order for later."
        />
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Saved Carts" subtitle={`${savedCarts.length} saved`} />
      <div className="grid gap-4 sm:grid-cols-2">
        {savedCarts.map((sc) => {
          const total = sc.lines.reduce((s, l) => {
            const m = getMedicineById(l.medicineId)
            return s + (m ? m.wholesalePrice * l.quantity : 0)
          }, 0)
          return (
            <div key={sc.id} className="rounded-[6px] border border-navy-100 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[15px] font-semibold text-navy-950">{sc.name}</p>
                  <p className="text-xs text-navy-500">Saved {formatDate(sc.createdAt)} · {sc.lines.length} products</p>
                </div>
                <button onClick={() => remove(sc.id)} className="text-navy-400 hover:text-red-600" aria-label="Delete saved cart">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 font-mono text-lg font-semibold text-navy-950">{formatINR(total)}</p>
              <Button
                size="sm"
                className="mt-3 w-full"
                onClick={() => {
                  sc.lines.forEach((l) => addLine(l.medicineId, l.quantity))
                  push('Saved cart loaded into your cart')
                  navigate('/cart')
                }}
              >
                <ShoppingCart className="h-3.5 w-3.5" /> Load into Cart
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
