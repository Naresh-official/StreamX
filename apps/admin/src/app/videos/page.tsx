"use client";

import { VideoManagement } from "@/src/components/VideoManagement";
import { useSearchParams } from "next/navigation";
import { useAdminSearchVideos } from "@/src/hooks/useAdminSearchVideos";

export default function VideosPage() {
  const searchParams = useSearchParams();

  const page = Number.parseInt(searchParams.get("page") || "1");
  const genre = searchParams.get("genre") || "";
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search") || "";

  const { videos, total, loading, error } = useAdminSearchVideos(
    search,
    page,
    10,
    genre,
    status
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Video Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View and manage all uploaded videos
        </p>
      </div>

      <VideoManagement
        videos={videos}
        totalPages={total}
        totalCount={videos.length}
        currentPage={page}
        filters={{ genre, status, search }}
      />

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
