import { Router } from "express";
import { getAdmin } from "../controllers/admin.controller";
import {
  adminSearchVideos,
  deleteVideo,
  getVideoQueue,
} from "../controllers/adminVideo.controller";
import {
  banUser,
  getAllUsers,
  unbanUser,
  deleteUser, // add import
} from "../controllers/user.controller";

const router: Router = Router();

router.delete("/video", deleteVideo);
router.get("/videos", adminSearchVideos);
router.get("/video-queue", getVideoQueue);

router.get("/users", getAllUsers);
router.patch("/user/ban/:email", banUser);
router.patch("/user/unban/:email", unbanUser);
router.delete("/user/:email", deleteUser);

router.get("/:email", getAdmin);

export default router;
