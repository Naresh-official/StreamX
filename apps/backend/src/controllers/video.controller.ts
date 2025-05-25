import { Request, Response, RequestHandler } from "express";
import prisma from "@workspace/db/*";
import {
  generatePresignedUrlForUpload,
  getCloudFrontUrl,
} from "@workspace/s3/index";
import { videoQueue } from "../libs/queue";
import { Prisma } from "../../../../packages/db/generated/prisma";

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

export const getVideosByCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { category, search = "", page = 1, limit = 10 } = req.query;

  if (!category || typeof category !== "string") {
    res.status(400).json({ error: "Category is required" });
    return;
  }

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  if (
    isNaN(pageNumber) ||
    isNaN(pageSize) ||
    pageNumber <= 0 ||
    pageSize <= 0
  ) {
    res.status(400).json({ error: "Invalid pagination parameters" });
    return;
  }

  try {
    const filters: Prisma.VideoWhereInput = {
      categories: {
        some: {
          name: category.toLowerCase(),
        },
      },
      ...(search && typeof search === "string"
        ? {
            title: {
              contains: search.trim(),
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {}),
    };

    const videos = await prisma.video.findMany({
      where: filters,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: {
        categories: true,
        tags: true,
      },
    });

    const totalVideos = await prisma.video.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalVideos / pageSize);

    res.status(200).json({
      videos,
      total: totalPages,
      page: pageNumber,
      limit: pageSize,
    });
  } catch (error) {
    console.error("Error fetching videos by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTrendingVideos: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const since = new Date();
  since.setDate(since.getDate() - 7); // last 7 days

  try {
    const trendingViews = await prisma.viewEvent.groupBy({
      by: ["videoId"],
      where: {
        timestamp: {
          gte: since,
        },
      },
      _count: {
        videoId: true,
      },
      orderBy: {
        _count: {
          videoId: "desc",
        },
      },
      take: 10,
    });

    const videoIds = trendingViews.map((v) => v.videoId);

    // Fetch video details and preserve order
    const videos = await prisma.video.findMany({
      where: {
        id: { in: videoIds },
        status: "COMPLETED",
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    const videoMap = new Map(videos.map((v) => [v.id, v]));
    const trendingVideos = videoIds
      .map((id) => videoMap.get(id))
      .filter(Boolean);
    res.status(200).json(trendingVideos);
    return;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNewReleaseVideos = async (req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        categories: true,
        tags: true,
      },
    });
    res.json(videos);
  } catch (error) {
    console.error("Error fetching new release videos:", error);
    res.status(500).json({ error: "Failed to fetch new release videos" });
  }
};

export const searchVideos: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { query = "", page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  if (
    isNaN(pageNumber) ||
    isNaN(pageSize) ||
    pageNumber <= 0 ||
    pageSize <= 0
  ) {
    res.status(400).json({ error: "Invalid pagination parameters" });
    return;
  }

  try {
    const filters: Prisma.VideoWhereInput = {
      status: "COMPLETED",
      ...(query && typeof query === "string"
        ? {
            OR: [
              {
                title: {
                  contains: query.trim(),
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                description: {
                  contains: query.trim(),
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                tags: {
                  some: {
                    name: {
                      contains: query.trim(),
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          }
        : {}),
    };

    const videos = await prisma.video.findMany({
      where: filters,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: {
        categories: true,
        tags: true,
      },
    });

    const totalVideos = await prisma.video.count({ where: filters });
    const totalPages = Math.ceil(totalVideos / pageSize);

    res.status(200).json({
      videos,
      total: totalPages,
      page: pageNumber,
      limit: pageSize,
    });
  } catch (error) {
    console.error("Error searching videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
