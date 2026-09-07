import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Banknote, Building2, Check, CreditCard, Landmark, MapPin, PackageCheck } from 'lucide-react'
import { useCart } from '@/features/cart/CartContext'
import { useAuth } from '@/features/auth/AuthContext'
import { getMedicineById } from '@/data/medicines'
import { addresses as savedAddresses } from '@/data/orders'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { formatINR, cn } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'

const steps = ['Business Info', 'Delivery Address', 'Review', 'Payment']

const paymentOptions = [
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
  { id: 'online', label: 'Online Payment', icon: CreditCard },
  { id: 'credit', label: 'Wholesale Credit', icon: Building2 },
  { id: 'bank', label: 'Bank Transfer', icon: Landmark },
]

export default function Checkout() {
  const [step, setStep] = useState(0)
  const [addressId, setAddressId] = useState(savedAddresses[0]?.id)
  const [payment, setPayment] = useState('cod')
  const [placed, setPlaced] = useState(false)
  const { lines, subtotal, clear } = useCart()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const { push } = useToast()

  const discount = Math.round(subtotal * 0.02)
  const tax = Math.round((subtotal - discount) * 0.05)
  const delivery = subtotal > 5000 ? 0 : 150
  const grandTotal = subtotal - discount + tax + delivery

  if (lines.length === 0 && !placed) {
    navigate('/cart')
    return null
  }

  function placeOrder() {
    setPlaced(true)
    clear()
    push('Order placed successfully')
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-navy-950">Order confirmed</h1>
        <p className="mt-1 text-sm text-navy-500">
          Order #TM-{Math.floor(10000 + Math.random() * 9999)} has been placed and is being processed.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => navigate('/dashboard/orders')}>View Orders</Button>
          <Button variant="outline" onClick={() => navigate('/medicines')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-semibold',
                  i < step ? 'bg-teal-600 text-white' : i === step ? 'bg-navy-950 text-white' : 'bg-navy-100 text-navy-500',
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn('text-xs', i === step ? 'font-medium text-navy-950' : 'text-navy-500')}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={cn('mx-2 h-px flex-1', i < step ? 'bg-teal-600' : 'bg-navy-100')} />}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-[6px] border border-navy-100 bg-white p-5">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-[15px] font-semibold text-navy-950">Business Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Medical Store Name" defaultValue={profile?.storeName} />
                <Input label="Owner Name" defaultValue={profile?.ownerName} />
                <Input label="GST Number" defaultValue={profile?.gstNumber} />
                <Input label="Drug License Number" defaultValue={profile?.drugLicenseNumber} />
                <Input label="Phone" defaultValue={profile?.phone} />
                <Input label="Email" defaultValue={profile?.email} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="mb-4 text-[15px] font-semibold text-navy-950">Delivery Address</h2>
              <div className="space-y-2">
                {savedAddresses.map((a) => (
                  <label
                    key={a.id}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-[4px] border p-3',
                      addressId === a.id ? 'border-teal-500 bg-teal-50/40' : 'border-navy-100',
                    )}
                  >
                    <input
                      type="radio"
                      className="mt-1"
                      checked={addressId === a.id}
                      onChange={() => setAddressId(a.id)}
                    />
                    <MapPin className="mt-0.5 h-4 w-4 text-navy-500" />
                    <div className="text-sm">
                      <p className="font-medium text-navy-950">{a.label}</p>
                      <p className="text-navy-500">{a.line1}, {a.city}, {a.state} - {a.pincode}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-4 text-[15px] font-semibold text-navy-950">Order Review</h2>
              <div className="divide-y divide-navy-100">
                {lines.map((l) => {
                  const m = getMedicineById(l.medicineId)
                  if (!m) return null
                  return (
                    <div key={l.medicineId} className="flex items-center justify-between py-2.5 text-sm">
                      <div>
                        <p className="font-medium text-navy-950">{m.name}</p>
                        <p className="text-xs text-navy-500">Qty {l.quantity} × {formatINR(m.wholesalePrice)}</p>
                      </div>
                      <span className="font-mono text-navy-950">{formatINR(m.wholesalePrice * l.quantity)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="mb-4 text-[15px] font-semibold text-navy-950">Payment Method</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {paymentOptions.map((p) => (
                  <label
                    key={p.id}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-[4px] border p-3',
                      payment === p.id ? 'border-teal-500 bg-teal-50/40' : 'border-navy-100',
                    )}
                  >
                    <input type="radio" checked={payment === p.id} onChange={() => setPayment(p.id)} />
                    <p.icon className="h-4 w-4 text-navy-600" />
                    <span className="text-sm font-medium text-navy-950">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between border-t border-navy-100 pt-5">
            <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
            ) : (
              <Button onClick={placeOrder}>
                <PackageCheck className="h-4 w-4" /> Place Order
              </Button>
            )}
          </div>
        </div>

        <div className="h-fit rounded-[6px] border border-navy-100 bg-white p-5">
          <h3 className="mb-3 text-[15px] font-semibold text-navy-950">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-navy-500"><span>Subtotal</span><span className="font-mono text-navy-900">{formatINR(subtotal)}</span></div>
            <div className="flex justify-between text-navy-500"><span>Discount</span><span className="font-mono text-green-600">- {formatINR(discount)}</span></div>
            <div className="flex justify-between text-navy-500"><span>Tax</span><span className="font-mono text-navy-900">{formatINR(tax)}</span></div>
            <div className="flex justify-between text-navy-500"><span>Delivery</span><span className="font-mono text-navy-900">{delivery === 0 ? 'Free' : formatINR(delivery)}</span></div>
          </div>
          <div className="mt-3 flex justify-between border-t border-navy-100 pt-3">
            <span className="font-semibold text-navy-950">Total</span>
            <span className="font-mono text-lg font-semibold text-navy-950">{formatINR(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
