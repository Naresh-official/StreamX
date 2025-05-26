import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ImageIcon, X } from "lucide-react";
import { ChangeEvent, Dispatch, useState } from "react";

interface ThumbnailCardProps {
  thumbnailFile: File | null;
  setThumbnailFile: Dispatch<React.SetStateAction<File | null>>;
}

function ThumbnailCard({
  thumbnailFile,
  setThumbnailFile,
}: ThumbnailCardProps) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB");
      return;
    }

    setThumbnailFile(file);

    // Create a preview URL for the thumbnail
    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreview(previewUrl);
  };
  return (
    <div className="space-y-2">
      <Label htmlFor="thumbnail-upload" className="text-base">
        Thumbnail Image
      </Label>
      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/30">
        {thumbnailPreview ? (
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-between">
              <span className="font-medium truncate max-w-[200px]">
                {thumbnailFile?.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setThumbnailFile(null);
                  setThumbnailPreview(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative aspect-video w-full">
              <img
                src={thumbnailPreview || "/placeholder.svg"}
                alt="Thumbnail preview"
                className="rounded-md object-cover w-full h-full"
              />
            </div>
          </div>
        ) : (
          <>
            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              Upload a thumbnail image for your video (max 5MB)
            </p>
            <p className="text-xs text-muted-foreground">
              Recommended: 1280×720px JPG, PNG (16:9 ratio)
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() =>
                document.getElementById("thumbnail-upload")?.click()
              }
            >
              Select Image
            </Button>
          </>
        )}
        <Input
          id="thumbnail-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleThumbnailChange}
        />
      </div>
    </div>
  );
}

export default ThumbnailCard;
