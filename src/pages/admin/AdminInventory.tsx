import { useMemo, useState } from 'react'
import { TriangleAlert, Boxes, PackageX, IndianRupee, Search, Plus, Minus } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge, stockLabel, stockTone, expiryTone } from '@/components/ui/StatusBadge'
import { Select } from '@/components/ui/Select'
import { StatCard } from '@/components/ui/StatCard'
import { categories } from '@/data/medicines'
import { useInventory } from '@/features/inventory/InventoryContext'
import { formatDate, formatINR } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

const expiryLabel = { ok: 'OK', 'near-expiry': 'Near Expiry', expired: 'Expired' }

export default function AdminInventory() {
  const { medicines, adjustStock } = useInventory()
  const [filter, setFilter] = useState('')
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')
  const { push } = useToast()

  const lowStockCount = medicines.filter((m) => m.stockStatus === 'low-stock').length
  const outOfStockCount = medicines.filter((m) => m.stockStatus === 'out-of-stock').length
  const nearExpiryCount = medicines.filter((m) => m.expiryStatus !== 'ok').length
  const stockValue = medicines.reduce((s, m) => s + m.stockQuantity * m.wholesalePrice, 0)

  const categoryBreakdown = useMemo(() => {
    return categories
      .map((c) => {
        const items = medicines.filter((m) => m.category === c.name)
        return {
          name: c.name,
          totalUnits: items.reduce((s, m) => s + m.stockQuantity, 0),
          lowOrOut: items.filter((m) => m.stockStatus !== 'in-stock').length,
          value: items.reduce((s, m) => s + m.stockQuantity * m.wholesalePrice, 0),
        }
      })
      .sort((a, b) => b.value - a.value)
  }, [medicines])

  const list = medicines.filter((m) => {
    if (query && !`${m.name} ${m.sku}`.toLowerCase().includes(query.toLowerCase())) return false
    if (category && m.category !== category) return false
    if (filter === 'low-stock') return m.stockStatus === 'low-stock' || m.stockStatus === 'out-of-stock'
    if (filter === 'near-expiry') return m.expiryStatus === 'near-expiry' || m.expiryStatus === 'expired'
    return true
  })

  return (
    <div>
      <PageHeader
        title="Inventory"
        subtitle="Live stock levels, value and expiry tracking across the catalog"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Stock Value" value={formatINR(stockValue)} icon={<IndianRupee className="h-4 w-4" />} tone="teal" />
        <StatCard label="Low Stock" value={String(lowStockCount)} icon={<TriangleAlert className="h-4 w-4" />} tone="amber" />
        <StatCard label="Out of Stock" value={String(outOfStockCount)} icon={<PackageX className="h-4 w-4" />} tone="red" />
        <StatCard label="Near Expiry" value={String(nearExpiryCount)} icon={<Boxes className="h-4 w-4" />} />
      </div>

      <div className="mt-6 rounded-[6px] border border-navy-100 bg-white p-4">
        <p className="mb-3 text-sm font-semibold text-navy-950">Stock by Category</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categoryBreakdown.map((c) => (
            <button
              key={c.name}
              onClick={() => setCategory(c.name === category ? '' : c.name)}
              className={`rounded-[4px] border p-3 text-left ${category === c.name ? 'border-teal-500 bg-teal-50' : 'border-navy-100 hover:border-teal-200'}`}
            >
              <p className="truncate text-xs font-medium text-navy-950">{c.name}</p>
              <p className="mt-1 font-mono text-lg font-semibold text-navy-950">{c.totalUnits}</p>
              <p className="text-[11px] text-navy-500">units · {formatINR(c.value)}</p>
              {c.lowOrOut > 0 && <p className="mt-1 text-[11px] font-medium text-amber-600">{c.lowOrOut} need attention</p>}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or SKU…"
            className="h-10 w-full rounded-[4px] border border-navy-100 bg-white pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
          />
        </div>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="sm:w-56">
          <option value="">All items</option>
          <option value="low-stock">Low / out of stock</option>
          <option value="near-expiry">Near expiry / expired</option>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
        <table className="w-full min-w-[920px] text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              <th className="px-5 py-2.5">SKU</th>
              <th className="px-5 py-2.5">Product</th>
              <th className="px-5 py-2.5">Batch</th>
              <th className="px-5 py-2.5">Expiry</th>
              <th className="px-5 py-2.5">Stock</th>
              <th className="px-5 py-2.5">Status</th>
              <th className="px-5 py-2.5">Expiry Status</th>
              <th className="px-5 py-2.5">Adjust</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className="border-b border-navy-100 last:border-0">
                <td className="px-5 py-3 font-mono text-[13px] text-navy-700">{m.sku}</td>
                <td className="px-5 py-3 font-medium text-navy-950">{m.name}</td>
                <td className="px-5 py-3 font-mono text-navy-700">{m.batch.batchNumber}</td>
                <td className="px-5 py-3 text-navy-700">{formatDate(m.batch.expiryDate)}</td>
                <td className="px-5 py-3 font-mono text-navy-950">{m.stockQuantity}</td>
                <td className="px-5 py-3"><StatusBadge label={stockLabel(m.stockStatus)} tone={stockTone(m.stockStatus)} /></td>
                <td className="px-5 py-3"><StatusBadge label={expiryLabel[m.expiryStatus]} tone={expiryTone(m.expiryStatus)} /></td>
                <td className="px-5 py-3">
                  <div className="flex h-7 items-stretch overflow-hidden rounded-[4px] border border-navy-100">
                    <button
                      onClick={() => { adjustStock(m.id, -10); push(`${m.name}: -10 units`) }}
                      disabled={m.stockQuantity === 0}
                      className="flex w-7 items-center justify-center text-navy-700 hover:bg-navy-50 disabled:opacity-30"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => { adjustStock(m.id, 10); push(`${m.name}: +10 units (restocked)`) }}
                      className="flex w-7 items-center justify-center border-l border-navy-100 text-navy-700 hover:bg-navy-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
