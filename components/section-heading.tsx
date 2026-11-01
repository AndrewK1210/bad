export function SectionHeading({
  index,
  title,
  id,
}: {
  index: string
  title: string
  id: string
}) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-b pb-4">
      <span className="font-mono text-xs text-signal">{index}</span>
      <h2 id={id} className="text-sm font-medium uppercase tracking-widest">
        {title}
      </h2>
    </div>
  )
}
