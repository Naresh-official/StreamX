"use client";

import { useEffect, useState } from "react";
import { Video } from "@workspace/types";
import { getNewReleaseVideos } from "@workspace/api-client";

export function useNewReleaseVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      setLoading(true);
      setError(null);
      try {
        const newReleases = await getNewReleaseVideos();
        setVideos(newReleases);
      } catch (err) {
        setError("Failed to fetch new release videos.");
      } finally {
        setLoading(false);
      }
    };
    fetchNewReleases();
  }, []);

  return { videos, loading, error };
}
