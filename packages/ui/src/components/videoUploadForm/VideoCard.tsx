import { Button } from "@workspace/ui/shadcn/button.js";
import { Input } from "@workspace/ui/shadcn/input.js";
import { Label } from "@workspace/ui/shadcn/label.js";
import { Upload, X } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";

interface VideoCardProps {
  videoFile: File | null;
  setVideoFile: Dispatch<SetStateAction<File | null>>; // Updated type
  setVideoDuration: Dispatch<SetStateAction<number>>; // Added type for duration
}

function VideoCard({
  videoFile,
  setVideoFile,
  setVideoDuration,
}: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 1024) {
      alert("File size exceeds 1GB");
      return;
    }

    setVideoFile(file);

    // Create a URL for the video to get its duration
    const videoUrl = URL.createObjectURL(file);
    const video = document.createElement("video");

    video.onloadedmetadata = () => {

      setVideoDuration(video.duration);
      URL.revokeObjectURL(videoUrl);
    };

    video.src = videoUrl;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="video-upload" className="text-base">
        Video File
      </Label>
      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/30">
        {videoFile ? (
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <span className="font-medium truncate max-w-[200px]">
                {videoFile.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setVideoFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <video
              ref={videoRef}
              className="w-full aspect-video rounded-md bg-black"
              controls
            >
              <source src={videoFile ? URL.createObjectURL(videoFile) : ""} />
            </video>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              Drag and drop your video file here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: MP4, MOV, AVI, MKV (max 1GB)
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => document.getElementById("video-upload")?.click()}
            >
              Select Video
            </Button>
          </>
        )}
        <Input
          id="video-upload"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoChange}
        />
      </div>
    </div>
  );
}

export default VideoCard;
