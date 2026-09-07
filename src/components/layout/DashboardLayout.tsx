import { Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  Zap,
  Heart,
  Archive,
  MapPin,
  Building2,
  FileText,
  Bell,
  LifeBuoy,
  LogOut,
} from 'lucide-react'
import { Sidebar, type SidebarItem } from './Sidebar'
import { InternalTopbar } from './InternalTopbar'
import { useAuth } from '@/features/auth/AuthContext'

const items: SidebarItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/orders', label: 'Orders', icon: ClipboardList },
  { to: '/quick-order', label: 'Quick Order', icon: Zap },
  { to: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/dashboard/saved-carts', label: 'Saved Carts', icon: Archive },
  { to: '/dashboard/addresses', label: 'Addresses', icon: MapPin },
  { to: '/dashboard/profile', label: 'Business Profile', icon: Building2 },
  { to: '/dashboard/documents', label: 'Documents', icon: FileText },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/support', label: 'Support', icon: LifeBuoy },
]

const footerItems: SidebarItem[] = [{ to: '/', label: 'Logout', icon: LogOut }]

export function DashboardLayout() {
  const { profile } = useAuth()
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <InternalTopbar homeTo="/dashboard" name={profile?.storeName ?? 'Guest'} />
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <Sidebar title="Store Panel" items={items} footerItems={footerItems} />
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
