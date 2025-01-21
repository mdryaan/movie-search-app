import { GENRES } from './constants'

export function formatRating(rating: number): string {
  return (Math.round(rating * 10) / 10).toFixed(1)
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'N/A'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'TBA'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatYear(dateString: string): string {
  if (!dateString) return 'TBA'
  return new Date(dateString).getFullYear().toString()
}

export function formatCurrency(amount: number): string {
  if (!amount) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getGenreName(id: number): string {
  return GENRES[id] ?? 'Unknown'
}

export function getGenreNames(ids: number[]): string[] {
  return ids.map(getGenreName).filter(Boolean)
}

export function getRatingColor(rating: number): string {
  if (rating >= 8) return 'text-green-400'
  if (rating >= 7) return 'text-yellow-400'
  if (rating >= 6) return 'text-orange-400'
  return 'text-red-400'
}

export function getRatingBgColor(rating: number): string {
  if (rating >= 8) return 'bg-green-500'
  if (rating >= 7) return 'bg-yellow-500'
  if (rating >= 6) return 'bg-orange-500'
  return 'bg-red-500'
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function staggerDelay(index: number, base = 50): string {
  return `${index * base}ms`
}
