import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Trash2, Zap } from 'lucide-react'
import { medicines, frequentlyOrderedIds } from '@/data/medicines'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { StatusBadge, stockLabel, stockTone } from '@/components/ui/StatusBadge'
import { formatINR } from '@/lib/utils'
import { useCart } from '@/features/cart/CartContext'
import { useToast } from '@/components/ui/Toast'

interface Row {
  rowId: number
  medicineId: string | null
  quantity: number
  search: string
}

let rowSeq = 1

export default function QuickOrder() {
  const [rows, setRows] = useState<Row[]>(() => [
    { rowId: rowSeq++, medicineId: null, quantity: 10, search: '' },
    { rowId: rowSeq++, medicineId: null, quantity: 10, search: '' },
    { rowId: rowSeq++, medicineId: null, quantity: 10, search: '' },
  ])
  const { addLine } = useCart()
  const { push } = useToast()
  const navigate = useNavigate()

  function addRow() {
    setRows((r) => [...r, { rowId: rowSeq++, medicineId: null, quantity: 10, search: '' }])
  }

  function removeRow(rowId: number) {
    setRows((r) => r.filter((row) => row.rowId !== rowId))
  }

  function updateRow(rowId: number, patch: Partial<Row>) {
    setRows((r) => r.map((row) => (row.rowId === rowId ? { ...row, ...patch } : row)))
  }

  function addFrequent(medicineId: string) {
    const empty = rows.find((r) => !r.medicineId)
    const m = medicines.find((x) => x.id === medicineId)!
    if (empty) {
      updateRow(empty.rowId, { medicineId, quantity: m.minOrderQty })
    } else {
      setRows((r) => [...r, { rowId: rowSeq++, medicineId, quantity: m.minOrderQty, search: '' }])
    }
  }

  const validRows = rows.filter((r) => r.medicineId)
  const total = useMemo(
    () =>
      validRows.reduce((s, r) => {
        const m = medicines.find((x) => x.id === r.medicineId)
        return s + (m ? m.wholesalePrice * r.quantity : 0)
      }, 0),
    [validRows],
  )

  function addAllToCart() {
    if (validRows.length === 0) {
      push('Add at least one medicine first', 'error')
      return
    }
    validRows.forEach((r) => addLine(r.medicineId!, r.quantity))
    push(`${validRows.length} medicines added to cart`)
    navigate('/cart')
  }

  function clearOrder() {
    setRows([{ rowId: rowSeq++, medicineId: null, quantity: 10, search: '' }])
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Quick Order"
        subtitle="Search and add many medicines at once — built for regular bulk buyers"
        actions={
          <Button variant="outline" size="sm" onClick={clearOrder}>
            <Trash2 className="h-3.5 w-3.5" /> Clear Order
          </Button>
        }
      />

      <div className="mb-6 rounded-[6px] border border-navy-100 bg-white p-4">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-500">
          <Zap className="h-3.5 w-3.5 text-teal-600" /> Frequently ordered
        </p>
        <div className="flex flex-wrap gap-2">
          {frequentlyOrderedIds.map((id) => {
            const m = medicines.find((x) => x.id === id)
            if (!m) return null
            return (
              <button
                key={id}
                onClick={() => addFrequent(id)}
                className="flex items-center gap-1.5 rounded-[4px] border border-navy-100 px-3 py-1.5 text-xs font-medium text-navy-700 hover:border-teal-300 hover:text-teal-700"
              >
                <Plus className="h-3 w-3" /> {m.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-navy-100 bg-navy-50/50 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
              <th className="px-4 py-2.5">Medicine</th>
              <th className="px-4 py-2.5">Manufacturer</th>
              <th className="px-4 py-2.5">Pack</th>
              <th className="px-4 py-2.5">Price</th>
              <th className="px-4 py-2.5">Stock</th>
              <th className="px-4 py-2.5">Quantity</th>
              <th className="px-4 py-2.5">Total</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <QuickOrderRow
                key={row.rowId}
                row={row}
                onUpdate={(patch) => updateRow(row.rowId, patch)}
                onRemove={() => removeRow(row.rowId)}
                canRemove={rows.length > 1}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        className="mt-3 flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-600"
      >
        <Plus className="h-4 w-4" /> Add Another Medicine
      </button>

      <div className="mt-6 flex flex-col items-end gap-3 border-t border-navy-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-navy-500">
          {validRows.length} medicines · {validRows.reduce((s, r) => s + r.quantity, 0)} units
        </p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xl font-semibold text-navy-950">{formatINR(total)}</span>
          <Button size="lg" onClick={addAllToCart}>
            Add All to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

function QuickOrderRow({
  row,
  onUpdate,
  onRemove,
  canRemove,
}: {
  row: Row
  onUpdate: (patch: Partial<Row>) => void
  onRemove: () => void
  canRemove: boolean
}) {
  const medicine = row.medicineId ? medicines.find((m) => m.id === row.medicineId) : undefined
  const [focused, setFocused] = useState(false)

  const suggestions = useMemo(() => {
    if (!row.search || row.search.length < 2) return []
    const q = row.search.toLowerCase()
    return medicines
      .filter((m) => m.name.toLowerCase().includes(q) || m.composition.toLowerCase().includes(q))
      .slice(0, 6)
  }, [row.search])

  return (
    <tr className="border-b border-navy-100 last:border-0">
      <td className="relative px-4 py-2.5">
        {medicine ? (
          <button
            onClick={() => onUpdate({ medicineId: null, search: '' })}
            className="text-left text-[13px] font-medium text-navy-950 hover:text-teal-700"
          >
            {medicine.name}
          </button>
        ) : (
          <div className="relative w-56">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navy-400" />
            <input
              value={row.search}
              onChange={(e) => onUpdate({ search: e.target.value })}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search medicine…"
              className="h-8 w-full rounded-[4px] border border-navy-100 bg-white pl-8 pr-2 text-[13px] focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
            {focused && suggestions.length > 0 && (
              <div className="absolute left-0 top-9 z-10 w-72 rounded-[4px] border border-navy-100 bg-white shadow-lg">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onMouseDown={() => onUpdate({ medicineId: s.id, quantity: s.minOrderQty, search: '' })}
                    className="flex w-full flex-col items-start px-3 py-2 text-left hover:bg-navy-50"
                  >
                    <span className="text-[13px] font-medium text-navy-950">{s.name}</span>
                    <span className="text-xs text-navy-500">{s.composition}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </td>
      <td className="px-4 py-2.5 text-[13px] text-navy-700">{medicine?.manufacturer ?? '—'}</td>
      <td className="px-4 py-2.5 text-[13px] text-navy-700">{medicine?.packSize ?? '—'}</td>
      <td className="px-4 py-2.5 font-mono text-[13px] text-navy-950">
        {medicine ? formatINR(medicine.wholesalePrice) : '—'}
      </td>
      <td className="px-4 py-2.5">
        {medicine ? (
          <StatusBadge label={stockLabel(medicine.stockStatus)} tone={stockTone(medicine.stockStatus)} />
        ) : (
          '—'
        )}
      </td>
      <td className="px-4 py-2.5">
        {medicine ? (
          <QuantitySelector
            value={row.quantity}
            onChange={(q) => onUpdate({ quantity: q })}
            min={medicine.minOrderQty}
            max={medicine.stockQuantity || medicine.minOrderQty}
            size="sm"
          />
        ) : (
          '—'
        )}
      </td>
      <td className="px-4 py-2.5 font-mono text-[13px] font-medium text-navy-950">
        {medicine ? formatINR(medicine.wholesalePrice * row.quantity) : '—'}
      </td>
      <td className="px-4 py-2.5">
        {canRemove && (
          <button onClick={onRemove} className="text-navy-400 hover:text-red-600" aria-label="Remove row">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </td>
    </tr>
  )
}
