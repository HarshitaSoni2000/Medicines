import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'

export default function AdminSettings() {
  const [form, setForm] = useState({
    businessName: 'Thock Medicine Distributors',
    supportPhone: '+91 771 400 2200',
    supportEmail: 'support@thockmedicine.in',
    minOrderValue: '2000',
    taxPercent: '5',
  })
  const { push } = useToast()

  return (
    <div>
      <PageHeader title="Settings" subtitle="Platform-wide configuration" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Business Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input label="Business Name" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
            <Input label="Support Phone" value={form.supportPhone} onChange={(e) => setForm({ ...form, supportPhone: e.target.value })} />
            <Input label="Support Email" value={form.supportEmail} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Order Rules</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input label="Minimum Order Value (₹)" type="number" value={form.minOrderValue} onChange={(e) => setForm({ ...form, minOrderValue: e.target.value })} />
            <Input label="Tax Rate (%)" type="number" value={form.taxPercent} onChange={(e) => setForm({ ...form, taxPercent: e.target.value })} />
          </CardContent>
        </Card>
      </div>
      <Button className="mt-5" onClick={() => push('Settings saved')}>Save Settings</Button>
    </div>
  )
}
