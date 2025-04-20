import { Job } from "bullmq";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { downloadFromS3, uploadToS3 } from "@workspace/s3";
import {
  ffmpegOutputOptions,
  ffmpegOutput480pOptions,
  ffmpegOutput720pOptions,
  ffmpegOutput1080pOptions,
} from "@workspace/config";

export async function processVideo(job: Job) {
  const { videoKey, videoId } = job.data;
  console.log(`Starting video transcoding job for ${videoId}...`);
  console.log({ videoKey, videoId, cwd: process.cwd() });
  const inputPath = `${process.cwd()}/tmp/${videoId}-input.mp4`;

  console.log({ inputPath });

  await downloadFromS3(videoKey, inputPath);

  const output480p = `./tmp/480/index.m3u8`;
  const output720p = `./tmp/720/index.m3u8`;
  const output1080p = `./tmp/1080/index.m3u8`;

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    throw new Error(`Input file not found: ${inputPath}`);
  } else {
    console.log(`Input file exists: ${inputPath}`);
  }

  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions(ffmpegOutputOptions)
      // 480p output
      .output(output480p)
      .outputOptions(ffmpegOutput480pOptions)
      // 720p output
      .output(output720p)
      .outputOptions(ffmpegOutput720pOptions)
      // 1080p output
      .output(output1080p)
      .outputOptions(ffmpegOutput1080pOptions)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  // Clean up temporary files
  fs.unlinkSync(inputPath);

  [480, 720, 1080].forEach((res) => {
    const dir = `./tmp/${res}`;
    fs.readdirSync(dir).forEach(async (file) => {
      const filePath = `${dir}/${file}`;
      if (filePath.endsWith(".m3u8") || filePath.endsWith(".ts")) {
        // Upload to S3 and delete the local file
        await uploadToS3(filePath, `${videoId}/${res}/${file}`);
        fs.unlinkSync(filePath);
      }
    });
  });
  console.log(`Transcoding completed for video ID: ${videoId}`);
}
