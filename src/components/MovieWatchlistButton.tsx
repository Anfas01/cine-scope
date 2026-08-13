"use client";

import { useWatchlist } from "@/hooks/useWatchlist";
import WatchlistButton from "@/components/WatchlistButton";
import type { MovieSummary } from "@/types/movie";

interface MovieWatchlistButtonProps {
  movie: MovieSummary;
  isInWatchlist: boolean;
}

export default function MovieWatchlistButton({
  movie,
  isInWatchlist,
}: MovieWatchlistButtonProps) {
  const {
    isInWatchlist: isMovieInWatchlist,
    isLoading,
    toggle,
  } = useWatchlist(movie, isInWatchlist);

  return (
    <WatchlistButton
      isInWatchlist={isMovieInWatchlist}
      isLoading={isLoading}
      onToggle={toggle}
    />
  );
}