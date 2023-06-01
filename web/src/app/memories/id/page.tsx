import { EmpityMemories } from '@/components/EmpityMemories'
import { api } from '@/lib/api'
import { ChevronLeft, FolderUp } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { MediaPicker } from '@/components/MediaPicker'

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
    <div className="flex flex-col gap-10 pl-8 pt-9">
      <div className="flex flex-1 flex-col gap-4">
        <Link href={'/'} className="flex items-center hover:text-gray-50">
          <ChevronLeft className="h-5 w-5" />
          voltar a timeline
        </Link>

        <form>
          <div className="flex items-center gap-4 pl-1.5">
            <label
              htmlFor="media"
              className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <FolderUp className="h-4 w-4" />
              Adicionar foto ou vídeo de capa
            </label>

            <label
              htmlFor="isPublic"
              className="flex items-center gap-1.5 text-gray-200 hover:text-gray-100"
            >
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                value="true"
                className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 outline-none focus:ring-0"
              />
              Tornar memória pública
            </label>
          </div>
        </form>
      </div>
      <MediaPicker />
      <div key={memories[0].id} className="mr-20 space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memories[0].createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>
        <Image
          src={memories[0].coverUrl}
          alt=""
          width={492}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="text-lg leading-relaxed text-gray-200">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam sint
          distinctio molestiae, recusandae suscipit adipisci possimus deserunt
          quis non! Tempore ea accusamus totam veritatis quas dolorum hic! At,
          velit officia.
        </p>
      </div>
    </div>
  )
}
