'use client'

import { useEffect, useState } from 'react'

const TIME_ZONE = 'America/Los_Angeles'

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZoneName: 'short',
})

export function LocalClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = now ? formatter.formatToParts(now) : null
  const get = (type: string) => parts?.find((p) => p.type === type)?.value ?? '--'

  return (
    <time
      dateTime={now?.toISOString()}
      className="flex items-baseline gap-1.5 font-mono text-xs tabular-nums text-muted-foreground"
    >
      <span className="text-foreground">
        {get('hour')}:{get('minute')}
        <span className="text-signal">:{get('second')}</span>
      </span>
      <span>{parts ? get('timeZoneName') : 'PT'}</span>
    </time>
  )
}
