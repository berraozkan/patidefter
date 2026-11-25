import { useState, type FormEvent } from 'react'
import type { CareRecord, CareType } from '../types'
import { newId } from '../usePets'

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

  const input =
    'w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-amber-500 focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
      <h3 className="font-semibold">Yeni kayıt</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Tür</span>
          <select className={input} value={type} onChange={(e) => setType(e.target.value as CareType)}>
            <option>Aşı</option>
            <option>İç parazit</option>
            <option>Dış parazit</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Ad</span>
          <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder={suggestions[type]} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Tarih</span>
          <input type="date" className={input} value={date} onChange={(e) => setDate(e.target.value)} />
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
