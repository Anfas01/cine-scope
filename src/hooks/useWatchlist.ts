"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toggleWatchlist from "@/actions/toggleWatchlist";
import type { MovieSummary } from "@/types/movie";
import { toast } from "sonner";

export function useWatchlist(
  movie: MovieSummary,
  initialState: boolean,
  onRemoved?: (movieId: number) => void
) {
  const router = useRouter();

  const [isInWatchlist, setIsInWatchlist] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = async () => {
    // Prevent multiple clicks
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await toggleWatchlist(movie);

      if (!result.success) return;

      if (result.action === "added") {
        setIsInWatchlist(true);
        toast.success("Added to Watchlist");
      }

      if (result.action === "removed") {
        setIsInWatchlist(false);
        toast.success("Removed from Watchlist");
        onRemoved?.(movie.id);
      }

      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInWatchlist,
    isLoading,
    toggle,
  };
}