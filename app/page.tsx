import { SiteHeader } from '@/components/site-header'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Contact } from '@/components/contact'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6">
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-2 border-t pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Jordan Lee</span>
          <span>Designed &amp; built in Oakland, CA</span>
        </div>
      </footer>
    </>
  )
}
