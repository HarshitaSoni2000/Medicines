import type { Address, NotificationItem, Order, SupportTicket } from '@/types'
import { medicines } from './medicines'

export const addresses: Address[] = [
  {
    id: 'addr-1',
    label: 'Main Store',
    line1: 'Shop 12, Gandhi Market Road',
    city: 'Raipur',
    state: 'Chhattisgarh',
    pincode: '492001',
  },
  {
    id: 'addr-2',
    label: 'Warehouse',
    line1: 'Plot 4, Industrial Area Phase II',
    city: 'Raipur',
    state: 'Chhattisgarh',
    pincode: '492013',
  },
]

function lineFor(id: string, qty: number) {
  const m = medicines.find((x) => x.id === id)!
  const total = Math.round(m.wholesalePrice * qty)
  return {
    medicineId: m.id,
    name: m.name,
    packSize: m.packSize,
    quantity: qty,
    unitPrice: m.wholesalePrice,
    discountPercent: m.discountPercent,
    total,
  }
}

function buildOrder(
  id: string,
  date: string,
  status: Order['status'],
  lines: [string, number][],
): Order {
  const items = lines.map(([mid, qty]) => lineFor(mid, qty))
  const subtotal = items.reduce((s, i) => s + i.total, 0)
  const discount = Math.round(subtotal * 0.02)
  const tax = Math.round((subtotal - discount) * 0.05)
  const deliveryCharge = subtotal > 5000 ? 0 : 150
  return {
    id,
    date,
    items,
    subtotal,
    discount,
    tax,
    deliveryCharge,
    grandTotal: subtotal - discount + tax + deliveryCharge,
    status,
    deliveryAddress: addresses[0],
  }
}

export const orders: Order[] = [
  buildOrder('TM-10245', '2026-09-02', 'Shipped', [
    ['med-001', 20],
    ['med-005', 10],
    ['med-020', 15],
  ]),
  buildOrder('TM-10233', '2026-08-27', 'Delivered', [
    ['med-011', 30],
    ['med-015', 10],
    ['med-041', 5],
  ]),
  buildOrder('TM-10221', '2026-08-19', 'Delivered', [
    ['med-006', 12],
    ['med-025', 20],
  ]),
  buildOrder('TM-10256', '2026-09-05', 'Processing', [
    ['med-030', 25],
    ['med-034', 10],
  ]),
  buildOrder('TM-10260', '2026-09-06', 'Pending', [
    ['med-002', 20],
    ['med-018', 10],
    ['med-044', 15],
  ]),
]

export const notifications: NotificationItem[] = [
  { id: 'n1', message: 'Order #TM-10245 has been shipped.', timestamp: '2026-09-05T10:20:00+05:30', read: false },
  { id: 'n2', message: 'New wholesale pricing available on Cardiac Care products.', timestamp: '2026-09-04T09:00:00+05:30', read: false },
  { id: 'n3', message: 'Order #TM-10233 has been delivered.', timestamp: '2026-08-28T16:40:00+05:30', read: true },
  { id: 'n4', message: '5 products from your wishlist are back in stock.', timestamp: '2026-08-25T11:15:00+05:30', read: true },
]

export const supportTickets: SupportTicket[] = [
  {
    id: 'TCK-001',
    subject: 'Wrong batch delivered',
    orderId: 'TM-10233',
    message: 'The batch number on 2 strips does not match the invoice.',
    status: 'Resolved',
    createdAt: '2026-08-29',
  },
]
