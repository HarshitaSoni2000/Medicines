import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop } from '@/components/shared/ScrollToTop'
import { PageLoader } from '@/components/shared/PageLoader'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'

// Public
const Home = lazy(() => import('@/pages/public/Home'))
const MedicineCatalog = lazy(() => import('@/pages/public/MedicineCatalog'))
const Categories = lazy(() => import('@/pages/public/Categories'))
const ProductDetail = lazy(() => import('@/pages/product/ProductDetail'))
const QuickOrder = lazy(() => import('@/pages/public/QuickOrder'))
const Cart = lazy(() => import('@/pages/public/Cart'))
const Checkout = lazy(() => import('@/pages/public/Checkout'))
const Login = lazy(() => import('@/pages/public/Login'))
const Register = lazy(() => import('@/pages/public/Register'))
const ForgotPassword = lazy(() => import('@/pages/public/ForgotPassword'))
const About = lazy(() => import('@/pages/public/About'))
const Contact = lazy(() => import('@/pages/public/Contact'))
const HowItWorks = lazy(() => import('@/pages/public/HowItWorks'))
const NotFound = lazy(() => import('@/pages/public/NotFound'))

// Dashboard
const DashboardHome = lazy(() => import('@/pages/dashboard/DashboardHome'))
const Orders = lazy(() => import('@/pages/dashboard/Orders'))
const OrderDetail = lazy(() => import('@/pages/dashboard/OrderDetail'))
const Wishlist = lazy(() => import('@/pages/dashboard/Wishlist'))
const SavedCarts = lazy(() => import('@/pages/dashboard/SavedCarts'))
const Addresses = lazy(() => import('@/pages/dashboard/Addresses'))
const Profile = lazy(() => import('@/pages/dashboard/Profile'))
const Documents = lazy(() => import('@/pages/dashboard/Documents'))
const Notifications = lazy(() => import('@/pages/dashboard/Notifications'))
const Support = lazy(() => import('@/pages/dashboard/Support'))

// Admin
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminOrders = lazy(() => import('@/pages/admin/AdminOrders'))
const AdminProducts = lazy(() => import('@/pages/admin/AdminProducts'))
const AdminCategories = lazy(() => import('@/pages/admin/AdminCategories'))
const AdminCustomers = lazy(() => import('@/pages/admin/AdminCustomers'))
const AdminInventory = lazy(() => import('@/pages/admin/AdminInventory'))
const AdminSuppliers = lazy(() => import('@/pages/admin/AdminSuppliers'))
const AdminPricing = lazy(() => import('@/pages/admin/AdminPricing'))
const AdminOffers = lazy(() => import('@/pages/admin/AdminOffers'))
const AdminReports = lazy(() => import('@/pages/admin/AdminReports'))
const AdminSupport = lazy(() => import('@/pages/admin/AdminSupport'))
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'))

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/medicines" element={<MedicineCatalog />} />
            <Route path="/medicines/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/quick-order" element={<QuickOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="saved-carts" element={<SavedCarts />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="profile" element={<Profile />} />
            <Route path="documents" element={<Documents />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="support" element={<Support />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="suppliers" element={<AdminSuppliers />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="offers" element={<AdminOffers />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="support" element={<AdminSupport />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
