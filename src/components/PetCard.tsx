import type { Pet } from '../types'
import { ageText } from '../utils'

const emoji = { Kedi: '🐱', Köpek: '🐶', Diğer: '🐾' } as const

interface Props {
  pet: Pet
  onClick?: () => void
}

export default function PetCard({ pet, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl bg-white p-4 text-left shadow-sm transition hover:shadow-md"
    >
      <span className="text-4xl">{emoji[pet.species]}</span>
      <div>
        <p className="text-lg font-semibold">{pet.name}</p>
        <p className="text-sm text-stone-500">
          {pet.species} · {ageText(pet.birthDate)} · {pet.weightKg.toLocaleString('tr-TR')} kg
        </p>
      </div>
    </button>
  )
}
