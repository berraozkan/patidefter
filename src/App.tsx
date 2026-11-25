import { useState } from 'react'
import Header from './components/Header'
import PetCard from './components/PetCard'
import PetDetail from './components/PetDetail'
import PetForm from './components/PetForm'
import { PawIcon, PrimaryButton } from './components/ui'
import type { Pet } from './types'
import { usePets } from './usePets'
import { daysUntil } from './utils'

function Stat({ value, label, accent = false }: { value: number; label: string; accent?: boolean }) {
  return (
    <div
      className={`flex-1 rounded-[18px] border px-[18px] py-3.5 ${
        accent ? 'border-soon bg-soon-soft' : 'border-line bg-white'
      }`}
    >
      <p className={`text-[28px] leading-tight font-extrabold ${accent ? 'text-primary-dark' : ''}`}>{value}</p>
      <p className="text-[13px] font-semibold text-muted">{label}</p>
    </div>
  )
}

export default function App() {
  const [pets, setPets] = usePets()
  const [adding, setAdding] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = pets.find((p) => p.id === selectedId)

  const updateRecords = (petId: string, fn: (records: Pet['records']) => Pet['records']) =>
    setPets((prev) => prev.map((p) => (p.id === petId ? { ...p, records: fn(p.records) } : p)))

  const allRecords = pets.flatMap((p) => p.records)
  const soonCount = allRecords.filter((r) => {
    const d = daysUntil(r.date)
    return d >= 0 && d <= 7
  }).length

  if (selected) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-3xl px-4 pt-2 pb-16">
          <PetDetail
            pet={selected}
            onBack={() => setSelectedId(null)}
            onAddRecord={(r) => updateRecords(selected.id, (rs) => [...rs, r])}
            onDeleteRecord={(id) => updateRecords(selected.id, (rs) => rs.filter((r) => r.id !== id))}
          />
        </main>
      </>
    )
  }

  return (
    <>
      <Header>
        <h1 className="text-4xl leading-[1.15] font-extrabold tracking-tight sm:text-[40px]">
          Dostlarının sağlığı, tek bir defterde.
        </h1>
        <p className="text-muted">Aşı ve parazit tarihlerini kaydet, yaklaşan uygulamaları kaçırma.</p>
        <div className="flex gap-3">
          <Stat value={pets.length} label="dost" />
          <Stat value={soonCount} label="bu hafta yaklaşan" accent={soonCount > 0} />
          <Stat value={allRecords.length} label="sağlık kaydı" />
        </div>
      </Header>

      <main className="mx-auto max-w-3xl space-y-5 px-4 pt-6 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight">Hayvanlarım</h2>
          {!adding && <PrimaryButton onClick={() => setAdding(true)}>+ Hayvan Ekle</PrimaryButton>}
        </div>

        {adding && (
          <PetForm
            onSave={(pet) => {
              setPets((prev) => [...prev, pet])
              setAdding(false)
            }}
            onCancel={() => setAdding(false)}
          />
        )}

        {pets.length === 0 && !adding ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-line px-6 py-12 text-center">
            <span className="grid size-16 place-items-center rounded-[22px] bg-primary-soft text-primary">
              <PawIcon className="size-8" />
            </span>
            <p className="text-lg font-extrabold">Henüz hayvan eklenmedi</p>
            <p className="text-sm text-muted">İlk dostunu eklemek için “+ Hayvan Ekle”ye tıkla.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onClick={() => setSelectedId(pet.id)} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
