import { useState } from 'react'
import type { CareRecord, Pet } from '../types'
import { daysUntil, formatDate } from '../utils'
import CareRecordForm from './CareRecordForm'
import PetCard from './PetCard'

interface Props {
  pet: Pet
  onBack: () => void
  onAddRecord: (record: CareRecord) => void
  onDeleteRecord: (recordId: string) => void
}

const typeStyle = {
  Aşı: 'bg-sky-100 text-sky-800',
  'İç parazit': 'bg-emerald-100 text-emerald-800',
  'Dış parazit': 'bg-violet-100 text-violet-800',
} as const

function whenText(days: number) {
  if (days === 0) return 'Bugün'
  if (days === 1) return 'Yarın'
  if (days > 0) return `${days} gün sonra`
  return `${-days} gün önce`
}

function RecordRow({ record, onDelete }: { record: CareRecord; onDelete: () => void }) {
  const days = daysUntil(record.date)
  const soon = days >= 0 && days <= 7
  return (
    <li
      data-soon={soon || undefined}
      className={`flex items-center justify-between gap-3 rounded-lg p-3 ${
        soon ? 'border-2 border-amber-400 bg-amber-100' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeStyle[record.type]}`}>{record.type}</span>
        <div>
          <p className="font-medium">{record.name}</p>
          <p className="text-sm text-stone-500">
            {formatDate(record.date)} · {whenText(days)}
            {soon && ' ⏰'}
          </p>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="text-sm text-stone-400 hover:text-red-600"
        aria-label={`${record.name} kaydını sil`}
      >
        Sil
      </button>
    </li>
  )
}

export default function PetDetail({ pet, onBack, onAddRecord, onDeleteRecord }: Props) {
  const [adding, setAdding] = useState(false)

  const upcoming = pet.records
    .filter((r) => daysUntil(r.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date)) // en yakın önce
  const past = pet.records
    .filter((r) => daysUntil(r.date) < 0)
    .sort((a, b) => b.date.localeCompare(a.date)) // en yeni önce

  const del = (r: CareRecord) => {
    if (confirm(`"${r.name}" kaydı silinsin mi?`)) onDeleteRecord(r.id)
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="text-sm text-amber-700 hover:underline">
        ← Hayvanlarım
      </button>
      <PetCard pet={pet} />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Aşı ve parazit takvimi</h2>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
          >
            + Kayıt Ekle
          </button>
        )}
      </div>

      {adding && (
        <CareRecordForm
          onSave={(r) => {
            onAddRecord(r)
            setAdding(false)
          }}
          onCancel={() => setAdding(false)}
        />
      )}

      <section>
        <h3 className="mb-2 font-semibold text-stone-600">Yaklaşan ({upcoming.length})</h3>
        {upcoming.length ? (
          <ul className="space-y-2">
            {upcoming.map((r) => <RecordRow key={r.id} record={r} onDelete={() => del(r)} />)}
          </ul>
        ) : (
          <p className="text-sm text-stone-500">Planlanmış uygulama yok.</p>
        )}
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-stone-600">Geçmiş ({past.length})</h3>
        {past.length ? (
          <ul className="space-y-2 opacity-80">
            {past.map((r) => <RecordRow key={r.id} record={r} onDelete={() => del(r)} />)}
          </ul>
        ) : (
          <p className="text-sm text-stone-500">Henüz geçmiş kayıt yok.</p>
        )}
      </section>
    </div>
  )
}
