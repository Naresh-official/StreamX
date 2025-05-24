import Image from "next/image";
import { Play, Info } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoId: string;
  rating: string;
  year: number;
  duration: string;
  genres: string[];
}

interface FeaturedBannerProps {
  content: FeaturedContent;
}

export function FeaturedBanner({ content }: FeaturedBannerProps) {
  return (
    <div className="relative w-full h-[80vh] min-h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={content.imageUrl || "/placeholder.svg"}
          alt={content.title}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-20 md:pb-32 pt-20 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{content.title}</h1>

        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="text-green-500 font-semibold">98% Match</span>
          <span>{content.year}</span>
          <span className="border border-gray-600 px-1 text-xs">
            {content.rating}
          </span>
          <span>{content.duration}</span>
        </div>

        <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-none">
          {content.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <Button className="bg-white text-black hover:bg-white/90 font-semibold px-6 py-5">
            <Play className="mr-2 h-5 w-5 fill-black" />
            Play
          </Button>
          <Button
            variant="secondary"
            className="bg-gray-500/40 hover:bg-gray-500/60 text-white px-6 py-5"
          >
            <Info className="mr-2 h-5 w-5" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
