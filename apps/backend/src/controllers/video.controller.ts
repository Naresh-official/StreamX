import { Request, Response } from "express";
import prisma from "@workspace/db/*";
import { generatePresignedUrlForUpload } from "@workspace/s3";

export const createVideoRecord = async (req: Request, res: Response) => {
  const {
    title,
    description,
    duration,
    tags,
    visibility,
    categories,
    thumbnailUrl,
  } = req.body;

  try {
    const video = await prisma.video.create({
      data: {
        title,
        description,
        duration,
        visibility,
        thumbnailUrl: thumbnailUrl,
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
