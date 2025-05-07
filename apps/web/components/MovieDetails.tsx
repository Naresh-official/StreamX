import { Badge } from "@workspace/ui/components/badge";

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genres: string[];
  releaseYear: number;
  rating: string;
  duration: string;
  director: string;
  languages: string[];
  cast?: string[];
}

interface MovieDetailsProps {
  movie: Movie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-4">About this movie</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          {movie.description}
        </p>

        {movie.director && (
          <div className="mb-4">
            <span className="text-gray-400">Director: </span>
            <span className="text-white">{movie.director}</span>
          </div>
        )}

        {movie.cast && movie.cast.length > 0 && (
          <div className="mb-4">
            <span className="text-gray-400">Cast: </span>
            <span className="text-white">{movie.cast.join(", ")}</span>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Details</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-gray-400 text-sm">Genres</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="bg-gray-800 text-gray-200"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm">Release Year</h3>
            <p className="text-white">{movie.releaseYear}</p>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm">Rating</h3>
            <p className="text-white">{movie.rating}</p>
          </div>

          {movie.languages && (
            <div>
              <h3 className="text-gray-400 text-sm">Languages</h3>
              <p className="text-white">{movie.languages.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
