import axios, { AxiosError } from "axios";
import { clientEnv } from "@workspace/config/client";
import { uploadToPresignedUrl } from "@workspace/s3/client";

export function useVideoUpload() {
  const uploadVideo = async (
    videoFile: File,
    thumbnailFile: File,
    title: string,
    description: string,
    duration: number,
    tags: string[],
    categories: string[]
  ) => {
    console.log("Entering uploadVideo function");

    console.log(typeof thumbnailFile);

    console.log({
      title,
      description,
      duration,
      tags,
      categories,
    });

    try {
      const formData = new FormData();
      formData.append("file", thumbnailFile);
      formData.append("upload_preset", "streamX_unsigned");

      const { data: thumbnailData } = await axios.post(
        "https://api.cloudinary.com/v1_1/naresh-cloud/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress =
                (progressEvent.loaded / progressEvent.total) * 100;
              console.log(`Thumbnail upload progress: ${progress.toFixed(2)}%`);
            }
          },
        }
      );

      const thumbnailUrl = thumbnailData?.secure_url;

      const { data } = await axios.post(
        `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/video/create`,
        {
          title,
          thumbnailUrl,
          description,
          duration,
          tags,
          categories,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      const presignedUrl = data.url;

      const logProgress = (progress: number) => {
        console.log(`Video upload progress: ${progress.toFixed(2)}%`);
      };

      await uploadToPresignedUrl(presignedUrl, videoFile, logProgress);
      console.log("Video upload successful");

      const { data: queueData } = await axios.post(
        `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/video/process`,
        {
          videoId: data.video.id,
          videoKey: `${data.video.id}/original`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(queueData);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error uploading video:", error);
      } else if (error instanceof Error) {
        console.error("Error uploading video:", error.message);
      }
      throw error;
    }
  };
  return { uploadVideo };
}
