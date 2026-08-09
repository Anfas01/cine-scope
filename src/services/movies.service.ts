import { tmdbFetch } from "../lib/tmdb";

export async function getTrendingMovies() {
  return tmdbFetch("/trending/movie/week");
}

export async function getPopularMovies() {
  return tmdbFetch("/movie/popular");
}

export async function getTopRatedMovies() {
  return tmdbFetch("/movie/top_rated");
}

export async function getUpcomingMovies() {
  return tmdbFetch("/movie/upcoming");
}

export async function searchMovie(searchQuery: string) {
  if (!searchQuery.trim()) return;

  return tmdbFetch(
    `/search/movie?query=${encodeURIComponent(searchQuery)}`
  );
}

export async function getMovieDetails(id: string) {
  return tmdbFetch(`/movie/${id}`);
}