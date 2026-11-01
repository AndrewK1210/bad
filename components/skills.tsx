import { SectionHeading } from '@/components/section-heading'

const groups = [
  {
    title: 'Mechanical',
    items: ['SolidWorks', 'Fusion 360', 'ANSYS FEA', 'GD&T', 'CNC & 3D printing', 'Sheet metal'],
  },
  {
    title: 'Electrical',
    items: ['KiCad', 'Altium', 'LTspice', 'Motor control', 'Power electronics', 'Oscilloscopes'],
  },
  {
    title: 'Software',
    items: ['C / C++', 'Rust', 'Python', 'TypeScript', 'ROS 2', 'FreeRTOS'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Linux', 'MATLAB / Simulink', 'Docker', 'Jira', 'Notion'],
  },
]

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24">
      <SectionHeading index="03" title="Skills & Tools" id="skills-title" />
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.title} className="bg-background p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm transition-transform hover:translate-x-1"
                >
                  <span className="size-1 rounded-full bg-signal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
