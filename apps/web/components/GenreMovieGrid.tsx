"use client";

import { useState } from "react";
import GenreSearch from "./GenreSearch";
import { VideoCard } from "./videoCarousel/videoCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination";
import { useVideosByCategory } from "@/hooks/useVideosByCategory";
import { Ban } from "lucide-react";

function GenreMovieGrid({ category }: { category: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { videos, total, loading, error } = useVideosByCategory(
    category,
    12,
    currentPage,
    search
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-8">
      <GenreSearch value={search} onChange={setSearch} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && videos.length === 0 && (
        <p className="text-gray-500 text-2xl flex gap-4 items-center justify-center py-20">
          <Ban />
          <span>No videos found.</span>
        </p>
      )}

      {!loading && !error && videos.length > 0 && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          <Pagination className="my-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, total) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNumber);
                      }}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {total > 5 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(total);
                      }}
                    >
                      {total}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < total) handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === total
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default GenreMovieGrid;
