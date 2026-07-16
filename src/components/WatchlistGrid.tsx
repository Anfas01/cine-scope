"use client";

import { useState } from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface Props {
  initialMovies: Movie[];
}

export default function WatchlistGrid({
  initialMovies,
}: Props) {
  const [movies, setMovies] =
    useState(initialMovies);

  const handleMovieRemoved = (movieId: number) => {
    setMovies((prevMovies) =>
      prevMovies.filter(
        (movie) => movie.id !== movieId
      )
    );
  };

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Your watchlist is empty
        </h2>

        <p className="mt-2 text-gray-400">
          Start exploring movies and add your favorites to watch them later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-3 sm:px-0 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInWatchlist={true}
          onRemoved={handleMovieRemoved}
        />
      ))}
    </div>
  );
}