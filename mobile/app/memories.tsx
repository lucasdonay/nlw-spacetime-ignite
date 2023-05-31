import { Link, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { View, TouchableOpacity, ScrollView, Text, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Logo from '../src/assets/logo.svg'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

interface Memory {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()

  const router = useRouter()

  const [memories, setMemories] = useState<Memory[]>([])

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function lodMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    lodMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between pl-8  pr-4">
        <Logo />

        <View className="flex flex-row gap-2">
          <TouchableOpacity
            className="h-10 w-10 -scale-x-100 items-center justify-center rounded-full bg-red-500"
            onPress={signOut}
          >
            <Icon name="log-out" size={16} color="#FFF" />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#FFF" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10 pb-5">
        {memories.map((memory) => {
          return (
            <View key={memory.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-50">
                  {dayjs(memory.createdAt)
                    .locale(ptBr)
                    .format('D[ de ]MMMM[, ] YYYY')}
                </Text>
              </View>

              <View className="space-y-4 px-8">
                <Image
                  className="aspect-video w-full rounded-lg"
                  source={{
                    uri: memory.coverUrl,
                  }}
                  alt=""
                />
                <Text className="font-body text-base  leading-relaxed text-gray-100">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                  nihil ipsa, voluptatum adipisci distinctio saepe dolorum rerum
                  quia expedita veniam est dicta sit, maxime, debitis soluta
                  magni perferendis facere tenetur!
                </Text>
                <Link href={'/memories/id'} asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" syze={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
