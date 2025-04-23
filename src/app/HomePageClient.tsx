'use client'

import { useState } from 'react'
import { TrendingSection } from '@/components/sections/TrendingSection'
import { PopularSection } from '@/components/sections/PopularSection'
import { TopRatedSection } from '@/components/sections/TopRatedSection'
import { GenreFilter } from '@/components/sections/GenreFilter'

export function HomePageClient() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <TrendingSection />

      <div className="space-y-8">
        <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
        <PopularSection selectedGenre={selectedGenre} />
      </div>

      <TopRatedSection />
    </div>
  )
}
