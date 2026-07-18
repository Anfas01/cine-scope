"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toggleWatchlist from "@/actions/toggleWatchlist";
import { useToast } from "@/components/toast/useToast";
import type { MovieSummary } from "@/types/movie";

export function useWatchlist(
  movie: MovieSummary,
  initialState: boolean,
  onRemoved?: (movieId: number) => void
) {
  const router = useRouter();
  const { showToast } = useToast();

  const [isInWatchlist, setIsInWatchlist] = useState(initialState);

  const toggle = async () => {
    const result = await toggleWatchlist(movie);

    if (!result.success) return;

    if (result.action === "added") {
      setIsInWatchlist(true);
      showToast("Added to Watchlist");
    }

    if (result.action === "removed") {
      setIsInWatchlist(false);
      showToast("Removed from Watchlist");
      onRemoved?.(movie.id);
    }

    router.refresh();
  };

  return {
    isInWatchlist,
    toggle,
  };
}
