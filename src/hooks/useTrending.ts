'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/types/movie'
import { TimeWindow } from '@/types/api'
import { getTrending } from '@/lib/tmdb'

interface UseTrendingState {
  movies: Movie[]
  loading: boolean
  error: string | null
}

export function useTrending(timeWindow: TimeWindow = 'week', page = 1): UseTrendingState {
  const [state, setState] = useState<UseTrendingState>({
    movies: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    getTrending(timeWindow, page)
      .then((data) => setState({ movies: data.results, loading: false, error: null }))
      .catch((err: Error) => setState({ movies: [], loading: false, error: err.message }))
  }, [timeWindow, page])

  return state
}
