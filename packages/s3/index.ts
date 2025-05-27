import fs from "fs";
import { getS3Env } from "@workspace/config/server";
import {
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Env = getS3Env();

const s3 = new S3Client({
  region: s3Env.AWS_REGION,
  credentials: {
    accessKeyId: s3Env.AWS_ACCESS_KEY_ID,
    secretAccessKey: s3Env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(filePath: string, key: string): Promise<void> {
  try {
    console.log("Uploading file to S3...");
    console.log({ filePath, key });
    const fileContent = fs.readFileSync(filePath);
    const fileBuffer = Buffer.from(fileContent);

    const command = new PutObjectCommand({
      Bucket: s3Env.S3_BUCKET,
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
    Bucket: s3Env.S3_BUCKET,
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
    Bucket: s3Env.S3_BUCKET,
    Key: `${videoKey}/original`,
    ContentType: "video/mp4",
  });
  return getSignedUrl(s3, command, { expiresIn: expiresIn });
}

export function getCloudFrontUrl(videoKey: string): { [key: string]: string } {
  const url = {
    "480": `${s3Env.CLOUDFRONT_DISTRIBUTION}/${videoKey}/480/index.m3u8`,
    "720": `${s3Env.CLOUDFRONT_DISTRIBUTION}/${videoKey}/720/index.m3u8`,
    "1080": `${s3Env.CLOUDFRONT_DISTRIBUTION}/${videoKey}/1080/index.m3u8`,
  };
  return url;
}

export async function emptyAndDeleteS3Directory(
  directory: string
): Promise<void> {
  try {
    let continuationToken: string | undefined = undefined;

    do {
      const listCommand: ListObjectsV2Command = new ListObjectsV2Command({
        Bucket: s3Env.S3_BUCKET,
        Prefix: directory,
        ContinuationToken: continuationToken,
      });

      const listResponse = await s3.send(listCommand);
      const objects = listResponse.Contents;

      if (!objects || objects.length === 0) {
        console.log("No objects found under the prefix.");
        break;
      }

      const deleteCommand = new DeleteObjectsCommand({
        Bucket: s3Env.S3_BUCKET,
        Delete: {
          Objects: objects.map((obj) => ({ Key: obj.Key! })),
          Quiet: true,
        },
      });

      await s3.send(deleteCommand);

      continuationToken = listResponse.IsTruncated
        ? listResponse.NextContinuationToken
        : undefined;
    } while (continuationToken);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error deleting S3 prefix: ${error.message}`);
    } else {
      console.error("Unknown error deleting S3 prefix");
    }
  }
}
