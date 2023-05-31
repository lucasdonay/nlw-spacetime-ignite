import { EmpityMemories } from '@/components/EmpityMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

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

  const memories = response.data

  return <div>{JSON.stringify(memories)}</div>
}
