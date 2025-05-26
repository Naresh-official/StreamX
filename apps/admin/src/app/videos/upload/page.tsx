import { VideoUploadForm } from "@/src/components/videoUploadForm/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div>
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
