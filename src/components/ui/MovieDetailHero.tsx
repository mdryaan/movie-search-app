'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getBackdropUrl } from '@/lib/tmdb'

interface MovieDetailHeroProps {
  backdropPath: string | null
  posterPath: string | null
  title: string
}

export function MovieDetailHero({ backdropPath, title }: MovieDetailHeroProps) {
  const [imageError, setImageError] = useState(false)
  const hasBackdrop = backdropPath && !imageError

  return (
    <div className="relative h-[55vh] sm:h-[60vh] min-h-[380px] overflow-hidden">
      {hasBackdrop ? (
        <Image
          src={getBackdropUrl(backdropPath, 'w1280')}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
