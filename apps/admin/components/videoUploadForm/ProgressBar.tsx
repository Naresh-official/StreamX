import { Card, CardContent } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";

interface ProgressBarProps {
  uploadProgress: number;
  uploadStatus: string;
}
function ProgressBar({ uploadProgress, uploadStatus }: ProgressBarProps) {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Upload Status</h3>
            <span className="text-sm">{uploadStatus}</span>
            <span className="text-sm mx-2">{uploadProgress.toFixed(2)} %</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {uploadProgress < 100
              ? "Uploading video file to server..."
              : "Processing video for streaming..."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProgressBar;
