export function ageText(birthDate: string) {
  const b = new Date(birthDate)
  const n = new Date()
  let months = (n.getFullYear() - b.getFullYear()) * 12 + (n.getMonth() - b.getMonth())
  if (n.getDate() < b.getDate()) months--
  if (months < 1) return '1 aydan küçük'
  if (months < 12) return `${months} aylık`
  const y = Math.floor(months / 12)
  const m = months % 12
  return m ? `${y} yaş ${m} ay` : `${y} yaşında`
}

/** Yerel saate göre bugünün tarihi (YYYY-MM-DD). */
export function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Bugünden verilen tarihe kaç gün var (geçmişse negatif). */
export function daysUntil(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  const [ty, tm, td] = todayISO().split('-').map(Number)
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(ty, tm - 1, td)) / 86_400_000)
}

export function formatDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function whenText(days: number) {
  if (days === 0) return 'Bugün'
  if (days === 1) return 'Yarın'
  if (days > 0) return `${days} gün sonra`
  return `${-days} gün önce`
}
