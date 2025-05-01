import { Label } from "@workspace/ui/shadcn/label.js";
import { Textarea } from "@workspace/ui/shadcn/textarea.js";
import { Dispatch, SetStateAction } from "react";

interface VideoDescriptionProps {
  videoDescription: string;
  setVideoDescription: Dispatch<SetStateAction<string>>;
}

function VideoDescription({
  videoDescription,
  setVideoDescription,
}: VideoDescriptionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description" className="text-base">
        Video Description
      </Label>
      <Textarea
        id="description"
        placeholder="Enter a detailed description of the video"
        value={videoDescription}
        onChange={(e) => setVideoDescription(e.target.value)}
        rows={4}
        maxLength={500}
        className="min-h-[120px] focus-visible:ring-0 focus-visible:border-input resize-none"
        required
      />
    </div>
  );
}

export default VideoDescription;
