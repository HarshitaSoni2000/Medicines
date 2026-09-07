import { Heart } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProductCard } from '@/components/shared/ProductCard'
import { useWishlist } from '@/features/wishlist/WishlistContext'
import { getMedicineById } from '@/data/medicines'

export default function Wishlist() {
  const { ids } = useWishlist()
  const items = ids.map(getMedicineById).filter(Boolean) as NonNullable<ReturnType<typeof getMedicineById>>[]

  return (
    <div>
      <PageHeader title="Wishlist" subtitle={`${items.length} saved medicines`} />
      {items.length === 0 ? (
        <EmptyState icon={<Heart className="h-8 w-8" />} title="Wishlist is empty" message="Save medicines you order often for quick access." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((m) => (
            <ProductCard key={m.id} medicine={m} />
          ))}
        </div>
      )}
    </div>
  )
}
