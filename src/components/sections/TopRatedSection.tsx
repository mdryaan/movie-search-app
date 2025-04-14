'use client'

import { useTopRatedMovies } from '@/hooks/useMovies'
import { MovieRow } from '@/components/ui/MovieRow'
import { MovieRowSkeleton } from '@/components/ui/MovieCardSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'

export function TopRatedSection() {
  const { movies, loading, error } = useTopRatedMovies()

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gold rounded-full" />
        <h2 className="text-2xl font-bold text-white">Top Rated</h2>
        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      {loading && <MovieRowSkeleton count={8} />}
      {error && <ErrorState message={error} />}
      {!loading && !error && <MovieRow movies={movies} />}
    </section>
  )
}
