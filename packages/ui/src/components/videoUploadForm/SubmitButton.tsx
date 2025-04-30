import { Button } from "@workspace/ui/shadcn/button.js";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isUploading: boolean;
  videoFile: File | null;
}

function SubmitButton({ isUploading, videoFile }: SubmitButtonProps) {
  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        size="lg"
        disabled={isUploading || !videoFile}
        className="px-8"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload Video"
        )}
      </Button>
    </div>
  );
}

export default SubmitButton;
