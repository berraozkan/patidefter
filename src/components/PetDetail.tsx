import { useState } from 'react'
import type { CareRecord, Pet } from '../types'
import { daysUntil, formatDate, whenText } from '../utils'
import { cardClass } from '../styles'
import CareRecordForm from './CareRecordForm'
import { PetSummary } from './PetCard'
import { PrimaryButton, TrashIcon, TypePill } from './ui'

interface Props {
  pet: Pet
  onBack: () => void
  onAddRecord: (record: CareRecord) => void
  onDeleteRecord: (recordId: string) => void
}

function badgeText(days: number) {
  if (days === 0) return 'Bugün'
  if (days === 1) return 'Yarın'
  if (days > 0) return `${days} gün kaldı`
  return whenText(days)
}

function RecordRow({ record, onDelete }: { record: CareRecord; onDelete: () => void }) {
  const days = daysUntil(record.date)
  const soon = days >= 0 && days <= 7
  const past = days < 0
  const [y, m, d] = record.date.split('-').map(Number)
  const month = new Date(y, m - 1, d).toLocaleDateString('tr-TR', { month: 'short' }).toLocaleUpperCase('tr-TR')

  return (
    <li
      data-soon={soon || undefined}
      className={`flex items-center gap-4 rounded-[18px] border px-4 py-3.5 ${
        soon ? 'border-[1.5px] border-soon bg-soon-soft' : 'border-line bg-white'
      } ${past ? 'opacity-75' : ''}`}
    >
      <div
        className={`grid size-14 shrink-0 place-content-center rounded-[14px] text-center ${soon ? 'bg-white' : 'bg-canvas'}`}
      >
        <span className="text-xl leading-none font-extrabold">{String(d).padStart(2, '0')}</span>
        <span className="mt-1 text-[11px] leading-none font-extrabold text-muted">{month}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-bold">{record.name}</p>
          <TypePill type={record.type} />
        </div>
        <p className="text-[13px] text-muted">{formatDate(record.date)}</p>
      </div>

      <span
        className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${
          soon ? 'bg-soon text-white' : past ? 'bg-canvas text-muted' : 'bg-primary-soft text-primary-dark'
        }`}
      >
        {badgeText(days)}
      </span>
      <button
        onClick={onDelete}
        className="shrink-0 rounded-full p-1.5 text-muted transition hover:bg-red-50 hover:text-red-600"
        aria-label={`${record.name} kaydını sil`}
        title="Sil"
      >
        <TrashIcon />
      </button>
    </li>
  )
}

function Section({ title, records, empty, onDelete }: { title: string; records: CareRecord[]; empty: string; onDelete: (r: CareRecord) => void }) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
        {title}
        <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-extrabold text-primary-dark">
          {records.length}
        </span>
      </h3>
      {records.length ? (
        <ul className="space-y-3">
          {records.map((r) => (
            <RecordRow key={r.id} record={r} onDelete={() => onDelete(r)} />
          ))}
        </ul>
      ) : (
        <p className="rounded-[18px] border-2 border-dashed border-line px-4 py-5 text-center text-sm text-muted">{empty}</p>
      )}
    </section>
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
    <div className="space-y-6">
      <button onClick={onBack} className="text-sm font-bold text-primary-dark hover:underline">
        ← Hayvanlarım
      </button>

      <div className={`${cardClass} flex flex-wrap items-center justify-between gap-4 p-6`}>
        <PetSummary pet={pet} large />
        {!adding && <PrimaryButton onClick={() => setAdding(true)}>+ Kayıt Ekle</PrimaryButton>}
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

      <Section title="Yaklaşan" records={upcoming} empty="Planlanmış uygulama yok." onDelete={del} />
      <Section title="Geçmiş" records={past} empty="Henüz geçmiş kayıt yok." onDelete={del} />
    </div>
  )
}
