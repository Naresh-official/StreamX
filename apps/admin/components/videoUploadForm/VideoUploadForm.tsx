"use client";

import { useState } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import VideoCard from "./VideoCard";
import ThumbnailCard from "./ThumbnailCard";
import VideoTitle from "./VideoTitle";
import VideoDescription from "./VideoDescription";
import VideoCategories from "./VideoCategories";
import VideoTags from "./VideoTags";
import VideoDuration from "./VideoDuration";
import ProgressBar from "./ProgressBar";
import SubmitButton from "./SubmitButton";
import { uploadVideo } from "@workspace/api-client";

export function VideoUploadForm() {

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDescription, setVideoDescription] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video file to upload");
      return;
    }

    if (!thumbnailFile) {
      alert("Please select a thumbnail file to upload");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading...");

    await uploadVideo(
      videoFile,
      thumbnailFile,
      videoTitle,
      videoDescription,
      videoDuration,
      tags,
      selectedCategories,
      setUploadProgress
    );
    setIsUploading(false);
    setUploadStatus("Uploaded");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column - Video Upload and Preview */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <VideoCard
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                setVideoDuration={setVideoDuration}
              />
              <ThumbnailCard
                thumbnailFile={thumbnailFile}
                setThumbnailFile={setThumbnailFile}
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Video Details */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <VideoTitle
                videoTitle={videoTitle}
                setVideoTitle={setVideoTitle}
              />
              <VideoDescription
                videoDescription={videoDescription}
                setVideoDescription={setVideoDescription}
              />
              <VideoCategories
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
              <VideoTags tags={tags} setTags={setTags} />

              <VideoDuration videoDuration={videoDuration} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Progress */}
      {(isUploading || uploadStatus === "Upload complete!") && (
        <ProgressBar
          uploadProgress={uploadProgress}
          uploadStatus={uploadStatus}
        />
      )}

      {/* Submit Button */}
      <SubmitButton
        isUploading={isUploading}
        uploadStatus={uploadStatus}
        videoFile={videoFile}
      />
    </form>
  );
}
