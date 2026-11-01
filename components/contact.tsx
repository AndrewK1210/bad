'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const EMAIL = 'hello@jordanlee.dev'

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Resume (PDF)', href: '#' },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24">
      <SectionHeading index="04" title="Contact" id="contact-title" />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="max-w-xl text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Have a hard problem with moving parts? Let&apos;s talk.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-signal"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors hover:border-foreground/40"
            >
              {copied ? (
                <Check className="size-4 text-signal" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
              {copied ? 'Copied' : 'Copy'}
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email copied to clipboard' : ''}
              </span>
            </button>
          </div>
        </div>
        <ul className="flex flex-col border-t">
          {socials.map((s) => (
            <li key={s.label} className="border-b">
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex items-center justify-between py-4 text-sm"
              >
                <span className="transition-transform group-hover:translate-x-1">{s.label}</span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
