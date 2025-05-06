import Image from "next/image";
import { Play, Plus, ThumbsUp } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface Video {
  id: string;
  title: string;
  imageUrl: string;
}

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="video-card group relative flex-shrink-0 w-[180px] md:w-[240px] rounded-md overflow-hidden cursor-pointer">
      <div className="hover:scale-105">
        <Image
          src={video.imageUrl || "/placeholder.svg"}
          alt={video.title}
          width={240}
          height={135}
          className="w-full aspect-video object-cover"
        />
        {/* Hover Overlay */}
        <div className="video-card-overlay absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          <h3 className="font-medium text-sm mb-2">{video.title}</h3>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-full bg-white text-black hover:bg-white/90"
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
    </div>
  );
}
