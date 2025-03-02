export function MovieCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-surface-elevated border border-white/5">
      <div className="aspect-[2/3] bg-surface shimmer" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-surface shimmer rounded-md w-3/4" />
        <div className="h-3 bg-surface shimmer rounded-md w-1/2" />
      </div>
    </div>
  )
}

export function MovieCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function MovieRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-none w-40 sm:w-48">
          <div className="rounded-xl overflow-hidden bg-surface-elevated border border-white/5">
            <div className="aspect-[2/3] bg-surface shimmer" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-surface shimmer rounded-md w-3/4" />
              <div className="h-3 bg-surface shimmer rounded-md w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[85vh] min-h-[600px] bg-surface shimmer">
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16">
        <div className="max-w-2xl space-y-4">
          <div className="h-4 bg-white/10 shimmer rounded w-24" />
          <div className="h-14 bg-white/10 shimmer rounded-lg w-96" />
          <div className="space-y-2">
            <div className="h-4 bg-white/10 shimmer rounded w-full max-w-lg" />
            <div className="h-4 bg-white/10 shimmer rounded w-4/5 max-w-lg" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-12 w-36 bg-white/10 shimmer rounded-xl" />
            <div className="h-12 w-40 bg-white/10 shimmer rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
