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
      const userId = session?.user?.id || "";
      setLoading(true);
      setError(null);

      try {
        const { video, url }: VideoResponse = await getVideoById(
          videoId,
          userId
        );
        setVideo(video);
        setUrls(url);
      } catch (err: any) {
        if (err instanceof Error && err.message === "USER_NOT_ACTIVE") {
          setError("User is not active.");
        } else {
          setError("Failed to fetch video.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (videoId) fetchVideo();
  }, [videoId]);

  return { video, urls, loading, error };
}
