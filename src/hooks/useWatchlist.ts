'use client'

import { useState, useEffect, useCallback } from 'react'
import { WatchlistMovie, Movie } from '@/types/movie'
import { WATCHLIST_STORAGE_KEY } from '@/lib/constants'

export function useWatchlist() {
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
        const updated = [{ ...movie, addedAt: Date.now() }, ...prev]
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

  return {
    watchlist,
    isLoaded,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    count: watchlist.length,
  }
}
