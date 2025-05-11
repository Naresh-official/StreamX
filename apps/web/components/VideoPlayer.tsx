"use client";

import { useRef, useState } from "react";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import { VideoJS } from "./VideoJs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Settings } from "lucide-react";

type PlayerOptions = typeof videojs.options;

interface VideoPlayerProps {
  videoSources: { quality: "480p" | "720p" | "1080p"; url: string }[];
  thumbnailUrl: string;
}

export function VideoPlayer({ videoSources, thumbnailUrl }: VideoPlayerProps) {
  const playerRef = useRef<Player | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<
    "480p" | "720p" | "1080p"
  >("720p");

  const currentVideoUrl =
    videoSources.find((v) => v.quality === selectedQuality)?.url ?? "";

  const videoJsOptions: PlayerOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    aspectRatio: "16:9",
    poster: thumbnailUrl,
    sources: [
      {
        src: currentVideoUrl,
        type: "application/x-mpegURL",
      },
    ],
    html5: {
      vhs: { startTime: 0 },
    },
    seeking: true,
  };

  return (
    <div>
      <div className="relative rounded-md overflow-hidden">
        <VideoJS options={videoJsOptions} ref={playerRef} />

        <div className="absolute top-4 right-4 bg-black/50 text-white text-sm rounded p-1">
          <Select
            value={selectedQuality}
            onValueChange={(value) =>
              setSelectedQuality(value as "480p" | "720p" | "1080p")
            }
          >
            <SelectTrigger className="w-32 focus-visible:ring-0 focus-visible:border-input">
              <div className="flex items-center gap-2">
                <Settings className="w-10 h-10 text-white" />
                <span>Quality</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="480p">480p</SelectItem>
              <SelectItem value="720p">720p</SelectItem>
              <SelectItem value="1080p">1080p</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
