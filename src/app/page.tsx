import { getTrending } from '@/lib/tmdb'
import { HeroSection } from '@/components/ui/HeroSection'
import { HeroSkeleton } from '@/components/ui/MovieCardSkeleton'
import { HomePageClient } from './HomePageClient'

export default async function HomePage() {
  let featuredMovie = null

  try {
    const trending = await getTrending('week', 1)
    featuredMovie = trending.results[0] ?? null
  } catch {
    featuredMovie = null
  }

  return (
    <div className="min-h-screen bg-background">
      {featuredMovie ? <HeroSection movie={featuredMovie} /> : <HeroSkeleton />}
      <HomePageClient />
    </div>
  )
}
