import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

configDotenv({
  path: "../../.env",
});

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL as string,
      process.env.ADMIN_URL as string,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = parseInt(process.env.PORT as string);

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
