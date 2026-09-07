import { Link } from 'react-router-dom'
import { PackageX } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <PackageX className="h-12 w-12 text-navy-400" strokeWidth={1.5} />
      <h1 className="mt-4 text-xl font-semibold text-navy-950">Page not found</h1>
      <p className="mt-1 text-sm text-navy-500">The page you're looking for doesn't exist or has moved.</p>
      <Button className="mt-6" asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  )
}
