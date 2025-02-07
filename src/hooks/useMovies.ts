'use client'

import { useState, useEffect } from 'react'
import { Movie, MovieDetails } from '@/types/movie'
import { MovieDetailsResponse } from '@/types/api'
import { getPopular, getTopRated, getNowPlaying, getMovieDetails } from '@/lib/tmdb'

interface UseMoviesState {
  movies: Movie[]
  loading: boolean
  error: string | null
}

interface UseMovieDetailsState {
  movie: MovieDetailsResponse | null
  loading: boolean
  error: string | null
}

export function usePopularMovies(page = 1): UseMoviesState {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    getPopular(page)
      .then((data) => setState({ movies: data.results, loading: false, error: null }))
      .catch((err: Error) => setState({ movies: [], loading: false, error: err.message }))
  }, [page])

  return state
}

export function useTopRatedMovies(page = 1): UseMoviesState {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    getTopRated(page)
      .then((data) => setState({ movies: data.results, loading: false, error: null }))
      .catch((err: Error) => setState({ movies: [], loading: false, error: err.message }))
  }, [page])

  return state
}

export function useNowPlayingMovies(page = 1): UseMoviesState {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    getNowPlaying(page)
      .then((data) => setState({ movies: data.results, loading: false, error: null }))
      .catch((err: Error) => setState({ movies: [], loading: false, error: err.message }))
  }, [page])

  return state
}

export function useMovieDetails(id: number): UseMovieDetailsState {
  const [state, setState] = useState<UseMovieDetailsState>({
    movie: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!id) return
    setState((prev) => ({ ...prev, loading: true, error: null }))
    getMovieDetails(id)
      .then((data) => setState({ movie: data, loading: false, error: null }))
      .catch((err: Error) => setState({ movie: null, loading: false, error: err.message }))
  }, [id])

  return state
}
