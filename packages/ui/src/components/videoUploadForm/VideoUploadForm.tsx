"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "../../shadcn/card.js";
import VideoCard from "./VideoCard.js";
import ThumbnailCard from "./ThumbnailCard.js";
import VideoTitle from "./VideoTitle.js";
import VideoDescription from "./VideoDescription.js";
import VideoCategories from "./VideoCategories.js";
import VideoTags from "./VideoTags.js";
import VideoDuration from "./VideoDuration.js";
import ProgressBar from "./ProgressBar.js";
import SubmitButton from "./SubmitButton.js";

export function VideoUploadForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<string>("00:00");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

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

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("Processing...");

          // Simulate processing delay
          setTimeout(() => {
            setUploadStatus("Upload complete!");
            setIsUploading(false);
          }, 2000);

          return 100;
        }
        return prev + 5;
      });
    }, 300);
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
                videoRef={videoRef}
              />
              <ThumbnailCard
                thumbnailFile={thumbnailFile}
                setThumbnailFile={setThumbnailFile}
                thumbnailPreview={thumbnailPreview}
                setThumbnailPreview={setThumbnailPreview}
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Video Details */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <VideoTitle />
              <VideoDescription />
              <VideoCategories />
              <VideoTags
                tags={tags}
                setTags={setTags}
                currentTag={currentTag}
                setCurrentTag={setCurrentTag}
                tagInputRef={tagInputRef}
              />

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
      <SubmitButton isUploading={isUploading} videoFile={videoFile} />
    </form>
  );
}
