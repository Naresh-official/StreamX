import { Queue } from "bullmq";
import { Redis } from "ioredis";

import { configDotenv } from "dotenv";

configDotenv({
  path: "../../.env",
});

const connection = new Redis({
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT as string),
});

export const videoQueue = new Queue("video-transcode", {
  connection,
});
