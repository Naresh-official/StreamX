"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { VideoCard } from "@/src/components/videoCarousel/videoCard";
import { Video } from "@workspace/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@workspace/ui/components/pagination";
import { useSearchVideos } from "@/src/hooks/useSearchVideos";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Add state for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Update hook to use currentPage
  const { videos, loading, error, total } = useSearchVideos(
    query,
    12,
    currentPage
  );

  if (!query) {
    return (
      <div className="min-h-screen px-4 md:px-8 py-18">
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="text-gray-600">
          Search for your favorite movies and shows.
        </p>
        <div className="pt-8 text-lg text-red-500">Search query is empty.</div>
      </div>
    );
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-18">
      <h1 className="text-2xl font-bold">Search</h1>
      <p className="text-gray-600">
        Search for your favorite movies and shows.
      </p>
      <div>
        {loading && <div className="pt-8 text-lg">Loading...</div>}
        {error && <div className="pt-8 text-lg text-red-500">{error}</div>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 pt-8">
              {videos.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">
                  No results found.
                </div>
              ) : (
                videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))
              )}
            </div>
            {/* Pagination */}
            {videos.length > 0 && total > 1 && (
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
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
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
                        if (currentPage < total)
                          handlePageChange(currentPage + 1);
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
