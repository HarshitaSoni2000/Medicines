import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, FileWarning, ShieldCheck, Truck } from 'lucide-react'
import { getMedicineById, medicines } from '@/data/medicines'
import { categoryIcon, categoryTint } from '@/utils/category'
import { Button } from '@/components/ui/Button'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { StatusBadge, stockLabel, stockTone } from '@/components/ui/StatusBadge'
import { formatDate, formatINR } from '@/lib/utils'
import { useCart } from '@/features/cart/CartContext'
import { useToast } from '@/components/ui/Toast'
import { ProductCard } from '@/components/shared/ProductCard'
import { EmptyState } from '@/components/ui/EmptyState'

export default function ProductDetail() {
  const { id } = useParams()
  const medicine = id ? getMedicineById(id) : undefined
  const navigate = useNavigate()
  const { addLine } = useCart()
  const { push } = useToast()
  const [qty, setQty] = useState(medicine?.minOrderQty ?? 1)

  if (!medicine) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={<FileWarning className="h-8 w-8" />}
          title="Medicine not found"
          message="This product may have been removed from the catalog."
          actionLabel="Back to catalog"
          onAction={() => navigate('/medicines')}
        />
      </div>
    )
  }

  const Icon = categoryIcon[medicine.category]
  const related = medicines.filter((m) => m.category === medicine.category && m.id !== medicine.id).slice(0, 4)
  const disabled = medicine.stockStatus === 'out-of-stock'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-center gap-1.5 text-xs text-navy-500">
        <Link to="/medicines" className="hover:text-navy-900">Medicines</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/medicines?category=${encodeURIComponent(medicine.category)}`} className="hover:text-navy-900">
          {medicine.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy-900">{medicine.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className={`flex h-72 items-center justify-center rounded-[6px] ${categoryTint[medicine.category]}`}>
          <Icon className="h-24 w-24" strokeWidth={1} />
        </div>

        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-semibold text-navy-950">{medicine.name}</h1>
            {medicine.prescriptionRequired && (
              <span className="flex items-center gap-1 whitespace-nowrap rounded-[4px] bg-amber-100 px-2 py-1 text-xs font-medium text-amber-600">
                <FileWarning className="h-3.5 w-3.5" /> Prescription Required
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-navy-500">{medicine.manufacturer} · SKU {medicine.sku}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold text-navy-950">
              {formatINR(medicine.wholesalePrice)}
            </span>
            <span className="text-base text-navy-400 line-through">{formatINR(medicine.mrp)}</span>
            <span className="text-sm font-medium text-green-600">{medicine.discountPercent}% off MRP</span>
          </div>
          <p className="mt-1 text-xs text-navy-500">Price per unit pack · {medicine.packSize}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <StatusBadge label={stockLabel(medicine.stockStatus)} tone={stockTone(medicine.stockStatus)} />
            <StatusBadge label={`MOQ ${medicine.minOrderQty} packs`} tone="navy" />
            <StatusBadge label={`Batch ${medicine.batch.batchNumber}`} tone="navy" />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <QuantitySelector
              value={qty}
              onChange={setQty}
              min={medicine.minOrderQty}
              max={medicine.stockQuantity || medicine.minOrderQty}
            />
            <Button
              size="lg"
              disabled={disabled}
              onClick={() => {
                addLine(medicine.id, qty)
                push(`${medicine.name} added to cart`)
              }}
            >
              {disabled ? 'Unavailable' : 'Add to Cart'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={disabled}
              onClick={() => {
                addLine(medicine.id, qty)
                navigate('/cart')
              }}
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-6 flex gap-4 border-t border-navy-100 pt-5 text-xs text-navy-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-teal-600" /> Genuine, sourced from licensed distributors</span>
            <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-teal-600" /> Ships within 24-48 hrs</span>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-[15px] font-semibold text-navy-950">Product Information</h2>
          <p className="text-sm leading-relaxed text-navy-700">{medicine.description}</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 rounded-[6px] border border-navy-100 bg-white p-4 text-sm sm:grid-cols-3">
            <Field label="Composition" value={medicine.composition} />
            <Field label="Dosage Form" value={medicine.dosageForm} />
            <Field label="Pack Size" value={medicine.packSize} />
            <Field label="Manufacturer" value={medicine.manufacturer} />
            <Field label="Manufacturing Date" value={formatDate(medicine.batch.manufacturingDate)} />
            <Field label="Expiry Date" value={formatDate(medicine.batch.expiryDate)} />
          </dl>
        </section>
        <aside className="rounded-[6px] border border-amber-100 bg-amber-100/30 p-4 text-xs leading-relaxed text-navy-700">
          Medicine information is provided for ordering/reference purposes only. Always follow applicable
          medical and regulatory guidance. This platform does not provide diagnosis or treatment
          recommendations.
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-[15px] font-semibold text-navy-950">More in {medicine.category}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((m) => (
              <ProductCard key={m.id} medicine={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-navy-500">{label}</dt>
      <dd className="mt-0.5 font-medium text-navy-950">{value}</dd>
    </div>
  )
}
