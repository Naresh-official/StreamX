"use client";

import { useEffect, useState } from "react";
import { getTrendingVideos } from "@workspace/api-client";
import { Video } from "@workspace/types";

export function useTrendingVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);

      try {
        const trending = await getTrendingVideos();
        setVideos(trending);
      } catch (err) {
        setError("Failed to fetch trending videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return { videos, loading, error };
}
