import nlwLogo from '../assets/logo.svg'

import Image from 'next/image'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="Logo" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="mt-5 text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>

        <p className="text-lg leading-relaxed text-gray-100">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <a
        href=""
        className="inline-block rounded-full bg-green-500 px-5 py-3 text-center font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600 hover:text-gray-50"
      >
        CADASTRAR LEMBRANÇA
      </a>
    </div>
  )
}
