import { cn } from '@/lib/utils'

type Tone = 'green' | 'amber' | 'red' | 'navy' | 'teal'

const toneStyles: Record<Tone, string> = {
  green: 'border-l-green-600 text-green-600 bg-green-100/60',
  amber: 'border-l-amber-600 text-amber-600 bg-amber-100/60',
  red: 'border-l-red-600 text-red-600 bg-red-100/60',
  navy: 'border-l-navy-600 text-navy-700 bg-navy-50',
  teal: 'border-l-teal-600 text-teal-700 bg-teal-50',
}

export function StatusBadge({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border-l-2 px-2 py-1 text-xs font-medium leading-none',
        toneStyles[tone],
      )}
    >
      {label}
    </span>
  )
}

export function stockTone(status: 'in-stock' | 'low-stock' | 'out-of-stock'): Tone {
  if (status === 'in-stock') return 'green'
  if (status === 'low-stock') return 'amber'
  return 'red'
}

export function stockLabel(status: 'in-stock' | 'low-stock' | 'out-of-stock') {
  if (status === 'in-stock') return 'In Stock'
  if (status === 'low-stock') return 'Low Stock'
  return 'Out of Stock'
}

export function expiryTone(status: 'ok' | 'near-expiry' | 'expired'): Tone {
  if (status === 'ok') return 'navy'
  if (status === 'near-expiry') return 'amber'
  return 'red'
}

const orderTones: Record<string, Tone> = {
  Pending: 'amber',
  Confirmed: 'navy',
  Processing: 'navy',
  Shipped: 'teal',
  Delivered: 'green',
  Cancelled: 'red',
}

export function orderTone(status: string): Tone {
  return orderTones[status] ?? 'navy'
}
