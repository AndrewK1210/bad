'use client'

import { useState } from 'react'
import { projects, type Discipline } from '@/lib/projects'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const filters: ('All' | Discipline)[] = ['All', 'Hardware', 'Software', 'Mechanical']

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')

  const visible =
    filter === 'All' ? projects : projects.filter((p) => p.disciplines.includes(filter))

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24">
      <SectionHeading index="02" title="Selected Projects" id="projects-title" />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Open a project for the full technical write-up.</p>
        <div role="group" aria-label="Filter projects by discipline" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count =
              f === 'All' ? projects.length : projects.filter((p) => p.disciplines.includes(f)).length
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border px-3 py-1 font-mono text-xs transition-colors',
                  filter === f
                    ? 'border-foreground bg-foreground text-background'
                    : 'text-muted-foreground hover:border-foreground/40 hover:text-foreground',
                )}
              >
                {f} <span className="opacity-60">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} index={projects.indexOf(project) + 1} />
        ))}
      </ul>
    </section>
  )
}
