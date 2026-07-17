"use client";

import { Bookmark } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";

interface WatchlistButtonProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
  isInWatchlist: boolean;
}

export default function WatchlistButton({
  movie,
  isInWatchlist,
}: WatchlistButtonProps) {
  const {
    isInWatchlist: isMovieInWatchlist,
    toggle,
  } = useWatchlist(movie, isInWatchlist);

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-green-400 transition-all duration-300 hover:border-green-500/40 hover:bg-green-500/5 hover:shadow-[0_0_15px_rgba(34,197,94,0.12)] cursor-pointer group w-full xs:w-auto"
      aria-label="Add to Watchlist"
    >
      <Bookmark
        size={16}
        className={
          isMovieInWatchlist
            ? "fill-green-500 transition-transform group-hover:scale-105"
            : "transition-transform group-hover:scale-105"
        }
      />
      <span>
        {isMovieInWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </span>
    </button>
  );
}