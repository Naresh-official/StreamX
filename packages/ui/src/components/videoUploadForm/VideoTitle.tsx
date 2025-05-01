import { Input } from "@workspace/ui/shadcn/input.js";
import { Label } from "@workspace/ui/shadcn/label.js";
import { Dispatch, SetStateAction } from "react";

interface VideoTitleProps {
  videoTitle: string;
  setVideoTitle: Dispatch<SetStateAction<string>>;
}

function VideoTitle({ videoTitle, setVideoTitle }: VideoTitleProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-base">
        Video Title
      </Label>
      <Input
        id="title"
        placeholder="Enter video title"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
        className="focus-visible:ring-0 focus-visible:border-input"
        required
      />
    </div>
  );
}

export default VideoTitle;
