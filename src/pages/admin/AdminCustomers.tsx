import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { adminCustomers } from '@/data/admin'
import { formatINR } from '@/lib/utils'

export default function AdminCustomers() {
  const [query, setQuery] = useState('')
  const list = adminCustomers.filter((c) =>
    `${c.storeName} ${c.ownerName} ${c.city}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <PageHeader title="Customers" subtitle={`${list.length} medical stores`} />
      <div className="relative mb-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers…"
          className="h-10 w-full rounded-[4px] border border-navy-100 bg-white pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
        />
      </div>
      <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              <th className="px-5 py-2.5">Store</th>
              <th className="px-5 py-2.5">Owner</th>
              <th className="px-5 py-2.5">City</th>
              <th className="px-5 py-2.5">Orders</th>
              <th className="px-5 py-2.5">Total Purchase</th>
              <th className="px-5 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-b border-navy-100 last:border-0">
                <td className="px-5 py-3 font-medium text-navy-950">{c.storeName}</td>
                <td className="px-5 py-3 text-navy-700">{c.ownerName}</td>
                <td className="px-5 py-3 text-navy-700">{c.city}</td>
                <td className="px-5 py-3 font-mono text-navy-700">{c.totalOrders}</td>
                <td className="px-5 py-3 font-mono text-navy-950">{formatINR(c.totalPurchase)}</td>
                <td className="px-5 py-3">
                  <StatusBadge label={c.status} tone={c.status === 'Active' ? 'green' : 'navy'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
