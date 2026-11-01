export function CaseSection({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: React.ReactNode
}) {
  const id = `section-${index}`
  return (
    <section aria-labelledby={id} className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-10">
      <div className="md:sticky md:top-24 md:self-start">
        <span className="font-mono text-xs text-signal">{index}</span>
        <h2 id={id} className="mt-1 text-sm font-medium uppercase tracking-widest">
          {title}
        </h2>
      </div>
      <div className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}
