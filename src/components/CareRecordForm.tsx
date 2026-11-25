import { useState, type FormEvent } from 'react'
import type { CareRecord, CareType } from '../types'
import { newId } from '../usePets'
import { cardClass, inputClass, labelClass } from '../styles'
import { PrimaryButton } from './ui'

interface Props {
  onSave: (record: CareRecord) => void
  onCancel: () => void
}

const suggestions: Record<CareType, string> = {
  Aşı: 'ör. Karma aşı, Kuduz',
  'İç parazit': 'ör. Milbemax',
  'Dış parazit': 'ör. Bravecto',
}

export default function CareRecordForm({ onSave, onCancel }: Props) {
  const [type, setType] = useState<CareType>('Aşı')
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return setError('Uygulamanın adını yazın.')
    if (!date) return setError('Tarih seçin.')
    onSave({ id: newId(), type, name: name.trim(), date })
  }


  return (
    <form onSubmit={handleSubmit} className={`${cardClass} space-y-5 p-6`}>
      <h3 className="text-xl font-extrabold tracking-tight">Yeni kayıt</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className={labelClass}>Tür</span>
          <select className={inputClass} value={type} onChange={(e) => setType(e.target.value as CareType)}>
            <option>Aşı</option>
            <option>İç parazit</option>
            <option>Dış parazit</option>
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>Ad</span>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder={suggestions[type]} />
        </label>
        <label className="block">
          <span className={labelClass}>Tarih</span>
          <input type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
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
