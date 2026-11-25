import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { CareType } from '../types'

export function PawIcon({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <ellipse cx="5" cy="11.5" rx="1.9" ry="2.4" />
      <ellipse cx="8.6" cy="7" rx="2" ry="2.6" />
      <ellipse cx="15.4" cy="7" rx="2" ry="2.6" />
      <ellipse cx="19" cy="11.5" rx="1.9" ry="2.4" />
      <path d="M12 11c-3 0-6 3.5-6 6.2C6 19 7.3 20 9 20c1.2 0 2-.6 3-.6s1.8.6 3 .6c1.7 0 3-1 3-2.8C18 14.5 15 11 12 11z" />
    </svg>
  )
}

export function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
    </svg>
  )
}

export function PrimaryButton({ children, className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`rounded-full bg-primary px-5 py-3 text-[15px] font-bold text-white shadow-button transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      {children}
    </button>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-canvas px-2.5 py-0.5 text-xs font-semibold text-muted">{children}</span>
}

const pillStyle: Record<CareType, string> = {
  Aşı: 'bg-asi-soft text-asi',
  'İç parazit': 'bg-ic-soft text-ic',
  'Dış parazit': 'bg-dis-soft text-dis',
}

export function TypePill({ type }: { type: CareType }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${pillStyle[type]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {type}
    </span>
  )
}
