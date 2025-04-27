import { Router } from "express";
import { getAdmin } from "../controllers/admin.controller";

const router: Router = Router();

router.get("/:email", getAdmin);

export default router;
