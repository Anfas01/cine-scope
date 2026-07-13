import { getTrendingMovies } from "@/services/movies.service";
import MovieCard from "@/components/MovieCard";


interface MovieProps {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}


export default async function Home() {
  const movies = await getTrendingMovies();

  return (
    <main className="min-h-screen bg-black px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 sm:text-left">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Trending <span className="text-green-500">Movies</span>
          </h1>

          <p className="mt-3 text-sm text-gray-400 sm:text-base">
            Catch the hottest movies right now.
          </p>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-3 sm:px-0 lg:grid-cols-4 pb-24">
          {movies.results.map((movie: MovieProps) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}