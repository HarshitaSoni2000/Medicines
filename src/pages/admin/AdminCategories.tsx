import { PageHeader } from '@/components/shared/PageHeader'
import { categories, medicines } from '@/data/medicines'
import { categoryIcon } from '@/utils/category'

export default function AdminCategories() {
  return (
    <div>
      <PageHeader title="Categories" subtitle={`${categories.length} categories`} />
      <div className="overflow-hidden rounded-[6px] border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              <th className="px-5 py-2.5">Category</th>
              <th className="px-5 py-2.5">Description</th>
              <th className="px-5 py-2.5">Products</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => {
              const Icon = categoryIcon[c.name]
              const count = medicines.filter((m) => m.category === c.name).length
              return (
                <tr key={c.name} className="border-b border-navy-100 last:border-0">
                  <td className="flex items-center gap-2.5 px-5 py-3 font-medium text-navy-950">
                    <Icon className="h-4 w-4 text-teal-700" /> {c.name}
                  </td>
                  <td className="px-5 py-3 text-navy-500">{c.blurb}</td>
                  <td className="px-5 py-3 font-mono text-navy-700">{count}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
