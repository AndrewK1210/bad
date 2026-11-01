'use client'

import { useRef } from 'react'

export function CrosshairField({ children }: { children: React.ReactNode }) {
  const fieldRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)

  function updatePosition(e: React.PointerEvent<HTMLDivElement>) {
    const el = fieldRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--cx', `${x}px`)
    el.style.setProperty('--cy', `${y}px`)
    el.dataset.active = 'true'
    if (readoutRef.current) {
      const nx = (x / rect.width).toFixed(3)
      const ny = (1 - y / rect.height).toFixed(3)
      readoutRef.current.textContent = `X ${nx}  Y ${ny}`
    }
  }

  function reset() {
    const el = fieldRef.current
    if (!el) return
    el.style.removeProperty('--cx')
    el.style.removeProperty('--cy')
    el.dataset.active = 'false'
    if (readoutRef.current) readoutRef.current.textContent = 'X 0.720  Y 0.580'
  }

  return (
    <div
      ref={fieldRef}
      data-active="false"
      onPointerMove={updatePosition}
      onPointerLeave={reset}
      className="group/field relative overflow-hidden rounded-xl border bg-card [--cx:72%] [--cy:42%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 h-px bg-signal/50 transition-[top] duration-500 ease-out group-data-[active=true]/field:duration-0"
          style={{ top: 'var(--cy)' }}
        />
        <div
          className="absolute inset-y-0 w-px bg-signal/50 transition-[left] duration-500 ease-out group-data-[active=true]/field:duration-0"
          style={{ left: 'var(--cx)' }}
        />
        <div
          className="absolute size-10 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-500 ease-out group-data-[active=true]/field:duration-0"
          style={{ left: 'var(--cx)', top: 'var(--cy)' }}
        >
          <span className="absolute inset-0 rounded-full border border-signal" />
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
          <span className="absolute inset-0 animate-ping rounded-full border border-signal/40 group-data-[active=true]/field:hidden motion-reduce:hidden" />
        </div>
      </div>

      <span
        ref={readoutRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 whitespace-pre font-mono text-[11px] tabular-nums text-signal"
      >
        X 0.720  Y 0.580
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 font-mono text-[11px] text-muted-foreground"
      >
        Move cursor to calibrate
      </span>

      <div className="relative">{children}</div>
    </div>
  )
}
