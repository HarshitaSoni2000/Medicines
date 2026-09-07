import { Link, useNavigate, useParams } from 'react-router-dom'
import { Download, LifeBuoy, RotateCcw, Check } from 'lucide-react'
import { orders } from '@/data/orders'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge, orderTone } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatDate, formatINR, cn } from '@/lib/utils'
import { useCart } from '@/features/cart/CartContext'
import { useToast } from '@/components/ui/Toast'

const timelineStages = ['Order Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered']

function stageIndex(status: string) {
  if (status === 'Cancelled') return -1
  if (status === 'Pending') return 0
  return timelineStages.indexOf(status === 'Confirmed' ? 'Confirmed' : status)
}

export default function OrderDetail() {
  const { id } = useParams()
  const order = orders.find((o) => o.id === id)
  const navigate = useNavigate()
  const { addLine } = useCart()
  const { push } = useToast()

  if (!order) {
    return (
      <EmptyState
        icon={<Download className="h-8 w-8" />}
        title="Order not found"
        message="This order may not exist."
        actionLabel="Back to orders"
        onAction={() => navigate('/dashboard/orders')}
      />
    )
  }

  const current = stageIndex(order.status)

  function reorder() {
    order!.items.forEach((i) => addLine(i.medicineId, i.quantity))
    push('Items added to cart from this order')
    navigate('/cart')
  }

  return (
    <div>
      <PageHeader
        title={`Order ${order.id}`}
        subtitle={`Placed on ${formatDate(order.date)}`}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={reorder}>
              <RotateCcw className="h-3.5 w-3.5" /> Reorder
            </Button>
            <Button variant="outline" size="sm" onClick={() => push('Invoice downloaded')}>
              <Download className="h-3.5 w-3.5" /> Download Invoice
            </Button>
            <Link to="/dashboard/support">
              <Button variant="outline" size="sm">
                <LifeBuoy className="h-3.5 w-3.5" /> Contact Support
              </Button>
            </Link>
          </>
        }
      />

      <div className="rounded-[6px] border border-navy-100 bg-white p-5">
        <div className="mb-6 flex items-center justify-between">
          <StatusBadge label={order.status} tone={orderTone(order.status)} />
          <span className="text-sm text-navy-500">Delivering to {order.deliveryAddress.label}</span>
        </div>

        {order.status !== 'Cancelled' ? (
          <div className="mb-8 flex items-center">
            {timelineStages.map((stage, i) => (
              <div key={stage} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                      i <= current ? 'bg-teal-600 text-white' : 'bg-navy-100 text-navy-500',
                    )}
                  >
                    {i <= current ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span className={cn('text-[11px]', i <= current ? 'font-medium text-navy-950' : 'text-navy-500')}>
                    {stage}
                  </span>
                </div>
                {i < timelineStages.length - 1 && (
                  <div className={cn('mx-1.5 h-px flex-1', i < current ? 'bg-teal-600' : 'bg-navy-100')} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-6 text-sm text-red-600">This order was cancelled.</p>
        )}

        <div className="divide-y divide-navy-100 border-t border-navy-100">
          {order.items.map((item) => (
            <div key={item.medicineId} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium text-navy-950">{item.name}</p>
                <p className="text-xs text-navy-500">{item.packSize} · Qty {item.quantity} × {formatINR(item.unitPrice)}</p>
              </div>
              <span className="font-mono text-navy-950">{formatINR(item.total)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1.5 border-t border-navy-100 pt-4 text-sm">
          <div className="flex justify-between text-navy-500"><span>Subtotal</span><span className="font-mono text-navy-900">{formatINR(order.subtotal)}</span></div>
          <div className="flex justify-between text-navy-500"><span>Discount</span><span className="font-mono text-green-600">- {formatINR(order.discount)}</span></div>
          <div className="flex justify-between text-navy-500"><span>Tax</span><span className="font-mono text-navy-900">{formatINR(order.tax)}</span></div>
          <div className="flex justify-between text-navy-500"><span>Delivery</span><span className="font-mono text-navy-900">{order.deliveryCharge === 0 ? 'Free' : formatINR(order.deliveryCharge)}</span></div>
          <div className="flex justify-between border-t border-navy-100 pt-2 text-[15px] font-semibold text-navy-950">
            <span>Total</span><span className="font-mono">{formatINR(order.grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
