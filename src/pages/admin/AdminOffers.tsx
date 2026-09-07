import { useState } from 'react'
import { Plus, Percent } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { offers as initialOffers } from '@/data/admin'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

export default function AdminOffers() {
  const [offers, setOffers] = useState(initialOffers)
  const { push } = useToast()

  function toggle(id: string) {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o)))
    push('Offer status updated')
  }

  return (
    <div>
      <PageHeader
        title="Offers"
        subtitle={`${offers.filter((o) => o.active).length} active offers`}
        actions={<Button size="sm"><Plus className="h-3.5 w-3.5" /> Create Offer</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {offers.map((o) => (
          <div key={o.id} className="rounded-[6px] border border-navy-100 bg-white p-4">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-teal-50 text-teal-700">
                <Percent className="h-4 w-4" />
              </span>
              <StatusBadge label={o.active ? 'Active' : 'Inactive'} tone={o.active ? 'green' : 'navy'} />
            </div>
            <p className="mt-3 text-[15px] font-semibold text-navy-950">{o.title}</p>
            <p className="mt-1 text-sm text-navy-500">{o.description}</p>
            <p className="mt-2 text-xs text-navy-500">{o.category} · Valid till {formatDate(o.validTill)}</p>
            <button
              onClick={() => toggle(o.id)}
              className="mt-3 text-xs font-medium text-teal-700 hover:text-teal-600"
            >
              {o.active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
