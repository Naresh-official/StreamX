import { Router } from "express";
import { addViewEvent } from "../controllers/viewEvent.controller";
import { verifyUser } from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/view", verifyUser, addViewEvent);

export default router;
