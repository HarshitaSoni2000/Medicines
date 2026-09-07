import { Link } from 'react-router-dom'
import { Bell, LogOut } from 'lucide-react'
import { notifications } from '@/data/orders'

export function InternalTopbar({ homeTo, name }: { homeTo: string; name: string }) {
  const unread = notifications.filter((n) => !n.read).length
  return (
    <header className="flex h-14 items-center justify-between border-b border-navy-100 bg-white px-4 sm:px-6">
      <Link to={homeTo} className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-navy-950 font-mono text-xs font-semibold text-teal-400">
          TM
        </span>
        <span className="text-sm font-semibold text-navy-950">THOCK MEDICINE</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/dashboard/notifications" className="relative text-navy-600 hover:text-navy-950">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-600 px-0.5 font-mono text-[9px] text-white">
              {unread}
            </span>
          )}
        </Link>
        <span className="hidden text-sm text-navy-700 sm:inline">{name}</span>
        <Link to="/" className="text-navy-500 hover:text-red-600" aria-label="Logout">
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </header>
  )
}
