'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { cn } from '@/lib/utils'

export function ProjectCard({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project
  index: number
  open: boolean
  onToggle: () => void
}) {
  const cardRef = useRef<HTMLLIElement>(null)
  const panelId = `${project.id}-details`

  function handlePointerMove(e: React.PointerEvent<HTMLLIElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <li
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-card transition-[border-color,box-shadow] duration-300',
        'hover:border-foreground/25 hover:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)]',
        open && 'border-foreground/25 md:col-span-2',
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--signal) 10%, transparent), transparent 70%)',
        }}
      />

      <div className={cn('grid', open && 'md:grid-cols-[1fr_1.1fr]')}>
        <button
          type="button"
          onClick={() => {
            onToggle()
            if (!open) {
              requestAnimationFrame(() =>
                cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
              )
            }
          }}
          aria-expanded={open}
          aria-controls={panelId}
          className="relative z-20 flex flex-col text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2 py-0.5 font-mono text-[11px] backdrop-blur">
              {String(index).padStart(2, '0')} / {project.year}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 p-5">
            <div>
              <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Disciplines">
                {project.disciplines.map((d) => (
                  <li
                    key={d}
                    className="rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                open
                  ? 'rotate-45 border-signal bg-signal text-primary-foreground'
                  : 'group-hover:border-foreground/40',
              )}
              aria-hidden="true"
            >
              <Plus className="size-4" />
            </span>
          </div>
        </button>

        <div
          id={panelId}
          role="region"
          aria-label={`${project.title} details`}
          hidden={!open}
          className="relative z-20 border-t p-5 animate-in fade-in slide-in-from-bottom-2 duration-300 md:border-l md:border-t-0 md:p-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {project.role}
          </p>

          <dl className="mt-5 flex flex-col gap-4 text-sm leading-relaxed">
            {(
              [
                ['Problem', project.problem],
                ['Approach', project.approach],
                ['Outcome', project.outcome],
              ] as const
            ).map(([label, text]) => (
              <div key={label} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4">
                <dt className="font-mono text-xs text-signal">{label}</dt>
                <dd className="text-pretty text-muted-foreground">{text}</dd>
              </div>
            ))}
          </dl>

          <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border bg-border">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-background p-3">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-lg font-medium tabular-nums tracking-tight">{m.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tools used">
            {project.stack.map((s) => (
              <li key={s} className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group/link inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
              >
                {link.label}
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}
