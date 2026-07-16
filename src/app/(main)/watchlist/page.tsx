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
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 sm:text-left">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            My <span className="text-green-500">Watchlist</span>
          </h1>

          <p className="mt-3 text-sm text-gray-400 sm:text-base">
            {movies.length} movie{movies.length !== 1 ? "s" : ""} saved to your
            watchlist.
          </p>
        </div>

        <WatchlistGrid initialMovies={movies} />
      </div>
    </main>
  );
}