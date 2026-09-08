import { useMemo, useState } from 'react'
import { Search, Plus, Minus, Trash2, Receipt, Printer, History } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusBadge, stockLabel, stockTone } from '@/components/ui/StatusBadge'
import { useInventory } from '@/features/inventory/InventoryContext'
import { useBilling } from '@/features/billing/BillingContext'
import type { Bill, BillItem, PaymentMode } from '@/types'
import { formatDate, formatINR } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

interface DraftLine {
  medicineId: string
  quantity: number
}

const TAX_PERCENT = 5

export default function AdminBilling() {
  const { medicines, decrementStockForBill } = useInventory()
  const { bills, addBill, nextBillNumber } = useBilling()
  const { push } = useToast()

  const [tab, setTab] = useState<'new' | 'history'>('new')
  const [query, setQuery] = useState('')
  const [lines, setLines] = useState<DraftLine[]>([])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('Cash')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [lastBill, setLastBill] = useState<Bill | null>(null)
  const [invoiceOpen, setInvoiceOpen] = useState(false)

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return medicines
      .filter((m) => m.stockQuantity > 0 && `${m.name} ${m.sku} ${m.composition}`.toLowerCase().includes(q))
      .slice(0, 8)
  }, [query, medicines])

  function addLine(medicineId: string) {
    setLines((prev) => {
      const existing = prev.find((l) => l.medicineId === medicineId)
      if (existing) return prev.map((l) => (l.medicineId === medicineId ? { ...l, quantity: l.quantity + 1 } : l))
      return [...prev, { medicineId, quantity: 1 }]
    })
    setQuery('')
  }

  function setQty(medicineId: string, quantity: number) {
    const medicine = medicines.find((m) => m.id === medicineId)
    const max = medicine?.stockQuantity ?? 0
    const clamped = Math.max(1, Math.min(max, quantity))
    setLines((prev) => prev.map((l) => (l.medicineId === medicineId ? { ...l, quantity: clamped } : l)))
  }

  function removeLine(medicineId: string) {
    setLines((prev) => prev.filter((l) => l.medicineId !== medicineId))
  }

  const billItems: BillItem[] = lines
    .map((l) => {
      const m = medicines.find((x) => x.id === l.medicineId)
      if (!m) return null
      return {
        medicineId: m.id,
        name: m.name,
        packSize: m.packSize,
        quantity: l.quantity,
        unitPrice: m.wholesalePrice,
        total: Math.round(m.wholesalePrice * l.quantity),
      }
    })
    .filter(Boolean) as BillItem[]

  const subtotal = billItems.reduce((s, i) => s + i.total, 0)
  const discount = Math.round((subtotal * discountPercent) / 100)
  const tax = Math.round(((subtotal - discount) * TAX_PERCENT) / 100)
  const grandTotal = subtotal - discount + tax

  function resetDraft() {
    setLines([])
    setCustomerName('')
    setCustomerPhone('')
    setDiscountPercent(0)
    setPaymentMode('Cash')
  }

  function generateBill() {
    if (billItems.length === 0) {
      push('Add at least one medicine to the bill', 'error')
      return
    }
    const ok = decrementStockForBill(lines)
    if (!ok) {
      push('One or more items exceed available stock', 'error')
      return
    }
    const bill: Bill = {
      id: `bill-${Date.now()}`,
      billNumber: nextBillNumber(),
      date: new Date().toISOString(),
      customerName: customerName.trim() || 'Walk-in Customer',
      customerPhone: customerPhone.trim(),
      items: billItems,
      subtotal,
      discount,
      tax,
      grandTotal,
      paymentMode,
    }
    addBill(bill)
    setLastBill(bill)
    setInvoiceOpen(true)
    resetDraft()
    push('Bill generated and stock updated')
  }

  return (
    <div>
      <PageHeader
        title="Billing"
        subtitle="Create a bill against current stock — stock updates automatically"
        actions={
          <div className="flex overflow-hidden rounded-[4px] border border-navy-100">
            <button
              onClick={() => setTab('new')}
              className={`px-3 py-1.5 text-sm font-medium ${tab === 'new' ? 'bg-navy-900 text-white' : 'bg-white text-navy-700'}`}
            >
              New Bill
            </button>
            <button
              onClick={() => setTab('history')}
              className={`px-3 py-1.5 text-sm font-medium ${tab === 'history' ? 'bg-navy-900 text-white' : 'bg-white text-navy-700'}`}
            >
              History ({bills.length})
            </button>
          </div>
        }
      />

      {tab === 'new' ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          {/* Left: search + line items */}
          <div className="rounded-[6px] border border-navy-100 bg-white p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medicine to add to bill…"
                className="h-10 w-full rounded-[4px] border border-navy-100 bg-white pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-[4px] border border-navy-100 bg-white shadow-lg">
                  {searchResults.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => addLine(m.id)}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-navy-50"
                    >
                      <span>
                        <span className="font-medium text-navy-950">{m.name}</span>
                        <span className="ml-2 text-xs text-navy-500">{m.packSize}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs text-navy-500">{m.stockQuantity} in stock</span>
                        <span className="font-mono text-sm text-navy-950">{formatINR(m.wholesalePrice)}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4">
              {billItems.length === 0 ? (
                <EmptyState
                  icon={<Receipt className="h-8 w-8" />}
                  title="Bill is empty"
                  message="Search and add medicines above to start a bill."
                />
              ) : (
                <div className="divide-y divide-navy-100">
                  {billItems.map((item) => {
                    const stock = medicines.find((m) => m.id === item.medicineId)?.stockQuantity ?? 0
                    return (
                      <div key={item.medicineId} className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-navy-950">{item.name}</p>
                          <p className="text-xs text-navy-500">{item.packSize} · {formatINR(item.unitPrice)} each · {stock} in stock</p>
                        </div>
                        <div className="flex h-8 items-stretch overflow-hidden rounded-[4px] border border-navy-100">
                          <button onClick={() => setQty(item.medicineId, item.quantity - 1)} className="flex w-7 items-center justify-center text-navy-700 hover:bg-navy-50">
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => setQty(item.medicineId, Number(e.target.value) || 1)}
                            className="w-10 border-x border-navy-100 text-center text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button onClick={() => setQty(item.medicineId, item.quantity + 1)} className="flex w-7 items-center justify-center text-navy-700 hover:bg-navy-50">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="w-20 shrink-0 text-right font-mono text-sm font-medium text-navy-950">{formatINR(item.total)}</span>
                        <button onClick={() => removeLine(item.medicineId)} className="text-navy-400 hover:text-red-600" aria-label="Remove">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: customer + summary */}
          <div className="flex h-fit flex-col gap-4 rounded-[6px] border border-navy-100 bg-white p-4">
            <div>
              <p className="mb-3 text-sm font-semibold text-navy-950">Customer Details</p>
              <div className="space-y-3">
                <Input label="Name" placeholder="Walk-in Customer" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                <Input label="Phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                <Select label="Payment Mode" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value as PaymentMode)}>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Credit">Credit</option>
                </Select>
                <Input
                  label="Extra Discount (%)"
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                />
              </div>
            </div>

            <div className="space-y-1.5 border-t border-navy-100 pt-4 text-sm">
              <div className="flex justify-between text-navy-500"><span>Subtotal</span><span className="font-mono text-navy-900">{formatINR(subtotal)}</span></div>
              <div className="flex justify-between text-navy-500"><span>Discount ({discountPercent}%)</span><span className="font-mono text-green-600">- {formatINR(discount)}</span></div>
              <div className="flex justify-between text-navy-500"><span>Tax ({TAX_PERCENT}%)</span><span className="font-mono text-navy-900">{formatINR(tax)}</span></div>
              <div className="flex justify-between border-t border-navy-100 pt-2 text-[15px] font-semibold text-navy-950">
                <span>Total</span><span className="font-mono">{formatINR(grandTotal)}</span>
              </div>
            </div>

            <Button className="w-full" onClick={generateBill}>
              <Receipt className="h-4 w-4" /> Generate Bill
            </Button>
          </div>
        </div>
      ) : (
        <BillingHistory bills={bills} onView={(b) => { setLastBill(b); setInvoiceOpen(true) }} />
      )}

      <InvoiceModal open={invoiceOpen} onClose={() => setInvoiceOpen(false)} bill={lastBill} />
    </div>
  )
}

function BillingHistory({ bills, onView }: { bills: Bill[]; onView: (b: Bill) => void }) {
  if (bills.length === 0) {
    return (
      <EmptyState icon={<History className="h-8 w-8" />} title="No bills yet" message="Bills you generate will show up here." />
    )
  }
  return (
    <div className="overflow-x-auto rounded-[6px] border border-navy-100 bg-white">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
            <th className="px-5 py-2.5">Invoice</th>
            <th className="px-5 py-2.5">Date</th>
            <th className="px-5 py-2.5">Customer</th>
            <th className="px-5 py-2.5">Items</th>
            <th className="px-5 py-2.5">Payment</th>
            <th className="px-5 py-2.5">Amount</th>
            <th className="px-5 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {bills.map((b) => (
            <tr key={b.id} className="border-b border-navy-100 last:border-0">
              <td className="px-5 py-3 font-mono text-[13px] text-navy-950">{b.billNumber}</td>
              <td className="px-5 py-3 text-navy-700">{formatDate(b.date)}</td>
              <td className="px-5 py-3 text-navy-700">{b.customerName}</td>
              <td className="px-5 py-3 text-navy-700">{b.items.length} items</td>
              <td className="px-5 py-3 text-navy-700">{b.paymentMode}</td>
              <td className="px-5 py-3 font-mono text-navy-950">{formatINR(b.grandTotal)}</td>
              <td className="px-5 py-3">
                <button onClick={() => onView(b)} className="text-teal-700 hover:text-teal-600">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function InvoiceModal({ open, onClose, bill }: { open: boolean; onClose: () => void; bill: Bill | null }) {
  if (!bill) return null
  return (
    <Modal open={open} onClose={onClose} title={`Invoice ${bill.billNumber}`} widthClass="max-w-md">
      <div id="invoice-print" className="text-sm">
        <div className="flex items-center justify-between border-b border-dashed border-navy-200 pb-3">
          <div>
            <p className="font-semibold text-navy-950">THOCK MEDICINE</p>
            <p className="text-xs text-navy-500">Raipur, Chhattisgarh</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-navy-500">{bill.billNumber}</p>
            <p className="text-xs text-navy-500">{formatDate(bill.date)}</p>
          </div>
        </div>
        <div className="border-b border-dashed border-navy-200 py-3">
          <p className="text-navy-800">{bill.customerName}</p>
          {bill.customerPhone && <p className="text-xs text-navy-500">{bill.customerPhone}</p>}
        </div>
        <div className="divide-y divide-dashed divide-navy-200 py-2">
          {bill.items.map((it) => (
            <div key={it.medicineId} className="flex items-center justify-between py-1.5">
              <div>
                <p className="text-navy-900">{it.name}</p>
                <p className="text-xs text-navy-500">{it.packSize} · {it.quantity} × {formatINR(it.unitPrice)}</p>
              </div>
              <span className="font-mono text-navy-950">{formatINR(it.total)}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1 border-t border-dashed border-navy-200 pt-3">
          <div className="flex justify-between text-navy-500"><span>Subtotal</span><span className="font-mono text-navy-900">{formatINR(bill.subtotal)}</span></div>
          <div className="flex justify-between text-navy-500"><span>Discount</span><span className="font-mono text-green-600">- {formatINR(bill.discount)}</span></div>
          <div className="flex justify-between text-navy-500"><span>Tax</span><span className="font-mono text-navy-900">{formatINR(bill.tax)}</span></div>
          <div className="flex justify-between border-t border-navy-100 pt-2 text-[15px] font-semibold text-navy-950">
            <span>Total ({bill.paymentMode})</span><span className="font-mono">{formatINR(bill.grandTotal)}</span>
          </div>
        </div>
      </div>
      <Button variant="outline" className="mt-4 w-full" onClick={() => window.print()}>
        <Printer className="h-3.5 w-3.5" /> Print Invoice
      </Button>
    </Modal>
  )
}
