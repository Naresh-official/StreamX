"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { VideoCard } from "./videoCard";
import { Video } from "@workspace/types";

interface VideoCarouselProps {
  videos: Video[];
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount =
        direction === "left"
          ? -current.clientWidth * 0.75
          : current.clientWidth * 0.75;

      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Left Navigation */}
      {videos.length >= 4 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/3 z-10 h-full -translate-y-1/3 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-scroll hide-scrollbar -mx-4 px-4"
      >
        {videos &&
          videos.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>

      {/* Right Navigation */}
      {videos.length >= 4 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/3 z-10 h-full -translate-y-1/3 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
}
