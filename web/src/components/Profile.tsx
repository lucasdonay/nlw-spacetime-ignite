import { getUser } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        width={80}
        height={80}
        alt=""
        className="h-12 w-12 rounded-full transition-all hover:scale-125"
      />
      <div className="flex flex-col">
        <p className="font-title max-w-[140px] text-2xl leading-snug text-gray-50">
          {name}
        </p>
        <Link
          href="/api/auth/logout"
          className="font-body text-xm leading-snug text-red-300 transition-all hover:text-red-400 "
        >
          Quero sair
        </Link>
      </div>
    </div>
  )
}
