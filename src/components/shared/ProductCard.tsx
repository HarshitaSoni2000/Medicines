import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileWarning, Heart } from 'lucide-react'
import type { Medicine } from '@/types'
import { categoryIcon, categoryTint } from '@/utils/category'
import { StatusBadge, stockLabel, stockTone } from '@/components/ui/StatusBadge'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Button } from '@/components/ui/Button'
import { formatINR, cn } from '@/lib/utils'
import { useCart } from '@/features/cart/CartContext'
import { useWishlist } from '@/features/wishlist/WishlistContext'
import { useToast } from '@/components/ui/Toast'

export function ProductCard({ medicine }: { medicine: Medicine }) {
  const Icon = categoryIcon[medicine.category]
  const [qty, setQty] = useState(medicine.minOrderQty)
  const { addLine } = useCart()
  const { has, toggle } = useWishlist()
  const { push } = useToast()
  const disabled = medicine.stockStatus === 'out-of-stock'
  const wished = has(medicine.id)

  return (
    <div className="flex flex-col rounded-[6px] border border-navy-100 bg-white transition-shadow hover:shadow-[0_2px_10px_rgba(15,35,56,0.06)]">
      <Link to={`/medicines/${medicine.id}`} className="relative block p-4 pb-0">
        <div className={`flex h-24 items-center justify-center rounded-[4px] ${categoryTint[medicine.category]}`}>
          <Icon className="h-9 w-9" strokeWidth={1.5} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            toggle(medicine.id)
            push(wished ? 'Removed from wishlist' : 'Added to wishlist')
          }}
          aria-label="Toggle wishlist"
          className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-navy-500 hover:text-red-600"
        >
          <Heart className={cn('h-4 w-4', wished && 'fill-red-600 text-red-600')} />
        </button>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/medicines/${medicine.id}`} className="text-[14px] font-semibold leading-snug text-navy-950 hover:text-teal-700">
            {medicine.name}
          </Link>
          {medicine.prescriptionRequired && (
            <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-label="Prescription required" />
          )}
        </div>
        <p className="text-xs text-navy-500">{medicine.manufacturer}</p>
        <p className="text-xs text-navy-500">{medicine.packSize}</p>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-mono text-base font-semibold text-navy-950">
            {formatINR(medicine.wholesalePrice)}
          </span>
          <span className="text-xs text-navy-400 line-through">{formatINR(medicine.mrp)}</span>
          <span className="text-xs font-medium text-green-600">{medicine.discountPercent}% off</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <StatusBadge label={stockLabel(medicine.stockStatus)} tone={stockTone(medicine.stockStatus)} />
          <span className="text-[11px] text-navy-500">MOQ {medicine.minOrderQty}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <QuantitySelector
            value={qty}
            onChange={setQty}
            min={medicine.minOrderQty}
            max={medicine.stockQuantity || medicine.minOrderQty}
            size="sm"
          />
          <Button
            size="sm"
            className="flex-1"
            disabled={disabled}
            onClick={() => {
              addLine(medicine.id, qty)
              push(`${medicine.name} added to cart`)
            }}
          >
            {disabled ? 'Unavailable' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}
