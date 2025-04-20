import { Job } from "bullmq";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { downloadFromS3, uploadToS3 } from "@workspace/s3";

export async function processVideo(job: Job) {
  const {
    // videoKey,
    videoId,
  } = job.data;
  console.log(`Starting video transcoding job for ${videoId}...`);
  const inputPath = `./tmp/${videoId}-input.mp4`;

  // await downloadFromS3(videoKey, inputPath);

  const output480p = `./tmp/480/index.m3u8`;
  const output720p = `./tmp/720/index.m3u8`;
  const output1080p = `./tmp/1080/index.m3u8`;

  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-preset",
        "veryfast",
        "-g",
        "48", // GOP length for HLS
        "-sc_threshold",
        "0",
        "-c:a",
        "aac",
        "-f",
        "hls",
        "-hls_time",
        "6",
        "-hls_playlist_type",
        "vod",
      ])
      // 480p output
      .output(output480p)
      .outputOptions([
        "-vf",
        "scale=-2:480", // Scale to 480p,
        "-hls_segment_filename",
        "./tmp/480/segment%03d.ts",
      ])
      // 720p output
      .output(output720p)
      .outputOptions([
        "-vf",
        "scale=-2:720", // Scale to 720p,
        "-hls_segment_filename",
        "./tmp/720/segment%03d.ts",
      ])
      // 1080p output
      .output(output1080p)
      .outputOptions([
        "-vf",
        "scale=-2:1080", // Scale to 1080p,
        "-hls_segment_filename",
        "./tmp/1080/segment%03d.ts",
      ])
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  // await uploadToS3(output480p, `transcoded/${videoId}/480/480p.m3u8`);
  // await uploadToS3(output720p, `transcoded/${videoId}/720/720p.m3u8`);
  // await uploadToS3(output1080p, `transcoded/${videoId}/1080/1080p.m3u8`);

  // Clean up temporary files
  fs.unlinkSync(inputPath);

  [480, 720, 1080].forEach((res) => {
    const dir = `./tmp/${res}`;
    fs.readdirSync(dir).forEach((file) => {
      const filePath = `${dir}/${file}`;
      if (filePath.endsWith(".m3u8") || filePath.endsWith(".ts")) {
        fs.unlinkSync(filePath);
      }
    });
  });
  console.log(`Transcoding completed for video ID: ${videoId}`);
}
