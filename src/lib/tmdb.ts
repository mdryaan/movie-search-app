import {
  MovieListResponse,
  MovieDetailsResponse,
  GenreListResponse,
  SearchParams,
  DiscoverParams,
  TimeWindow,
} from '@/types/api'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

async function fetchTMDB<T>(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY ?? '')
  url.searchParams.set('language', 'en-US')

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export async function getTrending(timeWindow: TimeWindow = 'week', page = 1): Promise<MovieListResponse> {
  return fetchTMDB<MovieListResponse>(`/trending/movie/${timeWindow}`, { page })
}

export async function getPopular(page = 1): Promise<MovieListResponse> {
  return fetchTMDB<MovieListResponse>('/movie/popular', { page })
}

export async function getTopRated(page = 1): Promise<MovieListResponse> {
  return fetchTMDB<MovieListResponse>('/movie/top_rated', { page })
}

export async function getNowPlaying(page = 1): Promise<MovieListResponse> {
  return fetchTMDB<MovieListResponse>('/movie/now_playing', { page })
}

export async function getUpcoming(page = 1): Promise<MovieListResponse> {
  return fetchTMDB<MovieListResponse>('/movie/upcoming', { page })
}

export async function getMovieDetails(id: number): Promise<MovieDetailsResponse> {
  return fetchTMDB<MovieDetailsResponse>(`/movie/${id}`, {
    append_to_response: 'credits,videos,similar,recommendations',
  })
}

export async function searchMovies(params: SearchParams): Promise<MovieListResponse> {
  const { query, page = 1, include_adult = false, year } = params
  const searchParams: Record<string, string | number | boolean> = {
    query,
    page,
    include_adult,
  }
  if (year) searchParams.year = year
  return fetchTMDB<MovieListResponse>('/search/movie', searchParams)
}

export async function discoverMovies(params: DiscoverParams): Promise<MovieListResponse> {
  const { page = 1, sort_by = 'popularity.desc', with_genres, ...rest } = params
  const searchParams: Record<string, string | number | boolean> = {
    page,
    sort_by,
    include_adult: false,
    include_video: false,
    ...rest,
  }
  if (with_genres) searchParams.with_genres = with_genres
  return fetchTMDB<MovieListResponse>('/discover/movie', searchParams)
}

export async function getGenres(): Promise<GenreListResponse> {
  return fetchTMDB<GenreListResponse>('/genre/movie/list')
}

export function getPosterUrl(path: string | null, size = 'w342'): string {
  if (!path) return '/placeholder.png'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function getBackdropUrl(path: string | null, size = 'w1280'): string {
  if (!path) return '/placeholder.png'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function getProfileUrl(path: string | null, size = 'w185'): string {
  if (!path) return '/placeholder.png'
  return `https://image.tmdb.org/t/p/${size}${path}`
}
