import { Minus, Plus } from 'lucide-react'

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 9999,
  step = 1,
  size = 'md',
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  size?: 'sm' | 'md'
}) {
  const h = size === 'sm' ? 'h-8' : 'h-10'
  const clamp = (v: number) => Math.max(min, Math.min(max, v))

  return (
    <div className={`inline-flex ${h} items-stretch overflow-hidden rounded-[4px] border border-navy-100`}>
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        disabled={value <= min}
        className="flex w-8 items-center justify-center text-navy-700 hover:bg-navy-50 disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
        className="w-12 border-x border-navy-100 text-center text-sm text-navy-950 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        disabled={value >= max}
        className="flex w-8 items-center justify-center text-navy-700 hover:bg-navy-50 disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
