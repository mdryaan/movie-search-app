export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const

export const GENRE_COLORS: Record<number, string> = {
  28: 'bg-red-500/20 text-red-400 border-red-500/30',
  12: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  16: 'bg-green-500/20 text-green-400 border-green-500/30',
  35: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  80: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  99: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  18: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  10751: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  14: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  36: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  27: 'bg-red-900/20 text-red-300 border-red-900/30',
  10402: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  9648: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  10749: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  878: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  10770: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  53: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  10752: 'bg-stone-500/20 text-stone-400 border-stone-500/30',
  37: 'bg-yellow-700/20 text-yellow-600 border-yellow-700/30',
}

export const GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

export const WATCHLIST_STORAGE_KEY = 'movieapp_watchlist'
