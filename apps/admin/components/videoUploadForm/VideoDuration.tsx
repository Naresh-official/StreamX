import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

interface VideoDurationProps {
  videoDuration: number;
}

function VideoDuration({ videoDuration }: VideoDurationProps) {
  const minutes = Math.floor(videoDuration / 60);
  const seconds = Math.floor(videoDuration % 60);
  const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return (
    <div className="space-y-2">
      <Label htmlFor="duration" className="text-base">
        Video Duration
      </Label>
      <Input
        id="duration"
        value={formattedDuration}
        readOnly
        className="bg-muted/50 w-32 focus-visible:ring-0 focus-visible:border-input"
      />
    </div>
  );
}

export default VideoDuration;
