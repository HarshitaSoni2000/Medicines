import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Boxes,
  Building2,
  ShieldCheck,
  Truck,
  Headset,
  UserPlus,
  Search,
  ListPlus,
  PackageCheck,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/shared/ProductCard'
import { categories } from '@/data/medicines'
import { medicines } from '@/data/medicines'
import { categoryIcon } from '@/utils/category'

const trust = [
  { label: 'Products listed', value: '5,000+' },
  { label: 'Medical stores served', value: '1,000+' },
  { label: 'Avg. dispatch time', value: '4 hrs' },
  { label: 'Order accuracy', value: '99.6%' },
]

const whyUs = [
  { icon: ShieldCheck, title: 'Genuine medicines', text: 'Every batch is sourced from licensed manufacturers and tracked to source.' },
  { icon: Boxes, title: 'Large catalog', text: 'From antibiotics to surgical consumables, ordered from one place.' },
  { icon: Truck, title: 'Fast dispatch', text: 'Same-day processing on orders placed before 4 PM.' },
  { icon: Building2, title: 'Wholesale pricing', text: 'Pricing scales with your order volume automatically.' },
  { icon: PackageCheck, title: 'Reliable delivery', text: 'Temperature-appropriate handling for every shipment.' },
  { icon: Headset, title: 'Dedicated support', text: 'A real distribution team, reachable by call or WhatsApp.' },
]

const steps = [
  { icon: UserPlus, title: 'Create account', text: 'Register your store with GST and drug licence details.' },
  { icon: Search, title: 'Search medicines', text: 'Find products by name, salt, brand or manufacturer.' },
  { icon: ListPlus, title: 'Add products', text: 'Build your order across categories, or use Quick Order.' },
  { icon: CheckCircle2, title: 'Place wholesale order', text: 'Review pricing and confirm your order in one step.' },
  { icon: PackageCheck, title: 'Receive delivery', text: 'Track dispatch and receive stock at your store.' },
]

export default function Home() {
  const featured = medicines.slice(0, 8)

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-navy-100 bg-navy-950">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="max-w-md text-4xl font-semibold leading-[1.1] text-white lg:text-[42px]">
              Your trusted partner for wholesale medicines
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-navy-100/70">
              Order genuine medicines in bulk with reliable pricing, fast fulfilment and dependable
              distribution — built for pharmacies, clinics and hospitals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/medicines">Browse Medicines</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10" asChild>
                <Link to="/quick-order">Start Ordering</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-navy-900 p-5 font-mono text-sm text-navy-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-wide text-navy-100/50">Quick Order · Draft</span>
              <span className="text-xs text-teal-400">Store: Verma Medical</span>
            </div>
            <div className="mt-3 space-y-2.5">
              {[
                ['Paracetamol 500mg', '20', '₹900'],
                ['Amoxicillin 500mg', '10', '₹880'],
                ['Metformin 500mg', '15', '₹810'],
                ['Azithromycin 500mg', '6', '₹792'],
              ].map(([name, qty, total]) => (
                <div key={name} className="flex items-center justify-between rounded-[4px] bg-white/5 px-3 py-2">
                  <span className="text-navy-100">{name}</span>
                  <span className="text-navy-100/50">×{qty}</span>
                  <span className="text-teal-400">{total}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-navy-100/70">4 products · 51 units</span>
              <span className="text-base font-semibold text-white">₹3,382</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {trust.map((t) => (
              <div key={t.label}>
                <p className="font-mono text-2xl font-semibold text-white">{t.value}</p>
                <p className="mt-1 text-xs text-navy-100/60">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy-950">Product categories</h2>
          <Link to="/categories" className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-600">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => {
            const Icon = categoryIcon[c.name]
            return (
              <Link
                key={c.name}
                to={`/medicines?category=${encodeURIComponent(c.name)}`}
                className="flex flex-col gap-2 rounded-[6px] border border-navy-100 bg-white p-4 hover:border-teal-200 hover:shadow-[0_2px_10px_rgba(15,35,56,0.06)]"
              >
                <Icon className="h-5 w-5 text-teal-700" strokeWidth={1.5} />
                <span className="text-[13px] font-medium text-navy-950">{c.name}</span>
                <span className="text-xs text-navy-500">{c.blurb}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured medicines */}
      <section className="bg-navy-50/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-navy-950">Popular medicines</h2>
            <Link to="/medicines" className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-600">
              Browse catalog <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((m) => (
              <ProductCard key={m.id} medicine={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="mb-6 text-xl font-semibold text-navy-950">Why medical stores choose Thock Medicine</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w) => (
            <div key={w.title} className="rounded-[6px] border border-navy-100 bg-white p-5">
              <w.icon className="h-5 w-5 text-teal-700" strokeWidth={1.5} />
              <p className="mt-3 text-[15px] font-semibold text-navy-950">{w.title}</p>
              <p className="mt-1 text-sm text-navy-500">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy-950 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-8 text-xl font-semibold text-white">How it works</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-teal-400">{String(i + 1).padStart(2, '0')}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <s.icon className="mt-3 h-5 w-5 text-teal-400" strokeWidth={1.5} />
                <p className="mt-3 text-[15px] font-semibold text-white">{s.title}</p>
                <p className="mt-1 text-sm text-navy-100/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-navy-950">Ready to simplify your medicine procurement?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-navy-500">
          Set up your store account and place your first wholesale order today.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <Link to="/quick-order">Start Ordering</Link>
        </Button>
      </section>
    </div>
  )
}
