import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View>
        <Link href="/new" asChild>
          <TouchableOpacity className="rounded-full bg-green-500 p-3 text-2xl uppercase text-gray-50">
            <Text>Cadastrar Memoria</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
