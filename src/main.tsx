import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from '@/components/ui/Toast'
import { AuthProvider } from '@/features/auth/AuthContext'
import { CartProvider } from '@/features/cart/CartContext'
import { WishlistProvider } from '@/features/wishlist/WishlistContext'
import { SavedCartsProvider } from '@/features/cart/SavedCartsContext'
import { InventoryProvider } from '@/features/inventory/InventoryContext'
import { BillingProvider } from '@/features/billing/BillingContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <InventoryProvider>
            <BillingProvider>
              <CartProvider>
                <WishlistProvider>
                  <SavedCartsProvider>
                    <App />
                  </SavedCartsProvider>
                </WishlistProvider>
              </CartProvider>
            </BillingProvider>
          </InventoryProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
)
