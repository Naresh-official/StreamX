import { Router } from "express";
import {
  addVideoToQueue,
  createVideoRecord,
  getVideoById,
} from "../controllers/video.controller";

const router: Router = Router();

router.post("/create", createVideoRecord);
router.post("/process", addVideoToQueue);
router.get("/:videoId", getVideoById);

export default router;
