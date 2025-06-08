'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/types/movie'
import { MovieDetailsResponse } from '@/types/api'
import { getPopular, getTopRated, getNowPlaying, getMovieDetails } from '@/lib/tmdb'

interface MoviesState {
  movies: Movie[]
  loading: boolean
  error: string | null
}

interface MovieDetailsState {
  movie: MovieDetailsResponse | null
  loading: boolean
  error: string | null
}

function useMovieList(fetcher: (page: number) => Promise<{ results: Movie[] }>, page: number): MoviesState {
  const [state, setState] = useState<MoviesState>({ movies: [], loading: true, error: null })

  useEffect(() => {
    setState({ movies: [], loading: true, error: null })
    fetcher(page)
      .then((data) => setState({ movies: data.results, loading: false, error: null }))
      .catch((err: Error) => setState({ movies: [], loading: false, error: err.message }))
  }, [fetcher, page])

  return state
}

export function usePopularMovies(page = 1): MoviesState {
  return useMovieList(getPopular, page)
}

export function useTopRatedMovies(page = 1): MoviesState {
  return useMovieList(getTopRated, page)
}

export function useNowPlayingMovies(page = 1): MoviesState {
  return useMovieList(getNowPlaying, page)
}

export function useMovieDetails(id: number): MovieDetailsState {
  const [state, setState] = useState<MovieDetailsState>({ movie: null, loading: true, error: null })

  useEffect(() => {
    if (!id) return
    setState({ movie: null, loading: true, error: null })
    getMovieDetails(id)
      .then((data) => setState({ movie: data, loading: false, error: null }))
      .catch((err: Error) => setState({ movie: null, loading: false, error: err.message }))
  }, [id])

  return state
}
