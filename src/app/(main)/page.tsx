import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  searchMovie,
} from "@/services/movies.service";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Watchlist from "@/models/watchlistModel";
import MovieGrid from "@/components/MovieGrid";

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

  const searchQuery = query?.trim();

  if (searchQuery) {
    const movies = await searchMovie(searchQuery);

    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <MovieGrid
            title="Search Results"
            description={`${movies.results.length} result${movies.results.length !== 1 ? "s" : ""
              } found for "${searchQuery}".`}
            movies={movies.results}
            watchlistIds={watchlistIds}
          />
        </div>
      </main>
    );
  }

  const [
    trendingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
  ] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
  ]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-white">Explore </span>
            <span className="text-green-500">Movies</span>
          </h1>

          <div className="mx-auto mt-4 h-0.75 w-24 rounded-full bg-linear-to-r from-transparent via-green-500 to-transparent" />
        </div>

        {/* Trending */}
        <MovieGrid
          title="Trending Movies"
          description="Catch the hottest movies trending around the world this week."
          movies={trendingMovies.results}
          watchlistIds={watchlistIds}
        />

        {/* Popular */}
        <MovieGrid
          title="Popular Movies"
          description="Discover movies that are popular with audiences right now."
          movies={popularMovies.results}
          watchlistIds={watchlistIds}
        />

        {/* Top Rated */}
        <MovieGrid
          title="Top Rated Movies"
          description="Explore some of the highest-rated movies."
          movies={topRatedMovies.results}
          watchlistIds={watchlistIds}
        />

        {/* Upcoming */}
        <MovieGrid
          title="Upcoming Movies"
          description="See what exciting movies are coming soon."
          movies={upcomingMovies.results}
          watchlistIds={watchlistIds}
        />
      </div>
    </main>
  );
}