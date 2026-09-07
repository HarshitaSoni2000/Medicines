import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Download } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { salesTrend, categoryPerformance, topSelling } from '@/data/admin'
import { medicines } from '@/data/medicines'
import { formatINR } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

const reportTypes = [
  'Daily Sales', 'Monthly Sales', 'Product Sales', 'Category Sales',
  'Customer Sales', 'Order Report', 'Inventory Report', 'Low Stock Report', 'Expiry Report',
]

export default function AdminReports() {
  const [report, setReport] = useState(reportTypes[0])
  const { push } = useToast()
  const lowStock = medicines.filter((m) => m.stockStatus === 'low-stock' || m.stockStatus === 'out-of-stock')
  const nearExpiry = medicines.filter((m) => m.expiryStatus !== 'ok')

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Sales, inventory and customer insights"
        actions={
          <>
            <Select value={report} onChange={(e) => setReport(e.target.value)} className="w-48">
              {reportTypes.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Select>
            <Button variant="outline" size="sm" onClick={() => push('Report exported')}>
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </>
        }
      />

      {(report === 'Daily Sales' || report === 'Monthly Sales') && (
        <Card>
          <CardHeader><CardTitle>{report}</CardTitle></CardHeader>
          <CardContent className="h-72 pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesTrend} margin={{ left: 8, right: 16 }}>
                <CartesianGrid stroke="#dde4ea" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#3d6a94' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#3d6a94' }} axisLine={false} tickLine={false} width={56} />
                <Tooltip formatter={(v) => formatINR(Number(v))} contentStyle={{ fontSize: 12, borderRadius: 4 }} />
                <Bar dataKey="sales" fill="#0e8785" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {(report === 'Product Sales' || report === 'Order Report') && (
        <Card>
          <CardHeader><CardTitle>Top Products by Revenue</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topSelling.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-sm">
                <span className="text-navy-800">{t.name}</span>
                <span className="font-mono font-medium text-navy-950">{formatINR(t.revenue)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {(report === 'Category Sales' || report === 'Customer Sales') && (
        <Card>
          <CardHeader><CardTitle>Sales by Category</CardTitle></CardHeader>
          <CardContent className="h-72 pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid stroke="#dde4ea" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#3d6a94' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#163049' }} axisLine={false} tickLine={false} width={120} />
                <Tooltip formatter={(v) => formatINR(Number(v))} contentStyle={{ fontSize: 12, borderRadius: 4 }} />
                <Bar dataKey="sales" fill="#163049" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {report === 'Inventory Report' && (
        <Card>
          <CardHeader><CardTitle>Inventory Snapshot</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div><p className="font-mono text-2xl font-semibold text-navy-950">{medicines.length}</p><p className="text-xs text-navy-500">Total SKUs</p></div>
            <div><p className="font-mono text-2xl font-semibold text-amber-600">{lowStock.length}</p><p className="text-xs text-navy-500">Low / Out of Stock</p></div>
            <div><p className="font-mono text-2xl font-semibold text-red-600">{nearExpiry.length}</p><p className="text-xs text-navy-500">Near Expiry / Expired</p></div>
          </CardContent>
        </Card>
      )}

      {report === 'Low Stock Report' && (
        <Card>
          <CardHeader><CardTitle>Low Stock Products</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {lowStock.map((m) => (
              <div key={m.id} className="flex justify-between text-sm">
                <span className="text-navy-800">{m.name}</span>
                <span className="font-mono text-amber-600">{m.stockQuantity} units left</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {report === 'Expiry Report' && (
        <Card>
          <CardHeader><CardTitle>Near Expiry / Expired Products</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {nearExpiry.map((m) => (
              <div key={m.id} className="flex justify-between text-sm">
                <span className="text-navy-800">{m.name}</span>
                <span className="font-mono text-red-600">{m.batch.expiryDate}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
