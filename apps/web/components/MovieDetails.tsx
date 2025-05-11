import { Video } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";

interface MovieDetailsProps {
  video: Video;
}

export function MovieDetails({ video }: MovieDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-4">About this movie</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          {video.description}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Details</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-gray-400 text-sm">Genres</h3>
            <div className="flex flex-wrap gap-2 mt-2 capitalize">
              {video.categories.map((categorie) => (
                <Badge
                  key={categorie.id}
                  variant="outline"
                  className="bg-gray-800 text-gray-200"
                >
                  {categorie.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm">Release Year</h3>
            <p className="text-white">
              {new Date(video!.createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
