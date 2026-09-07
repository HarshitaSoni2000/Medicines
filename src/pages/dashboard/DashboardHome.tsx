import { Link } from 'react-router-dom'
import { ClipboardList, Clock, PackageCheck, Wallet, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { StatusBadge, orderTone } from '@/components/ui/StatusBadge'
import { orders } from '@/data/orders'
import { formatDate, formatINR } from '@/lib/utils'
import { useAuth } from '@/features/auth/AuthContext'

export default function DashboardHome() {
  const { profile } = useAuth()
  const totalOrders = orders.length
  const pending = orders.filter((o) => ['Pending', 'Confirmed', 'Processing'].includes(o.status)).length
  const delivered = orders.filter((o) => o.status === 'Delivered').length
  const totalPurchase = orders.reduce((s, o) => s + o.grandTotal, 0)

  return (
    <div>
      <PageHeader title={`Welcome back, ${profile?.ownerName?.split(' ')[0] ?? 'there'}`} subtitle={profile?.storeName} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Orders" value={String(totalOrders)} icon={<ClipboardList className="h-4 w-4" />} />
        <StatCard label="Pending Orders" value={String(pending)} icon={<Clock className="h-4 w-4" />} tone="amber" />
        <StatCard label="Delivered" value={String(delivered)} icon={<PackageCheck className="h-4 w-4" />} tone="green" />
        <StatCard label="Total Purchase" value={formatINR(totalPurchase)} icon={<Wallet className="h-4 w-4" />} tone="teal" />
      </div>

      <div className="mt-6 rounded-[6px] border border-navy-100 bg-white">
        <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
          <h3 className="text-[15px] font-semibold text-navy-950">Recent Orders</h3>
          <Link to="/dashboard/orders" className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-600">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
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
              {orders.slice(0, 5).map((o) => (
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
      </div>
    </div>
  )
}
