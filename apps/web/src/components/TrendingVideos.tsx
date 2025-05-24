"use client";

import { useTrendingVideos } from "@/src/hooks/useTrendingVideos";
import { VideoCarousel } from "./videoCarousel/VideoCarousel";

function TrendingVideos() {
  const {
    videos: trendingVideos,
    loading: trendingLoading,
    error: trendingError,
  } = useTrendingVideos();
  if (trendingLoading) {
    return <div className="text-center">Loading trending videos...</div>;
  }
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Trending Now</h2>
      <VideoCarousel videos={trendingVideos} />
    </div>
  );
}

export default TrendingVideos;
