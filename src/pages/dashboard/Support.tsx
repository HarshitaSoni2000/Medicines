import { useState } from 'react'
import { Mail, MessageCircle, Phone, Plus } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { supportTickets as initial } from '@/data/orders'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

const channels = [
  { icon: Phone, label: 'Call Support', value: '+91 771 400 2200' },
  { icon: MessageCircle, label: 'WhatsApp Support', value: '+91 98261 00000' },
  { icon: Mail, label: 'Email Support', value: 'support@thockmedicine.in' },
]

export default function Support() {
  const [tickets, setTickets] = useState(initial)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ subject: '', orderId: '', message: '' })
  const { push } = useToast()

  function createTicket() {
    if (!form.subject || !form.message) {
      push('Please fill in subject and message', 'error')
      return
    }
    setTickets((prev) => [
      {
        id: `TCK-${String(prev.length + 1).padStart(3, '0')}`,
        subject: form.subject,
        orderId: form.orderId || undefined,
        message: form.message,
        status: 'Open',
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])
    setForm({ subject: '', orderId: '', message: '' })
    setOpen(false)
    push('Support ticket created')
  }

  return (
    <div>
      <PageHeader
        title="Support"
        subtitle="We usually respond within a few hours"
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="h-3.5 w-3.5" /> Create Ticket
          </Button>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {channels.map((c) => (
          <div key={c.label} className="flex items-center gap-3 rounded-[6px] border border-navy-100 bg-white p-4">
            <c.icon className="h-4 w-4 text-teal-700" />
            <div>
              <p className="text-sm font-medium text-navy-950">{c.label}</p>
              <p className="text-xs text-navy-500">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[6px] border border-navy-100 bg-white">
        <div className="border-b border-navy-100 px-5 py-4">
          <h3 className="text-[15px] font-semibold text-navy-950">Your Tickets</h3>
        </div>
        <div className="divide-y divide-navy-100">
          {tickets.map((t) => (
            <div key={t.id} className="flex items-start justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-medium text-navy-950">{t.subject}</p>
                <p className="mt-0.5 text-xs text-navy-500">
                  {t.id} {t.orderId && `· Order ${t.orderId}`} · {formatDate(t.createdAt)}
                </p>
                <p className="mt-1 text-sm text-navy-700">{t.message}</p>
              </div>
              <StatusBadge label={t.status} tone={t.status === 'Open' ? 'amber' : 'green'} />
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Support Ticket">
        <div className="space-y-4">
          <Input label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <Input label="Order ID (optional)" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full rounded-[4px] border border-navy-100 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
          </div>
          <Button className="w-full" onClick={createTicket}>Submit Ticket</Button>
        </div>
      </Modal>
    </div>
  )
}
