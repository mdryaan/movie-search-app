import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WatchlistProvider } from '@/context/WatchlistContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CineVault — Discover Your Next Favorite Film',
  description:
    'Explore trending movies, search thousands of titles, and build your personal watchlist. Powered by TMDB.',
  keywords: ['movies', 'films', 'watchlist', 'trending', 'cinema', 'TMDB'],
  authors: [{ name: 'CineVault' }],
  openGraph: {
    title: 'CineVault — Discover Your Next Favorite Film',
    description: 'Explore trending movies, search thousands of titles, and build your personal watchlist.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-white min-h-screen flex flex-col`}>
        <WatchlistProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </WatchlistProvider>
      </body>
    </html>
  )
}
