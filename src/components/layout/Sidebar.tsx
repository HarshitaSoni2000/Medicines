import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SidebarItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export function Sidebar({
  items,
  footerItems,
  title,
}: {
  items: SidebarItem[]
  footerItems?: SidebarItem[]
  title: string
}) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-navy-100 bg-white lg:flex">
      <div className="border-b border-navy-100 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">{title}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-[4px] px-3 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50',
                isActive && 'bg-teal-50 text-teal-700',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      {footerItems && (
        <div className="border-t border-navy-100 p-3">
          {footerItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-2.5 rounded-[4px] px-3 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </aside>
  )
}
