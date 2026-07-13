import { tmdbFetch } from "../lib/tmdb";

export async function getTrendingMovies() {
  return tmdbFetch("/trending/movie/week");
}