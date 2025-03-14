import { GENRE_COLORS } from '@/lib/constants'

interface GenreBadgeProps {
  genreId: number
  name: string
  size?: 'sm' | 'md'
}

export function GenreBadge({ genreId, name, size = 'md' }: GenreBadgeProps) {
  const colorClass = GENRE_COLORS[genreId] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30'

  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colorClass} ${sizeClass}`}>
      {name}
    </span>
  )
}

interface GenreBadgeListProps {
  genreIds: number[]
  genreNames?: Record<number, string>
  maxDisplay?: number
  size?: 'sm' | 'md'
}

export function GenreBadgeList({ genreIds, genreNames = {}, maxDisplay = 3, size = 'md' }: GenreBadgeListProps) {
  const { GENRES } = require('@/lib/constants')
  const names: Record<number, string> = { ...GENRES, ...genreNames }

  const visibleGenres = genreIds.slice(0, maxDisplay)

  return (
    <div className="flex flex-wrap gap-2">
      {visibleGenres.map((id) => {
        const name = names[id]
        if (!name) return null
        return <GenreBadge key={id} genreId={id} name={name} size={size} />
      })}
    </div>
  )
}
