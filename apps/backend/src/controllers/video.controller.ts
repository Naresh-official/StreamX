import { Request, Response } from "express";
import prisma from "@workspace/db/*";
import {
  generatePresignedUrlForUpload,
  getCloudFrontUrl,
} from "@workspace/s3/index";
import { videoQueue } from "../libs/queue";

export const createVideoRecord = async (req: Request, res: Response) => {
  const {
    title,
    thumbnailUrl,
    description,
    duration,
    tags,
    categories,
  }: {
    title: string;
    thumbnailUrl: string;
    description: string;
    duration: number;
    tags: string[];
    categories: string[];
  } = req.body;

  try {
    const video = await prisma.video.create({
      data: {
        title,
        description,
        duration,
        thumbnailUrl,
        tags: {
          connectOrCreate: tags.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
        categories: {
          connectOrCreate: categories.map((category: string) => ({
            where: { name: category },
            create: { name: category },
          })),
        },
      },
    });

    const url = await generatePresignedUrlForUpload(video.id, 60 * 60);

    res.status(201).json({ video, url });
  } catch (error) {
    console.error("Error creating video record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addVideoToQueue = async (req: Request, res: Response) => {
  const { videoId, videoKey } = req.body;

  await videoQueue.add("video-transcode", {
    videoKey,
    videoId,
  });
  res.status(200).json({
    message: "Video processing started",
  });
  return;
};

// export const getVideoById = async (req: Request, res: Response) => {
//   const { videoId } = req.params;

//   try {
//     if (!videoId || typeof videoId !== "string") {
//       return res.status(400).json({ error: "Video ID is required" });
//     }
//     const video = await prisma.video.findUnique({
//       where: { id: videoId },
//     });

//     if (!video) {
//       return res.status(404).json({ error: "Video not found" });
//     }

//     // const url = await generatePresignedUrlForAccess(
//     //   `${video.id}/original`,
//     //   60 * 60
//     // );

//     res.status(200).json({ video });
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getVideoById = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  if (!videoId || typeof videoId !== "string") {
    return res.status(400).json({ error: "Video ID is required" });
  }
  const video = await prisma.video.findUnique({
    where: { id: videoId },
  });
  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  const url = getCloudFrontUrl(video.id);
  res.status(200).json({ video, url });
};
