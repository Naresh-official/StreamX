import { Button } from "@workspace/ui/components/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isUploading: boolean;
  videoFile: File | null;
  uploadStatus: string;
}

function SubmitButton({
  isUploading,
  videoFile,
  uploadStatus,
}: SubmitButtonProps) {
  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        size="lg"
        disabled={isUploading || !videoFile || uploadStatus === "Uploaded"}
        className="px-8"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : uploadStatus === "Uploaded" ? (
          "Uploaded"
        ) : (
          "Upload"
        )}
      </Button>
    </div>
  );
}

export default SubmitButton;
