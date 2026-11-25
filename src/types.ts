export type Species = 'Kedi' | 'Köpek' | 'Diğer'

export type CareType = 'Aşı' | 'İç parazit' | 'Dış parazit'

export interface CareRecord {
  id: string
  type: CareType
  name: string
  date: string // YYYY-MM-DD
}

export interface Pet {
  id: string
  name: string
  species: Species
  birthDate: string // YYYY-MM-DD
  weightKg: number
  records: CareRecord[]
}
