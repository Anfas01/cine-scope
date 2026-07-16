'use server';

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";
import Watchlist from "@/models/watchlistModel";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default async function toggleWatchlist(movie: Movie) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      action: "none",
      message: "Please login first.",
    };
  }

  const existingMovie = await Watchlist.findOne({
    user: user._id,
    movieId: movie.id,
  });

  // Movie already exists -> remove it
  if (existingMovie) {
    await Watchlist.deleteOne({
      _id: existingMovie._id,
    });

    return {
      success: true,
      action: "removed",
      message: "Movie removed from watchlist.",
    };
  }

  // Movie doesn't exist -> add it
  await Watchlist.create({
    user: user._id,
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
    releaseDate: movie.release_date,
  });

  return {
    success: true,
    action: "added",
    message: "Movie added to watchlist.",
  };
}