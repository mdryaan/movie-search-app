import { Movie, MovieDetails, Credits, Video, Genre } from './movie'

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type MovieListResponse = PaginatedResponse<Movie>

export interface MovieDetailsResponse extends MovieDetails {
  credits: Credits
  videos: { results: Video[] }
  similar: PaginatedResponse<Movie>
  recommendations: PaginatedResponse<Movie>
}

export interface GenreListResponse {
  genres: Genre[]
}

export interface SearchParams {
  query: string
  page?: number
  include_adult?: boolean
  language?: string
  year?: number
}

export interface DiscoverParams {
  page?: number
  sort_by?: string
  with_genres?: string
  language?: string
  include_adult?: boolean
  include_video?: boolean
  primary_release_year?: number
  'vote_average.gte'?: number
}

export type TimeWindow = 'day' | 'week'

export interface ApiError {
  status_message: string
  status_code: number
  success: false
}
