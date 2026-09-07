import type { ReactNode } from 'react'
import { Button } from './Button'

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: {
  icon: ReactNode
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[6px] border border-dashed border-navy-100 bg-navy-50/40 px-6 py-14 text-center">
      <div className="text-navy-500">{icon}</div>
      <div>
        <p className="text-[15px] font-semibold text-navy-950">{title}</p>
        <p className="mt-1 text-sm text-navy-500">{message}</p>
      </div>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} className="mt-1">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
