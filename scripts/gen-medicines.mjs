import fs from 'fs'

const manufacturers = [
  'Meridian Pharma', 'Vansh Life Sciences', 'Arogya Labs', 'Cresta Biotech',
  'Nirvaan Pharmaceuticals', 'Sanjeevani Formulations', 'Kavach Healthcare',
  'Trident Remedies', 'Alba Biosciences', 'Rudra Pharma Works',
]

const items = [
  ['Paracetamol 500mg', 'Paracetamol 500mg', 'Pain Relief', 'Tablet', '10x10 Tablets', 45, false],
  ['Ibuprofen 400mg', 'Ibuprofen 400mg', 'Pain Relief', 'Tablet', '10x10 Tablets', 62, false],
  ['Diclofenac 50mg', 'Diclofenac Sodium 50mg', 'Pain Relief', 'Tablet', '10x10 Tablets', 58, true],
  ['Tramadol 50mg', 'Tramadol Hydrochloride 50mg', 'Pain Relief', 'Capsule', '10x10 Capsules', 95, true],
  ['Amoxicillin 500mg', 'Amoxicillin 500mg', 'Antibiotics', 'Capsule', '10x10 Capsules', 88, true],
  ['Azithromycin 500mg', 'Azithromycin 500mg', 'Antibiotics', 'Tablet', '5x3 Tablets', 132, true],
  ['Azithromycin 250mg', 'Azithromycin 250mg', 'Antibiotics', 'Tablet', '6x5 Tablets', 96, true],
  ['Ciprofloxacin 500mg', 'Ciprofloxacin 500mg', 'Antibiotics', 'Tablet', '10x10 Tablets', 78, true],
  ['Cefixime 200mg', 'Cefixime 200mg', 'Antibiotics', 'Tablet', '10x10 Tablets', 145, true],
  ['Doxycycline 100mg', 'Doxycycline 100mg', 'Antibiotics', 'Capsule', '10x10 Capsules', 68, true],
  ['Metformin 500mg', 'Metformin Hydrochloride 500mg', 'Diabetes Care', 'Tablet', '10x15 Tablets', 54, true],
  ['Glimepiride 2mg', 'Glimepiride 2mg', 'Diabetes Care', 'Tablet', '10x10 Tablets', 72, true],
  ['Sitagliptin 100mg', 'Sitagliptin Phosphate 100mg', 'Diabetes Care', 'Tablet', '10x10 Tablets', 210, true],
  ['Insulin Glargine', 'Insulin Glargine 100IU/ml', 'Diabetes Care', 'Injection', '1x3ml Vial', 385, true],
  ['Atorvastatin 10mg', 'Atorvastatin Calcium 10mg', 'Cardiac Care', 'Tablet', '10x10 Tablets', 89, true],
  ['Amlodipine 5mg', 'Amlodipine Besylate 5mg', 'Cardiac Care', 'Tablet', '10x15 Tablets', 44, true],
  ['Telmisartan 40mg', 'Telmisartan 40mg', 'Cardiac Care', 'Tablet', '10x10 Tablets', 96, true],
  ['Clopidogrel 75mg', 'Clopidogrel 75mg', 'Cardiac Care', 'Tablet', '10x10 Tablets', 118, true],
  ['Losartan 50mg', 'Losartan Potassium 50mg', 'Cardiac Care', 'Tablet', '10x15 Tablets', 76, true],
  ['Pantoprazole 40mg', 'Pantoprazole 40mg', 'Gastro Care', 'Tablet', '10x15 Tablets', 68, false],
  ['Omeprazole 20mg', 'Omeprazole 20mg', 'Gastro Care', 'Capsule', '10x10 Capsules', 52, false],
  ['Domperidone 10mg', 'Domperidone 10mg', 'Gastro Care', 'Tablet', '10x10 Tablets', 40, false],
  ['ORS Sachet', 'Oral Rehydration Salts', 'Gastro Care', 'Sachet', 'Box of 25', 210, false],
  ['Antacid Suspension', 'Aluminium Hydroxide + Magnesium Hydroxide', 'Gastro Care', 'Suspension', '1x200ml', 58, false],
  ['Vitamin B Complex', 'Vitamin B Complex with Zinc', 'Vitamins & Supplements', 'Tablet', '15x10 Tablets', 62, false],
  ['Calcium + D3', 'Calcium Citrate + Vitamin D3', 'Vitamins & Supplements', 'Tablet', '10x15 Tablets', 74, false],
  ['Vitamin C 500mg', 'Ascorbic Acid 500mg', 'Vitamins & Supplements', 'Tablet', '10x10 Tablets', 48, false],
  ['Multivitamin Syrup', 'Multivitamin + Multimineral', 'Vitamins & Supplements', 'Syrup', '1x200ml', 88, false],
  ['Iron + Folic Acid', 'Ferrous Ascorbate + Folic Acid', 'Vitamins & Supplements', 'Tablet', '10x15 Tablets', 66, false],
  ['Cetirizine 10mg', 'Cetirizine Hydrochloride 10mg', 'Respiratory Care', 'Tablet', '10x15 Tablets', 32, false],
  ['Montelukast 10mg', 'Montelukast + Levocetirizine', 'Respiratory Care', 'Tablet', '10x10 Tablets', 84, true],
  ['Cough Syrup', 'Dextromethorphan + Chlorpheniramine', 'Respiratory Care', 'Syrup', '1x100ml', 62, false],
  ['Salbutamol Inhaler', 'Salbutamol Sulphate 100mcg', 'Respiratory Care', 'Drops', '1 Inhaler', 145, true],
  ['Levocetirizine 5mg', 'Levocetirizine Dihydrochloride 5mg', 'Respiratory Care', 'Tablet', '10x15 Tablets', 38, false],
  ['Clotrimazole Cream', 'Clotrimazole 1% w/w', 'Dermatology', 'Ointment', '1x20g Tube', 46, false],
  ['Mupirocin Ointment', 'Mupirocin 2% w/w', 'Dermatology', 'Ointment', '1x10g Tube', 78, true],
  ['Betamethasone Cream', 'Betamethasone Valerate 0.1%', 'Dermatology', 'Ointment', '1x20g Tube', 52, true],
  ['Calamine Lotion', 'Calamine + Zinc Oxide', 'Dermatology', 'Suspension', '1x150ml', 58, false],
  ['Surgical Gloves', 'Latex Examination Gloves', 'Surgical Products', 'Sachet', 'Box of 100', 320, false],
  ['Surgical Face Mask', '3-Ply Surgical Mask', 'Surgical Products', 'Sachet', 'Box of 50', 180, false],
  ['Cotton Bandage Roll', 'Absorbent Cotton Bandage', 'Surgical Products', 'Sachet', 'Pack of 12', 210, false],
  ['Antiseptic Solution', 'Povidone Iodine 5%', 'Surgical Products', 'Suspension', '1x500ml', 96, false],
  ['Digital Thermometer', 'Digital Clinical Thermometer', 'Surgical Products', 'Sachet', '1 Unit', 145, false],
  ['Paracetamol Syrup (Kids)', 'Paracetamol 125mg/5ml', 'OTC Products', 'Syrup', '1x60ml', 42, false],
  ['Hand Sanitizer', 'Ethyl Alcohol 70% v/v', 'OTC Products', 'Suspension', '1x500ml', 88, false],
  ['Glucose Powder', 'Glucose-D Energy Powder', 'OTC Products', 'Sachet', '1x500g Jar', 96, false],
  ['Lozenges', 'Menthol + Eucalyptus Lozenges', 'OTC Products', 'Sachet', 'Pack of 24', 36, false],
]

function pad(n, len) { return String(n).padStart(len, '0') }

function pickManufacturer(i) {
  return manufacturers[i % manufacturers.length]
}

function stockFor(i) {
  const r = i % 9
  if (r === 0) return { qty: 0, status: 'out-of-stock' }
  if (r === 1 || r === 2) return { qty: 8 + i, status: 'low-stock' }
  return { qty: 120 + i * 7, status: 'in-stock' }
}

function expiryFor(i) {
  const r = i % 7
  if (r === 0) return { status: 'near-expiry', date: '2026-11-15' }
  if (r === 6) return { status: 'expired', date: '2026-06-01' }
  return { status: 'ok', date: '2028-03-31' }
}

const medicines = items.map(([name, composition, category, dosageForm, packSize, mrp, rx], i) => {
  const discount = [8, 10, 12, 15, 18, 20][i % 6]
  const wholesale = Math.round(mrp * (1 - discount / 100))
  const stock = stockFor(i)
  const expiry = expiryFor(i)
  return {
    id: `med-${pad(i + 1, 3)}`,
    name,
    composition,
    manufacturer: pickManufacturer(i),
    category,
    dosageForm,
    packSize,
    mrp,
    wholesalePrice: wholesale,
    discountPercent: discount,
    stockQuantity: stock.qty,
    stockStatus: stock.status,
    minOrderQty: [5, 10, 15, 20][i % 4],
    prescriptionRequired: rx,
    sku: `TM-${pad(i + 1, 4)}`,
    batch: {
      batchNumber: `B${pad(2400 + i, 4)}`,
      manufacturingDate: '2025-09-01',
      expiryDate: expiry.date,
      quantity: stock.qty,
    },
    expiryStatus: expiry.status,
    description: `${name} (${composition}) supplied in ${packSize} packs. Store in a cool, dry place away from direct sunlight.`,
  }
})

fs.writeFileSync(new URL('../src/data/medicines.json', import.meta.url), JSON.stringify(medicines, null, 2))
console.log(`Generated ${medicines.length} medicines`)
