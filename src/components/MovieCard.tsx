"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Bookmark } from "lucide-react";
import { IMAGE_BASE_URL } from "@/lib/tmdb";
import { useWatchlist } from "@/hooks/useWatchlist";
import type { MovieSummary } from "@/types/movie";

interface MovieCardProps {
  movie: MovieSummary;
  isInWatchlist: boolean;
  onRemoved?: (movieId: number) => void;
}

const MovieCard = ({ movie, isInWatchlist, onRemoved }: MovieCardProps) => {
  const {
    isInWatchlist: isMovieInWatchlist,
    toggle,
  } = useWatchlist(movie, isInWatchlist, onRemoved);

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-green-500/20">
      {/* Poster */}
      <div className="relative overflow-hidden">
        <Image
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="h-105 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/80 px-3 py-1 text-sm font-semibold text-green-400 backdrop-blur">
          <Star size={14} className="fill-green-400 text-green-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="line-clamp-1 text-lg font-semibold text-white transition-colors group-hover:text-green-400">
              {movie.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {movie.release_date.slice(0, 4)}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle();
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent bg-neutral-800 text-green-500 transition-all duration-300 hover:border-green-500/30 hover:bg-green-500/10 hover:shadow-[0_0_12px_rgba(34,197,94,0.25)]"
            aria-label="Add to Watchlist"
          >
            <Bookmark size={18} className={isMovieInWatchlist ? "fill-green-500" : ""} />
          </button>
        </div>

        <Link href={`/movie/${movie.id}`}>
          <button className="w-full rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition-all duration-300 hover:border-green-500 hover:bg-green-500 hover:text-black cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
