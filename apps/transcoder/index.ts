import { Worker } from "bullmq";
import { Redis } from "ioredis";
import { processVideo } from "./processor.js";

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
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
