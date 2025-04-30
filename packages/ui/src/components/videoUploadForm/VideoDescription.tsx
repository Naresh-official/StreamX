import { Label } from "@workspace/ui/shadcn/label.js";
import { Textarea } from "@workspace/ui/shadcn/textarea.js";

function VideoDescription() {
  return (
    <div className="space-y-2">
      <Label htmlFor="description" className="text-base">
        Video Description
      </Label>
      <Textarea
        id="description"
        placeholder="Enter a detailed description of the video"
        className="min-h-[120px] focus-visible:ring-0 focus-visible:border-input resize-none"
        required
      />
    </div>
  );
}

export default VideoDescription;
