import { Router } from "express";
import { getUser, createUser } from "../controllers/user.controller";

const router: Router = Router();

router.get("/:email", getUser);
router.post("/", createUser);

export default router;
