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
    <>
      <div className="mb-8 text-center sm:mb-10 sm:text-left">
        <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          My <span className="text-green-500">Watchlist</span>
        </h1>

        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          {movies.length} movie{movies.length !== 1 ? "s" : ""} saved to your
          watchlist.
        </p>
      </div>

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
    </>
  );
}