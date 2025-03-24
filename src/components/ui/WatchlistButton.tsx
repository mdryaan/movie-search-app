'use client'

import { Movie } from '@/types/movie'
import { useWatchlist } from '@/hooks/useWatchlist'
import { cn } from '@/lib/utils'

interface WatchlistButtonProps {
  movie: Movie
  variant?: 'default' | 'hero' | 'detail'
  size?: 'sm' | 'md' | 'lg'
}

export function WatchlistButton({ movie, variant = 'default', size = 'md' }: WatchlistButtonProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const inWatchlist = isInWatchlist(movie.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWatchlist(movie)
  }

  if (size === 'sm') {
    return (
      <button
        onClick={handleClick}
        title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200',
          inWatchlist
            ? 'bg-accent text-white hover:bg-accent/80'
            : 'glass border border-white/20 text-white hover:bg-white/20'
        )}
      >
        {inWatchlist ? (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>
    )
  }

  if (variant === 'hero') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center gap-2 font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border',
          inWatchlist
            ? 'bg-accent/20 text-accent border-accent/40 hover:bg-accent/30'
            : 'glass border-white/15 text-white hover:bg-white/20'
        )}
      >
        {inWatchlist ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            In Watchlist
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Add to Watchlist
          </>
        )}
      </button>
    )
  }

  if (variant === 'detail') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center gap-2.5 font-semibold px-6 py-3 rounded-xl transition-all duration-200 border',
          inWatchlist
            ? 'bg-accent/20 text-accent border-accent/40 hover:bg-accent/30'
            : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
        )}
      >
        {inWatchlist ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Remove from Watchlist
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Add to Watchlist
          </>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 border',
        inWatchlist
          ? 'bg-accent/20 text-accent border-accent/30 hover:bg-accent/30'
          : 'glass border-white/10 text-white hover:bg-white/15'
      )}
    >
      {inWatchlist ? (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Saved
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Save
        </>
      )}
    </button>
  )
}
