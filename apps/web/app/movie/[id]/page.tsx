import { BackButton } from "@/components/BackButton";
import { MovieDetails } from "@/components/MovieDetails";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function MoviePage() {
  const movie = {
    id: "1",
    title: "Cosmic Odyssey",
    description:
      "In the year 2157, humanity faces its greatest challenge as interstellar explorers discover an ancient alien artifact that threatens the very fabric of reality. Dr. Elena Reyes, a brilliant xenoarchaeologist, must decipher the artifact's secrets before it's too late. As strange phenomena begin to occur across the solar system, a team of specialists is assembled for a dangerous mission to the edge of known space. What they discover will change the course of human history forever and challenge our understanding of consciousness, time, and the universe itself.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    releaseYear: 2023,
    rating: "PG-13",
    duration: "2h 15m",
    director: "Alexandra Chen",
    languages: ["English", "Spanish", "Mandarin"],
  };

  return (
    <div className="min-h-screen px-4 md:px-8 pt-18">
      <h1 className="text-4xl font-bold">Movie Page</h1>
      <p className="mt-4 text-lg">This is the movie page.</p>
      <div className="container mx-auto py-8">
        <BackButton />

        <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-2">
          {movie.title}
        </h1>

        <div className="flex items-center gap-4 mb-6 text-gray-400">
          <span>{movie.releaseYear}</span>
          <span className="text-sm border border-gray-700 px-2 py-0.5 rounded">
            {movie.rating}
          </span>
          <span>{movie.duration}</span>
        </div>

        <div className="mb-8">
          <VideoPlayer
            thumbnailUrl={movie.thumbnailUrl}
            videoSources={[
              {
                quality: "480p",
                url: "https://dn721905.ca.archive.org/0/items/big-buck-bunny-1440p-60-fps-vp-8/Big%20Buck%20Bunny%20480p%2030FPS.mp4",
              },
              {
                quality: "720p",
                url: "https://ia801800.us.archive.org/30/items/big-buck-bunny-1440p-60-fps-vp-8/Big%20Buck%20Bunny%20720p%2030FPS.mp4",
              },
              {
                quality: "1080p",
                url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              },
            ]}
          />
        </div>

        <MovieDetails movie={movie} />
      </div>
    </div>
  );
}
