import React, { useState } from 'react'
import { Switch, View, TextInput, Text, ScrollView, Image } from 'react-native'
import Logo from '../src/assets/logo.svg'
import { Link, useRouter } from 'expo-router'

import Icon from '@expo/vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()

  const router = useRouter()

  const [isPublic, setIsPublic] = useState(false)

  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (errr) {
      // deu erro
    }
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()
      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrl = uploadResponse.data.fileUrl

      console.log(coverUrl)
    }

    await api.post(
      '/memories',
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/memories')
  }

  return (
    <ScrollView
      className="flex-1 pl-8 pr-4"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <Logo />
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex flex-row items-center justify-start gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{ false: '#303030', true: '#372560' }}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória publica
          </Text>
        </View>

        <TouchableOpacity
          className="h-32 items-center justify-center rounded-lg  border border-dashed border-gray-500 bg-black/20 p-1"
          onPress={openImagePicker}
        >
          {preview ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              source={{ uri: preview }}
              className="h-full w-full rounded-lg border-dashed object-cover "
            />
          ) : (
            <View className="flex flex-row items-center gap-4">
              <Icon name="image" color="#fff" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          className="p-0 font-body text-lg text-gray-200"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <TouchableOpacity
          activeOpacity={0.6}
          className="mb-6 self-end rounded-full bg-green-500 px-5 py-3"
          onPress={handleCreateMemory}
        >
          <Text className="text-center font-alt text-sm uppercase text-black">
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}