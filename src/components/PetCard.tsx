import type { Pet } from '../types'
import { ageText, daysUntil, whenText } from '../utils'
import { cardClass } from '../styles'
import { Chip, PawIcon } from './ui'

interface Props {
  pet: Pet
  onClick?: () => void
}

export function PetSummary({ pet, large = false }: { pet: Pet; large?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={`grid shrink-0 place-items-center bg-primary-soft text-primary ${
          large ? 'size-20 rounded-[26px]' : 'size-14 rounded-[18px]'
        }`}
      >
        <PawIcon className={large ? 'size-10' : 'size-7'} />
      </span>
      <div className="space-y-1.5">
        <p className={`leading-tight font-extrabold tracking-tight ${large ? 'text-3xl' : 'text-[22px]'}`}>{pet.name}</p>
        <div className="flex flex-wrap gap-1.5">
          <Chip>{pet.species}</Chip>
          <Chip>{ageText(pet.birthDate)}</Chip>
          <Chip>{pet.weightKg.toLocaleString('tr-TR')} kg</Chip>
        </div>
      </div>
    </div>
  )
}

export default function PetCard({ pet, onClick }: Props) {
  const next = pet.records
    .filter((r) => daysUntil(r.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date))[0]
  const soon = next && daysUntil(next.date) <= 7

  return (
    <button
      onClick={onClick}
      className={`${cardClass} w-full space-y-4 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary`}
    >
      <PetSummary pet={pet} />
      <p className={`flex gap-2 rounded-2xl px-3 py-2.5 text-[13px] ${soon ? 'bg-soon-soft' : 'bg-canvas'}`}>
        <span className="font-bold text-primary-dark">Sıradaki:</span>
        <span className="font-semibold">
          {next ? `${next.name} · ${whenText(daysUntil(next.date)).toLocaleLowerCase('tr-TR')}` : 'Planlanmış uygulama yok'}
        </span>
      </p>
    </button>
  )
}
