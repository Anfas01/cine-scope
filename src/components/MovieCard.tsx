"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { IMAGE_BASE_URL } from "@/lib/tmdb";
import { useWatchlist } from "@/hooks/useWatchlist";
import type { MovieSummary } from "@/types/movie";
import WatchlistButton from "./WatchlistButton";

interface MovieCardProps {
  movie: MovieSummary;
  isInWatchlist: boolean;
  onRemoved?: (movieId: number) => void;
}

const MovieCard = ({
  movie,
  isInWatchlist,
  onRemoved,
}: MovieCardProps) => {
  const {
    isInWatchlist: isMovieInWatchlist,
    isLoading,
    toggle,
  } = useWatchlist(movie, isInWatchlist, onRemoved);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "/placeholder-movie.png";

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/80 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-green-500/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]">

      {/* Poster */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-neutral-950">
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Poster gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-3.5 sm:p-4">

        {/* Title + Year + Rating */}
        <div className="min-w-0">
          <h2 className="line-clamp-1 text-base font-semibold text-white transition-colors duration-300 group-hover:text-green-400 sm:text-lg">
            {movie.title}
          </h2>

          <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
            <span>
              {movie.release_date
                ? movie.release_date.slice(0, 4)
                : "N/A"}
            </span>

            <span className="text-neutral-700">
              •
            </span>

            <div className="flex items-center gap-1">
              <Star
                size={11}
                className="fill-green-500 text-green-500"
              />

              <span className="text-neutral-400">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Watchlist */}
        <div className="mt-3">
          <WatchlistButton
            isInWatchlist={isMovieInWatchlist}
            isLoading={isLoading}
            onToggle={toggle}
          />
        </div>

        {/* View Details */}
        <Link
          href={`/movie/${movie.id}`}
          className="mt-2 block"
        >
          <button className="w-full cursor-pointer rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-2 text-xs font-semibold tracking-wide text-green-400 transition-all duration-300 hover:border-green-500 hover:bg-green-500 hover:text-black sm:text-sm">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;