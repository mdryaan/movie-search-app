import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getMovieDetails, getBackdropUrl, getPosterUrl, getProfileUrl } from '@/lib/tmdb'
import { formatRating, formatRuntime, formatDate, formatCurrency, getRatingColor } from '@/lib/utils'
import { GenreBadge } from '@/components/ui/GenreBadge'
import { RatingStars } from '@/components/ui/RatingStars'
import { WatchlistButton } from '@/components/ui/WatchlistButton'
import { MovieRow } from '@/components/ui/MovieRow'
import { MovieDetailHero } from '@/components/ui/MovieDetailHero'

interface MoviePageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: MoviePageProps) {
  try {
    const movie = await getMovieDetails(Number(params.id))
    return {
      title: `${movie.title} — CineVault`,
      description: movie.overview,
    }
  } catch {
    return { title: 'Movie — CineVault' }
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = Number(params.id)
  if (isNaN(movieId)) notFound()

  let movie
  try {
    movie = await getMovieDetails(movieId)
  } catch {
    notFound()
  }

  const director = movie.credits?.crew.find((c) => c.job === 'Director')
  const writers = movie.credits?.crew.filter((c) => c.job === 'Screenplay' || c.job === 'Writer').slice(0, 2) ?? []
  const cast = movie.credits?.cast.slice(0, 12) ?? []
  const trailer = movie.videos?.results.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser') && v.official
  )
  const similarMovies = movie.similar?.results.slice(0, 12) ?? []
  const ratingColor = getRatingColor(movie.vote_average)

  return (
    <div className="min-h-screen bg-background">
      <MovieDetailHero
        backdropPath={movie.backdrop_path}
        posterPath={movie.poster_path}
        title={movie.title}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 -mt-32 relative z-10">
          <div className="flex-none mx-auto lg:mx-0">
            <div className="relative w-44 sm:w-52 lg:w-60 rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] border border-white/10 ring-1 ring-white/5">
              <Image
                src={getPosterUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                width={240}
                height={360}
                className="w-full block"
                priority
              />
            </div>
          </div>

          <div className="flex-1 pt-0 lg:pt-8 text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              {movie.genres.slice(0, 4).map((genre) => (
                <GenreBadge key={genre.id} genreId={genre.id} name={genre.name} />
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-tight mb-2">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-gray-400 text-base italic mb-5">&ldquo;{movie.tagline}&rdquo;</p>
            )}

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
              <div className={`flex items-center gap-1.5 text-2xl font-black ${ratingColor}`}>
                <svg className="w-6 h-6 text-gold flex-none" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {formatRating(movie.vote_average)}
              </div>
              <RatingStars rating={movie.vote_average} size="lg" />
              <span className="text-gray-500 text-sm">({movie.vote_count.toLocaleString()} votes)</span>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 mb-6 text-sm">
              {movie.release_date && (
                <div className="text-center lg:text-left">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Release</p>
                  <p className="text-white font-semibold">{formatDate(movie.release_date)}</p>
                </div>
              )}
              {movie.runtime ? (
                <div className="text-center lg:text-left">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Runtime</p>
                  <p className="text-white font-semibold">{formatRuntime(movie.runtime)}</p>
                </div>
              ) : null}
              {movie.status && (
                <div className="text-center lg:text-left">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Status</p>
                  <p className="text-white font-semibold">{movie.status}</p>
                </div>
              )}
              {movie.original_language && (
                <div className="text-center lg:text-left">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Language</p>
                  <p className="text-white font-semibold uppercase">{movie.original_language}</p>
                </div>
              )}
              {movie.budget > 0 && (
                <div className="text-center lg:text-left">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Budget</p>
                  <p className="text-white font-semibold">{formatCurrency(movie.budget)}</p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="text-center lg:text-left">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Revenue</p>
                  <p className="text-white font-semibold">{formatCurrency(movie.revenue)}</p>
                </div>
              )}
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
              {movie.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-400 mb-7">
              {director && (
                <span>
                  Directed by{' '}
                  <span className="text-white font-semibold">{director.name}</span>
                </span>
              )}
              {director && writers.length > 0 && <span className="hidden sm:inline text-gray-700">·</span>}
              {writers.length > 0 && (
                <span>
                  Written by{' '}
                  <span className="text-white font-semibold">{writers.map((w) => w.name).join(', ')}</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
              <WatchlistButton movie={movie} variant="detail" size="lg" />

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600/15 hover:bg-red-600/25 text-red-400 border border-red-500/30 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Trailer
                </a>
              )}

              <Link
                href="/"
                className="flex items-center gap-2 glass border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-medium px-5 py-3 rounded-xl transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </Link>
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <section className="mt-16 pt-10 border-t border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-purple-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">Cast</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {cast.map((person) => (
                <div key={person.id} className="flex-none w-28 sm:w-32">
                  <div className="rounded-xl overflow-hidden bg-surface-elevated border border-white/5 mb-2 aspect-[2/3] relative">
                    <Image
                      src={getProfileUrl(person.profile_path, 'w185')}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-white text-xs font-semibold line-clamp-1">{person.name}</p>
                  <p className="text-gray-500 text-xs line-clamp-1">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similarMovies.length > 0 && (
          <section className="mt-12 pt-10 border-t border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">More Like This</h2>
            </div>
            <MovieRow movies={similarMovies} />
          </section>
        )}
      </div>
    </div>
  )
}
