'use client'

import { useState } from 'react'
import { useTrending } from '@/hooks/useTrending'
import { TimeWindow } from '@/types/api'
import { MovieRow } from '@/components/ui/MovieRow'
import { MovieRowSkeleton } from '@/components/ui/MovieCardSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'

export function TrendingSection() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('week')
  const { movies, loading, error } = useTrending(timeWindow)

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-accent rounded-full" />
          <h2 className="text-2xl font-bold text-white">Trending</h2>
        </div>

        <div className="flex items-center gap-1 glass border border-white/10 rounded-full p-1">
          {(['day', 'week'] as TimeWindow[]).map((tw) => (
            <button
              key={tw}
              onClick={() => setTimeWindow(tw)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                timeWindow === tw ? 'bg-accent text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tw === 'day' ? 'Today' : 'This Week'}
            </button>
          ))}
        </div>
      </div>

      {loading && <MovieRowSkeleton count={8} />}
      {error && <ErrorState message={error} />}
      {!loading && !error && <MovieRow movies={movies} />}
    </section>
  )
}
