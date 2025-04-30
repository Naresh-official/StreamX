import fs from "fs";
import { env } from "@workspace/config";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import https from "https";

const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(filePath: string, key: string): Promise<void> {
  try {
    console.log("Uploading file to S3...");
    console.log({ filePath, key });
    const fileContent = fs.readFileSync(filePath);
    const fileBuffer = Buffer.from(fileContent);

    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: key,
      Body: fileBuffer,
    });
    await s3.send(command);
    console.log(`File uploaded successfully: ${key}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error uploading file: ${error.message}`);
    }
  }
}

export async function downloadFromS3(
  videoKey: string,
  filePath: string
): Promise<void> {
  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: videoKey,
  });
  const response = await s3.send(command);

  if (!response.Body) {
    throw new Error("No response body from S3");
  }

  return new Promise((resolve, reject) => {
    const fileStream = response.Body;
    const writeStream = fs.createWriteStream(filePath);

    fileStream?.transformToByteArray().then((data) => {
      writeStream.write(data);
      writeStream.end();
    });
    writeStream.on("finish", () => {
      console.log("File downloaded successfully");
      resolve();
    });
    writeStream.on("error", (error) => {
      console.error("Error writing file:", error);
      reject(error);
    });
  });
}

export async function generatePresignedUrlForUpload(
  videoKey: string,
  expiresIn: number
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: videoKey,
    ContentType: "video/mp4",
  });
  return getSignedUrl(s3, command, { expiresIn: expiresIn });
}

export async function uploadToPresignedUrl(
  presignedUrl: string,
  fileBuffer: Buffer
): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = new URL(presignedUrl);

    const options = {
      method: "PUT",
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        "Content-Length": fileBuffer.length,
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        console.log("Presigned upload successful");
        resolve();
      } else {
        reject(
          new Error(
            `Presigned upload failed with status code ${res.statusCode}`
          )
        );
      }
    });

    req.on("error", reject);
    req.write(fileBuffer);
    req.end();
  });
}
