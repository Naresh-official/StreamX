import Image from "next/image";
import { Play, Plus, ThumbsUp } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Video } from "@workspace/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const router = useRouter();
  const handlePlayButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/movie/${video.id}?autoplay=true`);
  };
  return (
    <div className="video-card group relative flex-shrink-0 w-[180px] md:w-[355px] rounded-md overflow-hidden cursor-pointer">
      <Link href={`/movie/${video.id}`}>
        <div className="hover:scale-105">
          <Image
            src={video.thumbnailUrl || "/placeholder.svg"}
            alt={video.title}
            width={355}
            height={200}
            className="w-full aspect-video object-cover"
          />
          {/* Hover Overlay */}
          <div className="video-card-overlay absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
            <h3 className="font-medium text-sm mb-2">{video.title}</h3>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full bg-white text-black hover:bg-white/90"
                onClick={handlePlayButtonClick}
              >
                <Play className="h-4 w-4 fill-black" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full border border-white/40 hover:border-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full border border-white/40 hover:border-white"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
