import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { suppliers } from '@/data/admin'
import { Plus, Phone } from 'lucide-react'

export default function AdminSuppliers() {
  return (
    <div>
      <PageHeader
        title="Suppliers"
        subtitle={`${suppliers.length} registered suppliers`}
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Add Supplier</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((s) => (
          <div key={s.id} className="rounded-[6px] border border-navy-100 bg-white p-4">
            <p className="text-[15px] font-semibold text-navy-950">{s.name}</p>
            <p className="mt-0.5 text-xs text-navy-500">{s.city}</p>
            <div className="mt-3 space-y-1.5 text-sm text-navy-700">
              <p>{s.contactPerson}</p>
              <p className="flex items-center gap-1.5 font-mono text-xs"><Phone className="h-3 w-3" /> {s.phone}</p>
            </div>
            <p className="mt-3 font-mono text-xs text-teal-700">{s.productsSupplied} products supplied</p>
          </div>
        ))}
      </div>
    </div>
  )
}
