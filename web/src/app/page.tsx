import { cookies } from 'next/headers'
import { Copyright } from '@/components/Copyright'
import { EmpityMemories } from '@/components/EmpityMemories'
import { Hero } from '@/components/Hero'
import { SigIn } from '@/components/SignIn'
import { Profile } from '@/components/Profile'

export default function Home() {
  const isAuthenticated = cookies().has('token')

  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/stars.svg)] px-28 py-16 ">
        <div className="absolute right-0 top-1/2 h-[280px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {/* Stripes */}
        <div className="absolute bottom-0 right-1 top-0 w-2  bg-stripes" />

        {isAuthenticated ? <Profile /> : <SigIn />}

        <Hero />

        <Copyright />
      </div>

      <div className="flex flex-col bg-[url(../assets/stars.svg)] bg-cover p-16">
        <EmpityMemories />
      </div>
    </main>
  )
}
