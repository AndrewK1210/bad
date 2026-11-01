const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#about" className="flex items-center gap-2 font-mono text-sm">
          <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
          <span className="hidden sm:inline">alex.rivera</span>
          <span className="sr-only sm:hidden">Alex Rivera, home</span>
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-3"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
