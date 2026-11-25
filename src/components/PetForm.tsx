import { useState, type FormEvent } from 'react'
import type { Pet, Species } from '../types'
import { newId } from '../usePets'

interface Props {
  onSave: (pet: Pet) => void
  onCancel: () => void
}

const today = () => new Date().toISOString().slice(0, 10)

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

  const input =
    'w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-amber-500 focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Yeni hayvan</h2>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">İsim</span>
        <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="ör. Bala" />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Tür</span>
          <select className={input} value={species} onChange={(e) => setSpecies(e.target.value as Species)}>
            <option>Kedi</option>
            <option>Köpek</option>
            <option>Diğer</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Doğum tarihi</span>
          <input type="date" max={today()} className={input} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Kilo (kg)</span>
          <input inputMode="decimal" className={input} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="4,2" />
        </label>
      </div>

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-stone-600 hover:bg-stone-100">
          Vazgeç
        </button>
        <button type="submit" className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600">
          Kaydet
        </button>
      </div>
    </form>
  )
}
