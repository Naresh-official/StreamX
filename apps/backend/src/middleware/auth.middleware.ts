import prisma from "@workspace/db/*";
import { NextFunction, Request, Response } from "express";

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.headers["x-user-id"] as string;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    req.userId = user.id;

    next();
  } catch (error) {
    console.error("Auth error in verifyUser middleware:", error);
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
}
