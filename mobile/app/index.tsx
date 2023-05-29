import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'
import { useRouter } from 'expo-router'

import Logo from '../src/assets/logo.svg'

export default function App() {
  const router = useRouter()

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/27afc945b04f6bc84bf6',
  }

  const [, response, signInGithub] = useAuthRequest(
    {
      clientId: '27afc945b04f6bc84bf6',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithubOauthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubOauthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-9 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />

        <View className="space-y-2">
          <Text className="leading-light text-center font-title text-2xl text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="max-w-[290px] text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          className="rounded-full bg-green-500 px-4 py-4"
          onPress={() => signInGithub()}
        >
          <Text className="text-center font-alt text-sm uppercase text-black">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="items-center text-center text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
