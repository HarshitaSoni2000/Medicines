import { Link, useNavigate } from 'react-router-dom'
import { Download, Save, ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from '@/features/cart/CartContext'
import { useSavedCarts } from '@/features/cart/SavedCartsContext'
import { getMedicineById } from '@/data/medicines'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatINR } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

export default function Cart() {
  const { lines, setQuantity, removeLine, subtotal } = useCart()
  const { save } = useSavedCarts()
  const navigate = useNavigate()
  const { push } = useToast()

  const discount = Math.round(subtotal * 0.02)
  const tax = Math.round((subtotal - discount) * 0.05)
  const delivery = subtotal > 5000 || subtotal === 0 ? 0 : 150
  const grandTotal = subtotal - discount + tax + delivery

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={<ShoppingCart className="h-8 w-8" />}
          title="Your cart is empty"
          message="Browse the catalog or use Quick Order to add medicines."
          actionLabel="Browse Medicines"
          onAction={() => navigate('/medicines')}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader title="Your Cart" subtitle={`${lines.length} products in cart`} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-[6px] border border-navy-100 bg-white">
          {lines.map((line) => {
            const m = getMedicineById(line.medicineId)
            if (!m) return null
            return (
              <div key={line.medicineId} className="flex flex-wrap items-center gap-4 border-b border-navy-100 p-4 last:border-0">
                <div className="min-w-0 flex-1">
                  <Link to={`/medicines/${m.id}`} className="text-[14px] font-medium text-navy-950 hover:text-teal-700">
                    {m.name}
                  </Link>
                  <p className="text-xs text-navy-500">{m.packSize} · {m.discountPercent}% off</p>
                </div>
                <span className="font-mono text-sm text-navy-700">{formatINR(m.wholesalePrice)}</span>
                <QuantitySelector
                  value={line.quantity}
                  onChange={(q) => setQuantity(m.id, q)}
                  min={m.minOrderQty}
                  max={m.stockQuantity || m.minOrderQty}
                  size="sm"
                />
                <span className="w-24 text-right font-mono text-sm font-semibold text-navy-950">
                  {formatINR(m.wholesalePrice * line.quantity)}
                </span>
                <button
                  onClick={() => removeLine(m.id)}
                  className="text-navy-400 hover:text-red-600"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>

        <div className="h-fit rounded-[6px] border border-navy-100 bg-white p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-navy-950">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={formatINR(subtotal)} />
            <Row label="Discount" value={`- ${formatINR(discount)}`} valueClass="text-green-600" />
            <Row label="Tax (5%)" value={formatINR(tax)} />
            <Row label="Delivery" value={delivery === 0 ? 'Free' : formatINR(delivery)} valueClass={delivery === 0 ? 'text-green-600' : ''} />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-navy-100 pt-3">
            <span className="text-sm font-semibold text-navy-950">Grand Total</span>
            <span className="font-mono text-lg font-semibold text-navy-950">{formatINR(grandTotal)}</span>
          </div>
          <Button size="lg" className="mt-5 w-full" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </Button>
          <Button variant="outline" size="md" className="mt-2 w-full" onClick={() => navigate('/medicines')}>
            Continue Shopping
          </Button>
          <button
            onClick={() => {
              save(`Cart ${new Date().toLocaleDateString('en-IN')}`, lines)
              push('Cart saved')
            }}
            className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs font-medium text-navy-500 hover:text-navy-900"
          >
            <Save className="h-3.5 w-3.5" /> Save Cart
          </button>
          <button
            onClick={() => push('Order summary downloaded')}
            className="mt-2 flex w-full items-center justify-center gap-1.5 text-xs font-medium text-navy-500 hover:text-navy-900"
          >
            <Download className="h-3.5 w-3.5" /> Download Order Summary
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, valueClass = '' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-navy-500">{label}</span>
      <span className={`font-mono text-navy-900 ${valueClass}`}>{value}</span>
    </div>
  )
}
