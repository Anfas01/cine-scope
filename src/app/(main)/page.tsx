import { getTrendingMovies, searchMovie } from "@/services/movies.service";
import MovieCard from "@/components/MovieCard";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Watchlist from "@/models/watchlistModel";
import type { MovieSummary } from "@/types/movie";

type HomeProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const watchlist = await Watchlist.find({
    user: user._id,
  }).select("movieId");

  const watchlistIds = new Set(
    watchlist.map((movie) => movie.movieId)
  );

  const { query } = await searchParams;

  const movies = query?.trim()
    ? await searchMovie(query)
    : await getTrendingMovies();

  const isSearching = Boolean(query?.trim());

  return (
    <main className="min-h-screen bg-black px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 sm:text-left">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {isSearching ? (
              <>
                Search <span className="text-green-500">Results</span>
              </>
            ) : (
              <>
                Trending <span className="text-green-500">Movies</span>
              </>
            )}
          </h1>

          <p className="mt-3 text-sm text-gray-400 sm:text-base">
            {isSearching
              ? `${movies.results.length} result${movies.results.length !== 1 ? "s" : ""
              } found for "${query}".`
              : "Catch the hottest movies trending around the world this week."}
          </p>
        </div>

        {/* Movies */}
        {movies.results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-3 sm:px-0 lg:grid-cols-4">
            {movies.results.map((movie: MovieSummary) => (
              <MovieCard key={movie.id} movie={movie} isInWatchlist={watchlistIds.has(movie.id)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No movies found
            </h2>

            <p className="mt-2 text-gray-400">
              We couldn&apos;t find any movies matching{" "}
              <span className="font-medium text-green-500">
                {query}
              </span>
              .
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
