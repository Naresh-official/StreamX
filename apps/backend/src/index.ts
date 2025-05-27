import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import { getBackendEnv } from "@workspace/config/server";

const backendEnv = getBackendEnv();

const app = express();

app.use(
  cors({
    origin: [backendEnv.FRONTEND_URL, backendEnv.ADMIN_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = parseInt(backendEnv.PORT);

// Import routes
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import videoRoutes from "./routes/video.routes";
import viewEventRoutes from "./routes/viewEvent.routes";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/video", videoRoutes);
app.use("/api/v1/view-event", viewEventRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
