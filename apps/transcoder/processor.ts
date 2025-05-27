import { Job } from "bullmq";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { downloadFromS3, uploadToS3 } from "@workspace/s3";
import {
  ffmpegOutputOptions,
  ffmpegOutput480pOptions,
  ffmpegOutput720pOptions,
  ffmpegOutput1080pOptions,
  getBackendEnv,
} from "@workspace/config/server";

const backendEnv = getBackendEnv();

async function transcodeResolution(
  inputPath: string,
  outputPath: string,
  ffmpegOptions: string[]
) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions(ffmpegOutputOptions) // common options
      .output(outputPath)
      .outputOptions(ffmpegOptions) // resolution-specific options
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
}

export async function processVideo(job: Job) {
  const { videoKey, videoId } = job.data;
  console.log(`Starting video transcoding job for ${videoId}...`);

  await fetch(`${backendEnv.BACKEND_URL}/video/${videoId}/processing`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const inputPath = `${process.cwd()}/tmp/${videoId}-input.mp4`;
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

    await transcodeResolution(inputPath, output480p, ffmpegOutput480pOptions);
    await transcodeResolution(inputPath, output720p, ffmpegOutput720pOptions);
    await transcodeResolution(inputPath, output1080p, ffmpegOutput1080pOptions);

    fs.unlinkSync(inputPath);

    for (const res of [480, 720, 1080]) {
      const dir = `./tmp/${res}`;
      for (const file of fs.readdirSync(dir)) {
        const filePath = `${dir}/${file}`;
        if (filePath.endsWith(".m3u8") || filePath.endsWith(".ts")) {
          await uploadToS3(filePath, `${videoId}/${res}/${file}`);
          fs.unlinkSync(filePath);
        }
      }
    }

    await fetch(`${backendEnv.BACKEND_URL}/video/${videoId}/completed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`Transcoding completed for video ID: ${videoId}`);
  } catch (error) {
    await fetch(`${backendEnv.BACKEND_URL}/video/${videoId}/failed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.error(`Error processing video ID ${videoId}:`, error);
  }
}
