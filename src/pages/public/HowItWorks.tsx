import { Link } from 'react-router-dom'
import { UserPlus, Search, ListPlus, CheckCircle2, PackageCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const steps = [
  { icon: UserPlus, title: 'Create account', text: 'Register your store with GST and drug licence details. Verification typically takes under 24 hours.' },
  { icon: Search, title: 'Search medicines', text: 'Find products instantly by name, brand, salt/composition, manufacturer or SKU.' },
  { icon: ListPlus, title: 'Add products', text: 'Add items from the catalog, or use Quick Order to build a large order in a spreadsheet-style view.' },
  { icon: CheckCircle2, title: 'Place wholesale order', text: 'Review pricing, choose a delivery address and payment method, and confirm.' },
  { icon: PackageCheck, title: 'Receive delivery', text: 'Track your order status from confirmed through to delivered at your store.' },
]

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-semibold text-navy-950">How it works</h1>
      <p className="mt-2 text-sm text-navy-500">From registration to delivery, in five steps.</p>

      <div className="mt-8 space-y-6">
        {steps.map((s, i) => (
          <div key={s.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 font-mono text-xs font-semibold text-teal-400">
                {i + 1}
              </span>
              {i < steps.length - 1 && <div className="mt-1 w-px flex-1 bg-navy-100" />}
            </div>
            <div className="pb-6">
              <div className="flex items-center gap-2">
                <s.icon className="h-4 w-4 text-teal-700" />
                <p className="text-[15px] font-semibold text-navy-950">{s.title}</p>
              </div>
              <p className="mt-1 text-sm text-navy-500">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <Button size="lg" asChild>
        <Link to="/register">Create Your Account</Link>
      </Button>
    </div>
  )
}
