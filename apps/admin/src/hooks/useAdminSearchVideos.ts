import { useState, useEffect } from "react";
import { getAdminSearchVideos } from "@workspace/api-client";
import { GetVideosByCategoryResponse, Video } from "@workspace/types";

interface UseAdminSearchVideosResult extends GetVideosByCategoryResponse {
  loading: boolean;
  error: string | null;
}

export function useAdminSearchVideos(
  query: string,
  page = 1,
  limit = 10,
  genre?: string,
  status?: string
): UseAdminSearchVideosResult {
  const [videos, setVideos] = useState<Video[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAdminSearchVideos(
          query,
          page,
          limit,
          genre,
          status
        );
        setVideos(response.videos);
        setTotal(response.total);
      } catch (err) {
        console.error("Error fetching admin search videos:", err);
        setError("Failed to fetch admin search results.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query, page, limit, genre, status]);

  return {
    videos,
    total,
    page,
    limit,
    loading,
    error,
  };
}
