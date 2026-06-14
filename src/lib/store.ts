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

export function seedLektionen(): void {
  if (getLektionen().length > 0) return
  saveLektionen([
    {
      id: 'lektion-1',
      name: 'Zahlen',
      vokabeln: [
        { id: 'v-1-1', deutsch: 'eins', italienisch: 'uno', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-1-2', deutsch: 'zwei', italienisch: 'due', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-1-3', deutsch: 'drei', italienisch: 'tre', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-1-4', deutsch: 'vier', italienisch: 'quattro', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-1-5', deutsch: 'fünf', italienisch: 'cinque', leitnerStufe: 1, letzteAbfrage: null },
      ],
    },
    {
      id: 'lektion-2',
      name: 'Farben',
      vokabeln: [
        { id: 'v-2-1', deutsch: 'rot', italienisch: 'rosso', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-2-2', deutsch: 'blau', italienisch: 'blu', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-2-3', deutsch: 'grün', italienisch: 'verde', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-2-4', deutsch: 'gelb', italienisch: 'giallo', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-2-5', deutsch: 'weiß', italienisch: 'bianco', leitnerStufe: 1, letzteAbfrage: null },
      ],
    },
    {
      id: 'lektion-3',
      name: 'Familie',
      vokabeln: [
        { id: 'v-3-1', deutsch: 'Mutter', italienisch: 'madre', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-3-2', deutsch: 'Vater', italienisch: 'padre', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-3-3', deutsch: 'Bruder', italienisch: 'fratello', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-3-4', deutsch: 'Schwester', italienisch: 'sorella', leitnerStufe: 1, letzteAbfrage: null },
        { id: 'v-3-5', deutsch: 'Sohn', italienisch: 'figlio', leitnerStufe: 1, letzteAbfrage: null },
      ],
    },
  ])
}
