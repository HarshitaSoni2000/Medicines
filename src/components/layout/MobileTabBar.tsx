import { NavLink } from 'react-router-dom'
import { Home, Pill, ClipboardList, ShoppingCart, User } from 'lucide-react'
import { useCart } from '@/features/cart/CartContext'
import { cn } from '@/lib/utils'

const tabs = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/medicines', label: 'Medicines', icon: Pill, end: false },
  { to: '/dashboard/orders', label: 'Orders', icon: ClipboardList, end: false },
  { to: '/cart', label: 'Cart', icon: ShoppingCart, end: false },
  { to: '/dashboard', label: 'Account', icon: User, end: true },
]

export function MobileTabBar() {
  const { itemCount } = useCart()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy-100 bg-white lg:hidden">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            cn(
              'relative flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] text-navy-500',
              isActive && 'text-teal-700',
            )
          }
        >
          <t.icon className="h-5 w-5" />
          {t.label}
          {t.to === '/cart' && itemCount > 0 && (
            <span className="absolute right-4 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-teal-600 px-0.5 font-mono text-[9px] text-white">
              {itemCount}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
