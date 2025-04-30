import { Input } from "@workspace/ui/shadcn/input.js";
import { Label } from "@workspace/ui/shadcn/label.js";

function VideoTitle() {
  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-base">
        Video Title
      </Label>
      <Input
        id="title"
        placeholder="Enter video title"
        className="focus-visible:ring-0 focus-visible:border-input"
        required
      />
    </div>
  );
}

export default VideoTitle;
