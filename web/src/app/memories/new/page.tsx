import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewMemorie() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link href={'/'} className="flex items-center">
        <ChevronLeft />
        voltar a timeline
      </Link>
    </div>
  )
}
