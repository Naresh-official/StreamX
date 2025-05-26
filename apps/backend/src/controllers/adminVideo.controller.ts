import { Request, RequestHandler, Response } from "express";
import prisma from "@workspace/db/*";
import { Prisma, VideoStatus } from "../../../../packages/db/generated/prisma";
import { emptyAndDeleteS3Directory } from "@workspace/s3/index";

export const adminSearchVideos: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { query = "", page = 1, limit = 10, genre, status } = req.query;

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
    const statusUpper =
      typeof status === "string" ? status.toUpperCase() : undefined;
    const validStatus =
      statusUpper &&
      Object.values(VideoStatus).includes(statusUpper as VideoStatus)
        ? (statusUpper as VideoStatus)
        : undefined;

    const filters: Prisma.VideoWhereInput = {
      ...(validStatus ? { status: validStatus } : {}),
      ...(genre && typeof genre === "string"
        ? {
            categories: {
              some: {
                name: genre.toLowerCase(),
              },
            },
          }
        : {}),
      ...(query && typeof query === "string" && query.trim() !== ""
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
      orderBy: { createdAt: "desc" },
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
    console.error("Error searching videos (admin):", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteVideo: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }

  try {
    const videoWithTags = await prisma.video.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!videoWithTags) {
      res.status(404).json({ error: "Video not found" });
      return;
    }

    await emptyAndDeleteS3Directory(id);

    await prisma.video.delete({
      where: { id },
    });

    if (videoWithTags && videoWithTags.tags.length > 0) {
      for (const tag of videoWithTags.tags) {
        const tagCount = await prisma.video.count({
          where: {
            tags: {
              some: { id: tag.id },
            },
          },
        });
        if (tagCount === 0) {
          await prisma.tag.delete({
            where: { id: tag.id },
          });
        }
      }
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVideoQueue: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const videos = await prisma.video.findMany({
      where: {
        NOT: [
          { status: VideoStatus.COMPLETED },
          { status: VideoStatus.FAILED },
        ],
      },
      orderBy: { createdAt: "asc" },
      include: {
        categories: true,
        tags: true,
      },
    });
    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching video queue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
