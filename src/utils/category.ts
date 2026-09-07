import {
  Pill,
  Syringe,
  HeartPulse,
  Activity,
  Stethoscope,
  Leaf,
  Wind,
  Droplet,
  Scissors,
  ShoppingBasket,
  type LucideIcon,
} from 'lucide-react'
import type { MedicineCategory } from '@/types'

export const categoryIcon: Record<MedicineCategory, LucideIcon> = {
  'Antibiotics': Syringe,
  'Pain Relief': Pill,
  'Diabetes Care': Activity,
  'Cardiac Care': HeartPulse,
  'Gastro Care': Stethoscope,
  'Vitamins & Supplements': Leaf,
  'Respiratory Care': Wind,
  'Dermatology': Droplet,
  'Surgical Products': Scissors,
  'OTC Products': ShoppingBasket,
}

export const categoryTint: Record<MedicineCategory, string> = {
  'Antibiotics': 'bg-teal-50 text-teal-700',
  'Pain Relief': 'bg-navy-50 text-navy-700',
  'Diabetes Care': 'bg-amber-100 text-amber-600',
  'Cardiac Care': 'bg-red-100 text-red-600',
  'Gastro Care': 'bg-green-100 text-green-600',
  'Vitamins & Supplements': 'bg-teal-50 text-teal-700',
  'Respiratory Care': 'bg-navy-50 text-navy-700',
  'Dermatology': 'bg-amber-100 text-amber-600',
  'Surgical Products': 'bg-navy-50 text-navy-700',
  'OTC Products': 'bg-green-100 text-green-600',
}
