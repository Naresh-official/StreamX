import { useState, useEffect } from "react";
import { GetVideosByCategoryResponse, Video } from "@workspace/types";
import { searchVideos } from "@workspace/api-client";

interface UseSearchVideosResult extends GetVideosByCategoryResponse {
  loading: boolean;
  error: string | null;
}

export function useSearchVideos(
  query: string,
  limit = 10,
  page = 1
): UseSearchVideosResult {
  const [videos, setVideos] = useState<Video[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setVideos([]);
      setTotal(0);
      setLoading(false);
      return;
    }
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await searchVideos(query, page, limit);
        setVideos(response.videos);
        setTotal(response.total);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query, limit, page]);

  return {
    videos,
    total,
    page,
    limit,
    loading,
    error,
  };
}
