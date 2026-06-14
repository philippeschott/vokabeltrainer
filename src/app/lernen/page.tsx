'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IconArrowLeft, IconCheck } from '@tabler/icons-react'
import { getLektionen, seedLektionen, type Lektion } from '@/lib/store'

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-xs ${
        checked ? 'bg-primary' : 'border border-border bg-surface-muted'
      }`}
    >
      {checked && <IconCheck size={14} className="text-primary-foreground" />}
    </span>
  )
}

export default function LernenPage() {
  const [lektionen, setLektionen] = useState<Lektion[]>([])
  const [selectedAll, setSelectedAll] = useState(true)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    seedLektionen()
    setLektionen(getLektionen())
  }, [])

  const totalVokabeln = lektionen.reduce((sum, l) => sum + l.vokabeln.length, 0)

  function handleAlleToggle() {
    setSelectedAll(true)
    setSelectedIds(new Set())
  }

  function handleLektionToggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        if (next.size === 0) {
          setSelectedAll(true)
          return new Set()
        }
      } else {
        setSelectedAll(false)
        next.add(id)
      }
      return next
    })
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center gap-3 px-6 pt-12 pb-4">
        <Link href="/" aria-label="Zurück" className="flex h-5 w-5 shrink-0 items-center justify-center">
          <IconArrowLeft size={20} className="text-muted-foreground" />
        </Link>
        <h1 className="text-title font-bold text-foreground">Was möchtest du lernen?</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <button
          onClick={handleAlleToggle}
          className="flex w-full items-center gap-3 px-6 py-3"
        >
          <Checkbox checked={selectedAll} />
          <div className="text-left">
            <p className="text-body font-semibold text-foreground">Alle Lektionen</p>
            <p className="text-caption text-muted-foreground">{totalVokabeln} Vokabeln</p>
          </div>
        </button>

        <div className="mx-6 border-t border-border" />

        {lektionen.map((lektion) => (
          <button
            key={lektion.id}
            onClick={() => handleLektionToggle(lektion.id)}
            className="flex w-full items-center gap-3 px-6 py-3"
          >
            <Checkbox checked={!selectedAll && selectedIds.has(lektion.id)} />
            <div className="text-left">
              <p className="text-body font-semibold text-foreground">{lektion.name}</p>
              <p className="text-caption text-muted-foreground">{lektion.vokabeln.length} Vokabeln</p>
            </div>
          </button>
        ))}
      </div>

      <div className="px-6 pb-6 pt-4">
        <Link
          href="/session"
          className="block rounded-xl bg-primary py-4 text-center text-label font-bold text-primary-foreground"
        >
          Weiter
        </Link>
      </div>
    </main>
  )
}
