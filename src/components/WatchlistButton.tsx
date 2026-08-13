"use client";

import { Bookmark, LoaderCircle } from "lucide-react";

interface WatchlistButtonProps {
  isInWatchlist: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

export default function WatchlistButton({
  isInWatchlist,
  isLoading,
  onToggle,
}: WatchlistButtonProps) {
  return (
    <button
      onClick={onToggle}
      disabled={isLoading}
      aria-label={
        isInWatchlist
          ? "Remove from Watchlist"
          : "Add to Watchlist"
      }
      className={`
        group flex h-10 w-full cursor-pointer items-center justify-center
        gap-2 rounded-lg border px-4 text-xs font-medium
        transition-all duration-200 sm:text-sm
        disabled:cursor-not-allowed disabled:opacity-60

        ${
          isInWatchlist
            ? "border-green-500/30 bg-green-500/10 text-green-400 hover:border-green-500/50 hover:bg-green-500/15"
            : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-800/70 hover:text-white"
        }
      `}
    >
      {isLoading ? (
        <LoaderCircle
          size={15}
          className="animate-spin text-green-400"
        />
      ) : (
        <Bookmark
          size={15}
          className={`
            transition-all duration-200
            ${
              isInWatchlist
                ? "fill-green-400 text-green-400"
                : "text-neutral-500 group-hover:text-green-400"
            }
          `}
        />
      )}

      <span>
        {isLoading
          ? isInWatchlist
            ? "Removing..."
            : "Adding..."
          : isInWatchlist
            ? "In Watchlist"
            : "Add to Watchlist"}
      </span>
    </button>
  );
}