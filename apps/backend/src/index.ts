import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { env } from "@workspace/config";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = parseInt(env.PORT);

// Import routes
import userRoutes from "./routes/user.routes";
import { videoQueue } from "./libs/queue";

app.use("/api/v1/user", userRoutes);

app.post("/process", async (req, res) => {
  const { videoId, videoKey } = req.body;

  await videoQueue.add("video-transcode", {
    videoKey,
    videoId,
  });
  res.status(200).json({
    message: "Video processing started",
  });
  return;
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
