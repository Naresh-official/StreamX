import { Router } from "express";
import {
  addVideoToQueue,
  createVideoRecord,
  getVideoById,
  markVideoAsProcessing,
  markVideoAsCompleted,
  markVideoAsFailed,
  getVideosByCategory,
} from "../controllers/video.controller";

const router: Router = Router();

router.post("/create", createVideoRecord);
router.post("/process", addVideoToQueue);
router.get("/category", getVideosByCategory);

router.get("/:videoId", getVideoById);
router.patch("/:videoId/processing", markVideoAsProcessing);
router.patch("/:videoId/completed", markVideoAsCompleted);
router.patch("/:videoId/failed", markVideoAsFailed);

export default router;
