import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-[4px] bg-navy-100/70', className)} />
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-[6px] border border-navy-100 bg-white p-4">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="mt-3 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  )
}
