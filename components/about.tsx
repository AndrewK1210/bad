import { ArrowDownRight } from 'lucide-react'

const facts = [
  { label: 'Focus', value: 'Robotics, embedded systems' },
  { label: 'Currently', value: 'Controls Engineer @ Kinetic Labs' },
  { label: 'Education', value: 'B.S. Mechatronics, UC Davis' },
  { label: 'Based in', value: 'Oakland, CA' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="pb-24 pt-20 sm:pt-28">
      <p className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-signal" />
        </span>
        Open to new roles — 2026
      </p>
      <h1
        id="about-title"
        className="max-w-3xl text-balance text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl"
      >
        I&apos;m Alex — an engineer who builds machines that sense, think, and move.
      </h1>
      <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
          <p>
            I work at the intersection of mechanical design, electronics, and software. Most of my
            projects start as a sketch on a whiteboard and end as a working prototype — with a lot
            of iteration, test data, and the occasional magic smoke in between.
          </p>
          <p>
            I care about systems that are simple to reason about, easy to repair, and honest about
            their tolerances. Currently I&apos;m designing motion control for warehouse robotics.
          </p>
          <a
            href="#projects"
            className="group mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground"
          >
            See selected work
            <ArrowDownRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
        <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-lg border bg-border">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-card p-4">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
