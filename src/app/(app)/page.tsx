'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getWochenStats, type WochenStats } from '@/lib/store'

const EMPTY_STATS: WochenStats = { richtig: 0, falsch: 0, tage: new Set() }

export default function Home() {
  const [stats, setStats] = useState<WochenStats>(EMPTY_STATS)

  useEffect(() => {
    setStats(getWochenStats())
  }, [])

  const total = stats.richtig + stats.falsch
  const progressPct = total > 0 ? (stats.richtig / total) * 100 : 0

  return (
    <main className="flex min-h-screen flex-col bg-background px-6 pt-12 pb-32">
      <p className="text-caption text-muted-foreground">Ciao, Moritz 👋</p>
      <h1 className="text-title font-bold text-foreground">Diese Woche</h1>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <p className="text-display font-bold text-foreground">{total}</p>
        <p className="text-caption text-muted-foreground">Vokabeln gelernt</p>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="mt-4 flex gap-6">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-caption font-semibold text-foreground">{stats.richtig}</span>
            <span className="text-caption text-muted-foreground">richtig</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-error" />
            <span className="text-caption font-semibold text-foreground">{stats.falsch}</span>
            <span className="text-caption text-muted-foreground">falsch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-yellow" />
            <span className="text-caption font-semibold text-foreground">{stats.tage.size}</span>
            <span className="text-caption text-muted-foreground">Lerntage</span>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <Link
        href="/lernen"
        className="block rounded-xl bg-primary py-4 text-center text-label font-bold text-primary-foreground"
      >
        Lernen
      </Link>
    </main>
  )
}
