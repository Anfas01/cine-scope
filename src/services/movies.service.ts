import { tmdbFetch } from "../lib/tmdb";

export async function getTrendingMovies() {
  return tmdbFetch("/trending/movie/week");
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