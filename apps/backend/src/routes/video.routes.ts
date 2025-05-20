import { Router } from "express";
import {
  addVideoToQueue,
  createVideoRecord,
  getVideoById,
  markVideoAsProcessing,
  markVideoAsCompleted,
  markVideoAsFailed,
  getVideosByCategory,
  getTrendingVideos,
  getNewReleaseVideos,
} from "../controllers/video.controller";

const router: Router = Router();

router.post("/create", createVideoRecord);
router.post("/process", addVideoToQueue);
router.get("/category", getVideosByCategory);
router.get("/trending", getTrendingVideos);
router.get("/new-releases", getNewReleaseVideos);

router.get("/:videoId", getVideoById);
router.patch("/:videoId/processing", markVideoAsProcessing);
router.patch("/:videoId/completed", markVideoAsCompleted);
router.patch("/:videoId/failed", markVideoAsFailed);

export default router;
