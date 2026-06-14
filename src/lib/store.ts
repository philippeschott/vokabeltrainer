export interface Vokabel {
  id: string
  deutsch: string
  italienisch: string
  leitnerStufe: number
  letzteAbfrage: string | null
}

export interface Lektion {
  id: string
  name: string
  vokabeln: Vokabel[]
}

export interface WochenStats {
  richtig: number
  falsch: number
  tage: Set<string>
}

const LEKTIONEN_KEY = 'lektionen'
const WOCHEN_STATS_KEY = 'wochenStats'

export function getLektionen(): Lektion[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LEKTIONEN_KEY)
    return raw ? (JSON.parse(raw) as Lektion[]) : []
  } catch {
    return []
  }
}

export function saveLektionen(lektionen: Lektion[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LEKTIONEN_KEY, JSON.stringify(lektionen))
}

export function getWochenStats(): WochenStats {
  if (typeof window === 'undefined') return { richtig: 0, falsch: 0, tage: new Set() }
  try {
    const raw = localStorage.getItem(WOCHEN_STATS_KEY)
    if (!raw) return { richtig: 0, falsch: 0, tage: new Set() }
    const parsed = JSON.parse(raw) as { richtig: number; falsch: number; tage: string[] }
    return { ...parsed, tage: new Set(parsed.tage) }
  } catch {
    return { richtig: 0, falsch: 0, tage: new Set() }
  }
}

export function saveWochenStats(stats: WochenStats): void {
  if (typeof window === 'undefined') return
  const toStore = { ...stats, tage: Array.from(stats.tage) }
  localStorage.setItem(WOCHEN_STATS_KEY, JSON.stringify(toStore))
}
