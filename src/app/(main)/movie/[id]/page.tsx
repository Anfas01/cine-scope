import Image from "next/image";
import { Bookmark, Calendar, Clock3, Star } from "lucide-react";
import { getMovieDetails } from "@/services/movies.service";
import { IMAGE_BASE_URL } from "@/lib/tmdb";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  const movie = await getMovieDetails(id);

  return (
    <main className="min-h-screen bg-black text-neutral-200 antialiased selection:bg-green-500 selection:text-black">
      
      {/* Dynamic Ambient Backdrop */}
      <div className="relative h-[30vh] sm:h-[40vh] md:h-[450px] w-full">
        <Image
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority
          className="object-cover opacity-30 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
      </div>

      {/* Main Container - Adjusted negative margins seamlessly across breakpoints */}
      <section className="mx-auto -mt-20 sm:-mt-32 md:-mt-48 max-w-6xl px-4 sm:px-6 pb-24 relative z-10">
        <div className="flex flex-col gap-8 md:flex-row items-center md:items-start text-center md:text-left">
          
          {/* Responsive Poster Wrapper */}
          <div className="relative aspect-[2/3] w-full max-w-[220px] sm:max-w-[280px] md:max-w-[300px] shrink-0 overflow-hidden rounded-xl border border-neutral-900 shadow-2xl">
            <Image
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Details Column */}
          <div className="flex-1 space-y-6 sm:space-y-8 w-full flex flex-col items-center md:items-start">
            
            {/* Title & Tagline Group */}
            <div className="w-full">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="mt-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                  {movie.tagline}
                </p>
              )}
            </div>

            {/* Inline Metadata Strip */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 sm:gap-x-6 text-xs sm:text-sm text-neutral-400 border-b border-neutral-900/60 pb-4 w-full">
              <div className="flex items-center gap-1.5">
                <Star className="text-green-400 fill-green-400" size={14} />
                <span className="font-semibold text-white">{movie.vote_average.toFixed(1)}</span>
                <span className="text-neutral-600">/ 10</span>
              </div>
              <span className="text-neutral-800 hidden xs:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-neutral-500" />
                <span>{movie.release_date.slice(0, 4)}</span>
              </div>
              <span className="text-neutral-800 hidden xs:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Clock3 size={14} className="text-neutral-500" />
                <span>{movie.runtime} min</span>
              </div>
            </div>

            {/* Action Row: Modern Watchlist button placement */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full">
              <button 
                className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-green-400 transition-all duration-300 hover:border-green-500/40 hover:bg-green-500/5 hover:shadow-[0_0_15px_rgba(34,197,94,0.12)] cursor-pointer group w-full xs:w-auto"
                aria-label="Add to Watchlist"
              >
                <Bookmark size={16} className="transition-transform group-hover:scale-105" />
                <span>Add to Watchlist</span>
              </button>

              {/* Minimal Micro Genres right alongside actions */}
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                {movie.genres.map((genre: { id: number; name: string }) => (
                  <span
                    key={genre.id}
                    className="rounded-lg border border-neutral-900 bg-neutral-950/60 px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-neutral-400"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview Section */}
            <div className="space-y-2 w-full">
              <p className="max-w-3xl text-sm leading-6 sm:leading-7 text-neutral-400 font-normal">
                {movie.overview}
              </p>
            </div>

            {/* Borderless Tech Stats Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-neutral-900 w-full max-w-2xl text-left">
              <div>
                <dt className="text-[10px] font-bold tracking-wider text-neutral-600 uppercase">Status</dt>
                <dd className="mt-1 text-sm font-medium text-neutral-300">{movie.status}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold tracking-wider text-neutral-600 uppercase">Language</dt>
                <dd className="mt-1 text-sm font-medium text-neutral-300">{movie.original_language.toUpperCase()}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold tracking-wider text-neutral-600 uppercase">Popularity</dt>
                <dd className="mt-1 text-sm font-medium text-neutral-300">{movie.popularity.toFixed(0)}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold tracking-wider text-neutral-600 uppercase">Votes</dt>
                <dd className="mt-1 text-sm font-medium text-neutral-300">{movie.vote_count.toLocaleString()}</dd>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}