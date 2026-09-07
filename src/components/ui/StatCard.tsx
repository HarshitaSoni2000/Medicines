import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  icon,
  tone = 'navy',
  sub,
}: {
  label: string
  value: string
  icon: ReactNode
  tone?: 'navy' | 'teal' | 'amber' | 'red' | 'green'
  sub?: string
}) {
  const toneBg: Record<string, string> = {
    navy: 'bg-navy-50 text-navy-700',
    teal: 'bg-teal-50 text-teal-700',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
  }
  return (
    <div className="rounded-[6px] border border-navy-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-navy-500">{label}</span>
        <span className={cn('flex h-8 w-8 items-center justify-center rounded-[4px]', toneBg[tone])}>
          {icon}
        </span>
      </div>
      <p className="mt-2 font-mono text-2xl font-semibold text-navy-950">{value}</p>
      {sub && <p className="mt-1 text-xs text-navy-500">{sub}</p>}
    </div>
  )
}
