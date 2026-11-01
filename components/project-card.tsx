'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLLIElement>(null)

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
      className="group relative overflow-hidden rounded-xl border bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--signal) 12%, transparent), transparent 70%)',
        }}
      />
      <Link
        href={`/projects/${project.slug}`}
        className="relative z-20 flex flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal"
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
            className="flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-primary-foreground"
            aria-hidden="true"
          >
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </li>
  )
}
