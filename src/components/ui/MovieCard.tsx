'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '@/types/movie'
import { getPosterUrl } from '@/lib/tmdb'
import { formatRating, formatYear, truncateText, getRatingColor } from '@/lib/utils'
import { GENRES } from '@/lib/constants'
import { WatchlistButton } from './WatchlistButton'

interface MovieCardProps {
  movie: Movie
  priority?: boolean
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)

  const primaryGenre = movie.genre_ids[0] ? GENRES[movie.genre_ids[0]] : null
  const ratingColor = getRatingColor(movie.vote_average)

  return (
    <Link href={`/movie/${movie.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden bg-surface-elevated border border-white/5 card-glow cursor-pointer">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={imageError ? '/placeholder.png' : getPosterUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={priority}
            onError={() => setImageError(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
            <div className={`flex items-center gap-1 glass rounded-full px-2 py-1 text-xs font-bold ${ratingColor}`}>
              <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {formatRating(movie.vote_average)}
            </div>

            <div onClick={(e) => e.preventDefault()}>
              <WatchlistButton movie={movie} size="sm" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-xs leading-relaxed line-clamp-3">
              {truncateText(movie.overview, 120)}
            </p>
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-1 group-hover:text-accent transition-colors duration-200">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-gray-500 text-xs">{formatYear(movie.release_date)}</span>
            {primaryGenre && (
              <span className="text-gray-500 text-xs bg-white/5 px-2 py-0.5 rounded-full">{primaryGenre}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
