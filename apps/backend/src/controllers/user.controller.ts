import prisma from "@workspace/db/*";
import { Request, Response } from "express";

export async function getUser(req: Request, res: Response) {
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ error: "User Email is required" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (error) {
    console.log("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}

export async function createUser(req: Request, res: Response) {
  const { name, email, profilePicture } = req.body;
  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required" });
    return;
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        profilePicture,
      },
    });
    res.status(201).json(user);
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}
