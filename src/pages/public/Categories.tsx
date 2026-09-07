import { Link } from 'react-router-dom'
import { categories, medicines } from '@/data/medicines'
import { categoryIcon, categoryTint } from '@/utils/category'
import { PageHeader } from '@/components/shared/PageHeader'

export default function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader title="Categories" subtitle="Browse the full catalog by product category" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const Icon = categoryIcon[c.name]
          const count = medicines.filter((m) => m.category === c.name).length
          return (
            <Link
              key={c.name}
              to={`/medicines?category=${encodeURIComponent(c.name)}`}
              className="flex items-center gap-4 rounded-[6px] border border-navy-100 bg-white p-5 hover:border-teal-200 hover:shadow-[0_2px_10px_rgba(15,35,56,0.06)]"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] ${categoryTint[c.name]}`}>
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-navy-950">{c.name}</p>
                <p className="text-sm text-navy-500">{c.blurb}</p>
                <p className="mt-1 text-xs font-mono text-teal-700">{count} products</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
