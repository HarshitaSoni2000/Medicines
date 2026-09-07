import { useState } from 'react'
import { Bell, BellOff } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { notifications as initial } from '@/data/orders'
import { cn } from '@/lib/utils'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function Notifications() {
  const [items, setItems] = useState(initial)

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={`${items.filter((i) => !i.read).length} unread`}
        actions={
          <Button variant="outline" size="sm" onClick={() => setItems((it) => it.map((i) => ({ ...i, read: true })))}>
            Mark all as read
          </Button>
        }
      />
      {items.length === 0 ? (
        <EmptyState icon={<BellOff className="h-8 w-8" />} title="No notifications" message="You're all caught up." />
      ) : (
        <div className="divide-y divide-navy-100 rounded-[6px] border border-navy-100 bg-white">
          {items.map((n) => (
            <button
              key={n.id}
              onClick={() => setItems((it) => it.map((i) => (i.id === n.id ? { ...i, read: true } : i)))}
              className="flex w-full items-start gap-3 p-4 text-left hover:bg-navy-50/50"
            >
              <span className={cn('mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full', n.read ? 'bg-navy-50 text-navy-400' : 'bg-teal-50 text-teal-700')}>
                <Bell className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1">
                <p className={cn('text-sm', n.read ? 'text-navy-700' : 'font-medium text-navy-950')}>{n.message}</p>
                <p className="mt-0.5 text-xs text-navy-500">{timeAgo(n.timestamp)}</p>
              </div>
              {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
