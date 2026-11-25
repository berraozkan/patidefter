import { useState, type FormEvent } from 'react'
import type { Pet, Species } from '../types'
import { newId } from '../usePets'
import { cardClass, inputClass, labelClass } from '../styles'
import { PrimaryButton } from './ui'
import { todayISO } from '../utils'

interface Props {
  onSave: (pet: Pet) => void
  onCancel: () => void
}

const today = todayISO

export default function PetForm({ onSave, onCancel }: Props) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState<Species>('Kedi')
  const [birthDate, setBirthDate] = useState('')
  const [weight, setWeight] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return setError('İsim boş bırakılamaz.')
    if (!birthDate) return setError('Doğum tarihi seçin.')
    if (birthDate > today()) return setError('Doğum tarihi gelecekte olamaz.')
    const weightKg = Number(weight.replace(',', '.'))
    if (!weight || Number.isNaN(weightKg) || weightKg <= 0)
      return setError('Geçerli bir kilo girin (ör. 4,2).')

    onSave({ id: newId(), name: name.trim(), species, birthDate, weightKg, records: [] })
  }


  return (
    <form onSubmit={handleSubmit} className={`${cardClass} space-y-5 p-6`}>
      <h2 className="text-xl font-extrabold tracking-tight">Yeni hayvan</h2>

      <label className="block">
        <span className={labelClass}>İsim</span>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="ör. Bala" />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className={labelClass}>Tür</span>
          <select className={inputClass} value={species} onChange={(e) => setSpecies(e.target.value as Species)}>
            <option>Kedi</option>
            <option>Köpek</option>
            <option>Diğer</option>
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>Doğum tarihi</span>
          <input type="date" max={today()} className={inputClass} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </label>
        <label className="block">
          <span className={labelClass}>Kilo (kg)</span>
          <input inputMode="decimal" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="4,2" />
        </label>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700" role="alert">{error}</p>}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-full px-5 py-3 font-bold text-muted hover:bg-canvas">
          Vazgeç
        </button>
        <PrimaryButton type="submit">Kaydet</PrimaryButton>
      </div>
    </form>
  )
}
