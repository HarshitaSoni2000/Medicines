import raw from './medicines.json'
import type { Medicine, MedicineCategory } from '@/types'

export const medicines = raw as Medicine[]

export const categories: { name: MedicineCategory; blurb: string }[] = [
  { name: 'Antibiotics', blurb: 'Broad and narrow spectrum, Rx-controlled' },
  { name: 'Pain Relief', blurb: 'Analgesics and anti-inflammatories' },
  { name: 'Diabetes Care', blurb: 'Oral hypoglycemics and insulin' },
  { name: 'Cardiac Care', blurb: 'BP, lipid and cardiac support' },
  { name: 'Gastro Care', blurb: 'Antacids, PPIs and rehydration' },
  { name: 'Vitamins & Supplements', blurb: 'Multivitamins and minerals' },
  { name: 'Respiratory Care', blurb: 'Allergy, asthma and cough/cold' },
  { name: 'Dermatology', blurb: 'Topical creams and ointments' },
  { name: 'Surgical Products', blurb: 'Consumables and disposables' },
  { name: 'OTC Products', blurb: 'Everyday over-the-counter items' },
]

export const manufacturers = Array.from(new Set(medicines.map((m) => m.manufacturer))).sort()

export function getMedicineById(id: string) {
  return medicines.find((m) => m.id === id)
}

export const frequentlyOrderedIds = ['med-001', 'med-005', 'med-011', 'med-020', 'med-015', 'med-030']
