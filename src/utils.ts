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
