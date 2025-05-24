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
  searchVideos,
} from "../controllers/video.controller";
import { verifyUser } from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/create", createVideoRecord);
router.post("/process", addVideoToQueue);
router.get("/category", verifyUser, getVideosByCategory);
router.get("/trending", verifyUser, getTrendingVideos);
router.get("/new-releases", verifyUser, getNewReleaseVideos);
router.get("/search", verifyUser, searchVideos);

router.get("/:videoId", verifyUser, getVideoById);
router.patch("/:videoId/processing", markVideoAsProcessing);
router.patch("/:videoId/completed", markVideoAsCompleted);
router.patch("/:videoId/failed", markVideoAsFailed);

export default router;
