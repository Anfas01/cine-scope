"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toggleWatchlist from "@/actions/toggleWatchlist";
import type { MovieSummary } from "@/types/movie";

export function useWatchlist(
  movie: MovieSummary,
  initialState: boolean,
  onRemoved?: (movieId: number) => void
) {
  const router = useRouter();

  const [isInWatchlist, setIsInWatchlist] = useState(initialState);

  const toggle = async () => {
    const result = await toggleWatchlist(movie);

    if (!result.success) return;

    if (result.action === "added") {
      setIsInWatchlist(true);
      alert("Added to Watchlist");
    }

    if (result.action === "removed") {
      setIsInWatchlist(false);
      alert("Removed from Watchlist");
      onRemoved?.(movie.id);
    }

    router.refresh();
  };

  return {
    isInWatchlist,
    toggle,
  };
}
