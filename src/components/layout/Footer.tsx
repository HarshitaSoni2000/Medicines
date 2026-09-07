import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-teal-600 font-mono text-sm font-semibold text-white">
            TM
          </span>
          <p className="mt-3 text-[15px] font-semibold text-white">THOCK MEDICINE</p>
          <p className="mt-2 text-sm text-navy-100/70">
            Wholesale medicine distribution for pharmacies, clinics and hospitals across the region.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-100/50">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/medicines" className="hover:text-teal-400">Browse Medicines</Link></li>
            <li><Link to="/quick-order" className="hover:text-teal-400">Quick Order</Link></li>
            <li><Link to="/how-it-works" className="hover:text-teal-400">How It Works</Link></li>
            <li><Link to="/about" className="hover:text-teal-400">About Us</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-100/50">Categories</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/categories" className="hover:text-teal-400">Antibiotics</Link></li>
            <li><Link to="/categories" className="hover:text-teal-400">Cardiac Care</Link></li>
            <li><Link to="/categories" className="hover:text-teal-400">Diabetes Care</Link></li>
            <li><Link to="/categories" className="hover:text-teal-400">Vitamins &amp; Supplements</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-100/50">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +91 771 400 2200</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> orders@thockmedicine.in</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Raipur, Chhattisgarh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-navy-100/50">
        © 2026 Thock Medicine Distributors. Terms · Privacy Policy · Refund &amp; Return Policy
      </div>
    </footer>
  )
}
