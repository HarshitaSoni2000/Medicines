import { useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge, stockLabel, stockTone, expiryTone } from '@/components/ui/StatusBadge'
import { Select } from '@/components/ui/Select'
import { medicines } from '@/data/medicines'
import { formatDate } from '@/lib/utils'

const expiryLabel = { ok: 'OK', 'near-expiry': 'Near Expiry', expired: 'Expired' }

export default function AdminInventory() {
  const [filter, setFilter] = useState('')

  const lowStockCount = medicines.filter((m) => m.stockStatus === 'low-stock').length
  const nearExpiryCount = medicines.filter((m) => m.expiryStatus === 'near-expiry').length

  const list = medicines.filter((m) => {
    if (filter === 'low-stock') return m.stockStatus === 'low-stock' || m.stockStatus === 'out-of-stock'
    if (filter === 'near-expiry') return m.expiryStatus === 'near-expiry' || m.expiryStatus === 'expired'
    return true
  })

  return (
    <div>
      <PageHeader
        title="Inventory"
        subtitle="Batch and expiry tracking across the catalog"
        actions={
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-48">
            <option value="">All items</option>
            <option value="low-stock">Low / out of stock</option>
            <option value="near-expiry">Near expiry / expired</option>
          </Select>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-[6px] border border-amber-100 bg-amber-100/30 p-4">
          <TriangleAlert className="h-4 w-4 text-amber-600" />
          <p className="text-sm text-navy-800"><strong>{lowStockCount}</strong> products are low on stock</p>
        </div>
        <div className="flex items-center gap-3 rounded-[6px] border border-red-100 bg-red-100/30 p-4">
          <TriangleAlert className="h-4 w-4 text-red-600" />
          <p className="text-sm text-navy-800"><strong>{nearExpiryCount}</strong> products are nearing expiry</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              <th className="px-5 py-2.5">SKU</th>
              <th className="px-5 py-2.5">Product</th>
              <th className="px-5 py-2.5">Batch</th>
              <th className="px-5 py-2.5">Expiry</th>
              <th className="px-5 py-2.5">Stock</th>
              <th className="px-5 py-2.5">Status</th>
              <th className="px-5 py-2.5">Expiry Status</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
