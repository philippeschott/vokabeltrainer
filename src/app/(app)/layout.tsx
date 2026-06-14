'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconHome, IconTrophy, IconBook } from '@tabler/icons-react'

const navItems = [
  { href: '/', icon: IconHome, label: 'Home' },
  { href: '/pokal', icon: IconTrophy, label: 'Pokal' },
  { href: '/vokabeln', icon: IconBook, label: 'Vokabeln' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 pb-20">{children}</div>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-surface-muted bg-surface"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center p-4 ${
              pathname === href ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon size={28} />
          </Link>
        ))}
      </nav>
    </div>
  )
}
