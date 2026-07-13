import Image from "next/image";
import { Star } from "lucide-react";
import { IMAGE_BASE_URL } from "@/lib/tmdb";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-green-500/20 cursor-pointer">
      {/* Poster */}
      <div className="relative overflow-hidden">
        <Image
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/80 px-3 py-1 text-sm font-semibold text-green-400 backdrop-blur">
          <Star size={14} className="fill-green-400 text-green-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 p-4">
        <h2 className="line-clamp-1 text-lg font-bold text-white">
          {movie.title}
        </h2>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{movie.release_date.slice(0, 4)}</span>

          <button className="rounded-lg border border-green-500 px-3 py-1 text-green-400 transition hover:bg-green-500 hover:text-black">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;