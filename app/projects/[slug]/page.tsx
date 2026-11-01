import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { CaseSection } from '@/components/case-section'
import { getProject, projects } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: `${project.title} — Jordan Lee`, description: project.summary }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  const meta = [
    { label: 'Year', value: project.year },
    { label: 'Duration', value: project.duration },
    { label: 'Team', value: project.team },
    { label: 'Disciplines', value: project.disciplines.join(', ') },
  ]

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24">
        <Link
          href="/#projects"
          className="group mt-8 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-10">
          <p className="font-mono text-xs text-signal">
            Project {String(index + 1).padStart(2, '0')}
          </p>
          <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">{project.summary}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-card p-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1.5 text-sm">{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
          <Image
            src={project.image || '/placeholder.svg'}
            alt={project.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-16 flex flex-col gap-16">
          <CaseSection index="01" title="Problem or goal">
            <div className="flex flex-col gap-4">
              {project.goal.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </CaseSection>

          <CaseSection index="02" title="My role">
            <p>{project.role.summary}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {project.role.contributions.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection index="03" title="Design decisions">
            <div className="flex flex-col gap-6">
              {project.decisions.map((d) => (
                <div key={d.title} className="border-l-2 border-signal/40 pl-5">
                  <h3 className="font-medium text-foreground">{d.title}</h3>
                  <p className="mt-2">{d.detail}</p>
                </div>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Tools used">
              {project.stack.map((s) => (
                <li key={s} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection index="04" title="What went wrong & how I fixed it">
            <div className="flex flex-col gap-6">
              {project.debugging.map((d) => (
                <div key={d.problem} className="overflow-hidden rounded-lg border bg-card">
                  <p className="border-b bg-muted/50 px-5 py-3 font-medium text-foreground">{d.problem}</p>
                  <dl className="flex flex-col gap-4 p-5">
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        Investigation
                      </dt>
                      <dd className="mt-1.5">{d.investigation}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-signal">Fix</dt>
                      <dd className="mt-1.5">{d.fix}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </CaseSection>

          <CaseSection index="05" title="Result">
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border bg-border">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-card p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-xl font-medium tabular-nums tracking-tight text-foreground sm:text-2xl">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6">{project.result.summary}</p>
            <h3 className="mt-6 font-mono text-[11px] uppercase tracking-wider text-foreground">
              What I&apos;d change next time
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {project.result.nextTime.map((n) => (
                <li key={n} className="flex gap-3">
                  <span className="font-mono text-signal" aria-hidden="true">
                    →
                  </span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group/link inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            )}
          </CaseSection>

          <CaseSection index="06" title="Visuals">
            <div className="grid gap-6 sm:grid-cols-2">
              {project.visuals.map((v) => (
                <figure key={v.src}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={v.src || '/placeholder.svg'}
                      alt={v.alt}
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs">{v.caption}</figcaption>
                </figure>
              ))}
            </div>
          </CaseSection>
        </div>

        <Link
          href={`/projects/${next.slug}`}
          className="group mt-24 flex items-center justify-between gap-4 border-t pt-8"
        >
          <span>
            <span className="block font-mono text-xs text-muted-foreground">Next project</span>
            <span className="mt-1 block text-2xl font-medium tracking-tight transition-colors group-hover:text-signal">
              {next.title}
            </span>
          </span>
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </main>
    </>
  )
}
