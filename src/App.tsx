import { useState } from 'react'
import PetCard from './components/PetCard'
import PetForm from './components/PetForm'
import { usePets } from './usePets'

export default function App() {
  const [pets, setPets] = usePets()
  const [adding, setAdding] = useState(false)

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      <header className="border-b border-amber-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5">
          <h1 className="text-2xl font-bold">🐾 PatiDefter</h1>
          <p className="text-sm text-stone-500">Evcil hayvan sağlık defteri</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Hayvanlarım</h2>
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
            >
              + Hayvan Ekle
            </button>
          )}
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
          <p className="rounded-xl border-2 border-dashed border-amber-200 p-8 text-center text-stone-500">
            Henüz hayvan eklenmedi. İlk dostunu eklemek için “+ Hayvan Ekle”ye tıkla.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
