import { Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  Pill,
  FolderTree,
  Users,
  Boxes,
  Truck,
  Tag,
  Percent,
  BarChart3,
  LifeBuoy,
  Settings,
  LogOut,
  Receipt,
} from 'lucide-react'
import { Sidebar, type SidebarItem } from './Sidebar'
import { InternalTopbar } from './InternalTopbar'

const items: SidebarItem[] = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/billing', label: 'Billing', icon: Receipt },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/products', label: 'Products', icon: Pill },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
  { to: '/admin/suppliers', label: 'Suppliers', icon: Truck },
  { to: '/admin/pricing', label: 'Pricing', icon: Tag },
  { to: '/admin/offers', label: 'Offers', icon: Percent },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/support', label: 'Support', icon: LifeBuoy },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const footerItems: SidebarItem[] = [{ to: '/', label: 'Logout', icon: LogOut }]

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <InternalTopbar homeTo="/admin" name="Admin" />
      <div className="mx-auto flex w-full max-w-[1400px] flex-1">
        <Sidebar title="Admin Panel" items={items} footerItems={footerItems} />
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
