import { Request, Response, RequestHandler } from "express";
import prisma from "@workspace/db/*";
import {
  generatePresignedUrlForUpload,
  getCloudFrontUrl,
} from "@workspace/s3/index";
import { videoQueue } from "../libs/queue";

export const createVideoRecord: RequestHandler = async (
  req: Request,
  res: Response
) => {
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

export const addVideoToQueue: RequestHandler = async (
  req: Request,
  res: Response
) => {
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

export const getVideoById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { videoId } = req.params;
  if (!videoId || typeof videoId !== "string") {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }
  const video = await prisma.video.findUnique({
    where: { id: videoId, status: "COMPLETED" },
    include: {
      categories: true,
      tags: true,
    },
  });

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }

  const url = getCloudFrontUrl(video.id);
  res.status(200).json({ video, url });
};

export const markVideoAsProcessing: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { videoId } = req.params;
  if (!videoId || typeof videoId !== "string") {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }
  try {
    const video = await prisma.video.update({
      where: { id: videoId },
      data: { status: "PROCESSING" },
    });
    res.status(200).json({ message: "Video marked as processing", video });
    return;
  } catch (error) {
    console.error("Error marking video as processing:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const markVideoAsCompleted: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { videoId } = req.params;
  if (!videoId || typeof videoId !== "string") {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }

  try {
    const video = await prisma.video.update({
      where: { id: videoId },
      data: { status: "COMPLETED" },
    });

    res.status(200).json({ message: "Video marked as completed", video });
    return;
  } catch (error) {
    console.error("Error marking video as completed:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const markVideoAsFailed: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { videoId } = req.params;
  if (!videoId || typeof videoId !== "string") {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }

  try {
    const video = await prisma.video.update({
      where: { id: videoId },
      data: { status: "FAILED" },
    });

    res.status(200).json({ message: "Video marked as failed", video });
    return;
  } catch (error) {
    console.error("Error marking video as failed:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
