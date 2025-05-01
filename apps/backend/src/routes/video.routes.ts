import { Router } from "express";
import {
  addVideoToQueue,
  createVideoRecord,
} from "../controllers/video.controller";

const router: Router = Router();

router.post("/create", createVideoRecord);
router.post("/process", addVideoToQueue);

export default router;
