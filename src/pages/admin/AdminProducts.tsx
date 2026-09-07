import { useEffect, useMemo, useState } from 'react'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { StatusBadge, stockLabel, stockTone } from '@/components/ui/StatusBadge'
import { Pagination } from '@/components/ui/Pagination'
import { medicines as initialMedicines, categories } from '@/data/medicines'
import type { Medicine } from '@/types'
import { formatINR } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

const PAGE_SIZE = 10

export default function AdminProducts() {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<Medicine | null>(null)
  const [deleting, setDeleting] = useState<Medicine | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { push } = useToast()

  const filtered = useMemo(() => {
    return medicines.filter((m) => {
      if (query && !`${m.name} ${m.sku} ${m.manufacturer}`.toLowerCase().includes(query.toLowerCase())) return false
      if (category && m.category !== category) return false
      return true
    })
  }, [medicines, query, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function openNew() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(m: Medicine) {
    setEditing(m)
    setModalOpen(true)
  }

  function saveProduct(data: Partial<Medicine>) {
    if (editing) {
      setMedicines((prev) => prev.map((m) => (m.id === editing.id ? { ...m, ...data } : m)))
      push('Product updated')
    } else {
      const id = `med-new-${Date.now()}`
      setMedicines((prev) => [
        {
          id,
          name: data.name ?? 'New Medicine',
          composition: data.composition ?? '',
          manufacturer: data.manufacturer ?? '',
          category: data.category ?? 'OTC Products',
          dosageForm: data.dosageForm ?? 'Tablet',
          packSize: data.packSize ?? '',
          mrp: data.mrp ?? 0,
          wholesalePrice: data.wholesalePrice ?? 0,
          discountPercent: data.discountPercent ?? 0,
          stockQuantity: data.stockQuantity ?? 0,
          stockStatus: (data.stockQuantity ?? 0) > 20 ? 'in-stock' : (data.stockQuantity ?? 0) > 0 ? 'low-stock' : 'out-of-stock',
          minOrderQty: data.minOrderQty ?? 5,
          prescriptionRequired: data.prescriptionRequired ?? false,
          sku: `TM-NEW-${prev.length + 1}`,
          batch: { batchNumber: 'B0000', manufacturingDate: '2026-01-01', expiryDate: '2028-01-01', quantity: data.stockQuantity ?? 0 },
          expiryStatus: 'ok',
          description: data.description ?? '',
        },
        ...prev,
      ])
      push('Product added')
    }
    setModalOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle={`${filtered.length} products`}
        actions={
          <Button size="sm" onClick={openNew}>
            <Plus className="h-3.5 w-3.5" /> Add Product
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search by name, SKU or manufacturer…"
            className="h-10 w-full rounded-[4px] border border-navy-100 bg-white pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
          />
        </div>
        <Select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }} className="sm:w-56">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </Select>
      </div>

      <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              <th className="px-5 py-2.5">SKU</th>
              <th className="px-5 py-2.5">Product</th>
              <th className="px-5 py-2.5">Category</th>
              <th className="px-5 py-2.5">MRP</th>
              <th className="px-5 py-2.5">Wholesale</th>
              <th className="px-5 py-2.5">Stock</th>
              <th className="px-5 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {paged.map((m) => (
              <tr key={m.id} className="border-b border-navy-100 last:border-0">
                <td className="px-5 py-3 font-mono text-[13px] text-navy-700">{m.sku}</td>
                <td className="px-5 py-3">
                  <p className="font-medium text-navy-950">{m.name}</p>
                  <p className="text-xs text-navy-500">{m.manufacturer}</p>
                </td>
                <td className="px-5 py-3 text-navy-700">{m.category}</td>
                <td className="px-5 py-3 font-mono text-navy-700">{formatINR(m.mrp)}</td>
                <td className="px-5 py-3 font-mono text-navy-950">{formatINR(m.wholesalePrice)}</td>
                <td className="px-5 py-3"><StatusBadge label={stockLabel(m.stockStatus)} tone={stockTone(m.stockStatus)} /></td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(m)} className="text-navy-500 hover:text-teal-700" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => setDeleting(m)} className="text-navy-500 hover:text-red-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <ProductFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={saveProduct} medicine={editing} />

      <ConfirmDialog
        open={!!deleting}
        title="Delete product"
        message={`Remove "${deleting?.name}" from the catalog? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          setMedicines((prev) => prev.filter((m) => m.id !== deleting!.id))
          push('Product deleted')
          setDeleting(null)
        }}
      />
    </div>
  )
}

function ProductFormModal({
  open,
  onClose,
  onSave,
  medicine,
}: {
  open: boolean
  onClose: () => void
  onSave: (data: Partial<Medicine>) => void
  medicine: Medicine | null
}) {
  const [form, setForm] = useState<Partial<Medicine>>(medicine ?? {})

  useEffect(() => {
    if (open) setForm(medicine ?? {})
  }, [open, medicine])

  return (
    <Modal open={open} onClose={onClose} title={medicine ? 'Edit Product' : 'Add Product'} widthClass="max-w-xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" defaultValue={medicine?.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        <Input label="Manufacturer" defaultValue={medicine?.manufacturer} onChange={(e) => setForm((f) => ({ ...f, manufacturer: e.target.value }))} />
        <Input label="Composition" defaultValue={medicine?.composition} onChange={(e) => setForm((f) => ({ ...f, composition: e.target.value }))} />
        <Input label="Pack Size" defaultValue={medicine?.packSize} onChange={(e) => setForm((f) => ({ ...f, packSize: e.target.value }))} />
        <Select label="Category" defaultValue={medicine?.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Medicine['category'] }))}>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </Select>
        <Input label="MRP" type="number" defaultValue={medicine?.mrp} onChange={(e) => setForm((f) => ({ ...f, mrp: Number(e.target.value) }))} />
        <Input label="Wholesale Price" type="number" defaultValue={medicine?.wholesalePrice} onChange={(e) => setForm((f) => ({ ...f, wholesalePrice: Number(e.target.value) }))} />
        <Input label="Stock Quantity" type="number" defaultValue={medicine?.stockQuantity} onChange={(e) => setForm((f) => ({ ...f, stockQuantity: Number(e.target.value) }))} />
        <Input label="Min Order Qty" type="number" defaultValue={medicine?.minOrderQty} onChange={(e) => setForm((f) => ({ ...f, minOrderQty: Number(e.target.value) }))} />
      </div>
      <Button className="mt-5 w-full" onClick={() => onSave(form)}>
        {medicine ? 'Save Changes' : 'Add Product'}
      </Button>
    </Modal>
  )
}
