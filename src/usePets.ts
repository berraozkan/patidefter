import { useEffect, useState } from 'react'
import type { Pet } from './types'

const STORAGE_KEY = 'patidefter.pets'

function load(): Pet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Pet[]) : []
  } catch {
    return []
  }
}

/** Hayvan listesini tutar ve her değişiklikte localStorage'a kaydeder. */
export function usePets() {
  const [pets, setPets] = useState<Pet[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pets))
    } catch {
      // depolama kapalıysa uygulama yine de bellekte çalışır
    }
  }, [pets])

  return [pets, setPets] as const
}

export const newId = () => crypto.randomUUID()
