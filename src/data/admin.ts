import { medicines, categories } from './medicines'

export const salesTrend = [
  { day: 'Mon', sales: 42000, orders: 18 },
  { day: 'Tue', sales: 51000, orders: 22 },
  { day: 'Wed', sales: 38000, orders: 15 },
  { day: 'Thu', sales: 64000, orders: 27 },
  { day: 'Fri', sales: 58000, orders: 24 },
  { day: 'Sat', sales: 71000, orders: 31 },
  { day: 'Sun', sales: 33000, orders: 12 },
]

export const categoryPerformance = categories.slice(0, 7).map((c, i) => ({
  category: c.name,
  sales: 20000 + i * 6500 + (i % 3) * 4000,
}))

export const topSelling = medicines.slice(0, 6).map((m, i) => ({
  name: m.name,
  units: 480 - i * 55,
  revenue: (480 - i * 55) * m.wholesalePrice,
}))

export interface AdminCustomer {
  id: string
  storeName: string
  ownerName: string
  city: string
  totalOrders: number
  totalPurchase: number
  status: 'Active' | 'Inactive'
}

export const adminCustomers: AdminCustomer[] = [
  { id: 'CU-001', storeName: 'Verma Medical & General Store', ownerName: 'Rakesh Verma', city: 'Raipur', totalOrders: 24, totalPurchase: 186000, status: 'Active' },
  { id: 'CU-002', storeName: 'Shivam Pharmacy', ownerName: 'Shivam Gupta', city: 'Bilaspur', totalOrders: 16, totalPurchase: 124500, status: 'Active' },
  { id: 'CU-003', storeName: 'City Care Chemist', ownerName: 'Anita Rao', city: 'Durg', totalOrders: 9, totalPurchase: 58200, status: 'Active' },
  { id: 'CU-004', storeName: 'Wellness Point', ownerName: 'Imran Khan', city: 'Raipur', totalOrders: 4, totalPurchase: 21300, status: 'Inactive' },
  { id: 'CU-005', storeName: 'Sanjeevani Medicos', ownerName: 'Priya Sharma', city: 'Korba', totalOrders: 31, totalPurchase: 242800, status: 'Active' },
  { id: 'CU-006', storeName: 'Apna Bazar Chemist', ownerName: 'Deepak Sahu', city: 'Rajnandgaon', totalOrders: 2, totalPurchase: 9600, status: 'Inactive' },
]

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  phone: string
  productsSupplied: number
  city: string
}

export const suppliers: Supplier[] = [
  { id: 'SUP-001', name: 'Meridian Pharma', contactPerson: 'Vikas Joshi', phone: '+91 98230 11234', productsSupplied: 12, city: 'Indore' },
  { id: 'SUP-002', name: 'Vansh Life Sciences', contactPerson: 'Neha Kapoor', phone: '+91 98110 44521', productsSupplied: 9, city: 'Ahmedabad' },
  { id: 'SUP-003', name: 'Arogya Labs', contactPerson: 'Suresh Nair', phone: '+91 90040 87621', productsSupplied: 8, city: 'Hyderabad' },
  { id: 'SUP-004', name: 'Nirvaan Pharmaceuticals', contactPerson: 'Kavita Bhatt', phone: '+91 99870 33210', productsSupplied: 11, city: 'Baddi' },
  { id: 'SUP-005', name: 'Kavach Healthcare', contactPerson: 'Rohit Malhotra', phone: '+91 97170 22119', productsSupplied: 7, city: 'Ankleshwar' },
]

export interface Offer {
  id: string
  title: string
  description: string
  discountPercent: number
  category: string
  active: boolean
  validTill: string
}

export const offers: Offer[] = [
  { id: 'OFF-001', title: 'Bulk Antibiotics Deal', description: 'Extra 5% off on antibiotics above 50 units', discountPercent: 5, category: 'Antibiotics', active: true, validTill: '2026-09-30' },
  { id: 'OFF-002', title: 'Diabetes Care Bundle', description: 'Flat 8% off on diabetes care combo orders', discountPercent: 8, category: 'Diabetes Care', active: true, validTill: '2026-10-15' },
  { id: 'OFF-003', title: 'Monsoon OTC Stock-up', description: 'Seasonal discount on OTC and respiratory products', discountPercent: 6, category: 'OTC Products', active: false, validTill: '2026-08-31' },
]
