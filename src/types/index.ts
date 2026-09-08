export type DosageForm =
  | 'Tablet'
  | 'Capsule'
  | 'Syrup'
  | 'Injection'
  | 'Suspension'
  | 'Ointment'
  | 'Drops'
  | 'Sachet'

export type MedicineCategory =
  | 'Antibiotics'
  | 'Pain Relief'
  | 'Diabetes Care'
  | 'Cardiac Care'
  | 'Gastro Care'
  | 'Vitamins & Supplements'
  | 'Surgical Products'
  | 'OTC Products'
  | 'Respiratory Care'
  | 'Dermatology'

export interface Manufacturer {
  id: string
  name: string
}

export interface Batch {
  batchNumber: string
  manufacturingDate: string
  expiryDate: string
  quantity: number
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'
export type ExpiryStatus = 'ok' | 'near-expiry' | 'expired'

export interface Medicine {
  id: string
  name: string
  composition: string
  manufacturer: string
  category: MedicineCategory
  dosageForm: DosageForm
  packSize: string
  mrp: number
  wholesalePrice: number
  discountPercent: number
  stockQuantity: number
  stockStatus: StockStatus
  minOrderQty: number
  prescriptionRequired: boolean
  sku: string
  batch: Batch
  expiryStatus: ExpiryStatus
  description: string
}

export interface CartLine {
  medicineId: string
  quantity: number
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'

export interface OrderItem {
  medicineId: string
  name: string
  packSize: string
  quantity: number
  unitPrice: number
  discountPercent: number
  total: number
}

export interface Order {
  id: string
  date: string
  items: OrderItem[]
  subtotal: number
  discount: number
  tax: number
  deliveryCharge: number
  grandTotal: number
  status: OrderStatus
  deliveryAddress: Address
}

export interface Address {
  id: string
  label: string
  line1: string
  city: string
  state: string
  pincode: string
}

export interface BusinessProfile {
  ownerName: string
  storeName: string
  gstNumber: string
  drugLicenseNumber: string
  phone: string
  email: string
}

export interface NotificationItem {
  id: string
  message: string
  timestamp: string
  read: boolean
}

export interface SupportTicket {
  id: string
  subject: string
  orderId?: string
  message: string
  status: 'Open' | 'Resolved'
  createdAt: string
}

export interface BillItem {
  medicineId: string
  name: string
  packSize: string
  quantity: number
  unitPrice: number
  total: number
}

export type PaymentMode = 'Cash' | 'UPI' | 'Card' | 'Credit'

export interface Bill {
  id: string
  billNumber: string
  date: string
  customerName: string
  customerPhone: string
  items: BillItem[]
  subtotal: number
  discount: number
  tax: number
  grandTotal: number
  paymentMode: PaymentMode
}
