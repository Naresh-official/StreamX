import { useState, useEffect } from "react";
import { getVideoById } from "@workspace/api-client";
import { Video, VideoResponse, VideoUrls } from "@workspace/types/";

export function useVideo(videoId: string) {
  const [video, setVideo] = useState<Video | null>(null);
  const [urls, setUrls] = useState<VideoUrls | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);

      try {
        const { video, url }: VideoResponse = await getVideoById(videoId);
        setVideo(video);
        setUrls(url);
      } catch (err) {
        setError("Failed to fetch video.");
      } finally {
        setLoading(false);
      }
    };

    if (videoId) fetchVideo();
  }, [videoId]);

  return { video, urls, loading, error };
}
