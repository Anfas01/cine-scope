import Watchlist from "@/models/watchlistModel";
import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import WatchlistGrid from "@/components/WatchlistGrid";

interface WatchlistMovie {
  movieId: number;
  title: string;
  posterPath: string;
  voteAverage: number;
  releaseDate: string;
}

export default async function WatchlistPage() {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const watchlist = (await Watchlist.find({
    user: user._id,
  }).lean()) as WatchlistMovie[];

  const movies = watchlist.map((movie) => ({
    id: movie.movieId,
    title: movie.title,
    poster_path: movie.posterPath,
    vote_average: movie.voteAverage,
    release_date: movie.releaseDate,
  }));

  return (
    <main className="min-h-screen bg-black px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <WatchlistGrid initialMovies={movies} />
      </div>
    </main>
  );
}