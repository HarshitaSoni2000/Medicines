import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { IndianRupee, ClipboardList, Clock, Users, Pill, TriangleAlert } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { salesTrend, categoryPerformance, topSelling } from '@/data/admin'
import { orders } from '@/data/orders'
import { medicines } from '@/data/medicines'
import { formatINR } from '@/lib/utils'

export default function AdminDashboard() {
  const totalSales = salesTrend.reduce((s, d) => s + d.sales, 0)
  const ordersToday = salesTrend[salesTrend.length - 1].orders
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length
  const lowStock = medicines.filter((m) => m.stockStatus === 'low-stock' || m.stockStatus === 'out-of-stock').length

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Overview of sales, orders and inventory" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Sales" value={formatINR(totalSales)} icon={<IndianRupee className="h-4 w-4" />} tone="teal" />
        <StatCard label="Orders Today" value={String(ordersToday)} icon={<ClipboardList className="h-4 w-4" />} />
        <StatCard label="Pending Orders" value={String(pendingOrders)} icon={<Clock className="h-4 w-4" />} tone="amber" />
        <StatCard label="Customers" value="6" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Products" value={String(medicines.length)} icon={<Pill className="h-4 w-4" />} />
        <StatCard label="Low Stock Items" value={String(lowStock)} icon={<TriangleAlert className="h-4 w-4" />} tone="red" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Sales Overview (7 days)</CardTitle></CardHeader>
          <CardContent className="h-64 pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrend} margin={{ left: 8, right: 16 }}>
                <CartesianGrid stroke="#dde4ea" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#3d6a94' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#3d6a94' }} axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={(v) => formatINR(Number(v))} contentStyle={{ fontSize: 12, borderRadius: 4 }} />
                <Line type="monotone" dataKey="sales" stroke="#0e8785" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Orders Overview (7 days)</CardTitle></CardHeader>
          <CardContent className="h-64 pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesTrend} margin={{ left: 8, right: 16 }}>
                <CartesianGrid stroke="#dde4ea" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#3d6a94' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#3d6a94' }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
                <Bar dataKey="orders" fill="#163049" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top Selling Medicines</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topSelling.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-sm">
                <span className="text-navy-800">{t.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-navy-500">{t.units} units</span>
                  <span className="font-mono font-medium text-navy-950">{formatINR(t.revenue)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Category Performance</CardTitle></CardHeader>
          <CardContent className="h-56 pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid stroke="#dde4ea" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#3d6a94' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#163049' }} axisLine={false} tickLine={false} width={110} />
                <Tooltip formatter={(v) => formatINR(Number(v))} contentStyle={{ fontSize: 12, borderRadius: 4 }} />
                <Bar dataKey="sales" fill="#12a19e" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
