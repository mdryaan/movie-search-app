'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePopularMovies } from '@/hooks/useMovies'
import { MovieCard } from '@/components/ui/MovieCard'
import { MovieCardSkeletonGrid } from '@/components/ui/MovieCardSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'

interface PopularSectionProps {
  selectedGenre?: number | null
}

export function PopularSection({ selectedGenre }: PopularSectionProps) {
  const { movies, loading, error } = usePopularMovies()

  const filteredMovies = selectedGenre
    ? movies.filter((m) => m.genre_ids.includes(selectedGenre))
    : movies

  const displayMovies = filteredMovies.slice(0, 12)

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-blue-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white">Popular Now</h2>
        </div>
        <Link
          href="/search"
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          View all
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {loading && <MovieCardSkeletonGrid count={12} />}
      {error && <ErrorState message={error} />}
      {!loading && !error && (
        <>
          {displayMovies.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No movies found for this genre.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {displayMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} priority={index < 6} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
