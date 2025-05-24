"use client";

import { useNewReleaseVideos } from "@/src/hooks/useNewReleaseVideos";
import { VideoCarousel } from "./videoCarousel/VideoCarousel";

function NewReleaseVideos() {
  const {
    videos: newReleaseVideos,
    loading: newReleaseLoading,
    error: newReleaseError,
  } = useNewReleaseVideos();
  if (newReleaseLoading) {
    return <div className="text-center">Loading new release videos...</div>;
  }
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-4">New Releases</h2>
      <VideoCarousel videos={newReleaseVideos} />
    </div>
  );
}

export default NewReleaseVideos;
