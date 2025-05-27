import { Worker } from "bullmq";
import { Redis } from "ioredis";
import { processVideo } from "./processor.js";
import { getBackendEnv } from "@workspace/config/server";

const backendEnv = getBackendEnv();

const connection = new Redis({
  host: backendEnv.REDIS_HOST,
  port: Number(backendEnv.REDIS_PORT),
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "video-transcode",
  async (job) => {
    await processVideo(job);
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed`, err);
});
