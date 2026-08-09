import { tmdbFetch } from "../lib/tmdb";

const MOVIES_PER_CATEGORY = 8;

export async function getTrendingMovies() {
  const data = await tmdbFetch("/trending/movie/week");

  return {
    ...data,
    results: data.results.slice(0, MOVIES_PER_CATEGORY),
  };
}

export async function getPopularMovies() {
  const data = await tmdbFetch("/movie/popular");

  return {
    ...data,
    results: data.results.slice(0, MOVIES_PER_CATEGORY),
  };
}

export async function getTopRatedMovies() {
  const data = await tmdbFetch("/movie/top_rated");

  return {
    ...data,
    results: data.results.slice(0, MOVIES_PER_CATEGORY),
  };
}

export async function getUpcomingMovies() {
  const data = await tmdbFetch("/movie/upcoming");

  return {
    ...data,
    results: data.results.slice(0, MOVIES_PER_CATEGORY),
  };
}

export async function searchMovie(searchQuery: string) {
  const query = searchQuery.trim();

  if (!query) {
    return {
      results: [],
    };
  }

  return tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
}

export async function getMovieDetails(id: string) {
  return tmdbFetch(`/movie/${id}`);
}