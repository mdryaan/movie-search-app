import { Suspense } from 'react'
import { MovieCardSkeletonGrid } from '@/components/ui/MovieCardSkeleton'
import { SearchPageClient } from './SearchPageClient'

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-10 w-64 bg-surface shimmer rounded-lg mb-8" />
            <div className="h-14 max-w-2xl bg-surface shimmer rounded-2xl mb-8" />
            <MovieCardSkeletonGrid count={12} />
          </div>
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  )
}
