@AGENTS.md

# Vokabeltrainer – Designsystem & Konventionen

## Designprinzipien

- **Mobile-first.** Primäres Zielgerät: Smartphone (eines 13-Jährigen).
- **Dark Mode only** (vorerst). Helles Theme später möglich, da alles über Tokens läuft.
- **Flat Design:** keine Schlagschatten, kein `box-shadow`/`drop-shadow`/`text-shadow`, keine Verläufe, keine 3D-/Glass-/Neumorphism-Effekte, kein Glow.
- Der „Pop" kommt **ausschließlich aus den Farben** gegen den fast schwarzen Hintergrund – sparsam und gezielt, nicht flächendeckend.
- Aufbau locker an **Duolingo** angelehnt (große, klare Aktionsflächen, ein Fokus pro Screen), aber visuell so reduziert wie **Airbnb**.
- **Keine dekorativen Animationen** vorerst. Tempo und Prägnanz vor Effekt.
- Es ist ein **„Arbeitsbiest":** superschnell, effizient, kurzer Tap-Flow. Im Zweifel weniger.

## Tokens = Single Source of Truth

Alle Farben, Radien und Schriftgrößen liegen in `src/app/globals.css` im `@theme`-Block.
NIE Hex-Werte oder feste px-Größen direkt im Markup hardcoden – immer die generierten
Utilities nutzen (`bg-primary`, `text-foreground`, `border-border`, `rounded-xl`,
`text-display`, `font-sans` …). Neue Werte zuerst als Token ergänzen, dann verwenden.

## Farbrollen

- `background` (fast schwarz): App-Hintergrund.
- `surface` / `surface-muted`: Karten, Eingabefelder, erhöhte Flächen.
- `foreground` (weiß) / `muted-foreground` (grau): Text bzw. Platzhalter/Sekundärtext.
- `border`: feine 1px-Trennlinien/Outlines – niemals als Schatten-Ersatz mit Glow.
- `primary` (knalliges Grün): **primäre Aktion** (z. B. „Überprüfen") UND **„richtig"**. Text darauf: `primary-foreground`.
- `error` (knalliges Rot): **„falsch"** und destruktive Aktionen. Text darauf: `error-foreground`.
- `accent-yellow | accent-teal | accent-blue | accent-purple`: poppige Akzente, **nur sparsam** für Kategorien, Leitner-Fächer, Fortschritt, Illustrationen. Nicht für Standard-UI-Flächen.

Grün ist bewusst Aktion UND „richtig" (beides positiv), Rot ist „falsch". Diese zwei sind
die wichtigsten Lern-Signalfarben – immer maximal klar und kontrastreich.

## Typografie

- Eine Schrift: **Poppins**, geladen via `next/font/google` in `layout.tsx`,
  als CSS-Variable `--font-poppins` an `--font-sans` gehängt. Poppins ist keine
  Variable Font – die genutzten Gewichte beim Laden explizit angeben
  (`weight: ["400","500","600","700","800"]`).
- Skala: `text-display` (Fragen/Hero), `text-title`, `text-body`, `text-label` (Buttons), `text-caption`.
- Gewichte: Headings/Buttons fett (700–800), Fließtext 400–500.

## Komponenten-Konventionen

- **Buttons:** primäre CTA full-width, große Tap-Fläche (Höhe ≥ 52px), `rounded-md`, fett.
  Disabled = `surface`-Fläche mit `muted-foreground`-Text.
- **Inputs:** `surface`, `rounded-md`, sichtbarer Fokus-Ring in `primary`, großzügiges Padding.
- **Karten / Hero:** `rounded-xl`, `surface`, 1px `border`.
- **Tap-Targets** immer ≥ 44px. Safe-Area-Insets auf Mobile respektieren.

## Barrierefreiheit

- Textkontrast mindestens WCAG AA.
- Sichtbare Fokus-Zustände (Tastatur).
- Richtig/Falsch **nie nur über Farbe** kommunizieren – zusätzlich Icon oder Text, wegen Farbsehschwäche.

## Verboten (vorerst)

- `box-shadow`, `drop-shadow`, `text-shadow`
- Verläufe (`linear-gradient`, `radial-gradient`)
- 3D-, Neumorphism-, Glassmorphism-Effekte, Glow
- dekorative Animationen über einfache Zustandswechsel hinaus
