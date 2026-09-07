import { useState } from 'react'
import { FileText, Upload, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

const documentTypes = [
  { id: 'drug-license', label: 'Drug License', required: true },
  { id: 'gst-certificate', label: 'GST Certificate', required: true },
  { id: 'shop-license', label: 'Shop & Establishment License', required: false },
  { id: 'pan-card', label: 'PAN Card', required: false },
]

export default function Documents() {
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({ 'drug-license': true, 'gst-certificate': true })
  const { push } = useToast()

  return (
    <div>
      <PageHeader title="Documents" subtitle="Verification documents for your store account" />
      <div className="max-w-2xl divide-y divide-navy-100 rounded-[6px] border border-navy-100 bg-white">
        {documentTypes.map((d) => (
          <div key={d.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-navy-500" />
              <div>
                <p className="text-sm font-medium text-navy-950">{d.label}</p>
                <p className="text-xs text-navy-500">{d.required ? 'Required' : 'Optional'}</p>
              </div>
            </div>
            {uploaded[d.id] ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified
              </span>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setUploaded((u) => ({ ...u, [d.id]: true }))
                  push(`${d.label} uploaded`)
                }}
              >
                <Upload className="h-3.5 w-3.5" /> Upload
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
