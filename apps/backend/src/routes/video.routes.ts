import { Router } from "express";
import { createVideoRecord } from "../controllers/video.controller";

const router: Router = Router();

router.post("/create", createVideoRecord);

export default router;
