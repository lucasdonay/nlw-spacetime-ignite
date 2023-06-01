import { NewMemoryForm } from '@/components/NewMemoryForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewMemorie() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link href={'/'} className="flex items-center hover:text-gray-50">
        <ChevronLeft className="h-5 w-5" />
        voltar a timeline
      </Link>

      <NewMemoryForm />
    </div>
  )
}
