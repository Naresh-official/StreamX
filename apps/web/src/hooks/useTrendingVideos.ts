"use client";

import { useEffect, useState } from "react";
import { getTrendingVideos } from "@workspace/api-client";
import { Video } from "@workspace/types";
import { getSession } from "next-auth/react";

export function useTrendingVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const session = await getSession();
      const userId = session?.user?.id || "";
      setLoading(true);
      setError(null);

      try {
        const trending = await getTrendingVideos(userId);
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
