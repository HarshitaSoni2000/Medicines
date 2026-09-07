import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-navy-900">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-10 w-full rounded-[4px] border border-navy-100 bg-white px-3 text-sm text-navy-950',
            'placeholder:text-navy-500/60 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100',
            error && 'border-red-600 focus:border-red-600 focus:ring-red-100',
            className,
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-red-600">{error}</span>
        ) : hint ? (
          <span className="text-xs text-navy-500">{hint}</span>
        ) : null}
      </div>
    )
  },
)
Input.displayName = 'Input'
