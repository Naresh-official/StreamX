import { useState, useEffect } from "react";
import { getVideosByCategory } from "@workspace/api-client";
import { GetVideosByCategoryResponse, Video } from "@workspace/types/";
import { getSession } from "next-auth/react";

interface UseVideosByCategoryResult extends GetVideosByCategoryResponse {
  loading: boolean;
  error: string | null;
}

export function useVideosByCategory(
  category: string,
  limit = 12,
  page = 1,
  search: string = ""
): UseVideosByCategoryResult {
  const [videos, setVideos] = useState<Video[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;
    const fetchVideos = async () => {
      const session = await getSession();
      const userId = session?.user?.id || "";
      setLoading(true);
      setError(null);

      try {
        const response = await getVideosByCategory(
          category,
          limit,
          page,
          search,
          userId
        );
        setVideos(response.videos);
        setTotal(response.total);
      } catch (err) {
        console.error("Error fetching videos by category:", err);
        setError("Failed to fetch videos by category.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category, limit, page, search]);

  return {
    videos,
    total,
    page,
    limit,
    loading,
    error,
  };
}
