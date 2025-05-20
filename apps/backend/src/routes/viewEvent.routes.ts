import { Router } from "express";
import { addViewEvent } from "../controllers/viewEvent.controller";

const router: Router = Router();

router.post("/view", addViewEvent);

export default router;
