import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/AuthContext'
import { useToast } from '@/components/ui/Toast'

export default function Profile() {
  const { profile, register } = useAuth()
  const { push } = useToast()
  const [form, setForm] = useState(
    profile ?? { ownerName: '', storeName: '', gstNumber: '', drugLicenseNumber: '', phone: '', email: '' },
  )

  function save() {
    register(form)
    push('Business profile updated')
  }

  return (
    <div>
      <PageHeader title="Business Profile" subtitle="Details used on invoices and delivery" />
      <div className="max-w-2xl rounded-[6px] border border-navy-100 bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Owner Name" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} />
          <Input label="Medical Store Name" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
          <Input label="GST Number" value={form.gstNumber} onChange={(e) => setForm({ ...form, gstNumber: e.target.value })} />
          <Input label="Drug License Number" value={form.drugLicenseNumber} onChange={(e) => setForm({ ...form, drugLicenseNumber: e.target.value })} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <Button className="mt-5" onClick={save}>Save Changes</Button>
      </div>
    </div>
  )
}
