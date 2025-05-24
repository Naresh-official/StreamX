import { useState, useEffect } from "react";
import { getVideoById } from "@workspace/api-client";
import { Video, VideoResponse, VideoUrls } from "@workspace/types/";
import { getSession } from "next-auth/react";

export function useVideo(videoId: string) {
  const [video, setVideo] = useState<Video | null>(null);
  const [urls, setUrls] = useState<VideoUrls | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const session = await getSession();
      const userEmail = session?.user?.email || "";
      setLoading(true);
      setError(null);

      try {
        const { video, url }: VideoResponse = await getVideoById(
          videoId,
          userEmail
        );
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
