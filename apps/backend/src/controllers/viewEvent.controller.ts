import prisma from "@workspace/db/*";
import { Request, RequestHandler, Response } from "express";

export const addViewEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { videoId, userId } = req.body;

  if (!videoId || typeof videoId !== "string") {
    res.status(400).json({ error: "Video ID is required" });
    return;
  }

  try {
    const viewEvent = await prisma.viewEvent.create({
      data: {
        videoId,
        userId: userId || null,
      },
    });

    res
      .status(201)
      .json({ message: "View event added successfully", viewEvent });
  } catch (error) {
    console.error("Error adding view event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
