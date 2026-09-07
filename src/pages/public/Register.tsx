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
  ownerName: z.string().min(2, 'Required'),
  storeName: z.string().min(2, 'Required'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email'),
  gstNumber: z.string().min(15, 'Enter a valid 15-digit GSTIN'),
  drugLicenseNumber: z.string().min(4, 'Required'),
  address: z.string().min(4, 'Required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const { register: doRegister } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function onSubmit(data: FormData) {
    setLoading(true)
    setTimeout(() => {
      doRegister({
        ownerName: data.ownerName,
        storeName: data.storeName,
        gstNumber: data.gstNumber,
        drugLicenseNumber: data.drugLicenseNumber,
        phone: data.phone,
        email: data.email,
      })
      push('Account created — verification pending')
      navigate('/dashboard')
    }, 600)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-xl font-semibold text-navy-950">Register your medical store</h1>
      <p className="mt-1 text-sm text-navy-500">
        Verification of GST and drug licence is required before wholesale pricing is unlocked.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input label="Owner Name" {...register('ownerName')} error={errors.ownerName?.message} />
        <Input label="Medical Store Name" {...register('storeName')} error={errors.storeName?.message} />
        <Input label="Mobile Number" {...register('phone')} error={errors.phone?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="GST Number" {...register('gstNumber')} error={errors.gstNumber?.message} />
        <Input label="Drug License Number" {...register('drugLicenseNumber')} error={errors.drugLicenseNumber?.message} />
        <Input className="sm:col-span-2" label="Store Address" {...register('address')} error={errors.address?.message} />
        <Input className="sm:col-span-2" label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button type="submit" size="lg" className="sm:col-span-2" loading={loading}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-500">
        Already registered?{' '}
        <Link to="/login" className="font-medium text-teal-700 hover:text-teal-600">
          Log in
        </Link>
      </p>
    </div>
  )
}
