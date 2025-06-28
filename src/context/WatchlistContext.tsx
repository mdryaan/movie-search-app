'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { WatchlistMovie, Movie } from '@/types/movie'
import { WATCHLIST_STORAGE_KEY } from '@/lib/constants'

interface WatchlistContextValue {
  watchlist: WatchlistMovie[]
  isLoaded: boolean
  count: number
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
  toggleWatchlist: (movie: Movie) => void
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY)
      if (stored) {
        setWatchlist(JSON.parse(stored) as WatchlistMovie[])
      }
    } catch {
      setWatchlist([])
    }
    setIsLoaded(true)
  }, [])

  const saveToStorage = useCallback((items: WatchlistMovie[]) => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage quota exceeded
    }
  }, [])

  const addToWatchlist = useCallback(
    (movie: Movie) => {
      setWatchlist((prev) => {
        if (prev.some((m) => m.id === movie.id)) return prev
        const normalized: Movie = {
          ...movie,
          genre_ids:
            movie.genre_ids?.length
              ? movie.genre_ids
              : ((movie as unknown as { genres?: { id: number }[] }).genres ?? []).map((g) => g.id),
        }
        const updated = [{ ...normalized, addedAt: Date.now() }, ...prev]
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  const removeFromWatchlist = useCallback(
    (movieId: number) => {
      setWatchlist((prev) => {
        const updated = prev.filter((m) => m.id !== movieId)
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  const isInWatchlist = useCallback(
    (movieId: number): boolean => {
      return watchlist.some((m) => m.id === movieId)
    },
    [watchlist]
  )

  const toggleWatchlist = useCallback(
    (movie: Movie) => {
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id)
      } else {
        addToWatchlist(movie)
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  )

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        isLoaded,
        count: watchlist.length,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider')
  return ctx
}
