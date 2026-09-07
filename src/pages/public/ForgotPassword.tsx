import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      {sent ? (
        <div className="text-center">
          <MailCheck className="mx-auto h-10 w-10 text-teal-600" />
          <h1 className="mt-4 text-xl font-semibold text-navy-950">Check your email</h1>
          <p className="mt-1 text-sm text-navy-500">We've sent a password reset link to your registered email.</p>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-semibold text-navy-950">Reset your password</h1>
          <p className="mt-1 text-sm text-navy-500">Enter your registered email and we'll send a reset link.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="mt-6 space-y-4"
          >
            <Input label="Email" type="email" placeholder="you@store.com" required />
            <Button type="submit" size="lg" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </>
      )}
      <p className="mt-6 text-center text-sm text-navy-500">
        <Link to="/login" className="font-medium text-teal-700 hover:text-teal-600">
          Back to login
        </Link>
      </p>
    </div>
  )
}
