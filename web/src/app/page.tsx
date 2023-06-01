import { EmpityMemories } from '@/components/EmpityMemories'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

dayjs.locale(ptBR)

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmpityMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmpityMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8 ">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4 ">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              src={memory.coverUrl}
              alt=""
              width={492}
              height={280}
              className="aspect-video h-3/4 w-3/4 rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-200">
              {memory.excerpt}
            </p>

            <Link
              href="/memories/id"
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
