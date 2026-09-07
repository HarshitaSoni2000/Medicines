import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge, orderTone } from '@/components/ui/StatusBadge'
import { Select } from '@/components/ui/Select'
import { EmptyState } from '@/components/ui/EmptyState'
import { orders } from '@/data/orders'
import type { OrderStatus } from '@/types'
import { formatDate, formatINR } from '@/lib/utils'

const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function Orders() {
  const [filter, setFilter] = useState('')
  const list = filter ? orders.filter((o) => o.status === filter) : orders

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle={`${list.length} orders`}
        actions={
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-44">
            <option value="">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        }
      />

      {list.length === 0 ? (
        <EmptyState icon={<ClipboardList className="h-8 w-8" />} title="No orders" message="No orders match this filter." />
      ) : (
        <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
                <th className="px-5 py-2.5">Order ID</th>
                <th className="px-5 py-2.5">Date</th>
                <th className="px-5 py-2.5">Items</th>
                <th className="px-5 py-2.5">Amount</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} className="border-b border-navy-100 last:border-0">
                  <td className="px-5 py-3 font-mono text-[13px] text-navy-950">{o.id}</td>
                  <td className="px-5 py-3 text-navy-700">{formatDate(o.date)}</td>
                  <td className="px-5 py-3 text-navy-700">{o.items.length} products</td>
                  <td className="px-5 py-3 font-mono text-navy-950">{formatINR(o.grandTotal)}</td>
                  <td className="px-5 py-3"><StatusBadge label={o.status} tone={orderTone(o.status)} /></td>
                  <td className="px-5 py-3">
                    <Link to={`/dashboard/orders/${o.id}`} className="text-teal-700 hover:text-teal-600">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
