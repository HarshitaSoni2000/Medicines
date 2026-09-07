import { useState } from 'react'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

const channels = [
  { icon: Phone, label: 'Call Support', value: '+91 771 400 2200' },
  { icon: MessageCircle, label: 'WhatsApp Support', value: '+91 98261 00000' },
  { icon: Mail, label: 'Email Support', value: 'support@thockmedicine.in' },
  { icon: MapPin, label: 'Warehouse', value: 'Industrial Area Phase II, Raipur' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { push } = useToast()

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-semibold text-navy-950">Contact us</h1>
      <p className="mt-2 text-sm text-navy-500">Reach the distribution team directly, or send a message below.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          {channels.map((c) => (
            <div key={c.label} className="flex items-start gap-3 rounded-[6px] border border-navy-100 bg-white p-3">
              <c.icon className="mt-0.5 h-4 w-4 text-teal-700" />
              <div>
                <p className="text-xs text-navy-500">{c.label}</p>
                <p className="text-sm font-medium text-navy-950">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
            push('Message sent — our team will respond shortly')
          }}
          className="space-y-4 rounded-[6px] border border-navy-100 bg-white p-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Your Name" required />
            <Input label="Store Name" required />
            <Input label="Phone" required />
            <Input label="Email" type="email" required />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-900">Message</label>
            <textarea
              required
              rows={4}
              className="mt-1.5 w-full rounded-[4px] border border-navy-100 p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              placeholder="How can we help?"
            />
          </div>
          <Button type="submit" size="lg">
            {sent ? 'Sent' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  )
}
