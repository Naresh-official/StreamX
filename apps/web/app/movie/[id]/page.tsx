"use client";

import { BackButton } from "@/components/BackButton";
import { MovieDetails } from "@/components/MovieDetails";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useVideo } from "@/hooks/useVideo";
import { useVideoViewTracker } from "@/hooks/useVideoViewTracker";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const autoPlay = searchParams.get("autoplay") === "true";

  if (typeof id !== "string") {
    router.push("/404");
    return;
  }

  const { video, urls, loading, error } = useVideo(id);
  useVideoViewTracker(id, "76f57c6f-96b8-4027-823b-968d2905ba42"); // TODO: Replace with your actual user ID

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { title, thumbnailUrl, duration } = video!;

  return (
    <div className="min-h-screen px-4 md:px-8 py-18">
      <div className="container mx-auto">
        <BackButton />

        <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-2">{title}</h1>

        <div className="flex items-center gap-4 mb-6 text-gray-400">
          <span>{new Date(video!.createdAt).getFullYear()}</span>
          <span>{`${Math.floor(duration / 60)}m ${duration % 60}s`}</span>
        </div>

        <div className="mb-8">
          <VideoPlayer
            thumbnailUrl={thumbnailUrl}
            videoSources={[
              {
                quality: "480p",
                url: urls?.["480"]!,
              },
              {
                quality: "720p",
                url: urls?.["720"]!,
              },
              {
                quality: "1080p",
                url: urls?.["1080"]!,
              },
            ]}
            autoPlay={autoPlay}
          />
        </div>

        <MovieDetails video={video!} />
      </div>
    </div>
  );
}
