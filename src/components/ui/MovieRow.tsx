'use client'

import { useRef } from 'react'
import { Movie } from '@/types/movie'
import { MovieCard } from './MovieCard'

interface MovieRowProps {
  movies: Movie[]
  title?: string
}

export function MovieRow({ movies, title }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative group/row">
      {title && <h2 className="text-xl font-bold text-white mb-4">{title}</h2>}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
      >
        {movies.map((movie, index) => (
          <div key={movie.id} className="flex-none w-40 sm:w-44 md:w-48">
            <MovieCard movie={movie} priority={index < 4} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 glass border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:bg-white/20 hover:scale-110 z-10 hidden sm:flex"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 glass border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:bg-white/20 hover:scale-110 z-10 hidden sm:flex"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
