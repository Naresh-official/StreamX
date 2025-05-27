import { UploadQueue } from "@/src/components/UploadQueue";

export default async function UploadQueuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Upload Queue
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Monitor the video upload pipeline and retry failed jobs
        </p>
      </div>

      <UploadQueue />
    </div>
  );
}
