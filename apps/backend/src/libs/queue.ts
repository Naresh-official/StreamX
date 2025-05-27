import { Queue } from "bullmq";
import { Redis } from "ioredis";
import { getBackendEnv } from "@workspace/config/server";

const backendEnv = getBackendEnv();

const connection = new Redis({
  host: backendEnv.REDIS_HOST,
  port: Number(backendEnv.REDIS_PORT),
});

export const videoQueue = new Queue("video-transcode", {
  connection,
});
