import MovieCard from "@/components/MovieCard";
import type { MovieSummary } from "@/types/movie";

type MovieGridProps = {
  title: string;
  description?: string;
  movies: MovieSummary[];
  watchlistIds: Set<number>;
};

export default function MovieGrid({
  title,
  description,
  movies,
  watchlistIds,
}: MovieGridProps) {
  return (
    <section className="mb-12">
      {/* Section Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {/* Movies */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={watchlistIds.has(movie.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-300px items-center justify-center text-center">
          <div>
            <h3 className="text-xl font-semibold text-white">
              No movies found
            </h3>

            <p className="mt-2 text-gray-400">
              There are no movies available in this category.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}