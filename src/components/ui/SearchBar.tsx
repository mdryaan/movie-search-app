'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchBarProps {
  initialQuery?: string
  onSearch?: (query: string) => void
  autoFocus?: boolean
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SearchBar({
  initialQuery = '',
  onSearch,
  autoFocus = false,
  placeholder = 'Search for movies...',
  size = 'md',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isFocused, setIsFocused] = useState(false)
  const debouncedQuery = useDebounce(query, 400)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    if (onSearch !== undefined) {
      onSearch(debouncedQuery)
    }
  }, [debouncedQuery, onSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleClear = () => {
    setQuery('')
    if (onSearch) onSearch('')
    inputRef.current?.focus()
  }

  const sizeClasses = {
    sm: 'h-9 text-sm px-4',
    md: 'h-12 text-base px-5',
    lg: 'h-14 text-lg px-6',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div
        className={`relative flex items-center transition-all duration-200 ${
          isFocused ? 'ring-2 ring-accent/50' : ''
        } rounded-2xl overflow-hidden glass border ${isFocused ? 'border-accent/30' : 'border-white/10'}`}
      >
        <div className={`pl-4 flex-none text-gray-500 ${iconSizes[size]}`}>
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none ${sizeClasses[size]}`}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="pr-4 text-gray-500 hover:text-white transition-colors"
          >
            <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}
