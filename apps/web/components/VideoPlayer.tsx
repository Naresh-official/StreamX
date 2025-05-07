"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Rewind,
  FastForward,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Slider } from "@workspace/ui/components/slider";

interface VideoPlayerProps {
  videoSources: { quality: "480p" | "720p" | "1080p"; url: string }[];
  thumbnailUrl: string;
}

export function VideoPlayer({ videoSources, thumbnailUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<
    "480p" | "720p" | "1080p"
  >("720p");

  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentVideoUrl =
    videoSources.find((v) => v.quality === selectedQuality)?.url ?? "";

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] ?? 0;
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0] ?? 0;
      setCurrentTime(value[0] ?? 0);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        duration,
        videoRef.current.currentTime + 10
      );
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleQualityChange = (quality: "480p" | "720p" | "1080p") => {
    if (videoRef.current) {
      const video = videoRef.current;
      const wasPlaying = !video.paused;
      const currentTime = video.currentTime;

      // Pause first
      video.pause();

      // Set new source
      const newUrl = videoSources.find((v) => v.quality === quality)?.url ?? "";
      video.src = newUrl;

      // Load the new source
      video.load();

      // Wait until metadata is loaded to restore time & play
      const onLoadedMetadata = () => {
        video.currentTime = currentTime;

        if (wasPlaying) {
          video
            .play()
            .catch((err) =>
              console.error(
                "Error resuming playback after quality change:",
                err
              )
            );
        }

        // Clean up listener after firing
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
      };

      video.addEventListener("loadedmetadata", onLoadedMetadata);

      // Update state
      setSelectedQuality(quality);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoaded(true);
    };
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative rounded-md overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-black">
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt="Video thumbnail"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button
              onClick={togglePlay}
              size="lg"
              className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Play className="h-8 w-8 fill-white" />
            </Button>
          </div>
        </div>
      )}

      {/* TODO : use video.js */}
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black"
        src={currentVideoUrl}
        onClick={togglePlay}
        playsInline
      />

      <div
        className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-gray-600 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-red-600 [&>span:first-child_span]:bg-red-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleRewind}
                className="text-white"
              >
                <Rewind className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleFastForward}
                className="text-white"
              >
                <FastForward className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>

                <div className="w-24 hidden sm:block">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="[&>span:first-child]:h-1 [&>span:first-child]:bg-gray-600 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-white [&>span:first-child_span]:bg-white"
                  />
                </div>
              </div>

              <span className="text-sm text-gray-300 ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Quality Selector */}
              <select
                value={selectedQuality}
                onChange={(e) =>
                  handleQualityChange(
                    e.target.value as "480p" | "720p" | "1080p"
                  )
                }
                className="bg-black text-white text-sm px-2 py-1 rounded"
              >
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </select>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="text-white"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
