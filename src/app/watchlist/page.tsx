'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useWatchlist } from '@/hooks/useWatchlist'
import { getPosterUrl } from '@/lib/tmdb'
import { formatRating, formatYear, getRatingColor } from '@/lib/utils'
import { GENRES } from '@/lib/constants'
import { EmptyState } from '@/components/ui/ErrorState'
import { MovieCard } from '@/components/ui/MovieCard'
import { MovieCardSkeleton } from '@/components/ui/MovieCardSkeleton'
import { WatchlistButton } from '@/components/ui/WatchlistButton'
import { RatingStars } from '@/components/ui/RatingStars'

function ListItemPoster({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <div className="relative w-16 h-24 rounded-xl overflow-hidden flex-none">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        onError={() => setImgSrc('/placeholder.png')}
      />
    </div>
  )
}

export default function WatchlistPage() {
  const { watchlist, isLoaded, count } = useWatchlist()
  const [view, setView] = useState<'grid' | 'list'>('grid')

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-48 bg-surface shimmer rounded-lg mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">My Watchlist</h1>
            {count > 0 && (
              <p className="text-gray-500 text-sm mt-1">
                {count} {count === 1 ? 'movie' : 'movies'} saved
              </p>
            )}
          </div>

          {count > 0 && (
            <div className="flex items-center gap-1 glass border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setView('grid')}
                title="Grid view"
                className={`p-2 rounded-lg transition-all duration-200 ${
                  view === 'grid' ? 'bg-white/15 text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setView('list')}
                title="List view"
                className={`p-2 rounded-lg transition-all duration-200 ${
                  view === 'list' ? 'bg-white/15 text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {count === 0 ? (
          <EmptyState
            title="Your watchlist is empty"
            message="Start adding movies you want to watch. Browse trending films or search for something specific."
            icon={
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            }
          />
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlist.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} priority={index < 6} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {watchlist.map((movie) => {
              const genres = movie.genre_ids.slice(0, 3).map((id) => GENRES[id]).filter((g): g is string => Boolean(g))
              return (
                <div
                  key={movie.id}
                  className="flex items-center gap-4 glass border border-white/5 rounded-2xl p-4 hover:border-white/15 transition-all duration-200 group"
                >
                  <Link href={`/movie/${movie.id}`} className="flex-none">
                    <ListItemPoster
                      src={getPosterUrl(movie.poster_path, 'w185')}
                      alt={movie.title}
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/movie/${movie.id}`}>
                      <h3 className="text-white font-bold text-base leading-tight line-clamp-1 hover:text-accent transition-colors">
                        {movie.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 mt-1 mb-2">
                      <span className="text-gray-500 text-sm">{formatYear(movie.release_date)}</span>
                      <RatingStars rating={movie.vote_average} size="sm" />
                      <span className={`text-sm font-bold ${getRatingColor(movie.vote_average)}`}>
                        {formatRating(movie.vote_average)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {genres.map((genre) => (
                        <span key={genre} className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded-full border border-white/8">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-none">
                    <WatchlistButton movie={movie} />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {count > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 glass border border-white/15 hover:border-white/30 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 hover:bg-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Discover More Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
