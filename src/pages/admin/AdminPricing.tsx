import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { medicines as initialMedicines } from '@/data/medicines'
import type { Medicine } from '@/types'
import { useToast } from '@/components/ui/Toast'

export default function AdminPricing() {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines)
  const [query, setQuery] = useState('')
  const { push } = useToast()

  const list = medicines.filter((m) =>
    `${m.name} ${m.sku}`.toLowerCase().includes(query.toLowerCase()),
  )

  function updatePrice(id: string, field: 'mrp' | 'wholesalePrice', value: number) {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  function commit(id: string) {
    push('Pricing updated')
  }

  return (
    <div>
      <PageHeader title="Pricing" subtitle="Update MRP and wholesale pricing across the catalog" />
      <div className="relative mb-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="h-10 w-full rounded-[4px] border border-navy-100 bg-white pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
        />
      </div>
      <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              <th className="px-5 py-2.5">Product</th>
              <th className="px-5 py-2.5">MRP</th>
              <th className="px-5 py-2.5">Wholesale Price</th>
              <th className="px-5 py-2.5">Discount</th>
              <th className="px-5 py-2.5">Min Order Qty</th>
            </tr>
          </thead>
          <tbody>
            {list.slice(0, 20).map((m) => {
              const discount = m.mrp > 0 ? Math.round(((m.mrp - m.wholesalePrice) / m.mrp) * 100) : 0
              return (
                <tr key={m.id} className="border-b border-navy-100 last:border-0">
                  <td className="px-5 py-3 font-medium text-navy-950">{m.name}</td>
                  <td className="px-5 py-3">
                    <input
                      type="number"
                      defaultValue={m.mrp}
                      onBlur={(e) => { updatePrice(m.id, 'mrp', Number(e.target.value)); commit(m.id) }}
                      className="h-8 w-24 rounded-[4px] border border-navy-100 px-2 font-mono text-[13px] focus:border-teal-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <input
                      type="number"
                      defaultValue={m.wholesalePrice}
                      onBlur={(e) => { updatePrice(m.id, 'wholesalePrice', Number(e.target.value)); commit(m.id) }}
                      className="h-8 w-24 rounded-[4px] border border-navy-100 px-2 font-mono text-[13px] focus:border-teal-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-5 py-3 font-mono text-green-600">{discount}%</td>
                  <td className="px-5 py-3 font-mono text-navy-700">{m.minOrderQty}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-navy-500">Showing first 20 of {list.length} products · changes save on blur</p>
    </div>
  )
}
