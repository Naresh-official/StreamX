import { Queue } from "bullmq";
import { Redis } from "ioredis";
import { env } from "@workspace/config/server";

const connection = new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
});

export const videoQueue = new Queue("video-transcode", {
  connection,
});
