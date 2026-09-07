import { useState } from 'react'
import { MapPin, Plus, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { addresses as initialAddresses } from '@/data/orders'
import type { Address } from '@/types'
import { useToast } from '@/components/ui/Toast'

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ label: '', line1: '', city: '', state: '', pincode: '' })
  const { push } = useToast()

  function addAddress() {
    if (!form.label || !form.line1) {
      push('Please fill in the required fields', 'error')
      return
    }
    setAddresses((prev) => [...prev, { id: `addr-${Date.now()}`, ...form }])
    setForm({ label: '', line1: '', city: '', state: '', pincode: '' })
    setOpen(false)
    push('Address added')
  }

  return (
    <div>
      <PageHeader
        title="Addresses"
        subtitle="Delivery locations for your store"
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="h-3.5 w-3.5" /> Add Address
          </Button>
        }
      />

      {addresses.length === 0 ? (
        <EmptyState icon={<MapPin className="h-8 w-8" />} title="No addresses saved" message="Add a delivery address to speed up checkout." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <div key={a.id} className="flex items-start gap-3 rounded-[6px] border border-navy-100 bg-white p-4">
              <MapPin className="mt-0.5 h-4 w-4 text-navy-500" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-navy-950">{a.label}</p>
                <p className="text-navy-500">{a.line1}, {a.city}, {a.state} - {a.pincode}</p>
              </div>
              <button
                onClick={() => setAddresses((prev) => prev.filter((x) => x.id !== a.id))}
                className="text-navy-400 hover:text-red-600"
                aria-label="Remove address"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Address">
        <div className="space-y-4">
          <Input label="Label" placeholder="e.g. Main Store" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          <Input label="Address Line" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <Input label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          </div>
          <Input label="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
          <Button className="w-full" onClick={addAddress}>Save Address</Button>
        </div>
      </Modal>
    </div>
  )
}
