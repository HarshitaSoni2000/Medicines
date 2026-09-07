import { useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { medicines, categories, manufacturers } from '@/data/medicines'
import { ProductCard } from '@/components/shared/ProductCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import type { MedicineCategory } from '@/types'

const PAGE_SIZE = 12

export default function MedicineCatalog() {
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)

  const query = params.get('q') ?? ''
  const category = (params.get('category') as MedicineCategory) ?? ''
  const manufacturer = params.get('manufacturer') ?? ''
  const availability = params.get('availability') ?? ''
  const rx = params.get('rx') ?? ''
  const sort = params.get('sort') ?? 'relevance'

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
    setPage(1)
  }

  const filtered = useMemo(() => {
    let list = medicines.filter((m) => {
      if (query) {
        const q = query.toLowerCase()
        const hay = `${m.name} ${m.composition} ${m.manufacturer} ${m.sku}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (category && m.category !== category) return false
      if (manufacturer && m.manufacturer !== manufacturer) return false
      if (availability && m.stockStatus !== availability) return false
      if (rx === 'yes' && !m.prescriptionRequired) return false
      if (rx === 'no' && m.prescriptionRequired) return false
      return true
    })

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.wholesalePrice - b.wholesalePrice)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.wholesalePrice - a.wholesalePrice)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))

    return list
  }, [query, category, manufacturer, availability, rx, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const activeFilterCount = [category, manufacturer, availability, rx].filter(Boolean).length

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Medicine Catalog"
        subtitle={`${filtered.length} products found`}
        actions={
          <Select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="w-44">
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </Select>
        }
      />

      <div className="mb-4 flex items-center gap-3 lg:hidden">
        <Input
          placeholder="Search medicines, brands, salts…"
          defaultValue={query}
          onChange={(e) => updateParam('q', e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="md" onClick={() => setShowFilters((s) => !s)}>
          <SlidersHorizontal className="h-4 w-4" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="space-y-5 rounded-[6px] border border-navy-100 bg-white p-4">
            <div className="hidden lg:block">
              <Input
                placeholder="Search medicines, brands, salts…"
                defaultValue={query}
                onChange={(e) => updateParam('q', e.target.value)}
              />
            </div>

            <FilterGroup label="Category">
              <Select value={category} onChange={(e) => updateParam('category', e.target.value)}>
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup label="Manufacturer">
              <Select value={manufacturer} onChange={(e) => updateParam('manufacturer', e.target.value)}>
                <option value="">All manufacturers</option>
                {manufacturers.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </FilterGroup>

            <FilterGroup label="Availability">
              <Select value={availability} onChange={(e) => updateParam('availability', e.target.value)}>
                <option value="">Any availability</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </Select>
            </FilterGroup>

            <FilterGroup label="Prescription">
              <Select value={rx} onChange={(e) => updateParam('rx', e.target.value)}>
                <option value="">All products</option>
                <option value="yes">Prescription required</option>
                <option value="no">No prescription needed</option>
              </Select>
            </FilterGroup>

            {activeFilterCount > 0 && (
              <button
                onClick={() => setParams(new URLSearchParams(query ? { q: query } : {}))}
                className="flex items-center gap-1 text-xs font-medium text-teal-700 hover:text-teal-600"
              >
                <X className="h-3.5 w-3.5" /> Clear filters
              </button>
            )}
          </div>
        </aside>

        <div>
          {pageItems.length === 0 ? (
            <EmptyState
              icon={<SlidersHorizontal className="h-8 w-8" />}
              title="No medicines found"
              message="Try adjusting your search or filters."
              actionLabel="Clear filters"
              onAction={() => setParams(new URLSearchParams())}
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {pageItems.map((m) => (
                  <ProductCard key={m.id} medicine={m} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-navy-500">{label}</p>
      {children}
    </div>
  )
}
