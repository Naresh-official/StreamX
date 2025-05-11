import { forwardRef, useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";

type PlayerOptions = typeof videojs.options;
type OnReady = (player: Player) => void;

interface VideoJSProps {
  options: PlayerOptions;
  onReady?: OnReady;
}

export const VideoJS = forwardRef<Player | null, VideoJSProps>(
  ({ options, onReady }, ref) => {
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Player | null>(null);

    useEffect(() => {
      if (!playerRef.current) {
        const videoElement = document.createElement("video-js");
        videoElement.classList.add("vjs-big-play-centered");
        videoRef.current && videoRef.current.appendChild(videoElement);

        const player = (playerRef.current = videojs(
          videoElement,
          options,
          () => {
            videojs.log("player is ready");
            onReady && onReady(player);
          }
        ));

        if (ref) {
          if (typeof ref === "function") ref(player);
          else ref.current = player;
        }
      }
    }, [options, onReady, ref]);

    return (
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    );
  }
);
