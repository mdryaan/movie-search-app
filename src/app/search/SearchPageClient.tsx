'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Movie } from '@/types/movie'
import { searchMovies, discoverMovies } from '@/lib/tmdb'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchBar } from '@/components/ui/SearchBar'
import { MovieCard } from '@/components/ui/MovieCard'
import { MovieCardSkeletonGrid } from '@/components/ui/MovieCardSkeleton'
import { ErrorState, EmptyState } from '@/components/ui/ErrorState'

export function SearchPageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initialQuery)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const debouncedQuery = useDebounce(query, 400)

  const fetchMovies = useCallback(async (searchQuery: string, pageNum: number, append = false) => {
    setLoading(true)
    setError(null)
    try {
      const data = searchQuery.trim()
        ? await searchMovies({ query: searchQuery.trim(), page: pageNum })
        : await discoverMovies({ page: pageNum, sort_by: 'popularity.desc' })

      if (append) {
        setMovies((prev) => [...prev, ...data.results])
      } else {
        setMovies(data.results)
      }
      setTotalResults(data.total_results)
      setHasMore(pageNum < data.total_pages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setPage(1)
    fetchMovies(debouncedQuery, 1, false)

    if (debouncedQuery) {
      router.replace(`/search?q=${encodeURIComponent(debouncedQuery)}`, { scroll: false })
    } else {
      router.replace('/search', { scroll: false })
    }
  }, [debouncedQuery, fetchMovies, router])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchMovies(debouncedQuery, nextPage, true)
  }

  const handleSearch = useCallback((q: string) => {
    setQuery(q)
  }, [])

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2">
            {query ? (
              <>
                Results for{' '}
                <span className="text-accent">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              'Discover Movies'
            )}
          </h1>
          {totalResults > 0 && !loading && (
            <p className="text-gray-500 text-sm">
              {totalResults.toLocaleString()} {totalResults === 1 ? 'movie' : 'movies'} found
            </p>
          )}
        </div>

        <div className="mb-8 max-w-2xl">
          <SearchBar
            initialQuery={initialQuery}
            onSearch={handleSearch}
            autoFocus={!initialQuery}
            placeholder="Search for any movie..."
            size="lg"
          />
        </div>

        {error && <ErrorState message={error} onRetry={() => fetchMovies(debouncedQuery, 1, false)} />}

        {!error && (
          <>
            {movies.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                {movies.map((movie, index) => (
                  <MovieCard key={`${movie.id}-${index}`} movie={movie} priority={index < 6} />
                ))}
              </div>
            )}

            {loading && <MovieCardSkeletonGrid count={12} />}

            {!loading && movies.length === 0 && query && (
              <EmptyState
                title="No results found"
                message={`We couldn't find any movies matching "${query}". Try a different search term.`}
                icon={
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />
            )}

            {!loading && hasMore && movies.length > 0 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="flex items-center gap-2 glass border border-white/15 hover:border-white/30 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 hover:bg-white/10"
                >
                  Load More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
