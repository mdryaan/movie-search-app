'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '@/types/movie'
import { getBackdropUrl } from '@/lib/tmdb'
import { formatRating, formatYear, truncateText } from '@/lib/utils'
import { GENRES } from '@/lib/constants'
import { WatchlistButton } from './WatchlistButton'
import { RatingStars } from './RatingStars'

interface HeroSectionProps {
  movie: Movie
}

export function HeroSection({ movie }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false)

  const genreNames = movie.genre_ids
    .slice(0, 3)
    .map((id) => GENRES[id])
    .filter(Boolean)

  return (
    <div className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageError ? '/placeholder.png' : getBackdropUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          priority
          className="object-cover object-center"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute bottom-0 left-0 right-0 h-48 hero-bottom-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      <div className="relative h-full flex flex-col justify-end pb-16 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent/20 text-accent border border-accent/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Trending Now
              </span>
              <span className="text-gray-400 text-sm">{formatYear(movie.release_date)}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight text-shadow mb-4">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <RatingStars rating={movie.vote_average} />
              <span className="text-gray-300 text-sm font-medium">
                {formatRating(movie.vote_average)}/10
              </span>
              <span className="text-gray-500 text-sm">({movie.vote_count.toLocaleString()} votes)</span>
            </div>

            {genreNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {genreNames.map((genre) => (
                  <span
                    key={genre}
                    className="glass text-gray-200 text-xs font-medium px-3 py-1 rounded-full border border-white/10"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-300 text-base leading-relaxed mb-8 text-shadow-sm">
              {truncateText(movie.overview, 200)}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                View Details
              </Link>

              <WatchlistButton movie={movie} variant="hero" />

              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 glass glass-hover border border-white/15 text-white font-medium px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
