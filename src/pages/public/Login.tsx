import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/AuthContext'
import { useToast } from '@/components/ui/Toast'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const { login } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function onSubmit(data: FormData) {
    setLoading(true)
    setTimeout(() => {
      login(data.email)
      push('Welcome back!')
      navigate('/dashboard')
    }, 500)
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="text-xl font-semibold text-navy-950">Log in to your store account</h1>
      <p className="mt-1 text-sm text-navy-500">Access wholesale pricing and place orders.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input label="Email" type="email" placeholder="you@store.com" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs font-medium text-teal-700 hover:text-teal-600">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Log In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-teal-700 hover:text-teal-600">
          Register your store
        </Link>
      </p>
    </div>
  )
}
