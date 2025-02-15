'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Browse' },
  { href: '/watchlist', label: 'My List' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            pathname === link.href
              ? 'text-white bg-white/10'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
