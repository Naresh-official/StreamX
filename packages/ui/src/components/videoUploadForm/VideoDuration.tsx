import { Input } from "@workspace/ui/shadcn/input.js";
import { Label } from "@workspace/ui/shadcn/label.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/shadcn/select.js";

interface VideoDurationProps {
  videoDuration: string;
}

function VideoDuration({ videoDuration }: VideoDurationProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="duration" className="text-base">
        Video Duration
      </Label>
      <Input
        id="duration"
        value={videoDuration}
        readOnly
        className="bg-muted/50 w-32 focus-visible:ring-0 focus-visible:border-input"
      />
    </div>
  );
}

export default VideoDuration;
