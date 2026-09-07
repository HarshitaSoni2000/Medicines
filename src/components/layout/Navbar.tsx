import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingCart, X } from 'lucide-react'
import { useCart } from '@/features/cart/CartContext'
import { useAuth } from '@/features/auth/AuthContext'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/medicines', label: 'Medicines' },
  { to: '/categories', label: 'Categories' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { itemCount } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    navigate(query.trim() ? `/medicines?q=${encodeURIComponent(query.trim())}` : '/medicines')
  }

  return (
    <div className="sticky top-0 z-40 bg-white">
      <div className="bg-navy-950 px-4 py-1.5 text-center text-[12px] text-navy-100">
        Trusted Wholesale Medicine Supplier · Fast Delivery · Genuine Products
      </div>
      <header className="border-b border-navy-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6 text-navy-900" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-navy-950 font-mono text-sm font-semibold text-teal-400">
              TM
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[15px] font-semibold text-navy-950">THOCK MEDICINE</span>
              <span className="text-[11px] text-navy-500">Wholesale Distribution</span>
            </span>
          </Link>

          <nav className="ml-4 hidden gap-6 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium text-navy-700 hover:text-navy-950',
                    isActive && 'text-teal-700',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 items-center lg:flex">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medicines, brands, salts…"
                className="h-9 w-full rounded-[4px] border border-navy-100 bg-navy-50/50 pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <Link to="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-[4px] hover:bg-navy-50">
              <ShoppingCart className="h-5 w-5 text-navy-900" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-600 px-1 font-mono text-[10px] text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <Button size="sm" variant="outline" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button size="sm" variant="ghost" onClick={() => navigate('/login')} className="hidden sm:inline-flex">
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-white p-5">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-navy-950">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-navy-900" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-navy-800"
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
