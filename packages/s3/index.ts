import { createWriteStream, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import fs from "fs";
import { env, awsOptions } from "@workspace/config";
import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandOutput,
  NoSuchKey,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3 = new S3Client(awsOptions);
const oneMB = 1024 * 1024;

export async function uploadToS3(filePath: string, key: string): Promise<void> {
  const fileContent = fs.readFileSync(filePath);
  const fileBuffer = Buffer.from(fileContent);

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: env.S3_BUCKET,
      Key: key,
      Body: fileBuffer,
    },
  });

  await upload.done();
  console.log(`File uploaded successfully: ${key}`);
}

//TODO: fix the function to download from s3

interface GetObjectRangeParams {
  bucket: string;
  key: string;
  start: number;
  end: number;
}

const getObjectRange = ({
  bucket,
  key,
  start,
  end,
}: GetObjectRangeParams): Promise<GetObjectCommandOutput> => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    Range: `bytes=${start}-${end}`,
  });
  return s3.send(command);
};

interface RangeAndLength {
  start: number;
  end: number;
  length: number;
}

const getRangeAndLength = (contentRange?: string): RangeAndLength => {
  if (!contentRange) {
    throw new Error("Content-Range header is missing");
  }
  const [range, length] = contentRange.split("/");
  const [start, end] = range.replace("bytes=", "").split("-");
  return {
    start: parseInt(start, 10),
    end: parseInt(end, 10),
    length: parseInt(length, 10),
  };
};

const isComplete = ({ end, length }: RangeAndLength): boolean =>
  end === length - 1;

export async function downloadFromS3(key: string, dest: string): Promise<void> {
  console.log(`Downloading from S3: ${key} to ${dest}`);
  const file = createWriteStream(dest).on("error", (err) => console.error(err));

  let rangeAndLength: RangeAndLength = { start: -1, end: -1, length: -1 };

  try {
    while (!isComplete(rangeAndLength)) {
      const { end } = rangeAndLength;
      const nextRange = { start: end + 1, end: end + oneMB };

      const { ContentRange, Body } = await getObjectRange({
        bucket: env.S3_BUCKET,
        key,
        ...nextRange,
      });

      if (!Body || !ContentRange) {
        throw new Error("Missing body or Content-Range from S3 response");
      }

      console.log(`Downloaded bytes ${nextRange.start} to ${nextRange.end}`);

      const chunk = await Body.transformToByteArray();
      file.write(chunk);
      rangeAndLength = getRangeAndLength(ContentRange);
    }

    file.end();
    console.log(`Download completed: ${dest}`);
  } catch (error: any) {
    if (error instanceof NoSuchKey) {
      console.error(`No such key: ${key}`);
    } else {
      console.error("Error downloading from S3:", error);
    }
    rmSync(dest, { force: true });
    throw error;
  }
}
