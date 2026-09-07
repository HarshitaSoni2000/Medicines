import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Select } from '@/components/ui/Select'
import { StatusBadge, orderTone } from '@/components/ui/StatusBadge'
import { orders as initialOrders } from '@/data/orders'
import type { OrderStatus } from '@/types'
import { formatDate, formatINR } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders)
  const [filter, setFilter] = useState('')
  const { push } = useToast()

  const list = filter ? orders.filter((o) => o.status === filter) : orders

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    push(`Order ${id} marked as ${status}`)
  }

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
      <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              <th className="px-5 py-2.5">Order ID</th>
              <th className="px-5 py-2.5">Date</th>
              <th className="px-5 py-2.5">Customer</th>
              <th className="px-5 py-2.5">Items</th>
              <th className="px-5 py-2.5">Amount</th>
              <th className="px-5 py-2.5">Status</th>
              <th className="px-5 py-2.5">Update</th>
            </tr>
          </thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.id} className="border-b border-navy-100 last:border-0">
                <td className="px-5 py-3 font-mono text-[13px] text-navy-950">{o.id}</td>
                <td className="px-5 py-3 text-navy-700">{formatDate(o.date)}</td>
                <td className="px-5 py-3 text-navy-700">Verma Medical Store</td>
                <td className="px-5 py-3 text-navy-700">{o.items.length} products</td>
                <td className="px-5 py-3 font-mono text-navy-950">{formatINR(o.grandTotal)}</td>
                <td className="px-5 py-3"><StatusBadge label={o.status} tone={orderTone(o.status)} /></td>
                <td className="px-5 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                    className="h-8 rounded-[4px] border border-navy-100 bg-white px-2 text-xs focus:border-teal-500 focus:outline-none"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
