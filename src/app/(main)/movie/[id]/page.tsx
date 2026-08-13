import Image from "next/image";
import { Calendar, Clock3, Star } from "lucide-react";
import { getMovieDetails } from "@/services/movies.service";
import { IMAGE_BASE_URL } from "@/lib/tmdb";
import MovieWatchlistButton from "@/components/MovieWatchlistButton";
import { isMovieInWatchlist } from "@/actions/watchlist";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const movie = await getMovieDetails(id);
  const isInWatchlist = await isMovieInWatchlist(movie.id);

  const movieSummary = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
  };

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : "/placeholder-movie.png";

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "/placeholder-movie.png";

  return (
    <main className="min-h-screen bg-black text-neutral-200 antialiased selection:bg-green-500 selection:text-black">

      <div className="relative h-[32vh] min-h-260px w-full overflow-hidden sm:h-[42vh] md:h-480px">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 grayscale-30%"
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />
      </div>

      <section className="relative z-10 mx-auto -mt-24 w-full max-w-6xl px-4 pb-24 sm:-mt-36 sm:px-6 md:-mt-52">

        <div className="grid gap-8 md:grid-cols-[280px_1fr] md:items-start lg:grid-cols-[300px_1fr] lg:gap-10">

          <div className="mx-auto w-full max-w-220px sm:max-w-260px md:mx-0 md:max-w-none">
            <div className="group relative aspect-2/3 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/60">

              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 220px, 300px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Poster bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/80 to-transparent" />

              {/* Rating badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-green-500/20 bg-black/80 px-3 py-1.5 text-sm font-semibold text-green-400 backdrop-blur-md">
                <Star
                  size={14}
                  className="fill-green-400 text-green-400"
                />

                {movie.vote_average.toFixed(1)}

                <span className="font-normal text-neutral-500">
                  / 10
                </span>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col">

            {/* Title */}
            <div className="text-center md:text-left">

              <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
                <span className="h-px w-6 bg-green-500/60" />

                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-green-400">
                  Movie Details
                </span>

                <span className="h-px w-6 bg-green-500/60 md:hidden" />
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-3 text-sm italic text-neutral-500 sm:text-base">
                  “{movie.tagline}”
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-y border-neutral-900 py-4 text-xs text-neutral-400 sm:text-sm md:justify-start">

              <div className="flex items-center gap-2">
                <Star
                  size={15}
                  className="fill-green-400 text-green-400"
                />

                <span className="font-semibold text-white">
                  {movie.vote_average.toFixed(1)}
                </span>

                <span className="text-neutral-600">
                  rating
                </span>
              </div>

              <span className="hidden text-neutral-800 sm:inline">
                •
              </span>

              <div className="flex items-center gap-2">
                <Calendar
                  size={15}
                  className="text-neutral-500"
                />

                <span>
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : "N/A"}
                </span>
              </div>

              <span className="hidden text-neutral-800 sm:inline">
                •
              </span>

              <div className="flex items-center gap-2">
                <Clock3
                  size={15}
                  className="text-neutral-500"
                />

                <span>
                  {movie.runtime
                    ? `${movie.runtime} min`
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Watchlist */}
              <div className="shrink-0">
                <MovieWatchlistButton
                  movie={movieSummary}
                  isInWatchlist={isInWatchlist}
                />
              </div>

              {/* Genres */}
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {movie.genres.map(
                  (genre: {
                    id: number;
                    name: string;
                  }) => (
                    <span
                      key={genre.id}
                      className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-[11px] font-medium tracking-wide text-neutral-400 transition-colors hover:border-green-500/30 hover:text-green-400"
                    >
                      {genre.name}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
                Overview
              </h2>

              <p className="max-w-3xl text-sm leading-7 text-neutral-400 sm:text-[15px]">
                {movie.overview ||
                  "No overview available for this movie."}
              </p>
            </div>
            <div className="mt-10 border-t border-neutral-900 pt-7">

              <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                Movie Information
              </h2>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">

                {/* Status */}
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Status
                  </dt>

                  <dd className="mt-1.5 text-sm font-medium text-neutral-300">
                    {movie.status || "N/A"}
                  </dd>
                </div>

                {/* Language */}
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Language
                  </dt>

                  <dd className="mt-1.5 text-sm font-medium text-neutral-300">
                    {movie.original_language
                      ? movie.original_language.toUpperCase()
                      : "N/A"}
                  </dd>
                </div>

                {/* Popularity */}
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Popularity
                  </dt>

                  <dd className="mt-1.5 text-sm font-medium text-neutral-300">
                    {movie.popularity?.toFixed(0) ?? "N/A"}
                  </dd>
                </div>

                {/* Votes */}
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Votes
                  </dt>

                  <dd className="mt-1.5 text-sm font-medium text-neutral-300">
                    {movie.vote_count?.toLocaleString() ?? "N/A"}
                  </dd>
                </div>

              </dl>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}