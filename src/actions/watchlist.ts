import { connectDB } from "../lib/mongodb";
import { getCurrentUser } from "../lib/auth";
import Watchlist from "../models/watchlistModel";

export async function isMovieInWatchlist(movieId: number) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) return false;

  const movie = await Watchlist.findOne({
    user: user._id,
    movieId,
  });

  return !!movie;
}