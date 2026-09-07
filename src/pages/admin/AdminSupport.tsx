import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Select } from '@/components/ui/Select'
import { supportTickets as initial } from '@/data/orders'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

export default function AdminSupport() {
  const [tickets, setTickets] = useState(initial)
  const { push } = useToast()

  function resolve(id: string) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'Resolved' as const } : t)))
    push('Ticket marked resolved')
  }

  return (
    <div>
      <PageHeader title="Support" subtitle={`${tickets.filter((t) => t.status === 'Open').length} open tickets`} />
      <div className="divide-y divide-navy-100 rounded-[6px] border border-navy-100 bg-white">
        {tickets.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="text-sm font-medium text-navy-950">{t.subject}</p>
              <p className="mt-0.5 text-xs text-navy-500">
                {t.id} {t.orderId && `· Order ${t.orderId}`} · {formatDate(t.createdAt)}
              </p>
              <p className="mt-1 text-sm text-navy-700">{t.message}</p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge label={t.status} tone={t.status === 'Open' ? 'amber' : 'green'} />
              {t.status === 'Open' && (
                <Select
                  value=""
                  onChange={(e) => e.target.value === 'resolve' && resolve(t.id)}
                  className="w-32"
                >
                  <option value="">Action</option>
                  <option value="resolve">Mark Resolved</option>
                </Select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
