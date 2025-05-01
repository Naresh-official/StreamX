import { VideoUploadForm } from "@workspace/ui/components/videoUploadForm/VideoUploadForm";
import { clientEnv } from "@workspace/config/client";

export default function VideoUploadPage() {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Upload Video</h1>
        <p className="text-muted-foreground mt-2">
          Upload and manage videos for your streaming platform
        </p>
      </div>
      <VideoUploadForm />
    </div>
  );
}
