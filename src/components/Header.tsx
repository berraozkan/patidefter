import type { ReactNode } from 'react'
import { PawIcon } from './ui'

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <header className="bg-gradient-to-b from-primary-soft to-canvas">
      <div className={`mx-auto max-w-3xl px-4 pt-7 ${children ? 'pb-10' : 'pb-7'}`}>
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary text-white">
            <PawIcon className="size-[26px]" />
          </span>
          <div>
            <p className="text-2xl leading-tight font-extrabold tracking-tight">PatiDefter</p>
            <p className="text-[13px] text-muted">Evcil hayvan sağlık defteri</p>
          </div>
        </div>
        {children && <div className="mt-8 space-y-5">{children}</div>}
      </div>
    </header>
  )
}
