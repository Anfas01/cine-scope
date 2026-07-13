const BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch TMDB");
  }

  return response.json();
}

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";