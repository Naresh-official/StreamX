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

export async function getAllUsers(req: Request, res: Response) {
  try {
    const {
      name,
      page = "1",
      limit = "10",
    } = req.query as {
      name?: string;
      page?: string;
      limit?: string;
    };

    const pageNum = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    const limitNum = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (name && name.trim() !== "") {
      where.name = { contains: name, mode: "insensitive" };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limitNum,
      }),
      prisma.user.count({ where }),
    ]);

    res.status(200).json({
      users,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}

export async function banUser(req: Request, res: Response) {
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ error: "User Email is required" });
    return;
  }
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { status: "BANNED" },
    });
    res.status(200).json({ message: "User banned successfully", user });
    return;
  } catch (error) {
    res.status(404).json({ error: "User not found or could not be banned" });
    return;
  }
}

export async function unbanUser(req: Request, res: Response) {
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ error: "User Email is required" });
    return;
  }
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { status: "ACTIVE" },
    });
    res.status(200).json({ message: "User unbanned successfully", user });
    return;
  } catch (error) {
    res.status(404).json({ error: "User not found or could not be unbanned" });
    return;
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ error: "User Email is required" });
    return;
  }
  try {
    await prisma.user.delete({
      where: { email },
    });
    res.status(200).json({ message: "User deleted successfully" });
    return;
  } catch (error) {
    res.status(404).json({ error: "User not found or could not be deleted" });
    return;
  }
}
