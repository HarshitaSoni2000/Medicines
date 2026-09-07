import { ShieldCheck, Truck, Users, Warehouse } from 'lucide-react'

const stats = [
  { icon: Warehouse, label: 'Years in distribution', value: '12+' },
  { icon: Users, label: 'Medical stores served', value: '1,000+' },
  { icon: ShieldCheck, label: 'Licensed manufacturers', value: '80+' },
  { icon: Truck, label: 'Cities covered', value: '25+' },
]

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-semibold text-navy-950">About Thock Medicine</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-navy-700">
        Thock Medicine is a wholesale pharmaceutical distributor supplying medical stores, clinics
        and hospitals with genuine medicines at reliable wholesale pricing. We built this platform
        so that procurement — often the most time-consuming part of running a pharmacy — takes
        minutes instead of hours.
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-navy-700">
        Every product listed is sourced directly from licensed manufacturers and tracked at the
        batch level, so store owners can order with confidence.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[6px] border border-navy-100 bg-white p-4 text-center">
            <s.icon className="mx-auto h-5 w-5 text-teal-700" strokeWidth={1.5} />
            <p className="mt-2 font-mono text-xl font-semibold text-navy-950">{s.value}</p>
            <p className="mt-1 text-xs text-navy-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
