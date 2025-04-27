import prisma from "@workspace/db/*";
import { Request, Response } from "express";

export async function getAdmin(req: Request, res: Response) {
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ error: "Admin Email is required" });
    return;
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });
    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }
    res.status(200).json(admin);
    return;
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}
