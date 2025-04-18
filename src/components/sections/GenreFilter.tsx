'use client'

import { GENRES, GENRE_COLORS } from '@/lib/constants'

interface GenreFilterProps {
  selectedGenre: number | null
  onGenreChange: (genreId: number | null) => void
}

const POPULAR_GENRES = [28, 12, 16, 35, 80, 18, 14, 27, 878, 53, 10749, 10751]

export function GenreFilter({ selectedGenre, onGenreChange }: GenreFilterProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-purple-500 rounded-full" />
        <h2 className="text-2xl font-bold text-white">Browse by Genre</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onGenreChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            selectedGenre === null
              ? 'bg-white text-black border-white'
              : 'glass border-white/15 text-gray-300 hover:text-white hover:border-white/30'
          }`}
        >
          All
        </button>

        {POPULAR_GENRES.map((id) => {
          const name = GENRES[id]
          if (!name) return null
          const isSelected = selectedGenre === id
          const colorClass = isSelected
            ? GENRE_COLORS[id] ?? 'bg-white/20 text-white border-white/30'
            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/25'

          return (
            <button
              key={id}
              onClick={() => onGenreChange(isSelected ? null : id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${colorClass} ${
                isSelected ? 'scale-105' : ''
              }`}
            >
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
